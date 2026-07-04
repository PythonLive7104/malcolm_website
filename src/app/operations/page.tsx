import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, icons } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import OperationsMap from "@/components/site/OperationsMap";
import CTABanner from "@/components/ui/CTABanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { infrastructure, capacities } from "@/lib/data/misc";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Operations & Infrastructure",
  description:
    "Our storage and marine terminals, pipelines, loading facilities and transportation assets across key operational regions.",
  alternates: { canonical: "/operations" },
};

export default function OperationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Operations & infrastructure"
        title="Infrastructure that moves product"
        lead="Storage and marine terminals, pipelines and loading facilities positioned across key energy corridors — connected by a chartered fleet and road logistics."
        image={images.operations}
        crumbs={[{ label: "Operations", href: "/operations" }]}
      />

      {/* Capacities strip */}
      <Section className="!pb-0">
        <SectionHeading eyebrow="Storage capacities" title="Scale across the network" lead="Indicative capacity across our owned and leased terminal network." />
        <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capacities.map((c) => (
            <div key={c.label} className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <dd className="font-[family-name:var(--font-sora)] text-3xl font-extrabold text-navy-900">{c.value}</dd>
              <dt className="mt-2 text-sm font-semibold text-navy-700">{c.label}</dt>
              <p className="mt-1 text-xs text-navy-400">{c.note}</p>
            </div>
          ))}
        </dl>
      </Section>

      {/* Infrastructure grid */}
      <Section>
        <SectionHeading eyebrow="Assets" title="What we operate" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {infrastructure.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div key={item.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-navy-500">{item.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Regions map */}
      <Section dark>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Operational regions" invert title="Where we operate" lead="Storage terminals, pipeline transit points and supply desks across major trade routes." />
            <div className="mt-8 flex flex-wrap gap-3">
              {["Northwest Europe", "Middle East Gulf", "US Gulf Coast", "West Africa", "Mediterranean", "Southeast Asia"].map((r) => (
                <span key={r} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/80">{r}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <OperationsMap />
          </div>
        </div>
      </Section>

      {/* Cross-links */}
      <Section className="!py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { title: "Our services", href: "/services", body: "Trading, storage, shipping and logistics." },
            { title: "Markets we serve", href: "/markets", body: "The sectors and industries we supply." },
            { title: "Compliance", href: "/compliance", body: "Licenses, permits and certifications." },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group flex items-center justify-between rounded-[var(--radius-card)] border border-line bg-surface p-6 hover:border-amber-200">
              <span>
                <span className="font-bold text-navy-900">{l.title}</span>
                <span className="mt-1 block text-sm text-navy-500">{l.body}</span>
              </span>
              <ArrowRight size={18} className="text-amber-500 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </Section>

      <CTABanner title="Put our infrastructure to work" lead="Talk to us about storage allocation, throughput or delivered supply." />
    </>
  );
}
