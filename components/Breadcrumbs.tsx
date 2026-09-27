import Link from 'next/link'
import { localePath, type Locale } from '@/lib/i18n'

export interface Crumb {
  name: string
  path: string
}

/** Visible breadcrumb trail; the matching BreadcrumbList JSON-LD is emitted by the page. */
export function Breadcrumbs({ trail, locale, label }: { trail: Crumb[]; locale: Locale; label: string }) {
  return (
    <nav aria-label={label} className="crumbs">
      <ol role="list">
        {trail.map((c, i) => (
          <li key={c.path}>
            {i < trail.length - 1 ? <Link href={localePath(locale, c.path)}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
