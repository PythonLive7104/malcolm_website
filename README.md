# Pro Petroleum — corporate website

Marketing site for a petroleum trading, storage & logistics company.
**Next.js 16 (App Router) + Tailwind v4**, built for static generation / ISR and
deployment on Vercel. Company name, copy, stats and imagery are **placeholders**
(see "Placeholders to replace" below).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm start        # serve the production build
```

Node 20+. No database or backend server — forms email out via a serverless route.

## Project structure

```
src/
  app/                     # routes (App Router)
    layout.tsx             # fonts, sitewide metadata + Organization JSON-LD, header/footer
    page.tsx               # Home
    about, products, services, operations, markets,
    compliance, hse, partners, news, careers,
    contact, quote, privacy, terms   # pages
    products/[slug], news/[slug], careers/[slug]   # SSG detail pages
    api/lead/route.ts      # form handler (honeypot + rate limit + Resend)
    sitemap.ts, robots.ts  # /sitemap.xml + /robots.txt
    not-found.tsx          # on-brand 404
  components/
    site/                  # Header (mega-nav), Footer, PageHero, Hero, forms, maps…
    ui/                    # Section, SegmentCard, StatStrip, CTABanner, Breadcrumbs, JsonLd
  lib/
    site.ts                # company info + nav structure   ← edit brand here
    images.ts              # central image registry (alt text)
    data/                  # products, services, misc, news, careers content
public/images/demo/        # DEMO images (LoremFlickr) — swap for client photos
```

## SEO features implemented

- Static pre-rendering for all indexable pages; SSG for product/news/career detail pages.
- Per-page `<title>`/description, canonical, Open Graph + Twitter tags (via the Metadata API).
- JSON-LD: `Organization` (sitewide), `Product`, `NewsArticle`, `JobPosting`, `BreadcrumbList`.
- Visible breadcrumbs on all deep pages; semantic landmarks; one `<h1>` per page.
- Auto `/sitemap.xml` (static + product/news/job routes) and `/robots.txt`.
- `next/image` everywhere (WebP, responsive `srcset`, lazy-loading); skip-link + focus states (WCAG AA).

## Placeholders to replace (before launch)

| What | Where |
|------|-------|
| Company name, legal name, contact, socials | `src/lib/site.ts` |
| Production domain (`site.url`) — drives canonicals & sitemap | `src/lib/site.ts` |
| Homepage stats | `src/lib/site.ts` (`stats`) |
| Product specs & copy | `src/lib/data/products.ts` |
| Leadership, partners, certifications, history | `src/lib/data/misc.ts` |
| **Demo images** → real photography | replace files in `public/images/demo/` (keep names) or repoint `src/lib/images.ts` |
| Logo (SVG wordmark) | `src/components/site/Logo.tsx` |
| Legal copy (privacy/terms) | needs real legal review |

Every placeholder is flagged inline with `⚠️ PLACEHOLDER` / a visible badge in the UI.

## Forms (Contact / Request a Quote)

`POST /api/lead` emails submissions via **Resend** — no database.
Set these env vars in Vercel (without them, the form runs in demo mode and just logs):

```
RESEND_API_KEY=...          # https://resend.com
LEAD_TO_EMAIL=trading@yourcompany.com
LEAD_FROM_EMAIL=website@yourdomain.com   # a verified Resend domain
```

Spam protection: hidden honeypot field + naive per-IP rate limit (5 / 60s).

## Sanity CMS (wired, with graceful fallback)

Products, Services, News, Careers — plus the homepage stats, leadership, partners
and certifications — are served through the CMS layer in [`src/lib/cms.ts`](src/lib/cms.ts):

- **Demo mode (no env vars):** every getter returns the local mock content in
  `src/lib/data/*`, so the site builds and runs with zero Sanity setup.
- **Live mode:** set the env vars below and the same getters fetch from Sanity via
  GROQ, rendered with **ISR** (`revalidate = 3600`) + on-demand revalidation.

### Going live

1. **Create a project:** `npx sanity login` then `npx sanity init --env` (or grab an
   existing project id). Put the values in `.env.local` (see `.env.example`):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
2. **Seed placeholder content** so the dataset matches the site:
   ```bash
   npx tsx scripts/export-seed.ts          # regenerates sanity/seed.ndjson from mock data
   npx sanity dataset import sanity/seed.ndjson production
   ```
   (Images are omitted from the seed — editors upload real photos in Studio; until
   then the frontend falls back to the local demo images automatically.)
3. **Edit content** at **`/studio`** (embedded — no separate hosting). Schemas live in
   `src/sanity/schemas/`. To deploy Studio separately instead: `npx sanity deploy`.
4. **Instant updates:** in Studio → API → Webhooks, add a webhook to
   `POST https://YOUR_DOMAIN/api/revalidate`, projection `{ "_type": _type }`, with a
   secret matching `SANITY_REVALIDATE_SECRET`. Publishing then revalidates the
   affected pages immediately (see [`src/app/api/revalidate/route.ts`](src/app/api/revalidate/route.ts)).

### Sanity layout

```
sanity.config.ts            # Studio config (mounted at /studio)
sanity.cli.ts               # CLI config for dataset import / deploy
src/sanity/
  env.ts                    # env + `sanityConfigured` guard
  client.ts                 # read client + sanityFetch (ISR)
  image.ts                  # urlFor() image builder
  queries.ts                # GROQ queries (image resolved to {src,alt,w,h})
  schemas/                  # 8 document schemas
src/app/studio/[[...tool]]/ # embedded Studio route
scripts/export-seed.ts      # mock content → sanity/seed.ndjson
```

## Open decisions (from the brief)

- Real company name, logo, brand colours (currently navy `#0B1E33` / amber `#E8862E`).
- Real stats, product specs, leadership, partners.
- News/Careers: admin-managed only, or public submission/application flow?
- "Request a Quote": lead form only (current) or a quoting engine?
- Email provider: Resend (wired) vs SendGrid vs other.
- Sanity Studio embedded at `/studio` vs separately hosted.
