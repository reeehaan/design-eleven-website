import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectHero } from "@/components/project-detail/project-hero";
import { ProjectBody } from "@/components/project-detail/project-body";
import { ProjectGallery } from "@/components/project-detail/project-gallery";
import { BeforeAfter } from "@/components/project-detail/before-after";
import { Materials } from "@/components/project-detail/materials";
import { ProjectTestimonial } from "@/components/project-detail/project-testimonial";
import { ProjectNav } from "@/components/project-detail/project-nav";
import { FinalCta } from "@/components/home/final-cta";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} · ${siteConfig.name}`,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: [
        {
          url: project.cover.src,
          alt: project.cover.alt,
          width: 1600,
          height: 1200,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <ProjectHero project={project} />
      <ProjectBody project={project} />

      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery images={project.gallery} />
      )}

      {project.beforeAfter && <BeforeAfter pair={project.beforeAfter} />}

      {project.materials && project.materials.length > 0 && (
        <Materials items={project.materials} />
      )}

      {project.testimonialId && (
        <ProjectTestimonial testimonialId={project.testimonialId} />
      )}

      <ProjectNav prev={prev} next={next} />
      <FinalCta />
    </>
  );
}
