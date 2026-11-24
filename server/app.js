import express from "express";
import multer from "multer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { openDb, COLLECTIONS } from "./db.js";
import { createAuth, createLimiter } from "./auth.js";

const MB = 1024 * 1024;

// Allowed upload types, detected from file content (not the client-provided name/type).
const FILE_TYPES = [
  { ext: "png", max: 5 * MB, test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { ext: "jpg", max: 5 * MB, test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: "gif", max: 5 * MB, test: (b) => b.subarray(0, 4).toString("latin1") === "GIF8" },
  { ext: "webp", max: 5 * MB, test: (b) => b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP" },
  { ext: "pdf", max: 10 * MB, test: (b) => b.subarray(0, 5).toString("latin1") === "%PDF-" },
];

export function createApp({ dataDir, distDir, passwordHash, sessionSecret }) {
  const uploadsDir = path.join(dataDir, "uploads");
  fs.mkdirSync(uploadsDir, { recursive: true });
  const store = openDb(path.join(dataDir, "portfolio.db"));
  const auth = createAuth({ passwordHash, secret: sessionSecret });
  const loginAllowed = createLimiter({ max: 10, windowMs: 15 * 60 * 1000 });
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * MB, files: 1 } });

  const app = express();
  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));

  // Reject cross-site writes (in addition to SameSite=Strict cookies).
  app.use("/api", (req, res, next) => {
    const origin = req.headers.origin;
    if (req.method !== "GET" && origin && new URL(origin).host !== req.headers.host) {
      return res.status(403).json({ error: "Cross-origin request blocked" });
    }
    next();
  });

  // ---- public ----
  app.get("/api/content", (req, res) => {
    const content = { site: store.getSite() };
    for (const c of COLLECTIONS) content[c] = store.list(c);
    res.json(content);
  });

  app.get("/api/me", (req, res) => res.json({ admin: auth.isAdmin(req) }));

  app.post("/api/login", (req, res) => {
    if (!auth.configured) return res.status(503).json({ error: "Admin password is not configured on the server" });
    if (!loginAllowed(req.ip)) return res.status(429).json({ error: "Too many attempts, try again later" });
    if (!auth.checkPassword(req.body?.password ?? "")) return res.status(401).json({ error: "Wrong password" });
    auth.setSession(req, res);
    res.json({ admin: true });
  });

  app.post("/api/logout", (req, res) => {
    auth.clearSession(res);
    res.json({ admin: false });
  });

  // ---- admin ----
  const admin = express.Router();
  admin.use(auth.requireAdmin);

  admin.patch("/site", (req, res) => {
    if (!isPlainObject(req.body)) return res.status(400).json({ error: "Body must be an object" });
    res.json(store.setSite({ ...store.getSite(), ...req.body }));
  });

  admin.param("collection", (req, res, next, collection) => {
    if (!COLLECTIONS.includes(collection)) return res.status(404).json({ error: "Unknown collection" });
    next();
  });

  admin.post("/items/:collection", (req, res) => {
    if (!isPlainObject(req.body)) return res.status(400).json({ error: "Body must be an object" });
    res.status(201).json(store.create(req.params.collection, req.body));
  });

  admin.post("/items/:collection/reorder", (req, res) => {
    const ids = req.body?.ids;
    if (!Array.isArray(ids) || !ids.every(Number.isInteger)) return res.status(400).json({ error: "ids must be an array of integers" });
    res.json(store.reorder(req.params.collection, ids));
  });

  admin.patch("/items/:collection/:id", (req, res) => {
    if (!isPlainObject(req.body)) return res.status(400).json({ error: "Body must be an object" });
    const item = store.update(req.params.collection, Number(req.params.id), req.body);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  });

  admin.delete("/items/:collection/:id", (req, res) => {
    if (!store.remove(req.params.collection, Number(req.params.id))) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  });

  admin.post("/upload", upload.single("file"), (req, res) => {
    const buf = req.file?.buffer;
    if (!buf) return res.status(400).json({ error: "No file" });
    const type = FILE_TYPES.find((t) => t.test(buf));
    if (!type) return res.status(415).json({ error: "Only PNG, JPG, GIF, WEBP images and PDF files are allowed" });
    if (buf.length > type.max) return res.status(413).json({ error: `File too large (max ${type.max / MB} MB)` });
    const name = `${crypto.randomBytes(12).toString("hex")}.${type.ext}`;
    fs.writeFileSync(path.join(uploadsDir, name), buf);
    res.status(201).json({ url: `/uploads/${name}` });
  });

  app.use("/api", admin);
  app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

  // ---- static ----
  app.use("/uploads", express.static(uploadsDir, {
    maxAge: "30d",
    immutable: true,
    setHeaders: (res) => res.setHeader("X-Content-Type-Options", "nosniff"),
  }));
  if (distDir && fs.existsSync(distDir)) {
    app.use(express.static(distDir, { index: false, maxAge: "1h" }));
    app.get("/{*splat}", (req, res) => res.sendFile(path.join(distDir, "index.html")));
  }

  // ---- errors ----
  app.use((err, req, res, next) => {
    const status = err.status || (err.code === "LIMIT_FILE_SIZE" ? 413 : 500);
    if (status >= 500) console.error(err);
    res.status(status).json({ error: status >= 500 ? "Server error" : err.message });
  });

  return app;
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}
