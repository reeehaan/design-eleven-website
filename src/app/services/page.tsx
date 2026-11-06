import type { Metadata } from "next";
import { ServicesHero } from "@/components/services/services-hero";
import { EngagementsTrack } from "@/components/services/engagements-track";
import { TradesShowcase } from "@/components/services/trades-showcase";
import { ServicesFaq } from "@/components/services/services-faq";
import { FinalCta } from "@/components/home/final-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `What you can hire ${siteConfig.name} for, four engagements with typical ranges and durations, and the seven trades we carry in-house. Itemised estimates priced by a quantity surveyor.`,
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
      <ServicesHero
        statement="What we do, and what it costs."
        intro="Four ways to work with us, and the seven trades we keep in-house rather than sublet. Every range here is typical, not a quote, the real number comes from a site visit."
      />
      <EngagementsTrack />
      <TradesShowcase />
      <ServicesFaq />
      <FinalCta />
    </>
  );
}
