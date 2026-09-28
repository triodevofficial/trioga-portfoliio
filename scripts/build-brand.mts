/**
 * Regenerates the static brand files (public/brand/*, src/app/icon.svg) from
 * src/lib/brand.ts + src/lib/wordmark.generated.ts, so they never drift from the site logo.
 *   npm run brand
 */
import { writeFileSync } from "node:fs";
import sharp from "sharp";
import { INK, MARK_CENTER, MARK_COLORS, MARK_SEGMENTS, MARK_STROKE } from "../src/lib/brand.ts";
import { WORDMARK_NAME } from "../src/lib/wordmark.generated.ts";

const WHITE = "#FFFFFF";
const n = (v: number) => +v.toFixed(2);

const mark = (dot: string, stroke = MARK_STROKE) =>
  `<g fill="none" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${MARK_SEGMENTS.map(
    (d, i) => `<path d="${d}" stroke="${MARK_COLORS[i]}"/>`,
  ).join("")}</g><circle cx="${MARK_CENTER.cx}" cy="${MARK_CENTER.cy}" r="${MARK_CENTER.r}" fill="${dot}"/>`;

const name = (fill: string) => `<g fill="${fill}">${WORDMARK_NAME.letters.map((l) => `<path d="${l.d}"/>`).join("")}</g>`;

const svg = (w: number, h: number, body: string, bg?: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(w)} ${n(h)}">${bg ? `<rect width="${n(w)}" height="${n(h)}" fill="${bg}"/>` : ""}${body}</svg>\n`;

/** Mark scaled so it spans a block of height h, top-left at (x, y). Returns [svg, width]. */
function markBlock(x: number, y: number, h: number, dot: string): [string, number] {
  const s = h / 67; // visual mark height 8.5 → 75.5
  return [`<g transform="translate(${n(x - 11.86 * s)} ${n(y - 8.5 * s)}) scale(${n(s)})">${mark(dot)}</g>`, 76.3 * s];
}

// Horizontal lockup: mark and name on one row, vertically centred.
function horizontal(ink: string) {
  const pad = 4;
  const markH = WORDMARK_NAME.height * 2; // mark is twice the cap height
  const [m, mw] = markBlock(pad, pad, markH, ink);
  const x = pad + mw + markH * 0.3;
  const y = pad + (markH - WORDMARK_NAME.height) / 2;
  return svg(x + WORDMARK_NAME.width + pad, markH + pad * 2, m + `<g transform="translate(${n(x)} ${n(y)})">${name(ink)}</g>`);
}

// Stacked lockup on a square (social avatars).
function stacked(bg: string, ink: string) {
  const S = 400;
  const [m] = markBlock(S / 2 - (76.3 * 1.9) / 2, 90, 67 * 1.9, ink);
  const scale = Math.min(0.85, 280 / WORDMARK_NAME.width);
  const tx = S / 2 - (WORDMARK_NAME.width * scale) / 2;
  return svg(S, S, m + `<g transform="translate(${n(tx)} 262) scale(${n(scale)})">${name(ink)}</g>`, bg);
}

const out: Record<string, string> = {
  "public/brand/trioga-mark.svg": svg(88, 80, `<g transform="translate(-6 -2)">${mark(INK)}</g>`),
  "public/brand/trioga-mark-on-dark.svg": svg(88, 80, `<g transform="translate(-6 -2)">${mark(WHITE)}</g>`),
  "public/brand/trioga-wordmark.svg": svg(WORDMARK_NAME.width, WORDMARK_NAME.height, name(INK)),
  "public/brand/trioga-logo-on-light.svg": horizontal(INK),
  "public/brand/trioga-logo-on-dark.svg": horizontal(WHITE),
  "public/brand/trioga-logo-stacked.svg": stacked("#FFFFFF", INK),
  "public/brand/trioga-logo-stacked-dark.svg": stacked("#0B1B2E", WHITE),
  "src/app/icon.svg": svg(
    100,
    100,
    `<rect width="100" height="100" rx="24" fill="#FFFFFF"/><g transform="translate(50 50) scale(.9) translate(-50 -44)">${mark(INK, 9)}</g>`,
  ),
};

for (const [file, content] of Object.entries(out)) {
  writeFileSync(file, content);
  console.log("wrote", file);
}

// High-res PNGs for places that don't take SVG (social profiles, documents, email signatures).
for (const f of ["trioga-logo-on-light", "trioga-logo-on-dark", "trioga-logo-stacked", "trioga-logo-stacked-dark"]) {
  await sharp(`public/brand/${f}.svg`, { density: 600 }).png().toFile(`public/brand/${f}.png`);
  console.log("wrote", `public/brand/${f}.png`);
}
