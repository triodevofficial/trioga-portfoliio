import Link from "next/link";
import type { CSSProperties } from "react";
import { IdeaToApp } from "@/components/home/IdeaToApp";
import { ServiceMockupArt } from "@/components/home/ServiceMockups";
import { ProductCard } from "@/components/work/ProductCard";
import { ArrowRight, FeatureGlyph, Plus } from "@/components/icons";
import { ContactCta } from "@/components/site/ContactCta";
import { Heading } from "@/components/site/Heading";
import { faq, features, hero, process, services, stack, stats } from "@/content/home";
import { products } from "@/content/work";

const delay = (ms: number) => ({ "--d": ms }) as CSSProperties;

const container = "wrap";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
        {/* ── Intro: heading left, copy right ── */}
        <section className={`${container} pb-12 pt-14 sm:pt-20`}>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div data-reveal>
              <Heading as="h1" accent={hero.titleAccent}>
                {hero.title}
              </Heading>
            </div>
            <div data-reveal style={delay(120)} className="lg:pt-2">
              <p className="text-base leading-relaxed text-body sm:text-[17px]">{hero.text}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn btn-primary">
                  Start your project
                </a>
                <a href="#work" className="btn btn-outline">
                  See our work
                </a>
                <a href="#process" className="link-arrow ml-1 text-sm">
                  How we work <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Signature animation ── */}
        <section className={`${container} pb-16`} aria-label="From idea to code to app">
          <div data-reveal>
            <IdeaToApp />
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-y border-line">
          <dl className={`${container} grid grid-cols-2 lg:grid-cols-4`}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                data-reveal
                style={delay(i * 80)}
                className={`flex flex-col py-8 lg:py-10 ${i % 2 === 1 ? "pl-6" : ""} ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i % 2 === 1 ? "border-l border-line" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}
              >
                <dt className="order-2 mt-1 text-sm text-muted">{s.label}</dt>
                <dd className="-order-1 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Services: alternating rows ── */}
        <section id="services" className={`${container} py-20`}>
          <div className="grid gap-6 border-b border-line pb-10 lg:grid-cols-2 lg:gap-16" data-reveal>
            <Heading accent="Software solutions">for every stage of your business</Heading>
            <p className="leading-relaxed lg:pt-1">
              Whether you are validating a new idea or modernising the systems you run on, we design and build the
              product end to end — one team, from strategy to launch.
            </p>
          </div>

          {services.map((s, i) => (
            <article key={s.title} className="grid items-center gap-10 border-b border-line py-14 lg:grid-cols-2 lg:gap-16">
              <div data-reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <h3 className="text-2xl font-semibold tracking-tight text-sky sm:text-[28px]">{s.title}</h3>
                <p className="mt-2 text-lg font-medium leading-snug text-navy sm:text-xl">{s.subtitle}</p>
                <p className="mt-5 leading-relaxed">{s.text}</p>
                <p className="mt-3 font-medium text-ink">{s.point}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#contact" className="btn btn-primary">
                    Discuss your project
                  </a>
                  <a href="#contact" className="btn btn-outline">
                    Request a quote
                  </a>
                </div>
              </div>
              <div data-reveal style={delay(150)}>
                <ServiceMockupArt kind={s.mockup} />
              </div>
            </article>
          ))}
        </section>

        {/* ── Standards: grey feature cards ── */}
        <section className="bg-white pb-20">
          <div className={container}>
            <div className="border-b border-line pb-10" data-reveal>
              <Heading accent="Engineering for business,">built for higher standards</Heading>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  data-reveal
                  style={delay((i % 3) * 90)}
                  className="group rounded-lg bg-soft p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_-20px_rgb(11_47_87/0.25)] hover:ring-1 hover:ring-line"
                >
                  <FeatureGlyph name={f.icon} className="h-9 w-9 text-navy transition group-hover:text-sky" />
                  <h3 className="mt-6 font-semibold text-navy">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section id="process" className="bg-soft py-20">
          <div className={container}>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16" data-reveal>
              <Heading accent="How we work:">clear steps, no surprises</Heading>
              <p className="leading-relaxed lg:pt-1">
                A proven process that keeps you in control. Fixed quotes, weekly demos and a live staging link, so you
                always know exactly where your project stands.
              </p>
            </div>
            <ol className="relative mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
              <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-line md:block" />
              {process.map((p, i) => (
                <li key={p.step} data-reveal style={delay(i * 120)} className="relative">
                  <span className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-white font-mono text-sm font-medium text-sky">
                    {p.step}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Work ── */}
        <section id="work" className={`${container} py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-10" data-reveal>
            <Heading accent="Our work,">products we&apos;ve designed and built</Heading>
            <Link href="/work" className="link-arrow text-sm">
              View all {products.length} projects <ArrowRight />
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {products.slice(0, 4).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} delay={(i % 2) * 120} />
            ))}
          </div>
          <div className="mt-14 flex justify-center" data-reveal>
            <Link href="/work" className="btn btn-outline">
              See all work <ArrowRight />
            </Link>
          </div>
        </section>

        {/* ── Tech stack ── */}
        <section className="border-y border-line bg-soft py-12">
          <div className={`${container} grid items-center gap-6 lg:grid-cols-[260px_1fr]`}>
            <p className="font-semibold text-navy" data-reveal>
              Technologies we build with
            </p>
            <ul className="flex flex-wrap gap-2.5" data-reveal style={delay(100)}>
              {stack.map((t) => (
                <li key={t} className="rounded-md border border-line bg-white px-3.5 py-2 text-sm font-medium text-ink">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className={`${container} py-20`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
              <Heading accent="Questions,">answered</Heading>
              <p className="mt-5 max-w-md leading-relaxed">
                Everything clients usually ask before starting a project. Can&apos;t find your answer? We&apos;re happy
                to talk it through.
              </p>
              <a href="#contact" className="link-arrow mt-6 text-sm">
                Ask us anything <ArrowRight />
              </a>
            </div>
            <div className="border-t border-line" data-reveal style={delay(100)}>
              {faq.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium text-ink transition hover:text-navy [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus className="h-4 w-4 shrink-0 text-sky transition duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="-mt-1 pb-6 pr-10 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
