export type ProjectCategory = "Residential" | "Commercial" | "Interior";

export type ProjectImage = {
  src: string;
  alt: string;
};

export type BeforeAfter = {
  before: ProjectImage;
  after: ProjectImage;
};

/** Filterable by scope, which is a different axis from `category`. */
export type ProjectScopeType = "New build" | "Renovation" | "Interior fit-out";

/** Drives the accent "in progress" flag — the only live state on a card. */
export type ProjectStatus = "complete" | "in-progress";

/** One dated step of the case-study timeline. */
export type ProjectPhase = {
  date: string; // "2024-03" — rendered as MAR 2024 in the title-block voice
  title: string;
  note: string;
  image?: ProjectImage;
};

export type Project = {
  slug: string;
  /** Title-block project number, e.g. "PRJ-001". Unique, never reused. */
  projectNo: string;
  title: string;
  summary: string;
  description: string[];
  category: ProjectCategory;
  scopeType: ProjectScopeType;
  status: ProjectStatus;
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

  /** The client's actual problem, in two sentences. */
  brief?: string;
  /** What made the job hard, and how it was solved — the conversion section. */
  constraint?: { problem: string; solution: string };
  /** Stated range, e.g. "LKR 4–6M". Carries more trust than another photo. */
  budgetRange?: string;
  teamSize?: number;
  /** Pinned horizontal timeline. 4–6 entries. */
  phases?: ProjectPhase[];

  /**
   * Layout placeholder, not real work. Draft projects render in development so
   * the grid, filters and case-study template can be designed against a full
   * set, but they are excluded from the public index, sitemap and structured
   * data. Nothing marked `draft` may ever be presented as the studio's work.
   */
  draft?: boolean;
};

/**
 * Deliberately not exported. Every consumer goes through the query helpers
 * below so the draft filter cannot be bypassed — that bypass already shipped
 * draft projects into one production build.
 */
const projects: Project[] = [
  {
    slug: "living-room-refresh-anuradhapura",
    projectNo: "PRJ-001",
    title: "Living Room Refresh",
    summary:
      "A warm interior refresh blending dusty blue tones, custom wood detailing, and modern track lighting — without changing the original layout.",
    description: [
      "An interior refresh of a residential living room that preserved the home's original character while introducing a calmer, more contemporary feel. The existing arched doorway and traditional timber window were retained as focal points, anchoring the new palette.",
      "A muted dusty blue accent wall was paired with crisp white surroundings to define the space without overwhelming it. Custom teak shelving and a curated gallery wall featuring traditional Sri Lankan masks add warmth and personal character.",
      "Modern black track lighting replaced the existing fixtures to highlight key features and give the room a contemporary edge. New skirting and floor finishes complete the refresh.",
    ],
    category: "Interior",
    scopeType: "Interior fit-out",
    status: "complete",
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

  // Everything below is placeholder scaffolding with stock imagery. Do not
  // clear `draft` until the entry describes real work with real photographs.
  {
    slug: "draft-courtyard-house",
    projectNo: "PRJ-002",
    title: "Courtyard House",
    summary:
      "A three-bedroom home planned around a central courtyard for cross-ventilation and daylight.",
    description: [
      "[DRAFT] Placeholder record used to design the projects index and case-study template. Replace wholesale with a real project.",
    ],
    category: "Residential",
    scopeType: "New build",
    status: "complete",
    location: "Anuradhapura",
    year: 2025,
    durationMonths: 11,
    area: 3100,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      alt: "[DRAFT] Placeholder — courtyard house exterior",
    },
    featured: true,
    featuredOrder: 1,
    gridSpan: 2,
    aspect: "standard",
    budgetRange: "LKR 28–34M",
    teamSize: 9,
    draft: true,
  },
  {
    slug: "draft-office-fitout",
    projectNo: "PRJ-003",
    title: "Office Fit-out",
    summary:
      "A 6,000 sq ft commercial floor fitted out around the client's working hours.",
    description: [
      "[DRAFT] Placeholder record used to design the projects index and case-study template. Replace wholesale with a real project.",
    ],
    category: "Commercial",
    scopeType: "Interior fit-out",
    status: "in-progress",
    location: "Kandy",
    year: 2025,
    durationMonths: 4,
    area: 6000,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      alt: "[DRAFT] Placeholder — open-plan office interior",
    },
    featured: true,
    featuredOrder: 2,
    gridSpan: 1,
    aspect: "tall",
    budgetRange: "LKR 12–15M",
    teamSize: 6,
    draft: true,
  },
  {
    slug: "draft-kitchen-renovation",
    projectNo: "PRJ-004",
    title: "Kitchen & Living Renovation",
    summary:
      "Structural opening-up of a closed ground floor, plus a full kitchen rebuild.",
    description: [
      "[DRAFT] Placeholder record used to design the projects index and case-study template. Replace wholesale with a real project.",
    ],
    category: "Residential",
    scopeType: "Renovation",
    status: "complete",
    location: "Kurunegala",
    year: 2024,
    durationMonths: 3,
    area: 900,
    areaUnit: "sqft",
    cover: {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
      alt: "[DRAFT] Placeholder — renovated kitchen interior",
    },
    featured: true,
    featuredOrder: 4,
    gridSpan: 1,
    aspect: "standard",
    budgetRange: "LKR 5–7M",
    teamSize: 4,
    draft: true,
  },
];

/**
 * Draft projects exist so the index, filters and case-study template can be
 * designed against a realistic set before the client's real work arrives.
 * They are visible in development only — never in a production build, and
 * never in the sitemap or structured data.
 */
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

function visible(p: Project): boolean {
  return SHOW_DRAFTS || !p.draft;
}

/** Every project including drafts. Use only for dev tooling, never for output. */
export function getAllProjectsIncludingDrafts(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured && visible(p))
    .sort(
      (a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity),
    );
}

export function getAllProjects(): Project[] {
  return projects.filter(visible).sort((a, b) => b.year - a.year);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && visible(p));
}

export function getCategories(): ProjectCategory[] {
  const order: ProjectCategory[] = ["Residential", "Commercial", "Interior"];
  const present = new Set(getAllProjects().map((p) => p.category));
  return order.filter((c) => present.has(c));
}

export function getScopeTypes(): ProjectScopeType[] {
  const order: ProjectScopeType[] = [
    "New build",
    "Renovation",
    "Interior fit-out",
  ];
  const present = new Set(getAllProjects().map((p) => p.scopeType));
  return order.filter((s) => present.has(s));
}

export function getYears(): number[] {
  return Array.from(new Set(getAllProjects().map((p) => p.year))).sort(
    (a, b) => b - a,
  );
}

export function getLocations(): string[] {
  return Array.from(new Set(getAllProjects().map((p) => p.location))).sort();
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
