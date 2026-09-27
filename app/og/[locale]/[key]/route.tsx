import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { isLocale, locales } from '@/lib/i18n'
import { ogPages } from '@/lib/og-pages'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) => Object.keys(ogPages(locale)).map((key) => ({ locale, key })))
}

const root = process.cwd()
const font = (f: string) => readFile(path.join(root, 'app/fonts', f))

/** Build-time 1200×630 social image: photograph on the right, title set in the brand serif on dusk ink. */
export async function GET(_req: Request, ctx: { params: Promise<{ locale: string; key: string }> }) {
  const { locale, key } = await ctx.params
  if (!isLocale(locale)) return new Response('Not found', { status: 404 })
  const page = ogPages(locale)[key]
  if (!page) return new Response('Not found', { status: 404 })

  // Read the source photograph (static imports resolve to hashed /_next URLs at runtime).
  const file = path.join(root, 'assets/images', `${page.image}.jpg`)
  const photo = await sharp(await readFile(file)).resize(520, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82 }).toBuffer()
  const photoUri = `data:image/jpeg;base64,${photo.toString('base64')}`
  const logo = await readFile(path.join(root, 'public/brand/everpine-logo-horizontal-light.svg'))
  const logoUri = `data:image/svg+xml;base64,${logo.toString('base64')}`
  const [serif, sans] = await Promise.all([font('cormorant-garamond-latin-300-normal.woff'), font('hanken-grotesk-latin-500-normal.woff')])

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#121821', color: '#f2ebdf' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 56px 56px 64px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUri} width={280} height={60} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'Serif', fontSize: page.title.length > 44 ? 58 : 70, lineHeight: 1.02, letterSpacing: -1 }}>{page.title}</div>
            <div style={{ marginTop: 28, height: 1, width: 120, background: '#c8a15a' }} />
            <div style={{ marginTop: 22, fontFamily: 'Sans', fontSize: 24, color: '#e2c68f' }}>{page.kicker}</div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoUri} width={520} height={630} alt="" style={{ objectFit: 'cover' }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Serif', data: serif, weight: 400, style: 'normal' },
        { name: 'Sans', data: sans, weight: 500, style: 'normal' },
      ],
    },
  )
}
