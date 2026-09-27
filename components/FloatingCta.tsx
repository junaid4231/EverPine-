import Link from 'next/link'
import styles from './FloatingCta.module.css'
import { WhatsAppIcon } from '@/components/Icons'
import { ShowAfterScroll } from '@/components/ShowAfterScroll'
import { whatsappHref } from '@/lib/site-config'
import { localePath, type Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

/** Mobile-only persistent action bar. WhatsApp leads once a number is configured; until then, the quote form. */
export function FloatingCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const wa = whatsappHref(dict.whatsappMessages.general)
  return (
    <ShowAfterScroll className={styles.wrap}>
    <div className={styles.float} role="complementary" aria-label={dict.cta.quote}>
      {wa ? (
        <>
          <a href={wa} className="btn btn-primary" data-track="whatsapp_click" data-track-label="floating">
            <WhatsAppIcon />
            {dict.cta.whatsappShort}
          </a>
          <Link href={`${localePath(locale, '/contact')}#quote`} className={`btn ${styles.secondary}`}>
            {dict.cta.quote}
          </Link>
        </>
      ) : (
        <>
          <Link href={localePath(locale, '/packages')} className={`btn ${styles.secondary}`}>
            {dict.nav.packages}
          </Link>
          <Link href={`${localePath(locale, '/contact')}#quote`} className="btn btn-primary">
            {dict.cta.quote}
          </Link>
        </>
      )}
    </div>
    </ShowAfterScroll>
  )
}
