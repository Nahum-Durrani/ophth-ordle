export default function ClueCard({ index, text }: { index: number; text: string }) {
  return (
    <li className="clue-reveal flex gap-3 rounded-xl border border-line bg-surface p-4">
      <span
        aria-hidden
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-raised font-display text-xs font-bold text-beam"
      >
        {index + 1}
      </span>
      <p className="text-sm leading-relaxed text-paper/90">{text}</p>
    </li>
  );
}
