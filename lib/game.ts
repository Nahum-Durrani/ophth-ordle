import Fuse from "fuse.js";
import cases from "@/data/cases.json";

export interface OphthoCase {
  id: number;
  diagnosis: string;
  aliases: string[];
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  clues: string[];
  teachingPoints: string[];
}

export const ALL_CASES = cases as OphthoCase[];
export const MAX_GUESSES = 5;

/**
 * Launch date — day 0 of the puzzle calendar. Before this date, puzzleNumber()
 * clamps to 0, so every visitor sees case #1 no matter what day it is — that's
 * expected during development/staging. Once real players are seeing this, do
 * NOT change EPOCH again: shifting it re-numbers every day's case for
 * everyone (breaks streaks, changes what "today's case" means retroactively).
 */
export const EPOCH = new Date("2026-07-15T00:00:00");

/** Days elapsed since launch, in the player's local timezone. */
export function puzzleNumber(now: Date = new Date()): number {
  const start = new Date(EPOCH.getFullYear(), EPOCH.getMonth(), EPOCH.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.floor((today.getTime() - start.getTime()) / 86_400_000);
  return Math.max(0, days);
}

/** Deterministic daily case — same for every player, cycles after 365 days. */
export function todaysCase(now: Date = new Date()): OphthoCase {
  return ALL_CASES[puzzleNumber(now) % ALL_CASES.length];
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[()'’\-–—,./]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** A guess is correct if it matches the diagnosis or any alias. */
export function isCorrect(guess: string, c: OphthoCase): boolean {
  const g = normalize(guess);
  if (!g) return false;
  return [c.diagnosis, ...c.aliases].some((name) => normalize(name) === g);
}

/** Autocomplete index over every diagnosis + alias, resolving to the canonical name. */
export interface AnswerEntry {
  label: string; // what the player sees / selects
  canonical: string; // diagnosis it resolves to
}

const answerEntries: AnswerEntry[] = ALL_CASES.flatMap((c) => [
  { label: c.diagnosis, canonical: c.diagnosis },
  ...c.aliases.map((a) => ({ label: a, canonical: c.diagnosis })),
]);

const fuse = new Fuse(answerEntries, {
  keys: ["label"],
  threshold: 0.35,
  ignoreLocation: true,
});

export function searchAnswers(query: string, limit = 8): AnswerEntry[] {
  if (query.trim().length < 2) return [];
  const seen = new Set<string>();
  const out: AnswerEntry[] = [];
  for (const r of fuse.search(query)) {
    if (seen.has(r.item.canonical)) continue;
    seen.add(r.item.canonical);
    out.push(r.item);
    if (out.length >= limit) break;
  }
  return out;
}

/** Shareable emoji grid, Wordle-style. */
export function shareText(
  num: number,
  guesses: number,
  won: boolean,
  // TODO: placeholder domain — swap for the real Vercel URL after first deploy.
  siteUrl = "ophth-ordle.vercel.app"
): string {
  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (won && i === guesses - 1) return "🟩";
    if (i < guesses) return "🟥";
    return "⬛";
  }).join("");
  const score = won ? `${guesses}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`;
  return `Ophth-ordle #${num + 1} ${score}\n${rows}\n${siteUrl}`;
}
