import { Logo } from "@/components/brand/Logo";
import Link from "next/link";
import { CONTACT_EMAIL, nav, services } from "@/content/home";
import { products } from "@/content/work";

export function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            A software studio building websites, web apps, mobile apps and custom platforms for ambitious businesses.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.title}>
                <Link href="/#services" className="text-muted transition hover:text-sky">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy">Our work</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="text-muted transition hover:text-sky">
                  {p.name} — {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted transition hover:text-sky">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted transition hover:text-sky">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-5 text-xs text-muted">
          © {new Date().getFullYear()} Trioga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
