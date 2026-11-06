import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Browse projects" },
  { href: "/services", label: "What we build" },
  { href: "/contact", label: "Request a quote" },
];

export default function NotFound() {
  return (
    <section
      aria-labelledby="nf-title"
      className="flex min-h-[80svh] flex-col justify-center bg-paper px-3 pb-16 pt-24"
    >
      <p className="font-sans text-base font-semibold text-zinc">404</p>
      <h1
        id="nf-title"
        className="mt-4 max-w-[14ch] font-sans text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-ink"
      >
        Nothing built here.
      </h1>
      <p className="mt-6 max-w-[30rem] font-sans text-[1.0625rem] font-semibold leading-[1.25] tracking-[-0.01em] text-graphite">
        The page you were looking for doesn&rsquo;t exist, or has moved. Here is
        where you might be headed.
      </p>
      <ul className="mt-12 grid grid-cols-1 border-t border-ink md:grid-cols-4 md:gap-x-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center justify-between border-b border-concrete py-3 font-sans text-[1.0625rem] font-semibold text-ink transition-colors hover:text-verdigris md:border-b-0"
            >
              {l.label}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
