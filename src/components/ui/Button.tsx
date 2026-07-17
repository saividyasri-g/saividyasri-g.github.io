import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <a
      {...props}
      className={['fill-btn', 'fill-btn--subtle', className].filter(Boolean).join(' ')}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px',
        padding: '0 14px',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border-hair)',
        borderRadius: 'var(--radius-btn)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: `border-color 0.4s var(--ease-standard)`,
        ...props.style,
      }}
    >
      <span
        className="fill-btn-label"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '9px',
        }}
      >
        {children}
      </span>
    </a>
  )
}
