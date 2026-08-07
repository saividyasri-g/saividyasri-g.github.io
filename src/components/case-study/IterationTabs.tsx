import { useState, type ReactNode } from 'react'

export interface TabDef {
  id: string
  label: string
  content: ReactNode
}

interface IterationTabsProps {
  tabs: TabDef[]
  defaultTabId?: string
  stacked?: boolean
}

const cardStyle = {
  background: 'var(--color-surface-card)',
  border: '1px solid var(--color-border-hair)',
  borderRadius: 'var(--radius-card)',
  overflow: 'hidden',
  transition: 'var(--transition-theme)',
}

export function IterationTabs({ tabs, defaultTabId, stacked = false }: IterationTabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id ?? '')

  const activeTab = tabs.find(t => t.id === activeId) ?? tabs[0]

  return (
    <div>
      {/* Tab bar — centred, styled to match the site header nav */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
        <nav
          role="tablist"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--color-surface-card)',
            border: '1px solid var(--color-border-hair)',
            borderRadius: 'var(--radius-lg)',
            padding: '5px 6px',
  
            transition: 'var(--transition-theme)',
          }}
        >
          {tabs.map(tab => {
            const isActive = tab.id === activeId
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveId(tab.id)}
                className={[
                  'fill-btn',
                  'fill-btn--subtle',
                  'nav-link',
                  isActive ? 'nav--active' : '',
                ].filter(Boolean).join(' ')}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-base)',
                  transition: 'var(--transition-theme)',
                }}
              >
                <span className="fill-btn-label" style={{ position: 'relative', zIndex: 1 }}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Panel */}
      {stacked ? (
        /* All panels rendered at the same position; inactive ones faded */
        <div style={{ position: 'relative', ...cardStyle }}>
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              aria-hidden={tab.id !== activeId}
              style={{
                ...(i > 0 ? { position: 'absolute', top: 0, left: 0, width: '100%' } : {}),
                opacity: tab.id === activeId ? 1 : 0,
                transition: 'opacity 0.35s ease',
                pointerEvents: tab.id === activeId ? 'auto' : 'none',
              }}
            >
              {tab.content}
            </div>
          ))}
          {/* Title overlay — fixed position across all tabs, text updates with active tab */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              padding: '16px 20px',
              pointerEvents: 'none',
              transition: 'var(--transition-theme)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-meta)',
              transition: 'var(--transition-theme)',
            }}>
              {activeTab?.label}
            </span>
          </div>
        </div>
      ) : (
        /* Default: one panel at a time */
        activeTab && (
          <div style={cardStyle}>
            <div
              role="tabpanel"
              id={`tabpanel-${activeTab.id}`}
              aria-labelledby={`tab-${activeTab.id}`}
            >
              {activeTab.content}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default IterationTabs
