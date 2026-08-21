import Image from "next/image";
import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Reveal } from "@/components/ui/reveal";
import { ScrubParagraph } from "@/components/motion/scrub-paragraph";
import { aboutImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export function OwnerStory() {
  return (
    <section
      aria-labelledby="owner-story-heading"
      className="border-t border-concrete bg-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-paper-sunk">
              <Image
                src={aboutImages.owner.src}
                alt={aboutImages.owner.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Photo caption in the title-block voice, same as a drawing sheet */}
            <p className="mt-4 font-meta text-meta-sm uppercase text-zinc">
              Portrait — {siteConfig.owner}, founder
            </p>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>B-01 &middot; The story</Eyebrow>
            <RevealLines
              as="h2"
              id="owner-story-heading"
              className="mt-8 max-w-[18ch] font-title text-d2 font-medium text-ink"
            >
              A small crew, <span className="text-zinc">careful work.</span>
            </RevealLines>

            {/* The word scrub, on the one page the motion system permits it:
                "two places only — the About statement and a case-study brief".
                It forces reading pace, which is the point on the paragraph
                that carries why the studio exists. It was built for this and
                had never been used. */}
            <ScrubParagraph className="mt-8 max-w-measure text-lead text-graphite">
              {siteConfig.name} was founded in {siteConfig.established} by{" "}
              {siteConfig.owner}
              {/* Explicit: the transform strips the space between an
                  expression and the text that follows it on a wrapped
                  line, which rendered "Thilakarathneafter". */}{" "}
              after years working on residential and commercial sites across Sri
              Lanka. The decision to start independently came from a simple
              frustration: too many projects were being managed by people who
              weren&apos;t actually on site.
            </ScrubParagraph>

            {/* Both paragraphs scrub, because together they are the statement
                — the rule is one statement, not one <p>. The third paragraph
                is gone: it listed the three build types the Work page already
                filters by, then closed on "clear communication, honest pricing
                and craftsmanship", which every contractor writes and no client
                believes. The masthead figures and the qualification below
                argue it with evidence instead. */}
            <ScrubParagraph className="mt-6 max-w-measure text-lead text-graphite">
              Today we are a small, owner-led crew. Our principal is at every
              site visit, every key decision, every handover. We do not take on
              more projects than we can supervise properly — that is the
              trade-off, and it is one we are happy to make.
            </ScrubParagraph>

            <Reveal>
              {/* The qualification is the load-bearing fact in this section —
                  a QS pricing the job is what the rest of the site claims. */}
              <dl className="mt-8 border-t border-concrete pt-5">
                <dt className="font-meta text-meta-sm uppercase text-zinc">
                  {siteConfig.ownerTitle}
                </dt>
                <dd className="mt-2 font-meta text-meta uppercase text-ink">
                  {siteConfig.ownerCredentials}
                </dd>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
