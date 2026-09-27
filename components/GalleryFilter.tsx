'use client'

import { useRef, useState, type ReactNode } from 'react'
import styles from './Gallery.module.css'

interface Props {
  types: { id: string; label: string }[]
  palettes: { id: string; label: string }[]
  labels: { all: string; type: string; palette: string; showing: string[] }
  total: number
  children: ReactNode
}

/**
 * Filters server-rendered gallery items by toggling their `hidden` attribute.
 * Every image stays in the HTML for crawlers; without JS all items show.
 */
export function GalleryFilter({ types, palettes, labels, total, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [type, setType] = useState('all')
  const [palette, setPalette] = useState('all')
  const [count, setCount] = useState(total)

  const apply = (t: string, p: string) => {
    const items = ref.current?.querySelectorAll<HTMLElement>('[data-types]') ?? []
    let n = 0
    items.forEach((el) => {
      const ok = (t === 'all' || el.dataset.types!.split(' ').includes(t)) && (p === 'all' || el.dataset.palette === p)
      el.hidden = !ok
      if (ok) n++
    })
    ref.current?.querySelector('ul')?.classList.toggle(styles.filtered!, t !== 'all' || p !== 'all')
    setCount(n)
  }

  const chip = (group: 'type' | 'palette', id: string, label: string) => {
    const active = group === 'type' ? type === id : palette === id
    return (
      <button
        key={id}
        type="button"
        className={styles.chip}
        aria-pressed={active}
        onClick={() => {
          const t = group === 'type' ? id : type
          const p = group === 'palette' ? id : palette
          setType(t)
          setPalette(p)
          apply(t, p)
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div ref={ref}>
      <div className={styles.filters}>
        <div className={styles.group} role="group" aria-label={labels.type}>
          <span className={styles.groupLabel}>{labels.type}</span>
          {chip('type', 'all', labels.all)}
          {types.map((t) => chip('type', t.id, t.label))}
        </div>
        <div className={styles.group} role="group" aria-label={labels.palette}>
          <span className={styles.groupLabel}>{labels.palette}</span>
          {chip('palette', 'all', labels.all)}
          {palettes.map((p) => chip('palette', p.id, p.label))}
        </div>
        <p className={styles.count} aria-live="polite">
          {labels.showing[count] ?? `${count}`}
        </p>
      </div>
      {children}
    </div>
  )
}
