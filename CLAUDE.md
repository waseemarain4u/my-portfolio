# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML portfolio site for Waseem Akram (Senior Flutter Developer). There is no build step, no package manager, and no framework — every file is raw HTML, CSS (via Tailwind CDN), and JavaScript. The entire repo root is the deployment artifact.

## Deployment

**GitHub Pages (production):** Push to `main` → auto-deployed via `.github/workflows/deploy.yml`.

**FTP (alternate host):** Push to the `deploy` branch → auto-deployed to `thesoftdev.com/public_html/waseem/` via `.github/workflows/ftp-deploy.yml`. FTP credentials are stored as GitHub Secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`).

To preview locally, open any `.html` file directly in a browser — no server required. For live-reload, use any simple HTTP server:
```
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

### Stack (all loaded from CDN, no local installs)
- **Tailwind CSS** (`cdn.tailwindcss.com`) — configured inline in each page's `<head>` via `tailwind.config`
- **Alpine.js v3** (`cdn.jsdelivr.net`) — used for reactivity (dark mode, mobile menu, section tracking, project filtering)
- **Google Fonts** — PT Sans (headings/display) and DM Sans (body)

### Global design tokens (repeated in every page's `tailwind.config`)
- Accent: `#2563EB` (blue-600), accent-light: `#3B82F6`
- Font families: `display: ['PT Sans']`, `body: ['DM Sans']`
- Dark mode: `class` strategy — `dark` class on `<html>`

### Pages and their Alpine patterns

**`index.html`** — Main one-page site with an `app()` Alpine component on `<html>`. Manages: `dark` (theme), `mm` (mobile menu), `sc` (scroll/nav shadow), `s` (active section for nav highlighting). The `updateSection()` method scans named section IDs in reverse scroll order.

**`projects.html`** — Uses a `projects()` Alpine component with a data-driven project grid. All 16 projects are defined as an inline JS array with `{ id, title, category, categoryLabel, tags, year, desc, img }`. Filtering is done client-side via Alpine `x-show` against the `filter` state value.

**`blog.html` and `blog-article-*.html`** — Simpler pages; dark mode is handled with vanilla JS in a `DOMContentLoaded` listener (reads `localStorage` and adds the `dark` class). Alpine is only used for the mobile menu toggle on these pages.

**`404.html`** — Dark mode via an inline IIFE (runs before paint to avoid flash).

### Dark mode persistence
- `index.html`: Alpine `$watch('dark', v => localStorage.setItem('theme', v ? 'dark' : 'light'))`
- All other pages: `localStorage.getItem('theme')` read on `DOMContentLoaded`
- The key is always `'theme'`, values `'dark'` or `'light'`

### WebGL fluid (`fluid.js`)
Attached to `#fluid-canvas` in `index.html`'s hero section. MIT-licensed adaptation of Pavel Dobryakov's fluid simulation, tuned for a blue/zinc palette. Automatically downgrades resolution on mobile or when `OES_texture_half_float_linear` is unavailable.

### Shared CSS conventions
Each page repeats a small `<style>` block containing:
- `body::before` — subtle SVG fractal-noise texture overlay
- `.pf` / `.photo-frame` — image container with `overflow:hidden` and grey placeholder background
- `[x-cloak]` — hides Alpine elements before hydration
- Custom scrollbar styling (5px, accent-colored thumb)

When adding a new page, copy this style block from an existing page to stay consistent.

### Blog articles
Individual HTML files (`blog-article.html`, `blog-article-bloc.html`, etc.). Articles include a `.prose` CSS class for article typography. To add a new article: copy an existing article file, update the `<title>`, meta tags, `<link rel="canonical">`, and the article body content; then link it from `blog.html` and the relevant section of `index.html`.
