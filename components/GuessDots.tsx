"use client";

import { MAX_GUESSES, OphthoCase, isCorrect } from "@/lib/game";
import { DayState } from "@/lib/storage";

/** Pupil-style progress: one dot per guess. Green = solved, red = missed. */
export default function GuessDots({
  guesses,
  status,
  caseData,
}: {
  guesses: string[];
  status: DayState["status"];
  caseData: OphthoCase;
}) {
  return (
    <div className="flex gap-1.5" aria-label={`${guesses.length} of ${MAX_GUESSES} guesses used`}>
      {Array.from({ length: MAX_GUESSES }, (_, i) => {
        const guess = guesses[i];
        const cls = !guess
          ? "border-line bg-transparent"
          : isCorrect(guess, caseData)
            ? "border-correct bg-correct"
            : "border-wrong bg-wrong";
        return <span key={i} className={`h-3 w-3 rounded-full border-2 ${cls}`} />;
      })}
    </div>
  );
}
