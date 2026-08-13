# Claui & Co — claui.okstudios.cloud

Personal brand site for **Claui & Co** — skin confidence & whole-life wellness for women,
faith-rooted and powered by USANA Celavive. *Simple habits, real results.*

Hand-built, no-build static site.

## Structure
- `index.html` — single-page site
- `css/styles.css` — styles (warm cream / sage / dusty-rose palette)
- `js/main.js` — scroll reveal, sticky nav, parallax, mobile menu
- `assets/` — imagery (transparent-bg portrait cutouts + lifestyle/before-after photos)

## Design
- Layout & scroll animation modelled on the client's reference.
- Palette sourced from the client's Canva site.
- Typography: Archivo (display) · Playfair Display (italic serif) · Caveat (script).

## Deploy
Cloudflare Pages (project `claui`) → `claui.okstudios.cloud` (Hostinger DNS CNAME → `claui.pages.dev`).
`.github/workflows/deploy.yml` enables push-to-deploy once the `CLOUDFLARE_API_TOKEN` repo secret is set.
