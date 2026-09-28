import type { ServiceMockup } from "@/content/home";
import { Check } from "@/components/icons";

/** Lightweight HTML/CSS illustrations — no image requests, crisp at any size. */
export function ServiceMockupArt({ kind }: { kind: ServiceMockup }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-soft to-soft-2 xl:aspect-[16/11]">
      {kind === "website" && <Website />}
      {kind === "dashboard" && <Dashboard />}
      {kind === "mobile" && <Mobile />}
      {kind === "automation" && <Automation />}
    </div>
  );
}

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-[0_24px_48px_-20px_rgb(11_47_87/0.3)]">
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-soft px-3">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="mx-auto rounded bg-white px-3 py-0.5 font-mono text-[10px] text-muted">{url}</span>
      </div>
      {children}
    </div>
  );
}

function Website() {
  return (
    <>
      <div className="absolute inset-x-[8%] top-1/2 -translate-y-1/2">
        <BrowserChrome url="yourcompany.com">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-14 rounded bg-navy" />
              <div className="flex gap-2">
                <div className="h-1.5 w-8 rounded bg-soft-2" />
                <div className="h-1.5 w-8 rounded bg-soft-2" />
                <div className="h-1.5 w-8 rounded bg-soft-2" />
              </div>
            </div>
            <div className="mt-6 h-3 w-3/4 rounded bg-navy/85" />
            <div className="mt-2 h-3 w-1/2 rounded bg-sky/70" />
            <div className="mt-4 h-1.5 w-2/3 rounded bg-soft-2" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded bg-soft-2" />
            <div className="mt-5 flex gap-2">
              <div className="h-6 w-20 rounded-full bg-navy" />
              <div className="h-6 w-20 rounded-full border-[1.5px] border-navy" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 rounded-md bg-soft" />
              ))}
            </div>
          </div>
        </BrowserChrome>
      </div>
      <div className="float-y absolute bottom-[8%] right-[5%] flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg">
        <div className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-emerald-500 text-sm font-semibold text-emerald-600">
          100
        </div>
        <div className="text-xs">
          <div className="font-semibold text-ink">Performance</div>
          <div className="text-muted">SEO · Accessibility</div>
        </div>
      </div>
    </>
  );
}

function Dashboard() {
  const bars = [35, 55, 45, 70, 52, 85, 66, 92];
  return (
    <>
      <div className="absolute inset-x-[6%] top-1/2 -translate-y-1/2">
        <BrowserChrome url="app.yourcompany.com">
          <div className="flex">
            <div className="w-[24%] space-y-2 border-r border-line p-3">
              <div className="mb-3 h-2.5 w-3/4 rounded bg-navy" />
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-2 rounded ${i === 1 ? "bg-sky/30" : "bg-soft-2"}`} />
              ))}
            </div>
            <div className="flex-1 p-3">
              <div className="grid grid-cols-3 gap-2">
                {[
                  ["Active users", "2,481"],
                  ["MRR", "$18.6k"],
                  ["Churn", "1.2%"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md border border-line p-2">
                    <div className="text-[9px] text-muted">{k}</div>
                    <div className="text-sm font-semibold text-ink">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex h-24 items-end gap-1.5 rounded-md border border-line p-2">
                {bars.map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t ${i === bars.length - 1 ? "bg-sky" : "bg-sky/25"}`} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-2 space-y-1.5">
                {[0, 1].map((i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md bg-soft p-1.5">
                    <div className="h-4 w-4 rounded-full bg-navy/20" />
                    <div className="h-1.5 flex-1 rounded bg-soft-2" />
                    <div className="h-1.5 w-8 rounded bg-emerald-400/60" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BrowserChrome>
      </div>
    </>
  );
}

function Phone({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div className={`absolute overflow-hidden rounded-[26px] border-[6px] border-navy bg-white shadow-[0_30px_50px_-18px_rgb(11_47_87/0.45)] ${className}`}>
      <div className="mx-auto mt-1.5 h-1.5 w-12 rounded-full bg-navy/80" />
      <div className="p-3">{children}</div>
    </div>
  );
}

function Mobile() {
  return (
    <>
      <Phone className="left-[16%] top-[12%] h-[88%] w-[34%] -rotate-6">
        <div className="h-2.5 w-2/3 rounded bg-navy" />
        <div className="mt-3 h-20 rounded-lg bg-gradient-to-br from-violet/30 to-cyan/40" />
        <div className="mt-3 space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-soft-2" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-full rounded bg-soft-2" />
                <div className="h-1.5 w-1/2 rounded bg-soft-2" />
              </div>
            </div>
          ))}
        </div>
      </Phone>
      <Phone className="float-y right-[16%] top-[8%] h-[88%] w-[34%] rotate-3">
        <div className="text-[11px] font-semibold text-navy">Checkout</div>
        <div className="mt-3 space-y-2">
          {["Monthly plan", "Personal trainer"].map((t) => (
            <div key={t} className="flex items-center justify-between rounded-md bg-soft px-2 py-2">
              <span className="text-[9px] text-ink">{t}</span>
              <Check className="h-3 w-3 text-emerald-500" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[10px]">
          <span className="text-muted">Total</span>
          <span className="font-semibold text-ink">$49.00</span>
        </div>
        <div className="mt-3 rounded-full bg-navy py-2 text-center text-[10px] font-medium text-white">Pay now</div>
      </Phone>
    </>
  );
}

function Automation() {
  const nodes = [
    { label: "New lead", sub: "Website form", x: "left-[6%]", y: "top-[16%]" },
    { label: "AI assistant", sub: "Qualifies & drafts reply", x: "left-[34%]", y: "top-[42%]", accent: true },
    { label: "CRM", sub: "Contact created", x: "right-[6%]", y: "top-[16%]" },
    { label: "Email sent", sub: "Personal follow-up", x: "right-[6%]", y: "bottom-[12%]" },
  ];
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" fill="none" stroke="#1c95d4" strokeWidth="1.5" strokeDasharray="5 5">
        <path d="M120 70 C 160 70, 150 150, 170 150" />
        <path d="M250 150 C 280 150, 270 70, 290 70" />
        <path d="M250 160 C 290 160, 280 235, 300 235" />
      </svg>
      {nodes.map((n) => (
        <div
          key={n.label}
          className={`absolute ${n.x} ${n.y} w-[34%] max-w-[150px] rounded-xl border bg-white p-3 shadow-[0_16px_32px_-16px_rgb(11_47_87/0.35)] ${
            n.accent ? "float-y border-sky" : "border-line"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${n.accent ? "bg-violet" : "bg-sky"}`} />
            <span className="text-xs font-semibold text-navy">{n.label}</span>
          </div>
          <div className="mt-1 text-[10px] text-muted">{n.sub}</div>
        </div>
      ))}
    </>
  );
}
