/**
 * Line drawing of a package's tree height against a floor and a recommended
 * minimum ceiling (tree + 0.3 m). Drawn to scale: 1 m = 40 units.
 */
export function TreeScale({ height, label, ceilingLabel }: { height: [number, number]; label: string; ceilingLabel: string }) {
  const M = 40
  const floor = 186
  const [min, max] = height
  const topMax = floor - max * M
  const topMin = floor - min * M
  const ceiling = floor - (max + 0.3) * M
  const w = (h: number) => h * M * 0.3 // half-width ≈ 60% of height overall

  // Three tiers, each a triangle, overlapping — reads as a pine, not clip-art.
  const tier = (top: number, bottom: number, half: number) => `M${60 - half} ${bottom} L60 ${top} L${60 + half} ${bottom}`
  const hPx = floor - topMax
  const tiers = [
    tier(topMax, topMax + hPx * 0.42, w(max) * 0.5),
    tier(topMax + hPx * 0.22, topMax + hPx * 0.72, w(max) * 0.78),
    tier(topMax + hPx * 0.48, floor - 8, w(max)),
  ]
  const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1))

  return (
    <svg viewBox="0 0 150 200" className="tree-scale" role="img" aria-label={`${label}: ${min === max ? fmt(min) : `${fmt(min)}–${fmt(max)}`} m. ${ceilingLabel}: ${fmt(max + 0.3)} m`}>
      {/* ceiling */}
      <line x1="4" x2="116" y1={ceiling} y2={ceiling} stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.7" />
      <text x="4" y={ceiling - 6} fontSize="12" fill="currentColor" opacity="0.8">
        {ceilingLabel} ≥ {fmt(max + 0.3)} m
      </text>
      {/* floor */}
      <line x1="4" x2="116" y1={floor} y2={floor} stroke="currentColor" strokeWidth="0.75" />
      {/* tree */}
      <g fill="none" stroke="var(--gold-soft, currentColor)" strokeWidth="1.1" strokeLinejoin="round">
        {tiers.map((d) => (
          <path key={d} d={d} />
        ))}
        <line x1="60" x2="60" y1={floor - 8} y2={floor} />
      </g>
      {/* range band for Gold */}
      {min !== max ? <line x1="126" x2="126" y1={topMin} y2={topMax} stroke="var(--gold-soft, currentColor)" strokeWidth="3" strokeLinecap="round" opacity="0.9" /> : null}
      {/* height rule */}
      <line x1="126" x2="126" y1={topMax} y2={floor} stroke="currentColor" strokeWidth="0.75" />
      <line x1="122" x2="130" y1={topMax} y2={topMax} stroke="currentColor" strokeWidth="0.75" />
      <line x1="122" x2="130" y1={floor} y2={floor} stroke="currentColor" strokeWidth="0.75" />
      <text x="133" y={(topMax + floor) / 2} fontSize="12" fill="currentColor" transform={`rotate(-90 133 ${(topMax + floor) / 2})`} textAnchor="middle" dominantBaseline="hanging">
        {min === max ? `${fmt(min)} m` : `${fmt(min)}–${fmt(max)} m`}
      </text>
    </svg>
  )
}
