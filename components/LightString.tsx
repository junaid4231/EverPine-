/**
 * A single hairline with warm "bulbs" — the icicle lights from the villa photograph,
 * reduced to a divider. Bulbs warm up once on reveal (CSS only; static under reduced motion).
 */
export function LightString({ count = 17, className }: { count?: number; className?: string }) {
  const bulbs = Array.from({ length: count }, (_, i) => i)
  return (
    <div className={`light-string ${className ?? ''}`} aria-hidden="true">
      <svg viewBox={`0 0 ${count * 20} 24`} preserveAspectRatio="none">
        <path d={`M0 4 ${bulbs.map((i) => `Q ${i * 20 + 10} ${i % 2 ? 9 : 12} ${i * 20 + 20} 4`).join(' ')}`} fill="none" stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="light-string-bulbs">
        {bulbs.map((i) => (
          <span key={i} style={{ ['--i' as string]: i }} />
        ))}
      </div>
    </div>
  )
}
