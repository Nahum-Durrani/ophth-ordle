"use client";

import { useEffect, useRef, useState } from "react";
import { AnswerEntry, MAX_GUESSES, OphthoCase, isCorrect, searchAnswers } from "@/lib/game";

const WRONG_GUESS_DELAY_MS = 900;

export default function GuessInput({
  onSubmit,
  attempt,
  caseData,
}: {
  onSubmit: (guess: string) => void;
  attempt: number;
  caseData: OphthoCase;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnswerEntry[]>([]);
  const [highlighted, setHighlighted] = useState(0);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false); // showing "Not quite" before the guess actually lands
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(searchAnswers(query));
    setHighlighted(0);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function trySubmit(entry: AnswerEntry) {
    setError(null);
    setOpen(false);
    if (isCorrect(entry.canonical, caseData)) {
      onSubmit(entry.canonical);
      setQuery("");
      setResults([]);
      return;
    }
    setPending(true);
    setTimeout(() => {
      onSubmit(entry.canonical);
      setQuery("");
      setResults([]);
      setPending(false);
    }, WRONG_GUESS_DELAY_MS);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    if (results.length === 0) {
      setError("Pick a diagnosis from the list.");
      return;
    }
    trySubmit(results[highlighted]);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const helperText = pending
    ? "Not quite."
    : error
      ? error
      : "A wrong guess reveals the next clue. Full names and common abbreviations both count.";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div ref={boxRef} className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setError(null);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={`Guess ${attempt} of ${MAX_GUESSES} — type a diagnosis…`}
            aria-label="Type your diagnosis"
            autoComplete="off"
            spellCheck={false}
            disabled={pending}
            className="w-full rounded-lg border border-line bg-mist px-4 py-3 text-sm text-pupil placeholder:text-vitreous focus:border-cobalt focus:outline-none disabled:opacity-60"
          />

          {open && results.length > 0 && (
            <ul
              role="listbox"
              className="absolute z-10 mt-2 max-h-64 w-full overflow-auto rounded-lg border border-line bg-card shadow-lg"
            >
              {results.map((r, i) => (
                <li key={r.label + i} role="option" aria-selected={i === highlighted}>
                  <button
                    type="button"
                    onMouseEnter={() => setHighlighted(i)}
                    onClick={() => trySubmit(r)}
                    className={`block w-full px-4 py-2.5 text-left text-sm ${
                      i === highlighted ? "bg-cobalt/10 text-cobalt" : "text-pupil/90"
                    }`}
                  >
                    {r.label}
                    {r.label !== r.canonical && (
                      <span className="ml-2 text-xs text-vitreous">→ {r.canonical}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-lg bg-cobalt px-4 py-3 font-display text-sm font-bold text-white hover:brightness-110 disabled:opacity-50"
        >
          Submit
        </button>
      </div>

      <p
        key={pending ? "pending" : error ? "error" : "idle"}
        aria-live="polite"
        className={`clue-reveal text-xs ${pending || error ? "text-hyphema" : "text-vitreous"}`}
      >
        {helperText}
      </p>
    </form>
  );
}
