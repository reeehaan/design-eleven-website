import { ProjectCard } from "./project-card";
import { getAllProjects } from "@/lib/projects";

/** Every project, four across, edge to edge. */
export function ProjectsGrid() {
  const projects = getAllProjects();

  return (
    <section aria-labelledby="projects-heading" className="bg-paper px-3 pb-28">
      <h1
        id="projects-heading"
        className="pb-8 pt-24 font-sans text-base font-semibold text-ink md:pt-32"
      >
        All projects ({projects.length})
      </h1>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-y-12">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
