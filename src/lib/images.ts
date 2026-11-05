export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const heroImages = {
  // PLACEHOLDER (Unsplash): a modern tropical home. Swap for the studio's own
  // photograph when it exists.
  home: {
    src: "https://images.unsplash.com/photo-1766603636671-484c4911a84b?auto=format&fit=crop&w=2400&q=80",
    alt: "A modern two-storey home with timber and stone, palms and a lawn",
    width: 2400,
    height: 1350,
  },

} satisfies Record<string, SiteImage>;

/**
 * PLACEHOLDERS: Unsplash stand-ins for the home band and the about page's
 * hero and portrait. Swap each for the studio's own photograph when it exists.
 */
export const homeImages = {
  approach: {
    src: "https://images.unsplash.com/photo-1760067537540-cc36c1700d7e?auto=format&fit=crop&w=1600&q=80",
    alt: "A modern kitchen with an island and a view into the garden",
    width: 1600,
    height: 1200,
  },
} satisfies Record<string, SiteImage>;

export const aboutImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1773382434184-49a6709a44a1?auto=format&fit=crop&w=2000&q=80",
    alt: "A worker crouching on a house site beside freshly laid brick walls",
    width: 2000,
    height: 1333,
  },
  owner: {
    src: "https://images.unsplash.com/photo-1778074762022-c33cc42f79ae?auto=format&fit=crop&w=1200&q=80",
    alt: "Two site staff reviewing plans on a tablet",
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
  hero: SiteImage;
  owner: SiteImage;
  bts: SiteImage[];
};
