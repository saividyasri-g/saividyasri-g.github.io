export interface ConstraintPivotEntry {
  title: string
  description: string
  pivot: string
}

export interface ConstraintPivotGridProps {
  entries: ConstraintPivotEntry[]
}

const cardEyebrow: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--space-2)',
  fontFamily: 'var(--font-eyebrow)',
  fontSize: 'var(--text-xs)',
  fontWeight: 600,
  letterSpacing: 'var(--tracking-badge-label)',
  textTransform: 'uppercase',
  color: 'var(--color-text-eyebrow)',
  transition: 'var(--transition-theme)',
}

const cardHeader: React.CSSProperties = {
  margin: '0 0 8px',
  fontSize: 'var(--text-base)',
  fontWeight: 400,
  lineHeight: 1.35,
  color: 'var(--color-text-body)',
  transition: 'var(--transition-theme)',
}

const cardDesc: React.CSSProperties = {
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

const pivotCardWidth = '240px'
const pivotColor = '#6B7280'
const pivotFill = '#F1F2F4'

export function ConstraintPivotGrid({ entries }: ConstraintPivotGridProps) {
  const pivotLabelColor = `${pivotColor}e6`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {entries.map((entry, i) => (
        <div key={i} className="finding-card" style={dashedCard}>
          <div style={{ flex: 1 }}>
            <span style={cardEyebrow}>Constraint #{i + 1}</span>
            <p style={cardHeader}>{entry.title}</p>
            <p style={cardDesc}>{entry.description}</p>
          </div>
          <div className="finding-cost-panel" style={{ width: pivotCardWidth, flexShrink: 0, background: pivotFill, borderRadius: 'var(--radius-card)', padding: 'var(--space-4) var(--space-5)', transition: 'var(--transition-theme)' }}>
            <span style={{ ...cardEyebrow, marginBottom: 'var(--space-2)', color: pivotLabelColor }}>Pivot</span>
            {/* Fixed dark text — this panel's fill (pivotFill) stays light in both themes, so text must not follow the theme-swapping body-text token. */}
            <span style={{ fontSize: 'var(--text-base)', fontWeight: 400, lineHeight: 1.35, color: 'var(--primitive-light-title)' }}>
              {entry.pivot}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ConstraintPivotGrid
