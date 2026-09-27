import Link from 'next/link'
import type { Metadata } from 'next'
import { getContent } from '@/content'
import { defaultLocale, localePath } from '@/lib/i18n'
import { Img } from '@/components/Img'

const { pages, dictionary: dict } = getContent(defaultLocale)

export const metadata: Metadata = {
  title: pages.notFound.title,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  const nf = pages.notFound
  return (
    <section className="section-lg">
      <div className="container" style={{ display: 'grid', gap: 'var(--s-7)', alignItems: 'end', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))' }}>
        <div>
          <p className="eyebrow">404</p>
          <h1 className="h1" style={{ marginTop: 'var(--s-4)', maxWidth: '14ch' }}>
            {nf.h1}
          </h1>
          <p className="lede" style={{ marginTop: 'var(--s-5)' }}>
            {nf.body}
          </p>
          <ul role="list" style={{ marginTop: 'var(--s-5)', display: 'flex', flexWrap: 'wrap', gap: 'var(--s-3) var(--s-5)' }}>
            {nf.links.map((l) => (
              <li key={l.href}>
                <Link href={localePath(defaultLocale, l.href)} className="link-arrow">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ position: 'relative', aspectRatio: '4 / 5', maxWidth: '26rem', overflow: 'hidden', justifySelf: 'end', width: '100%' }}>
          <Img id="red-gold-tree-poinsettias-faux-fur-skirt-living-room" dict={dict} fill sizes="(min-width: 48rem) 26rem, 100vw" />
        </div>
      </div>
    </section>
  )
}
