/**
 * Generates sanity/seed.ndjson from the local mock content, so the client's
 * Sanity dataset can be seeded to match the site structure exactly:
 *
 *   npx tsx scripts/export-seed.ts
 *   npx sanity dataset import sanity/seed.ndjson production
 *
 * Images are intentionally omitted — editors upload real photography in Studio;
 * until then the frontend falls back to the local demo images.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { products } from "../src/lib/data/products";
import { services } from "../src/lib/data/services";
import { articles } from "../src/lib/data/news";
import { jobs } from "../src/lib/data/careers";
import { leadership, certifications, partners } from "../src/lib/data/misc";
import { stats } from "../src/lib/site";

const key = (i: number) => `k${i}`;
const docs: Record<string, unknown>[] = [];

products.forEach((p, i) =>
  docs.push({
    _type: "product",
    _id: `product-${p.slug}`,
    name: p.name,
    slug: { _type: "slug", current: p.slug },
    category: p.category,
    tagline: p.tagline,
    summary: p.summary,
    applications: p.applications,
    specs: p.specs.map((s, j) => ({ _key: key(j), label: s.label, value: s.value })),
    order: i,
  })
);

services.forEach((s, i) =>
  docs.push({
    _type: "service",
    _id: `service-${s.slug}`,
    title: s.title,
    slug: { _type: "slug", current: s.slug },
    icon: s.icon,
    intro: s.intro,
    features: s.features.map((f, j) => ({ _key: key(j), title: f.title, body: f.body })),
    order: i,
  })
);

articles.forEach((a) =>
  docs.push({
    _type: "newsArticle",
    _id: `news-${a.slug}`,
    title: a.title,
    slug: { _type: "slug", current: a.slug },
    category: a.category,
    date: a.date,
    author: a.author,
    excerpt: a.excerpt,
    body: a.body.map((text, j) => ({ _type: "paragraph", _key: key(j), text })),
  })
);

jobs.forEach((j) =>
  docs.push({
    _type: "jobListing",
    _id: `job-${j.slug}`,
    title: j.title,
    slug: { _type: "slug", current: j.slug },
    department: j.department,
    location: j.location,
    type: j.type,
    postedAt: j.postedAt,
    active: true,
    summary: j.summary,
    responsibilities: j.responsibilities,
    requirements: j.requirements,
  })
);

leadership.forEach((m, i) =>
  docs.push({ _type: "teamMember", _id: `team-${i}`, name: m.name, role: m.role, bio: m.bio, order: i })
);

certifications.forEach((c, i) =>
  docs.push({ _type: "certification", _id: `cert-${i}`, code: c.code, label: c.label, order: i })
);

partners.forEach((p, i) =>
  docs.push({ _type: "partnerLogo", _id: `partner-${i}`, name: p.name, category: p.category })
);

stats.forEach((s, i) =>
  docs.push({
    _type: "companyStat",
    _id: `stat-${i}`,
    label: s.label,
    value: s.value,
    prefix: s.prefix ?? "",
    suffix: s.suffix ?? "",
    order: i,
  })
);

mkdirSync("sanity", { recursive: true });
const ndjson = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
writeFileSync("sanity/seed.ndjson", ndjson);
console.log(`Wrote ${docs.length} documents to sanity/seed.ndjson`);
