import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/ui/Section";

export type LegalSection = { heading: string; body: string[] };

/** Shared template for Privacy / Terms placeholder legal pages. */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        crumbs={[{ label: title, href: "#" }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-navy-400">Last updated: {updated}</p>
          <p className="mt-4 text-lg leading-relaxed text-navy-600">{intro}</p>

          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-bold text-navy-900">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-navy-500">{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
