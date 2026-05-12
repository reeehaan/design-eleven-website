import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { FinalCta } from "@/components/home/final-cta";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected projects by ${siteConfig.name} — residential builds, commercial construction, and interior finishing across Sri Lanka.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects · ${siteConfig.name}`,
    description: "Browse our portfolio of completed work.",
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected work,"
        titleAccent="across Sri Lanka."
        intro="Filter by category or year. Click any project to see the full story — process, materials, and the finished result."
      />

      <Container as="section" className="py-section-sm md:py-section">
        <Suspense fallback={<GridFallback />}>
          <ProjectsGrid />
        </Suspense>
      </Container>

      <FinalCta />
    </>
  );
}

function GridFallback() {
  return (
    <div className="border-y border-surface-line py-6 md:py-8">
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
        Loading projects…
      </span>
    </div>
  );
}
