import Link from 'next/link'
import styles from './Collection.module.css'
import { Img } from '@/components/Img'
import { TreeScale } from '@/components/TreeScale'
import { Ribbon } from '@/components/Ribbon'
import { WhatsAppIcon } from '@/components/Icons'
import { formatAED, formatHeight, siteConfig, whatsappHref, type PackageFacts } from '@/lib/site-config'
import { localePath, type Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

interface Props {
  dict: Dictionary
  locale: Locale
  /** 'home' shows a compact intro; 'page' is used on /packages where the H1 sits above. */
  variant: 'home' | 'page'
}

/**
 * The packages as a curated "menu": three compositions on a pine surface,
 * each with price, contents, a to-scale tree drawing and direct enquiry actions.
 */
export function Collection({ dict, locale, variant }: Props) {
  const p = dict.packages
  const pkgs: readonly PackageFacts[] = siteConfig.packages

  return (
    <section className={styles.section} id="collection" aria-labelledby="collection-heading">
      <div className="container">
        {variant === 'page' ? <Ribbon className={styles.ribbon} /> : null}
        <div className={`${styles.head} ${variant === 'page' ? styles.headCompact : ''}`}>
          <div>
            <p className="eyebrow">{variant === 'home' ? dict.nav.packages : dict.ui.threeCompositions}</p>
            <h2 id="collection-heading" style={{ marginTop: 'var(--s-3)' }}>
              {variant === 'home' ? (
                <>
                  The <em>Collection</em>
                </>
              ) : (
                <>
                  {dict.ui.chooseComposition[0]} <em>{dict.ui.chooseComposition[1]}</em>
                </>
              )}
            </h2>
          </div>
          {variant === 'home' ? (
            <p className="lede" style={{ color: 'var(--muted)' }}>
              {p.intro}
            </p>
          ) : (
            <div className={styles.legend}>
              <p>{p.priceNote}</p>
              <p>
                <span aria-hidden="true">+</span> {dict.ui.newInTier}
              </p>
            </div>
          )}
        </div>

        <ol className={styles.list} role="list">
          {pkgs.map((pkg, index) => {
            const copy = p.items[pkg.id]
            const price = formatAED(pkg.priceAED, locale)
            const wa = whatsappHref(dict.whatsappMessages.package(copy.name, price))
            const prev = index > 0 ? new Set<string>(pkgs[index - 1]!.includes) : null
            const formHref = `${localePath(locale, '/contact')}?package=${pkg.id}#quote`
            return (
              <li key={pkg.id} id={pkg.id} className={styles.item}>
                <figure className={styles.figure}>
                  <div className={`${styles.frame} arch`}>
                    <Img id={copy.image} dict={dict} fill sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 40vw, 100vw" position="center top" />
                  </div>
                  <figcaption className="plate">
                    <b>{dict.ui.plate}</b>
                    <span>{dict.images[copy.image].caption}</span>
                  </figcaption>
                </figure>

                <div>
                  <div className={styles.titleRow}>
                    <span className={styles.numeral} aria-hidden="true">
                      {copy.numeral}
                    </span>
                    <h3 className={styles.name}>{copy.name}</h3>
                  </div>
                  <p className={styles.tagline}>{copy.tagline}</p>

                  <div className={styles.meta}>
                    <div>
                      <p className={styles.price}>
                        <span className="gift-tag">
                          <small>
                            {formatHeight(pkg.treeHeightM)} {dict.ui.tree}
                          </small>
                          <strong>{price}</strong>
                        </span>
                      </p>
                      <p className={styles.priceNote}>{dict.ui.finalQuote}</p>
                    </div>
                    <div className={styles.scaleMobile} aria-hidden="true">
                      <TreeScale height={pkg.treeHeightM} label={p.heightLabel} ceilingLabel={p.ceilingLabel} />
                    </div>
                  </div>

                  <p className={styles.summary}>{copy.summary}</p>
                  <p className={styles.ideal}>
                    <b>Ideal for</b> — {copy.idealFor}
                  </p>

                  <p className={styles.includesHead}>{p.whatArrives}</p>
                  <ul className={styles.includes}>
                    {pkg.includes.map((inc) => (
                      <li key={inc} className={prev && !prev.has(inc) ? styles.highlight : undefined}>
                        {prev && !prev.has(inc) ? <span className="visually-hidden">{dict.ui.newInTier}: </span> : null}
                        {inc === 'tree' ? `${formatHeight(pkg.treeHeightM)} ${dict.ui.tree}` : p.includeLabels[inc]}
                      </li>
                    ))}
                  </ul>

                  <div className={`${styles.ctas} cta-group`}>
                    {wa ? (
                      <a href={wa} className="btn btn-primary" data-track="whatsapp_click" data-track-label={`package_${pkg.id}`}>
                        <WhatsAppIcon />
                        {dict.cta.choose(copy.name)}
                      </a>
                    ) : null}
                    <Link href={formHref} className={wa ? 'btn btn-ghost' : 'btn btn-light'} data-track="package_select" data-track-label={pkg.id}>
                      {wa ? dict.cta.enquireForm : dict.cta.choose(copy.name)}
                    </Link>
                  </div>
                </div>

                <div className={styles.scale}>
                  <TreeScale height={pkg.treeHeightM} label={p.heightLabel} ceilingLabel={p.ceilingLabel} />
                </div>
              </li>
            )
          })}
        </ol>

        <p className={styles.footnote}>
          {p.notIncluded}{' '}
          <Link href={localePath(locale, '/services/christmas-decoration-removal')}>{dict.ui.removalLink}</Link> ·{' '}
          <Link href={localePath(locale, '/guides/christmas-tree-size-ceiling-height')}>{dict.ui.treeSizeLink}</Link>
        </p>
      </div>
    </section>
  )
}
