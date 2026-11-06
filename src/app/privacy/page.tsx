import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${siteConfig.name} collects, uses and protects the personal information you share through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { name, owner, contact } = siteConfig;
  return (
    <LegalPage
      title="Privacy policy"
      updated="November 2026"
      intro={`${name} is run by ${owner} from ${contact.address.city}, Sri Lanka. This page explains what we collect when you use this website, why, who handles it, and the choices you have.`}
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you send a project enquiry we collect your name, phone number, email address, the project address and district, the type of project, and anything you choose to add: budget, completion date, comments, a link to reference files, how you heard about us, and whether you prefer WhatsApp.",
            "Our servers also record your IP address and browser details when you submit the form, for spam protection and security.",
            "If you accept analytics cookies, an analytics service records how you use the site, such as the pages you view and the device you use. If you decline, none of this is collected.",
          ],
        },
        {
          heading: "Why we use it",
          body: [
            "To reply to your enquiry, arrange a site visit and prepare an estimate. To keep a record of enquiries. To protect the form from spam and abuse. And, only with your consent, to understand how the website is used so we can improve it.",
          ],
        },
        {
          heading: "Who handles it",
          body: [
            "We use service providers to run the site. They process data only to provide their service: Vercel (hosting), Supabase (storing enquiries), Resend (sending the enquiry and confirmation emails), Cloudflare Turnstile (spam checking), Upstash (limiting repeated submissions) and, if you accept analytics, Google Analytics.",
            "We do not sell your personal information.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "The site needs no cookies to work. When you choose Accept on the cookie banner we load analytics, which sets cookies. When you choose Decline we do not. Your choice is remembered in your browser, and you can change it at any time by clearing this site's data in your browser.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "We keep enquiries for as long as needed to deal with your project and to meet our record-keeping duties, then delete them. You can ask us to delete yours sooner.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            `You can ask to see the personal information we hold about you, to correct it, or to delete it, and you can withdraw consent to analytics at any time. Write to ${contact.email}. We handle personal data in line with applicable Sri Lankan law, including the Personal Data Protection Act.`,
          ],
        },
        {
          heading: "Changes",
          body: [
            "We may update this policy. The date at the top shows when it last changed.",
          ],
        },
      ]}
    />
  );
}
