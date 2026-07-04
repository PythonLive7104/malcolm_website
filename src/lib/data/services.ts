/**
 * Service segments. ⚠️ PLACEHOLDER copy for client review.
 * Later moves to Sanity `service`.
 */
import type { ImageKey } from "@/lib/images";
import type { icons } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: keyof typeof icons;
  intro: string;
  features: { title: string; body: string }[];
  image: ImageKey;
};

export const services: Service[] = [
  {
    slug: "trading",
    title: "Petroleum Trading",
    icon: "TrendingUp",
    image: "trading",
    intro:
      "A physical trading desk sourcing and supplying refined products across international markets — with the balance-sheet strength and counterparty relationships to move volume reliably.",
    features: [
      { title: "Spot trading", body: "Prompt cargoes and parcels priced against transparent published indices." },
      { title: "Contract supply", body: "Term supply agreements with fixed or floating pricing and agreed delivery schedules." },
      { title: "Wholesale distribution", body: "Bulk supply to distributors, resellers and large industrial end-users." },
      { title: "International trading", body: "Cross-border import/export execution with full documentation and compliance screening." },
    ],
  },
  {
    slug: "liquid-storage",
    title: "Liquid Petroleum Storage",
    icon: "Droplets",
    image: "liquid-storage",
    intro:
      "Dedicated storage for liquid and liquefied petroleum products — engineered for safe containment, product integrity and precise custody transfer.",
    features: [
      { title: "Liquid & liquefied products", body: "Storage for LPG, light distillates and other liquid petroleum grades in fit-for-purpose tankage." },
      { title: "Vapour recovery & containment", body: "Vapour-recovery systems and full secondary containment protect product and the environment." },
      { title: "Temperature & pressure control", body: "Pressurised and temperature-managed storage maintains product specification." },
      { title: "Metered custody transfer", body: "Calibrated metering at receipt and dispatch for accurate, auditable quantity transfer." },
    ],
  },
  {
    slug: "shipping",
    title: "Bulk Shipping Services",
    icon: "Ship",
    image: "shipping",
    intro:
      "Marine logistics and vessel chartering to move product between load ports, terminals and discharge points on schedule.",
    features: [
      { title: "Vessel chartering", body: "Spot and time charters across clean and dirty petroleum tankers." },
      { title: "Marine logistics", body: "Voyage planning, port coordination and laytime management." },
      { title: "Freight management", body: "Competitive freight procurement and demurrage control." },
      { title: "Cargo transportation", body: "Safe carriage of refined products with full marine insurance cover." },
    ],
  },
  {
    slug: "pipeline",
    title: "Pipeline Transshipment",
    icon: "Waypoints",
    image: "pipeline",
    intro:
      "Transshipment and transfer operations connecting terminals, tanks and vessels — minimising handling losses and turnaround time.",
    features: [
      { title: "Pipeline transportation", body: "Product movement through connected terminal pipeline infrastructure." },
      { title: "Tank-to-tank transfer", body: "Inter-tank movements for blending, consolidation and segregation." },
      { title: "Tank-to-vessel transfer", body: "Terminal loading operations onto berthed vessels." },
      { title: "Vessel-to-vessel transfer", body: "STS operations under strict safety and pollution-prevention protocols." },
    ],
  },
  {
    slug: "logistics",
    title: "Supply Chain & Logistics",
    icon: "Route",
    image: "logistics",
    intro:
      "End-to-end supply-chain services that keep cargo compliant and moving — from customs to final delivery.",
    features: [
      { title: "Customs clearance", body: "Import/export declarations and duty management in each jurisdiction." },
      { title: "Documentation", body: "Complete cargo, quality and title documentation with full traceability." },
      { title: "Inspection services", body: "Independent third-party quantity and quality inspection at load and discharge." },
      { title: "Cargo insurance", body: "Marine and transit cover arranged for every consignment." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
