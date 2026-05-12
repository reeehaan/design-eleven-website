"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/lib/projects";

type ProjectsFiltersProps = {
  categories: ProjectCategory[];
  years: number[];
  resultCount: number;
  totalCount: number;
};

export function ProjectsFilters({
  categories,
  years,
  resultCount,
  totalCount,
}: ProjectsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeYear = searchParams.get("year");

  const setFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(key) === value) {
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
  const hasActiveFilter = !!(activeCategory || activeYear);

  return (
    <div className="border-y border-surface-line py-6 md:py-8">
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
          Showing{" "}
          <span className="text-fg-primary">
            {resultCount.toString().padStart(2, "0")}
          </span>{" "}
          of {totalCount.toString().padStart(2, "0")} projects
        </span>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={clearAll}
            className="font-mono text-xs uppercase tracking-[0.08em] text-fg-muted transition-colors hover:text-accent"
          >
            Clear filters ×
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:gap-12">
        <FilterGroup
          label="Category"
          options={categories.map((c) => ({ label: c, value: c }))}
          activeValue={activeCategory}
          onSelect={(v) => setFilter("category", v)}
        />
        <FilterGroup
          label="Year"
          options={years.map((y) => ({ label: y.toString(), value: y.toString() }))}
          activeValue={activeYear}
          onSelect={(v) => setFilter("year", v)}
        />
      </div>
    </div>
  );
}

type FilterOption = { label: string; value: string };

type FilterGroupProps = {
  label: string;
  options: FilterOption[];
  activeValue: string | null;
  onSelect: (value: string) => void;
};

function FilterGroup({ label, options, activeValue, onSelect }: FilterGroupProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle md:w-20 md:shrink-0">
        {label}
      </span>

      <ul role="list" className="-mx-1 flex gap-1 overflow-x-auto px-1 md:mx-0 md:flex-wrap md:px-0">
        {options.map((opt) => {
          const isActive = activeValue === opt.value;
          return (
            <li key={opt.value} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(opt.value)}
                aria-pressed={isActive}
                className={cn(
                  "whitespace-nowrap border-b py-1 text-sm transition-colors",
                  isActive
                    ? "border-accent text-accent"
                    : "border-transparent text-fg-muted hover:border-fg-muted hover:text-fg-primary",
                )}
              >
                {opt.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
