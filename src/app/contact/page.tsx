import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Free site visits, itemised estimates, honest pricing. Based in ${siteConfig.contact.address.city}, Sri Lanka.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${siteConfig.name}`,
    description: "Start a project or get a quote. Phone, WhatsApp, or send us the details directly.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a project,"
        titleAccent="or just say hello."
        intro="Fill in a few details and we'll respond within 1 business day. Prefer to talk? Phone and WhatsApp are below."
      />

      <Container as="section" className="py-section-sm md:py-section">
        <div className="grid gap-16 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-8">
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </div>
          <div className="md:col-span-4 md:pl-8">
            <ContactSidebar />
          </div>
        </div>
      </Container>
    </>
  );
}

function FormFallback() {
  return (
    <div className="py-12">
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
        Loading form…
      </span>
    </div>
  );
}
