import type { Metadata } from "next";
import Link from "next/link";
import { ContactCta } from "@/components/site/ContactCta";
import { Heading } from "@/components/site/Heading";
import { WorkGrid } from "@/components/work/WorkGrid";
import { products } from "@/content/work";

export const metadata: Metadata = {
  title: "Our Work — Apps & Platforms We've Built",
  description:
    "QR code generator, room & hostel finder, expense tracker, school bus tracking and an online learning platform — web and mobile products designed and built by Trioga.",
  alternates: { canonical: "/work" },
};

const platforms = new Set(products.flatMap((p) => p.platforms));

export default function WorkPage() {
  return (
    <>
      <div className="wrap pt-6 text-xs text-muted">
        <Link href="/" className="hover:text-sky">
          Home
        </Link>{" "}
        / <span className="text-ink">Work</span>
      </div>

      <section className="wrap pb-10 pt-12 sm:pt-16">
        <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <Heading as="h1" accent="Our work,">products we&apos;ve designed, built and shipped</Heading>
          </div>
          <div data-reveal style={{ "--d": 120 } as React.CSSProperties} className="lg:pt-2">
            <p className="text-base leading-relaxed sm:text-[17px]">
              From utilities people use every day to multi-app platforms connecting schools, drivers and parents — each
              project was taken from idea to production by our team.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-6">
              <div>
                <dt className="text-sm text-muted">Products</dt>
                <dd className="text-3xl font-semibold text-navy">{products.length}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Platforms</dt>
                <dd className="text-3xl font-semibold text-navy">{platforms.size}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Multi-app systems</dt>
                <dd className="text-3xl font-semibold text-navy">{products.filter((p) => p.roles).length}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="wrap pb-24">
        <WorkGrid products={products} />
      </section>

      <ContactCta accent="Have a similar idea?" title="Let's build it together." />
    </>
  );
}
