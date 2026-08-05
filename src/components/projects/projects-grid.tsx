"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "./project-card";
import { ProjectsFilters } from "./projects-filters";
import { getAllProjects, getCategories, getYears } from "@/lib/projects";

export function ProjectsGrid() {
  const searchParams = useSearchParams();
  const allProjects = useMemo(() => getAllProjects(), []);
  const categories = useMemo(() => getCategories(), []);
  const years = useMemo(() => getYears(), []);

  const categoryFilter = searchParams.get("category");
  const yearFilter = searchParams.get("year");

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (categoryFilter && p.category !== categoryFilter) return false;
      if (yearFilter && p.year.toString() !== yearFilter) return false;
      return true;
    });
  }, [allProjects, categoryFilter, yearFilter]);

  return (
    <>
      {/* Outside the container: the bar is sticky and spans the full width, so
          it can't sit inside the grid's padded wrapper. */}
      <ProjectsFilters
        projects={allProjects}
        categories={categories}
        years={years}
        resultCount={filtered.length}
      />

      <div className="mx-auto w-full max-w-360 px-6 py-12 md:px-10 md:py-16 lg:px-16">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            <motion.div
              key="grid"
              layout
              className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-20"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="border-y border-concrete py-20 text-center md:py-28"
    >
      <span className="font-meta text-meta-sm uppercase text-zinc">
        No projects match
      </span>
      <p className="mt-4 font-title text-d3 font-medium text-ink">
        Try a different filter combination,
        <br className="hidden sm:inline" />
        <span className="text-zinc"> or reset them all.</span>
      </p>
    </motion.div>
  );
}
