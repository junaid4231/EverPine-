import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-config'
import { isIndexable } from '@/lib/seo'

/** Production: crawl everything. Previews / local: block all crawling. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
