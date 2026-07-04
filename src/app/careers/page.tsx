import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Check, MapPin } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { recruitmentSteps, benefits } from "@/lib/data/careers";
import { getJobs } from "@/lib/cms";
import { images } from "@/lib/images";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join our petroleum trading, operations, shipping and compliance teams. Explore current openings, our recruitment process and employee benefits.",
  alternates: { canonical: "/careers" },
};

/** ⚠️ MOCK data — production fetches `jobListing` from Sanity via ISR. */
export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career in global energy"
        lead="We're a team of traders, operators and specialists moving energy across the world. Explore our current openings."
        image={images.operations}
        crumbs={[{ label: "Careers", href: "/careers" }]}
      />

      {/* Openings */}
      <Section>
        <SectionHeading eyebrow="Open roles" title="Current opportunities" />
        <ul className="mt-10 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
          {jobs.map((j) => (
            <li key={j.slug}>
              <Link href={`/careers/${j.slug}`} className="group flex flex-col gap-3 p-6 transition-colors hover:bg-ground sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">{j.department}</span>
                  <h2 className="mt-1 text-lg font-bold text-navy-900 group-hover:text-amber-700">{j.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-navy-500">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={15} className="text-amber-500" />{j.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Briefcase size={15} className="text-amber-500" />{j.type}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-amber-600">
                  View role <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Recruitment process */}
      <Section dark>
        <SectionHeading eyebrow="How it works" invert title="Our recruitment process" />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recruitmentSteps.map((s, i) => (
            <li key={s.title} className="rounded-[var(--radius-card)] border border-white/10 bg-navy-900 p-6">
              <span className="font-[family-name:var(--font-sora)] text-3xl font-extrabold text-amber-500">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Benefits */}
      <Section>
        <SectionHeading eyebrow="Why join us" title="Employee benefits" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-5 py-4">
              <Check size={18} className="shrink-0 text-amber-500" />
              <span className="text-navy-700">{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CTABanner title="Don't see the right role?" lead="Send us your CV and we'll keep you in mind for future openings." primary={{ label: "Contact Us", href: "/contact" }} secondary={{ label: "About the company", href: "/about" }} />
    </>
  );
}
