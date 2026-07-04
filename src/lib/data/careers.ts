/**
 * Careers — MOCK data.
 * ⚠️ In production this is fetched from Sanity (`jobListing`) via GROQ + ISR.
 */
export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string; // Full-time / Contract
  department: string;
  postedAt: string; // ISO
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "petroleum-trader",
    title: "Petroleum Trader — Middle Distillates",
    location: "Rotterdam, NL",
    type: "Full-time",
    department: "Trading",
    postedAt: "2026-06-18",
    summary:
      "Execute spot and term trades across middle distillates, managing counterparty relationships and position risk.",
    responsibilities: [
      "Originate and execute physical trades across diesel and gasoil grades",
      "Manage counterparty relationships and negotiate contract terms",
      "Monitor market fundamentals and hedge exposure appropriately",
    ],
    requirements: [
      "5+ years physical petroleum trading experience",
      "Strong grasp of pricing, logistics and credit risk",
      "Excellent commercial and communication skills",
    ],
  },
  {
    slug: "terminal-operations-manager",
    title: "Terminal Operations Manager",
    location: "Fujairah, UAE",
    type: "Full-time",
    department: "Operations",
    postedAt: "2026-06-05",
    summary:
      "Lead day-to-day terminal operations, ensuring safe, compliant and efficient product handling and vessel turnaround.",
    responsibilities: [
      "Oversee terminal and marine loading operations",
      "Ensure HSE compliance and incident-free operations",
      "Coordinate vessel scheduling and throughput planning",
    ],
    requirements: [
      "Proven terminal or storage management experience",
      "Strong HSE and regulatory knowledge",
      "Leadership of multidisciplinary operations teams",
    ],
  },
  {
    slug: "marine-chartering-analyst",
    title: "Marine Chartering Analyst",
    location: "Singapore",
    type: "Full-time",
    department: "Shipping",
    postedAt: "2026-05-22",
    summary:
      "Support the chartering desk with freight analysis, voyage economics and demurrage management.",
    responsibilities: [
      "Model voyage economics and freight scenarios",
      "Support spot and time-charter negotiations",
      "Track laytime and manage demurrage claims",
    ],
    requirements: [
      "Background in shipping, chartering or logistics",
      "Strong analytical and spreadsheet skills",
      "Knowledge of tanker markets an advantage",
    ],
  },
  {
    slug: "compliance-officer",
    title: "Compliance Officer (AML/KYC)",
    location: "Rotterdam, NL",
    type: "Full-time",
    department: "Compliance",
    postedAt: "2026-05-08",
    summary:
      "Own counterparty onboarding and ongoing AML/KYC screening across the trading business.",
    responsibilities: [
      "Conduct KYC due diligence and sanctions screening",
      "Maintain AML procedures and reporting",
      "Advise trading teams on compliance requirements",
    ],
    requirements: [
      "Experience in commodity or financial-services compliance",
      "Knowledge of AML/KYC and sanctions regimes",
      "Detail-oriented with strong documentation discipline",
    ],
  },
];

export const jobBySlug = (slug: string) => jobs.find((j) => j.slug === slug);

export const recruitmentSteps = [
  { title: "Application", body: "Submit your CV and covering note through the role's apply link." },
  { title: "Screening", body: "Our talent team reviews your experience against the role." },
  { title: "Interviews", body: "Two to three conversations with the hiring team and desk leads." },
  { title: "Offer", body: "References, compliance checks and a formal offer." },
];

export const benefits = [
  "Competitive salary + performance bonus",
  "International career mobility",
  "Private medical & insurance cover",
  "Pension / retirement contribution",
  "Professional development budget",
  "Relocation support where relevant",
];
