import type { ReactNode, CSSProperties } from 'react'

/* ── Shared style constants ───────────────────────────── */

export const sectionStyle: CSSProperties = {
  padding: '52px 0',
  scrollMarginTop: '90px',
}

export const h2Style: CSSProperties = {
  fontSize: 'var(--text-lg)',
  lineHeight: 1.22,
  fontWeight: 600,
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

export const eyebrowStyle: CSSProperties = {
  fontFamily: 'var(--font-eyebrow)',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  color: 'var(--color-text-meta)',
  marginBottom: '12px',
  display: 'block',
  transition: 'var(--transition-theme)',
}

export const sectionDividerLabelStyle: CSSProperties = {
  fontFamily: 'var(--font-eyebrow)',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: 'var(--color-text-meta)',
  transition: 'var(--transition-theme)',
}

/** Spreadable helper for one-off text blocks that don't go through h2Style/pStyle. */
export const proseStyle: CSSProperties = {
  maxWidth: 'var(--content-width-prose)',
}

/* ── Shared components ────────────────────────────────── */

export function Block({ eyebrow, header, children }: { eyebrow?: string; header: string; children?: ReactNode }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {eyebrow && <span style={eyebrowStyle}>{eyebrow}</span>}
      <h2 style={h2Style}>{header}</h2>
      {children}
    </div>
  )
}

export function ScenarioGroup({ id, label, children }: { id: string; label?: string; children: ReactNode }) {
  return (
    <section id={id} style={sectionStyle}>
      <div
        style={{
          borderTop: '1px solid var(--color-border-hair)',
          paddingTop: '32px',
          marginBottom: '40px',
          transition: 'var(--transition-theme)',
        }}
      >
        {label && <span style={sectionDividerLabelStyle}>{label}</span>}
      </div>
      {children}
    </section>
  )
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div
      style={{
        borderTop: '1px solid var(--color-border-hair)',
        paddingTop: '32px',
        marginBottom: '40px',
        transition: 'var(--transition-theme)',
      }}
    >
      <span style={sectionDividerLabelStyle}>{label}</span>
    </div>
  )
}
