"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The navbar is transparent over the top of a page. Once the page has moved
 * under it, it takes the page colour so its links never collide with content.
 * On the home page the top of the page is a dark photograph, so until then the
 * links are set light.
 */
export function NavScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => {
      const scrolled = window.scrollY > 24;
      header.toggleAttribute("data-scrolled", scrolled);
      header.toggleAttribute("data-photo", pathname === "/" && !scrolled);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  return null;
}
