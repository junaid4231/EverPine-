/**
 * A short, one-off celebration burst: gold ribbon curls, four-point stars and
 * tiny baubles fly up from a point and fall away (~1.8 s), drawn on a
 * temporary full-screen canvas that removes itself. No dependencies.
 * Does nothing when the visitor prefers reduced motion.
 */
const COLORS = ['#d4b06a', '#e8c98a', '#b8903f', '#a3202a', '#c9433f', '#f3ebdd', '#1f6b4a']

type P = { x: number; y: number; vx: number; vy: number; r: number; vr: number; s: number; c: string; k: 0 | 1 | 2; w: number }

export function celebrate(x: number, y: number) {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const cv = document.createElement('canvas')
  cv.setAttribute('aria-hidden', 'true')
  Object.assign(cv.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '100' })
  cv.width = innerWidth * dpr
  cv.height = innerHeight * dpr
  document.body.appendChild(cv)
  const ctx = cv.getContext('2d')
  if (!ctx) return cv.remove()
  ctx.scale(dpr, dpr)

  const n = innerWidth < 640 ? 70 : 110
  const ps: P[] = Array.from({ length: n }, () => {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1
    const v = 5 + Math.random() * 7
    return {
      x, y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      r: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.35,
      s: 4 + Math.random() * 5,
      c: COLORS[(Math.random() * COLORS.length) | 0]!,
      k: (Math.random() < 0.55 ? 0 : Math.random() < 0.6 ? 1 : 2) as 0 | 1 | 2,
      w: Math.random() * 10,
    }
  })

  const star = (s: number) => {
    ctx.beginPath()
    ctx.moveTo(0, -s)
    ctx.quadraticCurveTo(s * 0.18, -s * 0.18, s, 0)
    ctx.quadraticCurveTo(s * 0.18, s * 0.18, 0, s)
    ctx.quadraticCurveTo(-s * 0.18, s * 0.18, -s, 0)
    ctx.quadraticCurveTo(-s * 0.18, -s * 0.18, 0, -s)
    ctx.fill()
  }

  const start = performance.now()
  const DUR = 1900
  const tick = (now: number) => {
    const t = now - start
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    ctx.globalAlpha = t > DUR - 500 ? Math.max(0, (DUR - t) / 500) : 1
    for (const p of ps) {
      p.vx *= 0.975
      p.vy = p.vy * 0.975 + 0.32
      p.x += p.vx + Math.sin((t / 180) + p.w) * 0.6
      p.y += p.vy
      p.r += p.vr
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      ctx.fillStyle = p.c
      if (p.k === 0) {
        // ribbon curl: a strip that flips as it spins
        ctx.scale(1, Math.cos(t / 90 + p.w))
        ctx.fillRect(-p.s, -p.s * 0.28, p.s * 2, p.s * 0.56)
      } else if (p.k === 1) {
        star(p.s * 0.9)
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, p.s * 0.55, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.55)'
        ctx.beginPath()
        ctx.arc(-p.s * 0.18, -p.s * 0.18, p.s * 0.16, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }
    if (t < DUR) requestAnimationFrame(tick)
    else cv.remove()
  }
  requestAnimationFrame(tick)
}
