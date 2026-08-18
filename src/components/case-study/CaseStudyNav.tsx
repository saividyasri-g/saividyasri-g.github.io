interface CaseStudyNavProps {
  next: {
    title: string
    href: string
  }
}

export function CaseStudyNav({ next }: CaseStudyNavProps) {
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
      {/* ← All work */}
      <a
        href="#/"
        className="fill-btn fill-btn--subtle"
        style={{
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
        }}
      >
        ← All work
      </a>

      {/* Next case study */}
      <a
        href={next.href}
        className="fill-btn fill-btn--subtle"
        style={{
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
        }}
      >
        Next case study →
      </a>
    </div>
  )
}
