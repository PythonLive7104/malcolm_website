import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import PartnerGrid from "@/components/site/PartnerGrid";
import CTABanner from "@/components/ui/CTABanner";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { getPartners } from "@/lib/cms";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Strategic Partners & Clients",
  description:
    "Our refinery, shipping, storage, logistics and international partners — the network that lets us deliver reliably worldwide.",
  alternates: { canonical: "/partners" },
};

export default async function PartnersPage() {
  const partners = await getPartners();
  return (
    <>
      <PageHero
        eyebrow="Strategic partners & clients"
        title="A network built on trusted relationships"
        lead="We work with refineries, shipowners, terminals, inspectors and logistics providers across the globe to deliver reliably for our clients."
        image={images.shipping}
        crumbs={[{ label: "Strategic Partners & Clients", href: "/partners" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Our partners"
          title="Filter by partnership type"
          lead="The refiners, shipping lines, terminals and logistics partners we work with across global markets."
        />
        <div className="mt-12">
          <PartnerGrid partners={partners} />
        </div>
      </Section>

      <CTABanner title="Become a partner" lead="Refinery, shipping, storage or logistics — let's explore working together." primary={{ label: "Partner With Us", href: "/contact" }} secondary={{ label: "Our services", href: "/services" }} />
    </>
  );
}
