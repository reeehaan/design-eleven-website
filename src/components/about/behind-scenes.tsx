import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { aboutImages } from "@/lib/images";

export function BehindScenes() {
  return (
    <section
      aria-labelledby="bts-heading"
      className="border-t border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <EyebrowLabel number="05">Behind the scenes</EyebrowLabel>
          <h2
            id="bts-heading"
            className="mt-6 font-display text-display-md text-fg-primary"
          >
            Work in <span className="italic text-fg-muted">progress</span>.
          </h2>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {aboutImages.bts.map((img, i) => (
              <div
                key={img.src}
                className={i === 1 ? "md:translate-y-12" : undefined}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-secondary">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
