import { useEffect, useRef, useState, type CSSProperties, type ImgHTMLAttributes } from 'react'

/**
 * ZoomableImage — inline image that opens a fit-to-viewport lightbox on click.
 *
 * Trigger: cursor: zoom-in on hover (desktop), tap on touch. Enter/Space
 * activate for keyboard. Lightbox: theme-aware scrim, fixed-size frame so
 * every image reads at the same footprint, cursor: zoom-out. The frame's
 * background is inherited from the image's nearest opaque ancestor on the
 * page — so an image wrapped in a white card zooms into a white card, one
 * in a grey/sidebar card zooms into that grey. Dismiss via image click,
 * backdrop click, Escape, or the ✕ button (kept for touch users who can't
 * see the zoom-out cursor cue). Body scroll is locked while open.
 */
type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Optional style overrides for the lightbox img (rare — the default fit-to-viewport is usually right). */
  lightboxImgStyle?: CSSProperties
  /** Explicit override for the lightbox frame background. If omitted, the frame inherits from the image's nearest opaque ancestor. */
  zoomBg?: string
}

/** Walks up from the trigger to find the nearest ancestor with an opaque background — that's the visual card the image sits in on the page. */
function detectFrameBg(el: HTMLElement | null): string {
  if (!el) return 'var(--color-surface-main)'
  let node: HTMLElement | null = el.parentElement
  while (node && node !== document.body) {
    const bg = getComputedStyle(node).backgroundColor
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg
    node = node.parentElement
  }
  return 'var(--color-surface-main)'
}

export function ZoomableImage({ style, onClick, lightboxImgStyle, alt, zoomBg, ...imgProps }: Props) {
  const [open, setOpen] = useState(false)
  const [frameBg, setFrameBg] = useState<string>('var(--color-surface-main)')
  const imgRef = useRef<HTMLImageElement>(null)

  const openLightbox = () => {
    setFrameBg(zoomBg ?? detectFrameBg(imgRef.current))
    setOpen(true)
  }

  return (
    <>
      <img
        {...imgProps}
        ref={imgRef}
        alt={alt}
        role="button"
        tabIndex={0}
        aria-label={alt ? `Zoom image: ${alt}` : 'Zoom image'}
        onClick={e => {
          onClick?.(e)
          if (!e.defaultPrevented) openLightbox()
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            openLightbox()
          }
        }}
        style={{
          cursor: 'zoom-in',
          touchAction: 'manipulation',
          ...style,
        }}
      />
      {open && (
        <Lightbox
          src={imgProps.src ?? ''}
          alt={alt}
          imgStyle={lightboxImgStyle}
          frameBg={frameBg}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

interface LightboxProps {
  src: string
  alt?: string
  imgStyle?: CSSProperties
  frameBg: string
  onClose: () => void
}

function Lightbox({ src, alt, imgStyle, frameBg, onClose }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Image viewer'}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'var(--color-scrim-lightbox)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
        cursor: 'zoom-out',
        animation: 'zoomable-image-fade-in 150ms var(--ease-standard, ease-out)',
        touchAction: 'manipulation',
      }}
    >
      <style>{`@keyframes zoomable-image-fade-in { from { opacity: 0 } to { opacity: 1 } }`}</style>
      {/* Fixed-size frame so every image reads at the same visual footprint regardless of natural
          dimensions. The frame background mirrors the source card on the page (white on white,
          grey on grey), so transparent PNGs/SVGs stay legible and screenshots keep their surrounding surface. */}
      <div
        onClick={e => { e.stopPropagation(); onClose() }}
        style={{
          width: 'min(1200px, 92vw)',
          height: 'min(820px, 86vh)',
          background: frameBg,
          borderRadius: 'var(--radius-card)',
          padding: 'var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          cursor: 'zoom-out',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            cursor: 'zoom-out',
            ...imgStyle,
          }}
        />
      </div>
      <button
        type="button"
        onClick={e => { e.stopPropagation(); onClose() }}
        aria-label="Close image"
        style={{
          position: 'absolute',
          top: 'var(--space-5)',
          right: 'var(--space-5)',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-surface-card)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--color-border-hair)',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer',
          fontSize: '18px',
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}

export default ZoomableImage
