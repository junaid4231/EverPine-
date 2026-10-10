import styles from './Prose.module.css'
import { Img } from '@/components/Img'
import { Rich } from '@/components/Rich'
import type { ImageId } from '@/lib/images'
import type { Locale } from '@/lib/i18n'
import type { Dictionary, Section } from '@/content/types'

/**
 * Long-form sections, each optionally paired with a photograph.
 * Rows alternate sides on desktop so the page never settles into one rhythm.
 */
export function ProseRows({ sections, images = [], dict, locale }: { sections: Section[]; images?: ImageId[]; dict: Dictionary; locale: Locale }) {
  return (
    <div className={styles.rows}>
      {sections.map((s, i) => {
        const img = images[i]
        return (
          <div key={s.heading} className={`${styles.row} ${img ? '' : styles.rowNoImg}`}>
            <div className={styles.body}>
              <span className={styles.chapter} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2>{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)}>
                  <Rich text={p} locale={locale} />
                </p>
              ))}
              {s.list ? (
                <ul>
                  {s.list.map((li) => (
                    <li key={li.slice(0, 40)}>
                      <Rich text={li} locale={locale} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {img ? (
              <figure className={styles.side}>
                <div className={styles.frame} data-reveal>
                  <Img id={img} dict={dict} fill sizes="(min-width: 64rem) 30vw, 100vw" />
                </div>
                <figcaption className="plate">
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <span>{dict.images[img].caption}</span>
                </figcaption>
              </figure>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
