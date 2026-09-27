'use client'

import { track as vercelTrack } from '@vercel/analytics'

export type TrackEvent = 'whatsapp_click' | 'call_click' | 'email_click' | 'generate_lead' | 'package_select'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

/** Sends a conversion event to GA4 (when loaded with consent) and Vercel Analytics. */
export function trackEvent(name: TrackEvent, label?: string) {
  try {
    window.gtag?.('event', name, label ? { event_label: label } : {})
  } catch {
    /* analytics must never break the page */
  }
  try {
    vercelTrack(name, label ? { label } : undefined)
  } catch {
    /* noop */
  }
}
