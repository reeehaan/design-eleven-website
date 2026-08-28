import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/motion/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/testimonials";

export function ProjectTestimonial({ testimonialId }: { testimonialId: string }) {
  const testimonial = testimonials.find((t) => t.id === testimonialId);
  if (!testimonial) return null;

  return (
    <section
      aria-labelledby="project-testimonial-heading"
      className="border-t border-concrete py-20 md:py-24"
    >
      <Container>
        <Reveal>
          <Eyebrow>05 &middot; From the client</Eyebrow>
          <h2 id="project-testimonial-heading" className="sr-only">
            Client testimonial
          </h2>

          <blockquote className="mt-8 max-w-4xl">
            <span
              aria-hidden="true"
              className="block font-title text-7xl leading-none text-verdigris md:text-8xl"
            >
              &ldquo;
            </span>
            <p className="mt-2 font-title text-3xl leading-snug text-ink md:text-5xl md:leading-tight">
              {testimonial.quote}
            </p>
            <footer className="mt-10 flex flex-col gap-1 border-t border-concrete pt-5 font-meta text-meta uppercase md:flex-row md:items-center md:gap-6">
              <cite className="not-italic text-ink">
                — {testimonial.name}
              </cite>
              <span className="text-graphite">{testimonial.role}</span>
            </footer>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
