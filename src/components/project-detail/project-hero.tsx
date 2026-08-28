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
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent"
      />

      {/* Title block */}
      <Container className="absolute inset-x-0 bottom-0 pb-12 md:pb-16">
        <span className="font-meta text-meta-sm uppercase text-paper/80">
          {project.category}{" "}
          <span className="text-paper/60">· {project.location}</span>{" "}
          <span className="text-paper/60">· {project.year}</span>
        </span>

        <h1
          id="project-hero-title"
          className="mt-4 font-title text-d1 font-medium text-paper"
        >
          {project.title}
        </h1>
      </Container>
    </section>
  );
}
