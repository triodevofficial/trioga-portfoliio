"use client";

import { useState } from "react";
import type { Product } from "@/content/work";
import { ArrowRight, Plus } from "@/components/icons";
import { ProductCard } from "./ProductCard";

const FILTERS = [
  { key: "all", label: "All work" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const matches = (p: Product, f: FilterKey) =>
  f === "all" || (f === "web" ? p.platforms.includes("Web") : p.platforms.some((x) => x === "Android" || x === "iOS"));

export function WorkGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const shown = products.filter((p) => matches(p, filter));

  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = products.filter((p) => matches(p, f.key)).length;
          const on = f.key === filter;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                on ? "border-navy bg-navy text-white" : "border-line text-navy hover:border-navy"
              }`}
            >
              {f.label}
              <span className={`ml-2 font-mono text-xs ${on ? "text-white/70" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} index={products.indexOf(p)} />
        ))}
        {/* Fills the empty slot on odd counts — and doubles as a call to action. */}
        {shown.length % 2 === 1 && (
          <a
            href="#contact"
            className="group hidden flex-col md:flex"
          >
            <div className="grid aspect-[16/10] place-items-center rounded-2xl border-2 border-dashed border-line bg-soft/50 transition duration-300 group-hover:border-sky group-hover:bg-sky/5">
              <div className="text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-sky shadow-sm ring-1 ring-line transition duration-300 group-hover:scale-110">
                  <Plus className="h-7 w-7" />
                </span>
                <p className="mt-5 text-xl font-semibold text-navy">Your product could be next</p>
                <p className="mt-1 text-sm text-muted">Web app, mobile app or a complete platform</p>
              </div>
            </div>
            <div className="pt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-sky">Start a project</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-navy sm:text-2xl">
                Have an idea? <span className="font-normal text-muted">Let&apos;s build it.</span>
              </p>
              <span className="link-arrow mt-3 text-sm">
                Talk to us <ArrowRight />
              </span>
            </div>
          </a>
        )}
      </div>
    </>
  );
}
