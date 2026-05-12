"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const span = project.gridSpan ?? 1;
  const aspect = project.aspect ?? "standard";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("col-span-1", span === 2 && "md:col-span-2")}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={`View project: ${project.title}`}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden bg-bg-secondary",
            aspect === "tall" ? "aspect-[3/4]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={
              span === 2
                ? "(min-width: 768px) 66vw, 100vw"
                : "(min-width: 768px) 33vw, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
            {(index + 1).toString().padStart(2, "0")}{" "}
            <span className="text-fg-subtle">/</span> {project.category}
          </span>
          <span className="font-mono text-xs text-fg-muted">{project.year}</span>
        </div>

        <h3 className="mt-2 font-display text-2xl text-fg-primary transition-colors group-hover:text-accent md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-fg-muted">{project.location}</p>
      </Link>
    </motion.article>
  );
}
