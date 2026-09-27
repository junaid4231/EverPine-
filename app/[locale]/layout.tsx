import { ScrollToTop } from '@/components/ScrollToTop'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import '../globals.css'
import { display, displayItalic, sans } from '../fonts'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingCta } from '@/components/FloatingCta'
import { Analytics } from '@/components/Analytics'
import { JsonLd } from '@/components/JsonLd'
import { RevealScript } from '@/components/RevealScript'
import { businessNode, graph, websiteNode } from '@/lib/schema'
import { dir, localePath, locales } from '@/lib/i18n'
import { siteConfig, siteUrl } from '@/lib/site-config'
import { isIndexable } from '@/lib/seo'
import { load } from '@/lib/locale'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { dictionary: dict } = await load(params)
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${siteConfig.name} — ${dict.site.tagline}`, template: `%s · ${siteConfig.name}` },
    description: dict.site.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    formatDetection: { telephone: false, email: false, address: false },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: true },
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
    category: 'Home & Garden',
  }
}

export const viewport: Viewport = {
  themeColor: '#0a0e16',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale, dictionary: dict } = await load(params)

  return (
    <html suppressHydrationWarning data-scroll-behavior="smooth" lang={locale === 'en' ? 'en-AE' : locale} dir={dir(locale)} className={`${display.variable} ${displayItalic.variable} ${sans.variable}`}>
      <head>
        <RevealScript />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <ScrollToTop />
        <Header dict={dict} locale={locale} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer dict={dict} locale={locale} />
        <FloatingCta dict={dict} locale={locale} />
        <Analytics labels={dict.consent} privacyHref={localePath(locale, '/privacy-policy')} />
        <JsonLd data={graph(businessNode(dict), websiteNode(locale))} />
      </body>
    </html>
  )
}
