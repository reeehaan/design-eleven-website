import type { Metadata } from "next";
import Link from "next/link";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Button } from "@/components/ui/button";
import { PageMasthead } from "@/components/ui/page-masthead";
import { EngagementsList } from "@/components/services/engagements-list";
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
          <EngagementsList />

          <p className="mt-12 max-w-measure border-t border-concrete pt-8 text-fine text-zinc">
            Ranges are typical, not quotes. Every job is measured and priced
            individually — that is the whole point of having a quantity surveyor
            run it. <span className="uppercase">[Draft copy]</span>
          </p>
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
            there is no third party to wait on, and no one to blame.
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
