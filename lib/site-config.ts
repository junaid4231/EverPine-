/**
 * Everpine Events — single source of business truth.
 *
 * Everything the client may need to change lives here: contact details,
 * prices, package contents, season state and service areas.
 * Items marked `TODO: confirm with client` are working assumptions.
 *
 * Copy (wording) lives in /content/<locale>. This file holds facts only,
 * so it is shared by every language.
 */

export type SeasonMode = 'booking' | 'in-season' | 'off-season'
export type PackageId = 'basic' | 'silver' | 'gold'
export type AreaId = 'dubai' | 'sharjah'

export type PackageInclude =
  | 'tree'
  | 'treeSkirt'
  | 'giftBoxes'
  | 'doorArch'
  | 'wreath'
  | 'stairDecoration'
  | 'tableDecoration'
  | 'figurines'
  | 'houseLighting'

export interface PackageFacts {
  id: PackageId
  priceAED: number
  /** Tree height in metres: [min, max]. Equal values = single height. */
  treeHeightM: [number, number]
  includes: PackageInclude[]
}

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

/** True for hosts that must never appear in production canonicals. */
export function isPlaceholderUrl(url: string | undefined): boolean {
  if (!url) return true
  try {
    const host = new URL(url).hostname
    return host === 'localhost' || /\.(example|test|invalid|localhost)$/.test(host) || host.endsWith('.vercel.app') || !host.includes('.')
  } catch {
    return true
  }
}

// Until the real domain is set, the site still deploys (e.g. on its *.vercel.app address) but stays
// noindex — see isIndexable in lib/seo.ts — so no placeholder canonicals ever reach Google.
// Only an explicit SITE_INDEXABLE=true with a placeholder URL is treated as a hard error.
if (process.env.SITE_INDEXABLE === 'true' && isPlaceholderUrl(rawSiteUrl)) {
  throw new Error(`SITE_INDEXABLE=true requires NEXT_PUBLIC_SITE_URL to be the real production domain (got "${rawSiteUrl ?? ''}").`)
}
if (process.env.VERCEL_ENV === 'production' && isPlaceholderUrl(rawSiteUrl)) {
  console.warn('[everpine] NEXT_PUBLIC_SITE_URL is not a real domain yet — deploying with noindex. Set it to go live for search.')
}

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined
export const siteUrl = rawSiteUrl || vercelUrl || 'http://localhost:3000'

/** Public email is derived from the production domain: info@<domain>. */
function derivePublicEmail(url: string): string | null {
  if (isPlaceholderUrl(url)) return null
  const host = new URL(url).hostname.replace(/^www\./, '')
  return `info@${host}` // TODO: confirm the info@ mailbox exists before launch
}

export const siteConfig = {
  name: 'Everpine Events',
  shortName: 'Everpine',
  /** Legal / trade-licence name for schema and privacy policy. */
  legalName: null as string | null, // TODO: confirm with client

  url: siteUrl,

  /**
   * Phone in E.164 format, e.g. '+971501234567'.
   * While null, every call / WhatsApp control on the site stays hidden and
   * the "Get a quote" form becomes the primary action.
   */
  phone: null as string | null, // TODO: confirm with client
  /** WhatsApp number in E.164. Defaults to the phone number when null. */
  whatsapp: null as string | null, // TODO: confirm with client

  /** info@<domain>. Hidden until NEXT_PUBLIC_SITE_URL is the real domain. */
  publicEmail: derivePublicEmail(siteUrl),

  /** Social profile URLs for footer + schema sameAs. */
  socials: [] as { label: string; url: string }[], // TODO: confirm with client

  areas: ['dubai', 'sharjah'] as AreaId[],

  currency: 'AED',

  /**
   * Season state.
   *  - 'booking'    : autumn, taking bookings for the coming Christmas
   *  - 'in-season'  : December — installations underway
   *  - 'off-season' : January–summer — "now booking for next season"
   */
  season: {
    /**
     * 'auto' derives the mode from the build date (Aug–Nov booking, 1–25 Dec in-season,
     * otherwise off-season). Set a fixed mode to override.
     */
    mode: 'auto' as SeasonMode | 'auto',
    /** The Christmas the site is currently selling. Auto-computed if null. */
    year: null as number | null,
  },

  packages: [
    {
      id: 'basic',
      priceAED: 5500,
      treeHeightM: [2.4, 2.4],
      includes: ['tree', 'treeSkirt', 'doorArch', 'wreath'],
    },
    {
      id: 'silver',
      priceAED: 14800,
      treeHeightM: [2.7, 2.7],
      includes: ['tree', 'treeSkirt', 'giftBoxes', 'doorArch', 'wreath', 'stairDecoration'],
    },
    {
      id: 'gold',
      priceAED: 24700,
      treeHeightM: [3, 3.6],
      includes: [
        'tree',
        'treeSkirt',
        'giftBoxes',
        'doorArch',
        'wreath',
        'stairDecoration',
        'tableDecoration',
        'figurines',
        'houseLighting', // Confirmed by client Sept 2026. TODO: confirm extent (façade / garden / both)
      ],
    },
  ] satisfies PackageFacts[],

  /** Trees: sold by default; seasonal rental available on request (client, Sept 2026). */
  treeRentalAvailable: true,
  /** Tree type (artificial / real) is deliberately not stated. */
  treeType: null as string | null, // TODO: confirm with client
} as const

/** Date the site copy was last reviewed — used as sitemap lastmod. Update when content changes. */
export const contentUpdated = '2026-09-26'

export function seasonMode(now = new Date()): SeasonMode {
  const m = siteConfig.season.mode
  if (m !== 'auto') return m
  const month = now.getMonth()
  if (month === 11 && now.getDate() <= 25) return 'in-season'
  if (month >= 7 && month <= 10) return 'booking'
  return 'off-season'
}

export function seasonYear(now = new Date()): number {
  if (siteConfig.season.year) return siteConfig.season.year
  // The season being sold is this year's Christmas — unless we are already past it
  // (26–31 December), in which case the next one.
  const y = now.getFullYear()
  return now.getMonth() === 11 && now.getDate() > 25 ? y + 1 : y
}

export const whatsappNumber = siteConfig.whatsapp ?? siteConfig.phone
export const hasPhone = Boolean(siteConfig.phone)
export const hasWhatsApp = Boolean(whatsappNumber)

export function getPackage(id: PackageId): PackageFacts {
  const p = siteConfig.packages.find((x) => x.id === id)
  if (!p) throw new Error(`Unknown package ${id}`)
  return p
}

export function formatAED(value: number, locale = 'en'): string {
  return `AED ${new Intl.NumberFormat(locale === 'ar' ? 'ar-AE' : 'en-AE').format(value)}`
}

export function formatHeight(h: [number, number]): string {
  const f = (n: number) => (Number.isInteger(n) ? n.toFixed(0) : n.toFixed(1))
  return h[0] === h[1] ? `${f(h[0])} m` : `${f(h[0])}–${f(h[1])} m`
}

export function whatsappHref(message: string): string | null {
  if (!whatsappNumber) return null
  const digits = whatsappNumber.replace(/[^\d]/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function telHref(): string | null {
  return siteConfig.phone ? `tel:${siteConfig.phone.replace(/\s/g, '')}` : null
}

export function formatPhone(e164: string): string {
  // +971 50 123 4567
  const d = e164.replace(/[^\d]/g, '')
  if (d.startsWith('971') && d.length === 12) {
    return `+971 ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8)}`
  }
  return e164
}
