import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/* Shared card shell — border-hair + radius-card + space-5 padding + surface-card bg */
export default function Card({ children, style, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        border: '1px solid var(--color-border-hair)',
        borderRadius: 'var(--radius-card)',
        padding: 'var(--space-5)',
        background: 'var(--color-surface-card)',
        transition: 'var(--transition-theme)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
