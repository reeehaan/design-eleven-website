import { siteConfig } from "@/lib/site";

type Fact = { label: string; value: string };

/**
 * The statement, then one row on a twelve-column grid: story in the fourth
 * column, the studio's facts in the tenth. Labels sit in the first.
 */
export function StudioIntro({
  statement,
  facts,
}: {
  statement: string;
  facts: Fact[];
}) {
  return (
    <section
      aria-label="The studio"
      className="bg-paper px-3 pb-14 pt-20 md:pb-40 md:pt-32"
    >
      <p className="max-w-[26ch] font-sans text-[clamp(1.75rem,2.9vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.025em] text-ink">
        {statement}
      </p>

      <div className="mt-12 grid grid-cols-12 gap-x-3 gap-y-10 md:mt-44">
        <p className="col-span-12 font-sans text-base font-semibold text-ink md:col-span-3">
          The story
        </p>

        <div className="col-span-12 space-y-6 font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink md:col-span-4 md:col-start-4">
          <p>
            {siteConfig.name} was founded in {siteConfig.established} by{" "}
            {siteConfig.owner} after years working on residential and commercial
            sites across Sri Lanka. The decision to start independently came
            from a simple frustration: too many projects were being managed by
            people who weren&rsquo;t actually on site.
          </p>
          <p>
            Today we are a small, owner-led crew. Our principal is at every site
            visit, every key decision, every handover. We do not take on more
            projects than we can supervise properly, that is the trade-off, and
            it is one we are happy to make.
          </p>
        </div>

        <dl className="col-span-12 font-sans text-[1.0625rem] font-semibold leading-[1.2] tracking-[-0.01em] text-ink md:col-span-3 md:col-start-10">
          {facts.map((f) => (
            <div key={f.label} className="flex justify-between gap-4 py-0.5">
              <dt className="text-zinc">{f.label}</dt>
              <dd className="text-right">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
