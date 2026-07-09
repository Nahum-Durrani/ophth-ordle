export interface DayState {
  puzzle: number;
  guesses: string[];
  status: "playing" | "won" | "lost";
}

export interface Stats {
  played: number;
  won: number;
  streak: number;
  maxStreak: number;
  lastWonPuzzle: number | null;
  /** guess distribution: index 0 = solved on clue 1 */
  dist: number[];
}

const DAY_KEY = "ophthodle:day";
const STATS_KEY = "ophthodle:stats";

const emptyStats: Stats = {
  played: 0,
  won: 0,
  streak: 0,
  maxStreak: 0,
  lastWonPuzzle: null,
  dist: [0, 0, 0, 0, 0],
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadDay(puzzle: number): DayState {
  const fallback: DayState = { puzzle, guesses: [], status: "playing" };
  if (typeof window === "undefined") return fallback;
  const s = safeParse<DayState>(localStorage.getItem(DAY_KEY), fallback);
  return s.puzzle === puzzle ? s : fallback;
}

export function saveDay(state: DayState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DAY_KEY, JSON.stringify(state));
}

export function loadStats(): Stats {
  if (typeof window === "undefined") return emptyStats;
  return { ...emptyStats, ...safeParse<Stats>(localStorage.getItem(STATS_KEY), emptyStats) };
}

export function recordResult(puzzle: number, won: boolean, guessCount: number): Stats {
  const s = loadStats();
  s.played += 1;
  if (won) {
    s.won += 1;
    s.dist[Math.min(guessCount - 1, s.dist.length - 1)] += 1;
    s.streak = s.lastWonPuzzle === puzzle - 1 ? s.streak + 1 : 1;
    s.maxStreak = Math.max(s.maxStreak, s.streak);
    s.lastWonPuzzle = puzzle;
  } else {
    s.streak = 0;
  }
  if (typeof window !== "undefined") localStorage.setItem(STATS_KEY, JSON.stringify(s));
  return s;
}
