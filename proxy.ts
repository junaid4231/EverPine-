import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/lib/i18n'

/**
 * Serves the default locale without a URL prefix.
 *   /packages      → internally rewritten to /en/packages
 *   /en/packages   → 308 redirect to /packages (one canonical URL)
 *   /ar/...        → passed through when 'ar' is enabled
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1] ?? ''

  if (first === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  if ((locales as readonly string[]).includes(first)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Next internals, API routes, metadata files and anything with a file extension.
  matcher: ['/((?!_next|api|og|favicon.ico|icon|apple-icon|manifest.webmanifest|robots.txt|sitemap.xml|.*\\..*).*)'],
}
