import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CONTACT_EMAIL, nav } from "@/content/home";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <div className="border-b border-line">
        <div className="wrap flex h-[72px] items-center justify-between gap-6">
          <Link href="/" aria-label="Trioga home" className="shrink-0">
            <Logo />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium uppercase tracking-wide text-ink transition hover:text-sky"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a href="#contact" className="btn btn-primary shrink-0 whitespace-nowrap !px-4 !py-2.5 sm:!px-5">
            Start a project
          </a>
        </div>
      </div>
      {/* Utility bar, as on enterprise sites */}
      <div className="hidden bg-soft sm:block">
        <div className="wrap flex h-9 items-center justify-end gap-6 text-xs font-medium text-navy">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Taking on new projects
          </span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-sky">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </header>
  );
}
