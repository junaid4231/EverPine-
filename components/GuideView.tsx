import type { ReactNode } from 'react'
import { absoluteUrl } from '@/lib/seo'
import { articleNode, breadcrumbNode, faqNode, graph } from '@/lib/schema'
import { localePath, type Locale } from '@/lib/i18n'
import { PageHero } from '@/components/PageHero'
import { ProseRows } from '@/components/Prose'
import { Faqs } from '@/components/Faqs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import type { Dictionary, Faq, GuideStep } from '@/content/types'
import type { ImageId } from '@/lib/images'

interface Props {
  dict: Dictionary
  locale: Locale
  slug: string
  eyebrow: string
  h1: string
  intro: string
  image: ImageId
  steps: GuideStep[]
  faqs: Faq[]
  description: string
  before?: ReactNode
  published: string
  accent?: string
  modified: string
}

export function GuideView({ dict, locale, slug, eyebrow, h1, intro, image, steps, faqs, description, before, published, modified, accent }: Props) {
  const path = `/guides/${slug}`
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: h1, path },
  ]
  const url = absoluteUrl(localePath(locale, path))
  return (
    <>
      <PageHero accent={accent} dict={dict} locale={locale} trail={trail} eyebrow={eyebrow} h1={h1} intro={intro} image={image} note={dict.ui.updated(new Date(modified).toLocaleDateString(locale === 'en' ? 'en-GB' : locale, { day: 'numeric', month: 'long', year: 'numeric' }))} />
      {before}
      <section className="section">
        <div className="container">
          <ProseRows sections={steps} dict={dict} locale={locale} />
        </div>
      </section>
      <section className="section theme-sand" aria-labelledby={`${slug}-faq-heading`}>
        <div className="container">
          <Faqs faqs={faqs} locale={locale} heading={dict.ui.quickAnswers} eyebrow={dict.ui.faq} id={`${slug}-faq`} />
        </div>
      </section>
      <CtaBand dict={dict} locale={locale} placement={`guide_${slug}`} />
      <JsonLd
        data={graph(
          articleNode({ headline: h1, description, url, image: absoluteUrl(`/og/${locale}/${slug}`), datePublished: published, dateModified: modified }),
          faqNode(faqs, url),
          breadcrumbNode(locale, trail),
        )}
      />
    </>
  )
}
