import { useState } from 'react'
import type { ReactNode } from 'react'
import { CaseBadge } from './CaseBadge'
import { Media } from './Media'

export interface DiagramBadge {
  icon: string
  label: string
  color: string
}

export interface DiagramTab {
  id: string
  label?: string
  diagram: ReactNode
  diagramTitle?: string
  diagramBadges?: DiagramBadge[]
  annotations?: ReactNode
}

export interface DiagramSectionProps {
  counter?: string
  stage: 'before' | 'after'
  solutionLabel?: string
  title?: ReactNode
  description?: ReactNode
  /** Rendered inside the tinted container, above the tab bar. */
  beforeTabs?: ReactNode
  tabs: DiagramTab[]
  defaultTabId?: string
  annotationsMinHeight?: number
  /** Padding around the diagram content. Defaults to 'var(--space-5) var(--space-10) var(--space-10)'. */
  diagramPadding?: string
  /** Border radius on the inner diagram wrapper. Defaults to 'var(--radius-card)'. Pass '0' to remove. */
  diagramBorderRadius?: string
  /** Hide the "Before"/"After" stage eyebrow. */
  hideStageLabel?: boolean
  /** Whether the diagram card breaks out wider than the text column. Defaults to true — set false for diagrams that should stay at the ambient text width. */
  wide?: boolean
  /** Whether the outer diagram area gets the tinted card background/padding. Defaults to true — set false to let the content sit directly on the page. */
  card?: boolean
  /** Border radius on the outer tinted card (only applies when `card` is true). Defaults to 'var(--radius-card)'. Pass '0' to remove. */
  cardBorderRadius?: string
}

const stageColors = {
  before: 'rgba(200,60,60,0.8)',
  after:  'rgba(60,160,100,0.8)',
}

const monoEyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-eyebrow)',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '.12em',
  display: 'block',
  transition: 'var(--transition-theme)',
}

export function DiagramSection({
  counter,
  stage,
  solutionLabel,
  title,
  description,
  beforeTabs,
  tabs,
  defaultTabId,
  annotationsMinHeight = 200,
  diagramPadding = 'var(--space-5) var(--space-10) var(--space-10)',
  diagramBorderRadius = 'var(--radius-card)',
  hideStageLabel = false,
  wide = true,
  card = true,
  cardBorderRadius = 'var(--radius-card)',
}: DiagramSectionProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id)
  const multiTab = tabs.length > 1
  const color = stageColors[stage]

  const diagramCard = (
    <div
      style={{
        background: card ? 'var(--color-surface-sidebar)' : undefined,
        borderRadius: card ? cardBorderRadius : undefined,
        padding: card ? 'var(--space-6)' : undefined,
        transition: 'var(--transition-theme)',
      }}
    >
      {beforeTabs && (
        <div style={{ marginBottom: 'var(--space-5)' }}>
          {beforeTabs}
        </div>
      )}
      {/* Tab bar — only when multiple tabs */}
      {multiTab && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
          <span
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-body)',
              fontFamily: 'var(--font-sans)',
              transition: 'var(--transition-theme)',
            }}
          >
            {tabs.find(t => t.id === activeId)?.diagramTitle ?? ''}
          </span>
          <nav
            role="tablist"
            style={{
              display: 'inline-flex',
              background: 'var(--color-surface-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '5px 6px',
              gap: '2px',
              border: '1px solid var(--color-border-hair)',
              transition: 'var(--transition-theme)',
            }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeId === tab.id}
                onClick={() => setActiveId(tab.id)}
                className={`fill-btn fill-btn--subtle nav-link${activeId === tab.id ? ' nav--active' : ''}`}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '20px',
                  padding: '0 12px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: activeId === tab.id ? 500 : 400,
                  color: activeId === tab.id ? 'var(--color-text-title)' : 'var(--color-text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition-theme)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}
      {/* Diagram card */}
      <div
        style={{
          borderRadius: diagramBorderRadius,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          transition: 'var(--transition-theme)',
        }}
      >
        {/*
          Two separate stacked zones so diagram Y-position never shifts when
          headers differ in height between tabs.
        */}

        {/* Zone 1 — Header stack: tallest header sets this zone's height.
            Skipped in multi-tab mode because diagramTitle is shown in the tab bar row instead. */}
        {!multiTab && tabs.some(t => t.diagramTitle || (t.diagramBadges && t.diagramBadges.length > 0)) && (
          <div style={{ position: 'relative', padding: 'var(--space-10) var(--space-10) 0' }}>
            {tabs.map((tab, i) => (
              <div
                key={`hdr-${tab.id}`}
                aria-hidden={activeId !== tab.id}
                className="diagram-header"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: i === 0 ? undefined : '20px',
                  left: i === 0 ? undefined : '24px',
                  right: i === 0 ? undefined : '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '16px',
                  opacity: activeId === tab.id ? 1 : 0,
                  pointerEvents: activeId === tab.id ? 'auto' : 'none',
                  transition: 'opacity 0.35s ease',
                }}
              >
                {tab.diagramTitle && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--text-base)',
                      fontWeight: 500,
                      lineHeight: 1.35,
                      color: 'var(--color-diagram-title)',
                      flex: 1,
                      transition: 'var(--transition-theme)',
                    }}
                  >
                    {tab.diagramTitle}
                  </p>
                )}
                {tab.diagramBadges && tab.diagramBadges.length > 0 && (
                  <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0, paddingTop: '1px' }}>
                    {tab.diagramBadges.map((badge, bi) => (
                      <CaseBadge key={bi} icon={badge.icon} label={badge.label} color={badge.color} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Zone 2 — Diagram stack: always starts at same Y regardless of header */}
        <div style={{ position: multiTab ? 'relative' : undefined, padding: diagramPadding }}>
          {tabs.map((tab, i) => (
            <div
              key={`dgm-${tab.id}`}
              aria-hidden={activeId !== tab.id}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: i === 0 ? undefined : 0,
                /* Mirror parent padding so absolute tabs don't start at the padding edge */
                padding: i > 0 ? diagramPadding : undefined,
                opacity: activeId === tab.id ? 1 : 0,
                pointerEvents: activeId === tab.id ? 'auto' : 'none',
                transition: 'opacity 0.35s ease',
              }}
            >
              {tab.diagram}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ marginBottom: '48px' }}>

      {/* Eyebrows */}
      <div style={{ marginBottom: '12px' }}>
        {counter && (
          <span style={{ ...monoEyebrow, color: 'var(--color-text-meta)', marginBottom: '4px' }}>
            {counter}
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          {!hideStageLabel && (
            <span style={{ ...monoEyebrow, color, marginBottom: 0 }}>
              {stage === 'before' ? 'Before' : 'After'}
            </span>
          )}
          {solutionLabel && (
            <span style={{ ...monoEyebrow, color: 'var(--color-text-meta)', marginBottom: 0 }}>
              {solutionLabel}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      {title && (
        <h2
          style={{
            fontSize: 'var(--text-lg)',
            lineHeight: 1.22,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-title)',
            margin: '0 0 14px',
            maxWidth: 'var(--content-width-prose)',
            transition: 'var(--transition-theme)',
          }}
        >
          {title}
        </h2>
      )}

      {/* Description */}
      {description && (
        <div
          style={{
            fontSize: 'var(--text-base)',
            lineHeight: 1.65,
            color: 'var(--color-text-secondary)',
            margin: '0 0 20px',
            maxWidth: 'var(--content-width-prose)',
            transition: 'var(--transition-theme)',
          }}
        >
          {description}
        </div>
      )}

      {/* Diagram card — breaks out wider than the surrounding prose column
          (when `wide`), since this is the part that actually holds the
          image/video. */}
      {wide ? <Media>{diagramCard}</Media> : diagramCard}

      {/* Annotation card — a separate sibling at the ambient (narrow, prose)
          width, not bundled into the wide diagram card above it. */}
      {tabs.some(t => t.annotations) && (
        <div
          style={{
            marginTop: 'var(--space-6)',
            position: 'relative',
            minHeight: annotationsMinHeight,
            transition: 'var(--transition-theme)',
          }}
        >
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              aria-hidden={activeId !== tab.id}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: i === 0 ? undefined : 0,
                opacity: activeId === tab.id ? 1 : 0,
                pointerEvents: activeId === tab.id ? 'auto' : 'none',
                transition: 'opacity 0.35s ease',
              }}
            >
              {tab.annotations}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
