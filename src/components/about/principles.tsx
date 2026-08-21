import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { RevealItems } from "@/components/motion/reveal-items";

type Principle = {
  title: string;
  description: string;
};

/**
 * One line each, deliberately.
 *
 * These ran to ~28 words apiece and mostly restated their own titles. Worse,
 * "Owner-led, always" repeated the masthead ("Owner on site.") and the story
 * paragraph ("our principal is at every site visit") — the same claim three
 * times on one page — and "Honest estimates" elaborated on change-costs that
 * /process now documents stage by stage. A commitment reads as a commitment
 * when it is short enough to be one.
 */
const principles: Principle[] = [
  {
    title: "We finish what we start.",
    description: "Abandoned sites are common here. We do not add to the count.",
  },
  {
    title: "Site is sacred.",
    description:
      "Crew on time, site left clean, and whatever is already there protected.",
  },
  {
    title: "Honest estimates.",
    description:
      "Itemised in writing. Variations priced and approved before the work, never after.",
  },
  {
    title: "Owner-led, always.",
    description: "The person who priced your job is the one standing on it.",
  },
];

export function Principles() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="border-t border-concrete bg-paper-sunk"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
        {/* No lead paragraph and so no two-column split. The one that sat
            here — "four things we hold ourselves to, on every project,
            regardless of size" — described the list instead of saying
            anything; the heading and the four numbered clauses are the list. */}
        <Eyebrow>B-02 &middot; Principles</Eyebrow>
        <RevealLines
          as="h2"
          id="principles-heading"
          className="mt-8 max-w-[16ch] font-title text-d2 font-medium text-ink"
        >
          How we <span className="text-zinc">actually work.</span>
        </RevealLines>

        {/* Numbered on a rule, the way a spec clause is — these are
            commitments, not features, and the numbering says so. */}
        <RevealItems
          as="ol"
          className="mt-14 grid gap-x-12 gap-y-12 md:mt-16 md:grid-cols-2"
          selector=":scope > li"
        >
          {principles.map((p, i) => (
            <li key={p.title}>
              <div className="flex items-baseline gap-5">
                <span
                  aria-hidden="true"
                  className="font-meta text-meta-sm uppercase text-zinc"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-concrete" />
              </div>
              <h3 className="mt-5 max-w-[18ch] font-title text-d4 font-medium text-ink">
                {p.title}
              </h3>
              <p className="mt-3 max-w-measure text-copy text-graphite">
                {p.description}
              </p>
            </li>
          ))}
        </RevealItems>
      </div>
    </section>
  );
}
