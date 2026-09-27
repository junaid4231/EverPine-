import styles from './Faqs.module.css'
import { Rich } from '@/components/Rich'
import type { Faq } from '@/content/types'
import type { Locale } from '@/lib/i18n'

/** Native <details> accordion — accessible and zero-JS. Answers stay in the DOM for crawlers. */
export function Faqs({ faqs, locale, heading, eyebrow, id }: { faqs: Faq[]; locale: Locale; heading?: string; eyebrow?: string; id?: string }) {
  const headingId = id ? `${id}-heading` : undefined
  return (
    <div className={`${styles.wrap} ${heading ? '' : styles.single}`}>
      {heading ? (
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="h2" id={headingId} style={{ marginTop: eyebrow ? 'var(--s-3)' : 0 }}>
            {heading}
          </h2>
        </div>
      ) : null}
      <div className={styles.list}>
        {faqs.map((f) => (
          <details key={f.q} className={styles.item}>
            <summary>{f.q}</summary>
            <div className={styles.answer}>
              <p>
                <Rich text={f.a} locale={locale} />
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
