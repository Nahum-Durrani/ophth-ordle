"use client";

import { useState } from "react";
import { OphthoCase, shareText } from "@/lib/game";
import { DayState, loadStats } from "@/lib/storage";

export default function ResultPanel({
  caseData,
  puzzle,
  state,
}: {
  caseData: OphthoCase;
  puzzle: number;
  state: DayState;
}) {
  const won = state.status === "won";
  const [copied, setCopied] = useState(false);
  const stats = loadStats();

  async function onShare() {
    const text = shareText(puzzle, state.guesses.length, won);
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <section className="clue-reveal flex flex-col gap-4 rounded-xl border border-line bg-surface p-5">
      <div>
        <p className={`font-display text-sm font-bold ${won ? "text-correct" : "text-wrong"}`}>
          {won
            ? `Solved on clue ${state.guesses.length} of 5`
            : "Out of guesses — the diagnosis was:"}
        </p>
        <h2 className="mt-1 font-display text-xl font-bold text-paper">
          {caseData.diagnosis}
        </h2>
        {caseData.aliases.length > 0 && (
          <p className="mt-0.5 text-xs text-fog">
            Also known as: {caseData.aliases.join(", ")}
          </p>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-beam">
          Teaching points
        </h3>
        <ul className="flex flex-col gap-2">
          {caseData.teachingPoints.map((tp, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-paper/90">
              <span aria-hidden className="text-beam">
                •
              </span>
              {tp}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-4">
        <dl className="flex gap-5 text-center">
          <Stat label="Played" value={stats.played} />
          <Stat
            label="Win %"
            value={stats.played ? Math.round((stats.won / stats.played) * 100) : 0}
          />
          <Stat label="Streak" value={stats.streak} />
          <Stat label="Best" value={stats.maxStreak} />
        </dl>
        <button
          type="button"
          onClick={onShare}
          className="rounded-xl bg-beam px-4 py-2.5 font-display text-sm font-bold text-ink hover:brightness-110"
        >
          {copied ? "Copied!" : "Share result"}
        </button>
      </div>

      <p className="text-center text-xs text-fog">Next case at midnight, local time.</p>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide text-fog">{label}</dt>
      <dd className="font-display text-lg font-bold text-paper">{value}</dd>
    </div>
  );
}
