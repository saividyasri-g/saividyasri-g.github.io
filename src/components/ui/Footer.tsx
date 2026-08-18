export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'var(--space-16)',
        borderTop: '1px solid var(--color-border-hair)',
        paddingTop: '16px',
        paddingBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-6)',
        transition: 'var(--transition-theme)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-meta)',
          letterSpacing: '0.02em',
          transition: 'var(--transition-theme)',
        }}
      >
        Last updated: {__LAST_UPDATED__}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-meta)',
          letterSpacing: '0.02em',
          transition: 'var(--transition-theme)',
        }}
      >
        © Sai Vidyasri
      </span>
    </footer>
  )
}
