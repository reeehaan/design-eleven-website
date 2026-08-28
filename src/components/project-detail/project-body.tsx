import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/projects";

export function ProjectBody({ project }: { project: Project }) {
  return (
    <Container as="section" className="py-20 md:py-24">
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
        {/* Sticky meta sidebar */}
        <Reveal className="md:col-span-4">
          <aside className="md:sticky md:top-24">
            <Eyebrow>Project at a glance</Eyebrow>

            <dl className="mt-6 grid grid-cols-2 gap-y-5 border-y border-concrete py-6 font-meta text-meta">
              <dt className="uppercase text-zinc">Location</dt>
              <dd className="text-right text-ink">{project.location}</dd>

              <dt className="uppercase text-zinc">Year</dt>
              <dd className="text-right text-ink">{project.year}</dd>

              <dt className="uppercase text-zinc">Duration</dt>
              <dd className="text-right text-ink">{project.durationMonths} months</dd>

              {project.area !== null && (
                <>
                  <dt className="uppercase text-zinc">Area</dt>
                  <dd className="text-right text-ink">
                    {project.area.toLocaleString()} {project.areaUnit}
                  </dd>
                </>
              )}

              <dt className="uppercase text-zinc">Category</dt>
              <dd className="text-right text-ink">{project.category}</dd>
            </dl>

            {project.scope && project.scope.length > 0 && (
              <div className="mt-8">
                <span className="font-meta text-meta uppercase text-zinc">
                  Scope
                </span>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.scope.map((item, i) => (
                    <li key={item} className="flex items-baseline gap-3 text-sm text-ink">
                      <span aria-hidden="true" className="font-meta text-meta-sm text-zinc">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Reveal>

        {/* Story */}
        <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
          <Eyebrow>01 &middot; The story</Eyebrow>
          <h2 className="mt-6 font-title text-d3 font-medium text-ink">
            {project.summary}
          </h2>
          <div className="mt-10 flex flex-col gap-5 text-lead text-graphite">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
