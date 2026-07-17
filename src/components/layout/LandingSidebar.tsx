import Button from '../ui/Button'

const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sai-vidyasri-giridharan-a98270146/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:vidya1997@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: 'Resume',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </svg>
    ),
  },
]

export default function LandingSidebar() {
  return (
    <aside
      className="layout-sidebar"
      style={{
        background: 'var(--color-surface-sidebar)',
        borderRight: '1px solid var(--color-border-hair)',
        padding: '31px 44px var(--space-12)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        height: '100vh',
        transition: 'var(--transition-theme)',
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.4,
            fontWeight: 600,
            letterSpacing: '-0.005em',
            margin: '0 0 var(--space-3)',
            color: 'var(--color-text-title)',
            transition: 'var(--transition-theme)',
          }}
        >
          Sai Vidyasri Giridharan
        </h1>
        <p
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.55,
            fontWeight: 400,
            color: 'var(--color-text-secondary)',
            margin: 0,
            transition: 'var(--transition-theme)',
          }}
        >
          Product Designer transforming data-heavy tools to be easy to act on,
          and structuring complex workflows for efficiency.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {links.map(link => (
              <Button key={link.label} href={link.href}>
                {link.icon}
                {link.label}
              </Button>
            ))}
          </div>
        </div>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-meta)',
            margin: 0,
            transition: 'var(--transition-theme)',
          }}
        >
          Site design &amp; content © Sai Vidyasri Giridharan 2026
        </p>
      </div>
    </aside>
  )
}
