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
  showOnHome?: boolean;
};

export const services: Service[] = [
  {
    slug: "building-construction",
    title: "Building Construction & Repair",
    summary:
      "New builds, extensions, and structural repairs — residential and commercial.",
    description: [
      "Ground-up construction and repair work for homes, commercial properties, and any structure that needs building or restoring. We handle the full scope — foundations, superstructure, finishes, and everything between.",
      "Repair and renovation work is treated with the same rigour as new builds. We assess the existing structure honestly, scope only what's needed, and carry it out to a standard we'd put our name on.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      alt: "Building construction site with concrete structure",
    },
    included: [
      "Site preparation, excavation, and foundations",
      "Reinforced concrete superstructure",
      "Brick and block masonry, plastering",
      "Roofing — concrete slab, tiled, or metal sheeting",
      "Plumbing, electrical, and drainage rough-ins",
      "Internal and external finishes",
      "Structural repairs and remediation",
      "Painting, flooring, and fixtures",
      "Council compliance and handover documentation",
    ],
    process: [
      {
        title: "Site assessment",
        description:
          "Visit the site, review drawings if available, assess any existing structure, and identify constraints.",
      },
      {
        title: "Itemised estimate",
        description:
          "Detailed written quote: materials, labour, timeline, payment milestones. Provided within one week of site visit.",
      },
      {
        title: "Build",
        description:
          "Work carried out to schedule with weekly updates. Single point of contact throughout.",
      },
      {
        title: "Handover",
        description:
          "Final walk-through, snagging list resolved, all documents handed over.",
      },
    ],
    timeline: "Weeks to months",
    startingFrom: "Quote on visit",
    order: 1,
    showOnHome: true,
  },
  {
    slug: "steel-fabrication",
    title: "Steel Fabrication",
    summary:
      "Custom steelwork — gates, grilles, staircases, structural elements, balustrades.",
    description: [
      "In-house steel fabrication for both our own builds and standalone client jobs. From decorative gates and grilles to structural elements like steel staircases, mezzanines, and balustrades.",
      "We design, fabricate in our workshop, and install on site. Materials are sourced to spec — mild steel, stainless, galvanised — with appropriate finishes for the environment.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
      alt: "Steel fabrication work — structural and decorative elements",
    },
    included: [
      "Custom gates and grilles",
      "Steel staircases — straight, spiral, floating",
      "Balustrades and handrails",
      "Structural steel elements (with engineering input)",
      "Pergolas and outdoor frames",
      "Mezzanine structures",
      "Powder coating and galvanised finishes",
      "Workshop fabrication, on-site install",
    ],
    process: [
      {
        title: "Brief & measurement",
        description:
          "Site visit to measure and discuss the design. Sketches confirmed before fabrication.",
      },
      {
        title: "Fabrication quote",
        description:
          "Detailed quote covering steel, finishes, fabrication time, and installation.",
      },
      {
        title: "Workshop build",
        description: "Built in our workshop with quality checks at each stage.",
      },
      {
        title: "Site install",
        description:
          "Delivered and installed on site, with finishing touches and adjustments as needed.",
      },
    ],
    timeline: "2–6 weeks",
    startingFrom: "Quote on visit",
    order: 2,
    showOnHome: true,
  },
  {
    slug: "plumbing",
    title: "Plumbing",
    summary:
      "Full plumbing services — installation, renewal, and maintenance for homes and commercial spaces.",
    description: [
      "Plumbing services across residential and commercial — from new installations during a build to upgrades, repairs, and complete system renewals in existing properties.",
      "We handle hot and cold water systems, drainage, sanitary fixtures, and hot-water solutions. Work is coordinated with electrical and structural trades on multi-discipline projects.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
      alt: "Plumbing installation in a modern bathroom",
    },
    included: [
      "Hot and cold water system installation",
      "Drainage and sewage layout",
      "Sanitary fixture installation (bathrooms, kitchens, utilities)",
      "Hot-water solutions — solar, electric, gas",
      "Pump installation and pressure systems",
      "Existing system upgrades and replacements",
      "Leak detection and repairs",
      "Compliance with relevant codes",
    ],
    process: [
      {
        title: "Inspection & scope",
        description:
          "Site visit to understand the system requirements or the existing problem.",
      },
      {
        title: "Quote with specifications",
        description:
          "Materials specified by brand and grade. Labour itemised. Timeline confirmed.",
      },
      {
        title: "Installation",
        description:
          "Coordinated with other trades on site. Pressure-tested before close-up.",
      },
      {
        title: "Final commissioning",
        description:
          "Systems tested, fixtures installed, walk-through with the client.",
      },
    ],
    timeline: "Hours to weeks",
    startingFrom: "Quote on visit",
    order: 3,
    showOnHome: true,
  },
  {
    slug: "titanium-work",
    title: "Titanium Work",
    summary:
      "Precision titanium fabrication — cladding, railings, gates, and architectural elements.",
    description: [
      "Titanium fabrication for projects that demand durability, corrosion resistance, and a refined finish. Used in coastal environments, high-end residential, and commercial work where steel would corrode or aluminium would look insufficient.",
      "We cut, form, weld, and finish titanium to specification — from architectural cladding panels and decorative screens to railings, gates, and bespoke structural elements. Work is carried out in our workshop and installed on site.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1200&q=80",
      alt: "Precision metalwork and titanium architectural elements",
    },
    included: [
      "Architectural cladding and facade panels",
      "Railings, balustrades, and handrails",
      "Gates and security screens",
      "Decorative panels and feature elements",
      "Custom brackets and structural connectors",
      "Surface finishing — brushed, polished, anodised",
      "Workshop fabrication and on-site install",
      "Coastal and corrosion-resistant specification",
    ],
    process: [
      {
        title: "Design brief",
        description:
          "Discuss the application, environment, and finish requirements. Technical drawings confirmed.",
      },
      {
        title: "Specification & quote",
        description:
          "Grade and finish specified. Fabrication and install quoted with lead time.",
      },
      {
        title: "Workshop fabrication",
        description:
          "Precision cut, formed, and finished in-house with quality inspection before dispatch.",
      },
      {
        title: "Installation",
        description:
          "On-site installation with final adjustments and surface protection.",
      },
    ],
    timeline: "2–8 weeks",
    startingFrom: "Quote on visit",
    order: 4,
    showOnHome: true,
  },
  {
    slug: "consulting",
    title: "Consulting",
    summary:
      "Independent construction advice — project feasibility, scope review, contractor assessment, and dispute support.",
    description: [
      "Construction consulting for clients who need an expert view before committing to a build, or who want independent oversight on an existing project. We assess feasibility, review drawings and specifications, evaluate contractor quotes, and advise on risk.",
      "With a qualified Quantity Surveyor leading every engagement, our advice is grounded in real build cost knowledge — not guesswork. We work for the client, not the contractor.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      alt: "Construction consulting — reviewing plans and specifications",
    },
    included: [
      "Project feasibility assessments",
      "Drawing and specification review",
      "Contractor quote evaluation",
      "Site inspection and progress reports",
      "Dispute and defect assessment",
      "Value engineering recommendations",
      "Procurement advice",
      "Written reports and formal opinions",
    ],
    process: [
      {
        title: "Initial brief",
        description:
          "Understand the question you need answered — feasibility, dispute, oversight, or procurement.",
      },
      {
        title: "Scope & fee agreement",
        description:
          "Agree the scope of the consulting engagement and a fixed or day-rate fee.",
      },
      {
        title: "Assessment",
        description:
          "Site visits, document review, and analysis as required by the scope.",
      },
      {
        title: "Deliverable",
        description:
          "Written report, opinion, or recommendation delivered in the agreed format.",
      },
    ],
    timeline: "Days to weeks",
    startingFrom: "Day rate / fixed fee",
    order: 5,
  },
  {
    slug: "costing",
    title: "Costing",
    summary:
      "Accurate Bills of Quantities and cost estimates prepared by a qualified Quantity Surveyor.",
    description: [
      "Quantity surveying and cost planning services — Bills of Quantities, detailed estimates, tender documentation, and cash flow projections. Prepared by a qualified QS with real construction pricing knowledge.",
      "Accurate costing at the right stage saves money and avoids surprises. We work with architects, developers, and private clients to cost projects before they go to tender, during build, and at final account.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
      alt: "Quantity surveying and cost planning documents",
    },
    included: [
      "Bills of Quantities (BOQ)",
      "Preliminary cost estimates and feasibility budgets",
      "Tender documentation preparation",
      "Tender evaluation and recommendation",
      "Cash flow projections",
      "Variation assessment and pricing",
      "Final account preparation",
      "Material take-offs",
    ],
    process: [
      {
        title: "Document review",
        description:
          "Review drawings, specifications, and any existing cost information.",
      },
      {
        title: "Measurement",
        description:
          "Detailed measurement and take-off from drawings in accordance with standard methods.",
      },
      {
        title: "Pricing",
        description:
          "Current market rates applied. Assumptions documented clearly.",
      },
      {
        title: "Delivery",
        description:
          "BOQ or estimate delivered in agreed format. Available to answer queries.",
      },
    ],
    timeline: "3–10 working days",
    startingFrom: "Fixed fee by scope",
    order: 6,
  },
  {
    slug: "design",
    title: "Design",
    summary:
      "Architectural and interior design — from concept drawings to construction-ready documentation.",
    description: [
      "Design services for residential and commercial projects — concept development, space planning, architectural drawings, and interior specification. We produce designs that are buildable, not just presentable.",
      "Because our design team works alongside our build team, drawings are detailed and practical. Less rework on site, fewer surprises, and a result that matches the intent.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      alt: "Architectural design drawings and interior concept",
    },
    included: [
      "Concept development and mood boards",
      "Architectural drawings (plans, sections, elevations)",
      "Space planning and layouts",
      "Material and finish specification",
      "Lighting design",
      "Interior furniture and soft furnishing curation",
      "Construction-ready documentation",
      "Council submission drawings where required",
    ],
    process: [
      {
        title: "Brief & site visit",
        description:
          "Understand the project goals, constraints, and budget. Site measured and photographed.",
      },
      {
        title: "Concept",
        description:
          "Initial concept drawings and material direction presented. Two rounds of revisions included.",
      },
      {
        title: "Developed design",
        description:
          "Full drawing set produced to construction or council submission standard.",
      },
      {
        title: "Handover",
        description:
          "All files delivered in agreed formats, ready for build or submission.",
      },
    ],
    timeline: "2 weeks – 3 months",
    startingFrom: "Fixed fee by scope",
    order: 7,
    showOnHome: true,
  },
];

export function getServicesOrdered(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getHomeServices(): Service[] {
  return getServicesOrdered().filter((s) => s.showOnHome);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
