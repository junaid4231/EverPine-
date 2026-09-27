import { z } from 'zod'

import { AREAS, PACKAGE_OPTIONS, PROPERTY_TYPES } from '@/lib/quote-options'
export { AREAS, PACKAGE_OPTIONS, PROPERTY_TYPES }

/** Today in the UAE as YYYY-MM-DD. */
export function todayInDubai(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' })
}

const req = (max: number) => z.string().trim().min(1, 'required').max(max, 'tooLong')

export const quoteSchema = z.object({
  name: req(100),
  phone: z
    .string()
    .trim()
    .min(1, 'required')
    .max(30, 'phone')
    .refine((v) => /^\+?[\d\s()-]+$/.test(v) && v.replace(/\D/g, '').length >= 7 && v.replace(/\D/g, '').length <= 15, 'phone'),
  email: z.union([z.literal(''), z.string().trim().max(200, 'email').email('email')]).optional().default(''),
  area: z.enum(AREAS, { message: 'required' }),
  propertyType: z.enum(PROPERTY_TYPES, { message: 'required' }),
  package: z.enum(PACKAGE_OPTIONS, { message: 'required' }),
  date: z
    .string()
    .trim()
    .refine((v) => v === '' || (/^\d{4}-\d{2}-\d{2}$/.test(v) && v >= todayInDubai()), 'date')
    .optional()
    .default(''),
  message: z.string().trim().max(2000, 'tooLong').optional().default(''),
})

export type QuoteInput = z.infer<typeof quoteSchema>
export type { QuoteField } from '@/lib/quote-options'

export type { QuoteErrorKey, QuoteState } from '@/lib/quote-options'
