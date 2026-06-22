import { siteConfig } from "@/lib/site";

/**
 * Self-contained HTML for the maintenance / coming-soon screen.
 *
 * Returned directly from `proxy.ts` so it renders even while the rest of the
 * app is being rebuilt, and carries its own inline styles + fonts (no reliance
 * on the app's CSS bundle). Brand tokens mirror `globals.css`.
 */
export function maintenancePage(): string {
  const { name, shortName, wordmarkSuffix, tagline, established, contact } =
    siteConfig;
  const { city, country } = contact.address;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>${name} — Coming soon</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #F4F2ED;
    --bg-2: #EAE6DD;
    --fg: #0D1816;
    --muted: #57544B;
    --subtle: #A9ACA4;
    --accent: #D4710B;
    --line: #D8D2C5;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  body {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background:
      radial-gradient(120% 80% at 50% -10%, var(--bg-2) 0%, var(--bg) 60%);
    color: var(--fg);
    font-family: "Inter", system-ui, sans-serif;
    line-height: 1.65;
    padding: 2rem 1.5rem;
  }
  .wrap {
    flex: 1;
    width: 100%;
    max-width: 640px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }
  .wordmark { display: flex; align-items: baseline; gap: .5rem; }
  .wordmark b { font-family: "Fraunces", Georgia, serif; font-weight: 500; font-size: 1.5rem; letter-spacing: -.01em; }
  .wordmark span { font-family: "JetBrains Mono", monospace; font-size: .7rem; letter-spacing: .22em; text-transform: uppercase; color: var(--subtle); }
  .status {
    display: inline-flex; align-items: center; gap: .55rem;
    font-family: "JetBrains Mono", monospace; font-size: .7rem;
    letter-spacing: .18em; text-transform: uppercase; color: var(--muted);
  }
  .dot { width: 7px; height: 7px; border-radius: 99px; background: var(--accent); box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); animation: pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent); } 70% { box-shadow: 0 0 0 9px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }
  h1 { font-family: "Fraunces", Georgia, serif; font-weight: 400; font-size: clamp(2.1rem, 7vw, 3.4rem); line-height: 1.08; letter-spacing: -.02em; }
  h1 em { font-style: italic; color: var(--accent); }
  p.lead { font-size: 1.05rem; color: var(--muted); max-width: 48ch; }
  .rule { height: 1px; background: var(--line); border: 0; }
  .contact { display: flex; flex-wrap: wrap; gap: 1.5rem 2.5rem; }
  .contact a, .contact span.val { color: var(--fg); text-decoration: none; font-size: .95rem; }
  .contact .k { display: block; font-family: "JetBrains Mono", monospace; font-size: .62rem; letter-spacing: .16em; text-transform: uppercase; color: var(--subtle); margin-bottom: .25rem; }
  .contact a:hover { color: var(--accent); }
  footer { width: 100%; max-width: 640px; margin: 2.5rem auto 0; padding-top: 1.5rem; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap; justify-content: space-between; gap: .5rem; font-size: .78rem; color: var(--subtle); }
</style>
</head>
<body>
  <main class="wrap">
    <div class="wordmark"><b>${shortName}</b><span>${wordmarkSuffix}</span></div>

    <div>
      <p class="status"><span class="dot"></span> Site under construction</p>
      <h1 style="margin-top:1rem">We're crafting<br />something <em>worth the wait.</em></h1>
    </div>

    <p class="lead">${name} is refreshing its home online. Our new site is on its way — in the meantime, we're ready to talk through your project.</p>

    <hr class="rule" />

    <div class="contact">
      <div>
        <span class="k">Call</span>
        <a href="tel:${contact.phone.replace(/\s+/g, "")}">${contact.phoneDisplay}</a>
      </div>
      <div>
        <span class="k">WhatsApp</span>
        <a href="https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}">Message us</a>
      </div>
      <div>
        <span class="k">Email</span>
        <a href="mailto:${contact.email}">${contact.email}</a>
      </div>
    </div>
  </main>

  <footer>
    <span>${name} · ${tagline}</span>
    <span>${city}, ${country} · Est. ${established}</span>
  </footer>
</body>
</html>`;
}
