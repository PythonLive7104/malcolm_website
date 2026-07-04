# Claude.ai Build Prompt — Petroleum Trading & Energy Infrastructure Website

> Copy everything below into Claude (or Claude Code) as your project brief. It's written so Claude can generate the full site in one pass, then iterate page by page.

---

## 1. Project Summary

Build a modern, professional corporate website for a **petroleum trading, storage, and logistics company** (refined products trading, tank farm storage, bulk shipping, pipeline transshipment, and supply chain services).

**Design reference:** Model the visual language, structure, and authority of **https://www.sunocolp.com/** — large hero imagery of infrastructure (tankers, pipelines, terminals), bold stat call-outs, a mega-menu style navigation organized by business segment, card-based "explore our segments" sections, an interactive operations map, and a dense but clean footer with multiple link columns. Do **not** copy Sunoco's brand, logo, copy, or any text/images verbatim — only the structural and visual approach (layout rhythm, hero treatment, card grids, stat strips, mega nav).

**Do not** reproduce Sunoco LP's actual copy, trademarks, or imagery — treat it purely as a structural/UX reference for industrial energy-sector sites.

---

## 2. Tech Stack

**Architecture: Next.js (App Router) frontend + Sanity headless CMS, fully hosted on Vercel. No backend server, no VPS.**

- **Frontend:** Next.js (App Router) + Tailwind CSS, fully responsive (mobile-first)
  - Static pages (Home, About, Services, Operations, Markets, Compliance, HSE, Contact, legal pages) built with static generation — they rarely change, so ship them as static HTML for the best possible SEO and speed.
  - Dynamic, frequently-updated content (Products, News articles, Job listings) is fetched from **Sanity** and rendered using **ISR (Incremental Static Regeneration)**, with **on-demand revalidation via a Sanity webhook** — when the client publishes/edits an entry in Sanity Studio, it pings a Next.js revalidation API route and the relevant page rebuilds instantly (no waiting on a timer, no manual redeploy).
  - Built-in `metadata` API (or `generateMetadata`) for per-page titles, descriptions, OG/Twitter tags.
  - File-based routing maps directly onto the sitemap: `/products/[slug]`, `/services/[category]`, `/news/[slug]`, `/careers/[slug]`.
- **Content management:** **Sanity.io** (free tier is sufficient at this scale) as the headless CMS, with a custom **Sanity Studio** (also deployable to Vercel, or embedded as a route inside the same Next.js app at `/studio`) so the client manages content with no developer involvement and no server to maintain. Content schemas to define: `product`, `service`, `newsArticle`, `jobListing`, plus reusable schemas for `teamMember`, `partnerLogo`, `certification`, and `companyStat` (so even the homepage stat strip and leadership team are client-editable).
- **Forms (Contact Us / Request a Quote):** No database needed — submit via a **Next.js Route Handler** (serverless function on Vercel) that sends the submission by email using a transactional email API (e.g. **Resend** or **SendGrid**; both have generous free tiers and work natively with Vercel). Include a honeypot field + basic rate limiting in the route handler for spam protection. If the client later wants submissions stored/searchable rather than just emailed, Sanity can also accept form writes as a `formSubmission` document type — flag this as an easy future add-on, not required for launch.
- **Hosting:** **Vercel** for the Next.js app (and Sanity Studio if embedded) — automatic HTTPS, global CDN/edge caching, zero server maintenance. Sanity's own infrastructure hosts the actual content/media (images go through Sanity's CDN with automatic optimization, which plugs directly into Next.js `<Image>`).
- **Domain:** Client's domain pointed at Vercel via DNS (A/CNAME records) — no Nginx, no SSL certs to manage manually, Vercel handles it.

This is a genuinely "mainly frontend" build: there is no backend codebase to write, deploy, or patch. The only non-Next.js piece is the Sanity schema definitions, which live in the same repo.

---

## 3. Design Direction ("Modern" Spec)

- **Tone:** Authoritative, global, industrial — but clean and uncluttered, not dated corporate. Generous whitespace, large confident typography, restrained color palette.
- **Color palette:** Deep navy/petrol blue (#0B1E33 or similar) + a strong accent (amber/orange #E8862E or energy-red) on a white/light-grey base. Avoid generic blue-gradient "stock corporate" look — pick a distinctive accent and use it consistently for CTAs only.
- **Typography:** A confident sans-serif pairing — bold geometric sans for headings, clean readable sans for body (e.g. something in the Inter/Sora/Manrope family). Strong type-scale hierarchy.
- **Hero sections:** Full-width imagery (tankers, refineries, storage tanks, pipelines, maps) with dark overlay gradient and bold headline + 1–2 CTA buttons, similar rhythm to the reference site's rotating homepage hero tiles.
- **Stat strips:** Animated counters for key numbers (storage capacity, fleet size, countries served, years in operation) — placeholder values the client can edit later.
- **Cards:** Segment/product/service cards with image, short description, and "Learn more" link — consistent hover states (subtle lift + accent underline).
- **Operations map:** Interactive or static world/regional map highlighting storage terminals, pipelines, and operational regions (can be a stylized SVG map component, not Google Maps embed, for performance + design control).
- **Navigation:** Mega-menu for desktop (grouped by Products / Services / Operations / Markets / Company), clean slide-out drawer for mobile.
- **Icons:** Consistent line-icon set (Lucide or Heroicons) for compliance/certifications, HSE, and service categories.
- **Motion:** Subtle scroll-reveal and hover micro-interactions only — no heavy parallax that hurts performance/SEO.
- **Imagery:** Use high-quality stock/placeholder imagery appropriate to oil & gas/maritime logistics (tankers, terminals, pipelines, control rooms, ports) — flag clearly which images are placeholders for the client to replace with real photography.

Read the frontend-design conventions you have access to and apply distinctive, non-templated styling decisions rather than default Tailwind look.

---

## 4. Full Sitemap & Page Content Requirements

Build each of the following as its own route/page. Section headers below are the required content blocks per page — flesh out real, plausible industry-appropriate placeholder copy for each (the client will refine wording later, but it should not read as Lorem Ipsum).

### 1. Home Page
- Company overview (hero + intro section)
- Core business activities (card grid: Trading / Storage / Shipping / Pipeline / Logistics)
- Key statistics strip (storage capacity, fleet/vessels, countries, years of operation)
- Primary call-to-action buttons ("Request a Quote", "Partner With Us")
- Global operations map (interactive/stylized)

### 2. About Us
- Company history (timeline component)
- Mission & Vision
- Corporate values (icon grid)
- Leadership team (photo grid with name/title/bio modal or expandable card)
- Company profile (downloadable PDF placeholder)
- Corporate structure (org chart or simplified diagram)
- Strategic partnerships (logo strip)

### 3. Products *(hub page + individual product detail pages)*
Hub page with category intro, then **Refined Petroleum Products** as individual sub-pages/detail cards, each with: spec sheet table (density, sulfur content, flash point, etc. — placeholder values), applications, and a "Request Quote" CTA:
- EN590 10ppm Diesel
- Jet Fuel A1
- D6 Virgin Fuel Oil
- Mazut M100
- Liquefied Petroleum Gas (LPG)
- Gasoline
- Bitumen
- Petroleum Coke
- Base Oil

### 4. Services *(hub page + sub-sections, each its own anchor/route)*
**Petroleum Trading**
- Spot trading, Contract supply, Wholesale distribution, International trading

**Tank Farm Storage**
- Storage facilities, Capacity information, Short and long-term storage, Product handling

**Bulk Shipping Services**
- Vessel chartering, Marine logistics, Freight management, Cargo transportation

**Pipeline Transshipment**
- Pipeline transportation, Tank-to-tank transfer, Tank-to-vessel transfer, Vessel-to-vessel transfer

**Supply Chain & Logistics**
- Customs clearance, Documentation, Inspection services, Cargo insurance

### 5. Operations & Infrastructure
- Tank farms, Storage terminals, Marine terminals, Pipelines, Loading facilities, Transportation assets
- Operational regions (map)
- Storage capacities (stat table/infographic)

### 6. Markets We Serve
Card grid: Aviation industry, Marine industry, Mining companies, Manufacturing sector, Power generation, Government agencies, Petroleum distributors, Industrial consumers — each with a 1–2 sentence description of how the company serves that sector.

### 7. Compliance & Certifications
- Corporate registrations, Petroleum licenses, Import/export permits, Environmental permits
- ISO certifications (badge grid)
- AML/KYC compliance, Anti-corruption policies

### 8. Health, Safety & Environment (HSE)
- HSE policy, Safety standards, Environmental policy, Sustainability initiatives, Emergency response plans, Occupational safety programs

### 9. Strategic Partners & Clients
- Refinery partners, Shipping partners, Storage partners, International affiliates, Logistics partners (logo grid, categorized by tab/filter)

### 10. News & Market Intelligence *(Sanity-managed)*
- Oil market updates, Energy news, Shipping market reports, Company announcements, Industry insights
- List view with category filter + individual article detail page + pagination

### 11. Careers *(Sanity-managed)*
- Employment opportunities (job listing list/detail pages, pulled from Sanity)
- Recruitment process (step timeline)
- Employee benefits

### Additional pages required for a complete, SEO-sound site (not in the client's outline but expected for this type of site — include them):
- **Contact Us** (office locations, contact form, embedded map per region)
- **Request a Quote** (dedicated lead-gen form, separate from general contact)
- **404 Page** (on-brand, with nav back to key pages)
- **Privacy Policy** & **Terms of Use** (standard legal page templates — flag as placeholder legal text requiring real legal review)
- **XML Sitemap** (`/sitemap.xml`) and **robots.txt**

---

## 5. SEO & Technical Requirements

This is a top priority — the client specifically wants pages "well indexed" for search engines. Implement all of the following:

1. **Server-side renderability:** Handled natively by Next.js — static pages are pre-rendered at build time, Products/News/Careers use ISR. Crawlers always receive fully-rendered HTML, never an empty `<div id="root">`. No client-side-only rendering for any indexable content.
2. **Unique, optimized `<title>` and `<meta name="description">` per page**, driven dynamically from page/route data (not hardcoded duplicates).
3. **Semantic HTML**: proper `<h1>`–`<h6>` hierarchy (one `<h1>` per page), `<nav>`, `<main>`, `<article>`, `<section>` landmarks.
4. **JSON-LD structured data**:
   - `Organization` schema sitewide (logo, name, contact, social profiles)
   - `Product` schema on each product detail page
   - `Article`/`NewsArticle` schema on News posts
   - `JobPosting` schema on Careers listings
   - `BreadcrumbList` schema on all deep pages
5. **Breadcrumb navigation** (visible UI + matching schema) on Products, Services, News, and Careers detail pages.
6. **Clean URL structure**: lowercase, hyphenated, descriptive slugs; no query-string-based routing for indexable content.
7. **`sitemap.xml`** auto-generated from Sanity content (products, services, news, jobs) + static pages, via a Next.js route handler (`app/sitemap.ts`), and **`robots.txt`** referencing it.
8. **Canonical tags** on every page to prevent duplicate-content issues.
9. **Open Graph + Twitter Card meta tags** per page (with sensible defaults + per-article overrides for News).
10. **Image optimization**: descriptive `alt` text on every image (relevant keywords, not stuffed), modern formats (WebP) with fallbacks, lazy-loading below the fold.
11. **Performance/Core Web Vitals**: code-splitting per route, optimized font loading, compressed/responsive images (`srcset`), minimal render-blocking JS/CSS — target good Lighthouse scores since Core Web Vitals factor into ranking.
12. **Internal linking**: related-products/related-services modules, footer sitemap links, contextual cross-links between Services ↔ Operations ↔ Markets pages.
13. **Accessibility (also helps SEO)**: proper landmark roles, color contrast meeting WCAG AA, keyboard-navigable mega menu, focus states.
14. **Mobile-first indexing readiness**: fully responsive with mobile-equivalent content (not a stripped-down mobile version).

---

## 6. Build Sequence (how I'd like Claude to approach this)

1. Propose the design system first (colors, type scale, spacing, component tokens) as a short style guide before building pages.
2. Build the **Home page** fully (it sets the visual tone for everything else).
3. Build shared components next: header/mega-nav, footer, breadcrumb, card grid, stat strip, CTA banner, SEO/meta wrapper component.
4. Build out the remaining pages in this order: About Us → Products (hub + 1 detail template) → Services (hub + 5 sub-sections) → Operations & Infrastructure → Markets We Serve → Compliance & Certifications → HSE → Strategic Partners & Clients → News & Market Intelligence (list + detail) → Careers (list + detail) → Contact Us / Request a Quote → legal pages → 404.
5. After the Next.js frontend is approved (using local placeholder/mock content), define the Sanity schemas (`product`, `service`, `newsArticle`, `jobListing`, `teamMember`, `partnerLogo`, `certification`, `companyStat`), set up Sanity Studio, seed it with the placeholder content so the structure matches, then connect Next.js's data-fetching (static generation + ISR) to live Sanity queries (GROQ).
6. Build the Contact Us / Request a Quote form submission as a Next.js Route Handler that sends email via Resend (or SendGrid), plus the on-demand revalidation API route that Sanity's webhook calls on publish.
7. Finish with deployment notes for Vercel: connecting the GitHub repo to a Vercel project, environment variables (Sanity project ID/dataset/token, email API key), custom domain DNS setup, and a short walkthrough of how the client logs into Sanity Studio to edit Products/News/Careers.

---

## 7. Open Decisions to Flag Back to Me

Please explicitly call out and ask me about:
- Real company name, logo, brand colors (currently using placeholder navy/amber palette)
- Real stats (storage capacity, fleet size, years in operation, countries served) to replace placeholders
- Whether News/Careers need a public submission/application flow or are admin-managed only
- Payment/quote-request flow: is "Request a Quote" just a lead form, or does it need a quoting engine?
- Preferred transactional email provider for form notifications (Resend vs. SendGrid vs. another you already use)
- Whether Sanity Studio should be embedded inside the same Next.js app (`/studio` route) or deployed as a separate Sanity-hosted URL for the client to log into

---

*End of brief. Build iteratively — start with the design system + Home page and show me before continuing.*
