/**
 * Hanging baubles on fine threads, swaying gently — a lobby installation in miniature.
 * Pure SVG + CSS (compositor-only rotation), decorative and hidden from assistive tech.
 * Positions are deterministic so server and client markup always match.
 */
const PALETTE = [
  { base: '#a3202a', light: '#e2545c', dark: '#5a0c12' }, // lacquer
  { base: '#c9a45a', light: '#fbe7b5', dark: '#6e5220' }, // gold
  { base: '#1f5a43', light: '#5fa585', dark: '#0b2a1f' }, // emerald
  { base: '#d9d4cb', light: '#ffffff', dark: '#8a8479' }, // frost
]

// Weighted to the right so they hang over photographs, never over headlines (which sit left).
const LAYOUT = [
  { x: 97, len: 44, r: 11, c: 1 },
  { x: 60, len: 118, r: 20, c: 0 },
  { x: 90, len: 150, r: 24, c: 0 },
  { x: 68, len: 58, r: 12, c: 3 },
  { x: 79, len: 92, r: 16, c: 2 },
  { x: 3, len: 30, r: 9, c: 1 },
  { x: 53, len: 34, r: 9, c: 1 },
]

export function Ornaments({ count = 5, className, idPrefix = 'orn' }: { count?: number; className?: string; idPrefix?: string }) {
  const items = LAYOUT.slice(0, Math.min(count, LAYOUT.length))
  return (
    <div className={`ornaments ${className ?? ''}`} aria-hidden="true">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {PALETTE.map((p, i) => (
            <radialGradient key={i} id={`${idPrefix}-g${i}`} cx="35%" cy="32%" r="75%">
              <stop offset="0%" stopColor={p.light} />
              <stop offset="45%" stopColor={p.base} />
              <stop offset="100%" stopColor={p.dark} />
            </radialGradient>
          ))}
          <linearGradient id={`${idPrefix}-cap`} x1="0" x2="1">
            <stop offset="0%" stopColor="#7a5a22" />
            <stop offset="50%" stopColor="#f3dca6" />
            <stop offset="100%" stopColor="#7a5a22" />
          </linearGradient>
        </defs>
      </svg>
      {items.map((o, i) => {
        const w = o.r * 2 + 4
        const h = o.len + o.r * 2 + 12
        return (
          <span
            key={i}
            className="orn"
            style={{
              left: `${o.x}%`,
              ['--dur' as string]: `${5.5 + (i % 3) * 1.3}s`,
              ['--delay' as string]: `${-i * 0.9}s`,
              ['--amp' as string]: `${2.2 + (i % 2) * 1.4}deg`,
            }}
          >
            <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
              <line x1={w / 2} x2={w / 2} y1="0" y2={o.len} stroke="rgb(236 214 164 / 0.55)" strokeWidth="1" />
              <circle cx={w / 2} cy={o.len + 2} r="2.4" fill="none" stroke="#d4b06a" strokeWidth="1" />
              <rect x={w / 2 - o.r * 0.32} y={o.len + 4} width={o.r * 0.64} height={Math.max(4, o.r * 0.34)} rx="1.2" fill={`url(#${idPrefix}-cap)`} />
              <circle cx={w / 2} cy={o.len + 8 + o.r} r={o.r} fill={`url(#${idPrefix}-g${o.c})`} />
              <ellipse cx={w / 2 - o.r * 0.35} cy={o.len + 8 + o.r * 0.6} rx={o.r * 0.22} ry={o.r * 0.13} fill="rgb(255 255 255 / 0.55)" transform={`rotate(-30 ${w / 2 - o.r * 0.35} ${o.len + 8 + o.r * 0.6})`} />
            </svg>
          </span>
        )
      })}
    </div>
  )
}
