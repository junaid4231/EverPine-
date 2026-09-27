'use client'

import { useEffect, useRef } from 'react'

/**
 * A light, slow snowfall confined to its parent (the closing CTA band) — like
 * looking out of a window at night. Runs only while the band is on screen and
 * the tab is visible; nothing at all under reduced motion.
 */
export function Flurry({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    type F = { x: number; y: number; r: number; v: number; d: number; a: number }
    let flakes: F[] = []
    const size = () => {
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(60, Math.max(24, w / 22)))
      flakes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 2.2,
        v: 0.25 + Math.random() * 0.55,
        d: Math.random() * Math.PI * 2,
        a: 0.25 + Math.random() * 0.55,
      }))
    }
    let raf = 0
    let running = false
    let last = 0
    const tick = (now: number) => {
      const dt = Math.min(3, (now - (last || now)) / 16.7)
      last = now
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        f.y += f.v * dt
        f.d += 0.012 * dt
        f.x += Math.sin(f.d) * 0.35 * dt
        if (f.y > h + 4) {
          f.y = -4
          f.x = Math.random() * w
        }
        ctx.globalAlpha = f.a
        ctx.fillStyle = '#f6f0e4'
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (running) raf = requestAnimationFrame(tick)
    }
    const play = () => {
      if (running) return
      running = true
      last = 0
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }
    size()
    let visible = false
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting
      if (visible && !document.hidden) play()
      else stop()
    })
    io.observe(cv)
    const onVis = () => (document.hidden ? stop() : visible && play())
    document.addEventListener('visibilitychange', onVis)
    const ro = new ResizeObserver(size)
    ro.observe(cv)
    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
