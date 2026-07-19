# Design System Log

Living record of reusable UI components and design tokens for this portfolio, kept as we build toward a small, consistent design system across the site.

**Process:** entries are added/updated only when a component or token is explicitly confirmed — implementation work happens first (and may go through revisions), but a component isn't marked **Committed** here until you say so. Until then it's listed as **Proposed**.

**Responsive principle:** this site targets mobile / tablet / web. Spacing, padding, and gaps default to the existing 4/8px scale (`--space-1` through `--space-16`, defined in `assets/css/main.css`) rather than arbitrary values, so new components stay visually consistent with the rest of the site and scale predictably across breakpoints. Where a brief's requested value doesn't land on that grid, it's rounded to the nearest step and the rounding is called out in the component's own CSS comment.

---

## Components

### Project case-study card
**Status:** Proposed — 2026-07-14, pending confirmation

**Where used:** `index.html` home view, `#projects.work-panel` ("Featured Projects" list — 4 shipped-project cards + 1 `.coming-soon` card).

**Files:** structure in `index.html`; all styling in `assets/css/landing-experiment-additions.css` (scoped to `body.landing-experiment`, isolated from `project-*.html` case-study pages per this branch's isolation rule); one small JS tweak in `index.html`'s inline `.project-card-clickable` click handler (skips the whole-card navigate when the click originated inside the new "View work" link, so it doesn't double-handle the same href).

**Structure:**
```
.project-card
  .project-card-shell            (bordered card body, 2-col grid: 0.85fr / 1.15fr)
    .card-image                  (grey block, left column)
      .card-image-frame          (white backing panel, clips thumbnail)
        lottie-player / img      (aspect-ratio 6:5, object-fit: cover)
    .card-content                (white block, right column, vertically centered)
      .project-card-tags         (flex row)
        .project-card-tag        (each chip; middot separator between, not comma-joined)
      h3                         (title)
      .project-card-description  (one outcome-focused line — plain paragraph, not a bullet)
      .project-card-view-link    ("View work"; omitted on .coming-soon cards)
```

**Tokens used:**
| Token | Value | Role |
|---|---|---|
| `--space-2` / `--space-3` | 8px / 12px | tag-chip row/column gap |
| `--space-4` | 16px | gap between content-block children (tags → title → description → link) |
| `--space-5` / `--space-6` | 20px / 24px | mobile (≤1024px) padding for image/content blocks |
| `--space-8` | 32px | **new use** — left (grey) block padding. Brief asked for ~36px; rounded down to the nearest grid step |
| `--space-10` | 40px | **new use** — right-column vertical padding (brief ~44px, rounded) |
| `--space-12` | 48px | **new use** — right-column horizontal padding (brief's 48px landed exactly on the grid) |
| `--color-border-light` | `#e5e5e5` | card border color — matches `.landing-hero-card`'s own border, so the project cards read as the same bordered-card family as the hero above them (changed 2026-07-14 from `--color-text-primary`, which read too dark/heavy next to the hero) |
| `--radius-xl` | `16px` | card corner radius — also matched to `.landing-hero-card` (changed 2026-07-14 from `0`/sharp corners in the original brief, once the hero-matching direction was confirmed); required adding `overflow: hidden` on the shell since its grey/white column children are flush against its edges, unlike the hero card's padded content |
| `--color-text-primary` | `#111111` | title color |
| `--color-text-secondary` | `#7c7c7a` | tag + description color |
| `--color-bg-body` | `#efefec` | left-column grey fill |
| `--color-accent-primary` | `#C504A5` | "View work" link color |

**New component-local tokens** (no existing site token covers these; defined in `landing-experiment-additions.css` under `body.landing-experiment.view-home`):
- `--pc-tag-size: 12px` — tag-chip font size (spec-exact, no matching step on the shared `--font-size-*` scale)
- `--pc-title-size: var(--font-size-3xl)` (32px), **bold** weight — title (changed 2026-07-14 from 28px/medium to match a reference screenshot Sai shared, which runs larger/bolder than the original text brief)
- `--pc-body-size: 15px` — description font size (spec-exact, sits between `--font-size-base` 14px and `--font-size-lg` 18px)

**Typography:** no new font families — tag chips use `'JetBrains Mono', monospace` (already loaded site-wide, previously used once in `main.css:6002`); title/description/link use the site's existing Barlow, matching the rest of the card system.

**Responsive:** collapses to a single column at `max-width: 1024px` (same breakpoint `main.css` already used for the old card layout), with tightened padding (`--space-5`/`--space-6`) at that size.

**Known deviations from a literal reading of the brief**, for the record:
- Tag examples in the brief ("Enterprise", "B2B", "100K+ downloads") were illustrative of the *format*, not literal required copy — actual chips use the project's real existing tags/status/year rather than inventing a metric that isn't part of the current case-study content.
- Added a middot (`·`) separator between chips: several real tags are themselves two words ("Enterprise Design"), so adjacent chips with no separator read as one run-on string.
