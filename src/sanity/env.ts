/**
 * Sanity environment configuration.
 *
 * The whole app degrades gracefully: when NEXT_PUBLIC_SANITY_PROJECT_ID is unset
 * (as in this demo), `sanityConfigured` is false and the data layer falls back to
 * the local mock content in src/lib/data/*. Set the env vars (see README) to go
 * live against a real Sanity project.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

/** Read token for private datasets / drafts (server-only, optional). */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

/** True only when a project id is present — gates all live CMS reads. */
export const sanityConfigured = projectId.length > 0;
