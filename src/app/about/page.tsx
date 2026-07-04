import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, icons } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { values } from "@/lib/data/misc";
import { getPartners } from "@/lib/cms";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.name} is a United States-based energy company specializing in the supply, marketing, distribution and logistics of petroleum products and related energy commodities.`,
  alternates: { canonical: "/about" },
};

const overview = [
  `${site.name} is a United States-based energy company specializing in the supply, marketing, distribution, and logistics of petroleum products and related energy commodities. With operational experience spanning several decades, the company is committed to providing reliable, efficient, and value-driven energy solutions to commercial, industrial, aviation, marine, and institutional clients.`,
  `Headquartered in the United States, ${site.name} operates with a strong emphasis on operational excellence, supply chain reliability, regulatory compliance, and customer satisfaction. The company's business activities encompass petroleum product supply, fuel logistics, wholesale marketing, energy procurement, and strategic trading support services.`,
  `Through its extensive industry knowledge and customer-focused approach, ${site.name} has developed capabilities to support clients across diverse sectors requiring dependable access to energy products and logistics solutions.`,
];

const aboutServices: { title: string; icon: keyof typeof icons; body: string }[] = [
  {
    title: "Petroleum Products Supply",
    icon: "Fuel",
    body: "We provide access to a broad range of petroleum and refined products to meet the requirements of commercial, industrial and institutional customers.",
  },
  {
    title: "Wholesale Fuel Marketing",
    icon: "TrendingUp",
    body: "Our wholesale fuel marketing operations support customers requiring competitive pricing, reliable sourcing and flexible supply arrangements.",
  },
  {
    title: "Fuel Transportation & Logistics",
    icon: "Truck",
    body: "We offer comprehensive fuel transportation and logistics support through established supply chain networks and strategic partnerships.",
  },
  {
    title: "Energy Procurement Solutions",
    icon: "PackageSearch",
    body: "We assist customers in sourcing and procuring petroleum products through efficient procurement strategies and market expertise.",
  },
  {
    title: "Commercial Trading Support",
    icon: "ChartLine",
    body: "Our team supports commercial petroleum transactions through market intelligence, operational coordination and transaction management services.",
  },
];

export default async function AboutPage() {
  const partners = await getPartners();
  return (
    <>
      <PageHero
        eyebrow="Our company"
        title={`About ${site.name}`}
        lead={`${site.name} is a United States-based energy company specializing in the supply, marketing, distribution and logistics of petroleum products and related energy commodities.`}
        image={images.about}
        crumbs={[{ label: "About Us", href: "/about" }]}
      />

      {/* Company overview */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Company overview" title="A United States-based energy company" />
          </div>
          <div className="space-y-5 lg:col-span-8">
            {overview.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-navy-500">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="!pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our mission",
              body: "To provide safe, reliable, and cost-effective petroleum products and energy solutions while maintaining the highest standards of integrity, professionalism, operational efficiency, and customer service.",
            },
            {
              icon: Eye,
              title: "Our vision",
              body: "To become a trusted global participant in the energy industry by delivering innovative, sustainable, and customer-centric petroleum supply and logistics solutions that contribute to the growth and success of our partners worldwide.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <c.icon size={24} />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-navy-900">{c.title}</h2>
              <p className="mt-3 leading-relaxed text-navy-500">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Core values */}
      <Section dark>
        <SectionHeading eyebrow="Our core values" invert title="What we stand for" align="center" />
        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v) => {
            const Icon = icons[v.icon];
            return (
              <div key={v.title} className="rounded-[var(--radius-card)] border border-white/10 bg-navy-900 p-6 text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{v.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Our services */}
      <Section>
        <SectionHeading
          eyebrow="Our services"
          title="Energy solutions across the supply chain"
          lead="From product supply and wholesale marketing to logistics, procurement and trading support — capabilities tailored to dependable energy delivery."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutServices.map((s) => {
            const Icon = icons[s.icon];
            return (
              <div key={s.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy-800 text-amber-500">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-navy-500">{s.body}</p>
              </div>
            );
          })}
          <Link
            href="/services"
            className="group flex flex-col justify-between rounded-[var(--radius-card)] bg-navy-800 p-7 text-white transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1"
          >
            <p className="text-xl font-bold">Explore all services</p>
            <p className="mt-3 text-sm text-white/70">See how we source, store, ship and deliver product end to end.</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">
              View services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Section>

      {/* Commitment & partnerships */}
      <Section dark>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-navy-900 p-8">
            <p className="eyebrow text-amber-400">Quality &amp; compliance</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Our commitment to quality and compliance</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              {site.name} is committed to conducting business in accordance with applicable industry
              regulations, environmental standards and operational best practices. We continuously work to
              maintain high standards of quality assurance, risk management, safety and compliance throughout
              our operations.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-white/10 bg-navy-900 p-8">
            <p className="eyebrow text-amber-400">Partnerships</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Building long-term partnerships</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              At {site.name}, we recognize that our success depends on the success of our clients and business
              partners. We remain committed to delivering reliable energy solutions, maintaining strong business
              relationships and creating sustainable value through professionalism, expertise and operational
              excellence.
            </p>
            <p className="mt-4 leading-relaxed text-white/70">
              As the global energy landscape continues to evolve, {site.name} remains dedicated to supporting
              the energy requirements of customers through dependable service, strategic partnerships and a
              commitment to excellence.
            </p>
          </div>
        </div>
      </Section>

      {/* Strategic partnerships logo strip */}
      <Section>
        <SectionHeading eyebrow="Strategic partnerships" title="We work with partners worldwide" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.slice(0, 6).map((p) => (
            <div
              key={p.name}
              className="flex h-20 items-center justify-center rounded-lg border border-line bg-surface px-4 text-center text-sm font-semibold text-navy-400"
            >
              {p.name}
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Work with an integrated energy partner"
        lead="Talk to our team about supply, marketing, logistics or trading support for your next requirement."
      />
    </>
  );
}
