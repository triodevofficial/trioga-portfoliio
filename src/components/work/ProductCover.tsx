import type { Product, ProductCover as CoverKind } from "@/content/work";

/**
 * Product thumbnail. Uses the real screenshot when `product.image` is set,
 * otherwise a built-in SVG illustration (scales crisply from card to hero size).
 */
export function ProductCover({ product, className = "" }: { product: Product; className?: string }) {
  if (product.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- swap for next/image once real assets exist
      <img src={product.image} alt={`${product.name} — ${product.title}`} className={`h-full w-full object-cover ${className}`} />
    );
  }
  const Art = covers[product.cover];
  return (
    <svg
      viewBox="0 0 640 400"
      className={`h-full w-full ${className}`}
      role="img"
      aria-label={`${product.name} — ${product.title}`}
      style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      <Art />
    </svg>
  );
}

/* ───────── shared bits ───────── */

const NAVY = "#0B2F57";
const INK = "#0F172A";
const MUTED = "#6B7686";
const LINE = "#E3E8EF";
const SOFT = "#F4F6F9";

function Bg({ from, to, id }: { from: string; to: string; id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <filter id={`${id}-sh`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#0B2F57" floodOpacity="0.16" />
        </filter>
      </defs>
      <rect width="640" height="400" fill={`url(#${id})`} />
    </>
  );
}

const T = (props: React.SVGProps<SVGTextElement>) => <text fill={INK} fontSize="12" {...props} />;

/* ───────── 1. QR generator ───────── */

function qrCells(size = 25, seed = 7) {
  let s = seed;
  const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  const finder = (x: number, y: number) =>
    [
      [0, 0],
      [size - 7, 0],
      [0, size - 7],
    ].some(([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7);
  const cells: [number, number][] = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!finder(x, y) && rnd() > 0.52) cells.push([x, y]);
  return cells;
}
const QR = qrCells();

function Finder({ x, y, c }: { x: number; y: number; c: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={c * 7} height={c * 7} rx={c * 1.6} fill={NAVY} />
      <rect x={c} y={c} width={c * 5} height={c * 5} rx={c * 1.1} fill="#fff" />
      <rect x={c * 2} y={c * 2} width={c * 3} height={c * 3} rx={c * 0.8} fill="#1C95D4" />
    </g>
  );
}

function QrCover() {
  const c = 7;
  return (
    <>
      <Bg id="qr-bg" from="#E8F3FC" to="#EEF0FF" />
      {/* QR card */}
      <g filter="url(#qr-bg-sh)">
        <rect x="56" y="48" width="252" height="304" rx="20" fill="#fff" />
      </g>
      <g transform="translate(94 78)">
        {QR.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x * c} y={y * c} width={c - 0.6} height={c - 0.6} rx="1.6" fill={NAVY} />
        ))}
        <Finder x={0} y={0} c={c} />
        <Finder x={18 * c} y={0} c={c} />
        <Finder x={0} y={18 * c} c={c} />
        <rect x={10 * c} y={10 * c} width={5 * c} height={5 * c} rx="8" fill="#fff" />
        <rect x={10.6 * c} y={10.6 * c} width={3.8 * c} height={3.8 * c} rx="7" fill="#7C5CFF" />
        <text x={12.5 * c} y={13.1 * c} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">
          Q
        </text>
      </g>
      <rect x="84" y="296" width="92" height="28" rx="14" fill="#EAF6EF" />
      <circle cx="100" cy="310" r="4" fill="#10B981" />
      <T x="110" y="314" fontSize="12" fontWeight="600" fill="#0F766E">
        Dynamic
      </T>
      <T x="196" y="314" fontSize="12" fill={MUTED}>
        qr.link/menu
      </T>

      {/* Static / Dynamic toggle */}
      <g filter="url(#qr-bg-sh)">
        <rect x="340" y="48" width="244" height="58" rx="16" fill="#fff" />
      </g>
      <rect x="352" y="60" width="220" height="34" rx="11" fill={SOFT} />
      <rect x="464" y="63" width="105" height="28" rx="9" fill={NAVY} />
      <T x="408" y="82" textAnchor="middle" fontWeight="600" fill={MUTED}>
        Static
      </T>
      <T x="516" y="82" textAnchor="middle" fontWeight="600" fill="#fff">
        Dynamic
      </T>

      {/* Scan analytics */}
      <g filter="url(#qr-bg-sh)">
        <rect x="340" y="124" width="244" height="150" rx="16" fill="#fff" />
      </g>
      <T x="358" y="152" fontSize="12" fill={MUTED}>
        Scans this week
      </T>
      <T x="358" y="180" fontSize="24" fontWeight="700" fill={NAVY}>
        2,418
      </T>
      <T x="440" y="179" fontSize="12" fontWeight="600" fill="#10B981">
        ▲ 18%
      </T>
      {[28, 44, 36, 58, 50, 72, 64].map((h, i) => (
        <rect key={i} x={360 + i * 30} y={256 - h} width="18" height={h} rx="4" fill={i === 5 ? "#1C95D4" : "#CFE7F6"} />
      ))}

      {/* Edit destination */}
      <g filter="url(#qr-bg-sh)">
        <rect x="340" y="292" width="244" height="60" rx="16" fill="#fff" />
      </g>
      <T x="358" y="316" fontSize="11" fill={MUTED}>
        Destination · editable anytime
      </T>
      <T x="358" y="336" fontSize="13" fontWeight="600">
        yourbrand.com/offer
      </T>
      <circle cx="560" cy="322" r="11" fill="#E8F3FC" />
      <path d="M555 324.5l2.8-.6 5.4-5.4a1.5 1.5 0 00-2.1-2.1l-5.4 5.4-.7 2.7z" fill="none" stroke="#1C95D4" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  );
}

/* ───────── 2. Room & hostel finder ───────── */

function Phone({ x, y, w = 196, h = 336, children, id }: { x: number; y: number; w?: number; h?: number; children: React.ReactNode; id: string }) {
  return (
    <g>
      <g filter={`url(#${id}-sh)`}>
        <rect x={x} y={y} width={w} height={h} rx="30" fill={NAVY} />
      </g>
      <rect x={x + 7} y={y + 7} width={w - 14} height={h - 14} rx="24" fill="#fff" />
      <rect x={x + w / 2 - 26} y={y + 14} width="52" height="7" rx="3.5" fill={NAVY} />
      <svg x={x + 7} y={y + 7} width={w - 14} height={h - 14} overflow="hidden">
        {children}
      </svg>
    </g>
  );
}

function Pin({ x, y, label, active }: { x: number; y: number; label: string; active?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-30" y="-30" width="60" height="26" rx="13" fill={active ? NAVY : "#fff"} stroke={active ? NAVY : LINE} />
      <path d="M-6 -5 L0 3 L6 -5 Z" fill={active ? NAVY : "#fff"} />
      <text x="0" y="-12" textAnchor="middle" fontSize="12" fontWeight="700" fill={active ? "#fff" : NAVY}>
        {label}
      </text>
    </g>
  );
}

function StayCover() {
  return (
    <>
      <Bg id="stay-bg" from="#E6F7F1" to="#E9F4F7" />
      {/* map */}
      <g opacity="0.9">
        <path d="M250 0 C 330 120, 420 140, 640 170" stroke="#fff" strokeWidth="18" fill="none" />
        <path d="M380 400 C 400 280, 480 220, 640 250" stroke="#fff" strokeWidth="14" fill="none" />
        <path d="M300 250 L640 330 M470 0 L520 400" stroke="#fff" strokeWidth="10" fill="none" />
        <rect x="520" y="40" width="80" height="60" rx="10" fill="#D5EFE3" />
        <rect x="300" y="300" width="70" height="60" rx="10" fill="#D5EFE3" />
      </g>
      <Pin x={420} y={120} label="₹5.5k" />
      <Pin x={560} y={220} label="₹4.2k" active />
      <Pin x={440} y={300} label="₹7k" />
      <circle cx="505" cy="180" r="9" fill="#1C95D4" stroke="#fff" strokeWidth="4" />

      <Phone x={70} y={32} id="stay-bg">
        <rect x="12" y="30" width="158" height="30" rx="15" fill={SOFT} />
        <circle cx="30" cy="45" r="5" fill="none" stroke={MUTED} strokeWidth="1.6" />
        <T x="42" y="49" fontSize="11" fill={MUTED}>
          Rooms &amp; hostels nearby
        </T>
        {["All", "Hostel", "PG", "Room"].map((c, i) => (
          <g key={c}>
            <rect x={12 + i * 40} y="70" width="36" height="20" rx="10" fill={i === 1 ? NAVY : SOFT} />
            <T x={30 + i * 40} y="84" fontSize="9.5" textAnchor="middle" fontWeight="600" fill={i === 1 ? "#fff" : MUTED}>
              {c}
            </T>
          </g>
        ))}
        <defs>
          <linearGradient id="stay-img" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#A7F3D0" />
            <stop offset="1" stopColor="#7DD3FC" />
          </linearGradient>
        </defs>
        <rect x="12" y="100" width="158" height="92" rx="14" fill="url(#stay-img)" />
        <rect x="120" y="108" width="42" height="18" rx="9" fill="#fff" />
        <T x="141" y="121" fontSize="10" textAnchor="middle" fontWeight="700">
          ★ 4.6
        </T>
        <T x="14" y="212" fontSize="13" fontWeight="700" fill={NAVY}>
          Sunrise Hostel
        </T>
        <T x="14" y="229" fontSize="10.5" fill={MUTED}>
          Shared · Food · Wi-Fi · 0.8 km
        </T>
        <T x="14" y="249" fontSize="13" fontWeight="700" fill="#059669">
          ₹4,200
          <tspan fontSize="10" fontWeight="500" fill={MUTED}>
            {" "}
            /month
          </tspan>
        </T>
        <rect x="12" y="262" width="158" height="34" rx="17" fill={NAVY} />
        <T x="91" y="283" fontSize="11.5" textAnchor="middle" fontWeight="600" fill="#fff">
          Request a visit
        </T>
      </Phone>

      {/* owner notification */}
      <g filter="url(#stay-bg-sh)">
        <rect x="300" y="30" width="238" height="62" rx="16" fill="#fff" />
      </g>
      <circle cx="326" cy="61" r="14" fill="#DCFCE7" />
      <T x="326" y="66" fontSize="13" textAnchor="middle" fontWeight="700" fill="#059669">
        R
      </T>
      <T x="350" y="56" fontSize="12" fontWeight="700">
        New enquiry
      </T>
      <T x="350" y="74" fontSize="11" fill={MUTED}>
        Rahul wants to visit tomorrow
      </T>
    </>
  );
}

/* ───────── 3. Expense tracker ───────── */

function Donut({ cx, cy, r, parts }: { cx: number; cy: number; r: number; parts: [number, string][] }) {
  const C = 2 * Math.PI * r;
  // Start offset of each slice = sum of the slices before it.
  const starts = parts.map((_, i) => parts.slice(0, i).reduce((sum, [v]) => sum + v, 0));
  return (
    <g transform={`rotate(-90 ${cx} ${cy})`}>
      {parts.map(([v, color], i) => (
        <circle
          key={color}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="18"
          strokeDasharray={`${v * C - 3} ${C}`}
          strokeDashoffset={-starts[i] * C}
        />
      ))}
    </g>
  );
}

function ExpenseCover() {
  const tx = [
    ["Groceries", "Food", "-₹1,240", "#F43F5E"],
    ["Fuel", "Travel", "-₹800", "#F59E0B"],
    ["Salary", "Income", "+₹42,000", "#10B981"],
  ];
  return (
    <>
      <Bg id="exp-bg" from="#F1ECFF" to="#EAF1FF" />
      <Phone x={84} y={32} id="exp-bg">
        <defs>
          <linearGradient id="exp-card" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0B2F57" />
            <stop offset="1" stopColor="#3B5BDB" />
          </linearGradient>
        </defs>
        <T x="14" y="44" fontSize="12" fontWeight="700" fill={NAVY}>
          This month
        </T>
        <rect x="12" y="54" width="158" height="96" rx="16" fill="url(#exp-card)" />
        <T x="26" y="78" fontSize="10.5" fill="#C7D2FE">
          Balance
        </T>
        <T x="26" y="102" fontSize="22" fontWeight="700" fill="#fff">
          ₹24,850
        </T>
        <T x="26" y="134" fontSize="10" fill="#86EFAC">
          ▲ ₹42,000
        </T>
        <T x="100" y="134" fontSize="10" fill="#FDA4AF">
          ▼ ₹17,150
        </T>
        <T x="14" y="176" fontSize="11" fontWeight="700" fill={NAVY}>
          Today
        </T>
        {tx.map(([name, cat, amt, color], i) => (
          <g key={name} transform={`translate(12 ${186 + i * 44})`}>
            <rect width="158" height="38" rx="12" fill={SOFT} />
            <circle cx="19" cy="19" r="10" fill={color} opacity="0.18" />
            <circle cx="19" cy="19" r="4" fill={color} />
            <T x="36" y="16" fontSize="11" fontWeight="600">
              {name}
            </T>
            <T x="36" y="30" fontSize="9.5" fill={MUTED}>
              {cat}
            </T>
            <T x="148" y="23" fontSize="11" fontWeight="700" textAnchor="end" fill={amt.startsWith("+") ? "#059669" : INK}>
              {amt}
            </T>
          </g>
        ))}
      </Phone>

      {/* category chart */}
      <g filter="url(#exp-bg-sh)">
        <rect x="320" y="48" width="264" height="190" rx="18" fill="#fff" />
      </g>
      <T x="340" y="78" fontSize="13" fontWeight="700" fill={NAVY}>
        Spending by category
      </T>
      <Donut
        cx={400}
        cy={160}
        r={44}
        parts={[
          [0.38, "#7C5CFF"],
          [0.24, "#3B82F6"],
          [0.22, "#06B6D4"],
          [0.16, "#F59E0B"],
        ]}
      />
      {[
        ["Food", "38%", "#7C5CFF"],
        ["Bills", "24%", "#3B82F6"],
        ["Travel", "22%", "#06B6D4"],
        ["Other", "16%", "#F59E0B"],
      ].map(([k, v, c], i) => (
        <g key={k} transform={`translate(470 ${118 + i * 24})`}>
          <rect width="10" height="10" rx="3" fill={c} />
          <T x="18" y="9.5" fontSize="11.5">
            {k}
          </T>
          <T x="96" y="9.5" fontSize="11.5" fontWeight="700" textAnchor="end">
            {v}
          </T>
        </g>
      ))}

      {/* budget */}
      <g filter="url(#exp-bg-sh)">
        <rect x="320" y="256" width="264" height="70" rx="18" fill="#fff" />
      </g>
      <T x="340" y="282" fontSize="11.5" fill={MUTED}>
        Food budget
      </T>
      <T x="564" y="282" fontSize="11.5" fontWeight="700" textAnchor="end">
        ₹6,520 / ₹8,000
      </T>
      <rect x="340" y="296" width="224" height="10" rx="5" fill={SOFT} />
      <rect x="340" y="296" width="182" height="10" rx="5" fill="#7C5CFF" />

      {/* add button */}
      <g filter="url(#exp-bg-sh)">
        <circle cx="286" cy="330" r="24" fill="#7C5CFF" />
      </g>
      <path d="M286 320v20M276 330h20" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  );
}

/* ───────── 4. School bus tracking ───────── */

function BusCover() {
  const route = "M60 330 C 140 330, 150 250, 230 240 S 330 170, 380 150 S 500 110, 560 70";
  return (
    <>
      <Bg id="bus-bg" from="#FFF6E0" to="#FDF1E7" />
      {/* map roads */}
      <g stroke="#fff" fill="none">
        <path d="M0 250 L640 190" strokeWidth="16" />
        <path d="M150 0 L220 400" strokeWidth="12" />
        <path d="M430 0 L400 400" strokeWidth="12" />
        <path d="M0 90 L640 40" strokeWidth="10" />
      </g>
      <path d={route} stroke="#F59E0B" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M60 330 C 140 330, 150 250, 230 240 S 330 170, 380 150" stroke="#F59E0B" strokeWidth="6" fill="none" strokeLinecap="round" />
      {[
        [60, 330],
        [230, 240],
        [470, 118],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="8" fill="#fff" stroke="#F59E0B" strokeWidth="4" />
      ))}
      {/* school */}
      <g transform="translate(540 36)">
        <rect width="44" height="40" rx="10" fill={NAVY} />
        <path d="M10 30V18l12-8 12 8v12" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
        <rect x="18" y="22" width="8" height="8" fill="#fff" />
      </g>
      {/* bus marker */}
      <g transform="translate(360 128)" filter="url(#bus-bg-sh)">
        <rect width="44" height="40" rx="12" fill="#F59E0B" />
        <rect x="9" y="8" width="26" height="14" rx="3" fill="#fff" />
        <circle cx="14" cy="30" r="3.5" fill={NAVY} />
        <circle cx="30" cy="30" r="3.5" fill={NAVY} />
      </g>
      <circle cx="382" cy="148" r="34" fill="#F59E0B" opacity="0.15" />

      {/* driver chip */}
      <g filter="url(#bus-bg-sh)">
        <rect x="40" y="36" width="178" height="48" rx="24" fill="#fff" />
      </g>
      <circle cx="64" cy="60" r="12" fill="#FEF3C7" />
      <T x="64" y="64.5" fontSize="11" textAnchor="middle" fontWeight="700" fill="#B45309">
        D
      </T>
      <T x="84" y="56" fontSize="11.5" fontWeight="700">
        Driver · Bus 07
      </T>
      <circle cx="88" cy="70" r="3.5" fill="#10B981" />
      <T x="96" y="74" fontSize="10.5" fill="#059669" fontWeight="600">
        Live GPS on
      </T>

      {/* parent card */}
      <g filter="url(#bus-bg-sh)">
        <rect x="392" y="206" width="208" height="160" rx="20" fill="#fff" />
      </g>
      <T x="412" y="236" fontSize="11" fill={MUTED}>
        Parent app
      </T>
      <T x="412" y="258" fontSize="15" fontWeight="700" fill={NAVY}>
        Aarav&apos;s bus
      </T>
      <rect x="412" y="270" width="168" height="30" rx="10" fill="#FEF3C7" />
      <T x="424" y="290" fontSize="12" fontWeight="700" fill="#B45309">
        Arriving in 4 min
      </T>
      {["Boarded", "On the way", "School"].map((s, i) => (
        <g key={s} transform={`translate(${418 + i * 74} 322)`}>
          <circle r="7" fill={i < 2 ? "#10B981" : LINE} />
          {i < 2 && <path d="M-3 0l2 2 4-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
          <T x="-4" y="26" fontSize="9.5" fill={MUTED}>
            {s}
          </T>
        </g>
      ))}
      <path d="M425 322H485M499 322H559" stroke={LINE} strokeWidth="2" />

      {/* admin stat */}
      <g filter="url(#bus-bg-sh)">
        <rect x="40" y="252" width="168" height="54" rx="16" fill="#fff" />
      </g>
      <T x="58" y="275" fontSize="10.5" fill={MUTED}>
        School admin
      </T>
      <T x="58" y="294" fontSize="13" fontWeight="700" fill={NAVY}>
        12 buses · 3 routes live
      </T>
    </>
  );
}

/* ───────── 5. Learning app ───────── */

function LearnCover() {
  return (
    <>
      <Bg id="learn-bg" from="#E7F1FF" to="#FDEEF4" />
      {/* browser / course player */}
      <g filter="url(#learn-bg-sh)">
        <rect x="44" y="44" width="400" height="290" rx="16" fill="#fff" />
      </g>
      <rect x="44" y="44" width="400" height="30" rx="16" fill={SOFT} />
      <rect x="44" y="60" width="400" height="14" fill={SOFT} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={64 + i * 14} cy="59" r="4" fill={LINE} />
      ))}
      <defs>
        <linearGradient id="learn-vid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B2F57" />
          <stop offset="1" stopColor="#1C4E89" />
        </linearGradient>
      </defs>
      <rect x="60" y="88" width="250" height="150" rx="12" fill="url(#learn-vid)" />
      <circle cx="185" cy="163" r="24" fill="#fff" opacity="0.95" />
      <path d="M178 151 L196 163 L178 175 Z" fill={NAVY} />
      <rect x="72" y="222" width="226" height="4" rx="2" fill="#fff" opacity="0.3" />
      <rect x="72" y="222" width="120" height="4" rx="2" fill="#22D3EE" />
      <T x="60" y="262" fontSize="14" fontWeight="700" fill={NAVY}>
        Quantitative Aptitude
      </T>
      <T x="60" y="282" fontSize="11" fill={MUTED}>
        Lesson 6 · Percentages · 18 min
      </T>
      <rect x="60" y="296" width="96" height="24" rx="12" fill="#E7F1FF" />
      <T x="108" y="312" fontSize="10.5" textAnchor="middle" fontWeight="600" fill="#1C95D4">
        Notes · PDF
      </T>
      {/* lesson list */}
      {["Ratios", "Averages", "Percentages", "Profit & loss"].map((l, i) => (
        <g key={l} transform={`translate(326 ${92 + i * 44})`}>
          <rect width="104" height="36" rx="10" fill={i === 2 ? "#E7F1FF" : SOFT} />
          <circle cx="16" cy="18" r="7" fill={i < 2 ? "#10B981" : i === 2 ? "#1C95D4" : LINE} />
          {i < 2 && <path d="M13 18l2 2 4-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />}
          <T x="30" y="22" fontSize="10.5" fontWeight={i === 2 ? 700 : 500} fill={i === 2 ? NAVY : INK}>
            {l}
          </T>
        </g>
      ))}

      {/* phone: mock test */}
      <Phone x={432} y={56} w={170} h={300} id="learn-bg">
        <T x="12" y="42" fontSize="10" fill={MUTED}>
          Mock test · Q 7 / 20
        </T>
        <rect x="12" y="50" width="132" height="5" rx="2.5" fill={SOFT} />
        <rect x="12" y="50" width="46" height="5" rx="2.5" fill="#7C5CFF" />
        <T x="12" y="80" fontSize="11.5" fontWeight="700" fill={NAVY}>
          25% of 480 is?
        </T>
        {[
          ["A", "100", false],
          ["B", "120", true],
          ["C", "140", false],
        ].map(([k, v, on], i) => (
          <g key={k as string} transform={`translate(12 ${94 + i * 38})`}>
            <rect width="132" height="30" rx="10" fill={on ? "#ECFDF5" : SOFT} stroke={on ? "#10B981" : "none"} />
            <T x="12" y="19.5" fontSize="11" fontWeight="700" fill={on ? "#059669" : MUTED}>
              {k}
            </T>
            <T x="30" y="19.5" fontSize="11" fontWeight="600">
              {v}
            </T>
          </g>
        ))}
        <circle cx="42" cy="236" r="22" fill="none" stroke={SOFT} strokeWidth="6" />
        <circle
          cx="42"
          cy="236"
          r="22"
          fill="none"
          stroke="#1C95D4"
          strokeWidth="6"
          strokeDasharray={`${0.68 * 138} 138`}
          strokeLinecap="round"
          transform="rotate(-90 42 236)"
        />
        <T x="42" y="240" fontSize="10.5" fontWeight="700" textAnchor="middle" fill={NAVY}>
          68%
        </T>
        <T x="74" y="232" fontSize="10" fill={MUTED}>
          Course
        </T>
        <T x="74" y="246" fontSize="10.5" fontWeight="700">
          complete
        </T>
      </Phone>
    </>
  );
}

const covers: Record<CoverKind, () => React.ReactElement> = {
  qr: QrCover,
  stay: StayCover,
  expense: ExpenseCover,
  bus: BusCover,
  learn: LearnCover,
};
