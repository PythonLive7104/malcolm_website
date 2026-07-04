import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms governing use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="July 2026"
      intro={`These terms govern use of the ${site.name} website.`}
      sections={[
        { heading: "Use of this website", body: ["This website is provided for general information about our products and services. Content may change without notice."] },
        { heading: "No offer or advice", body: ["Nothing on this site constitutes an offer, solicitation or trading advice. Product specifications and figures shown are indicative.", "All transactions are subject to separate written agreement and applicable compliance checks."] },
        { heading: "Intellectual property", body: ["All trademarks, content and design elements on this site are the property of their respective owners."] },
        { heading: "Limitation of liability", body: ["To the extent permitted by law, we accept no liability for reliance placed on information contained on this website."] },
        { heading: "Contact", body: [`For questions about these terms, email ${site.email}.`] },
      ]}
    />
  );
}
