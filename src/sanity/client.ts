import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

/**
 * Shared Sanity read client. Only instantiated when a project id is configured;
 * otherwise null and callers use their mock fallback.
 */
export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // fast, cached reads; on-demand revalidation keeps pages fresh
      perspective: "published",
    })
  : null;

/**
 * Typed GROQ fetch with ISR. Revalidates every hour by default; the Sanity
 * publish webhook (/api/revalidate) also busts the relevant paths on demand.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params, {
    next: { revalidate: 3600, tags },
  });
}
