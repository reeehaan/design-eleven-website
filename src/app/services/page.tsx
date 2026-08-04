import type { Metadata } from "next";
import Link from "next/link";
import { RevealLines } from "@/components/motion/reveal-lines";
import { RevealLead } from "@/components/motion/reveal-lead";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";
import { ProcessStages } from "@/components/services/process-stages";
import { InclusionsTable } from "@/components/services/inclusions-table";
import { ServicesFaq } from "@/components/services/services-faq";
import { engagements } from "@/lib/process";
import { getServicesOrdered } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Process",
  description: `How a build actually runs with ${siteConfig.name} — six stages, what you decide at each, and what it costs to change your mind. Itemised estimates priced by a quantity surveyor.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services & Process · ${siteConfig.name}`,
    description:
      "Four ways to work with us, and the six stages of a build — including what changing your mind costs at each one.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const trades = getServicesOrdered();

  return (
    <>
      <section className="bg-paper">
        <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-28 lg:px-16">
          <Eyebrow>S-00 · Services &amp; process</Eyebrow>
          <RevealLines
            as="h1"
            className="mt-8 max-w-[16ch] font-title text-d1 font-medium text-ink"
          >
            What we do, and exactly how it runs.
          </RevealLines>
          <RevealLead className="mt-10 max-w-measure text-lead text-graphite">
            Four ways to work with us, and the six stages every job passes
            through. We publish the timings and the cost of changing your mind,
            because those are the two things that actually go wrong.
          </RevealLead>
        </div>
      </section>

      <section
        aria-labelledby="engagements-heading"
        className="border-t border-concrete bg-paper"
      >
        <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <Eyebrow>S-01 · What you can hire us for</Eyebrow>
          <RevealLines
            as="h2"
            id="engagements-heading"
            className="mt-8 max-w-[20ch] font-title text-d2 font-medium text-ink"
          >
            Four engagements, priced honestly.
          </RevealLines>

          <ul className="mt-14 grid border-l border-t border-concrete md:grid-cols-2">
            {engagements.map((e) => (
              <li
                key={e.slug}
                className="flex flex-col border-b border-r border-concrete p-7 md:p-9"
              >
                <p className="font-meta text-meta-sm uppercase text-zinc">
                  {e.ref}
                </p>
                <h3 className="mt-4 font-title text-d4 font-medium text-ink">
                  {e.title}
                </h3>
                <p className="mt-4 max-w-measure text-copy text-graphite">
                  {e.whatItIs}
                </p>

                <p className="mt-5 max-w-measure text-fine text-zinc">
                  <span className="font-meta text-meta-sm uppercase">
                    Who it&rsquo;s for —{" "}
                  </span>
                  {e.whoItsFor}
                </p>

                {/* Typical range is the trust content, so it gets the title block */}
                <dl className="mt-auto grid grid-cols-2 border-t border-concrete">
                  <div className="border-r border-concrete pr-4 pt-4">
                    <dt className="font-meta text-meta-sm uppercase text-zinc">
                      Typical range
                    </dt>
                    <dd className="mt-2 font-meta text-meta uppercase text-ink">
                      {e.typicalRange}
                    </dd>
                  </div>
                  <div className="pl-4 pt-4">
                    <dt className="font-meta text-meta-sm uppercase text-zinc">
                      Typical duration
                    </dt>
                    <dd className="mt-2 font-meta text-meta uppercase text-ink">
                      {e.typicalDuration}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7">
                  {/* Carries context so the contact form arrives pre-filled */}
                  <Button
                    variant="inline"
                    href={`/contact?service=${e.contactParam}`}
                  >
                    Enquire about this
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-measure text-fine text-zinc">
            Ranges are typical, not quotes. Every job is measured and priced
            individually — that is the whole point of having a quantity
            surveyor run it. <span className="uppercase">[Draft copy]</span>
          </p>
        </div>
      </section>

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
          <Eyebrow>S-02 · What a contract covers</Eyebrow>
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
        </div>
      </section>

      <section
        aria-labelledby="trades-heading"
        className="border-t border-concrete bg-paper-sunk"
      >
        <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <Eyebrow>S-03 · Trades we carry in-house</Eyebrow>
          <RevealLines
            as="h2"
            id="trades-heading"
            className="mt-8 max-w-[20ch] font-title text-d2 font-medium text-ink"
          >
            Fewer subcontractors, fewer excuses.
          </RevealLines>
          <p className="mt-8 max-w-measure text-lead text-graphite">
            Work we do ourselves rather than sublet. It is why programmes hold:
            there is no third party to wait on, and no one to blame.
          </p>

          {/* Per-cell borders, not gap-px over a fill: an incomplete final row
              would otherwise leave a block of raw background showing. */}
          <ul className="mt-12 grid border-l border-t border-concrete sm:grid-cols-2 lg:grid-cols-3">
            {trades.map((t) => (
              <li key={t.slug} className="border-b border-r border-concrete p-6">
                <h3 className="font-meta text-meta uppercase text-ink">
                  {t.title}
                </h3>
                <p className="mt-3 max-w-measure text-fine text-graphite">
                  {t.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ServicesFaq />

      <section className="border-t border-graphite bg-ink text-paper">
        <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <RevealLines
            as="h2"
            className="max-w-[18ch] font-title text-d2 font-medium text-paper"
          >
            Send us the plot, the plan, or just the problem.
          </RevealLines>
          <p className="mt-8 max-w-measure text-lead text-concrete">
            The site visit and the estimate are free. You will know the number
            before you commit to anything.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/contact" variant="primary" onDark magnetic>
              Request an estimate
            </Button>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="font-meta text-meta uppercase text-concrete underline-offset-4 transition-colors hover:text-verdigris-light hover:underline"
            >
              or call {siteConfig.contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-10 font-meta text-meta-sm uppercase text-zinc">
            Prefer to see the work first?{" "}
            <Link
              href="/projects"
              className="text-concrete underline underline-offset-4 transition-colors hover:text-verdigris-light"
            >
              Selected projects →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
