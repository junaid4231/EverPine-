import type { Metadata } from 'next'
import styles from '@/components/Gallery.module.css'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { breadcrumbNode, graph } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { images as registry, type ImageId } from '@/lib/images'
import { PageHero } from '@/components/PageHero'
import { Img } from '@/components/Img'
import { GalleryFilter } from '@/components/GalleryFilter'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'
import type { GalleryPalette, GalleryType } from '@/content/types'

type Props = { params: Promise<{ locale: string }> }

/** Curated order: strongest, most varied images first. */
const ORDER: ImageId[] = [
  'villa-balcony-red-bow-warm-string-lights-dusk',
  'staircase-frosted-garland-red-gold-baubles-candles',
  'onyx-counter-garland-runner-reindeer-figurines',
  'emerald-gold-bauble-arch-sunburst-door',
  'black-door-arch-red-white-gold-baubles-lit-reindeer-night',
  'frosted-tree-poinsettias-gift-boxes-pool-view',
  'flocked-lit-garland-arch-wood-door-frosted-wreath',
  'table-runner-poinsettia-pinecones-marble-table',
  'bronze-copper-bauble-wall-illuminated-arch',
  'villa-facade-icicle-lights-reindeer-dusk',
  'double-door-arch-red-bows-twin-wreaths-oversized-baubles',
  'olive-tree-planter-baubles-nutcracker-reindeer',
  'tall-bronze-champagne-tree-lounge-window',
  'modern-entrance-silver-gold-door-arch-night',
  'red-gold-tree-poinsettias-faux-fur-skirt-living-room',
  'evergreen-door-arch-red-gold-baubles-wreath-white-door',
  'console-garland-silver-reindeer-oval-mirror',
  'red-bauble-arch-shopfront-evening',
  'green-gold-tree-velvet-bow-neutral-living-room',
  'lit-garland-arch-wood-door-cone-lights-evening',
  'arched-entrance-evergreen-garland-large-red-bow',
  'gold-lit-tree-red-bauble-base-atrium',
  'peppermint-candy-door-arch-wrought-iron-doors',
  'silver-gold-frosted-arch-carved-white-door',
  'media-wall-garland-poinsettias-stockings',
  'red-bauble-tree-candle-lights-entrance-garland',
  'spiral-red-peppermint-garland-tree-greenery',
  'greenery-garland-glass-entrance-wreath',
  'spiral-red-bauble-garland-tree-plants-interior',
  'stylist-placing-red-baubles-on-tree',
  'peppermint-tree-installation-protective-sheeting',
  'dining-centrepiece-installation-in-progress',
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/gallery', title: pages.galleryPage.meta.title, description: pages.galleryPage.meta.description, ogKey: 'gallery' })
}

export default async function Gallery({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const g = pages.galleryPage
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.gallery, path: '/gallery' },
  ]
  const ids = ORDER.filter((id) => !dict.images[id].galleryHidden)
  const usedTypes = new Set(ids.flatMap((id) => dict.images[id].types))
  const usedPalettes = new Set(ids.map((id) => dict.images[id].palette))
  const types = (Object.keys(dict.gallery.typeLabels) as GalleryType[]).filter((t) => usedTypes.has(t)).map((id) => ({ id, label: dict.gallery.typeLabels[id] }))
  const palettes = (Object.keys(dict.gallery.paletteLabels) as GalleryPalette[]).filter((p) => usedPalettes.has(p)).map((id) => ({ id, label: dict.gallery.paletteLabels[id] }))
  const showing = Array.from({ length: ids.length + 1 }, (_, n) => dict.gallery.showing(n))
  const url = absoluteUrl(localePath(locale, '/gallery'))

  return (
    <>
      <PageHero
        accent="gallery"
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={g.eyebrow}
        h1={g.h1}
        intro={g.intro}
        image="double-door-arch-red-bows-twin-wreaths-oversized-baubles"
        ctas={<ContactButtons dict={dict} locale={locale} placement="gallery_hero" compact />}
      />
      <section className="section" style={{ paddingTop: 'var(--s-7)' }}>
        <div className="container">
          <GalleryFilter types={types} palettes={palettes} total={ids.length} labels={{ all: dict.gallery.all, type: dict.ui.galleryType, palette: dict.ui.galleryPalette, showing }}>
            <ul className={styles.grid} role="list">
              {ids.map((id, i) => (
                <li key={id} className={styles.item} data-types={dict.images[id].types.join(' ')} data-palette={dict.images[id].palette}>
                  <figure style={{ margin: 0, height: '100%' }}>
                    <div className={styles.frame}>
                      <Img id={id} dict={dict} fill sizes={i % 5 === 0 ? '(min-width: 64rem) 50vw, (min-width: 48rem) 66vw, 100vw' : '(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw'} quality={i % 5 === 0 ? 75 : 60} />
                    </div>
                    <figcaption className="plate">
                      <b>{String(i + 1).padStart(2, '0')}</b>
                      <span>{dict.images[id].caption}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </GalleryFilter>
        </div>
      </section>
      <CtaBand dict={dict} locale={locale} placement="gallery_closing" heading={dict.ui.galleryCtaHeading} />
      <JsonLd
        data={graph(breadcrumbNode(locale, trail), {
          '@type': 'ImageGallery',
          '@id': `${url}#gallery`,
          name: g.h1,
          url,
          image: ids.slice(0, 12).map((id) => ({
            '@type': 'ImageObject',
            contentUrl: absoluteUrl(registry[id].src),
            caption: dict.images[id].caption,
            description: dict.images[id].alt,
          })),
        })}
      />
    </>
  )
}
