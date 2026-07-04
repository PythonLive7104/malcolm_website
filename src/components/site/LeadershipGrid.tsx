"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { TeamDoc } from "@/lib/cms";

/** Leadership cards with expandable bio (accessible disclosure). */
export default function LeadershipGrid({ team }: { team: TeamDoc[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((p, i) => {
        const expanded = open === i;
        return (
          <div
            key={p.name}
            className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6"
          >
            {/* Placeholder avatar (initials) — swap for client headshots */}
            <div
              aria-hidden
              className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-800 font-[family-name:var(--font-sora)] text-lg font-bold text-amber-500"
            >
              {p.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="mt-4 text-lg font-bold text-navy-900">{p.name}</h3>
            <p className="text-sm font-medium text-amber-600">{p.role}</p>
            {expanded && (
              <p className="mt-3 text-sm leading-relaxed text-navy-500">{p.bio}</p>
            )}
            <button
              type="button"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-navy-700 hover:text-amber-600"
            >
              {expanded ? <X size={15} /> : <Plus size={15} />}
              {expanded ? "Close" : "Read bio"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
