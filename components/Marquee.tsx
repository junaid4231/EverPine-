/**
 * A quiet ticker of services: small tracked capitals with a gold four-point
 * star between each. Slow endless drift, pauses on hover, still under reduced
 * motion. The duplicate run is hidden from assistive tech.
 */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const run = (hidden: boolean) => (
    <ul className="marquee-run" role="list" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it}>
          <span>{it}</span>
          <svg className="marquee-star" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 0C5.4 3.2 6.8 4.6 10 5 6.8 5.4 5.4 6.8 5 10 4.6 6.8 3.2 5.4 0 5 3.2 4.6 4.6 3.2 5 0Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" role="region" aria-label={label}>
      <div className="marquee-track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  )
}
