interface MetricProps {
  value: string
  label: string
  status: 'tested' | 'intended'
  context?: string
}

export default function Metric({ value, label, status, context }: MetricProps) {
  const isIntended = status === 'intended'

  return (
    <div
      style={{
        background: 'var(--color-surface-card)',
        border: `1px solid ${isIntended ? 'var(--color-border-tag)' : 'var(--color-border-hair)'}`,
        borderRadius: 'var(--radius-card)',
        padding: '26px',
        transition: 'var(--transition-theme)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: isIntended ? 'var(--color-text-secondary)' : 'var(--color-text-title)',
          marginBottom: '10px',
          transition: 'var(--transition-theme)',
        }}
      >
        {value}
      </div>
      <p
        style={{
          fontSize: 'var(--text-sm)',
          lineHeight: 1.5,
          color: 'var(--color-text-secondary)',
          margin: '0 0 16px',
          transition: 'var(--transition-theme)',
        }}
      >
        {label}
      </p>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '.08em',
          textTransform: 'uppercase' as const,
          color: isIntended ? 'var(--color-text-meta)' : 'var(--color-accent)',
          transition: 'var(--transition-theme)',
        }}
      >
        {isIntended ? '◦ Projected' : '● Tested'}
        {context && ` · ${context}`}
      </div>
    </div>
  )
}
