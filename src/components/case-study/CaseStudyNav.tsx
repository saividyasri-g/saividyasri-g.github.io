interface CaseStudyNavProps {
  next: {
    title: string
    href: string
  }
}

/* Both arrows use .nav-arrow; the CSS rule in index.css flips their color to
   the accent when the surrounding .fill-btn is hovered or focused, so no per-
   link hover state is needed here. */
export function CaseStudyNav({ next }: CaseStudyNavProps) {
  const linkStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border-hair)',
    background: 'var(--color-surface-card)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
    flexShrink: 0,
    transition: 'var(--transition-theme)',
    whiteSpace: 'nowrap',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-6)',
        marginTop: '60px',
        paddingTop: 'var(--space-8)',
        borderTop: '1px solid var(--color-border-hair)',
        transition: 'var(--transition-theme)',
      }}
    >
      <a href="#/" className="fill-btn fill-btn--subtle" style={linkStyle}>
        <span className="nav-arrow">←</span> All work
      </a>

      <a href={next.href} className="fill-btn fill-btn--subtle" style={linkStyle}>
        Next case study <span className="nav-arrow">→</span>
      </a>
    </div>
  )
}
