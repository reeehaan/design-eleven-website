import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

/** A tall photograph, then the number and the name on one line. */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article>
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={`View project: ${project.title}`}
      >
        <div className="relative aspect-4/5 w-full overflow-clip bg-paper-sunk">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="mt-2 grid grid-cols-3 gap-x-3 font-sans text-base font-semibold text-ink md:grid-cols-[1fr_2fr]">
          <span className="tabular-nums">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <span className="col-span-2 underline-offset-4 group-hover:underline md:col-span-1">
            {project.title}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-x-3 font-sans text-base font-semibold text-zinc md:grid-cols-[1fr_2fr]">
          <span className="col-span-2 md:col-span-1 md:col-start-2">
            {project.location}
          </span>
        </div>
      </Link>
    </article>
  );
}
