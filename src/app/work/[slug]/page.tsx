import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "@/components/icons";
import { ContactCta } from "@/components/site/ContactCta";
import { ProductCover } from "@/components/work/ProductCover";
import { getProduct, products } from "@/content/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.title}`,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.name} — ${p.title} | Trioga`, description: p.summary },
  };
}

const delay = (ms: number) => ({ "--d": ms }) as CSSProperties;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const i = products.indexOf(product);
  const next = products[(i + 1) % products.length];

  return (
    <>
      <div className="wrap pt-6 text-xs text-muted">
        <Link href="/" className="hover:text-sky">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/work" className="hover:text-sky">
          Work
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </div>

      {/* Intro */}
      <section className="wrap pb-12 pt-12 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className="text-xs font-medium uppercase tracking-wider text-sky">{product.category}</p>
            <h1 className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl 2xl:text-6xl">
              {product.name}
              <span className="block text-sky">{product.title}</span>
            </h1>
          </div>
          <div data-reveal style={delay(120)} className="lg:pt-8">
            <p className="text-base leading-relaxed sm:text-[17px]">{product.overview}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.platforms.map((p) => (
                <li key={p} className="rounded-full bg-soft px-3.5 py-1.5 text-sm font-medium text-navy">
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary">
                Build something similar
              </a>
              <Link href="/work" className="btn btn-outline">
                All projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero visual */}
      <section className="wrap pb-20">
        <div data-reveal className="mx-auto aspect-[16/10] max-w-[1280px] overflow-hidden rounded-2xl border border-line bg-soft">
          <ProductCover product={product} />
        </div>
      </section>

      {/* Features */}
      <section className="bg-soft py-20">
        <div className="wrap">
          <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-2 lg:gap-16" data-reveal>
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-navy sm:text-[34px]">
              <span className="text-sky">Key features</span> of {product.name}
            </h2>
            <p className="leading-relaxed lg:pt-1">{product.summary}</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {product.features.map((f, k) => (
              <div key={f.title} data-reveal style={delay((k % 3) * 90)} className="rounded-lg bg-white p-7 ring-1 ring-line">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sky/10 text-sky">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles (multi-sided products) */}
      {product.roles && (
        <section className="wrap py-20">
          <div data-reveal className="border-b border-line pb-10">
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-navy sm:text-[34px]">
              <span className="text-sky">One platform,</span> {product.roles.length} connected experiences
            </h2>
          </div>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {product.roles.map((r, k) => (
              <li key={r.name} data-reveal style={delay(k * 120)} className="border-t-2 border-navy pt-6">
                <span className="font-mono text-sm text-sky">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-semibold text-navy">{r.name}</h3>
                <p className="mt-2 leading-relaxed">{r.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Stack + next project */}
      <section className="border-t border-line">
        <div className="wrap grid gap-12 py-16 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2 className="text-lg font-semibold text-navy">Technology</h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {product.stack.map((t) => (
                <li key={t} className="rounded-md border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/work/${next.slug}`}
            data-reveal
            style={delay(120)}
            className="group flex items-center gap-5 rounded-2xl border border-line p-4 transition hover:border-navy"
          >
            <div className="aspect-[16/10] w-40 shrink-0 overflow-hidden rounded-lg bg-soft sm:w-52">
              <ProductCover product={next} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Next project</p>
              <p className="mt-1 text-lg font-semibold text-navy">{next.name}</p>
              <p className="text-sm text-muted">{next.title}</p>
              <span className="link-arrow mt-2 text-sm">
                View project <ArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <ContactCta accent={`Need something like ${product.name}?`} title="We can build it for you." />
    </>
  );
}
