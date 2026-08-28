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
  // Generated and served locally, same reasoning as the services photos in
  // services.ts: no remote pattern to whitelist, no third-party CDN a
  // production site depends on. Replace with real site photography the day
  // it exists — this is decoration standing in for evidence, same as there.
  bts: [
    {
      src: "/about-us/unfinished-brick-building.avif",
      alt: "A mid-build residential site — brick masonry walls partway up, exposed rebar stubs, scaffold poles against the wall, overcast light",
      width: 1200,
      height: 1800,
    },
    {
      src: "/about-us/concrete-and-structural-work.avif",
      alt: "A reinforced concrete column-and-beam junction, timber formwork still strapped to one face, a rebar cage exposed at the top waiting for the next pour",
      width: 1200,
      height: 1800,
    },
    {
      src: "/about-us/building-materials-and-tools-on-site.avif",
      alt: "A spirit level on a half-built block wall, trowel and pointing tools on an upturned bucket, stacked cement blocks and rebar offcuts nearby",
      width: 1200,
      height: 1800,
    },
  ],
} satisfies {
  owner: SiteImage;
  bts: SiteImage[];
};
