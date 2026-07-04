import type { Metadata } from "next";
import { icons } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { hsePolicies } from "@/lib/data/misc";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Health, Safety & Environment (HSE)",
  description:
    "Our HSE policy, safety standards, environmental policy, sustainability initiatives, emergency response plans and occupational safety programmes.",
  alternates: { canonical: "/hse" },
};

export default function HsePage() {
  return (
    <>
      <PageHero
        eyebrow="Health, Safety & Environment"
        title="Zero-harm operations, by design"
        lead="A board-level commitment to protecting people and the environment runs through every terminal, vessel and transaction."
        image={images.about}
        crumbs={[{ label: "Health, Safety & Environment", href: "/hse" }]}
      />

      <Section>
        <SectionHeading eyebrow="Our approach" title="HSE across the operation" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hsePolicies.map((p) => {
            const Icon = icons[p.icon];
            return (
              <div key={p.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-800 text-amber-500">
                  <Icon size={22} />
                </span>
                <h2 className="mt-5 text-lg font-bold text-navy-900">{p.title}</h2>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-navy-500">{p.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Commitment band */}
      <Section dark className="!py-16">
        <div className="rounded-2xl border border-white/10 bg-navy-900 p-8 lg:p-12">
          <p className="eyebrow text-amber-400">Our commitment</p>
          <blockquote className="mt-5 max-w-3xl text-2xl font-semibold leading-snug text-white lg:text-3xl">
            &ldquo;We believe every incident is preventable. Safety and
            environmental protection are not trade-offs against commercial
            performance — they are the foundation of it.&rdquo;
          </blockquote>
        </div>
      </Section>

      <CTABanner title="Partner with a safety-first operator" lead="Ask us about our HSE standards and terminal safety record." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "Our compliance", href: "/compliance" }} />
    </>
  );
}
