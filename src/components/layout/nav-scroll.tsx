"use client";

import { useEffect } from "react";

/**
 * The navbar is transparent over the top of a page. Once the page has moved
 * under it, it takes the page colour so its links never collide with content.
 */
export function NavScroll() {
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () =>
      header.toggleAttribute("data-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
