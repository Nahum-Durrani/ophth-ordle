export default function GuessDistribution({
  dist,
  highlight,
}: {
  dist: number[];
  highlight?: number;
}) {
  const max = Math.max(1, ...dist);

  return (
    <div className="flex flex-col gap-2">
      {dist.map((count, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-3 text-right font-mono text-xs text-muted">{i + 1}</span>
          <div className="h-5 flex-1 rounded-md bg-surface">
            <div
              className={`h-full rounded-md transition-[width] ${
                i === highlight ? "bg-accent" : "bg-secondary/30"
              }`}
              style={{ width: count ? `${Math.max((count / max) * 100, 8)}%` : 0 }}
            />
          </div>
          <span className="w-4 font-mono text-xs text-muted">{count}</span>
        </div>
      ))}
    </div>
  );
}
