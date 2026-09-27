import type { Metadata } from 'next'
import { isPlaceholderUrl, siteConfig, siteUrl } from '@/lib/site-config'
import { defaultLocale, localePath, locales, type Locale } from '@/lib/i18n'

/**
 * Index only the real production deployment on the real domain:
 *  - Vercel: VERCEL_ENV === 'production' (previews are always noindex)
 *  - Other hosts: must opt in explicitly with SITE_INDEXABLE=true
 * and in both cases NEXT_PUBLIC_SITE_URL must not be a placeholder.
 */
export const isIndexable =
  !isPlaceholderUrl(process.env.NEXT_PUBLIC_SITE_URL) &&
  (process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.SITE_INDEXABLE === 'true')

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path === '/' ? '' : path}` || siteUrl
}

interface PageMetaInput {
  locale: Locale
  /** Locale-agnostic path, e.g. '/packages'. */
  path: string
  title: string
  description: string
  /** Key of the generated OG image, see app/og/[locale]/[key]/route.tsx */
  ogKey: string
  /** Use the title as-is instead of applying the "· Everpine Events" template. */
  absoluteTitle?: boolean
  noindex?: boolean
  type?: 'website' | 'article'
}

export function pageMetadata(input: PageMetaInput): Metadata {
  const { locale, path, title, description, ogKey } = input
  const url = absoluteUrl(localePath(locale, path))
  const ogImage = `${siteUrl}/og/${locale}/${ogKey}`
  const languages: Record<string, string> = {}
  for (const l of locales) languages[l] = absoluteUrl(localePath(l, path))
  languages['x-default'] = absoluteUrl(localePath(defaultLocale, path))

  return {
    title: input.absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: input.type ?? 'website',
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: locale === 'en' ? 'en_AE' : 'ar_AE',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: input.noindex || !isIndexable ? { index: false, follow: true } : { index: true, follow: true },
  }
}
