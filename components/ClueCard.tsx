export default function ClueCard({
  text,
  revealed,
  isVignette = false,
}: {
  text: string;
  revealed: boolean;
  isVignette?: boolean;
}) {
  // The free opening vignette reads like the top of a real chart note: a
  // solid accent rule, a large bold title-weight line, generous line height.
  if (isVignette) {
    return (
      <li className="clue-reveal flex flex-col gap-2 border-l-[3px] border-accent py-5 pl-6">
        <span className="font-mono text-meta font-semibold uppercase text-accent">
          Presentation
        </span>
        <p className="text-lede font-medium text-primary">{text}</p>
      </li>
    );
  }

  // Timeline-style findings: a light connecting line down the left edge with
  // a dot at each stop. Deliberately unnumbered — clue slots stay separate
  // from the guess count by design (see CLAUDE.md → Game rules); numbering
  // is exclusive to GuessHistory's pills.
  if (!revealed) {
    return (
      <li className="relative flex min-h-[3.25rem] items-start gap-4 py-5 pl-1">
        <span aria-hidden className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-dashed border-muted/40" />
        </span>
        <p className="font-mono text-meta font-medium uppercase tracking-wide text-muted/70">
          Finding pending
        </p>
      </li>
    );
  }

  return (
    <li className="clue-reveal relative flex min-h-[3.25rem] items-start gap-4 py-5 pl-1">
      <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
      <p className="text-body leading-relaxed text-secondary">{text}</p>
    </li>
  );
}
