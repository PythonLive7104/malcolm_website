import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** robots.txt (served at /robots.txt) referencing the sitemap. */
export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
