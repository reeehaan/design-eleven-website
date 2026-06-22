/**
 * Architectural frame lines — decorative vertical guides that hug the content
 * edges in the page gutters, plus short diagonal ticks at each corner.
 *
 * The lines live entirely in the side margins, so they never sit on top of or
 * underneath the page content. The layer is `absolute` inside <main>, so it
 * spans the content area only and never reaches the footer or navbar. Diagonals
 * point into the gutter and inward vertically, and are sized to the responsive
 * gutter at every breakpoint (including mobile) so they never overflow the
 * screen. Purely decorative: non-interactive and aria-hidden.
 */
export function GridLines() {
  // Width scales with the container's responsive gutter so the 45° tick always
  // stays within the margin: w-8≈23px<24px, md w-14≈40px<40px, lg w-20≈57px<64px.
  const tick = "absolute h-px w-8 bg-surface-line md:w-14 lg:w-20";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
      <div className="container-x h-full">
        <div className="relative h-full border-x border-surface-line">
          <span className={`${tick} left-0 top-0 origin-top-left rotate-[135deg]`} />
          <span className={`${tick} right-0 top-0 origin-top-right rotate-[225deg]`} />
          <span className={`${tick} bottom-0 left-0 origin-bottom-left rotate-[225deg]`} />
          <span className={`${tick} bottom-0 right-0 origin-bottom-right rotate-[135deg]`} />
        </div>
      </div>
    </div>
  );
}
