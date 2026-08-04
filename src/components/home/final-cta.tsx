import { RevealLines } from "@/components/motion/reveal-lines";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";

/**
 * The single ask, repeated at the end of each content page.
 *
 * Deliberately thin: phone, email, hours and the sitemap all live in the
 * footer immediately below, so repeating them here put the same details on
 * screen twice in a row. This block does one thing — make the ask — and
 * hands off everything else.
 */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-t border-graphite bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
          <div className="lg:col-span-7">
            <Eyebrow onDark>A-500 · Ready when you are</Eyebrow>

            {/* d3, not the hero's step — a closing line should not compete
                with the opening one. */}
            <RevealLines
              as="h2"
              id="final-cta-heading"
              className="mt-7 font-title text-d3 font-medium text-paper"
            >
              Let&rsquo;s build.
            </RevealLines>

            <p className="mt-5 max-w-measure text-copy text-concrete">
              A site visit and an estimate cost nothing. Tell us what
              you&rsquo;re thinking — we&rsquo;ll give you a straight answer
              and an honest number.
            </p>
          </div>

          {/* The ask sits on the statement's baseline rather than under it,
              so the band stays one line of thought. */}
          <div className="lg:col-span-5 lg:flex lg:justify-end lg:pb-1">
            <Button href="/contact" variant="primary" onDark arrow magnetic>
              Request a quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
