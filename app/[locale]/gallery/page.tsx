import { getImageProps } from 'next/image'
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
import { Lightbox } from '@/components/Lightbox'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'
import type { GalleryPalette, GalleryType } from '@/content/types'

type Props = { params: Promise<{ locale: string }> }

/** Curated order: strongest, most varied images first. */
const ORDER: ImageId[] = [
  'red-velvet-bow-tree-gold-baubles-gift-boxes',
  'arched-villa-entrance-garland-giant-red-bow',
  'villa-balcony-red-bow-warm-string-lights-dusk',
  'tall-flocked-tree-burgundy-gold-baubles-lounge',
  'wood-door-garland-arch-red-white-baubles-wreath',
  'champagne-gold-tree-star-topper-office-window',
  'staircase-frosted-garland-red-gold-baubles-candles',
  'blue-silver-flocked-tree-fur-skirt-living-room',
  'lit-flocked-tree-red-baubles-terrace-night',
  'emerald-gold-bauble-arch-sunburst-door',
  'red-gold-tree-velvet-ribbons-gold-collar-villa',
  'onyx-counter-garland-runner-reindeer-figurines',
  'glass-entrance-garland-arch-red-bows-baubles',
  'gold-champagne-tree-star-picks-villa-lounge',
  'double-door-arch-red-bows-twin-wreaths-oversized-baubles',
  'red-gold-tree-poinsettias-faux-fur-skirt-living-room',
  'spiral-red-peppermint-garland-tree-greenery',
  'candy-cane-peppermint-tree-gingerbread-figures',
  'flocked-lit-garland-arch-wood-door-frosted-wreath',
  'classic-green-tree-red-silver-baubles-apartment',
  'villa-facade-icicle-lights-reindeer-dusk',
  'table-runner-poinsettia-pinecones-marble-table',
  'tall-bronze-champagne-tree-lounge-window',
  'evergreen-door-arch-red-gold-baubles-wreath-white-door',
  'red-bauble-tree-candle-lights-entrance-garland',
  'bronze-copper-bauble-wall-illuminated-arch',
  'olive-tree-planter-baubles-nutcracker-reindeer',
  'peppermint-candy-door-arch-wrought-iron-doors',
  'gold-lit-tree-red-bauble-base-atrium',
  'red-bauble-arch-shopfront-evening',
  'lit-garland-arch-wood-door-cone-lights-evening',
  'arched-entrance-evergreen-garland-large-red-bow',
  'green-gold-tree-velvet-bow-neutral-living-room',
  'media-wall-garland-poinsettias-stockings',
  'greenery-garland-glass-entrance-wreath',
  'spiral-red-bauble-garland-tree-plants-interior',
  'modern-entrance-silver-gold-door-arch-night',
  'stylist-placing-red-baubles-on-tree',
  'peppermint-tree-installation-protective-sheeting',
  'dining-centrepiece-installation-in-progress',
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/gallery', title: pages.galleryPage.meta.title, description: pages.galleryPage.meta.description, ogKey: 'gallery' })
}

/** Full-resolution source for the lightbox (browser picks the right size for the screen). */
function full(id: ImageId) {
  const { props } = getImageProps({ src: registry[id], alt: '', quality: 90, sizes: '100vw' })
  return { src: props.src, srcSet: props.srcSet ?? '' }
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
        image="blue-silver-flocked-tree-fur-skirt-living-room"
        ctas={<ContactButtons dict={dict} locale={locale} placement="gallery_hero" compact />}
      />
      <section className="section" style={{ paddingTop: 'var(--s-7)' }} id="gallery-grid">
        <div className="container">
          <GalleryFilter types={types} palettes={palettes} total={ids.length} labels={{ all: dict.gallery.all, type: dict.ui.galleryType, palette: dict.ui.galleryPalette, showing }}>
            <ul className={styles.grid} role="list">
              {ids.map((id, i) => (
                <li key={id} className={styles.item} data-types={dict.images[id].types.join(' ')} data-palette={dict.images[id].palette}>
                  <figure style={{ margin: 0, height: '100%' }}>
                    <a href={full(id).src} className={styles.frame} data-lightbox data-srcset={full(id).srcSet} data-alt={dict.images[id].alt} data-caption={dict.images[id].caption} aria-label={`${dict.ui.galleryOpen}: ${dict.images[id].caption}`}>
                      <Img id={id} dict={dict} fill sizes={i % 5 === 0 ? '(min-width: 64rem) 50vw, (min-width: 48rem) 66vw, 100vw' : '(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw'} quality={85} />
                      <span className={styles.zoom} aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 3.5v6m-3-3h6M15.5 15.5 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                      </span>
                    </a>
                    <figcaption className="plate">
                      <b>{String(i + 1).padStart(2, '0')}</b>
                      <span>{dict.images[id].caption}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </GalleryFilter>
          <Lightbox rootId="gallery-grid" labels={{ close: dict.ui.galleryClose, prev: dict.ui.galleryPrev, next: dict.ui.galleryNext, zoom: dict.ui.galleryZoom }} />
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
