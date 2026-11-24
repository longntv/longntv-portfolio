import { DatabaseSync } from "node:sqlite";
import { seedSite, seedItems } from "./seed.js";

export const COLLECTIONS = ["projects", "experiences", "skills", "certifications"];

export function openDb(file) {
  const db = new DatabaseSync(file);
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      collection TEXT NOT NULL,
      slug TEXT,
      data TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE UNIQUE INDEX IF NOT EXISTS items_slug ON items(collection, slug) WHERE slug IS NOT NULL;
  `);
  const store = new Store(db);
  if (!db.prepare("SELECT 1 FROM settings WHERE key = 'site'").get()) {
    store.setSite(seedSite);
    for (const [collection, list] of Object.entries(seedItems)) {
      for (const data of list) store.create(collection, data);
    }
  }
  return store;
}

export function slugify(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "item";
}

class Store {
  constructor(db) {
    this.db = db;
  }

  getSite() {
    const row = this.db.prepare("SELECT value FROM settings WHERE key = 'site'").get();
    return row ? JSON.parse(row.value) : {};
  }

  setSite(site) {
    this.db
      .prepare("INSERT INTO settings (key, value) VALUES ('site', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
      .run(JSON.stringify(site));
    return site;
  }

  list(collection) {
    return this.db
      .prepare("SELECT * FROM items WHERE collection = ? ORDER BY sort_order, id")
      .all(collection)
      .map(toItem);
  }

  get(collection, id) {
    const row = this.db.prepare("SELECT * FROM items WHERE collection = ? AND id = ?").get(collection, id);
    return row ? toItem(row) : null;
  }

  create(collection, input) {
    const { slug, data } = this.#split(collection, input, null);
    const max = this.db.prepare("SELECT COALESCE(MAX(sort_order), -1) AS m FROM items WHERE collection = ?").get(collection).m;
    const { lastInsertRowid } = this.db
      .prepare("INSERT INTO items (collection, slug, data, sort_order) VALUES (?, ?, ?, ?)")
      .run(collection, slug, JSON.stringify(data), max + 1);
    return this.get(collection, Number(lastInsertRowid));
  }

  update(collection, id, patch) {
    const current = this.get(collection, id);
    if (!current) return null;
    const { id: _id, slug: oldSlug, ...oldData } = current;
    const merged = { ...oldData, ...patch };
    if (!("slug" in patch)) merged.slug = oldSlug;
    const { slug, data } = this.#split(collection, merged, id);
    this.db
      .prepare("UPDATE items SET slug = ?, data = ?, updated_at = datetime('now') WHERE collection = ? AND id = ?")
      .run(slug, JSON.stringify(data), collection, id);
    return this.get(collection, id);
  }

  remove(collection, id) {
    return this.db.prepare("DELETE FROM items WHERE collection = ? AND id = ?").run(collection, id).changes > 0;
  }

  reorder(collection, ids) {
    const stmt = this.db.prepare("UPDATE items SET sort_order = ? WHERE collection = ? AND id = ?");
    ids.forEach((id, i) => stmt.run(i, collection, id));
    return this.list(collection);
  }

  // Only projects have slugs (for /project/:slug). Returns a unique slug.
  #split(collection, input, selfId) {
    const { slug: rawSlug, id: _ignored, ...data } = input;
    if (collection !== "projects") return { slug: null, data };
    const base = slugify(rawSlug || data.title);
    let slug = base;
    for (let n = 2; this.#slugTaken(collection, slug, selfId); n++) {
      if (rawSlug && selfId !== null) {
        const err = new Error(`Slug "${slug}" is already used`);
        err.status = 409;
        throw err;
      }
      slug = `${base}-${n}`;
    }
    return { slug, data };
  }

  #slugTaken(collection, slug, selfId) {
    const row = this.db.prepare("SELECT id FROM items WHERE collection = ? AND slug = ?").get(collection, slug);
    return row && row.id !== selfId;
  }
}

function toItem(row) {
  const item = { id: row.id, ...JSON.parse(row.data) };
  if (row.slug) item.slug = row.slug;
  return item;
}
