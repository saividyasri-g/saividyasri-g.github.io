import { NavLink } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'

interface NavItem {
  label: string
  to: string
}

interface HeaderProps {
  items?: NavItem[]
  style?: React.CSSProperties
}

const defaultItems: NavItem[] = [
  { label: 'Work', to: '/' },
  { label: 'Experiments', to: '/#experiments' },
  { label: 'About', to: '/#about' },
]

export default function Header({ items = defaultItems, style }: HeaderProps) {
  return (
    <header
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
      <nav style={{ display: 'flex', gap: '34px', fontSize: 'var(--text-base)' }}>
        {items.map(item => (
          <NavLink
            key={item.label}
            to={item.to}
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-text-title)' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              paddingBottom: '2px',
              borderBottom: isActive ? '1px solid var(--color-text-title)' : '1px solid transparent',
              transition: 'var(--transition-theme)',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  )
}
