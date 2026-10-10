import Link from 'next/link'
import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { breadcrumbNode, graph, packagesServiceNode } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { PageHero } from '@/components/PageHero'
import { Collection } from '@/components/Collection'
import { Compare } from '@/components/Compare'
import { Faqs } from '@/components/Faqs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'
import b from '@/components/Beyond.module.css'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/packages', title: pages.packagesPage.meta.title, description: pages.packagesPage.meta.description, ogKey: 'packages' })
}

export default async function PackagesPage({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const pg = pages.packagesPage
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.packages, path: '/packages' },
  ]
  const url = absoluteUrl(localePath(locale, '/packages'))

  return (
    <>
      <PageHero
        accent="packages"
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={pg.eyebrow}
        h1={pg.h1}
        intro={pg.intro}
        image="red-gold-tree-velvet-ribbons-gold-collar-villa"
        ctas={<ContactButtons dict={dict} locale={locale} placement="packages_hero" compact />}
      />

      <div style={{ marginTop: 'var(--s-7)' }}>
        <Collection dict={dict} locale={locale} variant="page" />
      </div>

      <section className="section" aria-labelledby="compare-heading">
        <div className="container" style={{ display: 'grid', gap: 'var(--s-6)', maxWidth: '60rem' }}>
          <h2 id="compare-heading" className="h2">
            {pg.compare.heading}
          </h2>
          <Compare dict={dict} locale={locale} caption={`${pg.compare.caption}. ${dict.packages.priceNote}`} />
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="beyond-heading">
        <div className="container">
          <h2 id="beyond-heading" className="h2" style={{ marginBottom: 'var(--s-6)' }}>
            {pg.beyond.heading}
          </h2>
          <ul className={b.list} role="list">
            {pg.beyond.items.map((it) => (
              <li key={it.title} className={b.item}>
                <Link href={localePath(locale, it.href)} className={b.link}>
                  <span className={b.title}>{it.title}</span>
                  <span className={b.body}>{it.body}</span>
                  <span className="link-arrow" aria-hidden="true" style={{ justifySelf: 'end', border: 0 }} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="pricing-faq-heading">
        <div className="container">
          <Faqs faqs={pages.faqs.pricing} locale={locale} heading={pg.faqHeading} eyebrow="FAQ" id="pricing-faq" />
        </div>
      </section>

      <CtaBand dict={dict} locale={locale} placement="packages_closing" />

      {/* Pricing FAQs are marked up once, on /faq. */}
      <JsonLd data={graph(packagesServiceNode(dict, locale, url), breadcrumbNode(locale, trail))} />
    </>
  )
}
