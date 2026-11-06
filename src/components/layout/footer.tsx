import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { FooterWordmark } from "./footer-wordmark";

/**
 * The footer is the site's full title block, not a link farm — one CTA line,
 * a single row of drawing-sheet fields, and a thin legal bar.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="bg-paper text-ink">
      <div className="w-full px-3">
        {/* No CTA here. Every page that reaches this footer has already made
            the ask directly above it, and two conversion blocks stacked read
            as one long dark slab rather than as urgency. */}

        {/* Title block — four fields, one row */}
        <div className="grid grid-cols-2 border-t border-concrete md:grid-cols-4">
          <div className="border-b border-concrete py-6 pr-5 md:border-b-0">
            <p className="font-meta text-meta-sm text-zinc">Direct</p>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="mt-1 block py-2 font-meta text-meta text-ink transition-colors hover:text-verdigris"
            >
              {contact.phoneDisplay}
            </a>
            {/* <wbr> after the @ so a narrow column breaks the address at its
                natural seam rather than mid-word. */}
            <a
              href={`mailto:${contact.email}`}
              className="block py-2 font-meta text-meta-sm text-graphite transition-colors hover:text-verdigris"
            >
              {contact.email.split("@")[0]}@<wbr />
              {contact.email.split("@")[1]}
            </a>
          </div>

          <div className="border-b border-l border-concrete py-6 pl-5 pr-5 md:border-b-0">
            <p className="font-meta text-meta-sm text-zinc">Studio</p>
            <p className="mt-3 font-meta text-meta text-ink">
              {contact.address.city}
            </p>
            <p className="mt-1 font-meta text-meta-sm text-graphite">
              {contact.hours}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="border-concrete py-6 pr-5 md:border-l md:pl-5"
          >
            <p className="font-meta text-meta-sm text-zinc">Sitemap</p>
            <ul className="mt-3 flex flex-col gap-1">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-meta text-meta text-graphite transition-colors hover:text-verdigris"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-l border-concrete py-6 pl-5">
            <p className="font-meta text-meta-sm text-zinc">
              Drawn by
            </p>
            <p className="mt-3 font-meta text-meta text-ink">
              {siteConfig.owner}
            </p>
            <p className="mt-1 font-meta text-meta-sm text-graphite">
              Est. {siteConfig.established}
            </p>
            <p className="mt-1 font-meta text-meta-sm text-graphite">
              {siteConfig.businessRegNo}
            </p>
          </div>
        </div>

      </div>
      <FooterWordmark />
      <div className="w-full px-3">
        {/* Legal bar */}
        <div className="flex flex-col gap-2 border-t border-concrete py-5 font-meta text-meta-sm text-zinc sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className="transition-colors hover:text-verdigris">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-verdigris">
              Terms and conditions
            </Link>
            <span>{siteConfig.ownerCredentials}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
