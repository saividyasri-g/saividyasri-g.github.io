import type { ReactNode, CSSProperties } from 'react'

/* ── Shared style constants ───────────────────────────── */

export const sectionStyle: CSSProperties = {
  padding: 'var(--space-10) 0',
  scrollMarginTop: '90px',
}

export const h2Style: CSSProperties = {
  fontSize: 'var(--text-xl)',
  lineHeight: 1.22,
  fontWeight: 500,
  letterSpacing: '-0.02em',
  color: 'var(--color-text-title)',
  margin: '0 0 18px',
  maxWidth: 'var(--content-width-prose)',
  transition: 'var(--transition-theme)',
}

export const pStyle: CSSProperties = {
  fontSize: 'var(--text-base)',
  lineHeight: 1.65,
  color: 'var(--color-text-secondary)',
  margin: '0 0 16px',
  maxWidth: 'var(--content-width-prose)',
  transition: 'var(--transition-theme)',
}

/* Color is intentionally *not* set here — it lives on the .case-study-eyebrow
 * CSS class (see index.css), so the active-section accent rule can override
 * it cleanly without needing !important. */
export const eyebrowStyle: CSSProperties = {
  fontFamily: 'var(--font-eyebrow)',
  fontSize: 'var(--text-xs)',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  marginBottom: 'var(--space-4)',
  display: 'block',
}

export const sectionDividerLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-eyebrow)',
  fontSize: 'var(--text-xs)',
  fontWeight: 700,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
}

/** Spreadable helper for one-off text blocks that don't go through h2Style/pStyle. */
export const proseStyle: CSSProperties = {
  maxWidth: 'var(--content-width-prose)',
}

/* ── Shared components ────────────────────────────────── */

export function Block({ eyebrow, header, children }: { eyebrow?: string; header: string; children?: ReactNode }) {
  return (
    <div className="case-study-block">
      {eyebrow && <span className="case-study-eyebrow" style={eyebrowStyle}>{eyebrow}</span>}
      <h2 style={h2Style}>{header}</h2>
      {children}
    </div>
  )
}

export function ScenarioGroup({ id, label, children }: { id: string; label?: string; children: ReactNode }) {
  return (
    <section id={id} style={sectionStyle}>
      {label && (
        <span
          className="case-study-eyebrow"
          style={{ ...sectionDividerLabelStyle, display: 'block', marginBottom: 'var(--space-4)' }}
        >
          {label}
        </span>
      )}
      {children}
    </section>
  )
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <span
      className="case-study-eyebrow"
      style={{ ...sectionDividerLabelStyle, display: 'block', marginBottom: 'var(--space-4)' }}
    >
      {label}
    </span>
  )
}
