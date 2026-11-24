import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || "127.0.0.1";

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  sessionSecret = crypto.randomBytes(32).toString("hex");
  console.warn("SESSION_SECRET not set: using a random one (admin sessions reset on restart)");
}
if (!process.env.ADMIN_PASSWORD_HASH) {
  console.warn("ADMIN_PASSWORD_HASH not set: admin login is disabled (run `npm run hash-password`)");
}

const app = createApp({
  dataDir: path.resolve(root, process.env.DATA_DIR || "data"),
  distDir: path.join(root, "dist"),
  passwordHash: process.env.ADMIN_PASSWORD_HASH,
  sessionSecret,
});

app.listen(port, host, () => console.log(`Portfolio server on http://${host}:${port}`));
