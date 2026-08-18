import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

/** Generic centered modal — backdrop click, Escape, and a close button all dismiss it.
    Content width is left to the caller (e.g. .layout-content--prose, to match case-study pages). */
export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--color-scrim, rgba(0,0,0,0.45))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-10) var(--space-6)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: 'var(--color-surface-main)',
          border: '1px solid var(--color-border-hair)',
          // content-box (not the site-wide border-box default) so the border sits
          // outside maxWidth instead of eating into it — the inner prose column
          // must land at the exact same width as the real case-study pages, not
          // a couple pixels short.
          boxSizing: 'content-box',
          borderRadius: 'var(--radius-card)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          width: '100%',
          maxWidth: 'calc(var(--content-width-prose) + 2 * var(--space-12))',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'var(--transition-theme)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="fill-btn fill-btn--subtle"
          style={{
            position: 'absolute',
            top: 'var(--space-5)',
            right: 'var(--space-5)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px solid var(--color-border-hair)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-surface-card)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '16px',
            lineHeight: 1,
            zIndex: 1,
            transition: 'var(--transition-theme)',
          }}
        >
          ×
        </button>
        {/* Scrolls within the modal's own bounds — this element has no padding of its
            own, so the native scrollbar renders flush against the panel's edge.
            Padding lives one level down (mirrors .layout-main-pad on real case-study
            pages), and .layout-content--prose below is left completely unpadded —
            same as those pages — so its text column is the exact same width, not
            narrowed by padding baked into the same box. */}
        <div style={{ overflowY: 'auto' }}>
          <div style={{ padding: 'var(--space-10) var(--space-12)' }}>
            <div className="layout-content--prose layout-content--centered">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
