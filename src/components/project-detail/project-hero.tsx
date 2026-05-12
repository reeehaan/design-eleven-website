import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { Project } from "@/lib/projects";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="project-hero-title"
      className="relative h-[70vh] min-h-[520px] w-full overflow-hidden md:h-[85vh]"
    >
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface-dark/85 via-surface-dark/40 to-transparent"
      />

      {/* Title block */}
      <Container className="absolute inset-x-0 bottom-0 pb-12 md:pb-section-sm">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-bg-primary/80">
          {project.category}{" "}
          <span className="text-bg-primary/60">· {project.location}</span>{" "}
          <span className="text-bg-primary/60">· {project.year}</span>
        </span>

        <h1
          id="project-hero-title"
          className="mt-4 font-display text-display-xl leading-[0.95] text-bg-primary"
        >
          {project.title}
        </h1>
      </Container>
    </section>
  );
}
