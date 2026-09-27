import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { pageMetadata } from '@/lib/seo'
import { breadcrumbNode, graph } from '@/lib/schema'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Rich } from '@/components/Rich'
import { JsonLd } from '@/components/JsonLd'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/privacy-policy', title: pages.privacy.meta.title, description: pages.privacy.meta.description, ogKey: 'privacy' })
}

/* LEGAL: draft written for the UAE PDPL context — must be reviewed by the client and a lawyer before launch. */
export default async function Privacy({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const p = pages.privacy
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: p.h1, path: '/privacy-policy' },
  ]
  return (
    <article className="section">
      <div className="container-narrow">
        <Breadcrumbs trail={trail} locale={locale} label={dict.nav.breadcrumb} />
        <h1 className="h1" style={{ marginTop: 'var(--s-5)' }}>
          {p.h1}
        </h1>
        <p className="muted small" style={{ marginTop: 'var(--s-3)' }}>
          {dict.ui.lastUpdated(p.updated)}
        </p>
        {!p.legalReviewed ? (
          <p className="small" style={{ marginTop: 'var(--s-4)', padding: 'var(--s-3) var(--s-4)', borderLeft: '2px solid var(--gold-deep)', background: 'var(--sand)', color: 'var(--ink)' }}>
            {p.reviewNotice}
          </p>
        ) : null}
        <div className="prose" style={{ marginTop: 'var(--s-6)' }}>
          {p.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.body.map((b) => (
                <p key={b.slice(0, 30)} style={{ marginTop: 'var(--s-3)' }}>
                  <Rich text={b} locale={locale} />
                </p>
              ))}
              {s.list ? (
                <ul style={{ marginTop: 'var(--s-3)' }}>
                  {s.list.map((li) => (
                    <li key={li.slice(0, 30)}>
                      <Rich text={li} locale={locale} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
      <JsonLd data={graph(breadcrumbNode(locale, trail))} />
    </article>
  )
}
