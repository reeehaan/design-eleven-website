/**
 * Engagement types and the build process.
 *
 * [DRAFT COPY] throughout — written in the studio's voice for review, not
 * dictated by the client. Durations and change-costs in particular must be
 * confirmed by Isuru before this page goes public; publishing a timeline he
 * cannot hold is worse than publishing none.
 *
 * NOTE ON SCOPE: `services.ts` lists seven trades (steel fabrication,
 * plumbing, titanium work…). Those are capabilities. These four are what a
 * client actually hires the studio *for*. Both are true; they answer
 * different questions, so they live in different places.
 */

export type Engagement = {
  slug: string;
  /**
   * E-series, not S-. The services page numbers its own sections S-00 to
   * S-03, so engagement cards labelled S-01 to S-04 sat inside a section
   * called S-01 and directly above a different section called S-02. In a
   * system that leans this hard on drawing references, that collision reads
   * as a mistake.
   */
  ref: string;
  title: string;
  whatItIs: string;
  whoItsFor: string;
  typicalRange: string;
  typicalDuration: string;
  /** Pre-fills the contact form via ?service= */
  contactParam: string;
};

export const engagements: Engagement[] = [
  {
    slug: "new-build",
    ref: "E-01",
    title: "New build",
    whatItIs:
      "Ground-up construction from foundations to handover — we price it, programme it, and run the site ourselves.",
    whoItsFor:
      "You own a plot, or you're about to, and you want one firm accountable from excavation to the final coat.",
    typicalRange: "LKR 18M – 45M",
    typicalDuration: "9–16 months",
    contactParam: "residential-builds",
  },
  {
    slug: "renovation",
    ref: "E-02",
    title: "Renovation & extension",
    whatItIs:
      "Structural alteration to a building already standing — opening up, extending, re-roofing, or repairing what has failed.",
    whoItsFor:
      "You like where you live and want it to work properly, rather than move.",
    typicalRange: "LKR 4M – 18M",
    typicalDuration: "3–8 months",
    contactParam: "renovation",
  },
  {
    slug: "interior-fit-out",
    ref: "E-03",
    title: "Interior fit-out",
    whatItIs:
      "Everything inside the shell — partitions, ceilings, joinery, electrical, lighting and finishes, coordinated as one package.",
    whoItsFor:
      "You have a space that is structurally sound and completely unfinished, or badly finished.",
    typicalRange: "LKR 1.5M – 12M",
    typicalDuration: "1–5 months",
    contactParam: "interior-finishing",
  },
  {
    slug: "costing-only",
    ref: "E-04",
    title: "Costing & QS only",
    whatItIs:
      "Measurement, bills of quantities and an independent price check on someone else's estimate. No construction attached.",
    whoItsFor:
      "You have a quote from another contractor and want to know whether it is honest before you sign it.",
    typicalRange: "LKR 45K – 250K",
    typicalDuration: "1–3 weeks",
    contactParam: "costing",
  },
];

export type Stage = {
  ref: string;
  n: string;
  title: string;
  does: string;
  decides: string;
  /** The trust content. Nobody else publishes this. */
  changeCost: string;
  duration: string;
};

/** Genuinely sequential — this is the one place numbering carries information. */
export const stages: Stage[] = [
  {
    ref: "A-201",
    n: "01",
    title: "First call and site visit",
    does: "We come to the property, listen to what you want, and look at what the site will actually allow — access, ground conditions, existing services, boundaries, and what the neighbours will tolerate.",
    decides:
      "Whether the scope we describe back to you is the job you actually want.",
    changeCost: "Nothing. Change your mind freely — no fee, no obligation.",
    duration: "1 day",
  },
  {
    ref: "A-202",
    n: "02",
    title: "Itemised estimate",
    does: "Every element measured and priced line by line — materials, labour, plant, preliminaries, and a stated contingency. Priced by a quantity surveyor, not estimated by eye.",
    decides:
      "What stays in, what comes out, and what gets deferred to a later phase.",
    changeCost:
      "Nothing. This is the stage to move things around — it costs only our time.",
    duration: "5–10 days",
  },
  {
    ref: "A-203",
    n: "03",
    title: "Contract and programme",
    does: "A written contract with the agreed sum, a payment schedule tied to milestones, and a programme showing what happens in which week.",
    decides:
      "Start date, payment milestones, and who your single point of contact is.",
    changeCost:
      "Still low. Revisions before mobilisation cost drawing time only.",
    duration: "3–7 days",
  },
  {
    ref: "A-204",
    n: "04",
    title: "Build",
    does: "We mobilise and start on the agreed date. Weekly photographs and a written update. Any variation is priced in writing and approved by you before the work happens — never after.",
    decides:
      "Finishes and fittings, at the points we flag in advance so nothing holds up the programme.",
    changeCost:
      "This is where changes get expensive. Moving a wall after blockwork means demolition, rework and lost days — typically 2–5× what the same decision cost at stage 02.",
    duration: "Per programme",
  },
  {
    ref: "A-205",
    n: "05",
    title: "Finishes and snagging",
    does: "Second fix, finishes, and our own snag list before you ever see one — we find the defects first, then fix them, then invite you to find more.",
    decides:
      "Final paint, hardware and fixture selections, if still open.",
    changeCost:
      "High for anything structural. Low for decoration, which is why we hold those decisions until here.",
    duration: "Final 3–4 weeks",
  },
  {
    ref: "A-206",
    n: "06",
    title: "Handover and defects period",
    does: "Walk-through, joint snag list, and every document handed over — approvals, warranties, as-built notes and appliance manuals. We return to close out defects during the liability period.",
    decides: "Sign-off, once the snag list is genuinely clear.",
    changeCost:
      "New work is priced as a new job. Defects in our workmanship are corrected free.",
    duration: "12-month defects liability",
  },
];

export type InclusionRow = {
  item: string;
  included: string;
  notIncluded: string;
};

/** Plain and honest. The exclusions column is the reason to publish this. */
export const inclusions: InclusionRow[] = [
  {
    item: "Design & drawings",
    included: "Construction drawings, setting-out, and coordination with your architect",
    notIncluded: "Architectural concept design and council submission drawings",
  },
  {
    item: "Approvals",
    included: "Preparing and compiling the submission pack",
    notIncluded: "Local authority fees and any statutory charges — paid at cost",
  },
  {
    item: "Structure",
    included: "Foundations, superstructure, roof, blockwork and plaster",
    notIncluded: "Piling or ground remediation where the soil report demands it",
  },
  {
    item: "Services",
    included: "Electrical, plumbing and drainage first and second fix",
    notIncluded: "Utility connection charges and meter deposits",
  },
  {
    item: "Finishes",
    included: "Floor, wall and ceiling finishes to the agreed specification",
    notIncluded: "Loose furniture, curtains, artwork and appliances",
  },
  {
    item: "Site",
    included: "Site setup, safety, waste removal and final clean",
    notIncluded: "Landscaping and boundary walls, unless separately quoted",
  },
  {
    item: "Contingency",
    included: "A stated contingency line you can see, not one hidden in rates",
    notIncluded: "Cost of variations you instruct after the contract is signed",
  },
];
