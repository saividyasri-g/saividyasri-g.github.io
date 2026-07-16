import type { ReactNode } from 'react'

interface LearningProps {
  children: ReactNode
}

export default function Learning({ children }: LearningProps) {
  return (
    <div
      style={{
        borderLeft: '2px solid var(--color-accent)',
        paddingLeft: '22px',
        margin: '8px 0 12px',
        fontSize: 'var(--text-lg)',
        lineHeight: 1.5,
        fontWeight: 500,
        color: 'var(--color-text-title)',
        maxWidth: '640px',
        transition: 'var(--transition-theme)',
      }}
    >
      {children}
    </div>
  )
}
