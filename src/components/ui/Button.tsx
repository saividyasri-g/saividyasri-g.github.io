import { useState } from 'react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '44px',
        padding: '0 26px',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        color: 'var(--color-text-body)',
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border-hair)',
        borderRadius: 'var(--radius-btn)',
        textDecoration: 'none',
        transition: `border-color 0.4s var(--ease-standard)`,
        ...props.style,
      }}
    >
      {/* Sweep overlay */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--color-surface-sidebar)',
          transform: hovered ? 'scale(1)' : 'scale(0)',
          transformOrigin: 'bottom left',
          transition: `transform var(--duration-hover) var(--ease-standard)`,
          zIndex: 0,
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
        {children}
      </span>
    </a>
  )
}
