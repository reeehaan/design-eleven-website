import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-concrete bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-360 items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="group flex items-baseline gap-2"
        >
          <span className="font-title text-xl font-medium tracking-tight text-ink md:text-2xl">
            {siteConfig.shortName}
          </span>
          <span className="font-meta text-meta-sm uppercase text-zinc transition-colors group-hover:text-ink">
            {siteConfig.wordmarkSuffix}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-meta text-meta uppercase text-ink"
            >
              {item.label}
              {/* Underline draws from the left */}
              <span
                aria-hidden="true"
                className="absolute -bottom-1.5 left-0 h-px w-0 bg-verdigris transition-[width] duration-300 ease-out group-hover:w-full"
              />
            </Link>
          ))}
          {/* Same hover mechanism as the hero CTA, but not magnetic — the
              rule is one magnetic element per viewport, and the hero already
              claims it on the page where both are visible. */}
          <Button
            href="/contact"
            variant="primary"
            arrow
            className="ml-1 !px-5 !py-2.5"
          >
            Start a project
          </Button>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
