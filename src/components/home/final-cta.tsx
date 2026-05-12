import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export function FinalCta() {
  const phoneTel = siteConfig.contact.phone.replace(/\s/g, "");
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-surface-dark text-bg-primary"
    >
      <Container>
        <div className="grid gap-12 py-section md:grid-cols-12 md:gap-x-10 md:py-section-lg">
          {/* Statement */}
          <Reveal className="md:col-span-7">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-bg-primary/60">
              Ready when you are
            </span>
            <h2
              id="final-cta-heading"
              className="mt-6 font-display text-display-xl leading-[0.9] text-bg-primary"
            >
              Let&rsquo;s{" "}
              <span className="italic text-accent">build</span>.
            </h2>
            <p className="mt-8 max-w-md text-body-lg text-bg-primary/70">
              A site visit and an estimate cost nothing. Tell us what
              you&rsquo;re thinking — we&rsquo;ll give you a straight answer
              and an honest number.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-medium text-bg-primary transition-colors hover:bg-bg-primary hover:text-surface-dark"
            >
              Request a quote
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          {/* Direct contact */}
          <Reveal className="md:col-span-4 md:col-start-9 md:pt-4" delay={0.1}>
            <div className="flex flex-col gap-8 border-t border-white/10 pt-8 md:border-t-0 md:pt-0">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-bg-primary/50">
                  Call directly
                </span>
                <a
                  href={`tel:${phoneTel}`}
                  className="mt-3 block font-display text-3xl text-bg-primary transition-colors hover:text-accent md:text-4xl"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <span className="mt-1 block text-sm text-bg-primary/50">
                  {siteConfig.contact.hours}
                </span>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-bg-primary/50">
                  Or message on
                </span>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bg-primary transition-colors hover:text-accent"
                  >
                    WhatsApp →
                  </a>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-bg-primary transition-colors hover:text-accent"
                  >
                    Email →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
