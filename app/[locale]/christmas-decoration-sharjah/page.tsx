import type { Metadata } from 'next'
import { load } from '@/lib/locale'
import { pageMetadata } from '@/lib/seo'
import { CityView } from '@/components/CityView'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pages } = await load(params)
  const p = pages.cities.sharjah
  return pageMetadata({ locale, path: '/christmas-decoration-sharjah', title: p.meta.title, description: p.meta.description, ogKey: 'sharjah' })
}

export default async function Sharjah({ params }: Props) {
  const { locale, dictionary, pages } = await load(params)
  return <CityView page={pages.cities.sharjah} dict={dictionary} locale={locale} />
}
