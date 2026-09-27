'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore, type ReactNode } from 'react'

const subscribe = () => () => {}

/**
 * Pages are prerendered under /en/* and served at /* through a Proxy rewrite,
 * so the pathname is read from the browser after hydration (server snapshot = null)
 * to avoid a hydration mismatch.
 */
export function useBrowserPath(): string | null {
  usePathname() // re-render on client navigation
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => null,
  )
}

export function NavLink({ href, children, className, onClick }: { href: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const path = useBrowserPath()
  const active = path !== null && (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`))
  return (
    <Link href={href} className={className} aria-current={active ? 'page' : undefined} onClick={onClick}>
      {children}
    </Link>
  )
}
