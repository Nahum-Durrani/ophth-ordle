import { Stats } from "@/lib/storage";
import GuessDistribution from "./GuessDistribution";

export default function StatsBlock({
  stats,
  highlight,
}: {
  stats: Stats;
  highlight?: number;
}) {
  return (
    <div className="flex flex-col gap-4">
      <dl className="flex justify-around text-center">
        <Stat label="Played" value={stats.played} />
        <Stat
          label="Win %"
          value={stats.played ? Math.round((stats.won / stats.played) * 100) : 0}
        />
        <Stat label="Streak" value={stats.streak} />
        <Stat label="Best" value={stats.maxStreak} />
      </dl>
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-vitreous">
          Guess distribution
        </h3>
        <GuessDistribution dist={stats.dist} highlight={highlight} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide text-vitreous">{label}</dt>
      <dd className="font-mono text-lg font-semibold text-pupil">{value}</dd>
    </div>
  );
}
