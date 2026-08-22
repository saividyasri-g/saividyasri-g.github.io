import { useCallback, useEffect, useRef, useState } from 'react'

interface Options {
  /** Minimum time the tab must have been hidden for the screensaver to play on return. Guards against Cmd-Tab flicks. */
  minHiddenMs?: number
}

const MOBILE_SESSION_KEY = 'rss:playedOnce'

/**
 * Detects a tab hidden → visible transition and triggers the return screensaver.
 * The screensaver stays playing until the consumer calls `dismiss()` — the component
 * decides what counts as user activity (mousemove, key, touch, click). Bails on
 * prefers-reduced-motion. On coarse-pointer (mobile) devices, plays at most once
 * per session so app-switching doesn't fire it repeatedly.
 */
export function useReturnScreensaver({ minHiddenMs = 5000 }: Options = {}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const hiddenAtRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches

    const onVis = () => {
      if (document.hidden) {
        hiddenAtRef.current = Date.now()
        return
      }
      const hiddenAt = hiddenAtRef.current
      hiddenAtRef.current = null
      if (hiddenAt == null) return
      if (Date.now() - hiddenAt < minHiddenMs) return
      if (isMobile) {
        try {
          if (sessionStorage.getItem(MOBILE_SESSION_KEY) === '1') return
          sessionStorage.setItem(MOBILE_SESSION_KEY, '1')
        } catch {
          /* private mode / storage disabled — allow it to play */
        }
      }
      setIsPlaying(true)
    }

    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [minHiddenMs])

  const dismiss = useCallback(() => setIsPlaying(false), [])

  return { isPlaying, dismiss }
}
