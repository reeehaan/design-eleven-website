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

  /**
   * Pre-fills the contact form via ?service=, exactly as Engagement.ref does.
   * Must be a PROJECT_TYPES value from `contact-form.ts` — the form validates
   * against that enum and silently ignores anything else, so passing the slug
   * here looked like it worked and prefilled nothing.
   *
   * Most trades have no matching project type because they are capabilities,
   * not the thing a client hires the studio for. "other" is the honest answer
   * there rather than a forced fit.
   */
  contactParam: string;
};

export const services: Service[] = [
  {
    slug: "building-construction",
    contactParam: "residential-builds",
    title: "Building Construction & Repair",
    summary:
      "New builds, extensions, and structural repairs — residential and commercial.",
    description: [
      "Ground-up construction and repair work for homes, commercial properties, and any structure that needs building or restoring. We handle the full scope — foundations, superstructure, finishes, and everything between.",
      "Repair and renovation work is treated with the same rigour as new builds. We assess the existing structure honestly, scope only what's needed, and carry it out to a standard we'd put our name on.",
    ],
    image: {
      // Generated, and served locally rather than from the generator's CDN:
      // no remote pattern to whitelist, no dependence on infrastructure we do
      // not control. All seven service images below are generated the same
      // way. Replace each with a photograph of actual Design Eleven work the
      // day one exists for that trade — on a builder's page a real site is
      // evidence, and every image here is only ever decoration standing in
      // for it.
      src: "/services/building-construction.avif",
      alt: "A reinforced concrete frame mid-build — columns cast, the first-floor slab poured, timber formwork still strapped in place",
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
    contactParam: "other",
    title: "Steel Fabrication",
    summary:
      "Custom steelwork — gates, grilles, staircases, structural elements, balustrades.",
    description: [
      "In-house steel fabrication for both our own builds and standalone client jobs. From decorative gates and grilles to structural elements like steel staircases, mezzanines, and balustrades.",
      "We design, fabricate in our workshop, and install on site. Materials are sourced to spec — mild steel, stainless, galvanised — with appropriate finishes for the environment.",
    ],
    image: {
      src: "/services/steel-fabrication.avif",
      alt: "A wrought-iron gate mid-fabrication on a workshop bench, angle grinder and clamps beside it, welding equipment and steel stock along the walls",
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
    contactParam: "other",
    title: "Plumbing",
    summary:
      "Full plumbing services — installation, renewal, and maintenance for homes and commercial spaces.",
    description: [
      "Plumbing services across residential and commercial — from new installations during a build to upgrades, repairs, and complete system renewals in existing properties.",
      "We handle hot and cold water systems, drainage, sanitary fixtures, and hot-water solutions. Work is coordinated with electrical and structural trades on multi-discipline projects.",
    ],
    image: {
      src: "/services/plumbing.avif",
      alt: "First-fix copper and PVC pipework in a chased block wall, a pressure gauge fitted inline, fittings laid out on the floor below",
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
    contactParam: "other",
    title: "Titanium Work",
    summary:
      "Titanium floor finishes — a smooth, high-strength, seamless surface for modern interiors.",
    description: [
      "A specialised modern flooring technique that blends titanium dioxide powder or liquid polymer additives with cement mortar to produce a smooth, high-strength surface finished semi-gloss or full gloss. The result is a sleek, seamless concrete floor with none of the joint lines a tiled surface carries.",
      "We prepare the base slab, lay and cure the titanium-modified mortar, then grind and polish to the finish specified. Popular in contemporary residential and commercial interiors where a tiled or timber floor would read as busy against clean architecture.",
    ],
    image: {
      src: "/services/titanium-work.avif",
      alt: "A polished titanium floor installation catching natural light, meeting a plastered wall base in a modern interior",
    },
    included: [
      "Base slab preparation and levelling",
      "Titanium dioxide / polymer-modified mortar mix",
      "Full-floor pours with minimal or no visible joints",
      "Semi-gloss or full-gloss grind and polish",
      "Colour and aggregate options within the mix",
      "Sealing for stain and wear resistance",
      "Suitable for residential and commercial floor areas",
      "Coordinated with underfloor services before the pour",
    ],
    process: [
      {
        title: "Site assessment",
        description:
          "Check the base slab, moisture conditions, and traffic the floor needs to take. Finish and gloss level agreed.",
      },
      {
        title: "Specification & quote",
        description:
          "Mix design and finish specified. Area measured and quoted with a lead time for cure and polish.",
      },
      {
        title: "Pour & cure",
        description:
          "Mortar laid to falls and levels, then left to cure fully before grinding begins.",
      },
      {
        title: "Grind, polish & seal",
        description:
          "Ground to the specified gloss level, then sealed. Final inspection under raking light before handover.",
      },
    ],
    timeline: "1–3 weeks",
    startingFrom: "Quote on visit",
    order: 4,
    showOnHome: true,
  },
  {
    slug: "consulting",
    contactParam: "other",
    title: "Consulting",
    summary:
      "Independent construction advice — project feasibility, scope review, contractor assessment, and dispute support.",
    description: [
      "Construction consulting for clients who need an expert view before committing to a build, or who want independent oversight on an existing project. We assess feasibility, review drawings and specifications, evaluate contractor quotes, and advise on risk.",
      "With a qualified Quantity Surveyor leading every engagement, our advice is grounded in real build cost knowledge — not guesswork. We work for the client, not the contractor.",
    ],
    image: {
      src: "/services/consulting.avif",
      alt: "A site inspection checklist and architectural drawings on a clipboard, tape measure and laser meter beside them, set against a brick pier on an active site",
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
    contactParam: "costing",
    title: "Costing",
    summary:
      "Accurate Bills of Quantities and cost estimates prepared by a qualified Quantity Surveyor.",
    description: [
      "Quantity surveying and cost planning services — Bills of Quantities, detailed estimates, tender documentation, and cash flow projections. Prepared by a qualified QS with real construction pricing knowledge.",
      "Accurate costing at the right stage saves money and avoids surprises. We work with architects, developers, and private clients to cost projects before they go to tender, during build, and at final account.",
    ],
    image: {
      src: "/services/costing.avif",
      alt: "A printed Bill of Quantities beside a laptop spreadsheet, calculator and scale ruler, on a bright office desk",
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
    contactParam: "other",
    title: "Design",
    summary:
      "Architectural and interior design — from concept drawings to construction-ready documentation.",
    description: [
      "Design services for residential and commercial projects — concept development, space planning, architectural drawings, and interior specification. We produce designs that are buildable, not just presentable.",
      "Because our design team works alongside our build team, drawings are detailed and practical. Less rework on site, fewer surprises, and a result that matches the intent.",
    ],
    image: {
      src: "/services/design.avif",
      alt: "A white-card massing model on a studio desk beside rolled concept elevations and material swatches, sketches pinned on the wall behind",
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
