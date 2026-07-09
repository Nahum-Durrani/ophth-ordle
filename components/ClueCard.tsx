export default function ClueCard({
  index,
  text,
  revealed,
}: {
  index: number;
  text: string;
  revealed: boolean;
}) {
  return (
    <li
      className={`flex min-h-[3.5rem] items-center gap-3 rounded-xl border p-4 ${
        revealed ? "clue-reveal border-line bg-card" : "border-line/70 bg-mist"
      }`}
    >
      <span
        aria-hidden
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
          revealed ? "bg-reflex/10 text-reflex" : "bg-transparent text-vitreous/50"
        }`}
      >
        {index + 1}
      </span>
      {revealed && <p className="text-sm leading-relaxed text-pupil/90">{text}</p>}
    </li>
  );
}
