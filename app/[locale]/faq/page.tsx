import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { breadcrumbNode, faqNode, graph } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { PageHero } from '@/components/PageHero'
import { Faqs } from '@/components/Faqs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/faq', title: pages.faqPage.meta.title, description: pages.faqPage.meta.description, ogKey: 'faq' })
}

export default async function FaqPage({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const f = pages.faqPage
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.faq, path: '/faq' },
  ]
  const all = f.groups.flatMap((g) => g.faqs)
  const url = absoluteUrl(localePath(locale, '/faq'))

  return (
    <>
      <PageHero
        accent="questions"
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={f.eyebrow}
        h1={f.h1}
        intro={f.intro}
        image="red-bauble-tree-candle-lights-entrance-garland"
        ctas={<ContactButtons dict={dict} locale={locale} placement="faq_hero" compact />}
      />
      <nav aria-label={dict.ui.faqSections} className="container" style={{ marginTop: 'var(--s-6)' }}>
        <ul role="list" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-2) var(--s-5)' }}>
          {f.groups.map((g) => (
            <li key={g.id}>
              <a href={`#${g.id}`} className="link-arrow">
                {g.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {f.groups.map((g, i) => (
        <section key={g.id} id={g.id} className={`section ${i % 2 ? 'theme-sand' : ''}`} aria-labelledby={`${g.id}-heading`}>
          <div className="container">
            <Faqs faqs={g.faqs} locale={locale} heading={g.heading} id={g.id} />
          </div>
        </section>
      ))}
      <CtaBand dict={dict} locale={locale} placement="faq_closing" heading={dict.ui.faqCtaHeading} />
      <JsonLd data={graph(faqNode(all, url), breadcrumbNode(locale, trail))} />
    </>
  )
}
