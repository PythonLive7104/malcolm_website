/**
 * Central site configuration.
 *
 * ⚠️ PLACEHOLDER CONTENT — flagged per brief §7.
 * Company name, stats, contact details and copy below are stand-ins for the
 * client to replace. When Sanity is wired up (build step 5), the stat strip,
 * leadership, partners etc. move into the CMS; this file keeps the static
 * chrome (nav structure, contact, socials).
 */

export const site = {
  name: "Pro Petroleum LLC", // brand name used in copy + logo
  legalName: "Pro Petroleum LLC", // legal name (footer, JSON-LD)
  tagline: "Global refined-products trading, storage & marine logistics.",
  description:
    "Pro Petroleum LLC trades, stores and ships refined petroleum products worldwide — spot and contract supply, bulk chartering and pipeline transshipment across key energy corridors.",
  // Base URL for canonicals, sitemap, robots and the OG share image. Reads
  // NEXT_PUBLIC_SITE_URL so the deployed URL (e.g. the Vercel domain) is used
  // for social previews; falls back to the production domain at launch.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.propetroleumllc.com",
  email: "info@propetroleumllc.com",
  phone: "+1 (000) 000-0000", // PLACEHOLDER — client to supply
  address: {
    line1: "4710 4th Street",
    city: "Lubbock",
    region: "Texas",
    postalCode: "79416",
    country: "United States",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/example", // PLACEHOLDER
  },
} as const;

/** Headline stats for the homepage strip — client-editable placeholders. */
export const stats: { label: string; value: number; suffix?: string; prefix?: string }[] = [
  { label: "Storage capacity", value: 2.4, suffix: "M m³" },
  { label: "Chartered vessels", value: 40, suffix: "+" },
  { label: "Countries served", value: 35, suffix: "" },
  { label: "Years in operation", value: 18, suffix: "" },
];

/** Core business segments — the homepage card grid. */
export const segments = [
  {
    slug: "trading",
    title: "Petroleum Trading",
    blurb:
      "Spot and contract supply of refined products, wholesale distribution and international trading desks.",
    icon: "TrendingUp",
    href: "/services#trading",
  },
  {
    slug: "liquid-storage",
    title: "Liquid Petroleum Storage",
    blurb:
      "Dedicated liquid and liquefied petroleum storage with vapour recovery, containment and precise custody transfer.",
    icon: "Droplets",
    href: "/services#liquid-storage",
  },
  {
    slug: "shipping",
    title: "Bulk Shipping",
    blurb:
      "Vessel chartering, marine logistics and freight management across major shipping lanes.",
    icon: "Ship",
    href: "/services#shipping",
  },
  {
    slug: "pipeline",
    title: "Pipeline Transshipment",
    blurb:
      "Tank-to-tank, tank-to-vessel and vessel-to-vessel transfer with pipeline transportation.",
    icon: "Waypoints",
    href: "/services#pipeline",
  },
  {
    slug: "logistics",
    title: "Supply Chain & Logistics",
    blurb:
      "Customs clearance, documentation, inspection services and cargo insurance end to end.",
    icon: "Route",
    href: "/services#logistics",
  },
] as const;

/**
 * Primary navigation as a mega-menu structure.
 * Groups render as columns in the desktop mega panel and as accordions on mobile.
 */
export type NavChild = { title: string; href: string; desc?: string };
export type NavGroup = { title: string; href: string; children?: NavChild[] };

export const nav: NavGroup[] = [
  {
    title: "Products",
    href: "/products",
    children: [
      { title: "EN590 10ppm Diesel", href: "/products/en590-diesel" },
      { title: "Jet Fuel A1", href: "/products/jet-fuel-a1" },
      { title: "D6 Virgin Fuel Oil", href: "/products/d6-virgin-fuel-oil" },
      { title: "Mazut M100", href: "/products/mazut-m100" },
      { title: "Liquefied Petroleum Gas (LPG)", href: "/products/lpg" },
      { title: "Gasoline", href: "/products/gasoline" },
      { title: "Bitumen", href: "/products/bitumen" },
      { title: "Petroleum Coke", href: "/products/petroleum-coke" },
      { title: "Base Oil", href: "/products/base-oil" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    children: [
      { title: "Petroleum Trading", href: "/services#trading" },
      { title: "Liquid Petroleum Storage", href: "/services#liquid-storage" },
      { title: "Bulk Shipping Services", href: "/services#shipping" },
      { title: "Pipeline Transshipment", href: "/services#pipeline" },
      { title: "Supply Chain & Logistics", href: "/services#logistics" },
    ],
  },
  {
    title: "Operations",
    href: "/operations",
    children: [
      { title: "Operations & Infrastructure", href: "/operations" },
      { title: "Markets We Serve", href: "/markets" },
      { title: "Strategic Partners & Clients", href: "/partners" },
    ],
  },
  {
    title: "Company",
    href: "/about",
    children: [
      { title: "About Us", href: "/about" },
      { title: "Compliance & Certifications", href: "/compliance" },
      { title: "Health, Safety & Environment", href: "/hse" },
      { title: "News & Market Intelligence", href: "/news" },
      { title: "Careers", href: "/careers" },
      { title: "Contact Us", href: "/contact" },
    ],
  },
];

/** Footer link columns. */
export const footerNav: NavGroup[] = [
  {
    title: "Products",
    href: "/products",
    children: [
      { title: "EN590 Diesel", href: "/products/en590-diesel" },
      { title: "Jet Fuel A1", href: "/products/jet-fuel-a1" },
      { title: "Mazut M100", href: "/products/mazut-m100" },
      { title: "LPG", href: "/products/lpg" },
      { title: "All products", href: "/products" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    children: [
      { title: "Petroleum Trading", href: "/services#trading" },
      { title: "Liquid Petroleum Storage", href: "/services#liquid-storage" },
      { title: "Bulk Shipping", href: "/services#shipping" },
      { title: "Pipeline Transshipment", href: "/services#pipeline" },
    ],
  },
  {
    title: "Company",
    href: "/about",
    children: [
      { title: "About Us", href: "/about" },
      { title: "Operations", href: "/operations" },
      { title: "Markets We Serve", href: "/markets" },
      { title: "News", href: "/news" },
      { title: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Compliance",
    href: "/compliance",
    children: [
      { title: "Certifications", href: "/compliance" },
      { title: "Health, Safety & Environment", href: "/hse" },
      { title: "Strategic Partners", href: "/partners" },
      { title: "Contact", href: "/contact" },
    ],
  },
];
