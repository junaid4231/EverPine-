import type { ReactNode } from 'react'
import styles from './PageHero.module.css'
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs'
import { Img } from '@/components/Img'
import { Rich } from '@/components/Rich'
import { Ornaments } from '@/components/Ornaments'
import type { ImageId } from '@/lib/images'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

interface Props {
  dict: Dictionary
  locale: Locale
  trail: Crumb[]
  eyebrow: string
  h1: string
  intro: string
  image?: ImageId
  imagePosition?: string
  ctas?: ReactNode
  note?: ReactNode
  plate?: string
  /** Phrase within h1 to set in gold italic. */
  accent?: string
}

/** Inner-page hero: breadcrumb, H1, intro, CTAs, and a portrait image that is the page's LCP element. */
export function PageHero({ dict, locale, trail, eyebrow, h1, intro, image, imagePosition, ctas, note, plate, accent }: Props) {
  return (
    <section className={`${styles.hero} lattice ${image ? '' : styles.textOnly}`}>
      <Ornaments count={3} className={styles.ornaments} />
      <div className={`container ${styles.grid}`}>
        <div className={styles.crumbs}>
          <Breadcrumbs trail={trail} locale={locale} label={dict.nav.breadcrumb} />
        </div>
        <div className={styles.text}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1">
            <Emph text={h1} accent={accent} />
          </h1>
          <p className={`lede ${styles.intro}`}>
            <Rich text={intro} locale={locale} />
          </p>
          {ctas ? <div className={styles.ctas}>{ctas}</div> : null}
          {note ? <p className={`small muted ${styles.note}`}>{note}</p> : null}
        </div>
        {image ? (
          <figure className={styles.figure}>
            <div className={`${styles.frame} ${styles.lights}`}>
              <Img id={image} dict={dict} sizes="(min-width: 64rem) 32vw, 64vw" priority quality={60} fill position={imagePosition} />
            </div>
            <span className={styles.line} aria-hidden="true" />
            <figcaption className="plate">
              <b>{dict.ui.plate}</b>
              <span>{plate ?? dict.images[image].caption}</span>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  )
}

/** Wraps the `accent` phrase of the headline in <em> (gold italic). Plain text stays intact for SEO. */
function Emph({ text, accent }: { text: string; accent?: string }) {
  const i = accent ? text.indexOf(accent) : -1
  if (!accent || i < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <em>{accent}</em>
      {text.slice(i + accent.length)}
    </>
  )
}
