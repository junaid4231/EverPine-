/** Client-safe form constants and types — no validation library, so nothing heavy ships to the browser. */
export const AREAS = ['dubai', 'sharjah'] as const
export const PROPERTY_TYPES = ['villa', 'apartment', 'townhouse', 'office', 'hotel', 'restaurant', 'retail', 'other'] as const
export const PACKAGE_OPTIONS = ['basic', 'silver', 'gold', 'custom'] as const

export type QuoteErrorKey = 'required' | 'email' | 'phone' | 'date' | 'tooLong'
export type QuoteField = 'name' | 'phone' | 'email' | 'area' | 'propertyType' | 'package' | 'date' | 'message'

export interface QuoteState {
  status: 'idle' | 'success' | 'error'
  error?: 'generic' | 'rateLimited' | 'notConfigured'
  fieldErrors?: Partial<Record<QuoteField, QuoteErrorKey>>
  values?: Partial<Record<QuoteField, string>>
}
