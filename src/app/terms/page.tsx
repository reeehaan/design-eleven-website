import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: `The terms for using the ${siteConfig.name} website, and how estimates and enquiries made through it work.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const { name } = siteConfig;
  return (
    <LegalPage
      title="Terms and conditions"
      updated="November 2026"
      intro={`These terms cover your use of the ${name} website. They do not replace the written contract we agree with you for any building work.`}
      sections={[
        {
          heading: "Using this website",
          body: [
            "You may browse the site and send us an enquiry for lawful purposes. Please do not misuse the site, try to break or overload it, or submit false or automated enquiries.",
          ],
        },
        {
          heading: "Estimates and information",
          body: [
            "Ranges, durations and descriptions on this site are typical, not quotes. The real price and programme come from a site visit and a written, itemised estimate. Nothing on the site is a binding offer.",
            "We take care to keep the information accurate, but we do not guarantee that it is complete or up to date.",
          ],
        },
        {
          heading: "Enquiries",
          body: [
            "Sending an enquiry does not create a contract. Work begins only when a written contract has been agreed and signed by both sides.",
          ],
        },
        {
          heading: "Our content",
          body: [
            `The text, images, drawings and design of this site belong to ${name} or are used with permission. Please ask before you copy or reuse them.`,
          ],
        },
        {
          heading: "Links to other sites",
          body: [
            "We may link to other websites. We are not responsible for their content or how they handle your information.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "To the extent the law allows, we are not liable for loss arising from your use of this website or from relying on the general information on it. Nothing here limits any right you have that cannot be limited by law.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of Sri Lanka, and its courts have jurisdiction over any dispute about them.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "We may change these terms. The date at the top shows when they last changed, and continued use of the site means you accept the current version.",
          ],
        },
      ]}
    />
  );
}
