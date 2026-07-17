import { NavLink } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'

const navItems = [
  { label: 'Work', to: '/', noActive: false },
  { label: 'Experiments', to: '/#experiments', noActive: true },
  { label: 'About', to: '/#about', noActive: true },
]

export default function FloatingNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-border-hair)',
        borderRadius: 'var(--radius-full)',
        padding: '5px 6px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.07)',
        transition: 'var(--transition-theme)',
        whiteSpace: 'nowrap',
      }}
    >
      {navItems.map(item => (
        <NavLink
          key={item.label}
          to={item.to}
          end
          className={({ isActive }) =>
            ['fill-btn', 'fill-btn--subtle', 'nav-link', (!item.noActive && isActive) ? 'nav--active' : ''].filter(Boolean).join(' ')
          }
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '6px 18px',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-base)',
            textDecoration: 'none',
            transition: 'var(--transition-theme)',
          }}
        >
          <span className="fill-btn-label" style={{ position: 'relative', zIndex: 1 }}>
            {item.label}
          </span>
        </NavLink>
      ))}

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
