import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { aboutImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export function OwnerStory() {
  return (
    <section
      aria-labelledby="owner-story-heading"
      className="py-section md:py-section-lg"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-secondary">
              <Image
                src={aboutImages.owner.src}
                alt={aboutImages.owner.alt}
                fill
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.08em] text-fg-muted">
              <span className="text-fg-subtle">PORTRAIT —</span>{" "}
              {siteConfig.owner}, founder
            </p>
          </Reveal>

          <Reveal className="md:col-span-6 md:col-start-7 md:py-8" delay={0.1}>
            <EyebrowLabel number="01">The story</EyebrowLabel>
            <h2
              id="owner-story-heading"
              className="mt-6 font-display text-display-md text-fg-primary"
            >
              A small crew,{" "}
              <span className="italic text-fg-muted">careful work</span>.
            </h2>

            <div className="mt-8 flex flex-col gap-5 text-body-lg text-fg-muted">
              <p>
                {siteConfig.name} was founded in {siteConfig.established} by{" "}
                {siteConfig.owner} after years working on residential and
                commercial sites across Sri Lanka. The decision to start
                independently came from a simple frustration: too many projects
                were being managed by people who weren&apos;t actually on site.
              </p>
              <p>
                Today, we&apos;re a small, owner-led crew. Our principal is at
                every site visit, every key decision, every handover. We
                don&apos;t take on more projects than we can supervise
                properly &mdash; that&apos;s the trade-off, and it&apos;s one
                we&apos;re happy to make.
              </p>
              <p>
                Our work spans residential builds, commercial construction,
                and interior finishing &mdash; but the throughline is the
                same: clear communication, honest pricing, and craftsmanship
                we&apos;d be proud to put our name on.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
