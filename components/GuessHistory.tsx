import { OphthoCase, isCorrect } from "@/lib/game";

export default function GuessHistory({
  guesses,
  caseData,
}: {
  guesses: string[];
  caseData: OphthoCase;
}) {
  if (guesses.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Guess history">
      {guesses.map((g, i) => {
        const correct = isCorrect(g, caseData);
        return (
          <li
            key={i}
            className={`flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-3 text-xs text-pupil/80 ${
              correct ? "border-fluorescein-ink/25 bg-fluorescein/10" : "border-hyphema/25 bg-hyphema/[0.06]"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-semibold ${
                correct ? "bg-fluorescein/20 text-fluorescein-ink" : "bg-hyphema/10 text-hyphema"
              }`}
            >
              {i + 1}
            </span>
            {g}
          </li>
        );
      })}
    </ul>
  );
}
