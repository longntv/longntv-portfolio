import crypto from "node:crypto";

const COOKIE = "sid";
const MAX_AGE_MS = 7 * 24 * 3600 * 1000;

export function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password, stored) {
  const [algo, saltHex, hashHex] = String(stored || "").split(":");
  if (algo !== "scrypt" || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(String(password), Buffer.from(saltHex, "hex"), expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

export function createAuth({ passwordHash, secret }) {
  const sign = (value) => crypto.createHmac("sha256", secret).update(value).digest("hex");

  function isAdmin(req) {
    const token = parseCookies(req.headers.cookie)[COOKIE];
    if (!token) return false;
    const [exp, mac] = token.split(".");
    if (!exp || !mac || Number(exp) < Date.now()) return false;
    const expected = sign(exp);
    return mac.length === expected.length && crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
  }

  function setSession(req, res) {
    const exp = String(Date.now() + MAX_AGE_MS);
    res.cookie(COOKIE, `${exp}.${sign(exp)}`, {
      httpOnly: true,
      sameSite: "strict",
      secure: req.secure,
      maxAge: MAX_AGE_MS,
      path: "/",
    });
  }

  function clearSession(res) {
    res.clearCookie(COOKIE, { path: "/" });
  }

  function requireAdmin(req, res, next) {
    if (isAdmin(req)) return next();
    res.status(401).json({ error: "Unauthorized" });
  }

  return {
    configured: Boolean(passwordHash),
    checkPassword: (pw) => Boolean(passwordHash) && verifyPassword(pw, passwordHash),
    isAdmin,
    setSession,
    clearSession,
    requireAdmin,
  };
}

// Simple in-memory limiter: `max` attempts per `windowMs` per key.
export function createLimiter({ max = 10, windowMs = 15 * 60 * 1000 } = {}) {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.reset < now) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= max;
  };
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([k, v]) => k && v)
      .map(([k, ...v]) => [k, decodeURIComponent(v.join("="))])
  );
}
