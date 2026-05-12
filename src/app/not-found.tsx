import Link from "next/link";
import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";

export default function NotFound() {
  return (
    <Container as="section" className="flex min-h-[70vh] items-center py-section">
      <div className="max-w-3xl">
        <EyebrowLabel>404</EyebrowLabel>
        <h1 className="mt-6 font-display text-display-xl leading-[0.95] text-fg-primary">
          Nothing built{" "}
          <span className="italic text-fg-muted">here</span>.
        </h1>
        <p className="mt-8 max-w-md text-body-lg text-fg-muted">
          The page you were looking for doesn&rsquo;t exist &mdash; or has been
          moved. Here&rsquo;s where you might be headed:
        </p>

        <ul className="mt-12 grid gap-x-12 gap-y-6 border-t border-surface-line pt-8 sm:grid-cols-2">
          {[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Browse projects" },
            { href: "/services", label: "What we build" },
            { href: "/contact", label: "Start a project" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-baseline justify-between gap-4 py-2"
              >
                <span className="font-display text-2xl text-fg-primary transition-colors group-hover:text-accent md:text-3xl">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-fg-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
