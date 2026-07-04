
/**
 * Stylized world map with operational nodes (SVG, not Google Maps — perf + design
 * control per brief §3). Node positions are illustrative PLACEHOLDERS.
 * The dotted-grid "continents" are abstract, not a geographic projection.
 */

type Node = { label: string; type: "terminal" | "pipeline" | "region"; x: number; y: number };

const nodes: Node[] = [
  { label: "Rotterdam ARA hub", type: "terminal", x: 49, y: 34 },
  { label: "Fujairah terminals", type: "terminal", x: 63, y: 47 },
  { label: "Houston Gulf Coast", type: "terminal", x: 22, y: 43 },
  { label: "Singapore storage", type: "region", x: 79, y: 57 },
  { label: "West Africa supply", type: "pipeline", x: 46, y: 55 },
  { label: "Mediterranean transit", type: "pipeline", x: 52, y: 41 },
];

const typeColor: Record<Node["type"], string> = {
  terminal: "#e8862e",
  pipeline: "#6f8aa8",
  region: "#f0a955",
};

export default function OperationsMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
      <svg viewBox="0 0 100 66" className="w-full" role="img" aria-label="Global operations map showing storage terminals, pipelines and operational regions">
        <defs>
          <pattern id="dots" width="1.4" height="1.4" patternUnits="userSpaceOnUse">
            <circle cx="0.7" cy="0.7" r="0.28" fill="#22374f" />
          </pattern>
        </defs>
        <rect width="100" height="66" fill="#071322" />
        {/* Abstract landmass blobs filled with dot-grid */}
        <g fill="url(#dots)" opacity="0.9">
          <path d="M8 22 Q18 14 30 18 T44 22 Q40 34 32 40 T14 42 Q6 32 8 22Z" />
          <path d="M40 18 Q52 10 66 16 Q78 20 74 32 Q66 44 54 42 Q44 36 42 28 Z" />
          <path d="M60 40 Q72 36 82 44 Q88 52 80 58 Q70 62 62 56 Q56 48 60 40Z" />
        </g>

        {/* Connection arcs between hubs */}
        <g stroke="#e8862e" strokeWidth="0.25" fill="none" opacity="0.4" strokeDasharray="0.8 0.8">
          <path d="M22 43 Q36 24 49 34" />
          <path d="M49 34 Q56 40 63 47" />
          <path d="M63 47 Q72 50 79 57" />
          <path d="M49 34 Q50 46 46 55" />
        </g>

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="1.9" fill={typeColor[n.type]} opacity="0.25">
              <animate attributeName="r" values="1.9;3.2;1.9" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={n.x} cy={n.y} r="0.9" fill={typeColor[n.type]} />
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-x-5 gap-y-2 rounded-lg bg-navy-950/70 px-4 py-3 text-xs text-white/80 backdrop-blur">
        {(
          [
            ["terminal", "Storage terminals"],
            ["pipeline", "Pipeline transit"],
            ["region", "Operational regions"],
          ] as const
        ).map(([type, label]) => (
          <span key={type} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: typeColor[type] }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
