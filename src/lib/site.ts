export const siteConfig = {
  name: "Design Eleven",
  shortName: "Design",
  wordmarkSuffix: "ELEVEN",
  owner: "Isuru Thilakarathne",
  ownerCredentials: "NCT (Civil Eng), City & Guilds IVQ5 (Civil Eng/QS)",
  ownerTitle: "Quantity Surveyor / Proprietor",
  businessRegNo: "NCP/EDS/005894",
  established: 2020,
  tagline: "Achieve Your Dream",
  description:
    "Design Eleven is a Sri Lankan architecture and construction studio specialising in designing, costing, and construction. Owner-led by a qualified Quantity Surveyor, detail-obsessed, and built on craft.",
  services: ["Designing", "Costing", "Constructions"],
  url: "https://www.designelevenstudio.com",
  locale: "en-LK",

  contact: {
    phone: "+94 71 789 3766",
    phoneDisplay: "071 789 3766",
    phoneSecondary: "+94 71 989 3766",
    phoneSecondaryDisplay: "071 989 3766",
    whatsapp: "+94717893766",
    email: "d.eleven11studio@gmail.com",
    address: {
      street: "No: 3109, Stage 3",
      city: "Anuradhapura",
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
