/**
 * CMS data-access layer.
 *
 * Every getter returns Sanity content when a project is configured, otherwise
 * the local mock content in src/lib/data/*. Pages import ONLY from here, so
 * switching to live Sanity needs no page changes — just the env vars.
 *
 * Normalised shape: image fields always resolve to `SiteImage`
 * ({ src, alt, width, height }) whether they come from /public or Sanity's CDN.
 */
import { sanityConfigured } from "@/sanity/env";
import { sanityFetch } from "@/sanity/client";
import * as Q from "@/sanity/queries";
import { images, type SiteImage } from "@/lib/images";

import { products as mockProducts, type Spec } from "@/lib/data/products";
import { services as mockServices } from "@/lib/data/services";
import { articles as mockArticles, type NewsCategory } from "@/lib/data/news";
import { jobs as mockJobs, type Job } from "@/lib/data/careers";
import {
  leadership as mockTeam,
  certifications as mockCerts,
  partners as mockPartners,
  type PartnerCategory,
} from "@/lib/data/misc";
import { stats as mockStats } from "@/lib/site";

/* --- Normalised types (what pages consume) -------------------------------- */
export type ProductDoc = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  applications: string[];
  specs: Spec[];
  image: SiteImage;
};
export type ServiceDoc = {
  slug: string;
  title: string;
  icon: string;
  intro: string;
  features: { title: string; body: string }[];
  image: SiteImage;
};
export type ArticleDoc = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  author: string;
  excerpt: string;
  body: string[];
  image: SiteImage;
};
export type StatDoc = { label: string; value: number; prefix?: string; suffix?: string };
export type TeamDoc = { name: string; role: string; bio: string };
export type CertDoc = { code: string; label: string };
export type PartnerDoc = { name: string; category: PartnerCategory };
export type { Job };

/** Guarantee a usable image even if a Sanity editor left the field empty. */
function ensureImage(img: Partial<SiteImage> | undefined | null, fallback: SiteImage): SiteImage {
  if (!img || !img.src) return fallback;
  return {
    src: img.src,
    alt: img.alt || fallback.alt,
    width: img.width || fallback.width,
    height: img.height || fallback.height,
  };
}

/* --- Products ------------------------------------------------------------- */
export async function getProducts(): Promise<ProductDoc[]> {
  if (sanityConfigured) {
    const rows = await sanityFetch<ProductDoc[]>(Q.productsQuery, {}, ["product"]);
    if (rows) return rows.map((p) => ({ ...p, image: ensureImage(p.image, images.refinery) }));
  }
  return mockProducts.map((p) => ({ ...p, image: images[p.image] }));
}

export async function getProduct(slug: string): Promise<ProductDoc | null> {
  if (sanityConfigured) {
    const p = await sanityFetch<ProductDoc | null>(Q.productBySlugQuery, { slug }, ["product"]);
    if (p) return { ...p, image: ensureImage(p.image, images.refinery) };
    return null;
  }
  const m = mockProducts.find((p) => p.slug === slug);
  return m ? { ...m, image: images[m.image] } : null;
}

export async function getProductSlugs(): Promise<string[]> {
  if (sanityConfigured) return (await sanityFetch<string[]>(Q.productSlugsQuery)) ?? [];
  return mockProducts.map((p) => p.slug);
}

/* --- Services ------------------------------------------------------------- */
export async function getServices(): Promise<ServiceDoc[]> {
  if (sanityConfigured) {
    const rows = await sanityFetch<ServiceDoc[]>(Q.servicesQuery, {}, ["service"]);
    if (rows) return rows.map((s) => ({ ...s, image: ensureImage(s.image, images.operations) }));
  }
  return mockServices.map((s) => ({ ...s, image: images[s.image] }));
}

/* --- News ----------------------------------------------------------------- */
export async function getArticles(): Promise<ArticleDoc[]> {
  if (sanityConfigured) {
    const rows = await sanityFetch<ArticleDoc[]>(Q.articlesQuery, {}, ["newsArticle"]);
    if (rows) return rows.map((a) => ({ ...a, body: a.body?.filter(Boolean) ?? [], image: ensureImage(a.image, images.trading) }));
  }
  return mockArticles.map((a) => ({ ...a, image: images[a.image] }));
}

export async function getArticle(slug: string): Promise<ArticleDoc | null> {
  if (sanityConfigured) {
    const a = await sanityFetch<ArticleDoc | null>(Q.articleBySlugQuery, { slug }, ["newsArticle"]);
    if (a) return { ...a, body: a.body?.filter(Boolean) ?? [], image: ensureImage(a.image, images.trading) };
    return null;
  }
  const m = mockArticles.find((a) => a.slug === slug);
  return m ? { ...m, image: images[m.image] } : null;
}

export async function getArticleSlugs(): Promise<string[]> {
  if (sanityConfigured) return (await sanityFetch<string[]>(Q.articleSlugsQuery)) ?? [];
  return mockArticles.map((a) => a.slug);
}

/* --- Careers -------------------------------------------------------------- */
export async function getJobs(): Promise<Job[]> {
  if (sanityConfigured) return (await sanityFetch<Job[]>(Q.jobsQuery, {}, ["jobListing"])) ?? [];
  return mockJobs;
}

export async function getJob(slug: string): Promise<Job | null> {
  if (sanityConfigured) return (await sanityFetch<Job | null>(Q.jobBySlugQuery, { slug }, ["jobListing"])) ?? null;
  return mockJobs.find((j) => j.slug === slug) ?? null;
}

export async function getJobSlugs(): Promise<string[]> {
  if (sanityConfigured) return (await sanityFetch<string[]>(Q.jobSlugsQuery)) ?? [];
  return mockJobs.map((j) => j.slug);
}

/* --- Homepage / About bits ------------------------------------------------ */
export async function getStats(): Promise<StatDoc[]> {
  if (sanityConfigured) {
    const rows = await sanityFetch<StatDoc[]>(Q.statsQuery, {}, ["companyStat"]);
    if (rows && rows.length) return rows;
  }
  return mockStats;
}

export async function getTeam(): Promise<TeamDoc[]> {
  if (sanityConfigured) {
    const rows = await sanityFetch<TeamDoc[]>(Q.teamQuery, {}, ["teamMember"]);
    if (rows && rows.length) return rows;
  }
  return mockTeam;
}

export async function getCertifications(): Promise<CertDoc[]> {
  if (sanityConfigured) {
    const rows = await sanityFetch<CertDoc[]>(Q.certificationsQuery, {}, ["certification"]);
    if (rows && rows.length) return rows;
  }
  return mockCerts;
}

export async function getPartners(): Promise<PartnerDoc[]> {
  if (sanityConfigured) {
    const rows = await sanityFetch<PartnerDoc[]>(Q.partnersQuery, {}, ["partnerLogo"]);
    if (rows && rows.length) return rows;
  }
  return mockPartners;
}
