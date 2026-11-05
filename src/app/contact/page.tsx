import type { Metadata } from "next";
import { Suspense } from "react";
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
    <section
      aria-labelledby="contact-heading"
      className="bg-paper px-3 pb-16 pt-12 md:pb-32 md:pt-48"
    >
      <div className="grid grid-cols-12 gap-x-3 gap-y-10 md:gap-y-16">
        <div className="col-span-12 md:sticky md:top-28 md:col-span-5 md:self-start">
          <div className="max-w-[26rem] space-y-6 font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink">
            <p>
              Tell us about your site, the project you are planning and your
              timeline. Prefer to talk? Phone and WhatsApp are alongside the
              form.
            </p>
            <p>
              We reply within 1 working day. The site visit is free, and the
              itemised estimate follows in {stages[1].duration}.
            </p>
          </div>
          <div className="mt-10 md:mt-16">
            <ContactSidebar />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <h1
            id="contact-heading"
            className="font-sans text-[clamp(1.75rem,2.9vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
          >
            Start a project, or just say hello.
          </h1>
          <div className="mt-10">
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormFallback() {
  return (
    <div className="py-6">
      <span className="font-meta text-meta-sm text-zinc">
        Loading form…
      </span>
    </div>
  );
}
