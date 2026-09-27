import 'server-only'
import { Resend } from 'resend'
import type { QuoteInput } from '@/lib/quote-schema'
import { formatAED, getPackage, siteConfig } from '@/lib/site-config'

/**
 * Private destination for enquiries. Kept server-side only — it never reaches
 * the client bundle or the rendered HTML. Override with QUOTE_TO_EMAIL.
 */
const DEFAULT_TO = 'skyscramper@hotmail.com'

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.QUOTE_FROM_EMAIL)
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const LABELS: Record<string, string> = {
  basic: 'Basic',
  silver: 'Silver',
  gold: 'Gold',
  custom: 'Custom / not sure',
  dubai: 'Dubai',
  sharjah: 'Sharjah',
}

export async function sendQuoteEmail(q: QuoteInput, meta: { page?: string }) {
  const pkg = q.package === 'custom' ? 'Custom / not sure' : `${LABELS[q.package]} — ${formatAED(getPackage(q.package).priceAED)}`
  const rows: [string, string][] = [
    ['Name', q.name],
    ['Phone / WhatsApp', q.phone],
    ['Email', q.email || '—'],
    ['Area', LABELS[q.area] ?? q.area],
    ['Property type', q.propertyType],
    ['Package', pkg],
    ['Preferred installation date', q.date || 'Not given'],
    ['Message', q.message || '—'],
  ]
  const subject = `Quote request — ${LABELS[q.package]} — ${q.propertyType}, ${LABELS[q.area]} — ${q.name}`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + (meta.page ? `\n\nSent from: ${meta.page}` : '')
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#1c1a16">
<h2 style="font-family:Georgia,serif;font-weight:400">New quote request — ${esc(siteConfig.name)}</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="border-bottom:1px solid #e6d9c4;color:#62594c;vertical-align:top">${esc(k)}</td><td style="border-bottom:1px solid #e6d9c4;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>
<p style="color:#62594c;font-size:12px">Reply to this email to answer ${esc(q.name)} directly.</p>
</body></html>`

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: process.env.QUOTE_FROM_EMAIL!,
    to: [process.env.QUOTE_TO_EMAIL || DEFAULT_TO],
    ...(q.email ? { replyTo: q.email } : {}),
    subject,
    text,
    html,
  })
  if (error) throw new Error(`Resend: ${error.name}: ${error.message}`)
}
