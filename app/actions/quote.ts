'use server'

import { headers } from 'next/headers'
import { quoteSchema } from '@/lib/quote-schema'
import type { QuoteField, QuoteState, QuoteErrorKey } from '@/lib/quote-options'
import { emailConfigured, sendQuoteEmail } from '@/lib/server/email'
import { rateLimited } from '@/lib/server/rate-limit'

const FIELDS: QuoteField[] = ['name', 'phone', 'email', 'area', 'propertyType', 'package', 'date', 'message']
const MIN_FILL_MS = 3000

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const values = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? '')])) as Record<QuoteField, string>

  // Spam: honeypot must be empty; form must have been open for a few seconds.
  const honeypot = String(formData.get('company') ?? '')
  const startedAt = Number(formData.get('startedAt') ?? 0)
  if (honeypot || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    // Pretend success so bots learn nothing.
    return { status: 'success' }
  }

  const parsed = quoteSchema.safeParse(values)
  if (!parsed.success) {
    const fieldErrors: Partial<Record<QuoteField, QuoteErrorKey>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as QuoteField
      if (!fieldErrors[key]) fieldErrors[key] = (['required', 'email', 'phone', 'date', 'tooLong'].includes(issue.message) ? issue.message : 'required') as QuoteErrorKey
    }
    return { status: 'error', fieldErrors, values }
  }

  // Only well-formed submissions count towards the limit, so typos never lock a customer out.
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  if (rateLimited(ip)) return { status: 'error', error: 'rateLimited', values }

  if (!emailConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[quote] Resend not configured — enquiry logged locally only:', { ...parsed.data, email: '[redacted]', phone: '[redacted]' })
      return { status: 'success' }
    }
    console.error('[quote] RESEND_API_KEY / QUOTE_FROM_EMAIL missing')
    return { status: 'error', error: 'notConfigured', values }
  }

  try {
    await sendQuoteEmail(parsed.data, { page: h.get('referer') ?? undefined })
    return { status: 'success' }
  } catch (err) {
    console.error('[quote] send failed', err instanceof Error ? err.message : err)
    return { status: 'error', error: 'generic', values }
  }
}
