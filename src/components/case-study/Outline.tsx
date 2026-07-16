import { useEffect, useState } from 'react'

interface OutlineItem {
  id: string
  num: string
  label: string
}

interface OutlineProps {
  items: OutlineItem[]
  nextProject?: { label: string; href: string }
}

export default function Outline({ items, nextProject }: OutlineProps) {
  const [active, setActive] = useState(items[0]?.id ?? '')

  useEffect(() => {
    const ids = items.map(i => i.id)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <aside
      style={{
        background: 'var(--color-surface-sidebar)',
        borderRight: '1px solid var(--color-border-hair)',
        padding: 'var(--space-8) 44px var(--space-10)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '70px',
        height: 'calc(100vh - 70px)',
        transition: 'var(--transition-theme)',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '.14em',
            textTransform: 'uppercase' as const,
            color: 'var(--color-text-faint)',
            marginTop: '34px',
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid var(--color-border-hair)',
            transition: 'var(--transition-theme)',
          }}
        >
          On this page
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', marginTop: 'var(--space-2)' }}>
          {items.map(item => {
            const on = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 0 11px 18px',
                  fontSize: 'var(--text-base)',
                  fontWeight: on ? 600 : 400,
                  color: on ? 'var(--color-text-title)' : 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color var(--duration-fast)',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    width: '2px',
                    height: on ? '20px' : '0px',
                    background: 'var(--color-accent)',
                    borderRadius: 'var(--radius-highlight)',
                    transform: 'translateY(-50%)',
                    transition: `height var(--duration-fast) var(--ease-standard)`,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '.06em',
                    color: on ? 'var(--color-accent)' : 'var(--color-text-faint)',
                    transition: 'color var(--duration-fast)',
                  }}
                >
                  {item.num}
                </span>
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>

      {nextProject && (
        <a
          href={nextProject.href}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-border-hair)',
            borderRadius: 'var(--radius-widget)',
            padding: '14px 16px',
            textDecoration: 'none',
            transition: 'var(--transition-theme)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '.14em',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-meta)',
              transition: 'var(--transition-theme)',
            }}
          >
            Next project
          </span>
          <span
            style={{
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--color-text-title)',
              letterSpacing: '-0.01em',
              transition: 'var(--transition-theme)',
            }}
          >
            {nextProject.label} →
          </span>
        </a>
      )}
    </aside>
  )
}
