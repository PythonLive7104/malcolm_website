import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Check, MapPin } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { getJob, getJobSlugs } from "@/lib/cms";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getJobSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = await getJob(slug);
  if (!j) return {};
  return {
    title: j.title,
    description: j.summary,
    alternates: { canonical: `/careers/${j.slug}` },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    hiringOrganization: { "@type": "Organization", name: site.legalName, sameAs: site.url },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location },
    },
  };

  return (
    <>
      <PageHero
        eyebrow={job.department}
        title={job.title}
        image={images.about}
        crumbs={[
          { label: "Careers", href: "/careers" },
          { label: job.title, href: `/careers/${job.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-4 text-sm text-navy-500">
              <span className="inline-flex items-center gap-1.5"><MapPin size={16} className="text-amber-500" />{job.location}</span>
              <span className="inline-flex items-center gap-1.5"><Briefcase size={16} className="text-amber-500" />{job.type}</span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-navy-600">{job.summary}</p>

            <h2 className="mt-10 text-xl font-bold text-navy-900">Responsibilities</h2>
            <ul className="mt-4 space-y-3">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-amber-500" /><span className="text-navy-600">{r}</span></li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-bold text-navy-900">Requirements</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((r) => (
                <li key={r} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-amber-500" /><span className="text-navy-600">{r}</span></li>
              ))}
            </ul>

            <Link href="/careers" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-amber-600">
              <ArrowLeft size={16} /> Back to all roles
            </Link>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <p className="font-bold text-navy-900">Apply for this role</p>
              <p className="mt-1.5 text-sm text-navy-500">Send your CV and covering note — our talent team will be in touch.</p>
              <Link href={`/contact?role=${job.slug}`} className="btn btn-primary mt-4 w-full">Apply now</Link>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd data={jsonLd} />
    </>
  );
}
