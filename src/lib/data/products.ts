/**
 * Refined petroleum products catalogue.
 * ⚠️ PLACEHOLDER copy + spec values — indicative only, for the client to confirm
 * against real product data sheets. (Later this moves into Sanity `product`.)
 */
import type { ImageKey } from "@/lib/images";

export type Spec = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  applications: string[];
  specs: Spec[];
  image: ImageKey;
};

export const products: Product[] = [
  {
    slug: "en590-diesel",
    name: "EN590 10ppm Diesel",
    category: "Middle distillates",
    tagline: "Ultra-low-sulfur automotive gas oil",
    summary:
      "EN590-compliant automotive diesel with 10ppm sulfur content, suitable for modern high-pressure common-rail engines and meeting European road-fuel specifications.",
    applications: ["Road transport", "Power generation", "Industrial machinery", "Marine auxiliary"],
    specs: [
      { label: "Sulfur content", value: "≤ 10 mg/kg" },
      { label: "Density @ 15°C", value: "820–845 kg/m³" },
      { label: "Cetane number", value: "≥ 51" },
      { label: "Flash point", value: "≥ 55 °C" },
      { label: "Cold filter plugging point", value: "≤ −5 °C (grade dependent)" },
      { label: "Water content", value: "≤ 200 mg/kg" },
    ],
    image: "refinery",
  },
  {
    slug: "jet-fuel-a1",
    name: "Jet Fuel A1",
    category: "Aviation fuels",
    tagline: "Kerosene-type aviation turbine fuel",
    summary:
      "Jet A-1 aviation turbine fuel meeting international DEF STAN 91-091 / ASTM D1655 specifications, supplied with full quality certification and batch traceability.",
    applications: ["Commercial aviation", "Cargo & charter fleets", "Military aviation", "Ground turbines"],
    specs: [
      { label: "Freezing point", value: "≤ −47 °C" },
      { label: "Flash point", value: "≥ 38 °C" },
      { label: "Density @ 15°C", value: "775–840 kg/m³" },
      { label: "Sulfur content", value: "≤ 0.30 % m/m" },
      { label: "Smoke point", value: "≥ 25 mm" },
      { label: "Specification", value: "DEF STAN 91-091 / ASTM D1655" },
    ],
    image: "trading",
  },
  {
    slug: "d6-virgin-fuel-oil",
    name: "D6 Virgin Fuel Oil",
    category: "Residual fuels",
    tagline: "Bunker-grade residual fuel oil",
    summary:
      "D6 virgin residual fuel oil for large industrial burners and power stations, offered on spot and term contracts with independent SGS inspection.",
    applications: ["Power plants", "Industrial boilers", "Marine bunkering", "Heavy manufacturing"],
    specs: [
      { label: "Density @ 15°C", value: "890–990 kg/m³" },
      { label: "Sulfur content", value: "≤ 2.0 % m/m" },
      { label: "Viscosity @ 50°C", value: "180–380 cSt" },
      { label: "Flash point", value: "≥ 66 °C" },
      { label: "Pour point", value: "≤ 30 °C" },
      { label: "Water & sediment", value: "≤ 1.0 %" },
    ],
    image: "refinery",
  },
  {
    slug: "mazut-m100",
    name: "Mazut M100",
    category: "Residual fuels",
    tagline: "Heavy residual fuel oil (GOST 10585-99)",
    summary:
      "Mazut M100 heavy fuel oil to GOST 10585-99, available in multiple sulfur grades for power generation and large-scale industrial heating.",
    applications: ["Power generation", "District heating", "Industrial furnaces", "Marine fuel blending"],
    specs: [
      { label: "Standard", value: "GOST 10585-99" },
      { label: "Sulfur grade", value: "0.5% / 1.0% / 2.0% / 3.5%" },
      { label: "Density @ 20°C", value: "≤ 0.99 g/cm³" },
      { label: "Viscosity @ 80°C", value: "≤ 118 cSt" },
      { label: "Flash point", value: "≥ 90 °C" },
      { label: "Pour point", value: "≤ 25 °C" },
    ],
    image: "pipeline",
  },
  {
    slug: "lpg",
    name: "Liquefied Petroleum Gas (LPG)",
    category: "Light ends",
    tagline: "Propane / butane mix",
    summary:
      "Commercial propane, butane and mixed LPG for domestic, commercial and autogas applications, supplied by pressurised road, rail and marine parcels.",
    applications: ["Domestic heating & cooking", "Autogas (LPG)", "Petrochemical feedstock", "Commercial catering"],
    specs: [
      { label: "Composition", value: "Propane / Butane / Mix" },
      { label: "Vapour pressure @ 40°C", value: "≤ 1550 kPa" },
      { label: "Total sulfur", value: "≤ 50 mg/kg" },
      { label: "Density @ 15°C", value: "500–580 kg/m³" },
      { label: "Copper strip corrosion", value: "Class 1" },
      { label: "Residue on evaporation", value: "≤ 0.05 %" },
    ],
    image: "logistics",
  },
  {
    slug: "gasoline",
    name: "Gasoline",
    category: "Light distillates",
    tagline: "Unleaded motor spirit (RON 91/95/98)",
    summary:
      "Unleaded gasoline in multiple octane grades meeting EN228 specifications, with optional ethanol blending and full quality certification.",
    applications: ["Passenger vehicles", "Light commercial fleets", "Small engines", "Marine outboard"],
    specs: [
      { label: "Octane (RON)", value: "91 / 95 / 98" },
      { label: "Sulfur content", value: "≤ 10 mg/kg" },
      { label: "Density @ 15°C", value: "720–775 kg/m³" },
      { label: "Benzene content", value: "≤ 1.0 % v/v" },
      { label: "Vapour pressure", value: "45–90 kPa (seasonal)" },
      { label: "Specification", value: "EN228" },
    ],
    image: "trading",
  },
  {
    slug: "bitumen",
    name: "Bitumen",
    category: "Heavy products",
    tagline: "Penetration-grade & viscosity-grade bitumen",
    summary:
      "Penetration and viscosity-grade bitumen for road construction and waterproofing, supplied in bulk (hot), bulk bags and drums.",
    applications: ["Road paving & asphalt", "Waterproofing membranes", "Roofing", "Industrial coatings"],
    specs: [
      { label: "Penetration grades", value: "60/70, 80/100, 40/50" },
      { label: "Softening point", value: "46–56 °C" },
      { label: "Ductility @ 25°C", value: "≥ 100 cm" },
      { label: "Flash point", value: "≥ 230 °C" },
      { label: "Solubility", value: "≥ 99 %" },
      { label: "Loss on heating", value: "≤ 0.5 %" },
    ],
    image: "pipeline",
  },
  {
    slug: "petroleum-coke",
    name: "Petroleum Coke",
    category: "Solid carbon",
    tagline: "Fuel-grade & calcined petcoke",
    summary:
      "Fuel-grade and calcined petroleum coke for cement, power and aluminium industries, supplied in bulk marine and containerised parcels.",
    applications: ["Cement kilns", "Power generation", "Aluminium anodes", "Steel & foundry"],
    specs: [
      { label: "Fixed carbon", value: "≥ 85 %" },
      { label: "Sulfur content", value: "3.0–6.5 %" },
      { label: "Ash content", value: "≤ 0.5 %" },
      { label: "Moisture", value: "≤ 8 %" },
      { label: "Volatile matter", value: "9–12 %" },
      { label: "Gross calorific value", value: "≥ 8,000 kcal/kg" },
    ],
    image: "logistics",
  },
  {
    slug: "base-oil",
    name: "Base Oil",
    category: "Lubricant feedstock",
    tagline: "Group I / II / III base stocks",
    summary:
      "Group I, II and III base oils for lubricant blending, supplied in flexi-tanks, ISO tanks and drums with full technical data sheets.",
    applications: ["Lubricant blending", "Metalworking fluids", "Process oils", "Greases"],
    specs: [
      { label: "Groups", value: "SN150 / SN500 / N70 / Group III" },
      { label: "Viscosity index", value: "95–130+" },
      { label: "Flash point", value: "≥ 200 °C" },
      { label: "Pour point", value: "≤ −9 °C" },
      { label: "Sulfur content", value: "Group dependent" },
      { label: "Colour (ASTM)", value: "≤ 1.5" },
    ],
    image: "refinery",
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
