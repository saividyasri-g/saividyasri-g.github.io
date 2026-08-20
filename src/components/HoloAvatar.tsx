import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const NUM_LAYERS = 6
const VIDEO_SRC = '/assets/media/hologram/head.webm'
// Head: 260×320 scaled to 60% → 156×192. Emitter: 140×96 scaled to 60% → 84×58.
const HEAD_W = 156, HEAD_H = 192
const EMIT_W = 84,  EMIT_H = 58

/** Mouse-tracked CSS/video hologram avatar effect — used on the About page identity card and reused as a live thumbnail in Lab. */
export default function HoloAvatar() {
  const { theme } = useTheme()
  const headRef  = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(NUM_LAYERS).fill(null))
  const rafRef   = useRef<number>(0)
  const targetX  = useRef(0), targetY = useRef(0)
  const currentX = useRef(0), currentY = useRef(0)
  const [isEmitting, setIsEmitting] = useState(false)
  const [isLoaded,   setIsLoaded]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setIsEmitting(true), 300)
    const t2 = setTimeout(() => setIsLoaded(true), 1350)

    const onMove = (e: MouseEvent) => {
      targetX.current = (e.clientX / window.innerWidth  - 0.5) * 2
      targetY.current = (e.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * 0.08
      currentY.current += (targetY.current - currentY.current) * 0.08
      const cx = currentX.current, cy = currentY.current

      if (headRef.current) {
        headRef.current.style.transform =
          `rotateY(${(cx * 25).toFixed(2)}deg) translateX(${(-cx * 3).toFixed(2)}px) rotateX(${(-cy * 10).toFixed(2)}deg)`
      }
      for (let i = 0; i < NUM_LAYERS - 1; i++) {
        const v = videoRefs.current[i]
        if (!v) continue
        const factor = (NUM_LAYERS - 1 - i) / (NUM_LAYERS - 1)
        v.style.transform =
          `translate3d(${(-cx * 35 * factor).toFixed(2)}px, ${(-cy * 7.35 * factor).toFixed(2)}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      clearTimeout(t1); clearTimeout(t2)
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Light mode: use a very light blue so multiply doesn't darken the face.
  // Dark mode: use a soft cool blue-grey (highlight-text) rather than the
  // saturated accent, so multiplying the video against it doesn't produce
  // a heavy accent overcast on the face.
  const holoColor = theme === 'dark' ? 'var(--primitive-dark-hl-text)' : 'var(--color-highlight-bg)'

  const ghostStyle: React.CSSProperties = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'contain', objectPosition: '50% 38%',
    display: 'block',
    filter: 'saturate(0) blur(0.75px) brightness(130%) contrast(180%)',
    mixBlendMode: 'multiply',
    transition: 'transform 0.1s ease-out',
  }

  const frontVideoStyle: React.CSSProperties = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'contain', objectPosition: '50% 38%',
    display: 'block',
    opacity: 0.6,
    filter: isLoaded
      ? 'saturate(0) brightness(100%) contrast(200%)'
      : 'saturate(0) blur(1.75px) brightness(130%) contrast(180%)',
    mixBlendMode: 'multiply',
    transition: isLoaded
      ? 'transform 0.1s ease-out, filter 0.3s ease 0.8s'
      : 'transform 0.1s ease-out',
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isEmitting ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* Head — horizontally and vertically centered */}
      <div
        ref={headRef}
        style={{
          position: 'relative',
          width: `${HEAD_W}px`, height: `${HEAD_H}px`,
          transformOrigin: '50% 40%',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
        }}
      >
        {[0.8, 0.5, 0.6, 0.7, 0.7].map((opacity, i) => (
          <video
            key={i}
            ref={el => { videoRefs.current[i] = el }}
            src={VIDEO_SRC}
            autoPlay loop muted playsInline
            style={{ ...ghostStyle, opacity }}
          />
        ))}

        {/* Front layer */}
        <div
          style={{
            position: 'absolute', inset: 0,
            zIndex: 20,
            background: holoColor,
            maskImage: 'radial-gradient(ellipse 75% 55% at 50% 48%, black 28%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 55% at 50% 48%, black 28%, transparent 75%)',
          }}
        >
          <video
            ref={el => { videoRefs.current[5] = el }}
            src={VIDEO_SRC}
            autoPlay loop muted playsInline
            style={frontVideoStyle}
          />
        </div>

        {/* Scanlines */}
        <div
          style={{
            position: 'absolute', inset: 0,
            zIndex: 25, pointerEvents: 'none',
            background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.032) 0px, rgba(0,0,0,0.032) 1px, transparent 1px, transparent 3px)',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 38%, black 40%, transparent 78%)',
          }}
        />
      </div>

      {/* Emitter — pinned to bottom-center of the left column */}
      <div
        style={{
          position: 'absolute',
          bottom: -32,
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${EMIT_W}px`, height: `${EMIT_H}px`,
          background: holoColor,
          clipPath: 'polygon(0 0, 100% 0, 65% 100%, 35% 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          opacity: 0.5,
          transition: 'var(--transition-theme)',
        }}
      />
    </div>
  )
}
