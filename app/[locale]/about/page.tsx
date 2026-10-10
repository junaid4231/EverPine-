import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { BUSINESS_ID, breadcrumbNode, graph } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { PageHero } from '@/components/PageHero'
import { ProseRows } from '@/components/Prose'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/about', title: pages.about.meta.title, description: pages.about.meta.description, ogKey: 'about', absoluteTitle: true })
}

export default async function About({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const a = pages.about
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.about, path: '/about' },
  ]
  return (
    <>
      <PageHero
        accent="by nature"
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={a.eyebrow}
        h1={a.h1}
        intro={a.intro}
        image="gingerbread-tree-red-bow-candy-canes-hallway"
        ctas={<ContactButtons dict={dict} locale={locale} placement="about_hero" compact />}
      />
      <section className="section">
        <div className="container">
          <ProseRows sections={a.sections} images={a.images} dict={dict} locale={locale} />
        </div>
      </section>
      <CtaBand dict={dict} locale={locale} placement="about_closing" />
      <JsonLd
        data={graph(breadcrumbNode(locale, trail), {
          '@type': 'AboutPage',
          '@id': `${absoluteUrl(localePath(locale, '/about'))}#page`,
          url: absoluteUrl(localePath(locale, '/about')),
          name: a.meta.title,
          about: { '@id': BUSINESS_ID },
        })}
      />
    </>
  )
}
