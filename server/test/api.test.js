import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createApp } from "../app.js";
import { hashPassword } from "../auth.js";

let server, base, dataDir;

before(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-test-"));
  const app = createApp({ dataDir, distDir: null, passwordHash: hashPassword("correct-horse"), sessionSecret: "test-secret" });
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

const json = (method, body, cookie) => ({
  method,
  headers: { "content-type": "application/json", ...(cookie ? { cookie } : {}) },
  body: body === undefined ? undefined : JSON.stringify(body),
});

async function login() {
  const res = await fetch(`${base}/api/login`, json("POST", { password: "correct-horse" }));
  assert.equal(res.status, 200);
  return res.headers.get("set-cookie").split(";")[0];
}

test("public content is seeded", async () => {
  const c = await (await fetch(`${base}/api/content`)).json();
  assert.ok(c.site.name);
  assert.ok(c.projects.length > 0);
  assert.ok(c.projects.every((p) => p.slug));
});

test("visitor writes are rejected with 401", async () => {
  const calls = [
    ["PATCH", "/api/site", { name: "x" }],
    ["POST", "/api/items/projects", { title: "x" }],
    ["PATCH", "/api/items/projects/1", { title: "x" }],
    ["DELETE", "/api/items/projects/1"],
    ["POST", "/api/items/projects/reorder", { ids: [1] }],
    ["POST", "/api/upload", {}],
  ];
  for (const [m, url, body] of calls) {
    const res = await fetch(base + url, json(m, body));
    assert.equal(res.status, 401, `${m} ${url}`);
  }
  assert.deepEqual(await (await fetch(`${base}/api/me`)).json(), { admin: false });
});

test("wrong password is rejected", async () => {
  const res = await fetch(`${base}/api/login`, json("POST", { password: "nope" }));
  assert.equal(res.status, 401);
});

test("admin can edit site and CRUD projects with unique slugs", async () => {
  const cookie = await login();
  assert.deepEqual(await (await fetch(`${base}/api/me`, { headers: { cookie } })).json(), { admin: true });

  const site = await (await fetch(`${base}/api/site`, json("PATCH", { name: "New Name" }, cookie))).json();
  assert.equal(site.name, "New Name");
  assert.ok(site.footerText, "patch merges instead of replacing");

  const a = await (await fetch(`${base}/api/items/projects`, json("POST", { title: "Dự án Đẹp" }, cookie))).json();
  const b = await (await fetch(`${base}/api/items/projects`, json("POST", { title: "Dự án Đẹp" }, cookie))).json();
  assert.equal(a.slug, "du-an-dep");
  assert.equal(b.slug, "du-an-dep-2");

  const renamed = await (await fetch(`${base}/api/items/projects/${a.id}`, json("PATCH", { title: "Other" }, cookie))).json();
  assert.equal(renamed.slug, "du-an-dep", "title change keeps slug");

  const clash = await fetch(`${base}/api/items/projects/${b.id}`, json("PATCH", { slug: "du-an-dep" }, cookie));
  assert.equal(clash.status, 409);

  const ids = (await (await fetch(`${base}/api/content`)).json()).projects.map((p) => p.id).reverse();
  const reordered = await (await fetch(`${base}/api/items/projects/reorder`, json("POST", { ids }, cookie))).json();
  assert.deepEqual(reordered.map((p) => p.id), ids);

  assert.equal((await fetch(`${base}/api/items/projects/${b.id}`, json("DELETE", undefined, cookie))).status, 204);
  assert.equal((await fetch(`${base}/api/items/nope`, json("POST", {}, cookie))).status, 404);
});

test("uploads are type-checked by content", async () => {
  const cookie = await login();
  const send = (bytes, name) => {
    const fd = new FormData();
    fd.append("file", new Blob([bytes]), name);
    return fetch(`${base}/api/upload`, { method: "POST", body: fd, headers: { cookie } });
  };
  const bad = await send(Buffer.from("<script>alert(1)</script>"), "x.png");
  assert.equal(bad.status, 415);

  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
  const ok = await send(png, "evil.html");
  assert.equal(ok.status, 201);
  const { url } = await ok.json();
  assert.match(url, /^\/uploads\/[0-9a-f]{24}\.png$/);
  const served = await fetch(base + url);
  assert.equal(served.status, 200);
  assert.equal(served.headers.get("content-type"), "image/png");
});

test("cross-origin writes are blocked", async () => {
  const cookie = await login();
  const res = await fetch(`${base}/api/site`, {
    ...json("PATCH", { name: "x" }, cookie),
    headers: { "content-type": "application/json", cookie, origin: "https://evil.example" },
  });
  assert.equal(res.status, 403);
});
