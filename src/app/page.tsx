import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Globe2, ShieldCheck } from "lucide-react";
import Hero from "@/components/site/Hero";
import OperationsMap from "@/components/site/OperationsMap";
import StatStrip from "@/components/ui/StatStrip";
import SegmentCard from "@/components/ui/SegmentCard";
import CTABanner from "@/components/ui/CTABanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { segments, site } from "@/lib/site";
import { images, type ImageKey } from "@/lib/images";
import { getStats } from "@/lib/cms";

// ISR: re-generate at most hourly; Sanity webhook also revalidates on publish.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${site.name} — Petroleum Trading, Storage & Marine Logistics`,
  description: site.description,
  alternates: { canonical: "/" },
};

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Compliance-first trading",
    body: "AML/KYC screening, licensed import/export, and anti-corruption governance on every transaction.",
  },
  {
    icon: Globe2,
    title: "Global reach, local execution",
    body: "Terminals and supply desks positioned across key energy corridors for dependable delivery.",
  },
  {
    icon: Award,
    title: "Certified quality & safety",
    body: "ISO-aligned operations and independent inspection safeguard product quality end to end.",
  },
];

export default async function HomePage() {
  const stats = await getStats();
  return (
    <>
      <Hero />

      {/* Intro + stat strip on dark band */}
      <Section dark className="!py-20 lg:!py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Who we are"
              invert
              title="An integrated energy supply partner"
              lead={`${site.name} connects producers, refiners and end-users through a single accountable partner — combining physical trading, independent storage, and marine and pipeline logistics under one operation.`}
            />
          </div>
          <div className="lg:col-span-5">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              More about our company
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="mt-14">
          <StatStrip stats={stats} />
        </div>
      </Section>

      {/* Core business segments */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Five segments, one supply chain"
          lead="From cargo sourcing to final delivery, each segment is run in-house so you deal with one accountable team."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s) => (
            <SegmentCard
              key={s.slug}
              title={s.title}
              blurb={s.blurb}
              href={s.href}
              icon={s.icon}
              image={images[s.slug as ImageKey]}
            />
          ))}
          {/* trailing CTA tile */}
          <Link
            href="/services"
            className="group flex flex-col justify-between rounded-[var(--radius-card)] bg-navy-800 p-7 text-white transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1"
          >
            <p className="text-xl font-bold">Explore all services</p>
            <p className="mt-3 text-sm text-white/70">
              Trading desks, terminals, chartering, transshipment and logistics
              — in detail.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">
              View services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Section>

      {/* Operations map */}
      <Section dark>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Global footprint"
              invert
              title="Operations across key energy corridors"
              lead="Storage terminals, pipeline transit points and regional supply desks positioned to move product where it's needed — efficiently and on schedule."
            />
            <Link href="/operations" className="btn btn-primary mt-8">
              View operations
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <OperationsMap />
          </div>
        </div>
      </Section>

      {/* Trust / why us */}
      <Section>
        <SectionHeading
          eyebrow="Why partners choose us"
          title="Built on compliance, reach and reliability"
          align="center"
        />
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {trustPoints.map((t) => (
            <div
              key={t.title}
              className="rounded-[var(--radius-card)] border border-line bg-surface p-7"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <t.icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy-900">{t.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-navy-500">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Ready to source, store or ship product?"
        lead="Tell us what you need moved and where — our trading desk responds within one business day."
      />
    </>
  );
}
