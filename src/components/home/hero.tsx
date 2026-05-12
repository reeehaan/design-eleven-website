import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { heroImages } from "@/lib/images";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pb-section-sm pt-12 md:pb-section md:pt-16"
    >
      <Container>
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-x-10">
          {/* Copy column */}
          <div className="md:col-span-6 md:pb-8">
            <EyebrowLabel>
              Est. {siteConfig.established} · Sri Lanka
            </EyebrowLabel>

            <h1
              id="hero-heading"
              className="mt-6 font-display text-display-xl text-fg-primary"
            >
              Construction &amp; design,{" "}
              <span className="italic text-fg-muted">build with precision</span>{" "}
              in Sri Lanka.
            </h1>

            <p className="mt-8 max-w-md text-body-lg text-fg-muted">
              Specialized in building construction, steel fabrication, plumbing,
              titanium work, consulting, costing, and modern design solutions -
              delivered with quality workmanship and clear communication
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
              <ArrowLink href="/contact">Start your project</ArrowLink>
              <span className="font-mono text-sm text-fg-muted">
                or call{" "}
                <a
                  href={`tel:${siteConfig.contact.whatsapp}`}
                  className="text-fg-primary underline-offset-4 hover:text-accent hover:underline"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </span>
            </div>
          </div>

          {/* Image column */}
          <div className="md:col-span-6">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-secondary md:aspect-[4/5]">
              <Image
                src={heroImages.home.src}
                alt={heroImages.home.alt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 hidden font-mono text-xs text-fg-muted md:block">
              <span className="text-fg-subtle">FEATURED PROJECT —</span>{" "}
              Homestay, Anuradhapura · 2024
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
