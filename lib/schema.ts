import type {
  BreadcrumbList,
  FAQPage,
  Graph,
  LocalBusiness,
  Offer,
  Service,
  Thing,
  WebSite,
  Article,
  ItemList,
} from 'schema-dts'
import { formatHeight, getPackage, siteConfig, siteUrl } from '@/lib/site-config'
import { localePath, type Locale } from '@/lib/i18n'
import type { Dictionary, Faq } from '@/content/types'
import { absoluteUrl } from '@/lib/seo'
import { images } from '@/lib/images'

export const BUSINESS_ID = `${siteUrl}/#business`
export const WEBSITE_ID = `${siteUrl}/#website`

const areaNodes = {
  dubai: { '@type': 'City', name: 'Dubai', sameAs: 'https://en.wikipedia.org/wiki/Dubai' },
  sharjah: { '@type': 'City', name: 'Sharjah', sameAs: 'https://en.wikipedia.org/wiki/Sharjah_(city)' },
} as const

/** Strip the inline [link](url) / **bold** markup used in content strings. */
export function plain(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1')
}

export function graph(...nodes: Thing[]): Graph {
  return { '@context': 'https://schema.org', '@graph': nodes as Graph['@graph'] }
}

/** Service-area business: deliberately no address. */
export function businessNode(dict: Dictionary): LocalBusiness {
  const prices = siteConfig.packages.map((p) => p.priceAED)
  const node: LocalBusiness = {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: siteConfig.name,
    url: siteUrl,
    description: dict.site.description,
    logo: `${siteUrl}/brand/everpine-logo.png`,
    image: absoluteUrl(images['villa-balcony-red-bow-warm-string-lights-dusk'].src),
    areaServed: siteConfig.areas.map((a) => areaNodes[a]),
    priceRange: `AED ${Math.min(...prices).toLocaleString('en')}–${Math.max(...prices).toLocaleString('en')}`,
    currenciesAccepted: 'AED',
    knowsLanguage: ['en'],
  }
  if (siteConfig.legalName) node.legalName = siteConfig.legalName
  if (siteConfig.phone) node.telephone = siteConfig.phone
  if (siteConfig.publicEmail) node.email = siteConfig.publicEmail
  if (siteConfig.socials.length) node.sameAs = siteConfig.socials.map((s) => s.url)
  return node
}

export function websiteNode(locale: Locale): WebSite {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: siteConfig.name,
    inLanguage: locale,
    publisher: { '@id': BUSINESS_ID },
  }
}

export function packageOffers(dict: Dictionary, locale: Locale): Offer[] {
  return siteConfig.packages.map((p) => {
    const copy = dict.packages.items[p.id]
    const includes = p.includes.map((i) => dict.packages.includeLabels[i].toLowerCase()).join(', ')
    return {
      '@type': 'Offer',
      name: `${copy.name} package`,
      price: p.priceAED,
      priceCurrency: 'AED',
      url: absoluteUrl(localePath(locale, `/packages#${p.id}`)),
      availability: 'https://schema.org/InStock',
      areaServed: siteConfig.areas.map((a) => areaNodes[a]),
      seller: { '@id': BUSINESS_ID },
      itemOffered: {
        '@type': 'Service',
        name: `${copy.name} Christmas decoration package`,
        description: `${formatHeight(getPackage(p.id).treeHeightM)} tree; includes ${includes}. Delivery, installation and styling included.`,
        provider: { '@id': BUSINESS_ID },
        areaServed: siteConfig.areas.map((a) => areaNodes[a]),
      },
    }
  })
}

export function packagesServiceNode(dict: Dictionary, locale: Locale, pageUrl: string): Service {
  return {
    '@type': 'Service',
    '@id': `${pageUrl.replace(/\/$/, '')}/#packages`,
    name: 'Christmas decoration packages',
    serviceType: 'Christmas decoration installation',
    provider: { '@id': BUSINESS_ID },
    areaServed: siteConfig.areas.map((a) => areaNodes[a]),
    offers: packageOffers(dict, locale),
  }
}

export function serviceNode(opts: {
  name: string
  description: string
  url: string
  serviceType?: string
  areas?: ('dubai' | 'sharjah')[]
  image?: string
}): Service {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: opts.url,
    provider: { '@id': BUSINESS_ID },
    areaServed: (opts.areas ?? siteConfig.areas).map((a) => areaNodes[a]),
    ...(opts.image ? { image: opts.image } : {}),
  }
}

export function faqNode(faqs: Faq[], pageUrl: string): FAQPage {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  }
}

export function breadcrumbNode(locale: Locale, trail: { name: string; path: string }[]): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: absoluteUrl(localePath(locale, t.path)),
    })),
  }
}

export function articleNode(opts: { headline: string; description: string; url: string; image: string; datePublished: string; dateModified: string }): Article {
  return {
    '@type': 'Article',
    '@id': `${opts.url}#article`,
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    image: opts.image,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@id': BUSINESS_ID },
    publisher: { '@id': BUSINESS_ID },
    mainEntityOfPage: opts.url,
  }
}

export function itemListNode(name: string, items: { name: string; url: string }[]): ItemList {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: it.url })),
  }
}
