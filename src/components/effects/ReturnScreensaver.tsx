import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useReturnScreensaver } from '../../hooks/useReturnScreensaver'

/*
 * DVD-style bouncing-logo screensaver that plays when the user returns to the tab.
 * The SVG variant swaps to reflect the current direction of motion (eyes look
 * toward where the logo is heading); middle-* variants flash briefly right after
 * a vertical bounce; the "eyes-closed" variant flickers in at random intervals
 * as a blink. Each edge bounce spawns a localized accent flash at the point of
 * impact — semicircular from a side edge, quarter-circle from a corner (the
 * classic DVD-corner payoff). Screensaver stays up until any user activity.
 */

type Vert = 'top' | 'middle' | 'bottom'
type Horiz = 'left' | 'right'
type Variant = `${Vert}-${Horiz}` | 'closed'

interface Flash {
  id: number
  x: number
  y: number
  kind: 'edge' | 'corner'
}

const LOGO_SIZE = 140 // px — logo width; height is auto from SVG aspect ratio
const SPEED = 220 // px/s — leisurely drift
const BOUNCE_BLIP_MS = 150 // how long the middle-* variant flashes after a vertical bounce
const BLINK_MS = 140 // how long the eyes-closed variant shows during a blink
const BLINK_MIN_GAP_MS = 2500 // minimum time between blinks
const BLINK_MAX_GAP_MS = 6000 // maximum time between blinks
const EDGE_FLASH_MS = 550 // localized edge-flash duration
const CORNER_FLASH_MS = 900 // localized corner-flash duration

export default function ReturnScreensaver() {
  const { isPlaying, dismiss } = useReturnScreensaver({ minHiddenMs: 5000 })
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [variant, setVariant] = useState<Variant>('bottom-right')
  const [visible, setVisible] = useState(false)
  const [flashes, setFlashes] = useState<Flash[]>([])
  const flashIdRef = useRef(0)

  useEffect(() => {
    if (!isPlaying) {
      setVisible(false)
      setFlashes([])
      return
    }
    const w = window.innerWidth
    const h = window.innerHeight
    /*
     * State kept in a closure (not React state) so the RAF loop can mutate it
     * without triggering re-renders per frame — we only setState for the bits
     * that actually affect render (pos, variant, flashes).
     */
    const s = {
      x: w / 2 - LOGO_SIZE / 2,
      y: h / 2 - LOGO_SIZE / 2,
      vx: SPEED * (Math.random() < 0.5 ? -1 : 1),
      vy: SPEED * (Math.random() < 0.5 ? -1 : 1),
      bounceBlipUntil: 0,
      blinkUntil: 0,
      blinkNextAt: performance.now() + BLINK_MIN_GAP_MS + Math.random() * (BLINK_MAX_GAP_MS - BLINK_MIN_GAP_MS),
      last: performance.now(),
    }
    setPos({ x: s.x, y: s.y })
    // Force layout paint before flipping opacity so the fade-in animates
    requestAnimationFrame(() => setVisible(true))

    let raf = 0
    const tick = (t: number) => {
      const dt = Math.min((t - s.last) / 1000, 1 / 30)
      s.last = t
      s.x += s.vx * dt
      s.y += s.vy * dt
      const maxX = window.innerWidth - LOGO_SIZE
      const maxY = window.innerHeight - LOGO_SIZE
      let leftBounced = false
      let rightBounced = false
      let topBounced = false
      let bottomBounced = false
      if (s.x <= 0) { s.x = 0; s.vx = Math.abs(s.vx); leftBounced = true }
      else if (s.x >= maxX) { s.x = maxX; s.vx = -Math.abs(s.vx); rightBounced = true }
      if (s.y <= 0) { s.y = 0; s.vy = Math.abs(s.vy); topBounced = true }
      else if (s.y >= maxY) { s.y = maxY; s.vy = -Math.abs(s.vy); bottomBounced = true }
      const hBounced = leftBounced || rightBounced
      const vBounced = topBounced || bottomBounced
      if (vBounced) s.bounceBlipUntil = t + BOUNCE_BLIP_MS

      // Spawn a localized accent flash at the point of impact, and blink on every hit
      // (the eyes-closed variant briefly overrides the direction variant right after).
      if (hBounced || vBounced) {
        const kind: Flash['kind'] = hBounced && vBounced ? 'corner' : 'edge'
        const fx = leftBounced ? 0 : rightBounced ? window.innerWidth : s.x + LOGO_SIZE / 2
        const fy = topBounced ? 0 : bottomBounced ? window.innerHeight : s.y + LOGO_SIZE / 2
        const id = ++flashIdRef.current
        setFlashes(prev => [...prev, { id, x: fx, y: fy, kind }])
        const duration = kind === 'corner' ? CORNER_FLASH_MS : EDGE_FLASH_MS
        window.setTimeout(() => {
          setFlashes(prev => prev.filter(f => f.id !== id))
        }, duration)
        s.blinkUntil = t + BLINK_MS
      }

      // Blink scheduler — randomly show the eyes-closed variant for BLINK_MS.
      if (t >= s.blinkNextAt && t >= s.blinkUntil) {
        s.blinkUntil = t + BLINK_MS
        s.blinkNextAt = t + BLINK_MIN_GAP_MS + Math.random() * (BLINK_MAX_GAP_MS - BLINK_MIN_GAP_MS)
      }

      let nextVariant: Variant
      if (t < s.blinkUntil) {
        nextVariant = 'closed'
      } else {
        const horiz: Horiz = s.vx > 0 ? 'right' : 'left'
        const vert: Vert = t < s.bounceBlipUntil ? 'middle' : s.vy > 0 ? 'bottom' : 'top'
        nextVariant = `${vert}-${horiz}`
      }
      setPos({ x: s.x, y: s.y })
      setVariant(nextVariant)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    /*
     * Screensaver stays up until real user activity. Two false triggers to guard against:
     * (1) On focus regain the browser can fire a stray mousemove at the current cursor
     *     position even though the user hasn't moved — so we require pointer motion to
     *     exceed a small threshold from the first observed position before dismissing.
     * (2) The keydown/keyup for the tab-switch shortcut (Cmd/Ctrl+Tab, Cmd+`) itself
     *     doesn't count — so we ignore modifier keys and Tab.
     * A 400ms arm delay covers any residual events fired synchronously with the
     * visibilitychange that started the screensaver.
     */
    const ARM_DELAY_MS = 400
    const MOUSEMOVE_THRESHOLD_PX = 8
    let armed = false
    let mouseAnchor: { x: number; y: number } | null = null
    const armTimer = window.setTimeout(() => { armed = true }, ARM_DELAY_MS)
    const onMouseMove = (e: MouseEvent) => {
      if (!armed) return
      if (mouseAnchor == null) {
        mouseAnchor = { x: e.clientX, y: e.clientY }
        return
      }
      const dx = e.clientX - mouseAnchor.x
      const dy = e.clientY - mouseAnchor.y
      if (dx * dx + dy * dy > MOUSEMOVE_THRESHOLD_PX * MOUSEMOVE_THRESHOLD_PX) dismiss()
    }
    const ignoredKeys = new Set(['Meta', 'Control', 'Shift', 'Alt', 'Tab', 'CapsLock', 'OS'])
    const onKey = (e: KeyboardEvent) => {
      if (!armed) return
      if (ignoredKeys.has(e.key)) return
      dismiss()
    }
    const onDirectActivity = () => { if (armed) dismiss() }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onDirectActivity)
    window.addEventListener('touchmove', onDirectActivity)
    window.addEventListener('wheel', onDirectActivity, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(armTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onDirectActivity)
      window.removeEventListener('touchmove', onDirectActivity)
      window.removeEventListener('wheel', onDirectActivity)
    }
  }, [isPlaying, dismiss])

  if (!isPlaying) return null

  const src = variant === 'closed'
    ? '/screensaver/logo-eyes-closed.svg'
    : `/screensaver/logo-${variant}.svg`

  return createPortal(
    <div
      role="presentation"
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        /* Soft white veil so the bouncing logo reads clearly regardless of theme. Accent lives in the edge flashes below. */
        background: 'rgba(255, 255, 255, 0.7)',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transition: 'opacity 250ms ease-out',
        overflow: 'hidden',
      }}
    >
      {/* Edge/corner flashes — radial gradient burst centered on each impact point. The flash extends past the edge, so the visible half (or quarter, on corners) reads as a burst emanating from where the logo hit. */}
      {flashes.map(f => {
        const size = f.kind === 'corner' ? 520 : 320
        const duration = f.kind === 'corner' ? CORNER_FLASH_MS : EDGE_FLASH_MS
        return (
          <div
            key={f.id}
            aria-hidden
            style={{
              position: 'absolute',
              left: f.x,
              top: f.y,
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderRadius: '50%',
              background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent) 65%, transparent) 0%, transparent 62%)',
              pointerEvents: 'none',
              animation: `rss-edge-flash ${duration}ms ease-out forwards`,
            }}
          />
        )
      })}

      <img
        src={src}
        alt=""
        aria-hidden
        draggable={false}
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          width: LOGO_SIZE,
          height: 'auto',
          display: 'block',
          borderRadius: 8,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
    </div>,
    document.body,
  )
}
