'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import styles from './TreeCalculator.module.css'

interface Pkg {
  id: string
  name: string
  min: number
  max: number
  href: string
}

interface Props {
  copy: { heading: string; label: string; unit: string; resultLabel: string; widthLabel: string; packageLabel: string; tooLow: string; custom: string; customLabel: string; between: string }
  packages: Pkg[]
  customHref: string
}

const CLEARANCE = 0.3
const fmt = (n: number) => n.toFixed(2).replace(/0$/, '')

/** Ceiling height → maximum tree height, approximate width and the matching package. */
export function TreeCalculator({ copy, packages, customHref }: Props) {
  const id = useId()
  const MIN = 2.2
  const MAX = 6
  const [ceiling, setCeiling] = useState(2.7)
  /** Raw text of the number field — clamped only on blur/Enter so typing is never fought. */
  const [draft, setDraft] = useState('2.7')
  const maxTree = Math.max(0, Math.round((ceiling - CLEARANCE) * 100) / 100)
  const widthLo = maxTree * 0.55
  const widthHi = maxTree * 0.62

  // Largest package whose minimum tree height fits.
  const fitting = [...packages].reverse().find((p) => p.min <= maxTree + 0.001)
  const tallest = packages[packages.length - 1]!
  let message: string | null = null
  if (!fitting) message = copy.tooLow
  else if (maxTree > tallest.max + 0.3) message = copy.custom
  else if (fitting.max < maxTree - 0.25 && fitting !== tallest) message = copy.between

  const clamp = (n: number) => Math.round(Math.min(MAX, Math.max(MIN, n)) * 100) / 100
  const onType = (v: string) => {
    setDraft(v)
    const n = Number(v.replace(',', '.'))
    if (v.trim() !== '' && Number.isFinite(n) && n >= MIN && n <= MAX) setCeiling(n)
  }
  const commit = () => {
    const n = Number(draft.replace(',', '.'))
    const next = Number.isFinite(n) && draft.trim() !== '' ? clamp(n) : ceiling
    setCeiling(next)
    setDraft(String(next))
  }

  return (
    <div className={`theme-night ${styles.calc}`}>
      <h2>{copy.heading}</h2>
      <div className={styles.control}>
        <label id={`${id}-l`} htmlFor={`${id}-n`}>
          {copy.label}
        </label>
        <div className={styles.inputRow}>
          <input
            className={styles.range}
            type="range"
            min={MIN}
            max={MAX}
            step={0.05}
            value={ceiling}
            onChange={(e) => {
              setCeiling(Number(e.target.value))
              setDraft(e.target.value)
            }}
            aria-labelledby={`${id}-l`}
            aria-valuetext={`${fmt(ceiling)} ${copy.unit}`}
          />
          <input
            id={`${id}-n`}
            className={styles.number}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={draft}
            onChange={(e) => onType(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit()
            }}
            aria-describedby={`${id}-u`}
          />
          <span id={`${id}-u`} className={styles.unit}>
            {copy.unit}
          </span>
        </div>
      </div>
      <dl className={styles.results} aria-live="polite">
        <div className={styles.result}>
          <dt>{copy.resultLabel}</dt>
          <dd>{fmt(maxTree)} m</dd>
        </div>
        <div className={styles.result}>
          <dt>{copy.widthLabel}</dt>
          <dd>
            {widthLo.toFixed(1)}–{widthHi.toFixed(1)} m
          </dd>
        </div>
        <div className={styles.result}>
          <dt>{copy.packageLabel}</dt>
          <dd>{fitting ? <Link href={fitting.href}>{fitting.name}</Link> : <Link href={customHref}>{copy.customLabel}</Link>}</dd>
        </div>
      </dl>
      {message ? <p className={styles.msg}>{message}</p> : null}
    </div>
  )
}
