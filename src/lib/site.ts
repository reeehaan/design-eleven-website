export const siteConfig = {
  name: "Design Eleven",
  shortName: "Design",
  wordmarkSuffix: "ELEVEN",
  owner: "Design Eleven Studio",
  established: 2020,
  tagline: "Architecture & construction, crafted with intent.",
  description:
    "Design Eleven is a Sri Lankan architecture and construction studio specialising in residential builds, commercial spaces, and interior finishing. Owner-led, detail-obsessed, and built on craft.",
  url: "https://designeleven.lk",
  locale: "en-LK",

  contact: {
    phone: "+94 77 000 0000",
    phoneDisplay: "+94 77 000 0000",
    whatsapp: "+94770000000",
    email: "hello@designeleven.lk",
    address: {
      street: "TBD",
      city: "Colombo",
      country: "Sri Lanka",
    },
    hours: "Mon–Sat · 8:00–17:30",
  },

  social: {
    facebook: "",
    instagram: "",
  },

  nav: [
    { label: "Work", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
