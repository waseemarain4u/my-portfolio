# Waseem Akram — Portfolio

Personal portfolio site for Waseem Akram, Senior Flutter Developer & Lead Mobile Developer with 10+ years of experience building cross-platform apps for Android, iOS, Web, and Desktop.

**Live site:** https://waseemarain4u.github.io/my-portfolio/

---

## Tech Stack

| Layer | Tool |
|---|---|
| Markup | HTML5 (one file per page) |
| Styling | Tailwind CSS v3 (CDN) |
| Interactivity | Alpine.js v3 (CDN) |
| Shared UI | Vanilla JS (`components/shared.js`) |
| Fonts | Space Grotesk (headings), Inter (body) — Google Fonts |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |

No build step, no bundler, no npm.

---

## Pages

| File | Route | Notes |
|---|---|---|
| `index.html` | `/` | Hero, Skills, Work, About, Experience, Blog preview, Contact |
| `projects.html` | `/projects` | Filterable project grid |
| `blog.html` | `/blog` | Blog post cards |
| `blog-article-{slug}.html` | `/blog-{slug}` | Individual blog articles |
| `404.html` | 404 | Custom not-found page |

---

## Project Structure

```
my-portfolio/
├── index.html
├── projects.html
├── blog.html
├── blog-article-*.html
├── 404.html
├── components/
│   └── shared.js          # Auto-injects nav + footer, handles dark mode
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages deployment
└── CLAUDE.md              # AI assistant context
```

---

## Local Development

No install needed. Open any HTML file directly in a browser:

```bash
# Quick option — Python dev server
python3 -m http.server 8080
# then visit http://localhost:8080
```

Or just double-click `index.html`.

---

## Deployment

Pushing to `main` triggers the GitHub Actions workflow which deploys the site to GitHub Pages automatically. No manual steps required.

---

## Shared Components

`components/shared.js` auto-injects the nav and footer into any page that includes:

```html
<div id="site-nav"></div>
<div id="site-footer"></div>
```

Load it **without** `defer` so dark mode applies before first paint:

```html
<script src="components/shared.js"></script>
```

Dark mode is class-based (`dark:`), toggled via the nav button, and persisted in `localStorage` under the key `theme`.
