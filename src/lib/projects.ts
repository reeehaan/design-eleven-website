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
  {
    slug: "modern-residence-rajagiriya",
    title: "Modern Residence",
    summary:
      "A four-bedroom family home with open-plan living and a courtyard garden.",
    description: [
      "Designed around a central courtyard, this 4-bedroom residence balances private family spaces with generous communal living areas. The brief called for a calm, light-filled home that worked with Sri Lanka's tropical climate.",
      "We delivered the build over 14 months — from groundwork through to finishing — coordinating directly with the architect and the client throughout. Materials were selected for durability in monsoon conditions: concrete superstructure, teak joinery, polished cement floors.",
      "The project taught us a lot about working with deep-set sites: drainage, ventilation, and how to bring daylight into central rooms without compromising privacy. The result is a home that feels quiet, ordered, and very much rooted in its place.",
    ],
    category: "Residential",
    location: "Rajagiriya",
    year: 2024,
    durationMonths: 14,
    area: 4200,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80",
      alt: "A modern residential home with clean lines and warm timber accents",
    },
    featured: true,
    featuredOrder: 1,
    gridSpan: 2,
    aspect: "standard",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
        alt: "Front elevation of the residence",
      },
      {
        src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
        alt: "Interior living room with timber accents",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        alt: "Kitchen and dining area",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
        alt: "Master bedroom with garden view",
      },
    ],
    scope: [
      "Full ground-up build, foundation to handover",
      "Architectural coordination with consultant",
      "Council compliance and approvals",
      "Joinery, finishes, and landscaping",
    ],
    materials: [
      "Reinforced concrete superstructure",
      "Locally-sourced teak joinery",
      "Polished cement floors throughout",
      "Clay-tile pitched roof over reinforced slab",
      "Lime-wash external finishes",
      "Solid teak doors with brass hardware",
    ],
    testimonialId: "t1",
  },
  {
    slug: "office-fitout-colombo-03",
    title: "Office Fit-out",
    summary:
      "Full interior fit-out of a 6,000 sqft office floor for a financial services firm.",
    description: [
      "Complete interior fit-out for a financial services firm relocating into a new commercial floor. Scope included partitioning, ceiling works, electrical, HVAC integration, joinery, and finishes across an open workspace, six private offices, two meeting rooms, and a client-facing reception.",
      "Delivered in 4 months around the client's operational schedule, with weekend and night work coordinated to minimise disruption.",
    ],
    category: "Commercial",
    location: "Colombo 03",
    year: 2024,
    durationMonths: 4,
    area: 6000,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
      alt: "A modern office interior with warm lighting and clean lines",
    },
    featured: true,
    featuredOrder: 2,
    gridSpan: 1,
    aspect: "tall",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
        alt: "Open workspace with natural light",
      },
      {
        src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1600&q=80",
        alt: "Private office with bespoke joinery",
      },
      {
        src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1600&q=80",
        alt: "Client-facing reception area",
      },
    ],
    scope: [
      "Full interior fit-out, shell to finish",
      "Partitioning, ceilings, electrical, HVAC",
      "Bespoke joinery and reception build",
      "Phased delivery around live operations",
    ],
    materials: [
      "Acoustic suspended ceiling system",
      "Veneer-clad partition walls",
      "Engineered timber flooring",
      "Custom millwork reception desk",
      "Linear LED lighting throughout",
    ],
    testimonialId: "t2",
  },
  {
    slug: "kitchen-living-renovation-nugegoda",
    title: "Kitchen & Living Renovation",
    summary:
      "Full renovation of a kitchen and living area in a 1990s home — opened up, refinished, rewired.",
    description: [
      "A complete renovation of the kitchen and living area in a 1990s home. The existing wall between the two rooms was removed to create an open-plan space, with structural reinforcement detailed by the engineer.",
      "All electrical and plumbing was renewed. New cabinetry, flooring, and lighting were specified and installed by our team. Delivered in 3 months while the family lived elsewhere.",
    ],
    category: "Interior",
    location: "Nugegoda",
    year: 2023,
    durationMonths: 3,
    area: 1100,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80",
      alt: "A renovated open-plan kitchen and living space with warm wood finishes",
    },
    featured: true,
    featuredOrder: 3,
    gridSpan: 1,
    aspect: "tall",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1600&q=80",
        alt: "New kitchen with island and pendant lighting",
      },
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        alt: "Living area with new flooring and finishes",
      },
    ],
    beforeAfter: {
      before: {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        alt: "Kitchen before renovation",
      },
      after: {
        src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
        alt: "Kitchen after renovation",
      },
    },
    scope: [
      "Demolition of dividing wall with engineering",
      "Full electrical and plumbing renewal",
      "New cabinetry, flooring, and lighting",
      "Painting and finishes throughout",
    ],
    materials: [
      "Oak veneer cabinetry, soft-close throughout",
      "Engineered oak flooring",
      "Granite countertops",
      "Recessed and pendant LED lighting",
    ],
    testimonialId: "t3",
  },
  {
    slug: "courtyard-villa-battaramulla",
    title: "Courtyard Villa",
    summary:
      "A three-bedroom courtyard villa with cross-ventilated living and a verandah-led plan.",
    description: [
      "A 3-bedroom villa organised around a planted central courtyard, with verandahs running the perimeter for cross-ventilation and indoor-outdoor living. Built to maximise natural light without compromising privacy from the street.",
      "Construction took 11 months. The client briefed a low-maintenance, climate-responsive home — we delivered with deep eaves, polished concrete floors, and locally-sourced timber detailing throughout.",
    ],
    category: "Residential",
    location: "Battaramulla",
    year: 2023,
    durationMonths: 11,
    area: 3100,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80",
      alt: "Modern villa with verandahs and natural materials",
    },
    featured: false,
    gridSpan: 1,
    aspect: "standard",
    scope: [
      "Ground-up villa build",
      "Climate-responsive design coordination",
      "Verandah and landscaping integration",
    ],
    materials: [
      "Polished concrete floors",
      "Local timber rafters and detailing",
      "Cement-rendered walls",
      "Clay tile roof",
    ],
  },
  {
    slug: "boutique-cafe-colombo-07",
    title: "Boutique Café Build-out",
    summary:
      "Shell-and-core to operational café in 10 weeks — bar, kitchen, and dining fitout.",
    description: [
      "A shell-and-core unit converted into a fully operational boutique café in 10 weeks. Scope included bar build, commercial kitchen rough-in, dining area finishes, exterior signage support, and full MEP coordination with the operator's specialists.",
      "Tight timeline driven by lease commencement — delivered on schedule, on budget, with zero rework.",
    ],
    category: "Commercial",
    location: "Colombo 07",
    year: 2022,
    durationMonths: 2,
    area: 1800,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=2000&q=80",
      alt: "A modern boutique café interior with warm wood and clean detailing",
    },
    featured: false,
    gridSpan: 2,
    aspect: "standard",
    scope: [
      "Shell-and-core conversion",
      "Bar, kitchen, dining fit-out",
      "MEP coordination with specialists",
      "Delivered on a 10-week timeline",
    ],
    materials: [
      "Solid timber bar counter",
      "Industrial pendant lighting",
      "Terrazzo flooring",
      "Reclaimed brick feature wall",
    ],
  },
  {
    slug: "wardrobe-joinery-malabe",
    title: "Bespoke Wardrobe Joinery",
    summary:
      "Custom built-in wardrobes and dresser units across three bedrooms in a private residence.",
    description: [
      "Bespoke joinery package for a private residence — built-in wardrobes and dresser units across three bedrooms, plus a built-in bookcase in the study.",
      "All joinery built in our workshop and installed on site over a 5-week period. Materials: solid teak frames with veneered panels, soft-close hardware throughout, integrated LED lighting.",
    ],
    category: "Interior",
    location: "Malabe",
    year: 2022,
    durationMonths: 1,
    area: null,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=2000&q=80",
      alt: "Custom built-in wardrobe in warm timber",
    },
    featured: false,
    gridSpan: 1,
    aspect: "tall",
    scope: [
      "Bespoke joinery design and build",
      "Workshop fabrication",
      "On-site installation across 3 rooms",
    ],
    materials: [
      "Solid teak frame construction",
      "Premium veneer panels",
      "Soft-close German hardware",
      "Integrated LED strip lighting",
    ],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity));
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
