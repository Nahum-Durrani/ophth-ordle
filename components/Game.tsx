"use client";

import { useEffect, useMemo, useState } from "react";
import { MAX_GUESSES, isCorrect, puzzleNumber, todaysCase } from "@/lib/game";
import { DayState, loadDay, recordResult, saveDay } from "@/lib/storage";
import ClueCard from "./ClueCard";
import GuessInput from "./GuessInput";
import GuessHistory from "./GuessHistory";
import FieldMapDial, { SectorState } from "./FieldMapDial";
import ResultBanner from "./ResultBanner";

export default function Game() {
  const num = useMemo(() => puzzleNumber(), []);
  const c = useMemo(() => todaysCase(), []);
  const [state, setState] = useState<DayState | null>(null);

  // Load persisted state on the client only (avoids SSR/localStorage mismatch)
  useEffect(() => {
    setState(loadDay(num));
  }, [num]);

  if (!state) {
    return (
      <div className="w-full max-w-2xl rounded-2xl border border-line bg-card p-6 shadow-sm">
        <p className="text-vitreous">Loading today's case…</p>
      </div>
    );
  }

  const cluesShown =
    state.status === "playing"
      ? Math.min(state.guesses.length + 1, MAX_GUESSES)
      : MAX_GUESSES;

  const sectors: SectorState[] = Array.from({ length: MAX_GUESSES }, (_, i) => {
    const guess = state.guesses[i];
    if (!guess) return "empty";
    return isCorrect(guess, c) ? "correct" : "wrong";
  });

  function submitGuess(guess: string) {
    if (!state || state.status !== "playing") return;
    const guesses = [...state.guesses, guess];
    let status: DayState["status"] = "playing";
    if (isCorrect(guess, c)) status = "won";
    else if (guesses.length >= MAX_GUESSES) status = "lost";

    const next: DayState = { puzzle: num, guesses, status };
    setState(next);
    saveDay(next);
    if (status !== "playing") recordResult(num, status === "won", guesses.length);
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-line bg-card shadow-sm">
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="rounded-full border border-line bg-mist px-2.5 py-1 text-meta font-medium uppercase text-vitreous">
              {c.category}
            </span>
            <span
              className={`rounded-full border border-line bg-mist px-2.5 py-1 text-meta font-medium uppercase ${
                c.difficulty === "Easy"
                  ? "text-fluorescein-ink"
                  : c.difficulty === "Hard"
                    ? "text-hyphema"
                    : "text-cobalt"
              }`}
            >
              {c.difficulty}
            </span>
          </div>
          <FieldMapDial
            sectors={sectors}
            label={`${state.guesses.length} of ${MAX_GUESSES} guesses used`}
          />
        </div>

        <ol className="flex flex-col gap-5" aria-label="Case findings">
          {c.clues.map((clue, i) => (
            <ClueCard key={i} text={clue} revealed={i < cluesShown} isVignette={i === 0} />
          ))}
        </ol>

        {state.status === "playing" ? (
          <div className="flex flex-col gap-3">
            <GuessInput onSubmit={submitGuess} attempt={state.guesses.length + 1} caseData={c} />
            <GuessHistory guesses={state.guesses} />
          </div>
        ) : (
          <ResultBanner caseData={c} puzzle={num} state={state} />
        )}
      </div>

      <p className="border-t border-line px-6 py-3 text-center text-[11px] text-vitreous sm:px-8">
        For medical education only. This is not medical advice.
      </p>
    </div>
  );
}
