# Portfolio — longdev.xyz

Personal portfolio and project showcase. Content lives in a small SQLite database and is edited directly on the website.

Based on the [Portfolio template by Soumyajit Behera](https://github.com/soumyajit4419/Portfolio) (theme and layout).

## Stack

- Frontend: React 17 + react-bootstrap, built with Vite (`src/`)
- Backend: Express + built-in `node:sqlite` (`server/`), single DB file + `uploads/` in `DATA_DIR`
- Deploy: Docker Compose on `127.0.0.1:8090`, nginx vhost in `deploy/longdev.xyz.conf`

## Editing content

1. Open `/admin` and log in with the admin password.
2. Toggle **Edit mode** in the bar at the bottom right.
3. Click any dashed field to edit it in place (paste is converted to plain text; Enter/blur saves, Esc cancels).
   - Long texts (intro, bio, project write-ups, experience descriptions) use Markdown with live preview; images can be pasted directly into the editor.
   - Images: click **Change image**, or focus the image and paste / drop a file.
   - Lists: add with the **Add …** buttons, reorder / delete with the ↑ ↓ 🗑 buttons.
   - Resume: upload a PDF on the Resume page.

## Local development

```bash
npm install
cp .env.example .env            # fill in values, see below
npm run server                  # API on http://127.0.0.1:3001 (data in ./data)
npm run dev                     # Vite dev server, proxies /api and /uploads
npm test                        # API tests
```

`.env`:

```bash
ADMIN_PASSWORD_HASH=$(npm run -s hash-password -- 'your-password')
SESSION_SECRET=$(openssl rand -hex 32)
```

## Deploy (this VPS)

```bash
docker compose up -d --build                       # app on 127.0.0.1:8090
sudo cp deploy/longdev.xyz.conf /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d longdev.xyz -d www.longdev.xyz
```

Change the admin password: generate a new hash with `npm run hash-password -- '<new>'`, put it in `.env`, then `docker compose up -d`.

## Backup

All content is in the `portfolio-data` Docker volume:

```bash
docker compose cp portfolio:/app/data ./backup-$(date +%F)
```
