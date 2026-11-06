import { Hero } from "@/components/home/hero";
import {
  HomeApproach,
  HomeIntro,
  HomeProcess,
} from "@/components/home/home-sections";
import { HomeShowcase } from "@/components/home/home-showcase";
import { getFeaturedProjects } from "@/lib/projects";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <HomeShowcase projects={getFeaturedProjects()} />
      <HomeApproach />
      <HomeProcess />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
