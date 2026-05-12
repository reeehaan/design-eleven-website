import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { FeaturedProject } from "./featured-project";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedWork() {
  const featured = getFeaturedProjects();
  const total = featured.length;

  return (
    <section
      aria-labelledby="featured-work-heading"
      className="py-section md:py-section-lg"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <EyebrowLabel number="01">Selected Work</EyebrowLabel>
            <h2
              id="featured-work-heading"
              className="mt-6 font-display text-display-lg text-fg-primary"
            >
              Recent projects,{" "}
              <span className="italic text-fg-muted">delivered</span>.
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-3 md:pl-8">
            <p className="max-w-md text-body-lg text-fg-muted">
              A small selection of work from the last few years. Each project
              was led directly by our team, from first site visit to final
              handover.
            </p>
          </div>
        </div>
      </Container>

      <div className="mt-16 flex flex-col gap-section md:mt-24 md:gap-section-lg">
        {featured.map((project, i) => (
          <FeaturedProject
            key={project.slug}
            project={project}
            index={i + 1}
            total={total}
            imageSide={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>

      <Container className="mt-16 md:mt-24">
        <div className="flex items-center justify-between border-t border-surface-line pt-8">
          <span className="label-mono hidden text-fg-subtle sm:inline">
            View the full archive
          </span>
          <ArrowLink href="/projects" variant="subtle">
            All projects
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
