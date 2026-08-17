import type { Metadata } from "next";
import { Suspense } from "react";
import { PageMasthead } from "@/components/ui/page-masthead";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { stages } from "@/lib/process";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Free site visits, itemised estimates, honest pricing. Based in ${siteConfig.contact.address.city}, Sri Lanka.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact · ${siteConfig.name}`,
    description:
      "Start a project or get a quote. Phone, WhatsApp, or send us the details directly.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageMasthead
        eyebrow="C-00 · Contact"
        title="Start a project,"
        titleAccent="or just say hello."
        intro="Four short steps — the first one is a single tap. Prefer to talk? Phone and WhatsApp are alongside the form."
        cells={[
          { label: "We reply within", value: "1", unit: "working day" },
          { label: "Site visit", value: "Free" },
          { label: "Estimate in", value: stages[1].duration },
          // Not office hours: those already sit under Phone in the sidebar,
          // and the full string wrapped mid-time on a phone. The step count
          // is the number someone hesitating over a form actually wants.
          { label: "Form steps", value: "04" },
        ]}
      />

      <section className="mx-auto w-full max-w-360 px-6 py-12 md:px-10 md:py-16 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-7">
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Sticky so the phone number is still reachable at step 04 without
              scrolling back up past the form. */}
          <div className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28 lg:self-start">
            <ContactSidebar />
          </div>
        </div>
      </section>
    </>
  );
}

function FormFallback() {
  return (
    <div className="py-6">
      <span className="font-meta text-meta-sm uppercase text-zinc">
        Loading form…
      </span>
    </div>
  );
}
