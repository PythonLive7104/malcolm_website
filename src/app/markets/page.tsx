import type { Metadata } from "next";
import { icons } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { Section } from "@/components/ui/Section";
import { markets } from "@/lib/data/misc";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Markets We Serve",
  description:
    "We supply aviation, marine, mining, manufacturing, power generation, government, distributors and industrial consumers with refined petroleum products.",
  alternates: { canonical: "/markets" },
};

export default function MarketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Markets we serve"
        title="Fuelling the sectors that keep economies moving"
        lead="From aviation to power generation, we tailor supply, storage and logistics to the demands of each industry we serve."
        image={images.logistics}
        crumbs={[{ label: "Markets We Serve", href: "/markets" }]}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => {
            const Icon = icons[m.icon];
            return (
              <div key={m.title} className="group rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-colors hover:border-amber-200">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-800 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-navy-900">
                  <Icon size={22} />
                </span>
                <h2 className="mt-5 text-lg font-bold text-navy-900">{m.title}</h2>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-navy-500">{m.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <CTABanner title="Supply built around your sector" lead="Tell us your industry and requirement — we'll structure the right supply solution." />
    </>
  );
}
