import type { CSSProperties } from "react";
import { ArrowRight } from "@/components/icons";
import { CONTACT_EMAIL } from "@/content/home";

/** Navy "start a project" band, shared by every page (anchor: #contact). */
export function ContactCta({
  accent = "Have an idea?",
  title = "Let's turn it into an app.",
}: {
  accent?: string;
  title?: string;
}) {
  return (
    <section id="contact" className="bg-navy">
      <div className="wrap grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            <span className="text-[#7cc8f0]">{accent}</span> {title}
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-white/75">
            Tell us what you want to build. We reply within one business day with next steps and a free, no-obligation
            estimate.
          </p>
        </div>
        <div data-reveal style={{ "--d": 120 } as CSSProperties} className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New project enquiry")}`}
            className="btn bg-white text-navy hover:bg-white/90"
          >
            Start a project <ArrowRight />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Book a free consultation")}`}
            className="btn border-[1.5px] border-white/70 text-white hover:bg-white hover:text-navy"
          >
            Book a free consultation
          </a>
        </div>
      </div>
    </section>
  );
}
