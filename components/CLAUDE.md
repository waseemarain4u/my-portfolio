# components/ — Claude Context

## shared.js
Single IIFE. Runs synchronously (no `defer`) so dark mode applies before first paint.

### What it does (in order)
1. Reads `localStorage.theme` and applies `dark` class to `<html>` immediately
2. Injects full `<header>` nav into `#site-nav` placeholder
3. Injects `<footer>` into `#site-footer` placeholder
4. Wires mobile menu toggle
5. Optionally makes nav transparent on scroll (when `data-scroll-header="true"`)

### Adding a nav link
Edit the `NAV_LINKS` array — each entry needs `label`, `href`, and `key` (key must match the `data-page` value on the target page's `<body>`, or `''` if it should never be highlighted).

### Do not
- Split into multiple files (no module system available)
- Use `defer` or `async` on the script tag (breaks dark mode flash prevention)
- Add external dependencies here
