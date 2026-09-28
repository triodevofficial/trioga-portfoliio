import { BRAND, MARK_CENTER, MARK_COLORS, MARK_SEGMENTS, MARK_STROKE, MARK_VIEWBOX } from "@/lib/brand";
import { WORDMARK_NAME } from "@/lib/wordmark.generated";

type SvgProps = { className?: string };

/** Tri-colour triangle. The centre dot uses currentColor (navy on light, white on dark). */
export function LogoMark({ className }: SvgProps) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} role="img" aria-label={BRAND.name}>
      <g className="mark-body" fill="none" strokeWidth={MARK_STROKE} strokeLinecap="round" strokeLinejoin="round">
        {MARK_SEGMENTS.map((d, i) => (
          <path
            key={d}
            d={d}
            stroke={MARK_COLORS[i]}
            pathLength={100}
            className="mark-seg"
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
        <circle {...MARK_CENTER} className="mark-dot" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

/** "TRIOGA" outlined from the brand typeface. Fill is currentColor. */
export function Wordmark({ className }: SvgProps) {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK_NAME.width} ${WORDMARK_NAME.height}`}
      className={className}
      role="img"
      aria-label={BRAND.name}
      fill="currentColor"
    >
      {WORDMARK_NAME.letters.map((l, i) => (
        <path key={i} d={l.d} className="word-letter" style={{ "--i": i } as React.CSSProperties} />
      ))}
    </svg>
  );
}

/** Horizontal lockup: mark and name on one row, vertically centred. */
export function Logo({ className }: SvgProps) {
  return (
    <span className={`inline-flex items-center gap-3 text-navy ${className ?? ""}`}>
      <LogoMark className="h-9 w-auto" />
      <Wordmark className="h-[17px] w-auto" />
    </span>
  );
}
