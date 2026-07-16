interface OverviewItem {
  label: string
  value: string
}

interface OverviewProps {
  items: OverviewItem[]
}

export default function Overview({ items }: OverviewProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`,
        borderTop: '1px solid var(--color-border-hair)',
        borderBottom: '1px solid var(--color-border-hair)',
        transition: 'var(--transition-theme)',
      }}
    >
      {items.map(item => (
        <div key={item.label} style={{ padding: '18px 20px 18px 0' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '.12em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-meta)',
              marginBottom: 'var(--space-2)',
              transition: 'var(--transition-theme)',
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontSize: 'var(--text-sm)',
              lineHeight: 1.45,
              color: 'var(--color-text-body)',
              transition: 'var(--transition-theme)',
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
