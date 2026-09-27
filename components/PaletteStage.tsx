'use client'

import { useRef, useState, type ReactNode } from 'react'

export interface PaletteOption {
  id: string
  name: string
  swatches: string[]
}

/**
 * "Choose your palette": swatch buttons cross-fade server-rendered photographs
 * (passed as children, one per palette, each carrying data-palette).
 * Direct attribute toggling keeps interaction cheap.
 */
export function PaletteStage({ options, children, legend }: { options: PaletteOption[]; children: ReactNode; legend: string }) {
  const [active, setActive] = useState(options[0]?.id ?? '')
  const ref = useRef<HTMLDivElement>(null)
  const choose = (id: string) => {
    setActive(id)
    ref.current?.querySelectorAll<HTMLElement>('[data-palette]').forEach((el) => {
      el.toggleAttribute('data-on', el.dataset.palette === id)
    })
  }
  return (
    <div ref={ref} className="palette-stage">
      {children}
      <div className="palette-picker" role="radiogroup" aria-label={legend}>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active === o.id}
            className="palette-chip"
            onClick={() => choose(o.id)}
            onKeyDown={(e) => {
              const i = options.findIndex((x) => x.id === active)
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault()
                const n = options[(i + 1) % options.length]!
                choose(n.id)
                ;(e.currentTarget.parentElement?.children[(i + 1) % options.length] as HTMLElement | undefined)?.focus()
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault()
                const j = (i - 1 + options.length) % options.length
                choose(options[j]!.id)
                ;(e.currentTarget.parentElement?.children[j] as HTMLElement | undefined)?.focus()
              }
            }}
            tabIndex={active === o.id ? 0 : -1}
          >
            <span className="palette-dots" aria-hidden="true">
              {o.swatches.map((c) => (
                <span key={c} style={{ backgroundColor: c }} />
              ))}
            </span>
            <span>{o.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
