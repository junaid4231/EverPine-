import Link from 'next/link'
import s from '@/components/Audiences.module.css'
import { absoluteUrl } from '@/lib/seo'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import { localePath, type Locale } from '@/lib/i18n'
import { formatAED, getPackage } from '@/lib/site-config'
import { PageHero } from '@/components/PageHero'
import { ProseRows } from '@/components/Prose'
import { Faqs } from '@/components/Faqs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'
import { Rich } from '@/components/Rich'
import type { CityPage, Dictionary } from '@/content/types'
import c from './CityView.module.css'

/** Shared template for the Dubai and Sharjah pages — each with its own copy, areas, logistics and FAQs. */
export function CityView({ page, dict, locale }: { page: CityPage; dict: Dictionary; locale: Locale }) {
  const path = page.path ?? `/christmas-decoration-${page.area}`
  const areaName = dict.areas[page.area]
  const crumb = page.crumb ?? dict.ui.christmasDecorationIn(areaName)
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: crumb, path },
  ]
  const url = absoluteUrl(localePath(locale, path))
  const message = page.message ?? dict.ui.cityMessage(areaName)
  const other = page.area === 'dubai' ? 'sharjah' : 'dubai'
  const related = page.related ?? [{ href: `/christmas-decoration-${other}`, label: dict.ui.christmasDecorationIn(dict.areas[other]) }]
  const key = page.ogKey ?? page.area

  return (
    <>
      <PageHero
        accent={page.accent ?? areaName}
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={page.eyebrow}
        h1={page.h1}
        intro={page.intro}
        image={page.hero}
        ctas={<ContactButtons dict={dict} locale={locale} placement={`city_${key}`} message={message} compact />}
      />

      <section className="section">
        <div className="container">
          <ProseRows sections={page.sections} images={page.plates} dict={dict} locale={locale} />
        </div>
      </section>

      <section className="section theme-night" aria-labelledby="communities-heading">
        <div className="container">
          <div className={c.commHead}>
            <h2 id="communities-heading" className="h2">
              {page.communities.heading}
            </h2>
            <p className="muted">
              <Rich text={page.communities.note} locale={locale} />
            </p>
          </div>
          <div className={c.groups}>
            {page.communities.groups.map((g) => (
              <div key={g.label}>
                <h3 className="eyebrow">{g.label}</h3>
                <ul role="list" className={c.names}>
                  {g.items.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="advice-heading">
        <div className={`container ${s.two}`}>
          <div>
            <h2 id="advice-heading" className="h2">
              {page.packageAdvice.heading}
            </h2>
            <p className="muted" style={{ marginTop: 'var(--s-4)' }}>
              {dict.packages.priceNote}
            </p>
          </div>
          <ul role="list" className={c.advice}>
            {page.packageAdvice.items.map((it) => {
              const href = it.pkg === 'custom' ? localePath(locale, '/commercial-christmas-decor') : `${localePath(locale, '/packages')}#${it.pkg}`
              return (
                <li key={it.pkg}>
                  <Link href={href} className={c.adviceLink}>
                    <span className={c.adviceName}>{it.pkg === 'custom' ? dict.ui.custom : dict.packages.items[it.pkg].name}</span>
                    <span className={c.advicePrice}>{it.pkg === 'custom' ? dict.ui.onQuote : formatAED(getPackage(it.pkg).priceAED, locale)}</span>
                    <span className={c.adviceText}>
                      <Rich text={it.text} locale={locale} />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby={`${key}-faq-heading`}>
        <div className="container">
          <Faqs faqs={page.faqs} locale={locale} heading={page.ogKey ? dict.ui.questionsAbout(crumb) : dict.ui.cityFaqHeading(areaName)} eyebrow={dict.ui.faq} id={`${key}-faq`} />
          <ul role="list" className={c.related}>
            {related.map((r) => (
              <li key={r.href}>
                <Link href={localePath(locale, r.href)} className="link-arrow">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand dict={dict} locale={locale} placement={`city_${key}_closing`} message={message} />

      <JsonLd
        data={graph(
          serviceNode({
            name: crumb,
            serviceType: page.serviceType ?? 'Christmas decoration installation',
            description: page.meta.description,
            url,
            areas: [page.area],
            image: absoluteUrl(`/og/${locale}/${key}`),
          }),
          faqNode(page.faqs, url),
          breadcrumbNode(locale, trail),
        )}
      />
    </>
  )
}
