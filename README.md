# Sai Vidyasri Portfolio

Personal portfolio site for Sai Vidyasri Giridharan — product/UX designer. Built with Vite, React, and TypeScript.

Live site: https://saividyasrigiridharan.com

## Tech stack

- Vite + React 19 + TypeScript
- React Router (`HashRouter`) for client-side routing
- Tailwind v4 (via `@tailwindcss/vite`) alongside a CSS custom-property design token system (`src/styles/tokens.css`)
- Vitest for unit tests
- ESLint + Stylelint + Husky/lint-staged for pre-commit checks

## Project structure

```text
Portfolio/
├── index.html              # Vite entry point
├── public/                 # static assets, copied as-is into the build (CNAME, images, /experiments/*)
├── src/
│   ├── pages/               # route-level pages (Home, Lab, About, and one folder per case study)
│   │   ├── hmc/
│   │   ├── fidelity/
│   │   ├── marketplace/
│   │   └── multi-stakeholder/
│   ├── components/
│   │   ├── layout/          # nav, floating nav
│   │   ├── case-study/      # shared case-study building blocks (Outline, diagrams, annotations, ...)
│   │   └── ui/               # small shared UI (theme toggle, ...)
│   ├── context/              # ThemeContext
│   ├── styles/                # tokens.css, index.css
│   └── test/
├── DESIGN_SYSTEM_LOG.md     # running log of reusable components/tokens — read before adding new ones
└── CNAME                    # duplicated into public/CNAME so it ships in the build
```

## Local development

```bash
npm install
npm run dev        # Vite dev server
npm run build       # typecheck + production build → dist/
npm run preview     # serve the production build locally
npm test            # Vitest
npm run typecheck
npm run lint
npm run lint:css
```

## Deployment

Deploys automatically via GitHub Actions (`.github/workflows/deploy.yml`) on every push to `main`: builds the app with `npm run build` and publishes `dist/` to GitHub Pages. The custom domain is preserved via `public/CNAME`, which Vite copies into the build output.

## Contact

- LinkedIn: https://www.linkedin.com/in/sai-vidyasri-giridharan-a98270146/
- Email: vidya1997@gmail.com

## License

All design and content in this portfolio are copyright Sai Vidyasri Giridharan unless noted otherwise.
