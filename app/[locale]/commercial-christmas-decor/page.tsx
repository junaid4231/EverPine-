import type { Metadata } from 'next'
import s from '@/components/Audiences.module.css'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { breadcrumbNode, faqNode, graph, serviceNode } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { PageHero } from '@/components/PageHero'
import { Img } from '@/components/Img'
import { Faqs } from '@/components/Faqs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { ContactButtons } from '@/components/ContactButtons'
import { Rich } from '@/components/Rich'

type Props = { params: Promise<{ locale: string }> }
const PATH = '/commercial-christmas-decor'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: PATH, title: pages.commercial.meta.title, description: pages.commercial.meta.description, ogKey: 'commercial' })
}

export default async function Commercial({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const c = pages.commercial
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.commercial, path: PATH },
  ]
  const url = absoluteUrl(localePath(locale, PATH))
  const message = dict.whatsappMessages.service(dict.ui.businessService)

  return (
    <>
      <PageHero
        accent="Christmas decoration"
        dict={dict}
        locale={locale}
        trail={trail}
        eyebrow={c.eyebrow}
        h1={c.h1}
        intro={c.intro}
        image={c.hero}
        ctas={<ContactButtons dict={dict} locale={locale} placement="commercial_hero" message={message} compact />}
      />

      <section className="section">
        <div className="container">
          <ul className={s.list} role="list">
            {c.audiences.map((a, i) => (
              <li key={a.id} id={a.id} className={s.item}>
                <div className={`${s.frame} arch`} data-reveal="arch" style={{ ['--d' as string]: i % 2 }}>
                  <Img id={a.image} dict={dict} fill sizes="(min-width: 48rem) 40vw, 100vw" />
                </div>
                <div>
                  <span className={s.idx}>{String(i + 1).padStart(2, '0')}</span>
                  <h2>{a.title}</h2>
                  <p>{a.body}</p>
                  <p className="plate">
                    <b>{dict.ui.plate}</b>
                    <span>{dict.images[a.image].caption}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="lede" style={{ marginTop: 'var(--s-8)', maxWidth: '44rem' }}>
            <Rich text={c.related} locale={locale} />
          </p>
        </div>
      </section>

      <section className="section theme-sand">
        <div className={`container ${s.two}`}>
          <div>
            <h2 className="h2" style={{ marginBottom: 'var(--s-5)' }}>
              {c.howItWorks.heading}
            </h2>
            <ol className={s.steps} role="list">
              {c.howItWorks.steps.map((st) => (
                <li key={st.title}>
                  <div>
                    <b>{st.title}</b>
                    <span>{st.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="h2" style={{ marginBottom: 'var(--s-5)' }}>
              {c.checklist.heading}
            </h2>
            <ul className={s.check} role="list">
              {c.checklist.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <p className="muted small" style={{ marginTop: 'var(--s-5)' }}>
              <Rich text="Planning an office? Read our [office Christmas décor guide](/guides/office-christmas-decor-planning)." locale={locale} />
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="commercial-faq-heading">
        <div className="container">
          <Faqs faqs={c.faqs} locale={locale} heading={dict.ui.businessFaqHeading} eyebrow={dict.ui.faq} id="commercial-faq" />
        </div>
      </section>

      <CtaBand dict={dict} locale={locale} placement="commercial_closing" message={message} heading={dict.ui.businessCtaHeading} />

      <JsonLd
        data={graph(
          serviceNode({
            name: 'Commercial Christmas decoration',
            serviceType: 'Commercial Christmas decoration',
            description: c.meta.description,
            url,
            image: absoluteUrl(`/og/${locale}/commercial`),
          }),
          faqNode(c.faqs, url),
          breadcrumbNode(locale, trail),
        )}
      />
    </>
  )
}
