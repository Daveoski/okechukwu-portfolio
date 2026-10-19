import { accentHex } from "@/lib/data";

const RUNG_COLORS = [accentHex.gfp, accentHex.cyan, accentHex.dapi, accentHex.cherry];

/** Static SVG double helix — server-rendered, used where a live canvas would be overkill. */
export function HelixGlyph({
  className,
  turns = 2.6,
  pairs = 30,
}: {
  className?: string;
  turns?: number;
  pairs?: number;
}) {
  const W = 120;
  const H = 480;
  const amp = 42;
  const samples = 160;
  const strand = (phase: number) =>
    Array.from({ length: samples + 1 }, (_, i) => {
      const t = i / samples;
      const x = W / 2 + Math.sin(t * turns * Math.PI * 2 + phase) * amp;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${(t * H).toFixed(2)}`;
    }).join(" ");

  const rungs = Array.from({ length: pairs }, (_, i) => {
    const t = (i + 0.5) / pairs;
    const theta = t * turns * Math.PI * 2;
    const x1 = W / 2 + Math.sin(theta) * amp;
    const x2 = W / 2 + Math.sin(theta + Math.PI) * amp;
    const depth = (Math.cos(theta) + 1) / 2;
    return { y: t * H, x1, x2, opacity: 0.25 + depth * 0.7, color: RUNG_COLORS[i % 4] };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {rungs.map((r) => (
        <g key={r.y} opacity={r.opacity}>
          <line x1={r.x1} x2={r.x2} y1={r.y} y2={r.y} stroke={r.color} strokeWidth="1.6" strokeLinecap="round" />
          <circle cx={r.x1} cy={r.y} r="2.4" fill="#e8efea" />
          <circle cx={r.x2} cy={r.y} r="2.4" fill="#e8efea" />
        </g>
      ))}
      <path d={strand(0)} fill="none" stroke={accentHex.gfp} strokeWidth="2.2" strokeLinecap="round" />
      <path d={strand(Math.PI)} fill="none" stroke={accentHex.cyan} strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
