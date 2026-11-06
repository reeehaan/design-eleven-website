import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { FinalCta } from "@/components/home/final-cta";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected projects by ${siteConfig.name}, residential builds, commercial construction, and interior finishing across Sri Lanka.`,
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
      <ProjectsGrid projects={getAllProjects()} />
      <FinalCta />
    </>
  );
}
