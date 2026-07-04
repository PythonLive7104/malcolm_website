import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import CTABanner from "@/components/ui/CTABanner";
import { Section } from "@/components/ui/Section";
import SegmentCard from "@/components/ui/SegmentCard";
import { getProducts } from "@/lib/cms";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Products",
  description:
    "Our refined petroleum products range — EN590 diesel, Jet A-1, fuel oils, Mazut M100, LPG, gasoline, bitumen, petcoke and base oils, with spec sheets and quote requests.",
  alternates: { canonical: "/products" },
};

export default async function ProductsHub() {
  const products = await getProducts();
  return (
    <>
      <PageHero
        eyebrow="Refined petroleum products"
        title="A full slate of refined products"
        lead={`${site.name} supplies a broad range of refined petroleum products on spot and term contracts — each with quality certification and independent inspection.`}
        image={images.refinery}
        crumbs={[{ label: "Products", href: "/products" }]}
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <SegmentCard
              key={p.slug}
              title={p.name}
              blurb={p.tagline + " — " + p.category + "."}
              href={`/products/${p.slug}`}
              image={p.image}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-[var(--radius-card)] bg-navy-800 p-8 text-white sm:flex-row">
          <p className="text-lg font-semibold">
            Need a product not listed, or a specific grade?
          </p>
          <Link href="/quote" className="btn btn-primary shrink-0">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      <CTABanner title="Request pricing on any product" lead="Send us your grade, volume and delivery terms — we respond within one business day." />
    </>
  );
}
