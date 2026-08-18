import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '66px',
        height: '30px',
        padding: '0 6px',
        borderRadius: 'var(--radius-toggle)',
        background: 'var(--color-toggle-track)',
        border: 'none',
        cursor: 'pointer',
        transition: 'background var(--duration-theme)',
      }}
    >
      {/* Knob */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '3px',
          left: dark ? '39px' : '3px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'var(--color-knob)',
          boxShadow: '0 1px 3px rgba(0,0,0,.25)',
          transition: `left var(--duration-toggle) var(--ease-standard), background var(--duration-theme)`,
        }}
      />
      <span
        aria-hidden
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: '13px',
          lineHeight: 1,
          width: '24px',
          textAlign: 'center',
          color: dark ? 'var(--color-text-meta)' : 'var(--color-text-body)',
          transition: 'color var(--duration-theme)',
        }}
      >
        ☀
      </span>
      <span
        aria-hidden
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: '13px',
          lineHeight: 1,
          width: '24px',
          textAlign: 'center',
          color: dark ? 'var(--color-text-title)' : 'var(--color-text-meta)',
          transition: 'color var(--duration-theme)',
        }}
      >
        ☾
      </span>
    </button>
    </div>
  )
}
