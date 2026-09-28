/**
 * Trioga brand geometry — the single source of truth for the logo.
 *
 * The mark is an equilateral triangle (circumradius 40, centroid 50,52) split
 * into three identical corner strokes, each in its own colour. The gaps sit
 * off-centre on each side, so the mark has 120° rotational symmetry: spinning
 * it by 120° lands on the same shape (used by the loader).
 *
 * The wordmark (name + tagline) is outlined from a real typeface by
 * scripts/build-wordmark.mts → ./wordmark.generated.ts.
 */

export const BRAND = {
  name: "Trioga",
  tagline: "Software Studio",
} as const;

/** Corner strokes of the mark, in a 100×100 coordinate space. */
export const MARK_SEGMENTS = [
  "M34.76 38.4L50 12L62.47 33.6",
  "M69.4 45.6L84.64 72L59.7 72",
  "M45.84 72L15.36 72L27.83 50.4",
] as const;

/** One colour per stroke: top (violet), bottom-right (blue), bottom-left (cyan). */
export const MARK_COLORS = ["#7C5CFF", "#3B82F6", "#06B6D4"] as const;

export const MARK_CENTER = { cx: 50, cy: 52, r: 5.5 } as const;
export const MARK_VIEWBOX = "6 2 88 80";
export const MARK_STROKE = 7;

export const INK = "#0B2F57"; // navy: name + dot on light backgrounds
