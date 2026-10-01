# Design Eleven

A marketing and lead-generation website built for a construction company —
service pages, a filterable project portfolio with before/after comparisons,
and a contact flow that converts visitors into qualified quote requests.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** with the typography plugin
- **GSAP** (+ `@gsap/react`), **Framer Motion**, and **Lenis** for scroll-driven motion
- **Supabase** — stores contact submissions
- **Resend** — transactional email (owner notification + visitor confirmation)
- **Upstash Redis** — sliding-window rate limiting
- **Cloudflare Turnstile** — bot protection on the contact form
- **React Hook Form + Zod** — validated, type-safe forms
- **react-compare-slider** — before/after project photo comparisons

## Features

- Project case studies with phased timelines, before/after sliders, and testimonials
- Services pages with scope tables, FAQs, and an interactive "build model"
- An animated, scroll-synced estimate explainer (four-document stack: site plan → priced bill → programme → handover set)
- Full SEO setup: sitemap, robots.txt, dynamic OG images, JSON-LD structured data
- A `/styleguide` route for reviewing motion and design tokens in isolation

## Contact form architecture

The contact form is defense-in-depth, not a single `fetch` call:

1. **Validate** — Zod schema on the server action
2. **Rate limit** — Upstash sliding window, 3 submissions/IP/hour, fails open if Redis is unreachable so a provider outage never blocks real leads
3. **Verify** — Cloudflare Turnstile token check
4. **Persist** — insert into Supabase first, as the source of truth
5. **Notify** — send owner + visitor emails via Resend

The submission is reported successful if *either* the database write or the
email send succeeds, so a flaky email provider never loses a lead that was
already stored.

## Motion

Scroll-synced 3D scenes (the estimate stack, the build-stage model) are built
with CSS 3D transforms driven by GSAP timelines — no WebGL runtime, so the
visuals stay cheap and accessible.
