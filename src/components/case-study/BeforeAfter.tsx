import type { ReactNode } from 'react'

interface BeforeAfterProps {
  beforeLabel?: string
  afterLabel?: string
  beforeTitle?: string
  afterTitle?: string
  beforeDesc?: string
  afterDesc?: string
  beforeContent?: ReactNode
  afterContent?: ReactNode
}

const labelBase: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-xs)',
  letterSpacing: '.12em',
  textTransform: 'uppercase',
  borderRadius: 'var(--radius-tag)',
  padding: '3px 8px',
  marginBottom: '14px',
  transition: 'var(--transition-theme)',
}

export default function BeforeAfter({
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeTitle,
  afterTitle,
  beforeDesc,
  afterDesc,
  beforeContent,
  afterContent,
}: BeforeAfterProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div>
        <div
          style={{
            ...labelBase,
            color: 'var(--color-text-meta)',
            border: '1px solid var(--color-border-tag)',
          }}
        >
          {beforeLabel}
        </div>
        {beforeTitle && (
          <h3
            style={{
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--color-text-title)',
              margin: '0 0 8px',
              lineHeight: 1.35,
              transition: 'var(--transition-theme)',
            }}
          >
            {beforeTitle}
          </h3>
        )}
        {beforeDesc && (
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.55, color: 'var(--color-text-secondary)', margin: '0 0 16px', transition: 'var(--transition-theme)' }}>
            {beforeDesc}
          </p>
        )}
        {beforeContent}
      </div>
      <div>
        <div
          style={{
            ...labelBase,
            color: 'var(--color-accent)',
            border: '1px solid var(--color-accent)',
          }}
        >
          {afterLabel}
        </div>
        {afterTitle && (
          <h3
            style={{
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--color-text-title)',
              margin: '0 0 8px',
              lineHeight: 1.35,
              transition: 'var(--transition-theme)',
            }}
          >
            {afterTitle}
          </h3>
        )}
        {afterDesc && (
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.55, color: 'var(--color-text-secondary)', margin: '0 0 16px', transition: 'var(--transition-theme)' }}>
            {afterDesc}
          </p>
        )}
        {afterContent}
      </div>
    </div>
  )
}
