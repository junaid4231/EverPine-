import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import { BUSINESS_ID, breadcrumbNode, graph } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { hasWhatsApp } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactButtons } from '@/components/ContactButtons'
import { QuoteForm } from '@/components/QuoteForm'
import { Rich } from '@/components/Rich'
import { Img } from '@/components/Img'
import { JsonLd } from '@/components/JsonLd'
import s from './contact.module.css'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/contact', title: pages.contact.meta.title, description: pages.contact.meta.description, ogKey: 'contact' })
}

export default async function Contact({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const c = pages.contact
  const trail = [
    { name: dict.nav.home, path: '/' },
    { name: dict.nav.contact, path: '/contact' },
  ]
  const { privacyNote, ...formCopy } = dict.form
  const url = absoluteUrl(localePath(locale, '/contact'))

  return (
    <section className={`section ${s.page} lamplight`}>
      <div className={`container ${s.grid}`}>
        <div className={s.info}>
          <Breadcrumbs trail={trail} locale={locale} label={dict.nav.breadcrumb} />
          <p className="eyebrow" style={{ marginTop: 'var(--s-5)' }}>
            {c.eyebrow}
          </p>
          <h1 className="h1" style={{ marginTop: 'var(--s-4)' }}>
            {c.h1}
          </h1>
          <p className="lede" style={{ marginTop: 'var(--s-4)' }}>
            {hasWhatsApp ? c.intro : c.introFormOnly}
          </p>
          <div className={s.buttons}>
            <ContactButtons dict={dict} locale={locale} placement="contact" withQuote={false} />
          </div>
        </div>

        <div className={`${s.formCol} theme-ivory`} id="quote">
          <h2 className="h2">{dict.form.heading}</h2>
          <p className="muted" style={{ marginTop: 'var(--s-3)', marginBottom: 'var(--s-6)' }}>
            {dict.form.intro}
          </p>
          <QuoteForm copy={formCopy} areaLabels={dict.areas} privacyNote={<Rich text={privacyNote} locale={locale} />} />
        </div>

        <div className={s.aside}>
          <p className="small muted">{dict.cta.bookEarly}</p>
          <div className={s.next}>
            <h2 className="h4">{c.next.heading}</h2>
            <ol role="list">
              {c.next.steps.map((st) => (
                <li key={st}>{st}</li>
              ))}
            </ol>
          </div>

          <figure className={s.figure}>
            <div className={s.frame}>
              <Img id={c.image} dict={dict} fill sizes="(min-width: 64rem) 20vw, 50vw" />
            </div>
          </figure>
        </div>
      </div>
      <JsonLd
        data={graph(breadcrumbNode(locale, trail), {
          '@type': 'ContactPage',
          '@id': `${url}#page`,
          url,
          name: c.meta.title,
          about: { '@id': BUSINESS_ID },
        })}
      />
    </section>
  )
}
