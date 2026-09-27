import Link from 'next/link'
import type { Metadata } from 'next'
import s from './home.module.css'
import { load } from '@/lib/locale'
import { pageMetadata, absoluteUrl } from '@/lib/seo'
import { graph, packagesServiceNode } from '@/lib/schema'
import { localePath } from '@/lib/i18n'
import { seasonMode, seasonYear, whatsappHref } from '@/lib/site-config'
import { Img } from '@/components/Img'
import { CollectionTeaser } from '@/components/CollectionTeaser'
import { Rich } from '@/components/Rich'
import { ServicesIndex } from '@/components/ServicesIndex'
import { Faqs } from '@/components/Faqs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { WhatsAppIcon } from '@/components/Icons'
import { Marquee } from '@/components/Marquee'
import { PaletteStage } from '@/components/PaletteStage'
import { Ribbon } from '@/components/Ribbon'
import { Ornaments } from '@/components/Ornaments'
import { PhotoWord } from '@/components/PhotoWord'
import { StreamText } from '@/components/StreamText'
import { HeroGarland } from '@/components/HeroGarland'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  return pageMetadata({ locale, path: '/', title: pages.home.meta.title, description: pages.home.meta.description, ogKey: 'home', absoluteTitle: true })
}

export default async function Home({ params }: Props) {
  const { locale, dictionary: dict, pages } = await load(params)
  const h = pages.home
  const lp = (p: string) => localePath(locale, p)
  const season = dict.season[seasonMode()]
  const wa = whatsappHref(dict.whatsappMessages.general)
  const homeFaqs = [pages.faqs.pricing[0]!, pages.faqs.trees[0]!, pages.faqs.booking[0]!, pages.faqs.lighting[0]!, pages.faqs.booking[2]!, pages.faqs.pricing[3]!]
  const url = absoluteUrl(lp('/'))

  return (
    <>
      {/* ── Dusk: hero ── */}
      <section className={`${s.hero} lattice`} aria-labelledby="hero-title">
        <HeroGarland />
        <Ornaments count={7} idPrefix="hero-orn" />
        <div className={s.heroGrid}>
          <div className={s.heroMedia}>
            <div className={`${s.heroArch} arch`}>
              <Img id={h.hero.image} dict={dict} fill priority quality={85} sizes="(min-width: 64rem) 28rem, 100vw" position="center" className={`${s.kenburns} ${s.lightsOn}`} />
            </div>
            <span className={s.archLine} aria-hidden="true" />
            <p className={`plate ${s.heroPlate}`}>
              <b>{dict.ui.plate} 01</b>
              <span>{dict.images[h.hero.image].caption}</span>
            </p>
          </div>

          <div className={s.heroText}>
            <div className={s.heroTop}>
              <p className="eyebrow">{season.eyebrow.replace('{year}', String(seasonYear()))}</p>
            </div>
            <h1 id="hero-title" className={s.h1}>
              <span className={s.l1}>{h.hero.h1a}</span>{' '}
              <span className={s.l2}>
                <em className="shimmer">{h.hero.h1b}</em>
              </span>{' '}
              <span className={s.l3}>{h.hero.h1c}</span>
            </h1>
            <div className={s.ctas}>
              {wa ? (
                <a href={wa} className="btn btn-primary" data-track="whatsapp_click" data-track-label="hero">
                  <WhatsAppIcon />
                  {dict.cta.whatsapp}
                </a>
              ) : (
                <Link href={`${lp('/contact')}#quote`} className="btn btn-primary">
                  {season.ctaPrimary}
                </Link>
              )}
              <Link href={`${lp('/')}#collection`} className="btn btn-ghost">
                {dict.cta.viewPackages}
              </Link>
            </div>
            <p className={s.sub}>{h.hero.sub}</p>
            <p className={s.note}>
              <span className="bauble-dot" aria-hidden="true" /> {season.line}
            </p>
          </div>
        </div>
        <Marquee items={h.marquee} label={dict.nav.services} />
      </section>

      {/* ── The Everpine way: a headline that streams in, word by word, as you scroll ── */}
      <section className={`theme-ivory ${s.way}`} aria-labelledby="way-heading">
        <div className="container">
          <div className={s.wayTop}>
          <div>
          <p className="eyebrow" data-reveal>
            {h.statement.eyebrow}
          </p>
          <StreamText id="way-heading" className={s.wayLine} segments={h.statement.stream} />
          </div>
          <figure className={s.wayFig}>
            <div className={`${s.wayArch} arch`} data-reveal="arch">
              <Img id="console-garland-silver-reindeer-oval-mirror" dict={dict} fill sizes="(min-width: 64rem) 26vw, 1px" />
            </div>
            <span className={s.wayLineArch} aria-hidden="true" />
          </figure>
          </div>
          <ol className={s.promises} role="list">
            {h.statement.promises.map((p, i) => (
              <li key={p.word} data-reveal style={{ ['--d' as string]: i + 2 }}>
                <span className={s.promiseNum} aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className={s.promiseWord}>{p.word}</h3>
                <p className={s.promiseText}>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The Collection, unwrapped ── */}
      <Ribbon />
      <CollectionTeaser dict={dict} locale={locale} />

      {/* ── Palettes ── */}
      <section className={`${s.palettes} lamplight`} aria-labelledby="palettes-heading">
        <div className={`container ${s.paletteGrid}`}>
          <div className={s.paletteText}>
            <p className="eyebrow" data-reveal>
              {h.palettes.eyebrow}
            </p>
            <h2 id="palettes-heading" className="h2" data-reveal style={{ ['--d' as string]: 1 }}>
              {h.palettes.heading[0]} <em>{h.palettes.heading[1]}</em>
            </h2>
            <p className="muted" data-reveal style={{ ['--d' as string]: 2, marginTop: 'var(--s-4)', maxWidth: '30rem' }}>
              {h.palettes.intro}
            </p>
          </div>
          <PaletteStage options={h.palettes.items.map((p) => ({ id: p.id, name: p.name, swatches: p.swatches }))} legend={h.palettes.legend}>
            <div className={s.paletteFrame}>
              <div className={`${s.paletteArch} arch`}>
                {h.palettes.items.map((p, i) => (
                  <figure key={p.id} data-palette={p.id} data-on={i === 0 ? '' : undefined} className={s.paletteSlide}>
                    <Img id={p.image} dict={dict} fill sizes="(min-width: 64rem) 34vw, 86vw" />
                    <figcaption className={s.paletteCaption}>
                      <span className={s.paletteName}>{p.name}</span>
                      <span>{p.text}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
              <span className={s.archLine} aria-hidden="true" />
            </div>
          </PaletteStage>
        </div>
        <p className="container" style={{ marginTop: 'var(--s-6)' }}>
          <Link href={lp('/gallery')} className="link-arrow">
            {dict.cta.seeGallery}
          </Link>
        </p>
      </section>

      {/* ── Services index ── */}
      <section className="section theme-night" id="services" aria-labelledby="services-heading">
        <div className="container">
          <div className={s.headRow}>
            <div>
              <p className="eyebrow" data-reveal>
                {h.services.eyebrow}
              </p>
              <h2 id="services-heading" className="h2" data-reveal style={{ ['--d' as string]: 1 }}>
                {h.services.heading}
              </h2>
            </div>
            <p className="muted" data-reveal style={{ ['--d' as string]: 2 }}>
              {h.services.intro}
            </p>
          </div>
          <ServicesIndex dict={dict} locale={locale} />
        </div>
      </section>

      {/* ── A Gulf Christmas ── */}
      <section className="section-lg lamplight" aria-labelledby="gulf-heading">
        <div className={`container ${s.gulf}`}>
          <div className={s.gulfText}>
            <p className="eyebrow" data-reveal>
              {h.gulf.eyebrow}
            </p>
            <h2 id="gulf-heading" className="h2" data-reveal style={{ ['--d' as string]: 1 }}>
              {h.gulf.headingParts[0]} <em>{h.gulf.headingParts[1]}</em>
            </h2>
            {h.gulf.body.map((p, i) => (
              <p key={p.slice(0, 30)} data-reveal style={{ ['--d' as string]: 2 + i }}>
                {p}
              </p>
            ))}
            <p style={{ marginTop: 'var(--s-5)' }}>
              <Link href={lp('/services/christmas-lighting')} className="link-arrow">
                {dict.ui.houseLighting}
              </Link>
            </p>
          </div>
          <figure className={s.gulfA}>
            <div className={`${s.f} arch`} data-reveal="arch">
              <Img id={h.gulf.images[0]!} dict={dict} fill sizes="(min-width: 64rem) 30vw, 90vw" />
            </div>
            <figcaption className="plate">
              <b>{dict.ui.plate} 02</b>
              <span>{dict.images[h.gulf.images[0]!].caption}</span>
            </figcaption>
          </figure>
          <figure className={s.gulfB}>
            <div className={s.f} data-reveal style={{ ['--d' as string]: 3 }}>
              <Img id={h.gulf.images[1]!} dict={dict} fill sizes="(min-width: 64rem) 22vw, 62vw" />
            </div>
            <figcaption className="plate">
              <b>{dict.ui.plate} 03</b>
              <span>{dict.images[h.gulf.images[1]!].caption}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Signature: the word "Glow", filled with the villa's lights ── */}
      <section className="theme-midnight" aria-label={h.glow.caption}>
        <PhotoWord word={h.glow.word} image="villa-facade-icicle-lights-reindeer-dusk" caption={h.glow.caption} />
      </section>

      {/* ── Process (ivory) ── */}
      <section className="theme-ivory section" aria-labelledby="process-heading">
        <div className="container">
          <div className={s.headRow}>
            <div>
              <p className="eyebrow">{h.process.eyebrow}</p>
              <h2 id="process-heading" className="h2">
                {h.process.headingParts[0]} <em>{h.process.headingParts[1]}</em>
              </h2>
            </div>
          </div>
          <ol className={s.steps} data-reveal role="list" tabIndex={0} aria-label={h.process.heading}>
            {h.process.steps.map((step, i) => (
              <li key={step.title} className={s.step}>
                <div className={`${s.stepImg} arch`}>
                  <Img id={step.image} dict={dict} fill sizes="(min-width: 64rem) 28vw, 78vw" />
                </div>
                <span className={s.stepNum} aria-hidden="true">
                  {['i', 'ii', 'iii'][i]}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Areas ── */}
      <section className="section theme-night" aria-labelledby="areas-heading">
        <div className="container">
          <p className="eyebrow">{h.areas.eyebrow}</p>
          <h2 id="areas-heading" className="visually-hidden">
            {h.areas.heading}
          </h2>
          <p className="muted" style={{ marginTop: 'var(--s-4)', maxWidth: '40rem' }}>
            <Rich text={h.areas.lead} locale={locale} />
          </p>
          <ul className={s.areas} role="list" style={{ marginTop: 'var(--s-6)' }}>
            {(['dubai', 'sharjah'] as const).map((a, i) => (
              <li key={a} data-reveal style={{ ['--d' as string]: i }}>
                <Link href={lp(`/christmas-decoration-${a}`)} className={s.areaLink}>
                  <span className={s.areaName}>{dict.areas[a]}</span>
                  <span className={s.areaNote}>{h.areas[a]}</span>
                  <span className={s.areaGo} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" aria-labelledby="home-faq-heading">
        <div className="container">
          <Faqs faqs={homeFaqs} locale={locale} heading={h.faqHeading} eyebrow={dict.ui.faq} id="home-faq" />
          <p className={s.more}>
            <Link href={lp('/faq')} className="link-arrow">
              {dict.ui.allQuestions}
            </Link>
          </p>
        </div>
      </section>

      <CtaBand dict={dict} locale={locale} heading={h.closing.heading} placement="home_closing" />

      {/* Home FAQs repeat /faq, where the FAQPage markup lives (one marked-up instance per question). */}
      <JsonLd data={graph(packagesServiceNode(dict, locale, url))} />
    </>
  )
}
