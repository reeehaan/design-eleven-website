import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { OwnerStory } from "@/components/about/owner-story";
import { Principles } from "@/components/about/principles";
import { Capabilities } from "@/components/about/capabilities";
import { BehindScenes } from "@/components/about/behind-scenes";
import { Credentials } from "@/components/about/credentials";
import { FinalCta } from "@/components/home/final-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} — owner-led architecture and construction in Sri Lanka. Meet the small crew behind every project since ${siteConfig.established}.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${siteConfig.name}`,
    description: `Meet the team behind ${siteConfig.name}.`,
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by hand,"
        titleAccent="led by our team."
        intro={`${siteConfig.name} is a small, owner-led architecture and construction studio based in ${siteConfig.contact.address.city}. Founded in ${siteConfig.established}, we deliver residential builds, commercial projects, and interior finishing across Sri Lanka.`}
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
