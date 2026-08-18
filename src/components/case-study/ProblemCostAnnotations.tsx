import type { ReactNode } from 'react'

export interface AnnotationColumn {
  problem: string
  description: string
  cost: string
  /** Optional media (image/video) rendered above this finding's card. */
  media?: ReactNode
}

export interface ProblemCostAnnotationsProps {
  columns: AnnotationColumn[]
  costColor?: string
}

const findingLabelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--space-2)',
  fontFamily: 'var(--font-eyebrow)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: 'var(--tracking-badge-label)',
  textTransform: 'uppercase',
  color: 'var(--color-text-meta)',
  transition: 'var(--transition-theme)',
}

const descStyle: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  fontWeight: 300,
  lineHeight: 1.55,
  color: 'var(--color-text-secondary)',
  margin: 0,
  transition: 'var(--transition-theme)',
}

const dashedCard: React.CSSProperties = {
  background: 'var(--color-surface-card)',
  borderRadius: 'var(--radius-card)',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23BEC1C3' stroke-width='0.6' stroke-dasharray='2%2c2'/%3e%3c/svg%3e")`,
  padding: 'var(--space-5)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 'var(--space-6)',
  transition: 'var(--transition-theme)',
}

const costCardWidth = '240px'

export function ProblemCostAnnotations({
  columns,
  costColor = '#7F5C16',
}: ProblemCostAnnotationsProps) {
  const costFill = '#F9F2E5'
  const costLabelColor = `${costColor}e6`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {columns.map((col, i) => {
        const findingCard = (
          <div className="finding-card" style={dashedCard}>
            <div style={{ flex: 1 }}>
              <span style={findingLabelStyle}>Finding #{i + 1}</span>
              <p style={{ margin: '0 0 8px', fontSize: 'var(--text-base)', fontWeight: 400, lineHeight: 1.35, color: 'var(--color-text-body)', transition: 'var(--transition-theme)' }}>
                {col.problem}
              </p>
              <p style={descStyle}>
                {col.description}
              </p>
            </div>
            <div className="finding-cost-panel" style={{ width: costCardWidth, flexShrink: 0, background: costFill, borderRadius: 'var(--radius-card)', padding: 'var(--space-4) var(--space-5)', transition: 'var(--transition-theme)' }}>
              <span
                style={{
                  display: 'block',
                  marginBottom: 'var(--space-2)',
                  fontFamily: 'var(--font-eyebrow)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: 'var(--tracking-badge-label)',
                  textTransform: 'uppercase',
                  color: costLabelColor,
                  transition: 'var(--transition-theme)',
                }}
              >
                Business Cost
              </span>
              {/* Fixed dark text — this panel's fill (costFill) stays light in both themes, so text must not follow the theme-swapping body-text token. */}
              <span style={{ fontSize: 'var(--text-base)', fontWeight: 400, lineHeight: 1.35, color: 'var(--primitive-light-title)' }}>
                {col.cost}
              </span>
            </div>
          </div>
        )

        if (!col.media) return <div key={i}>{findingCard}</div>

        {/* Finding card and its media share one grey container, mirroring the fidelity case study's video + findings grouping. */}
        return (
          <div
            key={i}
            style={{
              background: 'var(--color-surface-sidebar)',
              borderRadius: 'var(--radius-card)',
              padding: 'var(--space-6)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-5)',
              transition: 'var(--transition-theme)',
            }}
          >
            {col.media}
            {findingCard}
          </div>
        )
      })}
    </div>
  )
}

export default ProblemCostAnnotations
