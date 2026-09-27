import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { pageMetadata } from '@/lib/seo'
import { GuideView } from '@/components/GuideView'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  const g = pages.guides.office
  return pageMetadata({ locale, path: `/guides/${g.slug}`, title: g.meta.title, description: g.meta.description, ogKey: g.slug, type: 'article' })
}

export default async function OfficeGuide({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const g = pages.guides.office
  return (
    <GuideView
      accent="office Christmas décor"
      dict={dict}
      locale={locale}
      slug={g.slug}
      eyebrow={g.eyebrow}
      h1={g.h1}
      intro={g.intro}
      image={g.image}
      steps={g.steps}
      faqs={g.faqs}
      description={g.meta.description}
      published="2026-09-26"
      modified="2026-09-26"
    />
  )
}
