'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './Lightbox.module.css'

interface Item { src: string; srcSet: string; alt: string; caption: string }
interface Labels { close: string; prev: string; next: string; zoom: string }

/**
 * Full-screen viewer for every `[data-lightbox]` link inside `root`.
 * Full-resolution image (browser picks the size from srcset), arrows, keyboard,
 * swipe, and tap/click to zoom 2.5× with drag-to-pan. Without JS the link
 * simply opens the full-size photo.
 */
export function Lightbox({ rootId, labels }: { rootId: string; labels: Labels }) {
  const [items, setItems] = useState<Item[]>([])
  const [index, setIndex] = useState<number | null>(null)
  const [zoom, setZoom] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const dialog = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const touch = useRef<{ x: number; y: number } | null>(null)

  const visible = useCallback(() => {
    const root = document.getElementById(rootId)
    return Array.from(root?.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]') ?? []).filter((a) => !a.closest('[hidden]'))
  }, [rootId])

  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-lightbox]')
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      const links = visible()
      setItems(links.map((l) => ({ src: l.getAttribute('href')!, srcSet: l.dataset.srcset ?? '', alt: l.dataset.alt ?? '', caption: l.dataset.caption ?? '' })))
      lastFocus.current = a
      setZoom(false)
      setIndex(links.indexOf(a))
    }
    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [rootId, visible])

  const open = index !== null
  const go = useCallback((d: number) => {
    setZoom(false)
    setIndex((i) => (i === null ? i : (i + d + items.length) % items.length))
  }, [items.length])
  const close = useCallback(() => {
    setIndex(null)
    lastFocus.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    dialog.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, go])

  // Preload neighbours so swiping feels instant
  useEffect(() => {
    if (index === null || items.length < 2) return
    for (const d of [1, -1]) {
      const it = items[(index + d + items.length) % items.length]
      if (!it) continue
      const img = new Image()
      img.sizes = window.innerWidth >= 1024 ? '100vw' : '250vw'
      img.srcset = it.srcSet
      img.src = it.src
    }
  }, [index, items])

  if (!open || !items[index!]) return null
  const it = items[index!]!

  const pan = (clientX: number, clientY: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    setOrigin(`${((clientX - r.left) / r.width) * 100}% ${((clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <div ref={dialog} className={styles.backdrop} role="dialog" aria-modal="true" aria-label={it.caption} tabIndex={-1}
      onClick={(e) => { if (e.target === e.currentTarget) close() }}
      onTouchStart={(e) => { const t = e.touches[0]; if (t && e.touches.length === 1) touch.current = { x: t.clientX, y: t.clientY } }}
      onTouchEnd={(e) => {
        const s = touch.current; const t = e.changedTouches[0]; touch.current = null
        if (!s || !t || zoom) return
        const dx = t.clientX - s.x; const dy = t.clientY - s.y
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
        else if (dy > 90) close()
      }}
    >
      <button type="button" className={`${styles.btn} ${styles.close}`} onClick={close} aria-label={labels.close}>
        <svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>
      {items.length > 1 ? (
        <>
          <button type="button" className={`${styles.btn} ${styles.prev}`} onClick={() => go(-1)} aria-label={labels.prev}>
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className={`${styles.btn} ${styles.next}`} onClick={() => go(1)} aria-label={labels.next}>
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </>
      ) : null}
      <figure className={styles.figure}>
        <div className={styles.stage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={it.src}
            src={it.src}
            srcSet={it.srcSet}
            sizes="(min-width: 64rem) 100vw, 250vw"
            alt={it.alt}
            className={`${styles.img} ${zoom ? styles.zoomed : ''}`}
            style={{ transformOrigin: origin }}
            draggable={false}
            onClick={(e) => { pan(e.clientX, e.clientY, e.currentTarget); setZoom((z) => !z) }}
            onMouseMove={(e) => { if (zoom) pan(e.clientX, e.clientY, e.currentTarget) }}
            onTouchMove={(e) => { const t = e.touches[0]; if (zoom && t) pan(t.clientX, t.clientY, e.currentTarget) }}
          />
        </div>
        <figcaption className={styles.caption}>
          <span className={styles.count}>{String(index! + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
          <span>{it.caption}</span>
          <span className={styles.hint}>{labels.zoom}</span>
        </figcaption>
      </figure>
    </div>
  )
}
