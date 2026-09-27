const BULBS = 24
const HUES = ['#ffd98a', '#ff6b5e', '#ffe9b8', '#7fd1a8']

/**
 * A string of lights draped across the top of the home hero only — it scrolls
 * away with the hero instead of following the header. Bulbs glow softly and
 * twinkle out of step (still under reduced motion). Pure markup + CSS.
 */
export function HeroGarland() {
  const w = 1000 / BULBS
  const d = `M0 2 ${Array.from({ length: BULBS }, (_, i) => `Q ${(i + 0.5) * w} ${i % 2 ? 14 : 18} ${(i + 1) * w} 2`).join(' ')}`
  return (
    <div className="hero-garland" aria-hidden="true">
      <svg viewBox="0 0 1000 20" preserveAspectRatio="none">
        <path d={d} />
      </svg>
      <div className="hero-garland-bulbs">
        {Array.from({ length: BULBS }, (_, i) => (
          <i key={i} style={{ ['--hue' as string]: HUES[i % 4], ['--t' as string]: `${((i * 7) % 11) * -0.37}s` }} />
        ))}
      </div>
    </div>
  )
}
