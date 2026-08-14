import { useEffect, useLayoutEffect, useRef, useState } from 'react'

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
  const [indicator, setIndicator] = useState({ top: 0, height: 0 })
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

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

  useLayoutEffect(() => {
    const measure = () => {
      const link = linkRefs.current[active]
      if (!link) return
      setIndicator({ top: link.offsetTop + (link.offsetHeight - 20) / 2, height: 20 })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  return (
    <aside
      className="layout-sidebar"
      style={{
        background: 'transparent',
        paddingTop: 'var(--space-10)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
        transition: 'var(--transition-theme)',
      }}
    >
      <div>
        <nav ref={navRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 'var(--space-2)' }}>
          <span
            aria-hidden
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '2px',
              height: `${indicator.height}px`,
              background: 'var(--color-accent)',
              borderRadius: 'var(--radius-highlight)',
              transform: `translateY(${indicator.top}px)`,
              transition: `transform var(--duration-fast) var(--ease-standard)`,
            }}
          />
          {items.map(item => {
            const on = active === item.id
            return (
              <a
                key={item.id}
                ref={el => { linkRefs.current[item.id] = el }}
                href={`#${item.id}`}
                className="fill-btn fill-btn--subtle fill-btn--right"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  textAlign: 'right',
                  gap: '8px',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: on ? 600 : 400,
                  color: on ? 'var(--color-text-title)' : 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'color var(--duration-fast)',
                  cursor: 'pointer',
                }}
              >
                {item.num && (
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
                )}
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
