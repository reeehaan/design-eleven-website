import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-line bg-bg-primary/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-xl tracking-tight md:text-2xl">
            {siteConfig.shortName}
          </span>
          <span className="label-mono hidden text-fg-subtle transition-colors group-hover:text-fg-muted sm:inline">
            {siteConfig.wordmarkSuffix}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-fg-primary transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-fg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-fg-primary hover:text-bg-primary"
          >
            Start a project
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
