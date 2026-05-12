import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import type { Project } from "@/lib/projects";

type FeaturedProjectProps = {
  project: Project;
  index: number;
  total: number;
  imageSide: "left" | "right";
};

export function FeaturedProject({
  project,
  index,
  total,
  imageSide,
}: FeaturedProjectProps) {
  const indexLabel = `${index.toString().padStart(2, "0")} / ${total.toString().padStart(2, "0")}`;

  const imageOrder = imageSide === "left" ? "md:order-1" : "md:order-2";
  const copyOrder =
    imageSide === "left" ? "md:order-2 md:col-start-9" : "md:order-1";

  return (
    <article aria-labelledby={`project-${project.slug}-title`}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block"
        aria-label={`View project: ${project.title}`}
      >
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-10">
            {/* Image */}
            <div className={`${imageOrder} md:col-span-7`}>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-secondary">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Copy */}
            <div
              className={`${copyOrder} flex flex-col justify-between md:col-span-4 md:py-2`}
            >
              <div>
                <span className="label-mono">
                  <span aria-hidden="true" className="text-fg-subtle">
                    {indexLabel}
                  </span>
                  <span aria-hidden="true" className="ml-3 text-fg-subtle">
                    —
                  </span>
                  <span className="ml-3">{project.category}</span>
                </span>

                <h3
                  id={`project-${project.slug}-title`}
                  className="mt-5 font-display text-display-md text-fg-primary transition-colors group-hover:text-accent"
                >
                  {project.title}
                </h3>

                <p className="mt-4 text-body text-fg-muted">{project.summary}</p>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-y-3 border-t border-surface-line pt-5 font-mono text-xs text-fg-muted">
                <dt className="sr-only">Location</dt>
                <dd>
                  <span className="block text-fg-subtle">LOCATION</span>
                  <span className="mt-1 block text-fg-primary">{project.location}</span>
                </dd>
                <dt className="sr-only">Year</dt>
                <dd>
                  <span className="block text-fg-subtle">YEAR</span>
                  <span className="mt-1 block text-fg-primary">{project.year}</span>
                </dd>
                <dt className="sr-only">Duration</dt>
                <dd>
                  <span className="block text-fg-subtle">DURATION</span>
                  <span className="mt-1 block text-fg-primary">{project.durationMonths} mo</span>
                </dd>
                {project.area !== null && (
                  <>
                    <dt className="sr-only">Area</dt>
                    <dd>
                      <span className="block text-fg-subtle">AREA</span>
                      <span className="mt-1 block text-fg-primary">
                        {project.area.toLocaleString()} {project.areaUnit}
                      </span>
                    </dd>
                  </>
                )}
              </dl>

              <span className="mt-8 inline-flex items-baseline gap-3 text-sm font-medium text-accent">
                <span className="border-b border-current pb-1">View project</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </Container>
      </Link>
    </article>
  );
}
