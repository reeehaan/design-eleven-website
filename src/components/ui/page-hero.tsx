import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";

type PageHeroProps = {
  eyebrow?: string;
  eyebrowNumber?: string;
  title: string;
  titleAccent?: string;
  intro?: string;
};

export function PageHero({
  eyebrow,
  eyebrowNumber,
  title,
  titleAccent,
  intro,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className="border-b border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              {eyebrow && (
                <EyebrowLabel number={eyebrowNumber}>{eyebrow}</EyebrowLabel>
              )}
              <h1
                id="page-hero-title"
                className="mt-6 font-display text-display-xl leading-[0.95] text-fg-primary"
              >
                {title}
                {titleAccent && (
                  <>
                    {" "}
                    <span className="italic text-fg-muted">{titleAccent}</span>
                  </>
                )}
              </h1>
            </div>
            {intro && (
              <div className="md:col-span-5 md:pb-3 md:pl-8">
                <p className="max-w-md text-body-lg text-fg-muted">{intro}</p>
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
