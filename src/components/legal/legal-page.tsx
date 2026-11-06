import { siteConfig } from "@/lib/site";

export type LegalSection = { heading: string; body: string[] };

/** A plain long-form page: title, date, then numbered sections on the grid. */
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  const body =
    "font-sans text-[1.0625rem] font-semibold leading-[1.25] tracking-[-0.01em] text-ink";
  return (
    <article
      aria-labelledby="legal-title"
      className="bg-paper px-3 pb-20 pt-14 md:pb-32 md:pt-40"
    >
      <h1
        id="legal-title"
        className="max-w-[18ch] font-sans text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink"
      >
        {title}
      </h1>
      <div className="mt-8 grid grid-cols-12 gap-x-3 gap-y-6 md:mt-16">
        <p className={`col-span-12 text-zinc md:col-span-3 ${body}`}>
          Last updated {updated}
        </p>
        <p className={`col-span-12 md:col-span-6 md:col-start-4 ${body}`}>
          {intro}
        </p>
      </div>

      <div className="mt-12 md:mt-20">
        {sections.map((s, i) => (
          <section
            key={s.heading}
            className="grid grid-cols-12 gap-x-3 gap-y-4 border-t border-ink py-4"
          >
            <h2 className={`col-span-12 md:col-span-3 ${body}`}>
              <span className="mr-3 text-zinc tabular-nums">{i + 1}</span>
              {s.heading}
            </h2>
            <div
              className={`col-span-12 space-y-4 md:col-span-6 md:col-start-4 ${body}`}
            >
              {s.body.map((p) => (
                <p key={p} className="text-graphite">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className={`mt-12 text-graphite ${body}`}>
        Questions about this page: {siteConfig.contact.email}
      </p>
    </article>
  );
}
