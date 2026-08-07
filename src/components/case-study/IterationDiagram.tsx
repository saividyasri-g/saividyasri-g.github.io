import type { ReactNode } from 'react'

/* ─────────────────────────────────────────────────────────────
   ScopeBadge
   ───────────────────────────────────────────────────────────── */

export interface ScopeBadgeProps {
  variant: 'rejected' | 'descoped'
  text?: string
}

export function ScopeBadge({ variant, text }: ScopeBadgeProps) {
  const defaultText = variant === 'rejected' ? 'Explored, not pursued' : 'Out of scope'
  const variantStyle: React.CSSProperties =
    variant === 'rejected'
      ? {
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-border-tag)',
          color: 'var(--color-text-meta)',
        }
      : {
          background: 'rgba(200,150,0,0.08)',
          border: '1px solid rgba(200,150,0,0.35)',
          color: 'rgba(200,150,0,0.9)',
        }
  return (
    <span
      style={{
        ...variantStyle,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        borderRadius: 'var(--radius-full)',
        padding: '2px 8px',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        transition: 'var(--transition-theme)',
      }}
      data-badge-variant={variant}
    >
      {text ?? defaultText}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   FlowNode — rectangular process box
   All nodes: uniform w=180, h=44 with vertically-centred text.
   ───────────────────────────────────────────────────────────── */

export interface FlowNodeProps {
  x: number
  y: number
  width?: number
  height?: number
  label: string
  muted?: boolean
}

export function FlowNode({ x, y, width = 180, height = 44, label, muted = false }: FlowNodeProps) {
  const cx = x + width / 2
  const cy = y + height / 2
  const lines = label.split('\n')
  const lineH = 15
  const startOffset = -((lines.length - 1) * lineH) / 2

  return (
    <g opacity={muted ? 0.4 : 1}>
      <rect
        x={x} y={y} width={width} height={height}
        rx={5}
        fill="var(--color-highlight-bg)"
      />
      <text
        x={cx} y={cy + startOffset}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-sans)" fontSize="11"
        fill="var(--color-text-title)"
      >
        {lines.map((line, i) => (
          <tspan key={i} x={cx} dy={i === 0 ? 0 : lineH}>{line}</tspan>
        ))}
      </text>
    </g>
  )
}

/* ─────────────────────────────────────────────────────────────
   FlowDecision — diamond shape
   Labels should be broken into short lines so text fits inside
   the diamond's inscribed width (≈ size * √2 ≈ 73 px at size=52).
   Use '\n' to split; keep each line ≤ ~14 chars at font-size 10.
   ───────────────────────────────────────────────────────────── */

export interface FlowDecisionProps {
  x: number   // center x
  y: number   // center y
  size?: number
  label: string
  muted?: boolean
}

export function FlowDecision({ x: cx, y: cy, size = 52, label, muted = false }: FlowDecisionProps) {
  const pts = `${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`
  const lines = label.split('\n')
  const lineH = 13
  const startOffset = -((lines.length - 1) * lineH) / 2

  return (
    <g opacity={muted ? 0.4 : 1}>
      <polygon
        points={pts}
        fill="var(--color-highlight-bg)"
      />
      <text
        x={cx} y={cy + startOffset}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily="var(--font-sans)" fontSize="10"
        fill="var(--color-text-title)"
      >
        {lines.map((line, i) => (
          <tspan key={i} x={cx} dy={i === 0 ? 0 : lineH}>{line}</tspan>
        ))}
      </text>
    </g>
  )
}

/* ─────────────────────────────────────────────────────────────
   FlowArrow — connecting path with optional label
   ───────────────────────────────────────────────────────────── */

export interface FlowArrowProps {
  d: string
  label?: string
  labelX?: number
  labelY?: number
  dashed?: boolean
  muted?: boolean
  markerId: string
}

export function FlowArrow({
  d, label, labelX, labelY, dashed = false, muted = false, markerId,
}: FlowArrowProps) {
  return (
    <g opacity={muted ? 0.45 : 1}>
      <path
        d={d}
        fill="none"
        stroke={muted ? 'var(--color-border-tag)' : 'var(--color-border-hair-hover)'}
        strokeWidth={1.5}
        strokeDasharray={dashed ? '5 3' : undefined}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text
          x={labelX} y={labelY}
          textAnchor="middle"
          fontFamily="var(--font-sans)" fontSize="10"
          fill="var(--color-text-meta)"
        >
          {label}
        </text>
      )}
    </g>
  )
}

/* ─────────────────────────────────────────────────────────────
   Internal helpers
   ───────────────────────────────────────────────────────────── */

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M 0 0 L 7 3.5 L 0 7 z" fill="var(--color-border-hair-hover)" />
      </marker>
    </defs>
  )
}

function QueryCard({ x, y, width, height, text, title = 'Query', variant = 'query' }: {
  x: number; y: number; width: number; height: number; text: string
  title?: string; variant?: 'query' | 'warn'
}) {
  const c = variant === 'warn' ? '200,150,0' : '200,60,60'
  return (
    <g>
      <rect
        x={x} y={y} width={width} height={height}
        rx={6}
        fill="var(--color-surface-card)"
        stroke={`rgba(${c},0.22)`}
        strokeWidth={1}
      />
      <foreignObject x={x + 12} y={y + 12} width={width - 24} height={height - 24}>
        <div style={{ fontFamily: 'var(--font-sans)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
            <span style={{
              width: 16, height: 16, borderRadius: '50%',
              border: `1px solid rgba(${c},0.4)`,
              background: `rgba(${c},0.08)`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', color: `rgba(${c},0.7)`, flexShrink: 0,
            }}>?</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
              letterSpacing: '.08em', textTransform: 'uppercase', color: `rgba(${c},0.7)`,
            }}>{title}</span>
          </div>
          <p style={{ margin: 0, fontSize: '10px', lineHeight: 1.4, color: 'var(--color-text-secondary)' }}>
            {text}
          </p>
        </div>
      </foreignObject>
    </g>
  )
}

interface SignalsItem {
  text: string
  badge?: ReactNode
  annotation?: string
}

function SignalsBox({ x, y, width, height, items }: {
  x: number; y: number; width: number; height: number; items: SignalsItem[]
}) {
  return (
    <g>
      <rect
        x={x} y={y} width={width} height={height}
        rx={5}
        fill="transparent"
        stroke="var(--color-border-hair)"
        strokeDasharray="4 3"
        strokeWidth={1}
      />
      <foreignObject x={x + 12} y={y + 12} width={width - 24} height={height - 24}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', lineHeight: 1.5 }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--color-text-title)', fontSize: '11px' }}>
            Decision-making signals
          </p>
          <ul style={{ margin: 0, paddingLeft: '14px', listStyleType: 'disc', color: 'var(--color-text-secondary)' }}>
            {items.map((item, i) => (
              <li key={i} style={{ marginBottom: item.badge || item.annotation ? '6px' : '2px' }}>
                <span style={{ fontSize: '11px' }}>{item.text}</span>
                {item.badge && <span style={{ marginLeft: '6px', verticalAlign: 'middle' }}>{item.badge}</span>}
                {item.annotation && (
                  <span style={{ display: 'block', fontSize: '10px', fontStyle: 'italic', color: 'var(--color-text-meta)', marginTop: '2px' }}>
                    {item.annotation}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </foreignObject>
    </g>
  )
}

/* ─────────────────────────────────────────────────────────────
   SHARED coordinate constants
   viewBox="0 0 760 700" for all variants.
   Common nodes are at identical coordinates so tab-switching
   feels like one diagram updating in place.

   Main col   cx=300, x=210, w=180, h=44
   No-branch  x=400, y=218, w=180          ← uniform width
   Decision   cx=300, cy=240, size=52
   ───────────────────────────────────────────────────────────── */

const VB = '0 0 760 700'

/* ═══════════════════════════════════════════════════════════
   variant="starting"
   Decision cx=300, cy=240:  top=188  right=352  bottom=292
   No-branch node: x=400, y=218, w=180  cx=490  right=580
   ═══════════════════════════════════════════════════════════ */

function StartingDiagram() {
  const mid = 'arrow-starting'
  return (
    <svg viewBox={VB} style={{ width: '100%', minWidth: 780, display: 'block' }}
      aria-label="Starting point: technician assignment workflow">
      <ArrowDefs id={mid} />

      <FlowNode x={210} y={20} label="Plan the vehicle-service" />
      <FlowArrow d="M 300 64 L 300 94" markerId={mid} />

      <FlowNode x={210} y={96} label="Estimate the service duration" />
      <FlowArrow d="M 300 140 L 300 186" markerId={mid} />

      <FlowDecision x={300} y={240} size={52} label={"Check technician\navailability"} />

      {/* No → Vehicle remains unassigned (dead end) */}
      <FlowArrow d="M 352 240 L 398 240" label="No" labelX={375} labelY={232} markerId={mid} />
      <FlowNode x={400} y={218} width={180} height={44} label="Vehicle remains unassigned" />

      {/* Connector to QueryCard 1 */}
      <line x1={581} y1={240} x2={592} y2={233}
        stroke="rgba(200,60,60,0.3)" strokeWidth={1} strokeDasharray="3 2" />
      <QueryCard x={593} y={196} width={144} height={80}
        text="When and how does the unassigned vehicles get assigned to technicians?" />

      {/* Yes → Assign the technician */}
      <FlowArrow d="M 300 292 L 300 318" label="Yes" labelX={278} labelY={306} markerId={mid} />
      <FlowNode x={210} y={320} label={"Assign the technician\nto the vehicle"} />

      {/* Connector to QueryCard 2 */}
      <line x1={390} y1={342} x2={422} y2={350}
        stroke="rgba(200,60,60,0.3)" strokeWidth={1} strokeDasharray="3 2" />
      <QueryCard x={423} y={314} width={160} height={78}
        text="How does Service Manager decide which Technician to assign apart from availability?" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════
   variant="final"
   Muted decision: cx=300, cy=240 (same as starting)
   Active decision: cx=300, cy=362  top=310  right=352
   Vehicle: x=400, y=340, w=180  cx=490  right=580
   Real-time: cx=490, cy=456, size=48  right=538
   Loop: M 538 456 C 610 456 610 466 392 466
   ═══════════════════════════════════════════════════════════ */

const finalSignals: SignalsItem[] = [
  { text: 'exact vehicle-service history' },
  { text: 'similar vehicle-service history' },
  { text: 'immediate/sooner availability' },
]

function FinalDiagram() {
  const mid = 'arrow-final'
  return (
    <svg viewBox={VB} style={{ width: '100%', minWidth: 780, display: 'block' }}
      aria-label="Final design: technician assignment workflow">
      <ArrowDefs id={mid} />

      {/* ── Muted first 3 steps ── */}
      <FlowNode x={210} y={20} label="Plan the vehicle-service" muted />
      <FlowArrow d="M 300 64 L 300 94" markerId={mid} muted />

      <FlowNode x={210} y={96} label="Estimate the service duration" muted />
      <FlowArrow d="M 300 140 L 300 186" markerId={mid} muted />

      <FlowDecision x={300} y={240} size={52} label={"Check technician\navailability"} muted />
      <FlowArrow d="M 300 292 L 300 308" markerId={mid} muted />

      {/* ── Active decision ── */}
      <FlowDecision x={300} y={362} size={52}
        label={"Check technicians\navailability\nfor today"} />

      {/* Yes → Determine */}
      <FlowArrow d="M 300 414 L 300 442" label="Yes" labelX={278} labelY={430} markerId={mid} />
      <FlowNode x={210} y={444} width={180} height={44}
        label={"Determine the best suited\ntechnician for the vehicle"} />

      {/* No → Vehicle remains unassigned */}
      <FlowArrow d="M 352 362 L 398 362" label="No" labelX={375} labelY={354} markerId={mid} />
      <FlowNode x={400} y={340} width={180} height={44} label="Vehicle remains unassigned" />

      {/* Vehicle → Check real-time */}
      <FlowArrow d="M 490 384 L 490 406" markerId={mid} />
      <FlowDecision x={490} y={456} size={48}
        label={"Check real-time\ntechnicians\navailability"} />

      {/* Yes (loop) → Determine right edge (390, 466) */}
      <FlowArrow
        d="M 538 456 C 610 456 610 466 392 466"
        label="Yes" labelX={590} labelY={448}
        markerId={mid}
      />

      {/* Signals box */}
      <SignalsBox x={210} y={517} width={370} height={160} items={finalSignals} />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════
   variant="explored"
   Active decision: cx=300, cy=240 (same as starting)
   No-branch node: x=400, y=218, w=180  cx=490  right=580
   Schedule delivery cx=490  bottom=262
   Next-day: cx=490, cy=346, size=52  left=438  right=542
   Loop: M 438 346 C 410 346 410 342 392 342
   ═══════════════════════════════════════════════════════════ */

function ExploredDiagram() {
  const mid = 'arrow-explored'
  return (
    <svg viewBox={VB} style={{ width: '100%', minWidth: 780, display: 'block' }}
      aria-label="Explored but not pursued: technician assignment workflow">
      <ArrowDefs id={mid} />

      {/* ── Muted Plan + Estimate ── */}
      <FlowNode x={210} y={20} label="Plan the vehicle-service" muted />
      <FlowArrow d="M 300 64 L 300 94" markerId={mid} muted />

      <FlowNode x={210} y={96} label="Estimate the service duration" muted />
      <FlowArrow d="M 300 140 L 300 186" markerId={mid} muted />

      {/* ── Active decision (same position as starting) ── */}
      <FlowDecision x={300} y={240} size={52} label={"Check technician\navailability"} />

      {/* Yes → Determine */}
      <FlowArrow d="M 300 292 L 300 318" label="Yes" labelX={278} labelY={306} markerId={mid} />
      <FlowNode x={210} y={320} label={"Determine the best suited\ntechnician for the vehicle"} />

      {/* No → Schedule delivery (same x,y as starting's dead-end node) */}
      <FlowArrow d="M 352 240 L 398 240" label="No" labelX={375} labelY={232} markerId={mid} />
      <FlowNode x={400} y={218} width={180} height={44} label="Schedule the delivery date" />

      <FlowArrow d="M 490 262 L 490 292" markerId={mid} />

      {/* Check technician next day's availability */}
      <FlowDecision x={490} y={346} size={52}
        label={"Check technician\nnext day's\navailability"} />

      {/* Data unavailable QueryCard */}
      <QueryCard
        x={400} y={400} width={252} height={78}
        title="Data unavailable"
        text="Availability is set daily at login. Couldn't be scheduled a day ahead."
      />

      {/* Yes (loop) from next-day left → Determine right */}
      <FlowArrow
        d="M 438 346 C 410 346 410 342 392 342"
        label="Yes" labelX={418} labelY={334}
        markerId={mid}
      />

      {/* Signals box — shrunk; Training annotation moved to Out of scope card */}
      <SignalsBox
        x={210} y={488} width={340} height={160}
        items={[
          { text: 'exact vehicle-service history' },
          { text: 'similar vehicle-service history' },
          { text: 'immediate/sooner availability' },
          { text: 'Training & Expertise', badge: <ScopeBadge variant="descoped" /> },
        ]}
      />

      {/* Out of scope card — adjacent right of signals box */}
      <line x1={550} y1={568} x2={562} y2={536} stroke="rgba(200,150,0,0.3)" strokeWidth={1} strokeDasharray="3 2" />
      <QueryCard
        x={562} y={488} width={185} height={96}
        title="Out of scope"
        variant="warn"
        text="Depended on the technician training module scoped out"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────
   IterationDiagram — top-level switcher
   ───────────────────────────────────────────────────────────── */

export interface IterationDiagramProps {
  variant: 'starting' | 'final' | 'explored'
}

export function IterationDiagram({ variant }: IterationDiagramProps) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      {variant === 'starting' && <StartingDiagram />}
      {variant === 'final' && <FinalDiagram />}
      {variant === 'explored' && <ExploredDiagram />}
    </div>
  )
}

export default IterationDiagram
