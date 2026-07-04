import type { Metadata } from "next";
import { BadgeCheck, ScrollText } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { registrations, governance } from "@/lib/data/misc";
import { getCertifications } from "@/lib/cms";
import { images } from "@/lib/images";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Compliance & Certifications",
  description:
    "Corporate registrations, petroleum licenses, import/export and environmental permits, ISO certifications and AML/KYC and anti-corruption governance.",
  alternates: { canonical: "/compliance" },
};

export default async function CompliancePage() {
  const certifications = await getCertifications();
  return (
    <>
      <PageHero
        eyebrow="Compliance & certifications"
        title="Trading you can trust"
        lead="Full regulatory licensing, internationally recognised certifications and robust AML/KYC and anti-corruption governance underpin every transaction."
        image={images.refinery}
        crumbs={[{ label: "Compliance & Certifications", href: "/compliance" }]}
      />

      {/* Registrations & permits */}
      <Section>
        <SectionHeading eyebrow="Licensing" title="Registrations & permits" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {registrations.map((r) => (
            <div key={r.title} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <ScrollText size={20} />
              </span>
              <div>
                <h3 className="font-bold text-navy-900">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ISO badge grid */}
      <Section dark>
        <SectionHeading eyebrow="Certifications" invert title="ISO & industry certifications" lead="The international quality, environmental, energy and safety management standards our operations are aligned to." />
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {certifications.map((c) => (
            <div key={c.code} className="flex flex-col items-center rounded-[var(--radius-card)] border border-white/10 bg-navy-900 p-6 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
                <BadgeCheck size={24} />
              </span>
              <p className="mt-3 font-[family-name:var(--font-sora)] font-bold text-white">{c.code}</p>
              <p className="mt-1 text-xs text-white/55">{c.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Governance */}
      <Section>
        <SectionHeading eyebrow="Governance" title="AML/KYC & anti-corruption" align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {governance.map((g) => (
            <div key={g.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
              <h3 className="text-lg font-bold text-navy-900">{g.title}</h3>
              <p className="mt-2.5 leading-relaxed text-navy-500">{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner title="Compliant supply, every transaction" lead="Our onboarding is thorough yet efficient — so compliant counterparties transact quickly." />
    </>
  );
}
