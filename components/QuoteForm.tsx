'use client'

import { celebrate } from '@/lib/confetti'
import { useActionState, useEffect, useRef, useState } from 'react'
import styles from './QuoteForm.module.css'
import { submitQuote } from '@/app/actions/quote'
import { AREAS, PACKAGE_OPTIONS, PROPERTY_TYPES, type QuoteField, type QuoteState } from '@/lib/quote-options'
import { trackEvent } from '@/lib/analytics/track'
import type { FormCopy } from '@/content/types'

interface Props {
  copy: Omit<FormCopy, 'privacyNote'>
  areaLabels: Record<(typeof AREAS)[number], string>
  privacyNote: React.ReactNode
}

const initial: QuoteState = { status: 'idle' }

export function QuoteForm({ copy, areaLabels, privacyNote }: Props) {
  const [state, action, pending] = useActionState(submitQuote, initial)
  const packageRef = useRef<HTMLSelectElement>(null)
  const submittedPackage = useRef<string | undefined>(undefined)
  const [startedAt] = useState(() => Date.now())
  const successRef = useRef<HTMLDivElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  // Pre-select the package chosen on a package card (?package=silver). Read after mount so the
  // form itself stays server-rendered (no layout shift) and the page stays static.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('package')
    if (fromUrl && (PACKAGE_OPTIONS as readonly string[]).includes(fromUrl) && packageRef.current && !state.values?.package) {
      packageRef.current.value = fromUrl
    }
  }, [state.values?.package])

  useEffect(() => {
    if (state.status === 'success') {
      trackEvent('generate_lead', submittedPackage.current)
      successRef.current?.focus()
      const r = successRef.current?.getBoundingClientRect()
      if (r) celebrate(r.left + r.width / 2, Math.min(r.top + 40, innerHeight * 0.7))
    } else if (state.status === 'error') {
      const firstInvalid = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      ;(firstInvalid ?? errorRef.current)?.focus()
    }
  }, [state])

  if (state.status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} className={styles.success} role="status">
        <h3>{copy.success.heading}</h3>
        <p>{copy.success.body}</p>
      </div>
    )
  }

  const v = state.values ?? {}
  const err = (f: QuoteField) => state.fieldErrors?.[f]
  const describe = (f: QuoteField, hint?: boolean) => [hint ? `${f}-hint` : null, err(f) ? `${f}-error` : null].filter(Boolean).join(' ') || undefined
  const errorText = (f: QuoteField) =>
    err(f) ? (
      <p id={`${f}-error`} className={styles.error}>
        {copy.errors[err(f)!]}
      </p>
    ) : null

  return (
    <form action={action} onSubmit={() => (submittedPackage.current = packageRef.current?.value)} className={styles.form} noValidate aria-describedby={state.error ? 'form-error' : undefined}>
      {state.error ? (
        <div ref={errorRef} id="form-error" tabIndex={-1} className={styles.alert} role="alert">
          {copy.errors[state.error]}
        </div>
      ) : null}

      <div className={styles.row2}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            {copy.fields.name}
          </label>
          <input id="name" name="name" autoComplete="name" required maxLength={100} defaultValue={v.name} className={styles.input} aria-invalid={Boolean(err('name'))} aria-describedby={describe('name')} />
          {errorText('name')}
        </div>
        <div className={styles.field}>
          <label htmlFor="phone" className={styles.label}>
            {copy.fields.phone}
          </label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={30} placeholder="+971 5X XXX XXXX" defaultValue={v.phone} className={styles.input} aria-invalid={Boolean(err('phone'))} aria-describedby={describe('phone')} />
          {errorText('phone')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          {copy.fields.email} <small>({copy.fields.optional})</small>
        </label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={200} defaultValue={v.email} className={styles.input} aria-invalid={Boolean(err('email'))} aria-describedby={describe('email')} />
        {errorText('email')}
      </div>

      <fieldset className={styles.radios} aria-invalid={Boolean(err('area'))} aria-describedby={describe('area')}>
        <legend className={styles.label}>{copy.fields.area}</legend>
        {AREAS.map((a) => (
          <label key={a} className={styles.radio}>
            <input type="radio" name="area" value={a} defaultChecked={v.area === a} required />
            <span>{areaLabels[a]}</span>
          </label>
        ))}
        {errorText('area')}
      </fieldset>

      <div className={styles.row2}>
        <div className={styles.field}>
          <label htmlFor="propertyType" className={styles.label}>
            {copy.fields.propertyType}
          </label>
          <select id="propertyType" name="propertyType" required key={`pt-${v.propertyType ?? ''}`} defaultValue={v.propertyType ?? ''} className={styles.select} aria-invalid={Boolean(err('propertyType'))} aria-describedby={describe('propertyType')}>
            <option value="" disabled>
              —
            </option>
            {PROPERTY_TYPES.map((p) => (
              <option key={p} value={p}>
                {copy.propertyTypes[p]}
              </option>
            ))}
          </select>
          {errorText('propertyType')}
        </div>
        <div className={styles.field}>
          <label htmlFor="package" className={styles.label}>
            {copy.fields.package}
          </label>
          <select ref={packageRef} id="package" name="package" required defaultValue={v.package || 'custom'} key={`pkg-${v.package || 'custom'}`} className={styles.select} aria-invalid={Boolean(err('package'))} aria-describedby={describe('package')}>
            <option value="" disabled>
              —
            </option>
            {PACKAGE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {copy.packageOptions[p]}
              </option>
            ))}
          </select>
          {errorText('package')}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="date" className={styles.label}>
          {copy.fields.date} <small>({copy.fields.optional})</small>
        </label>
        <p id="date-hint" className={styles.hint}>
          {copy.fields.dateHint}
        </p>
        <input id="date" name="date" type="date" defaultValue={v.date} className={styles.input} aria-invalid={Boolean(err('date'))} aria-describedby={describe('date', true)} />
        {errorText('date')}
      </div>

      <div className={styles.field}>
        <label htmlFor="message" className={styles.label}>
          {copy.fields.message} <small>({copy.fields.optional})</small>
        </label>
        <textarea id="message" name="message" maxLength={2000} rows={4} placeholder={copy.fields.messagePlaceholder} defaultValue={v.message} className={styles.textarea} aria-invalid={Boolean(err('message'))} aria-describedby={describe('message')} />
        {errorText('message')}
      </div>

      {/* Spam protection: humans never see or fill this. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <button type="submit" className="btn btn-primary btn-block" disabled={pending} aria-disabled={pending}>
        {pending ? copy.sending : copy.submit}
      </button>
      <p className={styles.privacy}>{privacyNote}</p>
    </form>
  )
}
