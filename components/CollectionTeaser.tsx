import Link from 'next/link'
import styles from './CollectionTeaser.module.css'
import { Img } from '@/components/Img'
import { formatAED, formatHeight, siteConfig } from '@/lib/site-config'
import { localePath, type Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

/** Home-page version of the Collection: three compositions at a glance, full detail on /packages. */
export function CollectionTeaser({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.packages
  return (
    <section className={styles.section} id="collection" aria-labelledby="collection-heading">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">{p.heading}</p>
            <h2 id="collection-heading">
              {dict.ui.teaserHeading[0]} <em>{dict.ui.teaserHeading[1]}</em>
            </h2>
          </div>
          <p className="lede" style={{ color: 'var(--muted)' }}>
            {p.intro}
          </p>
        </div>
        <ol className={styles.row} data-reveal role="list" tabIndex={0} aria-label={p.heading}>
          {siteConfig.packages.map((pkg) => {
            const c = p.items[pkg.id]
            return (
              <li key={pkg.id} className={`${styles.card} ${pkg.id === 'gold' ? styles.featured : ''}`}>
                <Link href={`${localePath(locale, '/packages')}#${pkg.id}`} className={styles.link} data-track="package_select" data-track-label={`home_${pkg.id}`}>
                  <div className={`${styles.frame} arch`}>
                    <Img id={c.image} dict={dict} fill sizes="(min-width: 64rem) 20rem, (min-width: 40rem) 44vw, 74vw" />
                  </div>
                  <div className={styles.body}>
                    <div className={styles.top}>
                      <span className={styles.numeral} aria-hidden="true">
                        {c.numeral}
                      </span>
                      <h3 className={styles.name}>{c.name}</h3>
                    </div>
                    <span className={styles.tag}>{c.tagline}</span>
                    <p className={styles.tagline}>{c.summary}</p>
                    <p className={styles.meta}>
                      <span className={styles.height}>
                        {formatHeight(pkg.treeHeightM)} {dict.ui.tree}
                      </span>
                      <span className="gift-tag">
                        <small>{dict.ui.packagePrice}</small>
                        <strong>{formatAED(pkg.priceAED, locale)}</strong>
                      </span>
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ol>
        <div className={styles.foot}>
          <Link href={localePath(locale, '/packages')} className="btn btn-gold">
            {dict.ui.compareAll}
          </Link>
          <p className={styles.note}>{p.priceNote}</p>
        </div>
      </div>
    </section>
  )
}
