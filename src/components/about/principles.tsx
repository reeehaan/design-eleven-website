import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { RevealItems } from "@/components/motion/reveal-items";

type Principle = {
  title: string;
  description: string;
};

const principles: Principle[] = [
  {
    title: "We finish what we start.",
    description:
      "Half-built projects, abandoned sites, ghosted contractors — we know the stories. We don't add to them. Once we commit, we deliver.",
  },
  {
    title: "Site is sacred.",
    description:
      "Your home, your office, your land. We treat it like ours: clean, secure, respected. Crew shows up on time, leaves the site tidy, and protects what's already there.",
  },
  {
    title: "Honest estimates.",
    description:
      "Itemised quotes in writing. If something changes, we tell you before we do it — never as an invoice line at the end. No vague 'extras', no surprises.",
  },
  {
    title: "Owner-led, always.",
    description:
      "Our principal is on every site, every week. Decisions go through someone who knows the build, not a manager who's never seen it. You always know who's responsible.",
  },
];

export function Principles() {
  return (
    <section
      aria-labelledby="principles-heading"
      className="border-t border-concrete bg-paper-sunk"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>B-02 &middot; Principles</Eyebrow>
            <RevealLines
              as="h2"
              id="principles-heading"
              className="mt-8 max-w-[16ch] font-title text-d2 font-medium text-ink"
            >
              How we <span className="text-zinc">actually work.</span>
            </RevealLines>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-measure text-lead text-graphite">
              Four things we hold ourselves to, on every project, regardless of
              size.
            </p>
          </div>
        </div>

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
