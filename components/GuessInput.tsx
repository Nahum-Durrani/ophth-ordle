"use client";

import { useEffect, useRef, useState } from "react";
import { AnswerEntry, MAX_GUESSES, searchAnswers } from "@/lib/game";

export default function GuessInput({
  onSubmit,
  attempt,
}: {
  onSubmit: (guess: string) => void;
  attempt: number;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnswerEntry[]>([]);
  const [highlighted, setHighlighted] = useState(0);
  const [open, setOpen] = useState(false);
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

  function choose(entry: AnswerEntry) {
    onSubmit(entry.canonical);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div ref={boxRef} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={`Guess ${attempt} of ${MAX_GUESSES} — type a diagnosis…`}
          aria-label="Type your diagnosis"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm text-pupil placeholder:text-vitreous focus:border-reflex focus:outline-none"
        />

        {open && results.length > 0 && (
          <ul
            role="listbox"
            className="absolute z-10 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-line bg-card shadow-lg"
          >
            {results.map((r, i) => (
              <li key={r.label + i} role="option" aria-selected={i === highlighted}>
                <button
                  type="button"
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => choose(r)}
                  className={`block w-full px-4 py-2.5 text-left text-sm ${
                    i === highlighted ? "bg-reflex/10 text-reflex" : "text-pupil/90"
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
      <p className="text-xs text-vitreous">
        A wrong guess reveals the next clue. Full names and common abbreviations both count.
      </p>
    </div>
  );
}
