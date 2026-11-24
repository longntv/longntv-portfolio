# Detail Questions

## Q1: Should we replace all leftover template content (Soumyajit's bio, projects, resume PDF, GitHub username) with your real content, seeded into the DB from your CV/LinkedIn info you provide?
**Default if unknown:** Yes (current content belongs to the original template author; shipping it on longdev.xyz would be wrong).

## Q2: Is it OK to migrate the build tool from Create React App to Vite while keeping all existing components and CSS (same look)?
**Default if unknown:** Yes (CRA is unmaintained and fragile on the VPS's Node 26; Vite is a drop-in for the same React code).

## Q3: Should long text (project detail write-ups, About bio) support formatting via Markdown when you paste it (headings, lists, links, code, images), while short fields (titles, dates, tags) are plain text?
**Default if unknown:** Yes (paste from notes/README keeps structure; Markdown is safe to sanitize and easy to store in SQLite).

## Q4: Do you need to upload/paste images (project screenshots, avatar) and the resume PDF directly from the website, stored on the VPS?
**Default if unknown:** Yes (editing on-site is incomplete without images; files stored in an `uploads/` folder next to the SQLite DB).

## Q5: Should the backend run as a Docker Compose service (like the existing vn-stock-trader stack) behind a new nginx vhost for longdev.xyz with Certbot HTTPS, leaving wealthy.longdev.xyz untouched?
**Default if unknown:** Yes (matches existing VPS deploy pattern; isolated, easy restart/backup).
