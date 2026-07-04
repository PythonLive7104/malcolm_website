"use client";

import { useState } from "react";
import { Building } from "lucide-react";
import { partnerCategories, type PartnerCategory } from "@/lib/data/misc";
import type { PartnerDoc } from "@/lib/cms";

type Filter = PartnerCategory | "All";

/** Filterable partner logo grid (placeholder text logos). */
export default function PartnerGrid({ partners }: { partners: PartnerDoc[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...partnerCategories];
  const shown = filter === "All" ? partners : partners.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Partner categories">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-navy-800 text-white"
                : "border border-line bg-surface text-navy-500 hover:border-amber-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <div key={p.name} className="flex flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-line bg-surface p-6 text-center">
            <Building size={22} className="text-navy-300" />
            <span className="text-sm font-semibold text-navy-700">{p.name}</span>
            <span className="text-xs text-amber-600">{p.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
