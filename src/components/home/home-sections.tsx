import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/lib/projects";
import { homeImages } from "@/lib/images";
import { stages } from "@/lib/process";
import { siteConfig } from "@/lib/site";

const body =
  "font-sans text-[1.0625rem] font-semibold leading-[1.15] tracking-[-0.01em] text-ink";
const statement =
  "font-sans text-[clamp(1.75rem,2.9vw,2.5rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink";

/** A hairline row with the label left and an arrow right, as a link. */
function RuleLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className={`group mt-10 flex items-center justify-between border-t border-ink pt-2 transition-colors hover:text-verdigris ${body}`}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}

/** The studio in a sentence, then the rest of it beside. */
export function HomeIntro() {
  const [first, ...rest] = siteConfig.description.split(". ");
  return (
    <section
      aria-labelledby="home-intro-heading"
      className="grid grid-cols-12 gap-x-3 gap-y-12 bg-paper px-3 py-12 md:py-32"
    >
      <h2
        id="home-intro-heading"
        className={`col-span-12 max-w-[22ch] md:col-span-6 ${statement}`}
      >
        {first}.
      </h2>
      <div className="col-span-12 md:col-span-3 md:col-start-10">
        <p className={body}>{rest.join(". ")}</p>
        <RuleLink href="/about">Learn more</RuleLink>
      </div>
    </section>
  );
}

/** The featured projects, four across. */
export function HomeFeatured() {
  const projects = getFeaturedProjects();
  return (
    <section
      aria-labelledby="home-featured-heading"
      className="bg-paper px-3 pb-14 pt-12 md:pb-40"
    >
      <h2 id="home-featured-heading" className={`pb-8 ${body}`}>
        Featured works
      </h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-y-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <RuleLink href="/projects">All projects</RuleLink>
        </div>
      </div>
    </section>
  );
}

/** Image left, the services pitch right. */
export function HomeApproach() {
  const image = homeImages.approach;
  return (
    <section
      aria-labelledby="home-approach-heading"
      className="grid grid-cols-12 gap-x-3 gap-y-10 bg-paper px-3 pb-14 md:pb-40"
    >
      <div className="relative col-span-12 aspect-4/3 overflow-clip bg-paper-sunk md:col-span-8">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="col-span-12 md:col-span-3 md:col-start-10">
        <h2 id="home-approach-heading" className={body}>
          What we build
        </h2>
        <p className={`mt-6 md:mt-12 ${body}`}>
          From design and costing through to construction, steel fabrication and
          plumbing, every service is owner-led from first visit to handover.
        </p>
        <RuleLink href="/services">Learn more</RuleLink>
      </div>
    </section>
  );
}

/** The stages as hairline rows. */
export function HomeProcess() {
  return (
    <section
      aria-labelledby="home-process-heading"
      className="bg-paper px-3 pb-14 md:pb-40"
    >
      <h2
        id="home-process-heading"
        className={`max-w-[18ch] pb-16 ${statement}`}
      >
        Six stages. You know the price before the third one starts.
      </h2>
      <ol>
        {stages.map((s) => (
          <li key={s.ref} className="border-t border-ink py-3">
            <div className="grid grid-cols-12 gap-x-3 gap-y-2">
              <p className={`col-span-12 md:col-span-3 ${body}`}>Stage {s.n}</p>
              <p className={`col-span-12 md:col-span-6 md:col-start-4 ${body}`}>
                {s.title}
              </p>
              <p
                className={`col-span-12 text-zinc md:col-span-3 md:col-start-10 ${body}`}
              >
                Typically {s.duration}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div className="grid grid-cols-12 gap-x-3">
        <div className="col-span-12 md:col-span-3 md:col-start-10">
          <RuleLink href="/process">See the full process</RuleLink>
        </div>
      </div>
    </section>
  );
}
