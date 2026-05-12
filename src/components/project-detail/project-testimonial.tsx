import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/testimonials";

export function ProjectTestimonial({ testimonialId }: { testimonialId: string }) {
  const testimonial = testimonials.find((t) => t.id === testimonialId);
  if (!testimonial) return null;

  return (
    <section
      aria-labelledby="project-testimonial-heading"
      className="border-t border-surface-line py-section md:py-section-lg"
    >
      <Container>
        <Reveal>
          <EyebrowLabel number="05">From the client</EyebrowLabel>
          <h2 id="project-testimonial-heading" className="sr-only">
            Client testimonial
          </h2>

          <blockquote className="mt-8 max-w-4xl">
            <span
              aria-hidden="true"
              className="block font-display text-7xl leading-none text-accent md:text-8xl"
            >
              &ldquo;
            </span>
            <p className="mt-2 font-display text-3xl italic leading-snug text-fg-primary md:text-5xl md:leading-tight">
              {testimonial.quote}
            </p>
            <footer className="mt-10 flex flex-col gap-1 border-t border-surface-line pt-5 font-mono text-xs uppercase tracking-[0.08em] md:flex-row md:items-center md:gap-6">
              <cite className="not-italic text-fg-primary">
                — {testimonial.name}
              </cite>
              <span className="text-fg-muted">{testimonial.role}</span>
            </footer>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
