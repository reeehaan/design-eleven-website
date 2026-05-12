import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark text-bg-primary">
      <div className="container-x py-section-sm md:py-section">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="label-mono text-bg-primary/60">Let&rsquo;s build</span>
            <h2 className="mt-4 font-display text-display-md leading-none text-bg-primary">
              Have a project in&nbsp;mind?
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 text-lg text-accent transition-colors hover:text-bg-primary"
            >
              Start the conversation
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="md:col-span-5 md:pl-8">
            <div className="flex flex-col gap-6">
              <div>
                <span className="label-mono text-bg-primary/60">Direct</span>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="mt-2 block font-display text-2xl text-bg-primary"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-1 block text-bg-primary/80 transition-colors hover:text-accent"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <span className="label-mono text-bg-primary/60">Studio</span>
                <p className="mt-2 text-bg-primary/80">
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.country}
                </p>
                <p className="text-bg-primary/60">{siteConfig.contact.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-10 pt-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-2xl text-bg-primary">
              {siteConfig.name}
            </span>
            <p className="mt-3 max-w-xs text-sm text-bg-primary/60">
              {siteConfig.description}
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="md:col-span-4 md:col-start-7"
          >
            <span className="label-mono text-bg-primary/60">Sitemap</span>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-bg-primary/80 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className="label-mono text-bg-primary/60">Established</span>
            <p className="mt-4 font-mono text-bg-primary/80">
              {siteConfig.established}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-bg-primary/50 sm:flex-row sm:items-center">
          <p className="font-mono">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono">Licensed &amp; insured · Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
