'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/**
 * On every client-side page change, start the new page at the very top.
 * (Next.js scrolls the changed segment into view, which lands just below the
 * header because of the header offset / smooth scrolling.) Links to an
 * in-page #anchor are left alone, and back/forward keeps the browser's own
 * restored position.
 */
export function ScrollToTop() {
  const pathname = usePathname()
  const first = useRef(true)
  const popped = useRef(false)

  useEffect(() => {
    const onPop = () => {
      popped.current = true
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (popped.current) {
      popped.current = false
      return
    }
    if (window.location.hash) return
    const top = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    top()
    const raf = requestAnimationFrame(top)
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return null
}
