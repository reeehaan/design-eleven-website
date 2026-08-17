import { siteConfig } from "@/lib/site";

/**
 * Self-contained HTML for the maintenance / coming-soon screen.
 *
 * Returned directly from `proxy.ts` so it renders even while the rest of the
 * app is being rebuilt, and carries its own inline styles + fonts (no reliance
 * on the app's CSS bundle, which is why nothing here imports globals.css).
 *
 * The tokens below are copied from `globals.css` rather than shared, because
 * this file must not depend on the build succeeding. Keep them in step: this
 * is the first page a client ever sees, and until recently it was set in
 * Fraunces and Inter with an orange pulsing dot — a different brand wearing
 * the same name.
 *
 * Cabinet Grotesk and Switzer come from Fontshare rather than the app's
 * self-hosted copies, whose URLs are content-hashed per build and therefore
 * unknowable from here. Both degrade to a system stack if the CDN is
 * unreachable, which is the right failure for this page in particular.
 */
export function maintenancePage(): string {
  const { name, shortName, wordmarkSuffix, tagline, established, contact } =
    siteConfig;
  const { city, country } = contact.address;

  const tel = contact.phone.replace(/\s+/g, "");
  const wa = contact.whatsapp.replace(/[^0-9]/g, "");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>${name} — Coming soon</title>
<link rel="preconnect" href="https://api.fontshare.com" />
<link rel="preconnect" href="https://cdn.fontshare.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f%5B%5D=cabinet-grotesk@500&display=swap" />
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f%5B%5D=switzer@400,500&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap" />
<style>
  :root {
    --paper: #F0F0EC;
    --ink: #0E1417;
    --graphite: #3A423F;
    --zinc: #656D6A;
    --concrete: #C9CBC4;
    --verdigris: #4E6B62;

    --title: "Cabinet Grotesk", system-ui, sans-serif;
    --body: "Switzer", system-ui, sans-serif;
    --meta: "Geist Mono", ui-monospace, monospace;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    /* Flat. The rest of the site has no gradients and no rounded corners. */
    background: var(--paper);
    color: var(--ink);
    font-family: var(--body);
    line-height: 1.65;
  }
  .bar {
    border-bottom: 1px solid var(--concrete);
  }
  .inner {
    width: 100%;
    max-width: 1440px;
    margin-inline: auto;
    padding-inline: 1.5rem;
  }
  @media (min-width: 768px) { .inner { padding-inline: 2.5rem; } }
  @media (min-width: 1024px) { .inner { padding-inline: 4rem; } }

  .bar .inner {
    height: 4rem;
    display: flex;
    align-items: center;
    gap: .5rem;
  }
  @media (min-width: 768px) { .bar .inner { height: 5rem; } }
  .wordmark {
    font-family: var(--title);
    font-weight: 500;
    font-size: 1.25rem;
    letter-spacing: -.02em;
  }
  @media (min-width: 768px) { .wordmark { font-size: 1.5rem; } }
  .suffix {
    font-family: var(--meta);
    font-size: .6875rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--zinc);
  }

  main { flex: 1; display: flex; align-items: center; }
  main .inner { padding-block: 4rem; }
  @media (min-width: 768px) { main .inner { padding-block: 6rem; } }

  /* Eyebrow: label, then a rule running to the edge — same as the site's */
  .eyebrow {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--meta);
    font-size: .75rem;
    letter-spacing: .04em;
    text-transform: uppercase;
    color: var(--zinc);
  }
  .eyebrow::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--concrete);
  }

  h1 {
    margin-top: 1.75rem;
    max-width: 18ch;
    font-family: var(--title);
    font-weight: 500;
    font-size: clamp(2.5rem, 5.5vw, 4.25rem);
    line-height: .96;
    letter-spacing: -.035em;
  }
  h1 .quiet { color: var(--zinc); }

  .lead {
    margin-top: 1.75rem;
    max-width: 56ch;
    font-size: 1.125rem;
    line-height: 1.6;
    letter-spacing: -.011em;
    color: var(--graphite);
  }

  /* Title block, matching the register under every page masthead */
  .reg {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid var(--concrete);
  }
  @media (min-width: 900px) { .reg { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  .reg > div {
    padding: 1.5rem 1rem 1.5rem 1.25rem;
    border-left: 1px solid var(--concrete);
    border-bottom: 1px solid var(--concrete);
  }
  .reg > div:nth-child(2n + 1) { border-left: 0; padding-left: 0; }
  @media (min-width: 900px) {
    .reg > div { border-bottom: 0; }
    .reg > div:nth-child(2n + 1) { border-left: 1px solid var(--concrete); padding-left: 1.25rem; }
    .reg > div:first-child { border-left: 0; padding-left: 0; }
  }
  .reg dt {
    font-family: var(--meta);
    font-size: .6875rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--zinc);
  }
  .reg dd { margin-top: .625rem; }
  .reg a, .reg span {
    font-family: var(--title);
    font-weight: 500;
    font-size: clamp(1.125rem, 2vw, 1.375rem);
    letter-spacing: -.02em;
    color: var(--ink);
    text-decoration: none;
    overflow-wrap: break-word;
    transition: color .3s ease;
  }
  /* Verdigris, not the marking orange — orange means invalid, never hover */
  .reg a:hover, .reg a:focus-visible { color: var(--verdigris); }
  .reg .code {
    font-family: var(--meta);
    font-size: .75rem;
    letter-spacing: .04em;
    font-weight: 400;
  }

  :focus-visible { outline: 2px solid var(--verdigris); outline-offset: 2px; }

  footer { border-top: 1px solid var(--concrete); }
  footer .inner {
    padding-block: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: .5rem 2rem;
    font-family: var(--meta);
    font-size: .6875rem;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--zinc);
  }
</style>
</head>
<body>
  <div class="bar">
    <div class="inner">
      <span class="wordmark">${shortName}</span>
      <span class="suffix">${wordmarkSuffix}</span>
    </div>
  </div>

  <main>
    <div class="inner">
      <p class="eyebrow">M-00 &middot; Site under construction</p>

      <h1>The site is being rebuilt. <span class="quiet">The studio is open.</span></h1>

      <p class="lead">
        We are putting the new ${name} online. Everything else runs as normal —
        site visits, estimates and work in progress are all unaffected. Call
        or message and we will pick up.
      </p>

      <dl class="reg">
        <div>
          <dt>Call</dt>
          <dd><a href="tel:${tel}">${contact.phoneDisplay}</a></dd>
        </div>
        <div>
          <dt>WhatsApp</dt>
          <dd><a href="https://wa.me/${wa}" rel="noopener noreferrer">Message us &rarr;</a></dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd><a class="code" href="mailto:${contact.email}">${contact.email}</a></dd>
        </div>
        <div>
          <dt>Office</dt>
          <dd><span>${city}</span></dd>
        </div>
      </dl>
    </div>
  </main>

  <footer>
    <div class="inner">
      <span>${name} &middot; ${tagline}</span>
      <span>${city}, ${country} &middot; Est. ${established}</span>
    </div>
  </footer>
</body>
</html>`;
}
