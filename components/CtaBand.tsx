import styles from './CtaBand.module.css'
import { ContactButtons } from '@/components/ContactButtons'
import { LightString } from '@/components/LightString'
import { Ornaments } from '@/components/Ornaments'
import { Flurry } from '@/components/Flurry'
import { seasonMode, seasonYear } from '@/lib/site-config'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

/** Closing "night" band. Copy follows the season flag. */
export function CtaBand({ dict, locale, heading, message, placement }: { dict: Dictionary; locale: Locale; heading?: string; message?: string; placement: string }) {
  const season = dict.season[seasonMode()]
  const eyebrow = season.eyebrow.replace('{year}', String(seasonYear()))
  return (
    <section data-cta-zone className={`${styles.band} lattice`} aria-labelledby={`cta-${placement}`}>
      <Flurry className={styles.snow} />
      <Ornaments count={5} className={styles.ornaments} />
      <div className={`container ${styles.content}`}>
        <LightString className={styles.string} />
        <div className={styles.inner}>
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`cta-${placement}`} className={styles.heading} style={{ marginTop: 'var(--s-4)' }}>
              {heading ?? dict.ui.closingDefault}
            </h2>
          </div>
          <div className={styles.side}>
            <p className="muted">{season.line}</p>
            <div className={styles.ctas} style={{ marginTop: 'var(--s-5)' }}>
              <ContactButtons dict={dict} locale={locale} placement={placement} message={message} compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
