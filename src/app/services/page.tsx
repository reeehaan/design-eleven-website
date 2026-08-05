import type { Metadata } from "next";
import Link from "next/link";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";
import { PageMasthead } from "@/components/ui/page-masthead";
import { ServicesFaq } from "@/components/services/services-faq";
import { ServicesRegister } from "@/components/services/services-register";
import { engagements } from "@/lib/process";
import { getServicesOrdered } from "@/lib/services";
import { siteConfig } from "@/lib/site";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export const metadata: Metadata = {
  title: "Services",
  description: `What you can hire ${siteConfig.name} for — four engagements with typical ranges and durations, and the seven trades we carry in-house. Itemised estimates priced by a quantity surveyor.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services · ${siteConfig.name}`,
    description:
      "Four ways to work with us, and the seven trades we carry in-house rather than sublet.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageMasthead
        eyebrow="S-00 · Services"
        title="What we do,"
        titleAccent="and what it costs."
        intro="Four ways to work with us, and the seven trades we keep in-house rather than sublet. Every range here is typical, not a quote — the real number comes from a site visit."
        cells={[
          { label: "Engagements", value: pad(engagements.length) },
          { label: "Trades in-house", value: pad(getServicesOrdered().length) },
          { label: "Lead time", value: "2–6", unit: "weeks" },
          { label: "Site visit", value: "Free" },
        ]}
      />

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

          <div className="mt-10 flex flex-col gap-6 border-t border-concrete pt-8 md:flex-row md:items-baseline md:justify-between">
            <p className="max-w-measure text-fine text-zinc">
              Ranges are typical, not quotes. Every job is measured and priced
              individually — that is the whole point of having a quantity
              surveyor run it. <span className="uppercase">[Draft copy]</span>
            </p>
            {/* The six stages and the contract terms used to sit below this
                point. They are a different question, so they are a different
                page — this is the hand-off. */}
            <Button href="/process" variant="inline">
              How a build runs, stage by stage
            </Button>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="trades-heading"
        className="border-t border-concrete bg-paper-sunk"
      >
        <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <Eyebrow>S-02 · Trades we carry in-house</Eyebrow>
          <RevealLines
            as="h2"
            id="trades-heading"
            className="mt-8 max-w-[20ch] font-title text-d2 font-medium text-ink"
          >
            Fewer subcontractors, fewer excuses.
          </RevealLines>
          <p className="mt-8 max-w-measure text-lead text-graphite">
            Work we do ourselves rather than sublet. It is why programmes hold:
            there is no third party to wait on, and no one to blame. Open any
            row for the scope, the sequence, and what it starts at.
          </p>

          <ServicesRegister />
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
