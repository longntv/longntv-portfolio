# Context Findings

## Current codebase
- CRA app (`react-scripts` 5.0.0), React 17, react-bootstrap 2, react-router-dom 6, react-tsparticles, typewriter-effect, react-pdf. No backend, no DB, no `node_modules` installed yet.
- Routes in `src/App.js`: `/` (Home), `/project` (Projects), `/about` (About), `/resume` (Resume), `*` → `/`. Preloader (1.2s), Navbar, Footer, ScrollToTop.
- **All content is hardcoded in JSX and still belongs to the original template author (Soumyajit Behera)**:
  - `src/components/Home/Home.js`, `Home/Home2.js`, `Home/Type.js` (typewriter strings) — intro, social links.
  - `src/components/About/AboutCard.js` — bio, hobbies, quote.
  - `src/components/About/Techstack.js`, `Toolstack.js` — icon grids (react-icons).
  - `src/components/About/Github.js` — GitHub contributions calendar (username hardcoded).
  - `src/components/Projects/Projects.js` — 6 `<ProjectCard>` with `imgPath, title, description, ghLink, demoLink, isBlog`; images in `src/Assets/Projects/*.png`.
  - `src/components/Resume/ResumeNew.js` — PDF `src/Assets/Soumyajit_Behera-BIT_MESRA.pdf`, pdf.js worker from cdnjs.
  - `src/components/Footer.js`, `Navbar.js` — name/links.
- Theme: `src/style.css` (`--imp-text-color: #c770f0`, gradient section backgrounds, `.project-card-view`, `.quote-card-view`, `.project-heading`, `.purple`), `src/components/Particle.js`.

## Reference IA to borrow (tringuyencse.com, not cloned)
Hero · Who I Am (role cards) · Vision & Mission · Technical Skills · Professional Journey (date range, company, role, description, tech tags) · Featured Projects (image, label, title, description, tech tags) · Community Lab (side projects w/ live link) · Certifications (title, issuer, date, verify URL) · Contact. No project detail pages there — we add them (Q3).

## VPS environment (deploy target, Q4)
- Ubuntu 24.04, 4 vCPU, 7.8 GB RAM, 84 GB free disk.
- Node v26.13.0 / npm 11.20.0, Docker, nginx, certbot installed.
- nginx already serves `wealthy.longdev.xyz` (`/etc/nginx/conf.d/wealthy.longdev.xyz.conf`, proxy → 127.0.0.1:8080, Certbot SSL). Port 8080 is taken by `vn-stock-trader-frontend-1` docker stack (+ MySQL container). New site must use a different local port and its own `conf.d/longdev.xyz.conf`, without touching the existing one.
- Domain `longdev.xyz` (apex, presumably + `www`) will be pointed by the user → certbot `--nginx` for SSL.

## Technical constraints & considerations
- **CRA 5 on Node 26**: react-scripts 5 is unmaintained; may need `NODE_OPTIONS=--openssl-legacy-provider` or fail with newer deps. Migrating to Vite (same React components, same CSS) is low-risk and keeps the theme. Decide in detail phase.
- **Lightweight DB**: SQLite single file is the natural fit for one admin + low traffic. Node 22+ ships built-in `node:sqlite` (no native build); alternative `better-sqlite3`. Store content as rows per section/item with JSON fields (tags, links) — simple, backup = copy one file.
- **Backend**: tiny Node HTTP API (Express or Fastify) on 127.0.0.1:<port>, nginx serves built static frontend and proxies `/api`. Run via systemd or a docker-compose service (consistent with existing docker usage).
- **Auth (Q1)**: single admin → password (hashed in env/config) → HttpOnly session cookie; all write endpoints require it; rate-limit login.
- **Inline editing ("copy paste chỉnh sửa trực tiếp")**: an edit mode toggled when logged in; text fields become `contentEditable` / textarea in place; paste must be sanitized (strip external HTML/styles) — either plain text or a small Markdown/rich-text subset. Long project write-ups likely Markdown (render with a sanitizing renderer). Add/delete/reorder items in lists (projects, journey, skills, certs).
- **Images**: projects/avatar need images; inline editing implies upload (or paste image from clipboard) stored on disk (`/uploads`) with path in DB.
- **SEO**: SPA content loaded from API isn't in initial HTML; acceptable for a portfolio, or prerender later.
- **Detail pages (Q3)**: new route `/project/:slug`; `ProjectCard` links to it.

## Files likely to change / add
- Modify: `src/App.js` (routes, auth context), `src/components/Projects/Projects.js`, `ProjectCards.js`, `Home/*.js`, `About/*.js`, `Resume/ResumeNew.js`, `Navbar.js`, `Footer.js`, `src/style.css` (edit-mode styles), `package.json`.
- Add: `server/` (API + SQLite + seed), `src/components/Projects/ProjectDetail.js`, new section components (Journey, Certifications), editable-field component, `deploy/` (nginx conf, systemd unit or compose).
