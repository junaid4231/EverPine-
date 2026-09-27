import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { getContent } from '@/content'

/** Validates the [locale] segment and returns the locale plus its content. */
export async function load(params: Promise<{ locale: string }>): Promise<{ locale: Locale } & ReturnType<typeof getContent>> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return { locale, ...getContent(locale) }
}
