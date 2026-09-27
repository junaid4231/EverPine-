'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'
import styles from './Analytics.module.css'
import { trackEvent, type TrackEvent } from '@/lib/analytics/track'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
/** Vercel exposes this on its deployments; the insights script only exists there. */
const ON_VERCEL = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV)
const KEY = 'everpine-consent'
type Consent = 'granted' | 'denied' | null

/* Consent lives in localStorage (per-visitor convenience); guarded for private modes. */
const listeners = new Set<() => void>()
function readConsent(): Consent {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}
function writeConsent(v: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(KEY, v)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}
function subscribe(l: () => void) {
  listeners.add(l)
  return () => listeners.delete(l)
}

function loadGa(id: string) {
  if (window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', id, { anonymize_ip: true })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
}

/**
 * Vercel Analytics (cookieless) always; GA4 only when NEXT_PUBLIC_GA_ID is set AND the
 * visitor accepts. Conversion clicks are captured by one delegated listener on
 * elements carrying data-track="<event>".
 */
export function Analytics({ labels, privacyHref }: { labels: { text: string; accept: string; decline: string; privacyLink: string }; privacyHref: string }) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => 'unknown' as const)

  useEffect(() => {
    if (GA_ID && consent === 'granted') loadGa(GA_ID)
  }, [consent])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]')
      if (!el) return
      trackEvent(el.dataset.track as TrackEvent, el.dataset.trackLabel)
    }
    document.addEventListener('click', onClick, { passive: true, capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return (
    <>
      {ON_VERCEL ? <VercelAnalytics /> : null}
      {GA_ID && consent === null ? (
        <div className={styles.banner} role="region" aria-label="Cookie consent">
          <p>
            {labels.text} <Link href={privacyHref}>{labels.privacyLink}</Link>
          </p>
          <div className={styles.row}>
            <button type="button" className="btn btn-light" onClick={() => writeConsent('granted')}>
              {labels.accept}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => writeConsent('denied')}>
              {labels.decline}
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
