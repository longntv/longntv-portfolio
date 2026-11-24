# Initial Request

> tôi muốn xây dựng 1 website vừa show portfolio cũng như những nội project tôi làm, https://www.tringuyencse.com tham khảo này, ko phải clone mà dùng theme của tôi, nội dung có thể lưu trong db rất nhẹ, cho phép tôi copy paste chỉnh sửa trực tiếp từ website

**Summary (EN):** Build a website that shows my portfolio and the projects I've worked on. Use https://www.tringuyencse.com as a reference (not a clone) but keep my own theme. Content stored in a very lightweight DB, and I can copy-paste/edit content directly on the website.

## Reference site notes (tringuyencse.com)
- Single page, anchor sections: Hero, Who I Am (role cards), Vision & Mission, Technical Skills, Professional Journey (date range, company, role, description, tech tags), Featured Projects (image, label, title, description, tech tags; no detail pages), Community Lab, Certifications (title, issuer, date, verify link), Contact form.
- Locale prefix /en (i18n), dark-mode toggle. Built with Next.js + Tailwind.

## Current codebase
- Fork of soumyajit4419/Portfolio: CRA (react-scripts 5), React 17, react-bootstrap, react-router v6, dark/purple theme (`src/style.css`, `--imp-text-color: #c770f0`), particles background.
- Routes: `/`, `/project`, `/about`, `/resume`. All content hardcoded in JSX (e.g. `src/components/Projects/Projects.js`). No backend, no DB.
