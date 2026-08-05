import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Reveal } from "@/components/ui/reveal";
import { getAllProjects, getLocations, getYears } from "@/lib/projects";
import { cn } from "@/lib/utils";

type RegisterCell = { label: string; value: string; unit?: string };

/**
 * The figures under the headline. Every one is derived from the project set
 * rather than typed in, so the header cannot outgrow the work — add a project
 * and the register moves with it, remove one and it moves back.
 */
function register(): RegisterCell[] {
  const projects = getAllProjects();
  const years = getYears();
  const built = projects.reduce((sum, p) => sum + (p.area ?? 0), 0);

  const cells: RegisterCell[] = [
    { label: "Projects", value: pad(projects.length) },
  ];

  // Area is optional on a project, so the whole cell drops rather than
  // printing a confident "0 SQ FT".
  if (built > 0) {
    cells.push({ label: "Built", value: built.toLocaleString(), unit: "sq ft" });
  }

  cells.push({ label: "Districts", value: pad(getLocations().length) });

  if (years.length > 0) {
    const first = years[years.length - 1];
    const last = years[0];
    cells.push({
      label: "Delivered",
      value:
        first === last ? String(first) : `${first}–${String(last).slice(2)}`,
    });
  }

  return cells;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Work index header. Replaces the generic <PageHero> here because this page
 * has something the others don't — a countable body of work — and the header
 * is the only place to state its size before the grid makes the reader
 * count for themselves.
 */
export function WorkHeader() {
  const cells = register();

  return (
    <section
      aria-labelledby="work-index-title"
      className="border-b border-concrete bg-paper"
    >
      {/* Deliberately tighter than the other page heroes: this header sits on
          top of a grid, and a work index that shows no work above the fold is
          a worse header however handsome it is. */}
      <div className="mx-auto w-full max-w-360 px-6 pt-12 md:px-10 md:pt-16 lg:px-16">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Projects — Index</Eyebrow>
            <RevealLines
              as="h1"
              id="work-index-title"
              className="mt-7 font-title text-d1 font-medium text-ink"
            >
              Selected work, <span className="text-zinc">across Sri Lanka.</span>
            </RevealLines>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <Reveal>
              <p className="max-w-measure font-body text-lead text-graphite">
                Filter by type or year. Every entry opens a full case study —
                the brief, the constraint we had to solve, the materials, and
                what it cost to get there.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Title block. The gap-px rules do the dividing, so the cells reflow
            from four columns to two without any of them growing a stray edge
            or needing a border rule per breakpoint. */}
        <Reveal className="mt-10 md:mt-14">
          <dl className="grid grid-cols-2 gap-px border-t border-concrete bg-concrete md:grid-cols-4">
            {cells.map((cell, i) => (
              <div
                key={cell.label}
                className={cn(
                  "bg-paper py-6 md:py-8",
                  // Whichever cell opens a row sits flush with the container
                  // gutter; the rest clear the hairline to their left. Rows
                  // are two wide on mobile and four from md.
                  i % 2 === 0 ? "pl-0" : "pl-5",
                  i === 0 ? "md:pl-0" : "md:pl-6",
                )}
              >
                <dt className="font-meta text-meta-sm uppercase text-zinc">
                  {cell.label}
                </dt>
                <dd className="mt-2.5 font-title text-d4 font-medium tabular-nums text-ink">
                  {cell.value}
                  {cell.unit && (
                    <span className="ml-1.5 font-meta text-meta uppercase text-zinc">
                      {cell.unit}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
