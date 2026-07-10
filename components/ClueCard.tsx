export default function ClueCard({
  text,
  revealed,
  isVignette = false,
}: {
  text: string;
  revealed: boolean;
  isVignette?: boolean;
}) {
  // The free opening vignette is the case — it gets the page's one headline
  // treatment (no card chrome, no dot, an accent rule instead of a border
  // box) rather than looking like a sibling of the findings below it.
  if (isVignette) {
    return (
      <li className="clue-reveal flex flex-col gap-1.5 border-l-2 border-cobalt py-1 pl-4">
        <span className="font-display text-meta font-bold uppercase text-cobalt">
          Today&apos;s presentation
        </span>
        <p className="text-headline sm:text-headline-lg font-medium leading-snug text-pupil">
          {text}
        </p>
      </li>
    );
  }

  if (!revealed) {
    // An undialed lens, not a blank box: a soft out-of-focus smudge of light
    // sits behind a crisp aperture dot — the finding is there, just not
    // brought into focus yet.
    return (
      <li className="relative flex min-h-[3.5rem] items-center gap-3 overflow-hidden rounded-xl border border-dashed border-vitreous/30 bg-mist p-4">
        <span aria-hidden className="absolute left-7 h-6 w-6 rounded-full bg-cobalt/20 blur-md" />
        <span aria-hidden className="relative h-2 w-2 shrink-0 rounded-full border border-vitreous/60" />
      </li>
    );
  }

  return (
    <li className="clue-reveal flex min-h-[3.5rem] items-center gap-3 border-l-2 border-cobalt/50 py-3 pl-4">
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
      <p className="text-finding leading-relaxed text-pupil/90">{text}</p>
    </li>
  );
}
