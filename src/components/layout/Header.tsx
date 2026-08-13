import { NavLink } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'

interface NavItem {
  label: string
  to: string
  noActive?: boolean
}

interface HeaderProps {
  items?: NavItem[]
  style?: React.CSSProperties
  className?: string
}

const defaultItems: NavItem[] = [
  { label: 'Work', to: '/' },
  { label: 'Lab', to: '/#lab', noActive: true },
  { label: 'About', to: '/#about', noActive: true },
]

export default function Header({ items = defaultItems, style, className }: HeaderProps) {
  return (
    <header
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-5) var(--space-12)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'var(--color-surface-main)',
        transition: 'var(--transition-theme)',
        ...style,
      }}
    >
      <nav style={{ display: 'flex', gap: '20px', fontSize: 'var(--text-base)' }}>
        {items.map(item => (
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
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              transition: 'var(--transition-theme)',
            }}
          >
            <span className="fill-btn-label" style={{ position: 'relative', zIndex: 1 }}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  )
}
