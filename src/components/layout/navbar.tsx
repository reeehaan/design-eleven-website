import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";
import { NavScroll } from "./nav-scroll";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 text-ink data-photo:text-white data-scrolled:border-b data-scrolled:border-concrete data-scrolled:bg-paper data-scrolled:text-ink">
      <div className="mx-auto grid h-16 w-full grid-cols-[1fr_auto] items-center px-3 md:h-20 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="group flex items-baseline gap-2 justify-self-start"
        >
          <span className="font-title text-xl font-semibold tracking-tight md:text-2xl">
            {siteConfig.shortName}
          </span>
          <span className="font-meta text-meta-sm opacity-70 transition-opacity group-hover:opacity-100">
            {siteConfig.wordmarkSuffix}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {siteConfig.nav
            .filter((n) => n.href !== "/contact")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative font-meta text-meta"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </Link>
            ))}
        </nav>

        <Link
          href="/contact"
          className="hidden items-center gap-2 justify-self-end border border-current px-5 py-2.5 font-meta text-meta transition-opacity hover:opacity-70 md:inline-flex"
        >
          Request a quote
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>

        <MobileMenu />
      </div>
      <NavScroll />
    </header>
  );
}
