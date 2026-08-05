import type { Metadata } from "next";
import { PageMasthead } from "@/components/ui/page-masthead";
import { OwnerStory } from "@/components/about/owner-story";
import { Principles } from "@/components/about/principles";
import { Capabilities } from "@/components/about/capabilities";
import { BehindScenes } from "@/components/about/behind-scenes";
import { Credentials } from "@/components/about/credentials";
import { FinalCta } from "@/components/home/final-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} — owner-led architecture and construction in Sri Lanka. A crew of 8–12, never more than three sites at once, run by a qualified quantity surveyor since ${siteConfig.established}.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${siteConfig.name}`,
    description: `Meet the small crew behind ${siteConfig.name}.`,
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageMasthead
        eyebrow="B-00 · The studio"
        title="Small crew."
        titleAccent="Owner on site."
        intro={`Founded in ${siteConfig.established} in ${siteConfig.contact.address.city}, and deliberately kept small. The trade-off is that we turn work away; the return is that the person who priced your job is the person standing on it.`}
        cells={[
          { label: "Founded", value: String(siteConfig.established) },
          { label: "Crew", value: "8–12" },
          { label: "Sites at once", value: "2–3" },
          { label: "Reg. no", value: siteConfig.businessRegNo, code: true },
        ]}
      />
      <OwnerStory />
      <Principles />
      <Capabilities />
      <BehindScenes />
      <Credentials />
      <FinalCta />
    </>
  );
}
