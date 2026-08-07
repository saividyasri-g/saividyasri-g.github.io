import { useState, useEffect, useRef, useCallback } from 'react'

interface Slide {
  src: string
  alt: string
  caption?: string
}

interface CarouselProps {
  slides: Slide[]
  autoPlayMs?: number
  width?: string
}

export default function Carousel({ slides, autoPlayMs = 3500, width }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const pausedRef = useRef(false)

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % slides.length)
  }, [slides.length])

  const prev = useCallback(() => {
    setCurrent(i => (i - 1 + slides.length) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) next()
    }, autoPlayMs)
    return () => clearInterval(id)
  }, [next, autoPlayMs])

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: width ?? '100%', margin: width ? '0 auto' : undefined }}
      onMouseEnter={() => { pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      {/* Caption */}
      {slides[current].caption && (
        <span style={captionStyle}>{slides[current].caption}</span>
      )}

      {/* Image frame */}
      <div style={{ position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--color-surface-raised)', border: '1px solid var(--color-border-hair)' }}>
        {slides.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              position: i === 0 ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              opacity: i === current ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: i === current ? 'auto' : 'none',
            }}
          />
        ))}

        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          style={arrowStyle('left')}
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          style={arrowStyle('right')}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '16px' : '6px',
              height: '6px',
              borderRadius: '3px',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === current ? 'var(--color-text-title)' : 'var(--color-border-hair-hover)',
              transition: 'width 0.25s ease, background 0.25s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: '8px',
    transform: 'translateY(-50%)',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '1px solid var(--color-border-hair-hover)',
    background: 'var(--color-surface-main)',
    color: 'var(--color-text-title)',
    fontSize: '18px',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    opacity: 0.85,
    transition: 'opacity 0.15s ease',
    zIndex: 1,
  }
}

const captionStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--text-sm)',
  fontWeight: 400,
  lineHeight: 1.5,
  color: 'var(--color-text-secondary)',
  textAlign: 'center',
  transition: 'var(--transition-theme)',
}
