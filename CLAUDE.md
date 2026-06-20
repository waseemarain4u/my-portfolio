# my-portfolio — Claude Context

## Rules
- **Always explain before coding.** For any task, describe what you plan to change and why, then wait for the user to confirm before writing or editing any code.
- Keep explanations short — bullet points, not paragraphs.
- If the plan is wrong or incomplete, the user will redirect before any code is touched.

## Project
Static portfolio site for Waseem Akram (Senior Flutter Developer & Lead Developer).
No build system. Edit HTML files directly and push — GitHub Actions deploys to GitHub Pages.

## Stack
- HTML5 — one file per page, all at root level
- Tailwind CSS — loaded via CDN, no config file
- Alpine.js v3 — loaded via CDN, used for interactive UI state
- Vanilla JS — `components/shared.js` for shared nav/footer
- GitHub Pages — auto-deployed on push to `main` via `.github/workflows/deploy.yml`

## Pages
| File | Route | `data-page` key |
|---|---|---|
| `index.html` | `/` | *(none)* |
| `projects.html` | `/projects` | `projects` |
| `blog.html` | `/blog` | `blog` |
| `blog-article-{slug}.html` | `/blog-{slug}` | *(none)* |
| `404.html` | 404 | *(none)* |

## Shared Components (`components/shared.js`)
Auto-injects nav and footer via placeholder `<div>` IDs:
- `<div id="site-nav"></div>` — replaced with the full `<header>`
- `<div id="site-footer"></div>` — replaced with the full `<footer>`

Control behavior via `<body>` attributes:
- `data-page="projects"` — highlights the matching nav link
- `data-scroll-header="true"` — nav starts transparent, turns solid after 20px scroll

## Design Tokens (Tailwind classes)
- Accent color: `text-accent`, `bg-accent`, `hover:bg-accent-light`
- Font display (headings): `font-display` → PT Sans
- Font body: DM Sans (default)
- Container: `max-w-6xl mx-auto px-6`
- Dark mode: class-based (`dark:`), toggled by `shared.js`, persisted in `localStorage` key `theme`

## Conventions
- All new pages must include `<div id="site-nav"></div>` and `<div id="site-footer"></div>`
- Load `shared.js` without `defer` so dark mode applies before paint: `<script src="components/shared.js"></script>`
- New blog articles go in root as `blog-article-{slug}.html` and get a card added to `blog.html`
- No npm, no bundler — never add a build step without discussion
