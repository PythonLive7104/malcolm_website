/**
 * News & Market Intelligence — MOCK data.
 * ⚠️ In production this is fetched from Sanity (`newsArticle`) via GROQ + ISR.
 * This mock lets the list/detail pages and JSON-LD render before the CMS is wired.
 */
import type { ImageKey } from "@/lib/images";

export const newsCategories = [
  "Oil Market",
  "Energy News",
  "Shipping",
  "Company",
  "Industry Insights",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type Article = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // ISO
  author: string;
  excerpt: string;
  body: string[];
  image: ImageKey;
};

export const articles: Article[] = [
  {
    slug: "q3-refined-products-outlook",
    title: "Q3 refined-products outlook: middle distillates stay firm",
    category: "Oil Market",
    date: "2026-06-24",
    author: "Trading Desk",
    excerpt:
      "Diesel cracks held above seasonal norms through the quarter as refinery maintenance tightened availability across key hubs.",
    body: [
      "Middle-distillate margins remained resilient through the third quarter, supported by a heavier-than-usual refinery maintenance schedule and steady industrial demand.",
      "We expect balances to stay tight into the winter heating season, with arbitrage economics continuing to reward flexible storage and prompt supply capability.",
      "As always, this commentary is illustrative placeholder content and does not constitute trading advice.",
    ],
    image: "refinery",
  },
  {
    slug: "new-storage-capacity-online",
    title: "Additional storage capacity brought online at coastal hub",
    category: "Company",
    date: "2026-06-10",
    author: "Corporate Communications",
    excerpt:
      "A new block of segregated tankage expands multi-grade storage and throughput at our largest coastal terminal.",
    body: [
      "We have commissioned additional segregated tankage at our principal coastal terminal, increasing multi-grade storage flexibility for trading and term-lease customers.",
      "The expansion adds vapour-recovery-equipped capacity and shortens vessel turnaround times.",
    ],
    image: "liquid-storage",
  },
  {
    slug: "freight-rates-clean-tankers",
    title: "Clean-tanker freight: what shifting rates mean for delivered cost",
    category: "Shipping",
    date: "2026-05-28",
    author: "Chartering Team",
    excerpt:
      "Volatility in clean-tanker freight is reshaping delivered economics on medium-haul routes. Here's how we manage it.",
    body: [
      "Clean-tanker freight has seen renewed volatility, changing the delivered economics of several medium-haul routes.",
      "Active freight procurement and demurrage control remain central to protecting landed cost for our supply customers.",
      "Illustrative placeholder article.",
    ],
    image: "shipping",
  },
  {
    slug: "aviation-fuel-demand-recovery",
    title: "Aviation fuel demand and the supply implications",
    category: "Industry Insights",
    date: "2026-05-12",
    author: "Market Intelligence",
    excerpt:
      "Sustained growth in air travel continues to pull on Jet A-1 supply chains and into-plane logistics.",
    body: [
      "Continued growth in passenger and cargo aviation keeps pressure on Jet A-1 supply chains and quality-assured into-plane logistics.",
      "Reliable certification and batch traceability are increasingly a differentiator for aviation-fuel suppliers.",
      "Placeholder content for demonstration.",
    ],
    image: "trading",
  },
  {
    slug: "energy-transition-downstream",
    title: "Energy transition: what it means for downstream trading",
    category: "Energy News",
    date: "2026-04-30",
    author: "Strategy",
    excerpt:
      "Decarbonisation is reshaping product slates and demand centres. We look at the near-term downstream picture.",
    body: [
      "The energy transition is gradually reshaping product slates, demand centres and the economics of downstream trading.",
      "We continue to invest in efficiency and emissions monitoring while meeting present-day demand for refined products.",
      "Placeholder editorial content.",
    ],
    image: "pipeline",
  },
  {
    slug: "compliance-first-trading-note",
    title: "Why compliance-first trading protects counterparties",
    category: "Industry Insights",
    date: "2026-04-15",
    author: "Compliance",
    excerpt:
      "AML/KYC screening and robust documentation aren't red tape — they protect every party in the transaction.",
    body: [
      "Rigorous AML/KYC screening and complete documentation reduce counterparty risk for everyone in the chain.",
      "Our onboarding process is designed to be thorough yet efficient, so compliant counterparties can transact quickly.",
      "Placeholder article.",
    ],
    image: "logistics",
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
