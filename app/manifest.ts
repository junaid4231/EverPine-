import type { MetadataRoute } from 'next'
import { getContent } from '@/content'
import { siteConfig } from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  const { dictionary } = getContent('en')
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: dictionary.site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f2ebdf',
    theme_color: '#121821',
    lang: 'en-AE',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
