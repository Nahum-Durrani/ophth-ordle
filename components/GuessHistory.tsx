// Only rendered while a case is still in progress, so every entry here is by
// construction a wrong guess — a correct one ends play and this list stops
// being shown at all (see Game.tsx).
export default function GuessHistory({ guesses }: { guesses: string[] }) {
  if (guesses.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Wrong guesses">
      {guesses.map((g, i) => (
        <li
          key={i}
          className="clue-reveal flex items-center gap-1.5 rounded-full border border-danger/20 bg-danger/[0.05] py-1 pl-1 pr-2.5 text-xs text-primary/80"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger/10 font-mono text-[10px] font-semibold text-danger">
            {i + 1}
          </span>
          {g}
          <span aria-hidden className="text-danger">
            ✗
          </span>
        </li>
      ))}
    </ul>
  );
}
