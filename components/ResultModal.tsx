"use client";

import { useState } from "react";
import { OphthoCase, shareText } from "@/lib/game";
import { DayState, loadStats } from "@/lib/storage";
import Modal from "./Modal";
import StatsBlock from "./StatsBlock";

export default function ResultModal({
  open,
  onClose,
  caseData,
  puzzle,
  state,
}: {
  open: boolean;
  onClose: () => void;
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
    <Modal open={open} onClose={onClose} title={won ? "Solved" : "Out of guesses"}>
      <div className="flex flex-col gap-4">
        <div>
          <p
            className={`font-display text-sm font-bold ${won ? "text-fluorescein-ink" : "text-hyphema"}`}
          >
            {won
              ? `Solved on clue ${state.guesses.length} of 5`
              : "The diagnosis was:"}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-pupil">{caseData.diagnosis}</h3>
          {caseData.aliases.length > 0 && (
            <p className="mt-0.5 text-xs text-vitreous">
              Also known as: {caseData.aliases.join(", ")}
            </p>
          )}
        </div>

        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-reflex">
            Teaching points
          </h4>
          <ul className="flex flex-col gap-2">
            {caseData.teachingPoints.map((tp, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-pupil/90">
                <span aria-hidden className="text-reflex">
                  •
                </span>
                {tp}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-line pt-4">
          <StatsBlock stats={stats} highlight={won ? state.guesses.length - 1 : undefined} />
        </div>

        <button
          type="button"
          onClick={onShare}
          className="rounded-xl bg-reflex px-4 py-2.5 font-display text-sm font-bold text-white hover:brightness-110"
        >
          {copied ? "Copied!" : "Share result"}
        </button>

        <p className="text-center text-xs text-vitreous">Next case at midnight, local time.</p>
      </div>
    </Modal>
  );
}
