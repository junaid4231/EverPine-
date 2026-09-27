import Link from 'next/link'
import styles from './Footer.module.css'
import { LogoStacked } from '@/components/Logo'
import { localePath, type Locale } from '@/lib/i18n'
import { formatPhone, siteConfig, telHref, whatsappHref } from '@/lib/site-config'
import type { Dictionary } from '@/content/types'

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const lp = (p: string) => localePath(locale, p)
  const f = dict.footer
  const servicePages = dict.servicePages.map((s) => ({ href: lp(`/services/${s.slug}`), label: s.name }))
  const year = new Date().getFullYear()
  const wa = whatsappHref(dict.whatsappMessages.general)
  const tel = telHref()

  return (
    <footer data-cta-zone className={`theme-midnight ${styles.footer}`}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Link href={lp('/')} aria-label="Everpine Events — home" className={styles.logo}>
            <LogoStacked />
          </Link>
          <p className={styles.statement}>{f.statement}</p>
          <div className={styles.reach}>
            <Link href={`${lp('/contact')}#quote`} className="btn btn-gold">
              {dict.cta.quote}
            </Link>
            {wa ? (
              <a href={wa} className={styles.reachLink} data-track="whatsapp_click" data-track-label="footer">
                WhatsApp
              </a>
            ) : null}
            {tel && siteConfig.phone ? (
              <a href={tel} className={styles.reachLink} data-track="call_click" data-track-label="footer">
                {formatPhone(siteConfig.phone)}
              </a>
            ) : null}
            {siteConfig.publicEmail ? (
              <a href={`mailto:${siteConfig.publicEmail}`} className={styles.reachLink} data-track="email_click" data-track-label="footer">
                {siteConfig.publicEmail}
              </a>
            ) : null}
          </div>
        </div>

        <div className={styles.links}>
          <nav className={`${styles.col} ${styles.services}`} aria-label={f.servicesHeading}>
            <h2>{f.servicesHeading}</h2>
            <ul>
              <li><Link href={lp('/packages')}>{dict.nav.packages}</Link></li>
              {servicePages.map((s) => (
                <li key={s.href}><Link href={s.href}>{s.label}</Link></li>
              ))}
              <li><Link href={lp('/commercial-christmas-decor')}>{dict.nav.commercial}</Link></li>
            </ul>
          </nav>
          <nav className={styles.col} aria-label={f.areasHeading}>
            <h2>{f.areasHeading}</h2>
            <ul>
              <li><Link href={lp('/christmas-decoration-dubai')}>{dict.ui.christmasDecorationIn(dict.areas.dubai)}</Link></li>
              <li><Link href={lp('/christmas-decoration-sharjah')}>{dict.ui.christmasDecorationIn(dict.areas.sharjah)}</Link></li>
            </ul>
            <h2 className={styles.sub}>{dict.nav.guides}</h2>
            <ul>
              <li><Link href={lp('/guides/christmas-tree-size-ceiling-height')}>{dict.ui.treeSizeGuideShort}</Link></li>
              <li><Link href={lp('/guides/office-christmas-decor-planning')}>{dict.ui.officeGuideShort}</Link></li>
            </ul>
          </nav>
          <nav className={styles.col} aria-label={f.companyHeading}>
            <h2>{f.companyHeading}</h2>
            <ul>
              <li><Link href={lp('/about')}>{dict.nav.about}</Link></li>
              <li><Link href={lp('/gallery')}>{dict.nav.gallery}</Link></li>
              <li><Link href={lp('/faq')}>{dict.nav.faq}</Link></li>
              <li><Link href={lp('/contact')}>{dict.nav.contact}</Link></li>
              {siteConfig.socials.map((s) => (
                <li key={s.url}><a href={s.url} rel="noopener me">{s.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={`container ${styles.base}`}>
        <span className={styles.divider} aria-hidden="true">
          <svg viewBox="0 0 10 10" width="10" height="10"><path d="M5 0C5.4 3.2 6.8 4.6 10 5 6.8 5.4 5.4 6.8 5 10 4.6 6.8 3.2 5.4 0 5 3.2 4.6 4.6 3.2 5 0Z" fill="currentColor" /></svg>
        </span>
        <div className={styles.baseRow}>
          <span>© {year} {siteConfig.legalName ?? siteConfig.name}. {f.legal}</span>
          <span className={styles.where}>{dict.areas.dubai} · {dict.areas.sharjah} · UAE</span>
          <Link href={lp('/privacy-policy')}>{f.privacy}</Link>
        </div>
      </div>
    </footer>
  )
}
