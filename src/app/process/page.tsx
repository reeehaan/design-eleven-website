import type { Metadata } from "next";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";
import { PageMasthead, type MastheadCell } from "@/components/ui/page-masthead";
import { ProcessStages } from "@/components/services/process-stages";
import { InclusionsTable } from "@/components/services/inclusions-table";
import { FinalCta } from "@/components/home/final-cta";
import { stages } from "@/lib/process";
import { siteConfig } from "@/lib/site";

/**
 * Read off the stage data rather than typed in, so the masthead cannot drift
 * from the six stages printed below it.
 *
 * "Free to change" counts the leading stages whose changeCost is nothing —
 * the single most useful figure on the page, and the one no competitor
 * publishes.
 */
function register(): MastheadCell[] {
  let free = 0;
  for (const s of stages) {
    if (!s.changeCost.startsWith("Nothing")) break;
    free += 1;
  }

  return [
    { label: "Stages", value: String(stages.length).padStart(2, "0") },
    { label: "First visit", value: stages[0].duration },
    { label: "Estimate in", value: stages[1].duration },
    { label: "Free to change", value: `Stages 01–0${free}` },
  ];
}

export const metadata: Metadata = {
  title: "How we work",
  description: `The six stages every ${siteConfig.name} build passes through, what you decide at each, and what changing your mind costs — plus exactly what a contract covers and what it does not.`,
  alternates: { canonical: "/process" },
  openGraph: {
    title: `How we work · ${siteConfig.name}`,
    description:
      "Six stages, the cost of changing your mind at each, and what a contract includes and excludes.",
    url: `${siteConfig.url}/process`,
  },
};

export default function ProcessPage() {
  return (
    <>
      <PageMasthead
        eyebrow="A-100 · How we work"
        title="Six stages,"
        titleAccent="and what each one costs you."
        intro="Every job runs the same way, whatever its size. We publish the timings and the price of changing your mind at each stage, because those are the two things that actually go wrong."
        cells={register()}
      />

      <section
        aria-labelledby="process-heading"
        className="border-t border-graphite bg-ink text-paper"
      >
        <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-28 lg:px-16">
          <ProcessStages />
        </div>
      </section>

      <section
        aria-labelledby="inclusions-heading"
        className="border-t border-concrete bg-paper"
      >
        <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <Eyebrow>A-300 &middot; What a contract covers</Eyebrow>
          <RevealLines
            as="h2"
            id="inclusions-heading"
            className="mt-8 max-w-[22ch] font-title text-d2 font-medium text-ink"
          >
            Included, and just as importantly, not included.
          </RevealLines>
          <p className="mt-8 max-w-measure text-lead text-graphite">
            The right-hand column is the one worth reading. Exclusions are where
            budgets break, so we publish ours rather than mention them on site.
          </p>

          <div className="mt-14">
            <InclusionsTable />
          </div>

          <p className="mt-10">
            <Button href="/services" variant="inline">
              See what you can hire us for
            </Button>
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
