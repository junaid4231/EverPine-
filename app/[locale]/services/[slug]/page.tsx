import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import { localePath, locales } from '@/lib/i18n'
import { getContent } from '@/content'
import { PageHero } from '@/components/PageHero'
import { ProseRows } from '@/components/Prose'
import { Included } from '@/components/Included'
import { Faqs } from '@/components/Faqs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'
import { Rich } from '@/components/Rich'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => getContent(locale).dictionary.servicePages.map((s) => ({ locale, slug: s.slug })))
}
export const dynamicParams = false

async function resolve(params: Props['params']) {
  const { slug } = await params
  const ctx = await load(params)
  const page = ctx.dictionary.servicePages.find((s) => s.slug === slug)
  if (!page) notFound()
  return { ...ctx, page }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await resolve(params)
  return pageMetadata({ locale, path: `/services/${page.slug}`, title: page.meta.title, description: page.meta.description, ogKey: page.slug })
}

export default async function ServicePage({ params }: Props) {
  const { locale, dictionary: dict, page } = await resolve(params)
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.services, path: '/services' },
    { name: page.name, path: `/services/${page.slug}` },
  ]
  const url = absoluteUrl(localePath(locale, `/services/${page.slug}`))
  const message = dict.whatsappMessages.service(page.whatsappService)

  return (
    <>
      <PageHero
        accent={page.accent}
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={page.eyebrow}
        h1={page.h1}
        intro={page.intro}
        image={page.hero}
        ctas={<ContactButtons dict={dict} locale={locale} placement={`service_${page.slug}`} message={message} compact />}
      />

      <section className="section">
        <div className="container">
          <ProseRows sections={page.sections} images={page.plates} dict={dict} locale={locale} />
        </div>
      </section>

      <Included dict={dict} locale={locale} packages={page.inPackages} note={page.packageNote} />

      <section className="section" aria-labelledby={`${page.slug}-faq-heading`}>
        <div className="container">
          <Faqs faqs={page.faqs} locale={locale} heading={dict.ui.questions} eyebrow={dict.ui.faq} id={`${page.slug}-faq`} />
        </div>
      </section>

      <nav className="section theme-sand" aria-label={dict.ui.related} style={{ paddingBlock: 'var(--s-7)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s-4) var(--s-6)', alignItems: 'baseline' }}>
          <p className="eyebrow">{dict.ui.related}</p>
          {page.related.map((r) => (
            <Link key={r.href} href={localePath(locale, r.href.split('#')[0]!) + (r.href.includes('#') ? `#${r.href.split('#')[1]}` : '')} className="link-arrow">
              {r.label}
            </Link>
          ))}
          <span className="small muted">
            <Rich text={dict.ui.alsoIn} locale={locale} />
          </span>
        </div>
      </nav>

      <CtaBand dict={dict} locale={locale} placement={`service_${page.slug}_closing`} message={message} />

      <JsonLd
        data={graph(
          serviceNode({ name: page.name, description: page.meta.description, url, image: absoluteUrl(`/og/${locale}/${page.slug}`) }),
          faqNode(page.faqs, url),
          breadcrumbNode(locale, trail),
        )}
      />
    </>
  )
}
