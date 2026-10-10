import Link from 'next/link'
import { WhatsAppIcon, PhoneIcon } from '@/components/Icons'
import { formatPhone, siteConfig, telHref, whatsappHref } from '@/lib/site-config'
import { localePath, type Locale } from '@/lib/i18n'
import type { Dictionary } from '@/content/types'

interface Props {
  dict: Dictionary
  locale: Locale
  /** Analytics label, e.g. 'footer', 'contact', 'hero'. */
  placement: string
  message?: string
  compact?: boolean
  /** Show the quote-form link as well. */
  withQuote?: boolean
  light?: boolean
}

/**
 * WhatsApp / call / email controls. Each renders only when its detail is configured
 * in lib/site-config.ts, so nothing appears until the client supplies the number.
 */
export function ContactButtons({ dict, locale, placement, message, compact, withQuote = true, light }: Props) {
  const wa = whatsappHref(message ?? dict.whatsappMessages.general)
  const tel = telHref()
  const ghost = light ? 'btn btn-ghost' : 'btn btn-ghost'

  return (
    <>
      {wa ? (
        <a href={wa} className="btn btn-primary" data-track="whatsapp_click" data-track-label={placement}>
          <WhatsAppIcon />
          {compact ? dict.cta.whatsappShort : dict.cta.whatsapp}
        </a>
      ) : null}
      {withQuote ? (
        <Link href={`${localePath(locale, '/contact')}#quote`} className={wa ? ghost : 'btn btn-primary'}>
          {dict.cta.quote}
        </Link>
      ) : null}
      {tel && siteConfig.phone ? (
        <a href={tel} className={ghost} data-track="call_click" data-track-label={placement}>
          <PhoneIcon />
          {compact ? dict.cta.call : formatPhone(siteConfig.phone)}
        </a>
      ) : null}
    </>
  )
}
