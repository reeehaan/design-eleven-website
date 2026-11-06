import { testimonials } from "@/lib/testimonials";
import { ScrollFx } from "@/components/motion/scroll-fx";

export function ProjectTestimonial({
  testimonialId,
}: {
  testimonialId: string;
}) {
  const testimonial = testimonials.find((t) => t.id === testimonialId);
  if (!testimonial) return null;

  return (
    <section
      aria-labelledby="project-testimonial-heading"
      className="bg-paper px-3 pb-14 md:pb-32"
    >
      <ScrollFx />
      <h2 id="project-testimonial-heading" className="sr-only">
        Client testimonial
      </h2>
      <blockquote className="grid grid-cols-12 gap-x-3 gap-y-8">
        <p className="col-span-12 font-sans text-[clamp(1.75rem,4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink md:col-span-9 md:col-start-4">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <footer className="col-span-12 font-sans text-[1.0625rem] font-semibold leading-[1.15] md:col-span-6 md:col-start-4">
          <cite className="not-italic text-ink">{testimonial.name}</cite>
          <span className="block text-zinc">{testimonial.role}</span>
        </footer>
      </blockquote>
    </section>
  );
}
