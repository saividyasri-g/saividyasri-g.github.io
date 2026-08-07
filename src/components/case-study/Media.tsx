import type { ReactNode } from 'react'

/** Breaks media (images/video) out wider than the narrow prose column it sits inside. */
export function Media({ children }: { children: ReactNode }) {
  return <div className="diagram-breakout">{children}</div>
}
