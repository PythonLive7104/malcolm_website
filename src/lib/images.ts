/**
 * Central image registry.
 *
 * ⚠️ DEMO IMAGES — the files in /public/images/demo are keyword-themed
 * placeholders (via LoremFlickr) standing in until the client's real photography
 * is dropped in. To swap: replace the file at the same path (keep the filename)
 * OR repoint `src` here. `alt` text is real and SEO-relevant — keep/refine it.
 *
 * Every image below is used through next/image, so it gets automatic
 * resizing, WebP conversion and lazy-loading (SEO requirement §5.10/§5.11).
 */

export type SiteImage = { src: string; alt: string; width: number; height: number };

const demo = "/images/demo";

export const images = {
  hero: {
    src: `${demo}/hero.jpg`,
    alt: "Oil tanker berthed at a petroleum import terminal at dusk",
    width: 1600,
    height: 900,
  },
  refinery: {
    src: `${demo}/refinery.jpg`,
    alt: "Refinery processing units and distillation towers",
    width: 1600,
    height: 900,
  },
  about: {
    src: `${demo}/about.jpg`,
    alt: "Petroleum processing plant silhouetted against a sunset sky",
    width: 1600,
    height: 1000,
  },
  operations: {
    src: `${demo}/operations.jpg`,
    alt: "Aerial view of an oil storage terminal and loading infrastructure",
    width: 1400,
    height: 900,
  },
  // Segment imagery, keyed to the segment slug in lib/site.ts
  trading: {
    src: `${demo}/trading.jpg`,
    alt: "Refinery lit up at night representing global petroleum trading operations",
    width: 1200,
    height: 900,
  },
  "liquid-storage": {
    src: `${demo}/liquid-storage.jpg`,
    alt: "Riveted steel exterior of a large petroleum storage tank",
    width: 1200,
    height: 900,
  },
  shipping: {
    src: `${demo}/shipping.jpg`,
    alt: "Crude and product tanker vessel underway at sea",
    width: 1200,
    height: 900,
  },
  pipeline: {
    src: `${demo}/pipeline.jpg`,
    alt: "Industrial pipeline network for product transshipment",
    width: 1200,
    height: 900,
  },
  logistics: {
    src: `${demo}/logistics.jpg`,
    alt: "Port container and cargo yard representing supply-chain logistics",
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
