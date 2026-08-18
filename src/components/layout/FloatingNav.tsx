import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import NavLinks from './NavLinks'

const CASE_STUDY_PATHS = ['/hmc', '/fidelity', '/marketplace', '/multi-stakeholder', '/ai-inference-tools']
const SENTINEL_PATHS = ['/']

export default function FloatingNav() {
  const location = useLocation()
  const isCaseStudy = CASE_STUDY_PATHS.includes(location.pathname)
  const revealAfterSentinel = SENTINEL_PATHS.includes(location.pathname)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  // Case-study pages: hide on scroll-down, show on scroll-up.
  useEffect(() => {
    if (!isCaseStudy) return
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 80)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isCaseStudy])

  // Home page: stay hidden while the inline hero tabs are visible, reveal once scrolled past them.
  useEffect(() => {
    if (!revealAfterSentinel) return
    const sentinel = document.getElementById('home-inline-nav-sentinel')
    if (!sentinel) {
      setHidden(true)
      return
    }
    setHidden(true)
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: '-20px 0px 0px 0px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [revealAfterSentinel])

  // All other pages: always visible.
  useEffect(() => {
    if (isCaseStudy || revealAfterSentinel) return
    setHidden(false)
  }, [isCaseStudy, revealAfterSentinel])

  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: `translateX(-50%) translateY(${hidden ? 'calc(-100% - 24px)' : '0'})`,
        zIndex: 100,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border-hair)',
        borderRadius: 'var(--radius-lg)',
        padding: '5px 6px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
        transition: `transform var(--duration-fast) var(--ease-standard), var(--transition-theme)`,
        whiteSpace: 'nowrap',
      }}
    >
      <NavLinks />

      <span
        aria-hidden
        style={{
          width: '1px',
          height: '16px',
          background: 'var(--color-border-hair)',
          margin: '0 6px',
          flexShrink: 0,
          transition: 'var(--transition-theme)',
        }}
      />

      <ThemeToggle />
    </nav>
  )
}
