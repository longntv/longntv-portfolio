# Requirements Spec — Editable Portfolio (longdev.xyz)

## 1. Problem statement
The repo is a fork of the soumyajit4419 portfolio template: every piece of content is hardcoded in JSX and still belongs to the template author. Changing anything requires editing code and redeploying. The owner wants a personal portfolio + project showcase at **longdev.xyz**, keeping the current look, with content stored in a very lightweight DB and editable directly on the website (copy-paste friendly).

## 2. Solution overview
- Keep the existing React UI and theme; migrate the build from CRA to **Vite**.
- Add a tiny **Node API + SQLite** backend that stores all content and uploads.
- Add an **admin edit mode**: when the owner is logged in, content becomes editable in place; visitors see a read-only site.
- Extend information architecture with sections inspired by tringuyencse.com (not cloned): Journey, Skills, Certifications, Side projects, plus **project detail pages**.
- Deploy on this VPS with **Docker Compose** behind a new nginx vhost + Certbot HTTPS.

## 3. Functional requirements

### 3.1 Public site (read-only for visitors)
- FR-1 Keep existing pages/routes: `/` Home, `/project` Projects, `/about` About, `/resume` Resume; unknown → `/`.
- FR-2 New route `/project/:slug` — project detail page: title, cover image, summary, role, period, tech tags, links (GitHub/demo/other), long write-up (Markdown), optional gallery images.
- FR-3 Projects list cards link to their detail page; keep GitHub/Demo buttons; show tech tags; optional "featured" flag and manual ordering.
- FR-4 New content sections (placed on Home/About in current theme style):
  - Journey/Experience: period, company, role, description (Markdown), tech tags.
  - Skills: grouped list (group name + items; icon optional).
  - Certifications: title, issuer, date, verify URL.
  - Side projects / lab (may reuse the projects table with a `category` field).
- FR-5 Profile/site settings editable: name, typewriter roles, intro text, About bio (Markdown), hobbies, quote, avatar, social links, GitHub username for the contributions calendar, footer text, resume PDF.
- FR-6 Single language (English). No dark/light toggle needed (theme is dark).

### 3.2 Admin & inline editing
- FR-7 Single admin. Login at a hidden route (e.g. `/admin`) with password; session via HttpOnly, Secure, SameSite=Strict cookie. Logout. Login attempts rate-limited.
- FR-8 When logged in, a floating toolbar shows "Edit mode" on/off. In edit mode:
  - Short fields (titles, dates, tags, URLs) edit in place as plain text; paste strips formatting.
  - Long fields (bio, descriptions, project write-ups) open an in-place Markdown editor with live preview; pasted content kept as Markdown/plain text (HTML paste converted or stripped).
  - Lists (projects, journey, skills, certifications, links, tags): add, delete (with confirm), reorder.
  - Explicit Save / Cancel per item (or autosave with visible saved state); errors shown inline.
- FR-9 Images: upload via file picker, drag-drop, or **paste from clipboard**; replaces cover/avatar/gallery image. Resume PDF uploadable and replaces the current one.
- FR-10 Project slug auto-generated from title, editable, unique.
- FR-11 Visitors never see edit controls; all write endpoints reject unauthenticated requests (401).

### 3.3 Content migration
- FR-12 Remove all template-author content (Soumyajit bio, 6 projects + images, PDF, GitHub username, social links). Seed the DB with the owner's real content from CV/LinkedIn info they provide. Until provided, seed neutral placeholders.

## 4. Technical requirements

### 4.1 Frontend
- Migrate to Vite: add `vite.config.js`, `index.html` at root (from `public/index.html`), `src/main.jsx` (from `src/index.js`); rename JSX files as needed; remove `react-scripts`; update `package.json` scripts (`dev`, `build`, `preview`). Upgrading React 17 → 18 is allowed if a dependency requires it, but not required.
- Keep `src/style.css`, `src/App.css`, `src/components/Particle.js`, Bootstrap, preloader, Navbar/Footer look unchanged.
- Data layer: fetch content from `/api/*` (single `GET /api/content` bootstrap is fine for this size), loading state uses existing preloader.
- Components to refactor from hardcoded to data-driven: `Home/Home.js`, `Home/Home2.js`, `Home/Type.js`, `About/AboutCard.js`, `About/Techstack.js`, `About/Toolstack.js`, `About/Github.js`, `Projects/Projects.js`, `Projects/ProjectCards.js`, `Resume/ResumeNew.js`, `Navbar.js`, `Footer.js`.
- New: `Projects/ProjectDetail.js`, `Journey/*`, `Certifications/*`, an `Editable` text component, a Markdown field component (render with a sanitizing renderer, e.g. `react-markdown` without raw HTML), image upload/paste component, admin auth context, admin toolbar.
- Resume: serve PDF from `/uploads/...`; bundle the pdf.js worker locally instead of cdnjs.

### 4.2 Backend (`server/`)
- Node (LTS in Docker image) + Express/Fastify; SQLite via `node:sqlite` or `better-sqlite3`. Single DB file `data/portfolio.db`; uploads in `data/uploads/` (both on a Docker volume / bind mount).
- Suggested tables: `settings` (key → JSON), `projects` (id, slug, title, summary, body_md, role, period, tags JSON, links JSON, cover, gallery JSON, category, featured, sort_order, updated_at), `experiences`, `skill_groups`, `certifications` — each with `sort_order`.
- Endpoints: `GET /api/content`, `GET /api/projects/:slug`; authenticated `POST/PUT/DELETE` for each collection, `PUT /api/settings/:key`, `POST /api/reorder`, `POST /api/upload` (images: png/jpg/webp/gif ≤ 5 MB; pdf ≤ 10 MB; random filenames; type check by content), `POST /api/login`, `POST /api/logout`, `GET /api/me`.
- Admin password from env as a hash (`ADMIN_PASSWORD_HASH`, bcrypt/argon2/scrypt); session secret from env. `.env` not committed.
- Seed script populates initial content; idempotent.
- Backup = copy `data/` (document a one-line command / optional cron).

### 4.3 Deployment (this VPS)
- `docker-compose.yml` at repo root (`deploy/` optional): one service builds the frontend and runs the API, serving `dist/` + `/uploads` + `/api`, bound to `127.0.0.1:<free port, e.g. 8090>` (8080 is used by vn-stock-trader).
- nginx: new `/etc/nginx/conf.d/longdev.xyz.conf` for `longdev.xyz` and `www.longdev.xyz` → proxy to that port; `client_max_body_size 15m`; SPA fallback handled by the app. Do **not** modify `wealthy.longdev.xyz.conf` or `sites-enabled/default`.
- HTTPS via `certbot --nginx -d longdev.xyz -d www.longdev.xyz` after the owner points DNS A records to this VPS.
- Container restart policy `unless-stopped`.

## 5. Acceptance criteria
- AC-1 `npm run build` (Vite) succeeds; site looks the same as before (theme, particles, navbar, cards) aside from new content/sections.
- AC-2 No template-author content remains (grep for "Soumyajit"/"soumyajit4419" returns nothing in `src/` and the DB seed).
- AC-3 Visitor (logged out): all pages render from DB; no edit controls; any write API call returns 401.
- AC-4 Admin can log in, toggle edit mode, edit a project title in place, paste a Markdown write-up, paste an image from clipboard as cover, save, reload the page and see changes persisted.
- AC-5 Admin can add, reorder, and delete projects, journey entries, skills, certifications; new project gets a working `/project/:slug` page.
- AC-6 Pasting rich HTML (e.g. from a web page) into a short field yields plain text; Markdown rendering does not execute scripts/raw HTML.
- AC-7 Resume PDF uploaded via the site is shown on `/resume` and downloadable.
- AC-8 `https://longdev.xyz` serves the site with a valid certificate; `wealthy.longdev.xyz` keeps working unchanged.
- AC-9 Restarting the container keeps all content and uploads.

## 6. Assumptions
- English-only UI and content; single admin; low traffic (no caching layer/CDN needed).
- SPA (no SSR); SEO limited to static `<title>`/meta set from settings — acceptable for now.
- Contact form from the reference is **out of scope** (not asked); contact via email/social links.
- No content version history; DB file backup is the recovery mechanism.
- Owner will provide real content (CV/LinkedIn text) and DNS setup for longdev.xyz; placeholders used until then.
- README credit to the original template author is kept (their repo asks for it) though their content is removed.
