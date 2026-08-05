"use client";

import { useEffect } from "react";

/**
 * Opens the <details> a fragment points at.
 *
 * Browsers expand a closed <details> when a fragment targets something
 * *inside* it, but not when the fragment is the element itself — which is the
 * case here, since the id has to sit on the details for /services#plumbing to
 * scroll to the right row. Without this, the home page's service links land
 * on a closed row.
 *
 * Pure enhancement: no JS means the row is still scrolled to, just shut. No
 * scrolling is done here either — the browser has already positioned the
 * summary, and opening only grows content underneath it.
 */
export function OpenOnHash() {
  useEffect(() => {
    const open = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      // getElementById, not querySelector: the fragment is attacker-supplied
      // and would need escaping before it could be used as a selector.
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) el.open = true;
    };

    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);

  return null;
}
