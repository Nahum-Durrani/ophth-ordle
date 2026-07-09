"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MAX_GUESSES,
  isCorrect,
  puzzleNumber,
  todaysCase,
} from "@/lib/game";
import { DayState, loadDay, recordResult, saveDay } from "@/lib/storage";
import ClueCard from "./ClueCard";
import GuessInput from "./GuessInput";
import GuessDots from "./GuessDots";
import ResultPanel from "./ResultPanel";

export default function Game() {
  const num = useMemo(() => puzzleNumber(), []);
  const c = useMemo(() => todaysCase(), []);
  const [state, setState] = useState<DayState | null>(null);

  // Load persisted state on the client only (avoids SSR/localStorage mismatch)
  useEffect(() => {
    setState(loadDay(num));
  }, [num]);

  if (!state) {
    return <p className="text-fog">Loading today’s case…</p>;
  }

  const cluesShown =
    state.status === "playing"
      ? Math.min(state.guesses.length + 1, MAX_GUESSES)
      : MAX_GUESSES;

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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-xs">
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-fog">
            {c.category}
          </span>
          <span
            className={`rounded-full border border-line bg-surface px-3 py-1 ${
              c.difficulty === "Easy"
                ? "text-correct"
                : c.difficulty === "Hard"
                  ? "text-wrong"
                  : "text-beam"
            }`}
          >
            {c.difficulty}
          </span>
        </div>
        <GuessDots guesses={state.guesses} status={state.status} caseData={c} />
      </div>

      <ol className="flex flex-col gap-3" aria-label="Case clues">
        {c.clues.slice(0, cluesShown).map((clue, i) => (
          <ClueCard key={i} index={i} text={clue} />
        ))}
      </ol>

      {state.status === "playing" ? (
        <GuessInput
          onSubmit={submitGuess}
          previousGuesses={state.guesses}
          attempt={state.guesses.length + 1}
        />
      ) : (
        <ResultPanel caseData={c} puzzle={num} state={state} />
      )}
    </div>
  );
}
