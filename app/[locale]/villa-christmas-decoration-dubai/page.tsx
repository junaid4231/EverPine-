import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { pageMetadata } from '@/lib/seo'
import { CityView } from '@/components/CityView'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  const p = pages.landings.villa
  return pageMetadata({ locale, path: p.path!, title: p.meta.title, description: p.meta.description, ogKey: 'villa' })
}

export default async function VillaChristmasDecorationDubai({ params }: Props) {
  const { locale, dictionary, pages } = await load(params)
  return <CityView page={pages.landings.villa} dict={dictionary} locale={locale} />
}
