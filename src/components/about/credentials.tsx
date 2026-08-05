import { Eyebrow } from "@/components/motion/eyebrow";
import { RevealLines } from "@/components/motion/reveal-lines";
import { RevealItems } from "@/components/motion/reveal-items";
import { siteConfig } from "@/lib/site";

type Credential = {
  label: string;
  number: string;
  authority: string;
  /**
   * False until the real number is on file. Unverified entries render as
   * pending rather than as a credential — a row reading "Active policy — TBD"
   * under a heading that says "Licensed, insured, on file" is a claim the
   * studio cannot currently back, and the footer already dropped the same
   * unevidenced line from the stats strip.
   */
  onFile: boolean;
};

const credentials: Credential[] = [
  {
    label: "Business Registration",
    number: siteConfig.businessRegNo,
    authority: "Department of Registrar of Companies, Sri Lanka",
    onFile: true,
  },
  {
    label: "Building Contractor Registration",
    number: "ICTAD / CIDA",
    authority: "Construction Industry Development Authority, Sri Lanka",
    onFile: false,
  },
  {
    label: "Public Liability Insurance",
    number: "Policy number",
    authority: "Insurer to be confirmed",
    onFile: false,
  },
];

export function Credentials() {
  const filed = credentials.filter((c) => c.onFile).length;

  return (
    <section
      aria-labelledby="credentials-heading"
      className="border-t border-graphite bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-360 px-6 py-20 md:px-10 md:py-24 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow onDark>B-05 &middot; Credentials</Eyebrow>
            <RevealLines
              as="h2"
              id="credentials-heading"
              className="mt-8 max-w-[16ch] font-title text-d2 font-medium text-paper"
            >
              Registered, <span className="text-concrete">and on file.</span>
            </RevealLines>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-measure text-lead text-concrete">
              {filed} of {credentials.length} are current and verifiable today —
              copies on request. The rest are listed as pending rather than
              claimed, and go live the day the number lands.
            </p>
          </div>
        </div>

        <RevealItems
          as="ul"
          className="mt-14 border-t border-graphite md:mt-16"
          selector=":scope > li"
        >
          {credentials.map((cred, i) => (
            <li
              key={cred.label}
              className="grid gap-x-10 gap-y-2 border-b border-graphite py-7 md:grid-cols-12 md:items-baseline"
            >
              <span
                aria-hidden="true"
                className="font-meta text-meta-sm uppercase text-zinc md:col-span-1"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="font-title text-d4 font-medium text-paper md:col-span-5">
                {cred.label}
              </h3>

              <span className="font-meta text-meta uppercase text-concrete md:col-span-3">
                {cred.number}
              </span>

              <div className="md:col-span-3 md:text-right">
                <span
                  className={
                    cred.onFile
                      ? "font-meta text-meta-sm uppercase text-verdigris-light"
                      : "font-meta text-meta-sm uppercase text-zinc"
                  }
                >
                  {cred.onFile ? "On file" : "Pending"}
                </span>
                <p className="mt-1.5 text-fine text-zinc">{cred.authority}</p>
              </div>
            </li>
          ))}
        </RevealItems>
      </div>
    </section>
  );
}
