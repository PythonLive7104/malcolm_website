import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal data submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 2026"
      intro={`This policy describes how ${site.name} handles personal information submitted through this website.`}
      sections={[
        { heading: "Information we collect", body: ["We collect the information you provide through our contact and quote forms — such as your name, email, company, phone number and message.", "We may also collect standard technical data (e.g. IP address, browser type) for security and analytics."] },
        { heading: "How we use it", body: ["To respond to enquiries, provide quotes, and manage our commercial relationship with you.", "We do not sell your personal data to third parties."] },
        { heading: "Data retention", body: ["We retain enquiry data only as long as necessary for the purposes described, or as required by law."] },
        { heading: "Your rights", body: ["Depending on your jurisdiction, you may have rights to access, correct or delete your personal data. Contact us to exercise these rights."] },
        { heading: "Contact", body: [`For privacy questions, email ${site.email}.`] },
      ]}
    />
  );
}
