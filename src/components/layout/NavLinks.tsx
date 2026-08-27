import { NavLink } from 'react-router-dom'
import { ArrowIcon } from '../ui/ArrowIcon'

interface NavItem {
  label: string
  to: string
  noActive?: boolean
  /** Renders as a plain <a> that opens in a new tab — for off-site links (e.g. resume PDF). */
  external?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Work', to: '/', noActive: false },
  { label: 'Lab', to: '/lab', noActive: false },
  { label: 'About', to: '/about', noActive: false },
  { label: 'Resume', to: '/Resume-Product-Designer.pdf', external: true },
]

const linkStyle: React.CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  padding: 'var(--space-2) var(--space-4)',
  borderRadius: 'var(--radius-lg)',
  fontSize: 'var(--text-base)',
  textDecoration: 'none',
  transition: 'var(--transition-theme)',
}

const baseClass = 'fill-btn fill-btn--subtle nav-link'

export default function NavLinks() {
  return (
    <>
      {navItems.map(item => {
        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.to}
              target="_blank"
              rel="noopener noreferrer"
              className={baseClass}
              style={linkStyle}
              aria-label={`${item.label} (opens in a new tab)`}
            >
              <span className="fill-btn-label" style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {item.label}
                <span className="nav-arrow" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <ArrowIcon direction="up-right" />
                </span>
              </span>
            </a>
          )
        }
        return (
          <NavLink
            key={item.label}
            to={item.to}
            end
            className={({ isActive }) =>
              [baseClass, (!item.noActive && isActive) ? 'nav--active' : ''].filter(Boolean).join(' ')
            }
            style={linkStyle}
          >
            <span className="fill-btn-label" style={{ position: 'relative', zIndex: 1 }}>
              {item.label}
            </span>
          </NavLink>
        )
      })}
    </>
  )
}
