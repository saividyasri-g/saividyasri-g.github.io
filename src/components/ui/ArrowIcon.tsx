import type { ReactNode } from 'react'

/**
 * Lucide arrow icons — the same set Claude uses. Kept inline (no lucide-react
 * dependency) since we only need three variants. Stroked with currentColor so
 * consumers wrap it in a .nav-arrow span and the accent-on-hover CSS in
 * index.css picks it up for free.
 */
interface ArrowIconProps {
  direction: 'left' | 'right' | 'up-right'
  size?: number
  strokeWidth?: number
}

const paths: Record<ArrowIconProps['direction'], ReactNode> = {
  left: (
    <>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </>
  ),
  right: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  'up-right': (
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>
  ),
}

export function ArrowIcon({ direction, size = 14, strokeWidth = 2 }: ArrowIconProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      /* The direction modifier drives the hover translate defined in index.css. */
      className={`arrow-icon arrow-icon--${direction}`}
      style={{ display: 'block' }}
    >
      {paths[direction]}
    </svg>
  )
}

export default ArrowIcon
