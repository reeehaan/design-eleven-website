import { PageMasthead, type MastheadCell } from "@/components/ui/page-masthead";
import { getAllProjects, getLocations, getYears } from "@/lib/projects";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * The figures under the headline. Every one is derived from the project set
 * rather than typed in, so the header cannot outgrow the work — add a project
 * and the register moves with it, remove one and it moves back.
 */
function register(): MastheadCell[] {
  const projects = getAllProjects();
  const years = getYears();
  const built = projects.reduce((sum, p) => sum + (p.area ?? 0), 0);

  const cells: MastheadCell[] = [
    { label: "Projects", value: pad(projects.length) },
  ];

  // Area is optional on a project, so the whole cell drops rather than
  // printing a confident "0 SQ FT".
  if (built > 0) {
    cells.push({
      label: "Built",
      value: built.toLocaleString(),
      unit: "sq ft",
    });
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

/** Work index masthead. Only the figures are specific to this page. */
export function WorkHeader() {
  return (
    <PageMasthead
      eyebrow="Projects — Index"
      title="Selected work,"
      titleAccent="across Sri Lanka."
      intro="Filter by type or year. Every entry opens a full case study — the brief, the constraint we had to solve, the materials, and what it cost to get there."
      cells={register()}
    />
  );
}
