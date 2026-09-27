import Link from 'next/link'
import styles from './ServicesIndex.module.css'
import { Img } from '@/components/Img'
import { localePath, type Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

/**
 * The services as an advent calendar: ten numbered photo "doors".
 * Each pair of lattice door leaves swings open as the tile scrolls into view,
 * revealing the photograph behind it. Mobile-first: two columns, the first and
 * last services open wide across the row. Desktop: a four-column calendar
 * with one feature door and three wide ones.
 */
export function ServicesIndex({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const items = dict.servicesIndex
  const last = items.length - 1
  return (
    <ol className={styles.calendar} role="list">
      {items.map((s, i) => {
        const wideMobile = i === 0 || i === last
        const wideDesktop = i === 0 || i === 3 || i === 6 || i === last
        const sizes = wideDesktop
          ? `(min-width: 64rem) 46vw, ${wideMobile ? '92vw' : '46vw'}`
          : '(min-width: 64rem) 23vw, 46vw'
        return (
          <li key={s.id} className={styles.tile} data-shape={i === 0 ? 'feature' : wideDesktop ? 'wide' : 'door'} data-wide-m={wideMobile || undefined} data-reveal style={{ ['--d' as string]: i % 4 }}>
            <Link href={localePath(locale, `/services/${s.page}`)} className={styles.link}>
              <span className={styles.media}>
                <Img id={s.image} dict={dict} fill sizes={sizes} />
              </span>
              <span className={styles.leaves} aria-hidden="true">
                <span className={styles.leaf} />
                <span className={styles.leaf} />
              </span>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.body}>
                <span className={styles.name}>{s.name}</span>
                <span className={styles.line}>{s.line}</span>
              </span>
              <span className={styles.go} aria-hidden="true">
                <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
          </li>
        )
      })}
    </ol>
  )
}
