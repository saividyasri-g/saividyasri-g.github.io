# Sai Vidyasri Portfolio (v2)

Personal portfolio website for Sai Vidyasri Giridharan, built as a static HTML/CSS/JS site with case-study pages and interactive experiments.

Live site: https://saividyasrigiridharan.com

## Overview

This repository contains:

- A single-page home experience with tabbed views for `work`, `experiments`, and `about`
- Individual case-study pages for selected projects
- Standalone experiment pages/assets in `expt/`
- Shared global styles and small vanilla-JS interaction scripts
- Interactive hologram avatar on landing and about pages (with glitch transitions, parallax, scan sweep)

Primary entry page:

- `index.html`

Case-study pages:

- `project-hmc.html`
- `project-tbm.html`
- `project-fid.html`
- `project-coursecompass.html`

## Tech Stack

- HTML5
- CSS3 (single shared stylesheet: `assets/css/main.css`)
- Vanilla JavaScript (inline scripts + small shared utilities)
- Font Awesome (icons via CDN)
- Lottie Player (via CDN)
- GoatCounter (privacy-friendly analytics)

## Project Structure

```text
Portfolio/
├── .gitignore
├── README.md
├── index.html
├── project-hmc.html
├── project-tbm.html
├── project-fid.html
├── project-coursecompass.html
├── CNAME
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── fontawesome-all.min.css
│   ├── js/
│   │   ├── topbar-scroll.js
│   │   └── footer-reveal.js
│   ├── media/
│   │   ├── about/
│   │   ├── hologram/        ← head.webm, head.mp4 (HEVC alpha for Safari), eyes.svg
│   │   ├── project_hmc/
│   │   ├── project_tbm/
│   │   ├── project_fid/
│   │   ├── project_ccomp/
│   │   ├── project_avis/
│   │   ├── resume.pdf
│   │   └── og-preview.jpeg
│   └── webfonts/
└── expt/
    ├── hologram-expt/
    │   └── hologram.html
    └── screenprint-expt/
        └── screenprint.html
```

## Optional: Run Locally (for testing edits)

You do not need to run locally to view the portfolio.  
Use local serve only when you want to test changes before publishing.

Option 1: VS Code Live Server

1. Open the project folder in VS Code
2. Start Live Server on `index.html`

Option 2: Python HTTP server

```bash
cd /Users/331014/Portfolio
python3 -m http.server 5502
```

Then open:

- `http://127.0.0.1:5502/index.html`

## Editing Guide

### Global styles

- Main styling and component rules: `assets/css/main.css`

### Home page content and interactions

- Layout/content for home, work, experiments, about: `index.html`
- Top nav behavior and view transitions: inline scripts in `index.html`

### Case-study content

- Update copy/media/section flow directly in each `project-*.html` file
- Sidebar active-state behavior is handled by inline script on each page

### Shared utility scripts

- Top navigation collapse/scroll handling: `assets/js/topbar-scroll.js`
- Footer reveal-on-scroll behavior: `assets/js/footer-reveal.js`

### Media assets

- Project and about images/videos live in `assets/media/`
- Hologram video layers (WebM + HEVC alpha MP4 for Safari) are in `assets/media/hologram/`
- HMC project media and Lottie JSON files are under `assets/media/project_hmc/`
- Experiment-specific files live in `expt/screenprint-expt/` and `expt/hologram-expt/`

### Hologram avatar

The landing page and about page both use a 6-layer video hologram effect with:
- Browser detection: WebM (Chrome/Firefox) or HEVC alpha MP4 (Safari)
- Shared `glitchIn()` / `glitchOut()` animation helpers
- Parallax head tracking via mouse position
- Landing: emitter beam boot → glitch-in → scan sweep line
- About: glitch-in → delay → glitch-out → real video reveal
- Cartoon eyes easter egg (click the landing hologram)

## Notes

- Local archive/reference folders `_quarantine/` and `cleanup-inventory/` are intentionally gitignored.
- `.DS_Store` files are gitignored.

## Deployment Notes

- This repo is configured as a static site (custom domain in `CNAME`)
- After CSS/JS changes, update cache-busting query strings in HTML when needed (for example `main.css?v=...`)
- Verify all internal links and hash targets after renaming section IDs/pages

## QA Checklist (Recommended)

- Check desktop and mobile layouts
- Verify tab/view transitions on `index.html`
- Verify sidebar active states in each case-study page
- Check media loading and fallback behavior (test hologram in both Safari and Chrome)
- Verify hologram glitch transitions on landing and about pages
- Confirm footer reveal behavior on long pages
- Validate resume link and external links open as expected

## Credits

- Font Awesome: https://fontawesome.com/
- Lottie Player: https://lottiefiles.com/web-player
- GoatCounter: https://www.goatcounter.com/

## Contact

- LinkedIn: https://www.linkedin.com/in/sai-vidyasri-giridharan-a98270146/
- Email: vidya1997@gmail.com

## License

All design and content in this portfolio are copyright Sai Vidyasri Giridharan unless noted otherwise.
