export type ProjectCategory = "Residential" | "Commercial" | "Interior";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type BeforeAfter = {
  before: ProjectImage;
  after: ProjectImage;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  category: ProjectCategory;
  location: string;
  year: number;
  durationMonths: number;
  area: number | null;
  areaUnit: "sqft" | "sqm";
  cover: ProjectImage;
  featured: boolean;
  featuredOrder?: number;
  gridSpan?: 1 | 2;
  aspect?: "tall" | "standard";
  gallery?: ProjectImage[];
  beforeAfter?: BeforeAfter;
  materials?: string[];
  scope?: string[];
  testimonialId?: string;
};

export const projects: Project[] = [
  // {
  //   slug: "modern-residence-rajagiriya",
  //   title: "Modern Residence",
  //   summary:
  //     "A four-bedroom family home with open-plan living and a courtyard garden.",
  //   description: [
  //     "Designed around a central courtyard, this 4-bedroom residence balances private family spaces with generous communal living areas. The brief called for a calm, light-filled home that worked with Sri Lanka's tropical climate.",
  //     "We delivered the build over 14 months — from groundwork through to finishing — coordinating directly with the architect and the client throughout. Materials were selected for durability in monsoon conditions: concrete superstructure, teak joinery, polished cement floors.",
  //     "The project taught us a lot about working with deep-set sites: drainage, ventilation, and how to bring daylight into central rooms without compromising privacy. The result is a home that feels quiet, ordered, and very much rooted in its place.",
  //   ],
  //   category: "Residential",
  //   location: "Rajagiriya",
  //   year: 2024,
  //   durationMonths: 14,
  //   area: 4200,
  //   areaUnit: "sqft",
  //   cover: {
  //     src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80",
  //     alt: "A modern residential home with clean lines and warm timber accents",
  //   },
  //   featured: true,
  //   featuredOrder: 1,
  //   gridSpan: 2,
  //   aspect: "standard",
  //   gallery: [
  //     {
  //       src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  //       alt: "Front elevation of the residence",
  //     },
  //     {
  //       src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
  //       alt: "Interior living room with timber accents",
  //     },
  //     {
  //       src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  //       alt: "Kitchen and dining area",
  //     },
  //     {
  //       src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
  //       alt: "Master bedroom with garden view",
  //     },
  //   ],
  //   scope: [
  //     "Full ground-up build, foundation to handover",
  //     "Architectural coordination with consultant",
  //     "Council compliance and approvals",
  //     "Joinery, finishes, and landscaping",
  //   ],
  //   materials: [
  //     "Reinforced concrete superstructure",
  //     "Locally-sourced teak joinery",
  //     "Polished cement floors throughout",
  //     "Clay-tile pitched roof over reinforced slab",
  //     "Lime-wash external finishes",
  //     "Solid teak doors with brass hardware",
  //   ],
  //   testimonialId: "t1",
  // },
  // {
  //   slug: "office-fitout-colombo-03",
  //   title: "Office Fit-out",
  //   summary:
  //     "Full interior fit-out of a 6,000 sqft office floor for a financial services firm.",
  //   description: [
  //     "Complete interior fit-out for a financial services firm relocating into a new commercial floor. Scope included partitioning, ceiling works, electrical, HVAC integration, joinery, and finishes across an open workspace, six private offices, two meeting rooms, and a client-facing reception.",
  //     "Delivered in 4 months around the client's operational schedule, with weekend and night work coordinated to minimise disruption.",
  //   ],
  //   category: "Commercial",
  //   location: "Colombo 03",
  //   year: 2024,
  //   durationMonths: 4,
  //   area: 6000,
  //   areaUnit: "sqft",
  //   cover: {
  //     src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
  //     alt: "A modern office interior with warm lighting and clean lines",
  //   },
  //   featured: true,
  //   featuredOrder: 2,
  //   gridSpan: 1,
  //   aspect: "tall",
  //   gallery: [
  //     {
  //       src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  //       alt: "Open workspace with natural light",
  //     },
  //     {
  //       src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1600&q=80",
  //       alt: "Private office with bespoke joinery",
  //     },
  //     {
  //       src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80",
  //       alt: "Client-facing reception area",
  //     },
  //   ],
  //   scope: [
  //     "Full interior fit-out, shell to finish",
  //     "Partitioning, ceilings, electrical, HVAC",
  //     "Bespoke joinery and reception build",
  //     "Phased delivery around live operations",
  //   ],
  //   materials: [
  //     "Acoustic suspended ceiling system",
  //     "Veneer-clad partition walls",
  //     "Engineered timber flooring",
  //     "Custom millwork reception desk",
  //     "Linear LED lighting throughout",
  //   ],
  //   testimonialId: "t2",
  // },
  {
    slug: "living-room-refresh-anuradhapura",
    title: "Living Room Refresh",
    summary:
      "A warm interior refresh blending dusty blue tones, custom wood detailing, and modern track lighting — without changing the original layout.",
    description: [
      "An interior refresh of a residential living room that preserved the home's original character while introducing a calmer, more contemporary feel. The existing arched doorway and traditional timber window were retained as focal points, anchoring the new palette.",
      "A muted dusty blue accent wall was paired with crisp white surroundings to define the space without overwhelming it. Custom teak shelving and a curated gallery wall featuring traditional Sri Lankan masks add warmth and personal character.",
      "Modern black track lighting replaced the existing fixtures to highlight key features and give the room a contemporary edge. New skirting and floor finishes complete the refresh.",
    ],
    category: "Interior",
    location: "Anuradhapura",
    year: 2024,
    durationMonths: 1,
    area: 280,
    areaUnit: "sqft",
    cover: {
      src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_4:3,w_1600,q_auto,f_auto/v1778577481/hero-image_a9ee3c.jpg",
      alt: "A refreshed living room with a dusty blue accent wall, custom wood shelving, and modern black track lighting",
    },
    featured: true,
    featuredOrder: 3,
    gridSpan: 1,
    aspect: "standard",
    gallery: [
      {
        src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_16:9,w_1600,q_auto,f_auto/v1778577481/hero-image_a9ee3c.jpg",
        alt: "Accent wall with custom teak shelving and gallery wall of traditional Sri Lankan masks",
      },
      {
        src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_16:9,w_1600,q_auto,f_auto/v1778578265/WhatsApp_Image_2026-05-11_at_21.12.24_4_u518b9.jpg",
        alt: "Living room view with traditional arched window and modern track lighting",
      },
      {
        src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_4:3,w_1200,q_auto,f_auto/v1778578162/WhatsApp_Image_2026-05-11_at_21.12.24_2_fs2wpq.jpg",
        alt: "Living room view with traditional arched window and modern track lighting",
      },
      {
        src: "https://res.cloudinary.com/db0svseve/image/upload/v1778578266/WhatsApp_Image_2026-05-11_at_21.12.24_5_jttfqy.jpg",
        alt: "Living room view with traditional arched window and modern track lighting",
      },
      {
        src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_16:9,w_1600,q_auto,f_auto/v1778578162/WhatsApp_Image_2026-05-11_at_21.12.24_3_lr4pay.jpg",
        alt: "Living room view with traditional arched window and modern track lighting",
      },
      {
        src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_16:9,w_1600,q_auto,f_auto/v1778578266/WhatsApp_Image_2026-05-11_at_21.12.24_6_ipjnay.jpg",
        alt: "Living room view with traditional arched window and modern track lighting",
      },
    ],

    beforeAfter: {
      before: {
        src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_16:9,w_1600,q_auto,f_auto/v1778578162/WhatsApp_Image_2026-05-11_at_21.12.24_3_lr4pay.jpg",
        alt: "Living room before the refresh",
      },
      after: {
        src: "https://res.cloudinary.com/db0svseve/image/upload/c_fill,g_auto,ar_16:9,w_1600,q_auto,f_auto/v1778578161/WhatsApp_Image_2026-05-11_at_21.12.24_xit7ad.jpg",
        alt: "Living room after the refresh",
      },
    },
    scope: [
      "Wall preparation and accent wall painting",
      "Custom teak wall shelving design and installation",
      "Modern track lighting installation",
      "Skirting and floor finishing",
      "Decor styling and gallery wall curation",
    ],
    materials: [
      "Dusty blue matte interior paint",
      "Solid teak shelving with natural finish",
      "Black powder-coated track lighting with directional spots",
      "Polished concrete floor finish",
      "Teak skirting boards",
    ],
    testimonialId: "t3",
  },
  // {
  //   slug: "courtyard-villa-battaramulla",
  //   title: "Courtyard Villa",
  //   summary:
  //     "A three-bedroom courtyard villa with cross-ventilated living and a verandah-led plan.",
  //   description: [
  //     "A 3-bedroom villa organised around a planted central courtyard, with verandahs running the perimeter for cross-ventilation and indoor-outdoor living. Built to maximise natural light without compromising privacy from the street.",
  //     "Construction took 11 months. The client briefed a low-maintenance, climate-responsive home — we delivered with deep eaves, polished concrete floors, and locally-sourced timber detailing throughout.",
  //   ],
  //   category: "Residential",
  //   location: "Battaramulla",
  //   year: 2023,
  //   durationMonths: 11,
  //   area: 3100,
  //   areaUnit: "sqft",
  //   cover: {
  //     src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80",
  //     alt: "Modern villa with verandahs and natural materials",
  //   },
  //   featured: false,
  //   gridSpan: 1,
  //   aspect: "standard",
  //   scope: [
  //     "Ground-up villa build",
  //     "Climate-responsive design coordination",
  //     "Verandah and landscaping integration",
  //   ],
  //   materials: [
  //     "Polished concrete floors",
  //     "Local timber rafters and detailing",
  //     "Cement-rendered walls",
  //     "Clay tile roof",
  //   ],
  // },
  // {
  //   slug: "boutique-cafe-colombo-07",
  //   title: "Boutique Café Build-out",
  //   summary:
  //     "Shell-and-core to operational café in 10 weeks — bar, kitchen, and dining fitout.",
  //   description: [
  //     "A shell-and-core unit converted into a fully operational boutique café in 10 weeks. Scope included bar build, commercial kitchen rough-in, dining area finishes, exterior signage support, and full MEP coordination with the operator's specialists.",
  //     "Tight timeline driven by lease commencement — delivered on schedule, on budget, with zero rework.",
  //   ],
  //   category: "Commercial",
  //   location: "Colombo 07",
  //   year: 2022,
  //   durationMonths: 2,
  //   area: 1800,
  //   areaUnit: "sqft",
  //   cover: {
  //     src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80",
  //     alt: "A modern boutique café interior with warm wood and clean detailing",
  //   },
  //   featured: false,
  //   gridSpan: 2,
  //   aspect: "standard",
  //   scope: [
  //     "Shell-and-core conversion",
  //     "Bar, kitchen, dining fit-out",
  //     "MEP coordination with specialists",
  //     "Delivered on a 10-week timeline",
  //   ],
  //   materials: [
  //     "Solid timber bar counter",
  //     "Industrial pendant lighting",
  //     "Terrazzo flooring",
  //     "Reclaimed brick feature wall",
  //   ],
  // },
  // {
  //   slug: "wardrobe-joinery-malabe",
  //   title: "Bespoke Wardrobe Joinery",
  //   summary:
  //     "Custom built-in wardrobes and dresser units across three bedrooms in a private residence.",
  //   description: [
  //     "Bespoke joinery package for a private residence — built-in wardrobes and dresser units across three bedrooms, plus a built-in bookcase in the study.",
  //     "All joinery built in our workshop and installed on site over a 5-week period. Materials: solid teak frames with veneered panels, soft-close hardware throughout, integrated LED lighting.",
  //   ],
  //   category: "Interior",
  //   location: "Malabe",
  //   year: 2022,
  //   durationMonths: 1,
  //   area: null,
  //   areaUnit: "sqft",
  //   cover: {
  //     src: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=2000&q=80",
  //     alt: "Custom built-in wardrobe in warm timber",
  //   },
  //   featured: false,
  //   gridSpan: 1,
  //   aspect: "tall",
  //   scope: [
  //     "Bespoke joinery design and build",
  //     "Workshop fabrication",
  //     "On-site installation across 3 rooms",
  //   ],
  //   materials: [
  //     "Solid teak frame construction",
  //     "Premium veneer panels",
  //     "Soft-close German hardware",
  //     "Integrated LED strip lighting",
  //   ],
  // },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort(
      (a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity),
    );
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCategories(): ProjectCategory[] {
  const order: ProjectCategory[] = ["Residential", "Commercial", "Interior"];
  const present = new Set(projects.map((p) => p.category));
  return order.filter((c) => present.has(c));
}

export function getYears(): number[] {
  return Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => b - a);
}

export function getLocations(): string[] {
  return Array.from(new Set(projects.map((p) => p.location))).sort();
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const ordered = getAllProjects();
  const idx = ordered.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length] ?? null;
  const next = ordered[(idx + 1) % ordered.length] ?? null;
  return { prev, next };
}
