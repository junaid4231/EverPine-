import type { MetadataRoute } from 'next'
import { getContent } from '@/content'
import { localePath, locales } from '@/lib/i18n'
import { absoluteUrl } from '@/lib/seo'
import { contentUpdated } from '@/lib/site-config'
import { images, type ImageId } from '@/lib/images'

/** Every indexable URL, with hreflang alternates ready for Arabic. */
export default function sitemap(): MetadataRoute.Sitemap {
  const { dictionary: d, pages: p } = getContent('en')
  const entries: { path: string; priority: number; freq: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/packages', priority: 0.95, freq: 'monthly' },
    { path: '/services', priority: 0.8, freq: 'monthly' },
    ...d.servicePages.map((s) => ({ path: `/services/${s.slug}`, priority: 0.85, freq: 'monthly' as const })),
    { path: '/commercial-christmas-decor', priority: 0.85, freq: 'monthly' },
    { path: '/christmas-decoration-dubai', priority: 0.9, freq: 'monthly' },
    { path: '/christmas-decoration-sharjah', priority: 0.9, freq: 'monthly' },
    { path: '/villa-christmas-decoration-dubai', priority: 0.9, freq: 'monthly' },
    { path: '/luxury-christmas-decoration-dubai', priority: 0.85, freq: 'monthly' },
    { path: '/gallery', priority: 0.7, freq: 'monthly' },
    { path: `/guides/${p.guides.treeSize.slug}`, priority: 0.7, freq: 'yearly' },
    { path: `/guides/${p.guides.office.slug}`, priority: 0.7, freq: 'yearly' },
    { path: '/about', priority: 0.5, freq: 'yearly' },
    { path: '/faq', priority: 0.6, freq: 'monthly' },
    { path: '/contact', priority: 0.7, freq: 'yearly' },
    { path: '/privacy-policy', priority: 0.2, freq: 'yearly' },
  ]
  const lastModified = new Date(contentUpdated)
  // Image sitemap for the gallery: every visible installation photo (helps Google Images for "christmas decoration ideas dubai").
  const galleryImages = (Object.keys(d.images) as ImageId[])
    .filter((id) => !d.images[id].galleryHidden && images[id])
    .map((id) => absoluteUrl(images[id].src))
  return locales.flatMap((locale) =>
    entries.map((e) => ({
      url: absoluteUrl(localePath(locale, e.path)),
      lastModified,
      changeFrequency: e.freq,
      priority: e.priority,
      ...(e.path === '/gallery' ? { images: galleryImages } : {}),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, e.path))])),
          'x-default': absoluteUrl(localePath('en', e.path)),
        },
      },
    })),
  )
}
