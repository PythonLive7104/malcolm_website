import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import NewsList from "@/components/site/NewsList";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { getArticles } from "@/lib/cms";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "News & Market Intelligence",
  description:
    "Oil market updates, energy news, shipping reports, company announcements and industry insights from our trading and market-intelligence teams.",
  alternates: { canonical: "/news" },
};

/**
 * ⚠️ Reads MOCK data today. In production this becomes an ISR page fetching
 * `newsArticle` documents from Sanity via GROQ, revalidated on publish.
 */
export default async function NewsPage() {
  const articles = await getArticles();
  return (
    <>
      <PageHero
        eyebrow="News & market intelligence"
        title="Insight from our trading desk"
        lead="Oil market updates, shipping reports, company announcements and industry insight — published as markets move."
        image={images.trading}
        crumbs={[{ label: "News", href: "/news" }]}
      />
      <Section>
        <NewsList articles={articles} />
      </Section>
    </>
  );
}
