'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Reveals its child once the visitor has scrolled past most of the first screen,
 * so the floating action bar never covers the hero's own buttons.
 * Visible by default without JS.
 */
export function ShowAfterScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    let zonesInView = 0
    const update = () => {
      frame = 0
      el.dataset.visible = window.scrollY > window.innerHeight * 0.6 && zonesInView === 0 ? 'true' : 'false'
    }
    // Step aside while a section with its own call to action (closing band, footer) is on screen.
    const seen = new Set<Element>()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target)
        else seen.delete(e.target)
      }
      zonesInView = seen.size
      update()
    })
    document.querySelectorAll('[data-cta-zone]').forEach((z) => io.observe(z))
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
