import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { getArticle, getArticles, getArticleSlugs } from "@/lib/cms";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getArticleSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/news/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.excerpt,
      publishedTime: a.date,
      images: [a.image.src],
    },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const more = (await getArticles()).filter((a) => a.slug !== article.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image: `${site.url}${article.image.src}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.legalName },
    mainEntityOfPage: `${site.url}/news/${article.slug}`,
  };

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        image={article.image}
        crumbs={[
          { label: "News", href: "/news" },
          { label: article.title, href: `/news/${article.slug}` },
        ]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 text-sm text-navy-400">
            <time dateTime={article.date}>{fmt(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.author}</span>
          </div>

          <div className="prose-body mt-8 space-y-6 text-lg leading-relaxed text-navy-600">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <Link href="/news" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-amber-600">
            <ArrowLeft size={16} /> Back to all news
          </Link>
        </div>
      </Section>

      {/* More articles */}
      <Section dark className="!py-16">
        <h2 className="text-2xl font-bold text-white">More from our desk</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {more.map((a) => (
            <Link key={a.slug} href={`/news/${a.slug}`} className="group flex gap-4 rounded-[var(--radius-card)] border border-white/10 bg-navy-900 p-5 hover:border-amber-500/40">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image src={a.image.src} alt={a.image.alt} fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-400">{a.category}</span>
                <p className="mt-1 font-semibold leading-snug text-white group-hover:text-amber-300">{a.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTABanner title="Talk to our trading desk" lead="Get supply, pricing and market colour direct from our team." />
      <JsonLd data={jsonLd} />
    </>
  );
}
