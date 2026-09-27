/**
 * Locale setup. English ships at launch and is served without a prefix
 * ("/packages"). To add Arabic: add 'ar' to `locales`, create content/ar,
 * and register it in content/index.ts — routing, <html dir>, hreflang and
 * the sitemap pick it up automatically.
 */
export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

/** Locales written right-to-left. Typed as string[] so 'ar' can be added later. */
export const rtlLocales: readonly string[] = ['ar']

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function dir(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}

/** Public path for a locale. Default locale has no prefix. */
export function localePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '')
  return locale === defaultLocale ? clean || '/' : `/${locale}${clean}`
}
