/**
 * Content for Markets, Operations, Compliance, HSE, Partners and About.
 * ⚠️ All PLACEHOLDER — for client review. Static (not CMS-managed).
 */
import type { icons } from "lucide-react";

type Icon = keyof typeof icons;

/* --- Markets We Serve ------------------------------------------------------ */
export const markets: { title: string; icon: Icon; body: string }[] = [
  { title: "Aviation industry", icon: "Plane", body: "Jet A-1 supply to airports, FBOs and cargo carriers with quality assurance and into-plane coordination." },
  { title: "Marine industry", icon: "Anchor", body: "Bunker fuels and marine gas oil delivered to vessels at key bunkering hubs." },
  { title: "Mining companies", icon: "Pickaxe", body: "Reliable diesel and fuel-oil supply to remote mining operations and haulage fleets." },
  { title: "Manufacturing sector", icon: "Factory", body: "Process fuels, base oils and feedstock for continuous industrial production." },
  { title: "Power generation", icon: "Zap", body: "HFO, diesel and gas supply to independent power producers and utilities." },
  { title: "Government agencies", icon: "Landmark", body: "Strategic reserve supply and tender fulfilment with full compliance documentation." },
  { title: "Petroleum distributors", icon: "Truck", body: "Wholesale volumes to regional distributors and downstream resellers." },
  { title: "Industrial consumers", icon: "Building2", body: "Bulk fuel and lubricant programmes tailored to large-scale industrial demand." },
];

/* --- Operations & Infrastructure ------------------------------------------ */
export const infrastructure: { title: string; icon: Icon; body: string }[] = [
  { title: "Storage terminals", icon: "Warehouse", body: "Coastal and inland terminals positioned on key trade routes." },
  { title: "Marine terminals", icon: "Ship", body: "Deep-water berths for tanker loading and discharge operations." },
  { title: "Pipelines", icon: "Waypoints", body: "Connected pipeline links between berths, tanks and loading gantries." },
  { title: "Loading facilities", icon: "Fuel", body: "Road, rail and marine loading racks with metered custody transfer." },
  { title: "Transportation assets", icon: "Truck", body: "Chartered vessels and road fleets for onward distribution." },
];

export const capacities: { label: string; value: string; note: string }[] = [
  { label: "Total storage capacity", value: "2.4M m³", note: "Across owned and leased terminals" },
  { label: "Largest single terminal", value: "640k m³", note: "Deep-water coastal hub" },
  { label: "Berth capacity", value: "Up to 120k DWT", note: "Vessel size accommodated" },
  { label: "Throughput", value: "9.5M t / yr", note: "Combined product throughput" },
];

/* --- Compliance & Certifications ------------------------------------------ */
export const registrations: { title: string; body: string }[] = [
  { title: "Corporate registrations", body: "Incorporated and registered to trade in each operating jurisdiction." },
  { title: "Petroleum licenses", body: "Licensed for the trading, storage and handling of petroleum products." },
  { title: "Import/export permits", body: "Valid permits for cross-border movement of refined products." },
  { title: "Environmental permits", body: "Terminal operations permitted under applicable environmental regulation." },
];

export const certifications: { code: string; label: string }[] = [
  { code: "ISO 9001", label: "Quality Management" },
  { code: "ISO 14001", label: "Environmental Management" },
  { code: "ISO 45001", label: "Occupational Health & Safety" },
  { code: "ISO 50001", label: "Energy Management" },
  { code: "OHSAS", label: "Safety Assessment" },
  { code: "ISO 29001", label: "Petroleum Sector QMS" },
];

export const governance: { title: string; body: string }[] = [
  { title: "AML / KYC compliance", body: "Every counterparty is screened under anti-money-laundering and know-your-customer procedures before onboarding." },
  { title: "Anti-corruption policies", body: "A zero-tolerance stance on bribery and corruption, aligned with international anti-bribery standards." },
];

/* --- Health, Safety & Environment ----------------------------------------- */
export const hsePolicies: { title: string; icon: Icon; body: string }[] = [
  { title: "HSE policy", icon: "ShieldCheck", body: "A board-level commitment to health, safety and environmental protection across all operations." },
  { title: "Safety standards", icon: "HardHat", body: "Operating procedures aligned with international petroleum-industry safety standards." },
  { title: "Environmental policy", icon: "Leaf", body: "Pollution prevention, spill containment and continuous reduction of environmental impact." },
  { title: "Sustainability initiatives", icon: "Recycle", body: "Energy-efficiency, emissions monitoring and responsible product stewardship programmes." },
  { title: "Emergency response", icon: "Siren", body: "Tested emergency-response and spill-contingency plans at every terminal." },
  { title: "Occupational safety", icon: "Users", body: "Ongoing training, competency assessment and a proactive safety culture." },
];

/* --- Strategic Partners & Clients ----------------------------------------- */
export type PartnerCategory = "Refinery" | "Shipping" | "Storage" | "International" | "Logistics";
export const partnerCategories: PartnerCategory[] = ["Refinery", "Shipping", "Storage", "International", "Logistics"];

export const partners: { name: string; category: PartnerCategory }[] = [
  { name: "Meridian Refining", category: "Refinery" },
  { name: "Cape Downstream", category: "Refinery" },
  { name: "Atlas Tankers", category: "Shipping" },
  { name: "BlueWave Marine", category: "Shipping" },
  { name: "Harbourpoint Storage", category: "Storage" },
  { name: "Delta Terminals", category: "Storage" },
  { name: "Continental Energy Group", category: "International" },
  { name: "Sahara Trading Co.", category: "International" },
  { name: "SwiftFreight Logistics", category: "Logistics" },
  { name: "PortLink Customs", category: "Logistics" },
  { name: "Northstar Inspection", category: "Logistics" },
  { name: "Gulf Bunkering", category: "Shipping" },
];

/* --- About: history + values + leadership --------------------------------- */
export const historyTimeline: { year: string; title: string; body: string }[] = [
  { year: "2007", title: "Founded", body: "Established as a regional refined-products trading desk." },
  { year: "2012", title: "First terminal", body: "Secured independent storage capacity at a coastal hub." },
  { year: "2016", title: "Fleet expansion", body: "Grew chartered tonnage to serve international supply contracts." },
  { year: "2020", title: "Pipeline links", body: "Added tank-to-vessel and pipeline transshipment capability." },
  { year: "2024", title: "Global footprint", body: "Operating across 35 countries with 2.4M m³ of storage." },
];

export const values: { title: string; icon: Icon; body: string }[] = [
  { title: "Integrity", icon: "ShieldCheck", body: "We conduct our business with honesty, transparency, accountability and adherence to ethical business practices." },
  { title: "Reliability", icon: "Clock", body: "We strive to ensure consistent product availability, dependable logistics support and timely service delivery." },
  { title: "Safety", icon: "HardHat", body: "Safety remains a fundamental principle throughout our operations, with a commitment to high industry standards and regulatory compliance." },
  { title: "Excellence", icon: "Award", body: "We continuously pursue operational excellence, innovation and improvement in every aspect of our business activities." },
  { title: "Partnership", icon: "Handshake", body: "We believe in building long-term relationships based on trust, mutual respect and shared success." },
];

export const leadership: { name: string; role: string; bio: string }[] = [
  { name: "A. Placeholder", role: "Chief Executive Officer", bio: "Two decades in physical petroleum trading and terminal operations. [Placeholder bio — client to supply.]" },
  { name: "B. Placeholder", role: "Chief Operating Officer", bio: "Leads terminal, marine and logistics operations across the network. [Placeholder bio.]" },
  { name: "C. Placeholder", role: "Head of Trading", bio: "Oversees the spot and term trading desks and counterparty relationships. [Placeholder bio.]" },
  { name: "D. Placeholder", role: "Head of Compliance & HSE", bio: "Responsible for governance, AML/KYC and safety across the group. [Placeholder bio.]" },
];
