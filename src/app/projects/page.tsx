import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkHeader } from "@/components/projects/work-header";
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
      <WorkHeader />

      <Suspense fallback={<GridFallback />}>
        <ProjectsGrid />
      </Suspense>

      <FinalCta />
    </>
  );
}

/** Matches the filter bar's height, so the header doesn't jump when it lands. */
function GridFallback() {
  return (
    <div className="border-b border-concrete">
      <div className="mx-auto w-full max-w-360 px-6 py-4 md:px-10 lg:px-16">
        <span className="flex min-h-11 items-center font-meta text-meta-sm uppercase text-zinc md:min-h-10">
          Loading projects…
        </span>
      </div>
    </div>
  );
}
