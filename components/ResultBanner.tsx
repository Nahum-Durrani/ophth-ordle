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
    <div className="clue-reveal flex flex-col gap-6">
      <div className={`border-l-[3px] py-2 pl-6 ${won ? "border-success" : "border-danger"}`}>
        <p
          className={`font-mono text-meta font-semibold uppercase ${won ? "text-success" : "text-danger"}`}
        >
          {won ? `Solved on attempt ${state.guesses.length} of 5` : "Out of guesses"}
        </p>
        <p className="mt-1.5 text-body text-secondary">
          You&apos;ve already played today. Come back tomorrow.
        </p>
      </div>

      <div>
        <h3 className="font-display text-headline sm:text-headline-lg font-bold leading-tight text-primary">
          {caseData.diagnosis}
        </h3>
        {caseData.aliases.length > 0 && (
          <p className="mt-2 text-xs text-muted">
            Also known as: {caseData.aliases.join(", ")}
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-border">
        <button
          type="button"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
          className="flex w-full items-center justify-between px-5 py-4 text-left font-mono text-meta font-semibold uppercase text-accent"
        >
          Case summary
          <span aria-hidden className="font-mono">
            {summaryOpen ? "−" : "+"}
          </span>
        </button>
        {summaryOpen && (
          <ul className="flex flex-col gap-3 border-t border-border px-5 py-4">
            {caseData.teachingPoints.map((tp, i) => (
              <li key={i} className="flex gap-2.5 text-body leading-relaxed text-secondary">
                <span aria-hidden className="text-accent">
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
        className="rounded-2xl bg-primary px-5 py-3.5 font-display text-sm font-bold text-white transition-colors hover:bg-secondary"
      >
        {copied ? "Copied!" : "Share result"}
      </button>
    </div>
  );
}
