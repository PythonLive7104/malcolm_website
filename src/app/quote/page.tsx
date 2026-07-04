import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import LeadForm from "@/components/site/LeadForm";
import { Section } from "@/components/ui/Section";
import { productBySlug } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request indicative pricing for refined petroleum products — tell us your grade, volume and delivery terms and our trading desk will respond within one business day.",
  alternates: { canonical: "/quote" },
};

const assurances = [
  "Response within one business day",
  "Spot and term supply options",
  "Independent quality inspection",
  "Full documentation & compliance",
];

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  const preset = product ? productBySlug(product) : undefined;

  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Get indicative pricing"
        lead={
          preset
            ? `Requesting a quote for ${preset.name}. Add your volume and delivery terms below.`
            : "Tell us the product, volume and delivery terms — our trading desk will come back to you promptly."
        }
        crumbs={[{ label: "Request a Quote", href: "/quote" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-navy-900">What you get</h2>
            <ul className="mt-6 space-y-3">
              {assurances.map((a) => (
                <li key={a} className="flex items-center gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-navy-900">
                    <Check size={14} />
                  </span>
                  <span className="text-navy-600">{a}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-[var(--radius-card)] bg-navy-800 p-6 text-white">
              <p className="font-semibold">Prefer to talk?</p>
              <p className="mt-1.5 text-sm text-white/70">
                Call our trading desk directly for time-sensitive enquiries — details on our contact page.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm formType="quote" defaultProduct={preset?.slug} />
          </div>
        </div>
      </Section>
    </>
  );
}
