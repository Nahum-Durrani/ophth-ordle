"use client";

import { useState } from "react";
import { OphthoCase, shareText } from "@/lib/game";
import { DayState } from "@/lib/storage";

export default function ResultBanner({
  caseData,
  puzzle,
  state,
}: {
  caseData: OphthoCase;
  puzzle: number;
  state: DayState;
}) {
  const won = state.status === "won";
  const [summaryOpen, setSummaryOpen] = useState(won);
  const [copied, setCopied] = useState(false);

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
    <div className="clue-reveal flex flex-col gap-4">
      <div
        className={`border-l-2 py-2 pl-4 ${won ? "border-fluorescein-ink" : "border-hyphema"}`}
      >
        <p className={`font-display text-sm font-bold ${won ? "text-fluorescein-ink" : "text-hyphema"}`}>
          {won ? `Solved on attempt ${state.guesses.length} of 5` : "Out of guesses"}
        </p>
        <p className="mt-1 text-sm text-pupil/80">
          You&apos;ve already played today. Come back tomorrow.
        </p>
      </div>

      <div>
        <h3 className="font-display text-headline sm:text-headline-lg font-bold leading-snug text-pupil">
          {caseData.diagnosis}
        </h3>
        {caseData.aliases.length > 0 && (
          <p className="mt-1 text-xs text-vitreous">
            Also known as: {caseData.aliases.join(", ")}
          </p>
        )}
      </div>

      <div className="rounded-lg border border-line">
        <button
          type="button"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
          className="flex w-full items-center justify-between px-4 py-3 text-left font-display text-xs font-bold uppercase tracking-wide text-cobalt"
        >
          Case summary
          <span aria-hidden className="font-mono">
            {summaryOpen ? "−" : "+"}
          </span>
        </button>
        {summaryOpen && (
          <ul className="flex flex-col gap-2 border-t border-line px-4 py-3">
            {caseData.teachingPoints.map((tp, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-pupil/90">
                <span aria-hidden className="text-cobalt">
                  •
                </span>
                {tp}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={onShare}
        className="rounded-lg bg-cobalt px-4 py-2.5 font-display text-sm font-bold text-white hover:brightness-110"
      >
        {copied ? "Copied!" : "Share result"}
      </button>
    </div>
  );
}
