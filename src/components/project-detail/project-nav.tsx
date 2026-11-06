import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectNavProps = {
  prev: Project | null;
  next: Project | null;
};

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em]";

export function ProjectNav({ prev, next }: ProjectNavProps) {
  if (!prev && !next) return null;

  return (
    <section
      aria-label="More projects"
      className="bg-paper px-3 pb-14 md:pb-32"
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 border-t border-ink pt-3">
        {prev && <NavCard project={prev} direction="prev" />}
        {next && (
          <NavCard
            project={next}
            direction="next"
            className={prev ? "" : "col-start-2"}
          />
        )}
      </div>
    </section>
  );
}

function NavCard({
  project,
  direction,
  className = "",
}: {
  project: Project;
  direction: "prev" | "next";
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block ${className}`}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} project: ${project.title}`}
    >
      <p className={`text-zinc ${body}`}>
        {direction === "prev" ? "Previous project" : "Next project"}
      </p>
      <div className="relative mt-3 aspect-4/3 w-full overflow-clip bg-paper-sunk">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 768px) 50vw, 50vw"
          className="object-cover"
        />
      </div>
      <p
        className={`mt-2 text-ink underline-offset-4 group-hover:underline ${body}`}
      >
        {project.title}
      </p>
      <p className={`text-zinc ${body}`}>
        {project.category}, {project.location}
      </p>
    </Link>
  );
}
