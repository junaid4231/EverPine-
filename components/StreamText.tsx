'use client'

import { useEffect, useRef } from 'react'

type Segment = { t: string; em?: boolean }

/**
 * A headline that "streams" in: each word brightens from a faint ghost to full
 * ink as the heading travels up the viewport — tied to scroll, so it reads at
 * the visitor's own pace. One CSS variable (--p) is written per frame; every
 * word derives its own opacity from it. Without JS, or with reduced motion,
 * the text is simply fully visible.
 */
export function StreamText({ segments, id, className }: { segments: Segment[]; id?: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.92
      const end = vh * 0.42
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)))
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    let io: IntersectionObserver | null = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) window.addEventListener('scroll', onScroll, { passive: true })
      else window.removeEventListener('scroll', onScroll)
    })
    io.observe(el)
    update()
    window.addEventListener('resize', onScroll)
    return () => {
      io?.disconnect()
      io = null
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  let i = 0
  const words = segments.flatMap((seg, si) =>
    seg.t.split(/\s+/).filter(Boolean).map((w, wi) => {
      const node = (
        <span key={`${si}-${wi}`} className="stream-w" style={{ ['--i' as string]: i }}>
          {w}{' '}
        </span>
      )
      i++
      return { node, em: !!seg.em, si }
    }),
  )
  const total = i
  const out: React.ReactNode[] = []
  segments.forEach((seg, si) => {
    const ws = words.filter((w) => w.si === si).map((w) => w.node)
    out.push(seg.em ? <em key={si}>{ws}</em> : ws)
  })

  return (
    <h2 ref={ref} id={id} className={`stream ${className ?? ''}`} style={{ ['--n' as string]: total }}>
      {out}
    </h2>
  )
}
