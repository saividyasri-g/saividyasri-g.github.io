import type { ReactNode } from 'react'

interface IterationColumn {
  label: string
  content?: ReactNode
}

interface IterationProps {
  columns: IterationColumn[]
}

export default function Iteration({ columns }: IterationProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gap: '24px',
      }}
    >
      {columns.map((col, i) => (
        <div key={i}>
          <div
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '.12em',
              textTransform: 'uppercase' as const,
              color: i === columns.length - 1 ? 'var(--color-accent)' : 'var(--color-text-meta)',
              border: `1px solid ${i === columns.length - 1 ? 'var(--color-accent)' : 'var(--color-border-tag)'}`,
              borderRadius: 'var(--radius-tag)',
              padding: '3px 8px',
              marginBottom: '14px',
              transition: 'var(--transition-theme)',
            }}
          >
            {col.label}
          </div>
          {col.content}
        </div>
      ))}
    </div>
  )
}
