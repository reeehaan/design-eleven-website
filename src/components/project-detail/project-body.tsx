import type { Project } from "@/lib/projects";
import { ScrollFx } from "@/components/motion/scroll-fx";

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink";

/** Story in column four, the project's facts and scope in column ten. */
export function ProjectBody({ project }: { project: Project }) {
  return (
    <section
      aria-labelledby="project-story-heading"
      className="grid grid-cols-12 gap-x-3 gap-y-10 bg-paper px-3 py-14 md:py-32"
    >
      <ScrollFx />
      <p className={`col-span-12 text-zinc md:col-span-3 ${body}`}>The story</p>

      <div className="col-span-12 md:col-span-5 md:col-start-4">
        <h2
          id="project-story-heading"
          className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink"
        >
          {project.summary}
        </h2>
        <div className={`mt-8 space-y-5 text-graphite ${body}`}>
          {project.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <aside className="col-span-12 md:sticky md:top-24 md:col-span-3 md:col-start-10 md:self-start">
        <dl className={body}>
          {[
            ["Location", project.location],
            ["Year", String(project.year)],
            ["Duration", `${project.durationMonths} months`],
            ...(project.area !== null
              ? [
                  [
                    "Area",
                    `${project.area.toLocaleString()} ${project.areaUnit}`,
                  ],
                ]
              : []),
            ["Category", project.category],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between gap-4 border-t border-concrete py-1.5"
            >
              <dt className="text-zinc">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>

        {project.scope && project.scope.length > 0 && (
          <div className="mt-10">
            <p className="text-zinc">Scope</p>
            <ol className="mt-2 border-t border-ink">
              {project.scope.map((item, i) => (
                <li
                  key={item}
                  className={`flex gap-3 border-b border-concrete py-1.5 ${body}`}
                >
                  <span className="w-5 shrink-0 text-zinc tabular-nums">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        )}
      </aside>
    </section>
  );
}
