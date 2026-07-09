# Ophth-ordle

Daily ophthalmology diagnosis game — Doctordle-style. One clinical case a day,
five progressive clues, five guesses. Built with Next.js 14, TypeScript, and Tailwind.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Push to GitHub, import the repo in Vercel, done. No env vars, no database.

## How it works

- `data/cases.json` — all 365 cases (diagnosis, aliases, category, difficulty,
  5 clues ordered generic → specific, 4 teaching points). Generated from the
  source spreadsheet.
- `lib/game.ts` — daily case selection (`daysSince(EPOCH) % 365`), guess
  matching (diagnosis + aliases, punctuation-insensitive), Fuse.js fuzzy
  autocomplete, share-grid text.
- `lib/storage.ts` — localStorage for today's progress and lifetime stats
  (streak, win %, guess distribution).
- `components/` — Game (state orchestration), ClueCard, GuessInput
  (autocomplete with keyboard nav), GuessDots, ResultPanel (teaching points,
  stats, share).

## Before launch

- [ ] Set `EPOCH` in `lib/game.ts` to the real launch date.
- [ ] Rename "Ophth-ordle" if you pick a different name (grep for it).
- [ ] Update the share URL in `shareText()` once the domain is final.

## Notes

- The full case list ships to the client, so answers are technically visible
  in devtools — same as the original Wordle. If that ever matters, move
  case-of-the-day selection to a route handler.
- Case order in the JSON = puzzle order. Reorder the array to control the
  daily schedule (e.g., start with Easy cases in week 1).
