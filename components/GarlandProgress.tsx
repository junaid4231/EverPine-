'use client'

import { useEffect, useRef } from 'react'

const BULBS = 28

/**
 * A garland strung under the header whose bulbs switch on one by one as the
 * visitor scrolls down the page — the house lighting up as you explore it.
 * Only toggles attributes when the lit count changes, so scrolling stays cheap.
 */
export function GarlandProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const bulbs = Array.from(el.querySelectorAll<HTMLElement>('i'))
    let lit = -1
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      const n = Math.round(p * BULBS)
      if (n === lit) return
      lit = n
      bulbs.forEach((b, i) => b.toggleAttribute('data-on', i < n))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className="garland" aria-hidden="true">
      <svg viewBox="0 0 1000 14" preserveAspectRatio="none">
        <path d={`M0 2 ${Array.from({ length: BULBS }, (_, i) => `Q ${(i + 0.5) * (1000 / BULBS)} ${i % 2 ? 9 : 12} ${(i + 1) * (1000 / BULBS)} 2`).join(' ')}`} />
      </svg>
      <div className="garland-bulbs">
        {Array.from({ length: BULBS }, (_, i) => (
          <i key={i} style={{ ['--hue' as string]: ['#ffd98a', '#ff6b5e', '#ffe9b8', '#7fd1a8'][i % 4] }} />
        ))}
      </div>
    </div>
  )
}
