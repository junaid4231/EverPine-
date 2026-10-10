import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

/**
 * Content-Security-Policy. Next.js inlines small bootstrap scripts, so
 * 'unsafe-inline' is required for script-src unless every page is rendered
 * dynamically with nonces — which would give up static generation.
 * Third-party origins are limited to Google Analytics (only loaded after
 * consent, and only when NEXT_PUBLIC_GA_ID is set) and Vercel Analytics.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} https://www.googletagmanager.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // WebP only: AVIF encodes are slow on a cold optimiser cache and hurt first-visit LCP.
    formats: ['image/webp'],
    qualities: [50, 60, 75, 85, 90],
    deviceSizes: [390, 640, 750, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/og/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
}

export default nextConfig
