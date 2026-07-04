import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import LeadForm from "@/components/site/LeadForm";
import OperationsMap from "@/components/site/OperationsMap";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} — office locations, trading desk contact and general enquiries.`,
  alternates: { canonical: "/contact" },
};

const offices = [
  {
    city: "Lubbock, Texas (HQ)",
    line: `${site.address.line1}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}`,
    tag: "Supply, marketing & operations",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Talk to our team"
        lead="Reach the trading desk for supply and pricing, or send a general enquiry — we respond within one business day."
        crumbs={[{ label: "Contact Us", href: "/contact" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-navy-900">Get in touch</h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
                <Phone className="mt-0.5 text-amber-500" size={20} />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Phone</p>
                  <a href={`tel:${site.phone}`} className="text-navy-500 hover:text-amber-600">{site.phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
                <Mail className="mt-0.5 text-amber-500" size={20} />
                <div>
                  <p className="text-sm font-semibold text-navy-900">Email</p>
                  <a href={`mailto:${site.email}`} className="text-navy-500 hover:text-amber-600">{site.email}</a>
                </div>
              </li>
            </ul>

            <h3 className="mt-10 text-lg font-bold text-navy-900">Our offices</h3>
            <ul className="mt-4 space-y-3">
              {offices.map((o) => (
                <li key={o.city} className="flex items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5">
                  <MapPin className="mt-0.5 text-amber-500" size={20} />
                  <div>
                    <p className="font-semibold text-navy-900">{o.city}</p>
                    <p className="text-sm text-navy-500">{o.line}</p>
                    <p className="mt-1 text-xs font-medium text-amber-600">{o.tag}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <LeadForm formType="contact" />
          </div>
        </div>
      </Section>

      {/* Regions map (stylised, not Google Maps) */}
      <Section dark className="!py-16">
        <h2 className="mb-8 text-2xl font-bold text-white">Where we operate</h2>
        <OperationsMap />
      </Section>
    </>
  );
}
