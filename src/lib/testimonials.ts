export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The team ran the build themselves. Every site visit, every decision, every problem — they were there. We always knew where the project stood. That alone made the experience worth it.",
    name: "S. Perera",
    role: "Homeowner, Rajagiriya",
    projectSlug: "modern-residence-rajagiriya",
  },
  {
    id: "t2",
    quote:
      "We needed our office fit-out done in four months without disrupting work. They coordinated nights and weekends, kept the floor clean, and finished on schedule. Easy to recommend.",
    name: "R. Fernando",
    role: "Operations Director",
    projectSlug: "office-fitout-colombo-03",
  },
  {
    id: "t3",
    quote:
      "Honest estimate, no surprise costs at the end. The renovation came in slightly under budget. That doesn't happen often.",
    name: "A. Silva",
    role: "Homeowner, Nugegoda",
    projectSlug: "kitchen-living-renovation-nugegoda",
  },
];
