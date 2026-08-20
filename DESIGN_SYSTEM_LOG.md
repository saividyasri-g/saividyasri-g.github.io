# Design System Log

Living record of reusable UI components and design tokens for this portfolio, kept as we build toward a small, consistent design system across the site.

**Process:** entries are added/updated only when a component or token is explicitly confirmed — implementation work happens first (and may go through revisions), but a component isn't marked **Committed** here until you say so. Until then it's listed as **Proposed**.

**Responsive principle:** this site targets mobile / tablet / web. Spacing, padding, and gaps default to the existing 4/8px scale (`--space-1` through `--space-16`, defined in `assets/css/main.css`) rather than arbitrary values, so new components stay visually consistent with the rest of the site and scale predictably across breakpoints. Where a brief's requested value doesn't land on that grid, it's rounded to the nearest step and the rounding is called out in the component's own CSS comment.

---

## Components

### Case-study vertical rhythm (eyebrow / block / section gaps)
**Status:** Committed — 2026-08-19

**Where used:** every case study (`src/pages/hmc/`, `fidelity/`, `marketplace/`, `multi-stakeholder/`, `ai-inference-tools/`) via the shared case-study components.

**Files:**
- `src/styles/index.css` — new `.case-study-block` class (with `:last-child` reset).
- `src/components/case-study/Prose.tsx` — `sectionStyle`, `eyebrowStyle`, `Block`, `SectionDivider`, `ScenarioGroup`.
- `src/components/case-study/DiagramSection.tsx` — outer wrapper uses `.case-study-block`; empty stage/solution row no longer renders so the counter's 4px marginBottom doesn't leak into the eyebrow→title gap.
- Per-page Overview sections — first `<section id="overview">` in each case study takes `{ ...sectionStyle, paddingTop: 0 }` so Overview→Context participates in the section-gap rule while `layout-main-pad` still controls the page's top offset.

**Canonical gaps (all on the 4/8 grid, via `--space-*` tokens):**

| Boundary | Gap | Token | Where it lives |
|---|---|---|---|
| Eyebrow → title / next content | **16px** | `--space-4` | `eyebrowStyle.marginBottom`; `sectionDividerLabelStyle` gets it inline when used inside `SectionDivider` / `ScenarioGroup` |
| Block → Block (within a section) | **64px** | `--space-16` | `.case-study-block { margin-bottom }` |
| Section → Section (sidebar-linked `<section>`) | **80px** | 2 × `--space-10` | `sectionStyle.padding: 'var(--space-10) 0'` |
| Last block in section → next section | **80px** | — | `.case-study-block:last-child { margin-bottom: 0 }` prevents the trailing 64px from compounding on top of section padding |

**Why the `:last-child` reset:** without it, the last Block/DiagramSection's 64px `margin-bottom` would add on top of the section's 40px bottom padding + next section's 40px top padding, producing a 144px gap between sections instead of 80px. The reset makes section-to-section spacing driven entirely by `sectionStyle` padding — one lever, one source of truth.

**What counts as a "section" vs a "block":**
- **Section** = a top-level `<section>` element that the sidebar Outline links to (Overview, Context, Why-it-mattered, Scope, each Scenario group, Impact, Learnings). `ScenarioGroup` renders a `<section>` too, so a plain `<section>` followed by a `<ScenarioGroup>` (e.g., Scope → Problem 1 in HMC) is a section→section boundary at 80px, *not* block→block.
- **Block** = anything with the `.case-study-block` class. That includes `<Block>`, `<DiagramSection>`, Overview inner divs, and any **nested eyebrow + content sub-structure** — e.g., "Solution 1A · Final" inside a DiagramSection tab (`hmc/index.tsx`), "Solution - Final - 1" in `fidelity/index.tsx`, "Testing results and strategy" inside Phase 1/2 in `ai-inference-tools/index.tsx`. Any sibling with its own eyebrow + title/content is a block and gets the 64px gap above via `<div className="case-study-block" style={{ marginTop: 'var(--space-16)' }}>` on the wrapper.

**Removed:** the `border-top` rule + 32px paddingTop that `SectionDivider` and `ScenarioGroup` used to render above their labels. Section boundaries are now signalled purely by spacing, not by horizontal rules.

**Card-internal eyebrows left at 8px** (`--space-2`) — `ConstraintPivotGrid`, `ProblemCostAnnotations`, and page-local dashed-card patterns (`findingCardEyebrow` in `hmc/`, `marketplace/`) use tag-within-a-card typography and would look loose at 16px. These are intentionally exempt from the 16px eyebrow→content rule.

**Type scale used in case studies (updated 2026-08-20):**

| Element | Token | Value | Extras |
|---|---|---|---|
| Page title (h1, Overview) | `var(--text-2xl)` | 32px | `line-height: 1.1`, `letter-spacing: -0.025em`, weight 600. Bumped from `text-xl` (28px) to preserve h1 > h2 hierarchy after h2 was bumped up. |
| Section header (h2, Block/DiagramSection titles + inline sub-block h2s) | `var(--text-xl)` | 28px | `line-height: 1.22`, `letter-spacing: -0.02em`, weight 600. Bumped from `text-lg` (20px). |
| Subhead (h3, `subHeadStyle` in ai-inference-tools, fidelity's constraint h3) | `var(--text-base)` | 16px | `line-height: 1.35` |
| Eyebrow (case-study eyebrows, findings labels, cost labels, constraint labels, spec-note labels — everything using `var(--font-eyebrow)`) | `var(--text-xs)` | 12px | uppercase, `letter-spacing: .12em`, weight 600 or 700 depending on variant. Bumped from `11px`. |
| Badge pill (`CaseBadge`), IterationTabs mono label, IterationDiagram annotations | `11px` inline | 11px | Left at 11px — different type role (sans-serif badge pill / mono tab label / dense diagram annotations), not part of the eyebrow family. |

---

### Media card (case-study media wrapper)
**Status:** Committed — 2026-08-19

**Where used:** every grey-tinted wrapper around images/videos in a case-study page, plus the outer card of every `DiagramSection` with `card={true}` (the default). 11 direct-inline uses across `hmc/`, `fidelity/`, `marketplace/`, `ai-inference-tools/` + the shared `DiagramSection` component.

**File:** `src/styles/index.css` (`.media-card` rule).

**Class only — no component.** The wrapper is a plain `<div className="media-card">` (or `className={card ? 'media-card' : undefined}` in `DiagramSection`). Kept as a class rather than a component because callers frequently need to compose with additional inline styles (marginTop, custom borderRadius for edge-to-edge diagrams).

**Styling:**
```css
.media-card {
  background: var(--color-surface-sidebar);
  border-radius: var(--radius-card);
  padding: var(--space-6);          /* 24px */
  transition: var(--transition-theme);
}
```

**Visual-consistency rule (deliberately no bottom-margin compensation):**
The card's border is treated as the block's content edge, exactly like a text line's baseline is the content edge in a text-ending block. So a section ending with a media card and a section ending with a paragraph both produce **80px** from card/text bottom to the next section's eyebrow — matching what the eye reads between adjacent text-ending sections like "why it mattered" → "scope". The card's own 24px inner padding is treated as breathing room around the media, *not* as external gap. Consequence: the actual image/video pixel sits 24px inside the card, so media-pixel-to-next-eyebrow is 24px larger than the canonical section/block gap. This is by design.

**Top-margin normalization done in the same pass:** replaced ad-hoc `margin: '20px 0 0'` / `margin: '18px 0 0'` on card wrappers with `marginTop: 'var(--space-5)'` (20px, token). Two HMC videos with `margin: '18px auto'` were changed to `margin: '0 auto'` — the preceding `pStyle` marginBottom (16px) supplies the top gap, and the wrapping block's marginBottom supplies the bottom.

**Not included in this class** (left as its own variant, tracked separately if it comes up again):
- Bordered callout card in `marketplace/index.tsx:319` — uses `--color-surface-card` + `border: 1px solid var(--color-border-hair)` instead of the sidebar tint. Different visual language (callout, not media container).

---

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
