import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { localePath, type Locale } from '@/lib/i18n'

/**
 * Renders content strings with two inline markups:
 *   [text](/path) → link (internal links are locale-aware)
 *   **text**      → <strong>
 */
export function Rich({ text, locale }: { text: string; locale: Locale }) {
  return <>{parse(text, locale)}</>
}

function parse(text: string, locale: Locale): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>)
    if (m[1] && m[2]) {
      const href = m[2]
      out.push(
        href.startsWith('/') ? (
          <Link key={k++} href={localeHref(locale, href)}>
            {m[1]}
          </Link>
        ) : (
          <a key={k++} href={href} rel="noopener">
            {m[1]}
          </a>
        ),
      )
    } else if (m[3]) {
      out.push(<strong key={k++}>{m[3]}</strong>)
    }
    last = re.lastIndex
  }
  if (last < text.length) out.push(<Fragment key={k++}>{text.slice(last)}</Fragment>)
  return out
}

/** localePath that preserves #hash. */
export function localeHref(locale: Locale, href: string): string {
  const [path = '/', hash] = href.split('#')
  const base = localePath(locale, path || '/')
  return hash ? `${base}#${hash}` : base
}
