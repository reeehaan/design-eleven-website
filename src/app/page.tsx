import { Hero } from "@/components/home/hero";
import { StatsStrip } from "@/components/home/stats-strip";
import { FeaturedWork } from "@/components/home/featured-work";
import { ServicesList } from "@/components/home/services-list";
import { Process } from "@/components/home/process";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedWork />
      <ServicesList />
      <Process />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
