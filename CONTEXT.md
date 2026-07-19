# Portfolio Build — Handoff Brief for Claude Code

This is the accumulated architecture and decisions from a planning session — treat it as settled, not open for re-derivation, except where explicitly marked OPEN.

Owner: Sai Vidyasri Giridharan — product/UX designer. Voice for anything written in her name: no drama, no heroic framing, authentic and factual. Every metric needs a defensible chain (tested vs. intended) or it gets caveated/dropped.

## How to start this session

1. Open the repo locally, on branch `adding-positioning` (already exists, not the deploy branch — safe to work in).
2. Give Claude Code this file, plus the Claude Design export (`Enterprise_Designer_Portfolio_Landing_Page.zip` — a handoff bundle with its own embedded README; unzip and read `Portfolio v2.dc.html` and `Project - Hero MotoCorp.dc.html` in full, per its own instructions).
3. First instruction to Claude Code should be: **read this brief, read the existing repo (`index.html`, `assets/css/main.css`, `DESIGN_SYSTEM_LOG.md`, `audit_tokens.py`/`audit_*.json`), read the Design bundle, then propose a short migration plan before writing code.** Don't let it start generating files before it's read what already exists — see "This is a migration" below.

## This is a migration, not a greenfield scaffold

The repo already has a live, working portfolio (hand-written static HTML/CSS/JS — see Repo facts below). The new build **replaces this codebase's implementation**, not adds a parallel one alongside it. Concretely:
- Images, JSON, and select content get reused from the old files — old HTML files stay in the repo as untouched reference until the new build supersedes them, but the *new system* (Vite/React/TS/Tailwind) becomes the actual thing that builds and deploys.
- Claude Code should actually inspect and reason about the current `main.css` tokens, `index.html` structure, and the existing `DESIGN_SYSTEM_LOG.md`/audit findings — not ignore them and start from a blank template. Part of the job is understanding what's there before deciding what changes.
- This means real refactor/migration work is in scope: replacing `package.json`, adding build tooling that didn't exist before, restructuring how pages are assembled — not just adding new files in a new folder.

---

## Repo facts (verified)

- Repo: `saividyasri-g/saividyasri-g.github.io`
- Live site: https://saividyasrigiridharan.com/ (custom domain via `CNAME`)
- Deploy: GitHub Pages, "Deploy from a branch" → `main`, root
- Working branch: `adding-positioning` — NOT the deploy branch. Nothing here touches the live site until a deliberate merge/deploy.
- Current live stack: hand-written static HTML/CSS/JS, no build tooling. `index.html` (94KB, heavy inline CSS/JS) plus `project-coursecompass.html`, `project-fid.html`, `project-hmc.html`, `project-tbm.html`.
- Only existing npm dependency: `playwright` (^1.60.0).
- `DESIGN_SYSTEM_LOG.md` / `audit_tokens.py` / `audit_*.json` already exist — a token audit was run. Don't rebuild that analysis blind; read it first.
- **CourseCompass:** deferred, out of scope for now. Doesn't map to any interview-prep story (Fidelity, Hero MotoCorp, Builder Market). Leave the live page untouched; don't build a new one.

## Stack — confirmed, not open

- **Vite + React + TypeScript.** Chosen over Astro/Next specifically because the animated-icon system (Claude-style icon animations) needs full React, not an islands model.
- **Tailwind v4** (CSS-first — `@theme`, native CSS custom-property integration), not v3's JS-config model. This matters: the token layer should live in CSS and Tailwind should read *from* it, not the reverse.
- **Testing:**
  - Pre-commit (fast, must not get bypassed): TypeScript typecheck, ESLint, **stylelint** (see token guardrail below), Vitest unit/component tests, `jest-axe` on components.
  - CI-only (slower, GitHub Actions): Playwright responsive/visual-regression, axe on full pages, production build must succeed.
  - Git hooks: Husky + lint-staged.
  - Branch protection: require green CI before merge.
  - **Storybook: explicitly backlogged.** Don't build it now, but structure components (isolated, prop-driven, no page-level coupling) so adding it later is a drop-in.
- **Deploy mechanics:** current Pages setup serves static files directly, no build step. A Vite app builds to `dist/`, which Pages won't serve by default — needs a GitHub Action to build and publish `dist/`. This is a separate, later step. No urgency since the working branch isn't the deploy branch.

## Token architecture — confirmed, not open

**Two-layer: Primitives → Semantics. Components consume semantic tokens only, never primitives directly.**

- Primitives: raw ramp, theme-agnostic (e.g. raw color values, raw type sizes).
- Semantics: meaning-mapped, theme-swappable (e.g. `--color-text-primary` resolves differently per `[data-theme]`).
- This is the structural fix for dark/light mode and for "add more colors later" — the old flat system (semantically-named but primitive-valued tokens sitting alongside separate dark-mode tokens) is exactly why that was painful before. Don't repeat that pattern.

**Carries forward as-is from existing `main.css` (verified via grep, solid, no override problem):**
- Spacing (4/8 grid): `--space-1`(4) through `--space-16`(64)
- Radius: `--radius-sm`(4) through `--radius-full`(999)

**Type scale: RESOLVED, do not use the old `main.css` steps.** The real Claude Design files use a much finer scale (values like 10.5, 11.5, 13.5, 14.5, 17, 19, 27, 34 throughout) than the old placeholder structure. Decision: snap everything to strict 4-multiples, matching the existing 4/8 spacing grid discipline. Locked scale:

| Step | px | Absorbs design values |
|---|---|---|
| xs | 8 | 7.5, 9.5, 10 |
| sm | 12 | 10.5, 11, 11.5, 12, 13, 13.5 |
| base | 16 | 14, 14.5, 15, 16, 17 |
| lg | 20 | 18, 19, 20 |
| xl | 28 | 27 |
| 2xl | 32 | 30 |
| 3xl | 36 | 34 |
| 4xl | 40 | 40 |

Two known hierarchy-flattening tradeoffs, already flagged and accepted, don't re-litigate: (1) mono meta-labels and some body text both land in `sm`(12) — acceptable, they're already differentiated by font/letterspacing, not just size; (2) the hero lead paragraph (originally 19px, meant to read heavier than body) collapses into `base`(16) alongside regular body copy and h3-subheads (18px) — if that distinction needs to survive, use weight 500 or bump to `lg`(20) in that specific instance, don't add a new scale step for it.

**Color: NOT carried forward from the old system.** Old accent (`#C504A5` magenta) and all old color values stay in the old HTML files only, not ported.

**Placeholder-color approach while real values are pending (if the Claude Design bundle doesn't fully resolve this):** hybrid — a coherent neutral grey ramp for structural surfaces (so real layout/hierarchy evaluation is possible during build) plus **one deliberately loud "REPLACE-ME" accent token** so any accent usage is visually impossible to miss and ship by accident.

**Guardrail:** stylelint rule banning raw hex and raw px inside component styles. This is the direct fix for the disease the audit already found (`--pc-body-size: 15px` one-off instead of extending the scale). Every value must go through the token layer — the only way to get a new value is to deliberately extend the scale, not sneak one in under deadline pressure.

## Design values — extracted from the bundle, RESOLVED, don't re-derive

Source: `Portfolio v2.dc.html` and `Project - Hero MotoCorp.dc.html` inside the export (both confirmed consistent with each other). These are real values, not placeholders — build the primitive/semantic token layer directly from these:

**Fonts:** Hanken Grotesk (400/500/600/700) for UI/body; IBM Plex Mono (400/500) for labels, meta text, section numbers, tags. Loaded via Google Fonts in the source — decide self-hosting vs. CDN as a build detail, not a design question.

**Color — light mode:**
`page:#f5f6f7 sidebar:#eceef0 main:#f7f8f9 card:#ffffff cardHover:#ffffff text:#191b1e title:#111316 secondary:#6a7077 meta:#9aa0a7 faint:#b6bbc1 hair:#e6e8eb hairHover:#d0d5da hlBg:#e5ebf5 hlText:#375070 tagBorder:#e2e5e8 knob:#ffffff`
Accent options (light): `#46617f` (default) `#4a6a8c` `#5a6a7a` `#3f5f9e`

**Color — dark mode:**
`page:#0c0f16 sidebar:#10141d main:#0c0f16 card:#1a2030 cardHover:#212840 text:#eaeef5 title:#f1f4f9 secondary:#96a0b2 meta:#6d7789 faint:#525c6e hair:#28303f hairHover:#333d4f hlBg:#1c2c44 hlText:#a8c0e0 tagBorder:#2d3646 knob:#212840`
Accent options (dark): `#8fa6c8` (default) `#9db6d6` `#a6b4c4` `#8ea3e8`

Map these into the two-layer architecture as semantics (`--color-text-primary`, `--color-surface-card`, `--color-border-hairline`, `--color-accent`, etc.) resolved per `[data-theme]` — don't hardcode the hex directly into components.

**Motion:** single easing curve throughout, `cubic-bezier(.2,.7,.2,1)`. Durations: `.45s` for color/theme-swap transitions, `.55s` for card hover sweeps, `.3s`–`.32s` for nav/toggle interactions. Turn these into tokens (`--ease-standard`, `--duration-theme`, `--duration-hover`, `--duration-toggle`) — directly relevant to the animated-icon goal, don't hardcode ad hoc.

**Radius:** 2px (highlight/rail) · 3px (tags) · 8–10px (photo/cards/stages) · 11–12px (buttons/widgets) · 14px (project cards) · 20px (toggle pill).

**Spacing/shadows:** no shadow/elevation system observed in the source files (flat, border-based surfaces, no box-shadow usage) — don't invent one. Spacing values in the source are ad hoc pixel values in the prototype (this is expected — it's a prototype, not tokenized); map them onto the existing `--space-*` 4/8 grid rather than importing them as new one-off values.

**Type scale:** see the resolved 4-multiple table above.

## Component library — naming is deliberate, keep as-is

Names must stay simple, direct, and personally memorable (Sai's explicit requirement — reject dev-jargon compounds like "MetricCallout" or "InteractiveOutline"):

- `Overview` — project metadata block (role, timeline, company, tags)
- `Metric` — metric display; **must carry a `status: 'tested' | 'intended'` prop that changes rendering.** This is the structural enforcement of the honesty rule (tested vs. intended claims must never look the same). Non-negotiable design constraint, not a nice-to-have.
- `BeforeAfter` (not "BeforeAfterComparison")
- `Iteration` (not "IterationComparison")
- `Outline` (not "InteractiveOutline") — in-page TOC/navigation
- `Learning` (not "LearningNote") — matches the narrative framework's own word, see below

## Content model — freeform composition, NOT a forced page template

**Important pivot, don't default to a rigid schema:** each case study is its own MDX file that composes whichever of the above components the story actually needs, in whatever order. There is no fixed "every case study has these sections in this order" template — Sai explicitly does not want to be forced to include e.g. personas or a "challenges" section if the story doesn't call for it.

- What's shared: the *component library* (so a `BeforeAfter` block looks/behaves identically wherever it's used) and the honesty constraint (baked into `Metric`'s prop type).
- What's NOT shared: page structure/section order/which components appear.
- Guardrail against drift creeping back in: keep a visible `components/case-study/index.ts` as the "menu" of what exists, so no one hand-rolls a one-off comparison block in raw JSX instead of importing the shared component. Not CI-enforced (narrative freedom means CI can't validate content shape) — just made easy to find and habitual to check.

**Narrative framework (Sai's own vocabulary, used in prose, not necessarily as literal component names):** Hook → Context → Problem → Action → Result → Learning, with a BLUF opener. When there's no metric, end on Learning rather than forcing a number. Segues between sections are load-bearing — don't let MDX prose read as disconnected fragments between components.

## Today's build priority

**First case study to build: Hero MotoCorp — structure and foundation only. Real content comes later, in a separate pass.** Do not write final Hero MotoCorp prose or lock in metrics today.

**OPEN — don't resolve, build to work either way:** whether Hero MotoCorp ships as one long page (the Design bundle's own `Project - Hero MotoCorp.dc.html` builds it this way: Overview → Problem → Solution → Impact → Deep Dive, all one page) or as two separate case studies (an earlier plan — service-manager tools vs. workflow integration — reasoned that combined "reads as too descriptive"). This is a content-authoring decision, not a component/architecture one: the same component library (`Overview`, `Metric`, `BeforeAfter`, `Iteration`, `Outline`, `Learning`) supports either shape, since each case study is just an MDX file composing whichever components it needs. Build the shell and components so this decision costs nothing to make later.

**OPEN — do not invent or carry over a number:** there's a known conflict between an earlier draft ("job-card creation: tested, 7 min faster") and the Design bundle's own content ("~3 min, 70% reduction from 8–10 mins," explicitly under a "Projected Impact" header — i.e. status `intended`, not `tested`). Sai will supply the correct number and status later. Leave this as a placeholder/TODO in whatever scaffolding references it — do not guess, do not default to either existing number, and do not render it as a real `Metric` until she confirms.

Background context (not yet finalized as page content, for orientation only): voluntary-adoption SaaS-style tool across a large authorized-dealer service-centre network for two-wheeler vehicle servicing — adoption itself was part of the design problem. Live with 100K+ downloads (functionally gated to authorized dealers — a distribution signal, not proof of uniform adoption; don't render this as an adoption/success metric). The Design bundle's Hero MotoCorp file does contain substantial real draft content (role/team/duration meta, two root-cause problems, three before/after solutions, four operational zones, three stakeholder roles, three research insights) — useful as reference for how content maps to components, but treat it as draft, not final, given the open metric conflict above.

## Sequencing for this session

1. Read the existing repo first (see "This is a migration" above) — don't skip straight to scaffolding.
2. Unzip and read the Claude Design bundle per its own README; cross-check against the extracted values already documented above rather than re-deriving from scratch.
3. Propose a short migration plan (what's being replaced, what's kept, rough file/folder layout) before writing code — flag anything ambiguous rather than guessing.
4. Scaffold Vite + React + TS + Tailwind v4, Husky/lint-staged, GitHub Actions CI (per Testing section above), replacing the current no-build-step setup.
5. Build primitive + semantic tokens using the resolved color/type/motion/radius values above.
6. Build the core component set: `Overview`, `Metric` (with the `status: 'tested' | 'intended'` prop, but no real metric values wired in yet — see OPEN item above), `BeforeAfter`, `Iteration`, `Outline`, `Learning`, plus whatever base primitives (Button, layout, ThemeToggle) the Hero shell actually requires.
7. Build the Hero MotoCorp page/route as a working shell composing the above with placeholder or draft-labeled content — structurally complete, not final copy.
8. Confirm the full pipeline is green (lint, typecheck, unit tests, a11y checks) before calling this session's build done.

## Explicitly deferred / not in scope today

- Final Hero MotoCorp content and metrics (see OPEN items above — Sai provides later)
- One-page vs. two-case-study decision for Hero MotoCorp (content-authoring choice, doesn't block structure)
- CourseCompass (undetermined status — decide later)
- Builder Market case study (not portfolio-ready — the specific advocacy/pushback moment is still a placeholder)
- Storybook
- Sound layer (don't preclude it in component APIs, but nothing to build now)
- `dist/` publish Action / actual deploy to live site (working branch isn't deploy branch — no urgency)

## Animated icons — noted for component API design

Sai's explicit goal: icon animation system similar to Claude's own (state-driven — idle/thinking/error/success-type states, not just decorative motion). Don't build this today unless the bundle already includes it, but component APIs (especially anything icon-adjacent) should not preclude adding state-driven animation later. This depends on motion/easing tokens being defined (see design-values list above) — don't hardcode ad hoc transition values into components now that would need to be ripped out later.