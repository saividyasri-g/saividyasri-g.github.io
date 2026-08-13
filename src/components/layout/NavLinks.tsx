import { NavLink } from 'react-router-dom'

export const navItems = [
  { label: 'Work', to: '/', noActive: false },
  { label: 'Lab', to: '/lab', noActive: false },
  { label: 'About', to: '/about', noActive: false },
]

export default function NavLinks() {
  return (
    <>
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
            borderRadius: 'var(--radius-sm)',
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
    </>
  )
}
