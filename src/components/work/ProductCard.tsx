import Link from "next/link";
import type { CSSProperties } from "react";
import type { Product } from "@/content/work";
import { ArrowRight } from "@/components/icons";
import { ProductCover } from "./ProductCover";

export function ProductCard({ product, index, delay = 0 }: { product: Product; index: number; delay?: number }) {
  return (
    <article data-reveal style={{ "--d": delay } as CSSProperties} className="group relative flex flex-col">
      <Link href={`/work/${product.slug}`} className="absolute inset-0 z-10 rounded-2xl" aria-label={`${product.name} — ${product.title}`} />
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-soft">
        <div className="h-full w-full transition duration-700 ease-out group-hover:scale-[1.035]">
          <ProductCover product={product} />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-navy backdrop-blur">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-sky">{product.category}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-navy sm:text-2xl">
          {product.name}
          <span className="font-normal text-muted"> — {product.title}</span>
        </h3>
        <p className="mt-3 leading-relaxed">{product.summary}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <ul className="flex flex-wrap gap-2">
            {product.platforms.map((p) => (
              <li key={p} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-navy">
                {p}
              </li>
            ))}
          </ul>
          <span className="link-arrow text-sm">
            View project <ArrowRight />
          </span>
        </div>
      </div>
    </article>
  );
}
