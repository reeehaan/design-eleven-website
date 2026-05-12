export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const heroImages = {
  home: {
    src: "https://res.cloudinary.com/db0svseve/image/upload/v1778582054/hero-image_v7auf5.jpg",
    alt: "A finished residential home — warm light, clean lines",
    width: 1200,
    height: 1600,
  },
} satisfies Record<string, SiteImage>;

export const aboutImages = {
  owner: {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
    alt: "Design Eleven studio founder on a job site",
    width: 1200,
    height: 1500,
  },
  bts: [
    {
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
      alt: "Construction site work in progress",
      width: 1000,
      height: 1250,
    },
    {
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=80",
      alt: "Concrete and structural work",
      width: 1000,
      height: 1250,
    },
    {
      src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
      alt: "Building materials and tools on site",
      width: 1000,
      height: 1250,
    },
  ],
} satisfies {
  owner: SiteImage;
  bts: SiteImage[];
};
