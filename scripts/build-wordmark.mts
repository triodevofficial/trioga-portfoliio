/**
 * Builds the TRIOGA wordmark from a real typeface, converted to vector outlines
 * (crisp at every size, no font download needed on the site).
 *
 *   npm run brand:names              → public/brand/name-options/ (gallery of typeface candidates)
 *   npm run brand:names -- sora      → also writes src/lib/wordmark.generated.ts from that option
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import opentype from "opentype.js";
import sharp from "sharp";

type Option = { key: string; label: string; file: string; tagFile: string; tracking: number };

const fs = (pkg: string, weight: number) => `node_modules/@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff`;

// Wide / geometric "tech" faces, in the spirit of the reference logo.
const OPTIONS: Option[] = [
  { key: "michroma", label: "Michroma", file: fs("michroma", 400), tagFile: fs("michroma", 400), tracking: 0.14 },
  { key: "syncopate", label: "Syncopate Bold", file: fs("syncopate", 700), tagFile: fs("syncopate", 400), tracking: 0.1 },
  { key: "krona-one", label: "Krona One", file: fs("krona-one", 400), tagFile: fs("montserrat", 500), tracking: 0.12 },
  { key: "unbounded", label: "Unbounded SemiBold", file: fs("unbounded", 600), tagFile: fs("unbounded", 400), tracking: 0.12 },
  { key: "lexend-exa", label: "Lexend Exa SemiBold", file: fs("lexend-exa", 600), tagFile: fs("lexend-exa", 400), tracking: 0.08 },
  { key: "orbitron", label: "Orbitron Bold", file: fs("orbitron", 700), tagFile: fs("orbitron", 500), tracking: 0.16 },
  { key: "oxanium", label: "Oxanium Bold", file: fs("oxanium", 700), tagFile: fs("oxanium", 500), tracking: 0.22 },
  { key: "chakra-petch", label: "Chakra Petch SemiBold", file: fs("chakra-petch", 600), tagFile: fs("chakra-petch", 500), tracking: 0.24 },
  { key: "syne", label: "Syne ExtraBold", file: fs("syne", 800), tagFile: fs("syne", 600), tracking: 0.14 },
  { key: "audiowide", label: "Audiowide", file: fs("audiowide", 400), tagFile: fs("montserrat", 500), tracking: 0.14 },
  { key: "montserrat-alternates", label: "Montserrat Alternates SemiBold", file: fs("montserrat-alternates", 600), tagFile: fs("montserrat", 500), tracking: 0.24 },
  { key: "exo-2", label: "Exo 2 Bold", file: fs("exo-2", 700), tagFile: fs("exo-2", 500), tracking: 0.22 },
];

const NAME = "TRIOGA";
const TAGLINE = "SOFTWARE STUDIO";
const CAP = 40; // name cap height in output units
const TAG_CAP = 7.5; // tagline cap height
const TAG_GAP = 10; // space between name baseline and tagline cap line

const n = (v: number) => +v.toFixed(2);

function load(file: string) {
  const buf = readFileSync(file);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

function capHeight(font: opentype.Font) {
  const os2 = font.tables.os2 as { sCapHeight?: number } | undefined;
  return os2?.sCapHeight || font.charToGlyph("H").getBoundingBox().y2;
}

/** Lays out text so caps span y ∈ [top, top+cap]. Returns one path per glyph plus the ink width. */
function layout(font: opentype.Font, text: string, cap: number, top: number, tracking: number, targetWidth?: number) {
  const size = (cap / capHeight(font)) * font.unitsPerEm;
  const scale = size / font.unitsPerEm;
  // Plain caps need no shaping; charToGlyph also avoids GSUB lookups opentype.js can't handle.
  const glyphs = [...text].map((c) => font.charToGlyph(c));

  const advances = glyphs.map((g, i) => {
    const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) : 0;
    return ((g.advanceWidth ?? 0) + kern) * scale;
  });
  const track = tracking * cap;

  // First pass at natural tracking to measure ink bounds.
  const place = (extra: number) => {
    let x = 0;
    return glyphs.map((g, i) => {
      const p = g.getPath(x, top + cap, size);
      x += advances[i] + track + extra;
      return { char: text[i], path: p, box: p.getBoundingBox() };
    });
  };

  let placed = place(0);
  const inked = placed.filter((p) => p.char !== " ");
  const inkLeft = inked[0].box.x1;
  const inkWidth = inked[inked.length - 1].box.x2 - inkLeft;

  if (targetWidth) {
    // Justify: spread the leftover space evenly between glyphs.
    const extra = (targetWidth - inkWidth) / (glyphs.length - 1);
    placed = place(extra);
  }

  const left = placed.find((p) => p.char !== " ")!.box.x1;
  const letters = placed
    .filter((p) => p.char !== " ")
    .map((p) => {
      // Serialise commands ourselves, shifting so ink starts at x = 0
      // (opentype.js 2.0's Path.toPathData mangles some glyphs).
      const X = (v: number) => n(v - left);
      const Y = (v: number) => n(v);
      const d = p.path.commands
        .map((c) => {
          switch (c.type) {
            case "M":
            case "L":
              return `${c.type}${X(c.x)} ${Y(c.y)}`;
            case "Q":
              return `Q${X(c.x1)} ${Y(c.y1)} ${X(c.x)} ${Y(c.y)}`;
            case "C":
              return `C${X(c.x1)} ${Y(c.y1)} ${X(c.x2)} ${Y(c.y2)} ${X(c.x)} ${Y(c.y)}`;
            default:
              return "Z";
          }
        })
        .join("");
      return { char: p.char, d };
    });
  return { letters, width: n(targetWidth ?? inkWidth) };
}

// ── Mark (tri-colour, option 04) ──
const MARK_SEGMENTS = ["M34.76 38.4L50 12L62.47 33.6", "M69.4 45.6L84.64 72L59.7 72", "M45.84 72L15.36 72L27.83 50.4"];
const MARK_COLORS = ["#7C5CFF", "#3B82F6", "#06B6D4"];

const markSvg = (dot: string) =>
  `<g fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${MARK_SEGMENTS.map((d, i) => `<path d="${d}" stroke="${MARK_COLORS[i]}"/>`).join("")}</g><circle cx="50" cy="52" r="5.5" fill="${dot}"/>`;

function build(opt: Option) {
  const font = load(opt.file);
  const tagFont = load(opt.tagFile);
  const name = layout(font, NAME, CAP, 0, opt.tracking);
  const tagTop = CAP + TAG_GAP;
  const tag = layout(tagFont, TAGLINE, TAG_CAP, tagTop, 0.3, name.width);
  return { name, tag, height: n(tagTop + TAG_CAP) };
}

function lockupSvg(opt: Option, ink: string, muted: string, dot: string, bg?: string) {
  const { name, tag, height } = build(opt);
  // Mark sized so the triangle spans the full name + tagline block.
  const markH = 67; // visual height of mark in its own units (8.5 → 75.5)
  const s = (height + 6) / markH;
  const markW = 76.3 * s;
  const gap = 20;
  const pad = 24;
  const W = n(pad * 2 + markW + gap + name.width);
  const H = n(pad * 2 + height + 6);
  const mark = `<g transform="translate(${n(pad - 11.86 * s)} ${n(pad - 8.5 * s)}) scale(${n(s)})">${markSvg(dot)}</g>`;
  const x = n(pad + markW + gap);
  const body =
    `<g transform="translate(${x} ${pad + 3})" fill="${ink}">${name.letters.map((l) => `<path d="${l.d}"/>`).join("")}</g>` +
    `<g transform="translate(${x} ${pad + 3})" fill="${muted}">${tag.letters.map((l) => `<path d="${l.d}"/>`).join("")}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W * 3}" height="${H * 3}">${bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ""}${mark}${body}</svg>\n`;
}

// ── Gallery of options ──
const OUT = "public/brand/name-options";
mkdirSync(OUT, { recursive: true });
const cards: string[] = [];
for (const [i, opt] of OPTIONS.entries()) {
  const base = `${String(i + 1).padStart(2, "0")}-${opt.key}`;
  const light = lockupSvg(opt, "#0B2F57", "#6B7686", "#0B2F57");
  const dark = lockupSvg(opt, "#FFFFFF", "#9AA5B4", "#FFFFFF", "#0B1B2E");
  writeFileSync(`${OUT}/${base}.svg`, light);
  writeFileSync(`${OUT}/${base}-dark.svg`, dark);
  await sharp(Buffer.from(light)).png().toFile(`${OUT}/${base}.png`);
  cards.push(
    `<figure><div class="l"><img src="${base}.svg" alt=""></div><div class="d"><img src="${base}-dark.svg" alt=""></div>` +
      `<div class="sm"><img src="${base}.svg" alt="" style="height:44px"><span>header size</span></div><figcaption><b>${i + 1}. ${opt.label}</b></figcaption></figure>`,
  );
  console.log("wrote", base);
}
writeFileSync(
  `${OUT}/index.html`,
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Trioga name styles</title><style>
*{box-sizing:border-box}body{margin:0;background:#f4f6f9;color:#0b2f57;font:15px/1.5 system-ui,Segoe UI,sans-serif;padding:40px 16px}
h1{max-width:1200px;margin:0 auto 6px;font-weight:600}p{max-width:1200px;margin:0 auto 28px;color:#6b7686}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,520px),1fr));gap:20px;max-width:1200px;margin:auto}
figure{margin:0;background:#fff;border:1px solid #e3e8ef;border-radius:14px;overflow:hidden}
.l,.d{display:grid;place-items:center;padding:28px}.d{background:#0b1b2e}.l img,.d img{width:min(100%,380px);height:auto}
.sm{display:flex;align-items:center;gap:16px;padding:14px 20px;border-top:1px solid #e3e8ef}.sm img{width:auto}.sm span{color:#6b7686;font-size:12px}
figcaption{padding:12px 20px;border-top:1px solid #e3e8ef}
</style></head><body><h1>TRIOGA — name styles</h1><p>Your favourite lockup (tri-colour mark + tagline) with the name set in 8 professional typefaces, converted to crisp outlines.</p><main>${cards.join("")}</main></body></html>\n`,
);

// ── Optional: write the chosen style for the site ──
const pick = process.argv[2];
if (pick) {
  const opt = OPTIONS.find((o) => o.key === pick);
  if (!opt) throw new Error(`Unknown option "${pick}". Use one of: ${OPTIONS.map((o) => o.key).join(", ")}`);
  const { name, tag, height } = build(opt);
  writeFileSync(
    "src/lib/wordmark.generated.ts",
    `// Generated by scripts/build-wordmark.mts (${opt.label}). Do not edit by hand - run \`npm run brand:names -- ${opt.key}\`.\n` +
      `export const WORDMARK_FONT = ${JSON.stringify(opt.label)};\n` +
      `export const WORDMARK_NAME = ${JSON.stringify({ width: name.width, height: CAP, letters: name.letters }, null, 2)} as const;\n` +
      `export const WORDMARK_TAGLINE = ${JSON.stringify({ top: CAP + TAG_GAP, height: TAG_CAP, letters: tag.letters })} as const;\n` +
      `export const WORDMARK_LOCKUP_HEIGHT = ${height};\n`,
  );
  console.log(`wrote src/lib/wordmark.generated.ts (${opt.label})`);
}
