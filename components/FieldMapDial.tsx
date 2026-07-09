export type SectorState = "empty" | "correct" | "wrong";

const STROKE = 5;

function sectorColor(state: SectorState): string {
  switch (state) {
    case "correct":
      return "#9FCB3B"; // fluorescein
    case "wrong":
      return "#96312E"; // hyphema
    default:
      return "#DCE0E4"; // line
  }
}

/**
 * A perimetry-style field map: a ring divided into clock-hour sectors, one per
 * guess. Empty until a guess lands, then fills fluorescein-green (correct) or
 * hyphema-red (wrong) — the same visual language used for the site's mark.
 */
export default function FieldMapDial({
  sectors,
  size = 40,
  decorative = false,
  label,
  className = "",
}: {
  sectors: SectorState[];
  size?: number;
  decorative?: boolean;
  label?: string;
  className?: string;
}) {
  const r = (size - STROKE) / 2;
  const c = 2 * Math.PI * r;
  const count = sectors.length;
  const gap = c * 0.06;
  const segLen = c / count - gap;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : label}
    >
      {sectors.map((s, i) => (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={sectorColor(s)}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${segLen} ${c - segLen}`}
          strokeDashoffset={-(i * (c / count))}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      ))}
    </svg>
  );
}
