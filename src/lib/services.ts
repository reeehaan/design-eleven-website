export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  image: {
    src: string;
    alt: string;
  };
  included: string[];
  process: ServiceProcessStep[];
  timeline: string;
  startingFrom: string;
  order: number;
};

export const services: Service[] = [
  {
    slug: "residential-builds",
    title: "Residential Builds",
    summary: "New family homes and private residences from foundation to handover.",
    description: [
      "Ground-up construction of new homes — from initial site preparation through to final handover. We work with your architect and engineer (or recommend ours) to translate drawings into a finished build.",
      "Our residential work focuses on single-family homes between 1,500 and 6,000 sqft. We coordinate every trade on site, manage material procurement, and handle compliance with local council requirements.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern residential exterior with clean architectural lines",
    },
    included: [
      "Site preparation, excavation, and foundations",
      "Reinforced concrete superstructure",
      "Brick and block masonry, plastering",
      "Roofing — concrete slab, tiled, or metal sheeting",
      "Plumbing, electrical, and drainage rough-ins",
      "Internal and external finishes",
      "Joinery — doors, windows, built-ins",
      "Painting, flooring, and fixtures",
      "Council compliance and handover documentation",
    ],
    process: [
      {
        title: "Site assessment",
        description:
          "Visit your land, review architectural drawings, identify any site constraints — access, levels, soil, services.",
      },
      {
        title: "Itemised estimate",
        description:
          "Detailed written quote: materials, labour, timeline, payment milestones. Provided within one week of site visit.",
      },
      {
        title: "Build",
        description:
          "Foundation through to handover. Weekly site updates with photos. Single point of contact throughout.",
      },
      {
        title: "Handover & defects period",
        description:
          "Final walk-through, snagging list, all documents handed over. We address any defects raised in the agreed defects period.",
      },
    ],
    timeline: "8–14 months",
    startingFrom: "Quote on visit",
    order: 1,
  },
  {
    slug: "commercial-construction",
    title: "Commercial Construction",
    summary: "Office buildings, retail spaces, and commercial fit-outs for growing businesses.",
    description: [
      "Commercial work for businesses building or upgrading their premises — offices, retail, restaurants, and small-scale commercial structures.",
      "Commercial projects require tighter scheduling and clearer compliance pathways. We coordinate with your operations to minimise disruption — including night and weekend work where the timing matters.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
      alt: "Commercial building exterior",
    },
    included: [
      "Full ground-up commercial buildings",
      "Office and retail fit-outs (partition, ceiling, finishes)",
      "Mechanical, electrical, and plumbing coordination",
      "HVAC integration with specialist subcontractors",
      "Compliance with local council and fire requirements",
      "Phased delivery for occupied premises",
      "After-hours work for minimal business disruption",
      "Handover packages including warranties and as-built drawings",
    ],
    process: [
      {
        title: "Brief & scope",
        description:
          "Walk the space with you, understand operational constraints, agree on scope and any phasing.",
      },
      {
        title: "Estimate & schedule",
        description:
          "Itemised quote with a realistic schedule including any night/weekend windows. Compliance pathway documented.",
      },
      {
        title: "Build with minimal disruption",
        description:
          "Daily site cleanups, secured work zones, communication with your team about each phase.",
      },
      {
        title: "Handover with documentation",
        description:
          "As-built drawings, warranty documentation, compliance certificates — all delivered before final invoice.",
      },
    ],
    timeline: "3–9 months",
    startingFrom: "Quote on visit",
    order: 2,
  },
  {
    slug: "interior-finishing",
    title: "Interior Finishing",
    summary:
      "Joinery, flooring, ceilings, and finishes — the craft that turns a structure into a home.",
    description: [
      "Interior finishing work — the layer that turns a structural shell into a finished space. Covers joinery, flooring, ceilings, painting, and built-in furniture.",
      "We can take on full interior packages or specific scopes — for example, kitchen and wardrobe joinery only, or ceiling and flooring across an existing space. Suited to both new builds and renovations.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      alt: "Interior detail of warm timber finishes and clean lines",
    },
    included: [
      "Custom joinery — wardrobes, kitchens, vanities, built-ins",
      "Hardwood, engineered timber, and tile flooring",
      "Suspended and decorative ceilings",
      "Wall finishes — paint, wallpaper, panelling",
      "Bathroom and kitchen installations",
      "Lighting and electrical fixture installation",
      "Trim, skirting, architraves, and detailing",
      "Final clean and snagging",
    ],
    process: [
      {
        title: "Walkthrough & measurement",
        description:
          "On-site assessment of the space, detailed measurements, discussion of finishes and materials.",
      },
      {
        title: "Specification & quote",
        description:
          "Material specifications with samples where helpful. Itemised quote with optional alternatives.",
      },
      {
        title: "Workshop & install",
        description:
          "Joinery is built in our workshop. On-site work scheduled to minimise dust and disruption.",
      },
      {
        title: "Snagging & handover",
        description:
          "Final walk-through with you. Any adjustments completed before sign-off.",
      },
    ],
    timeline: "1–4 months",
    startingFrom: "Quote on visit",
    order: 3,
  },
];

export function getServicesOrdered(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
