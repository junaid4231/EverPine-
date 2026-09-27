import type { ImageId } from '@/lib/images'
import type { Locale } from '@/lib/i18n'
import { getContent } from '@/content'

export interface OgPage {
  title: string
  kicker: string
  image: ImageId
}

/** One entry per indexable page — drives /og/[locale]/[key]. */
export function ogPages(locale: Locale): Record<string, OgPage> {
  const { dictionary: d, pages: p } = getContent(locale)
  const out: Record<string, OgPage> = {
    home: { title: 'Christmas décor, installed for you', kicker: 'Dubai & Sharjah', image: 'red-gold-tree-poinsettias-faux-fur-skirt-living-room' },
    packages: { title: 'Christmas decoration packages', kicker: 'From AED 5,500 · delivery, installation & styling included', image: 'frosted-tree-poinsettias-gift-boxes-pool-view' },
    services: { title: p.servicesHub.h1, kicker: 'Dubai & Sharjah', image: 'emerald-gold-bauble-arch-sunburst-door' },
    commercial: { title: 'Christmas décor for businesses', kicker: 'Offices · hotels · restaurants · retail', image: p.commercial.hero },
    dubai: { title: p.cities.dubai.h1, kicker: 'Villas · apartments · offices', image: p.cities.dubai.hero },
    sharjah: { title: p.cities.sharjah.h1, kicker: 'Villas · townhouses · apartments', image: p.cities.sharjah.hero },
    gallery: { title: p.galleryPage.h1, kicker: 'Trees · door arches · lighting', image: 'emerald-gold-bauble-arch-sunburst-door' },
    about: { title: 'Evergreen, by name and by nature', kicker: 'About Everpine Events', image: 'stylist-placing-red-baubles-on-tree' },
    faq: { title: 'Christmas decoration FAQ', kicker: 'Prices · trees · booking · removal', image: 'staircase-frosted-garland-red-gold-baubles-candles' },
    contact: { title: 'Let’s plan your Christmas', kicker: 'Get a quote · Dubai & Sharjah', image: p.contact.image },
    privacy: { title: 'Privacy policy', kicker: 'Everpine Events', image: 'onyx-counter-garland-runner-reindeer-figurines' },
    [p.guides.treeSize.slug]: { title: p.guides.treeSize.h1, kicker: 'Guide · with calculator', image: p.guides.treeSize.image },
    [p.guides.office.slug]: { title: p.guides.office.h1, kicker: 'Guide', image: p.guides.office.image },
  }
  for (const s of d.servicePages) out[s.slug] = { title: s.h1, kicker: 'Dubai & Sharjah', image: s.hero }
  return out
}
