import { type ReactNode } from "react";

/** Standard vertical rhythm + centered container. */
export function Section({
  children,
  className = "",
  dark = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${dark ? "bg-navy-800 text-white" : ""} py-20 lg:py-28 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Eyebrow + heading + optional lead paragraph, reused across pages. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] ${
          invert ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            invert ? "text-white/70" : "text-navy-500"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
