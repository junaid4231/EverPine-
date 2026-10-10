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
    home: { title: 'Christmas decoration in Dubai, installed for you', kicker: 'Christmas decorators · Dubai & Sharjah', image: 'red-velvet-bow-tree-gold-baubles-gift-boxes' },
    packages: { title: 'Christmas decoration packages', kicker: 'From AED 5,500 · delivery, installation & styling included', image: 'package-gold' },
    services: { title: p.servicesHub.h1, kicker: 'Dubai & Sharjah', image: 'glass-entrance-garland-arch-red-bows-baubles' },
    commercial: { title: 'Office Christmas decorators in Dubai', kicker: 'Offices · hotels · restaurants · retail', image: p.commercial.hero },
    dubai: { title: p.cities.dubai.h1, kicker: 'Villas · apartments · offices', image: p.cities.dubai.hero },
    sharjah: { title: p.cities.sharjah.h1, kicker: 'Villas · townhouses · apartments', image: p.cities.sharjah.hero },
    villa: { title: p.landings.villa.h1, kicker: 'Tree · entrance · staircase · house lighting', image: p.landings.villa.hero },
    luxury: { title: p.landings.luxury.h1, kicker: 'Bespoke design · installed & styled', image: p.landings.luxury.hero },
    gallery: { title: p.galleryPage.h1, kicker: 'Trees · door arches · lighting', image: 'blue-silver-flocked-tree-fur-skirt-living-room' },
    about: { title: 'Evergreen, by name and by nature', kicker: 'About Everpine Events', image: 'dining-centrepiece-installation-in-progress' },
    faq: { title: 'Christmas decoration FAQ', kicker: 'Prices · trees · booking · removal', image: 'red-bauble-tree-candle-lights-entrance-garland' },
    contact: { title: 'Let’s plan your Christmas', kicker: 'Get a quote · Dubai & Sharjah', image: p.contact.image },
    privacy: { title: 'Privacy policy', kicker: 'Everpine Events', image: 'onyx-counter-garland-runner-reindeer-figurines' },
    [p.guides.treeSize.slug]: { title: p.guides.treeSize.h1, kicker: 'Guide · with calculator', image: p.guides.treeSize.image },
    [p.guides.office.slug]: { title: p.guides.office.h1, kicker: 'Guide', image: p.guides.office.image },
  }
  for (const s of d.servicePages) out[s.slug] = { title: s.h1, kicker: 'Dubai & Sharjah', image: s.hero }
  return out
}
