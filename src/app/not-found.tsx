import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/motion/eyebrow";

export default function NotFound() {
  return (
    <Container as="section" className="flex min-h-[70vh] items-center py-20">
      <div className="max-w-3xl">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-6 font-title text-d1 font-medium text-ink">
          Nothing built <span className="text-graphite">here</span>.
        </h1>
        <p className="mt-8 max-w-md text-lead text-graphite">
          The page you were looking for doesn&rsquo;t exist &mdash; or has been
          moved. Here&rsquo;s where you might be headed:
        </p>

        <ul className="mt-12 grid gap-x-12 gap-y-6 border-t border-concrete pt-8 sm:grid-cols-2">
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
                <span className="font-title text-2xl font-medium text-ink transition-colors group-hover:text-verdigris md:text-3xl">
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-meta text-zinc transition-transform duration-300 group-hover:translate-x-1 group-hover:text-verdigris"
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
