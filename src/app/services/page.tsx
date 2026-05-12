import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ServiceNav } from "@/components/services/service-nav";
import { ServiceSection } from "@/components/services/service-section";
import { ServicesFaq } from "@/components/services/services-faq";
import { FinalCta } from "@/components/home/final-cta";
import { getServicesOrdered } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Construction services from ${siteConfig.name}: residential builds, commercial construction, and interior finishing across Sri Lanka. Free site visits and itemised estimates.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Services · ${siteConfig.name}`,
    description: "What we build — residential, commercial, and interior finishing.",
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesPage() {
  const services = getServicesOrdered();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="What we build,"
        titleAccent="and how."
        intro="Three core services, delivered with the same craft and clarity. Every project starts with a free site visit and an itemised written quote."
      />

      <Container as="div" className="py-section-sm md:py-section">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
          <aside className="md:col-span-3">
            <ServiceNav services={services} />
          </aside>

          <div className="md:col-span-9">
            {services.map((service, i) => (
              <div
                key={service.slug}
                className="border-b border-surface-line last:border-b-0"
              >
                <ServiceSection service={service} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <ServicesFaq />
      <FinalCta />
    </>
  );
}
