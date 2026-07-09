export default function GuessDistribution({
  dist,
  highlight,
}: {
  dist: number[];
  highlight?: number;
}) {
  const max = Math.max(1, ...dist);

  return (
    <div className="flex flex-col gap-1.5">
      {dist.map((count, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-3 text-right font-mono text-xs text-vitreous">{i + 1}</span>
          <div className="h-5 flex-1 rounded bg-mist">
            <div
              className={`h-full rounded ${i === highlight ? "bg-fluorescein" : "bg-vitreous/40"}`}
              style={{ width: count ? `${Math.max((count / max) * 100, 8)}%` : 0 }}
            />
          </div>
          <span className="w-4 font-mono text-xs text-vitreous">{count}</span>
        </div>
      ))}
    </div>
  );
}
