import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { pageMetadata } from '@/lib/seo'
import { localePath } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { GuideView } from '@/components/GuideView'
import { TreeCalculator } from '@/components/TreeCalculator'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  const g = pages.guides.treeSize
  return pageMetadata({ locale, path: `/guides/${g.slug}`, title: g.meta.title, description: g.meta.description, ogKey: g.slug, type: 'article' })
}

export default async function TreeSizeGuide({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const g = pages.guides.treeSize
  const pkgs = siteConfig.packages.map((p) => ({
    id: p.id,
    name: `${dict.packages.items[p.id].name} — ${p.treeHeightM[0] === p.treeHeightM[1] ? p.treeHeightM[0] : `${p.treeHeightM[0]}–${p.treeHeightM[1]}`} m`,
    min: p.treeHeightM[0],
    max: p.treeHeightM[1],
    href: `${localePath(locale, '/packages')}#${p.id}`,
  }))
  return (
    <GuideView
      accent="fits your ceiling?"
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
      before={
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container" style={{ display: 'grid', gap: 'var(--s-7)' }}>
            <div style={{ maxWidth: '40rem' }}>
              <h2 className="h2">{g.rule.heading}</h2>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--step-3)', lineHeight: 1.1, marginTop: 'var(--s-4)' }}>{g.rule.body}</p>
              <p className="muted" style={{ marginTop: 'var(--s-4)' }}>
                {g.rule.detail}
              </p>
            </div>
            <TreeCalculator copy={g.calculator} packages={pkgs} customHref={`${localePath(locale, '/contact')}#quote`} />
          </div>
        </section>
      }
    />
  )
}
