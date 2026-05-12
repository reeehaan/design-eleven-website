import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type Credential = {
  label: string;
  number: string;
  authority: string;
};

const credentials: Credential[] = [
  {
    label: "Building Contractor Registration",
    number: "ICTAD/CIDA — TBD",
    authority: "Construction Industry Development Authority, Sri Lanka",
  },
  {
    label: "Business Registration",
    number: "BR — TBD",
    authority: "Department of Registrar of Companies, Sri Lanka",
  },
  {
    label: "Public Liability Insurance",
    number: "Active policy — TBD",
    authority: "TBD insurer",
  },
];

export function Credentials() {
  return (
    <section
      aria-labelledby="credentials-heading"
      className="bg-surface-dark py-section text-bg-primary md:py-section-lg"
    >
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-bg-primary/60">
            04 / Credentials
          </span>

          <h2
            id="credentials-heading"
            className="mt-6 font-display text-display-lg text-bg-primary"
          >
            Licensed,{" "}
            <span className="italic text-accent">insured</span>, on file.
          </h2>

          <p className="mt-6 max-w-md text-body-lg text-bg-primary/70">
            All registrations and policies are current and verifiable. Happy to
            share copies on request.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 md:mt-20">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {credentials.map((cred, i) => (
              <li
                key={cred.label}
                className="grid gap-2 py-8 md:grid-cols-12 md:items-baseline md:gap-x-10"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-xs text-bg-primary/40 md:col-span-1"
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div className="md:col-span-5">
                  <h3 className="font-display text-xl text-bg-primary md:text-2xl">
                    {cred.label}
                  </h3>
                </div>
                <div className="md:col-span-3">
                  <span className="font-mono text-sm text-bg-primary/80">
                    {cred.number}
                  </span>
                </div>
                <div className="md:col-span-3">
                  <span className="text-sm text-bg-primary/60">
                    {cred.authority}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
