/**
 * A lacquer-red satin ribbon with a tied bow — the moment before the gift is opened.
 * Used as the threshold into the packages. Decorative.
 */
export function Ribbon({ className }: { className?: string }) {
  return (
    <div className={`ribbon ${className ?? ''}`} aria-hidden="true" data-reveal>
      <span className="ribbon-band" />
      <svg className="ribbon-bow" viewBox="0 0 160 96" width="160" height="96">
        <defs>
          <linearGradient id="rb-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d23a44" />
            <stop offset="0.45" stopColor="#a3202a" />
            <stop offset="1" stopColor="#5f0d14" />
          </linearGradient>
          <linearGradient id="rb-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d23a44" />
            <stop offset="0.45" stopColor="#a3202a" />
            <stop offset="1" stopColor="#5f0d14" />
          </linearGradient>
        </defs>
        {/* tails */}
        <path d="M74 50 L52 94 L62 88 L68 96 L80 54Z" fill="url(#rb-a)" />
        <path d="M86 50 L108 94 L98 88 L92 96 L80 54Z" fill="url(#rb-b)" />
        {/* loops */}
        <path d="M78 44 C54 10 8 8 14 40 C18 64 56 56 78 48Z" fill="url(#rb-a)" />
        <path d="M82 44 C106 10 152 8 146 40 C142 64 104 56 82 48Z" fill="url(#rb-b)" />
        <path d="M70 42 C52 24 30 24 30 38" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="2" strokeLinecap="round" />
        <path d="M90 42 C108 24 130 24 130 38" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeWidth="2" strokeLinecap="round" />
        {/* knot */}
        <rect x="70" y="36" width="20" height="20" rx="6" fill="url(#rb-a)" />
        <rect x="74" y="39" width="6" height="14" rx="3" fill="rgb(255 255 255 / 0.18)" />
      </svg>
    </div>
  )
}
