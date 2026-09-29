import Link from 'next/link'
import styles from './Header.module.css'
import { Wordmark } from '@/components/Logo'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'
import { WhatsAppIcon } from '@/components/Icons'
import { localePath, type Locale } from '@/lib/i18n'
import { whatsappHref } from '@/lib/site-config'
import type { Dictionary } from '@/content/types'

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const n = dict.nav
  const lp = (p: string) => localePath(locale, p)
  const primary = [
    { href: lp('/packages'), label: n.packages },
    { href: lp('/services'), label: n.services },
    { href: lp('/commercial-christmas-decor'), label: n.commercial },
    { href: lp('/christmas-decoration-dubai'), label: n.dubai },
    { href: lp('/christmas-decoration-sharjah'), label: n.sharjah },
    { href: lp('/gallery'), label: n.gallery },
    { href: lp('/faq'), label: n.faq },
  ]
  const secondary = [
    { href: lp('/villa-christmas-decoration-dubai'), label: dict.ui.villaDubai },
    { href: lp('/luxury-christmas-decoration-dubai'), label: dict.ui.luxuryDubai },
    { href: lp('/about'), label: n.about },
    { href: lp('/guides/christmas-tree-size-ceiling-height'), label: dict.ui.treeSizeGuide },
    { href: lp('/guides/office-christmas-decor-planning'), label: dict.ui.officeGuide },
  ]
  const wa = whatsappHref(dict.whatsappMessages.general)

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href={lp('/')} className={styles.brand} aria-label="Everpine Events — home">
          <Wordmark />
        </Link>
        <nav className={styles.nav} aria-label={n.primary}>
          <ul>
            {primary.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.actions}>
          {wa ? (
            <a href={wa} className={styles.wa} data-track="whatsapp_click" data-track-label="header" aria-label={dict.cta.whatsapp}>
              <WhatsAppIcon />
            </a>
          ) : null}
          <Link href={`${lp('/contact')}#quote`} className={`btn btn-gold ${styles.quote}`}>
            {n.contact}
          </Link>
          <MobileMenu
            labels={{ menu: n.menu, close: n.close, nav: n.primary, quote: n.contact, whatsapp: dict.cta.whatsapp }}
            primary={[{ href: lp('/'), label: n.home }, ...primary]}
            secondary={secondary}
            quoteHref={`${lp('/contact')}#quote`}
            whatsappHref={wa}
          />
        </div>
      </div>
    </header>
  )
}
