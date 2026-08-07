export interface CaseBadgeProps {
  icon: string
  label: string
  /** Hex color string, e.g. '#0F7C66'. Both shapes are tinted from this value. */
  color: string
  style?: React.CSSProperties
}

function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex)
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [100, 100, 100]
}

export function CaseBadge({ icon, label, color, style }: CaseBadgeProps) {
  const [r, g, b] = hexToRgb(color)
  const fill = `rgba(${r},${g},${b},0.12)`
  const text = `rgba(${r},${g},${b},0.9)`

  return (
    <div
      style={{
        display: 'flex',
      width: 'fit-content',
        alignItems: 'center',
        gap: 'var(--space-1)',
        ...style,
      }}
    >
      {/* Circular icon container */}
      <div
        style={{
          width: 'var(--space-5)',
          height: 'var(--space-5)',
          borderRadius: 'var(--radius-full)',
          background: fill,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          padding: 'var(--space-1)',
        }}
      >
        <img src={icon} alt="" aria-hidden style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
      </div>

      {/* Label pill */}
      <span
        style={{
          background: fill,
          borderRadius: 'var(--radius-full)',
          padding: '2px var(--space-2)',
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: 'var(--tracking-badge-label)',
          textTransform: 'uppercase' as const,
          color: text,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export default CaseBadge
