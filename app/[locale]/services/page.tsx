import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { breadcrumbNode, graph, itemListNode } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { PageHero } from '@/components/PageHero'
import { ServicesIndex } from '@/components/ServicesIndex'
import { ProseRows } from '@/components/Prose'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/services', title: pages.servicesHub.meta.title, description: pages.servicesHub.meta.description, ogKey: 'services' })
}

export default async function ServicesHub({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const h = pages.servicesHub
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.services, path: '/services' },
  ]
  return (
    <>
      <PageHero
        accent="services"
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={h.eyebrow}
        h1={h.h1}
        intro={h.intro}
        image="emerald-gold-bauble-arch-sunburst-door"
        ctas={<ContactButtons dict={dict} locale={locale} placement="services_hero" compact />}
      />
      <section className="section">
        <div className="container">
          <ServicesIndex dict={dict} locale={locale} />
        </div>
      </section>
      <section className="section theme-sand">
        <div className="container">
          <ProseRows sections={h.sections} dict={dict} locale={locale} />
        </div>
      </section>
      <CtaBand dict={dict} locale={locale} placement="services_closing" />
      <JsonLd
        data={graph(
          breadcrumbNode(locale, trail),
          itemListNode(
            h.h1,
            dict.servicePages.map((s) => ({ name: s.name, url: absoluteUrl(localePath(locale, `/services/${s.slug}`)) })),
          ),
        )}
      />
    </>
  )
}
