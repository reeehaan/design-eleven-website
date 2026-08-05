"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/projects";

type ProjectsFiltersProps = {
  /** The unfiltered set — the counts on each chip are computed from it. */
  projects: Project[];
  categories: ProjectCategory[];
  years: number[];
  resultCount: number;
};

const ALL = "__all__";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function ProjectsFilters({
  projects,
  categories,
  years,
  resultCount,
}: ProjectsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeYear = searchParams.get("year");
  const hasActiveFilter = !!(activeCategory || activeYear);

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === ALL) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const clearAll = () => router.push(pathname, { scroll: false });

  /**
   * Faceted counts: each chip is counted against the *other* axis' active
   * filter, so a chip reading 00 is a combination that returns nothing. Those
   * are disabled rather than left clickable — the old bar let you tick your
   * way into an empty grid and then work out why.
   */
  const categoryOptions = useMemo(() => {
    const inYear = (p: Project) => !activeYear || String(p.year) === activeYear;
    return [
      { label: "All", value: ALL, count: projects.filter(inYear).length },
      ...categories.map((c) => ({
        label: c,
        value: c,
        count: projects.filter((p) => p.category === c && inYear(p)).length,
      })),
    ];
  }, [projects, categories, activeYear]);

  const yearOptions = useMemo(() => {
    const inCategory = (p: Project) =>
      !activeCategory || p.category === activeCategory;
    return [
      { label: "All", value: ALL, count: projects.filter(inCategory).length },
      ...years.map((y) => ({
        label: String(y),
        value: String(y),
        count: projects.filter((p) => p.year === y && inCategory(p)).length,
      })),
    ];
  }, [projects, years, activeCategory]);

  // An axis with one option filters nothing, and a bar with no axis is just a
  // rule across the page. Both drop out rather than sitting there inert — the
  // published set is small enough for that to be the normal case.
  const showCategory = categories.length > 1;
  const showYear = years.length > 1;
  if (!showCategory && !showYear) return null;

  return (
    /* Sticky from md up only. On a phone the bar is two rows tall, and pinning
       that under a 64px header leaves too little of the grid to scroll. */
    <div className="border-b border-concrete bg-paper/90 backdrop-blur-md md:sticky md:top-20 md:z-30">
      <div className="mx-auto w-full max-w-360 px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Full-bleed scroll track, so a chip row that overflows on mobile
              runs to the screen edge instead of clipping at the gutter. */}
          <div className="-mx-6 flex gap-6 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:gap-x-8 md:gap-y-2 md:px-0 md:pb-0">
            {showCategory && (
              <FilterGroup
                label="Type"
                options={categoryOptions}
                activeValue={activeCategory ?? ALL}
                onSelect={(v) => setFilter("category", v)}
              />
            )}
            {showYear && (
              <FilterGroup
                label="Year"
                options={yearOptions}
                activeValue={activeYear ?? ALL}
                onSelect={(v) => setFilter("year", v)}
              />
            )}
          </div>

          <div className="flex shrink-0 items-center justify-between gap-6">
            <p
              aria-live="polite"
              className="font-meta text-meta-sm uppercase text-zinc"
            >
              {/* Padded figures read as "zero one" aloud, so the spoken and
                  the printed count are two different strings. */}
              <span aria-hidden="true">
                <span className="tabular-nums text-ink">
                  {pad(resultCount)}
                </span>
                {" / "}
                <span className="tabular-nums">{pad(projects.length)}</span>{" "}
                shown
              </span>
              <span className="sr-only">
                Showing {resultCount} of {projects.length} projects
              </span>
            </p>

            {/* Reserved space rather than a conditional render — the count
                would otherwise jump sideways the moment a filter is set. */}
            <button
              type="button"
              onClick={clearAll}
              tabIndex={hasActiveFilter ? 0 : -1}
              aria-hidden={!hasActiveFilter}
              className={cn(
                "font-meta text-meta-sm uppercase underline-offset-4 transition-opacity duration-300 hover:text-verdigris hover:underline",
                hasActiveFilter
                  ? "text-graphite opacity-100"
                  : "pointer-events-none opacity-0",
              )}
            >
              Reset ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type FilterOption = { label: string; value: string; count: number };

type FilterGroupProps = {
  label: string;
  options: FilterOption[];
  activeValue: string;
  onSelect: (value: string) => void;
};

function FilterGroup({
  label,
  options,
  activeValue,
  onSelect,
}: FilterGroupProps) {
  const groupId = `filter-${label.toLowerCase()}`;

  return (
    <div className="flex shrink-0 items-center gap-3 md:gap-4">
      <span
        id={groupId}
        className="hidden font-meta text-meta-sm uppercase text-zinc md:inline"
      >
        {label}
      </span>

      <div role="group" aria-labelledby={groupId} className="flex gap-2">
        {options.map((opt) => {
          const isActive = activeValue === opt.value;
          const isEmpty = opt.count === 0;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              aria-pressed={isActive}
              // The padded count reads as "zero two" unlabelled, so the whole
              // chip gets a spoken name and the visible text is hidden from AT.
              aria-label={`${label}: ${opt.label} — ${opt.count} ${
                opt.count === 1 ? "project" : "projects"
              }`}
              disabled={isEmpty && !isActive}
              className={cn(
                "group inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 font-meta text-meta uppercase transition-colors duration-200 md:min-h-10",
                isActive
                  ? "border-ink bg-ink text-paper"
                  : isEmpty
                    ? "cursor-not-allowed border-concrete text-concrete"
                    : "border-concrete text-graphite hover:border-verdigris hover:text-verdigris",
              )}
            >
              {opt.label}
              <span
                className={cn(
                  "text-meta-sm tabular-nums transition-colors duration-200",
                  isActive
                    ? "text-paper/55"
                    : isEmpty
                      ? "text-concrete"
                      : "text-zinc group-hover:text-verdigris",
                )}
              >
                {pad(opt.count)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
