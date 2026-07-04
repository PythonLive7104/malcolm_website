import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId, sanityConfigured } from "./env";

const builder = sanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

/** Build an optimised Sanity CDN URL for an image reference. */
export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}
