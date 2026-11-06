"use client";

import { useCallback, useState } from "react";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/projects";

/** Every project, four across, edge to edge. */
export function ProjectsGrid({
  projects,
  heading = "All projects",
}: {
  projects: Project[];
  heading?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hover = useCallback(
    (slug: string) => (on: boolean) => setHovered(on ? slug : null),
    [],
  );

  return (
    <section aria-labelledby="projects-heading" className="bg-paper px-3 pb-28">
      <h1
        id="projects-heading"
        className="pb-8 pt-24 font-sans text-base font-semibold text-ink md:pt-32"
      >
        {heading} ({projects.length})
      </h1>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-y-12">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            dim={hovered !== null && hovered !== project.slug}
            onHover={hover(project.slug)}
          />
        ))}
      </div>
    </section>
  );
}
