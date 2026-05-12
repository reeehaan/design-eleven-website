import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import type { Project } from "@/lib/projects";

export function ProjectBody({ project }: { project: Project }) {
  return (
    <Container as="section" className="py-section md:py-section-lg">
      <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
        {/* Sticky meta sidebar */}
        <Reveal className="md:col-span-4">
          <aside className="md:sticky md:top-24">
            <EyebrowLabel>Project at a glance</EyebrowLabel>

            <dl className="mt-6 grid grid-cols-2 gap-y-5 border-y border-surface-line py-6 font-mono text-xs">
              <dt className="uppercase tracking-[0.08em] text-fg-subtle">Location</dt>
              <dd className="text-right text-fg-primary">{project.location}</dd>

              <dt className="uppercase tracking-[0.08em] text-fg-subtle">Year</dt>
              <dd className="text-right text-fg-primary">{project.year}</dd>

              <dt className="uppercase tracking-[0.08em] text-fg-subtle">Duration</dt>
              <dd className="text-right text-fg-primary">{project.durationMonths} months</dd>

              {project.area !== null && (
                <>
                  <dt className="uppercase tracking-[0.08em] text-fg-subtle">Area</dt>
                  <dd className="text-right text-fg-primary">
                    {project.area.toLocaleString()} {project.areaUnit}
                  </dd>
                </>
              )}

              <dt className="uppercase tracking-[0.08em] text-fg-subtle">Category</dt>
              <dd className="text-right text-fg-primary">{project.category}</dd>
            </dl>

            {project.scope && project.scope.length > 0 && (
              <div className="mt-8">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
                  Scope
                </span>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.scope.map((item, i) => (
                    <li key={item} className="flex items-baseline gap-3 text-sm text-fg-primary">
                      <span aria-hidden="true" className="font-mono text-xs text-fg-subtle">
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
          <EyebrowLabel number="01">The story</EyebrowLabel>
          <h2 className="mt-6 font-display text-display-md text-fg-primary">
            {project.summary}
          </h2>
          <div className="mt-10 flex flex-col gap-5 text-body-lg text-fg-muted">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
