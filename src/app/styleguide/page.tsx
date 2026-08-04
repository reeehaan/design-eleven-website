import { siteConfig } from "@/lib/site";

function Sheet({
  sheet,
  title,
  note,
  children,
}: {
  sheet: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-concrete py-16 md:py-24">
      <header className="mb-10 md:mb-14">
        <p className="font-meta text-meta uppercase text-zinc">
          {sheet} <span className="text-concrete">·</span> {title}
        </p>
        {note ? (
          <p className="mt-4 max-w-measure text-copy text-graphite">{note}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}

type Swatch = {
  name: string;
  varName: string;
  hex: string;
  role: string;
  ratio?: string;
  pass?: "AA" | "AA Large" | "Non-text only";
  className: string;
  border?: boolean;
};

const swatches: Swatch[] = [
  {
    name: "paper",
    varName: "--color-paper",
    hex: "#F0F0EC",
    role: "Page ground. Cool, not cream.",
    className: "bg-paper",
    border: true,
  },
  {
    name: "paper-sunk",
    varName: "--color-paper-sunk",
    hex: "#E4E5E0",
    role: "Image wells, inputs, sunk panels.",
    className: "bg-paper-sunk",
    border: true,
  },
  {
    name: "ink",
    varName: "--color-ink",
    hex: "#0E1417",
    role: "Primary text, deep sections.",
    ratio: "16.25:1",
    pass: "AA",
    className: "bg-ink",
  },
  {
    name: "graphite",
    varName: "--color-graphite",
    hex: "#3A423F",
    role: "Secondary text, body copy at length.",
    ratio: "9.05:1",
    pass: "AA",
    className: "bg-graphite",
  },
  {
    name: "zinc",
    varName: "--color-zinc",
    hex: "#656D6A",
    role: "Captions, metadata, the title-block voice.",
    ratio: "4.65:1",
    pass: "AA",
    className: "bg-zinc",
  },
  {
    name: "concrete",
    varName: "--color-concrete",
    hex: "#C9CBC4",
    role: "Dividers, inactive states, 3D material.",
    ratio: "1.43:1",
    pass: "Non-text only",
    className: "bg-concrete",
  },
  {
    name: "marking",
    varName: "--color-marking",
    hex: "#FF5A1F",
    role: "Fills, marks on ink, 3D. Never text on paper.",
    ratio: "2.73:1",
    pass: "Non-text only",
    className: "bg-marking",
  },
  {
    name: "marking-deep",
    varName: "--color-marking-deep",
    hex: "#BF4317",
    role: "Form errors and invalid state only.",
    ratio: "4.56:1",
    pass: "AA",
    className: "bg-marking-deep",
  },
  {
    name: "verdigris",
    varName: "--color-verdigris",
    hex: "#4E6B62",
    role: "Hover, links, focus rings on light grounds.",
    ratio: "5.10:1",
    pass: "AA",
    className: "bg-verdigris",
  },
  {
    name: "verdigris-light",
    varName: "--color-verdigris-light",
    hex: "#699084",
    role: "The same, against ink. 5.24:1 there.",
    ratio: "2.10:1",
    pass: "Non-text only",
    className: "bg-verdigris-light",
  },
];

function ColourRow({ s }: { s: Swatch }) {
  return (
    <li className="flex items-stretch gap-5 border-b border-concrete py-4">
      <div
        className={`h-16 w-16 shrink-0 ${s.className} ${
          s.border ? "border border-concrete" : ""
        }`}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p className="font-meta text-meta uppercase text-ink">{s.name}</p>
        <p className="text-fine text-graphite">{s.role}</p>
      </div>
      <div className="hidden shrink-0 flex-col justify-center gap-1 text-right sm:flex">
        <p className="font-meta text-meta-sm uppercase text-zinc">{s.hex}</p>
        {s.ratio ? (
          <p className="font-meta text-meta-sm uppercase text-zinc">
            {s.ratio}{" "}
            <span
              className={
                s.pass === "AA" ? "text-marking-deep" : "text-concrete"
              }
            >
              {s.pass}
            </span>
          </p>
        ) : (
          <p className="font-meta text-meta-sm uppercase text-concrete">
            ground
          </p>
        )}
      </div>
    </li>
  );
}

const typeSteps = [
  { cls: "text-d1 font-title font-medium", name: "d1", spec: "clamp(52–104px) · 0.92 · −0.04em", sample: "Anuradhapura" },
  { cls: "text-d2 font-title font-medium", name: "d2", spec: "clamp(40–68px) · 0.96 · −0.035em", sample: "Selected work" },
  { cls: "text-d3 font-title font-medium", name: "d3", spec: "clamp(32–48px) · 1.0 · −0.03em", sample: "How a job runs" },
  { cls: "text-d4 font-title font-medium", name: "d4", spec: "clamp(24–32px) · 1.1 · −0.02em", sample: "What is included" },
  { cls: "text-lead font-body", name: "lead", spec: "18px · 1.6 · −0.011em", sample: "Owner-led construction and interiors, run from Anuradhapura." },
  { cls: "text-copy font-body", name: "copy", spec: "16px · 1.65", sample: "We measure, price, and build. The estimate you sign is itemised line by line, so you can see what every rupee is buying before work starts." },
  { cls: "text-fine font-body", name: "fine", spec: "14px · 1.55", sample: "Captions, table cells, and secondary notes sit at this step." },
  { cls: "text-meta font-meta uppercase", name: "meta", spec: "12px · +0.04em · uppercase", sample: "PRJ-001 · ANURADHAPURA · 2024" },
  { cls: "text-meta-sm font-meta uppercase", name: "meta-sm", spec: "11px · +0.06em · uppercase", sample: "REVISION B · DRAWN BY IT" },
];

const titleBlockFields = [
  { k: "PROJECT NO.", v: "PRJ-001" },
  { k: "LOCATION", v: "ANURADHAPURA" },
  { k: "YEAR", v: "2024" },
  { k: "AREA", v: "280 SQ FT" },
  { k: "DURATION", v: "1 MONTH" },
];

function TitleBlock() {
  return (
    <dl className="grid grid-cols-2 border-l border-t border-concrete sm:grid-cols-3 lg:grid-cols-5">
      {titleBlockFields.map((f) => (
        <div key={f.k} className="border-b border-r border-concrete p-4">
          <dt className="font-meta text-meta-sm uppercase text-zinc">{f.k}</dt>
          <dd className="mt-2 font-meta text-meta uppercase text-ink">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

// Deliberately not `transition-colors`: in Tailwind v4 that list includes
// outline-color, which makes the focus ring fade in over 150ms. A focus
// indicator has to be instant, so only fill and label are transitioned.
const btnBase =
  "inline-flex items-center justify-center px-6 py-3 font-meta text-meta uppercase transition-[color,background-color] duration-150";

function Buttons() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-4">
        <button className={`${btnBase} bg-verdigris text-paper hover:bg-ink`}>
          See the work
        </button>
        <button className={`${btnBase} border border-ink text-ink hover:bg-ink hover:text-paper`}>
          Request an estimate
        </button>
        <button className={`${btnBase} text-verdigris underline decoration-1 underline-offset-4 hover:text-ink`}>
          Read the case study
        </button>
        <button disabled className={`${btnBase} cursor-not-allowed bg-paper-sunk text-concrete`}>
          Unavailable
        </button>
      </div>
      <p className="max-w-measure text-fine text-zinc">
        Tab through these — the focus ring is <code className="font-meta text-meta-sm">marking-deep</code>,
        not <code className="font-meta text-meta-sm">marking</code>. Primary is ink-on-orange at 5.95:1,
        which keeps the true hi-vis accent and still passes AA.
      </p>
    </div>
  );
}

function ProjectCard() {
  return (
    <article className="group max-w-md">
      <div className="relative aspect-4/3 overflow-hidden bg-paper-sunk">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-meta text-meta-sm uppercase text-concrete">
            Project image
          </span>
        </div>
        {/* Live-state marker: the accent earns its place only on in-progress work. */}
        <span className="absolute left-0 top-0 bg-verdigris px-3 py-1.5 font-meta text-meta-sm uppercase text-ink">
          In progress
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-d4 font-title font-medium text-ink">
          Living Room Refresh
        </h3>
        <p className="mt-2 max-w-measure text-copy text-graphite">
          A warm interior refresh — dusty blue, teak shelving, track lighting —
          without touching the original layout.
        </p>
        {/* The mono strip the brief asks every card to carry. */}
        <p className="mt-4 border-t border-concrete pt-3 font-meta text-meta-sm uppercase text-zinc">
          PRJ-001 · ANURADHAPURA · 2024 · 280 SQ FT · 1 MONTH
        </p>
      </div>
      <div className="mt-3 h-px w-0 bg-verdigris transition-all duration-300 group-hover:w-full" />
    </article>
  );
}

const fieldBase =
  "w-full border bg-paper px-4 py-3 text-copy text-ink placeholder:text-zinc";

function Forms() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <label htmlFor="f-default" className="font-meta text-meta uppercase text-zinc">
          Name
        </label>
        <input
          id="f-default"
          className={`${fieldBase} mt-2 border-concrete`}
          placeholder="Your name"
        />
        <p className="mt-2 text-fine text-zinc">Default · click to see focus</p>
      </div>

      <div>
        <label htmlFor="f-filled" className="font-meta text-meta uppercase text-zinc">
          Location
        </label>
        <input
          id="f-filled"
          className={`${fieldBase} mt-2 border-graphite`}
          defaultValue="Anuradhapura"
        />
        <p className="mt-2 text-fine text-zinc">Filled</p>
      </div>

      <div>
        <label htmlFor="f-error" className="font-meta text-meta uppercase text-zinc">
          Phone
        </label>
        <input
          id="f-error"
          aria-invalid="true"
          aria-describedby="f-error-msg"
          className={`${fieldBase} mt-2 border-marking-deep`}
          defaultValue="0771"
        />
        {/* Inline, not a toast — and the message carries the meaning, not the colour. */}
        <p id="f-error-msg" className="mt-2 text-fine text-marking-deep">
          That number is too short — we need all 10 digits to call you back.
        </p>
      </div>

      <div>
        <label htmlFor="f-disabled" className="font-meta text-meta uppercase text-concrete">
          Upload plans
        </label>
        <input
          id="f-disabled"
          disabled
          className={`${fieldBase} mt-2 cursor-not-allowed border-concrete bg-paper-sunk text-concrete`}
          placeholder="Available after step 2"
        />
        <p className="mt-2 text-fine text-zinc">Disabled</p>
      </div>

      <div className="md:col-span-2">
        <div className="border-l-2 border-verdigris bg-paper-sunk p-5">
          <p className="font-meta text-meta uppercase text-ink">Enquiry received</p>
          <p className="mt-3 max-w-measure text-copy text-graphite">
            Isuru will call you on{" "}
            <span className="text-ink">{siteConfig.contact.phoneDisplay}</span>{" "}
            within two working days. If it is urgent, WhatsApp is faster than
            email.
          </p>
        </div>
        <p className="mt-2 text-fine text-zinc">
          Success state — says what happens next and by when, per the brief.
        </p>
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <div className="mx-auto w-full max-w-360 px-6 md:px-10 lg:px-16">
        {/* Sheet header — the title block used as the page's own masthead */}
        <header className="py-16 md:py-24">
          <p className="font-meta text-meta uppercase text-zinc">
            A-00 <span className="text-concrete">·</span> Design system
          </p>
          <h1 className="mt-8 text-d1 font-title font-medium">
            Survey
          </h1>
          <p className="mt-8 max-w-measure text-lead text-graphite">
            The token set, type scale and component states for{" "}
            {siteConfig.name}. Cool ground, drafted display type, and a hi-vis
            accent that only appears on things you can interact with or that are
            currently happening.
          </p>
          <div className="mt-12">
            <TitleBlock />
          </div>
        </header>

        <Sheet
          sheet="A-01"
          title="Colour"
          note="Eight tokens. Ratios are measured against paper (#F0F0EC) and shown for every colour used as text. The two accent stops exist for contrast reasons, not decorative ones."
        >
          <ul>
            {swatches.map((s) => (
              <ColourRow key={s.name} s={s} />
            ))}
          </ul>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="bg-ink p-8">
              <p className="font-meta text-meta uppercase text-marking">
                Marking on ink · 5.95:1
              </p>
              <p className="mt-4 max-w-measure text-copy text-concrete">
                On deep sections the full hi-vis orange is safe for text and
                reads exactly as intended — survey paint on a wet slab.
              </p>
            </div>
            <div className="border border-concrete p-8">
              <p className="font-meta text-meta uppercase text-marking-deep">
                Marking-deep on paper · 4.56:1
              </p>
              <p className="mt-4 max-w-measure text-copy text-graphite">
                On paper the accent darkens. Same hue family, same intent, but
                it passes as text and as a focus indicator.
              </p>
            </div>
          </div>
        </Sheet>

        <Sheet
          sheet="A-02"
          title="Typeface pairing"
          note="Cabinet Grotesk for display, Switzer for body, Geist Mono for the title block. All three self-hosted — the site makes no font CDN request."
        >
          <div className="border border-concrete p-8 md:p-14">
            <p className="font-meta text-meta uppercase text-zinc">
              PRJ-001 · ANURADHAPURA · 2024
            </p>
            <p className="mt-8 text-d2 font-title font-medium">
              We measure it, price it, and build it.
            </p>
            <p className="mt-8 max-w-measure text-lead text-graphite">
              Design Eleven is run by a qualified quantity surveyor. That means
              the estimate you sign is itemised line by line — you can see what
              every rupee buys before anyone breaks ground, and the number at
              the end is the number you agreed.
            </p>
            <p className="mt-6 font-meta text-meta-sm uppercase text-zinc">
              [DRAFT COPY] · specimen only
            </p>
          </div>
        </Sheet>

        <Sheet
          sheet="A-03"
          title="Type scale"
          note="Nine named steps. Display tracking tightens from −0.02em to −0.04em as size grows; mono opens to +0.04em and sets uppercase."
        >
          <ul className="space-y-10">
            {typeSteps.map((t) => (
              <li
                key={t.name}
                className="border-b border-concrete pb-10 last:border-0"
              >
                <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-meta text-meta uppercase text-marking-deep">
                    {t.name}
                  </span>
                  <span className="font-meta text-meta-sm uppercase text-zinc">
                    {t.spec}
                  </span>
                </div>
                <p className={`${t.cls} ${t.name.startsWith("meta") ? "text-zinc" : "text-ink"} max-w-measure`}>
                  {t.sample}
                </p>
              </li>
            ))}
          </ul>
        </Sheet>

        <Sheet
          sheet="A-04"
          title="Buttons"
          note="Three levels and a disabled state. Every interactive surface uses the accent; nothing decorative does."
        >
          <Buttons />
        </Sheet>

        <Sheet
          sheet="A-05"
          title="Project card"
          note="One image, name, and the mono metadata strip. The accent rule draws from the left on hover; the orange flag appears only on work that is genuinely in progress."
        >
          <ProjectCard />
        </Sheet>

        <Sheet
          sheet="A-06"
          title="Form states"
          note="Inline validation, no toasts. Error text carries the meaning in words so colour is never the only signal."
        >
          <Forms />
        </Sheet>

        <Sheet
          sheet="A-07"
          title="Accent budget"
          note="The rule is max 2% of any screen. Everything below is the complete list of places the accent is allowed to appear."
        >
          <ul className="max-w-measure space-y-3 text-copy text-graphite">
            {[
              "Hover on any link, nav item or card (verdigris)",
              "Focus ring, on every focusable element (verdigris)",
              "Primary button fill and its pointer wipe (verdigris)",
              "Active filter on the projects index (verdigris)",
              "The “in progress” project flag (verdigris)",
              "Current step in the process (verdigris-light on ink)",
              "Form error text and border — the only orange left (marking-deep)",
            ].map((item) => (
              <li key={item} className="flex gap-4 border-b border-concrete pb-3">
                <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-verdigris" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-measure text-fine text-zinc">
            No gradients. No accent on decorative rules, section dividers, or
            large fills. If a screen needs more orange than this, the screen is
            wrong.
          </p>
        </Sheet>

        {/* Footer as a full title block — the motif, not a link farm */}
        <footer className="border-t border-concrete py-12">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {[
              { k: "SHEET", v: "A-00 — A-07" },
              { k: "REVISION", v: "A" },
              { k: "STATUS", v: "FOR REVIEW" },
              { k: "DRAWN BY", v: "PHASE 1" },
            ].map((f) => (
              <div key={f.k}>
                <dt className="font-meta text-meta-sm uppercase text-zinc">{f.k}</dt>
                <dd className="mt-2 font-meta text-meta uppercase text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </footer>
      </div>
    </div>
  );
}
