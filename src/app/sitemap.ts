import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getProducts, getArticles, getJobs } from "@/lib/cms";

/**
 * XML sitemap (served at /sitemap.xml). Static routes + dynamic content, pulled
 * through the CMS layer so it reflects Sanity content when configured (and the
 * mock content otherwise).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const [products, articles, jobs] = await Promise.all([
    getProducts(),
    getArticles(),
    getJobs(),
  ]);

  const staticRoutes = [
    "", "/about", "/products", "/services", "/operations", "/markets",
    "/compliance", "/hse", "/partners", "/news", "/careers", "/contact",
    "/quote", "/privacy", "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const newsRoutes = articles.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const jobRoutes = jobs.map((j) => ({
    url: `${base}/careers/${j.slug}`,
    lastModified: new Date(j.postedAt),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...newsRoutes, ...jobRoutes];
}
