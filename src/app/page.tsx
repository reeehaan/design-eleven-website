import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicesList } from "@/components/home/services-list";
import { Process } from "@/components/home/process";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      {/* StatsStrip removed: it asserted "40+ projects delivered" and
          "100% licensed & insured", neither of which is evidenced anywhere.
          The hero title block now carries the facts we can stand behind. */}
      <Hero />
      <FeaturedWork />
      <ServicesList />
      <Process />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
