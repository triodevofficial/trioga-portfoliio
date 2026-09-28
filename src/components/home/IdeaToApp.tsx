"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ideaToApp } from "@/content/home";
import { Check } from "@/components/icons";

const STAGE_MS = 5600;

/** Animation delay helper for the i2a-* CSS classes. */
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

/**
 * Looping three-stage story: sticky-note idea → code being typed → the finished app.
 * Each stage re-mounts (keyed) when active so its CSS entrance animations replay.
 * Auto-advance pauses while the scene is off-screen or hovered.
 */
export function IdeaToApp() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const paused = !visible || hovered;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % ideaToApp.length), STAGE_MS);
    return () => clearTimeout(t);
  }, [active, paused]);

  const stage = ideaToApp[active].key;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`grid overflow-hidden rounded-2xl border border-line bg-soft lg:grid-cols-[320px_1fr] ${paused ? "i2a-paused" : ""}`}
    >
      {/* Stepper */}
      <ol className="grid grid-cols-3 border-b border-line lg:grid-cols-1 lg:border-r lg:border-b-0">
        {ideaToApp.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.key} className="border-line lg:border-b lg:last:border-b-0 [&:not(:last-child)]:border-r lg:[&:not(:last-child)]:border-r-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`relative h-full w-full px-4 py-4 text-left transition sm:px-6 lg:py-7 ${on ? "bg-white" : "hover:bg-white/60"}`}
              >
                <span className={`font-mono text-xs ${on ? "text-sky" : "text-muted"}`}>{s.step}</span>
                <span className={`mt-1 block text-base font-semibold sm:text-lg ${on ? "text-navy" : "text-ink/70"}`}>
                  <span className="lg:hidden">{s.label}</span>
                  <span className="hidden lg:inline">{s.title}</span>
                </span>
                <span className={`mt-2 hidden text-sm leading-relaxed lg:block ${on ? "text-body" : "text-muted"}`}>{s.text}</span>
                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-line/60">
                  {on && (
                    <span
                      key={`p-${active}`}
                      className="i2a-progress block h-full bg-sky"
                      style={{ "--dur": `${STAGE_MS}ms` } as CSSProperties}
                    />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Stage */}
      <div
        aria-hidden="true"
        className="relative h-[340px] overflow-hidden sm:h-[440px] lg:h-auto lg:min-h-[460px] 2xl:min-h-[540px] bg-[radial-gradient(circle,#d5dce6_1px,transparent_1px)] [background-size:22px_22px]"
      >
        <div key={stage} className="absolute inset-0">
          {stage === "idea" && <IdeaStage />}
          {stage === "code" && <CodeStage />}
          {stage === "app" && <AppStage />}
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 01 Idea: sticky notes + wireframe sketch ─────────────── */

const notes = [
  { text: "Customers book a slot online", color: "bg-amber-100", pos: "left-[6%] top-[12%]", r: "-4deg", delay: 150 },
  { text: "Pay securely in the app", color: "bg-sky-100", pos: "left-[26%] top-[48%]", r: "3deg", delay: 450 },
  { text: "Owner sees bookings live", color: "bg-rose-100", pos: "left-[4%] top-[66%]", r: "-2deg", delay: 750 },
];

function IdeaStage() {
  return (
    <>
      <div className="i2a-pop absolute left-[6%] top-[4%] hidden items-center gap-2 font-mono text-xs text-muted sm:flex" style={d(0)}>
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-amber-500" fill="currentColor">
          <path d="M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2zM9 20h6v1a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1z" />
        </svg>
        new-idea.board
      </div>

      {notes.map((n) => (
        <div
          key={n.text}
          className={`i2a-pop absolute w-[38%] max-w-[190px] p-3 text-[13px] font-medium leading-snug text-ink shadow-[0_8px_20px_-8px_rgb(15_23_42/0.25)] sm:p-4 sm:text-sm ${n.color} ${n.pos}`}
          style={{ ...d(n.delay), rotate: n.r }}
        >
          {n.text}
        </div>
      ))}

      {/* Connectors from notes to the sketch */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
        <path d="M40 22 C 50 22, 52 30, 60 30" className="i2a-in" stroke="#1c95d4" strokeWidth="1.5" strokeDasharray="5 5" style={d(1100)} vectorEffect="non-scaling-stroke" />
        <path d="M62 58 C 64 58, 64 52, 66 52" className="i2a-in" stroke="#1c95d4" strokeWidth="1.5" strokeDasharray="5 5" style={d(1300)} vectorEffect="non-scaling-stroke" />
        <path d="M40 78 C 52 80, 56 72, 64 72" className="i2a-in" stroke="#1c95d4" strokeWidth="1.5" strokeDasharray="5 5" style={d(1500)} vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Hand-drawn phone wireframe */}
      <svg
        className="absolute right-[6%] top-1/2 h-[82%] -translate-y-1/2"
        viewBox="0 0 120 220"
        fill="none"
        stroke="#0b2f57"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="6" y="6" width="108" height="208" rx="18" pathLength={1} className="i2a-draw" style={d(900)} />
        <path d="M46 18h28" pathLength={1} className="i2a-draw" style={d(1300)} />
        <path d="M20 40h60" pathLength={1} className="i2a-draw" style={d(1500)} strokeWidth="3" />
        <rect x="20" y="54" width="80" height="44" rx="6" pathLength={1} className="i2a-draw" style={d(1700)} />
        <path d="M20 112h80M20 126h56M20 146h80M20 160h44" pathLength={1} className="i2a-draw" style={d(1950)} stroke="#6b7686" />
        <rect x="20" y="178" width="80" height="22" rx="11" pathLength={1} className="i2a-draw" style={d(2250)} stroke="#1c95d4" />
      </svg>

      <div
        className="i2a-pop absolute bottom-[6%] right-[5%] rounded-full bg-navy px-3 py-1.5 text-xs font-medium text-white shadow-lg"
        style={d(2800)}
      >
        Plan approved ✓
      </div>
    </>
  );
}

/* ─────────────── 02 Code: editor typing ─────────────── */

type Tok = [string, string?];
const K = "text-[#c792ea]"; // keyword
const F = "text-[#82aaff]"; // function
const S = "text-[#c3e88d]"; // string
const T = "text-[#ffcb6b]"; // component / type
const P = "text-[#89ddff]"; // punctuation

const codeLines: { indent: number; toks: Tok[] }[] = [
  { indent: 0, toks: [["export default async function ", K], ["Bookings", F], ["() {"]] },
  { indent: 1, toks: [["const ", K], ["bookings = "], ["await ", K], ["db.booking."], ["findMany", F], ["({"]] },
  { indent: 2, toks: [["where: { date: "], ["today", F], ["() },"]] },
  { indent: 1, toks: [["});"]] },
  { indent: 1, toks: [["return ", K], ["("]] },
  { indent: 2, toks: [["<", P], ["Dashboard ", T], ["title="], ['"Today\'s bookings"', S], [">", P]] },
  { indent: 3, toks: [["{bookings."], ["map", F], ["((b) => ("]] },
  { indent: 4, toks: [["<", P], ["BookingCard ", T], ["key={b.id} {...b} "], ["/>", P]] },
  { indent: 3, toks: [["))}"]] },
  { indent: 2, toks: [["</", P], ["Dashboard", T], [">", P]] },
  { indent: 1, toks: [[");"]] },
  { indent: 0, toks: [["}"]] },
];

function CodeStage() {
  const lineMs = 230;
  const doneAt = 350 + codeLines.length * lineMs;
  return (
    <>
      <div
        className="i2a-in absolute inset-x-[4%] bottom-[8%] top-[8%] overflow-hidden rounded-xl bg-[#0d1b2e] shadow-[0_30px_60px_-20px_rgb(11_47_87/0.45)] sm:inset-x-[7%]"
        style={d(0)}
      >
        <div className="flex h-9 items-center gap-2 border-b border-white/10 px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/80">app/bookings/page.tsx</span>
        </div>
        <div className="flex">
          {/* File tree */}
          <div className="hidden w-40 shrink-0 space-y-1.5 border-r border-white/10 p-4 font-mono text-[11px] text-white/45 md:block">
            <div>▾ app</div>
            <div className="pl-3">▾ bookings</div>
            <div className="rounded bg-white/10 pl-6 text-white/90">page.tsx</div>
            <div className="pl-3">▸ api</div>
            <div>▸ components</div>
            <div>▸ lib</div>
            <div>package.json</div>
          </div>
          <pre className="flex-1 overflow-hidden p-4 font-mono text-[11px] leading-[1.75] text-[#d6deeb] sm:text-[13px]">
            {codeLines.map((line, i) => (
              <div key={i} className="flex">
                <span className="w-7 shrink-0 select-none text-right text-white/25">{i + 1}</span>
                <span className="i2a-type whitespace-pre pl-4" style={d(350 + i * lineMs)}>
                  {"  ".repeat(line.indent)}
                  {line.toks.map(([t, c], j) => (
                    <span key={j} className={c}>
                      {t}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <div className="flex">
              <span className="w-7" />
              <span className="i2a-caret ml-4 mt-0.5 inline-block h-4 w-[7px] bg-sky" />
            </div>
          </pre>
        </div>
      </div>

      <div
        className="i2a-pop absolute bottom-[4%] right-[5%] flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-ink shadow-lg sm:right-[9%]"
        style={d(doneAt)}
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
          <Check className="h-3 w-3" />
        </span>
        Build passed · 24/24 tests
      </div>
    </>
  );
}

/* ─────────────── 03 App: dashboard + phone ─────────────── */

const bars = [42, 64, 50, 78, 58, 90, 72];
const bookings = [
  { name: "Sara M.", time: "09:30" },
  { name: "James K.", time: "11:00" },
  { name: "Aisha R.", time: "14:15" },
];

function AppStage() {
  return (
    <>
      {/* Browser */}
      <div
        className="i2a-in absolute left-[4%] top-[8%] h-[78%] w-[84%] overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-24px_rgb(11_47_87/0.35)] sm:left-[6%] sm:w-[72%]"
        style={d(0)}
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-line bg-soft px-3">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="mx-auto rounded bg-white px-3 py-0.5 font-mono text-[10px] text-muted">bookings.yourapp.com</span>
        </div>
        <div className="flex h-[calc(100%-2rem)]">
          <div className="hidden w-[22%] space-y-2.5 border-r border-line p-3 sm:block">
            <div className="h-2.5 w-3/4 rounded bg-navy" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-2 rounded ${i === 0 ? "w-full bg-sky/30" : "w-2/3 bg-soft-2"}`} />
            ))}
          </div>
          <div className="flex-1 p-3 sm:p-4">
            <div className="i2a-in text-[11px] font-semibold text-navy sm:text-sm" style={d(250)}>
              Today&apos;s bookings
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                ["Bookings", "128"],
                ["Revenue", "$4.2k"],
                ["Rating", "4.9★"],
              ].map(([k, v], i) => (
                <div key={k} className="i2a-in rounded-lg border border-line p-2" style={d(400 + i * 120)}>
                  <div className="text-[9px] text-muted sm:text-[10px]">{k}</div>
                  <div className="text-xs font-semibold text-ink sm:text-base">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex h-[42%] items-end gap-[6%] rounded-lg border border-line p-2 sm:p-3">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={`i2a-grow flex-1 rounded-t ${i === 5 ? "bg-sky" : "bg-sky/25"}`}
                  style={{ ...d(800 + i * 90), height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div
        className="i2a-in absolute bottom-[5%] right-[4%] h-[72%] w-[30%] max-w-[168px] overflow-hidden rounded-[22px] border-[5px] border-navy bg-white shadow-[0_30px_50px_-18px_rgb(11_47_87/0.5)] sm:right-[8%]"
        style={d(500)}
      >
        <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-navy/80" />
        <div className="px-2.5 pt-2.5">
          <div className="text-[10px] font-semibold text-navy sm:text-xs">My bookings</div>
          <div className="mt-2 space-y-1.5">
            {bookings.map((b, i) => (
              <div key={b.name} className="i2a-in flex items-center justify-between rounded-md bg-soft px-2 py-1.5" style={d(1000 + i * 180)}>
                <div>
                  <div className="text-[9px] font-medium text-ink sm:text-[11px]">{b.name}</div>
                  <div className="text-[8px] text-muted sm:text-[10px]">{b.time}</div>
                </div>
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-2.5 w-2.5" />
                </span>
              </div>
            ))}
          </div>
          <div className="i2a-in mt-2.5 rounded-full bg-sky py-1.5 text-center text-[9px] font-medium text-white sm:text-[11px]" style={d(1600)}>
            Book a slot
          </div>
        </div>
      </div>

      {/* Launch toast + performance score */}
      <div className="i2a-pop absolute left-[5%] top-[3%] flex items-center gap-2 rounded-lg bg-navy px-3 py-2 text-xs font-medium text-white shadow-lg sm:left-auto sm:right-[6%]" style={d(2200)}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Live in production
      </div>
      <div className="i2a-pop absolute bottom-[6%] left-[6%] hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-ink shadow-lg sm:flex" style={d(2600)}>
        <svg viewBox="0 0 36 36" className="h-8 w-8 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#e3e8ef" strokeWidth="3.5" />
          <circle cx="18" cy="18" r="15" fill="none" stroke="#10b981" strokeWidth="3.5" pathLength={1} className="i2a-draw" style={d(2700)} />
        </svg>
        <div>
          <div className="font-semibold">100</div>
          <div className="text-[10px] text-muted">Performance</div>
        </div>
      </div>
    </>
  );
}
