import Link from "next/link";
import { siteConfig } from "@/lib/site";

/**
 * The footer is the site's full title block, not a link farm — one CTA line,
 * a single row of drawing-sheet fields, and a thin legal bar.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-360 px-6 md:px-10 lg:px-16">
        {/* No CTA here. Every page that reaches this footer has already made
            the ask directly above it, and two conversion blocks stacked read
            as one long dark slab rather than as urgency. */}

        {/* Title block — four fields, one row */}
        <div className="grid grid-cols-2 border-t border-graphite md:grid-cols-4">
          <div className="border-b border-graphite py-6 pr-5 md:border-b-0">
            <p className="font-meta text-meta-sm uppercase text-zinc">Direct</p>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="mt-3 block font-meta text-meta uppercase text-paper transition-colors hover:text-verdigris-light"
            >
              {contact.phoneDisplay}
            </a>
            {/* <wbr> after the @ so a narrow column breaks the address at its
                natural seam rather than mid-word. */}
            <a
              href={`mailto:${contact.email}`}
              className="mt-1 block font-meta text-meta-sm text-concrete transition-colors hover:text-verdigris-light"
            >
              {contact.email.split("@")[0]}@<wbr />
              {contact.email.split("@")[1]}
            </a>
          </div>

          <div className="border-b border-l border-graphite py-6 pl-5 pr-5 md:border-b-0">
            <p className="font-meta text-meta-sm uppercase text-zinc">Studio</p>
            <p className="mt-3 font-meta text-meta uppercase text-paper">
              {contact.address.city}
            </p>
            <p className="mt-1 font-meta text-meta-sm uppercase text-concrete">
              {contact.hours}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="border-graphite py-6 pr-5 md:border-l md:pl-5"
          >
            <p className="font-meta text-meta-sm uppercase text-zinc">Sitemap</p>
            <ul className="mt-3 flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-meta text-meta uppercase text-concrete transition-colors hover:text-verdigris-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-l border-graphite py-6 pl-5">
            <p className="font-meta text-meta-sm uppercase text-zinc">
              Drawn by
            </p>
            <p className="mt-3 font-meta text-meta uppercase text-paper">
              {siteConfig.owner}
            </p>
            <p className="mt-1 font-meta text-meta-sm uppercase text-concrete">
              Est. {siteConfig.established}
            </p>
            <p className="mt-1 font-meta text-meta-sm uppercase text-concrete">
              {siteConfig.businessRegNo}
            </p>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-2 border-t border-graphite py-5 font-meta text-meta-sm uppercase text-zinc sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p>{siteConfig.ownerCredentials}</p>
        </div>
      </div>
    </footer>
  );
}
