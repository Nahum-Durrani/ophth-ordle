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
      <div className="w-full max-w-2xl rounded-card border border-border bg-card p-8 shadow-card">
        <p className="text-muted">Loading today's case…</p>
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

  // Pill badges: category is a slate outline pill, difficulty is a soft
  // filled pill (green/amber/muted-red) — replaces the earlier borderless
  // readout-tag treatment.
  const difficultyPill =
    c.difficulty === "Easy"
      ? "bg-success/10 text-success"
      : c.difficulty === "Hard"
        ? "bg-danger/[0.08] text-danger/90"
        : "bg-warning/10 text-warning";

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-card border border-border bg-card shadow-card">
      <div className="flex flex-col gap-8 p-8 sm:p-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full border border-border px-3 py-1 font-mono text-meta font-medium uppercase text-secondary">
              {c.category}
            </span>
            <span
              className={`rounded-full px-3 py-1 font-mono text-meta font-medium uppercase ${difficultyPill}`}
            >
              {c.difficulty}
            </span>
          </div>
          <FieldMapDial
            sectors={sectors}
            label={`${state.guesses.length} of ${MAX_GUESSES} guesses used`}
          />
        </div>

        <ol className="flex flex-col divide-y divide-border" aria-label="Case findings">
          {c.clues.map((clue, i) => (
            <ClueCard key={i} text={clue} revealed={i < cluesShown} isVignette={i === 0} />
          ))}
        </ol>

        {state.status === "playing" ? (
          <div className="flex flex-col gap-4">
            <GuessInput onSubmit={submitGuess} attempt={state.guesses.length + 1} caseData={c} />
            <GuessHistory guesses={state.guesses} />
          </div>
        ) : (
          <ResultBanner caseData={c} puzzle={num} state={state} />
        )}
      </div>

      <p className="border-t border-border px-8 py-4 text-center text-xs text-muted sm:px-10">
        For medical education only. This is not medical advice.
      </p>
    </div>
  );
}
