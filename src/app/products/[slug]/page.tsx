import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import JsonLd from "@/components/ui/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import SegmentCard from "@/components/ui/SegmentCard";
import { getProduct, getProducts, getProductSlugs } from "@/lib/cms";
import { site } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} — ${p.summary}`,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: `${p.name} | ${site.name}`,
      description: p.summary,
      images: [p.image.src],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = (await getProducts()).filter((p) => p.slug !== product.slug).slice(0, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: product.category,
    description: product.summary,
    image: `${site.url}${product.image.src}`,
    brand: { "@type": "Brand", name: site.name },
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
  };

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        lead={product.tagline}
        image={product.image}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Overview + applications */}
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title={`About ${product.name}`} />
            <p className="mt-5 text-lg leading-relaxed text-navy-500">{product.summary}</p>

            <h3 className="mt-10 text-xl font-bold text-navy-900">Applications</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.applications.map((a) => (
                <li key={a} className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3">
                  <Check size={18} className="shrink-0 text-amber-500" />
                  <span className="text-navy-700">{a}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                width={product.image.width}
                height={product.image.height}
                className="h-auto w-full object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </div>

          {/* Spec sheet + quote CTA (sticky) */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
                <div className="bg-navy-800 px-6 py-4">
                  <h3 className="font-bold text-white">Specification sheet</h3>
                  <p className="text-xs text-white/55">Indicative values</p>
                </div>
                <dl className="divide-y divide-line">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4 px-6 py-3.5">
                      <dt className="text-sm text-navy-500">{s.label}</dt>
                      <dd className="text-right text-sm font-semibold text-navy-900">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6 rounded-[var(--radius-card)] bg-amber-50 p-6">
                <p className="font-bold text-navy-900">Request a quote for {product.name}</p>
                <p className="mt-1.5 text-sm text-navy-500">
                  Tell us your volume and delivery terms for indicative pricing.
                </p>
                <Link
                  href={`/quote?product=${product.slug}`}
                  className="btn btn-primary mt-4 w-full"
                >
                  Request Quote <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Related products */}
      <Section dark>
        <SectionHeading eyebrow="Related products" invert title="Explore more of our range" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <SegmentCard
              key={p.slug}
              title={p.name}
              blurb={p.tagline}
              href={`/products/${p.slug}`}
              image={p.image}
            />
          ))}
        </div>
      </Section>

      <CTABanner title={`Ready to source ${product.name}?`} lead="Our trading desk responds to enquiries within one business day." />
      <JsonLd data={productJsonLd} />
    </>
  );
}
