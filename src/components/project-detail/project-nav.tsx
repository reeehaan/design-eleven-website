import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Project } from "@/lib/projects";

type ProjectNavProps = {
  prev: Project | null;
  next: Project | null;
};

export function ProjectNav({ prev, next }: ProjectNavProps) {
  if (!prev && !next) return null;

  return (
    <section
      aria-label="More projects"
      className="border-t border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {prev && <NavCard project={prev} direction="prev" />}
          {next && <NavCard project={next} direction="next" />}
        </div>
      </Container>
    </section>
  );
}

function NavCard({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-4"
      aria-label={`${direction === "prev" ? "Previous" : "Next"} project: ${project.title}`}
    >
      <div
        className={`flex items-baseline justify-between gap-4 ${direction === "next" ? "flex-row-reverse" : ""}`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted transition-colors group-hover:text-accent">
          {direction === "prev" ? "← Previous project" : "Next project →"}
        </span>
        <span className="font-mono text-xs text-fg-subtle">{project.year}</span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-secondary">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <h3 className="font-display text-3xl text-fg-primary transition-colors group-hover:text-accent md:text-4xl">
        {project.title}
      </h3>
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
        {project.category} · {project.location}
      </span>
    </Link>
  );
}
