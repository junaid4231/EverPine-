import type { Locale } from '@/lib/i18n'
import * as en from './en'

/**
 * Register each locale's content here. Arabic: create content/ar with the
 * same exports (typed against these), then add `ar` below and in lib/i18n.
 */
const content = { en } satisfies Record<Locale, typeof en>

export function getContent(locale: Locale) {
  return content[locale]
}

export type Pages = typeof en.pages
