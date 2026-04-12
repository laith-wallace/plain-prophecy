import type { WordQuestLevel } from "@/data/bible-word-game";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WordQuestProgress {
  /** Best score per level */
  highScores: Record<WordQuestLevel, number>;
  /** Total games completed (all levels) */
  gamesPlayed: number;
  /** Current consecutive-day streak */
  currentStreak: number;
  /** ISO date string (YYYY-MM-DD) of last completed game */
  lastPlayDate: string | null;
  /** Which levels have been unlocked (1 always unlocked) */
  unlockedLevels: WordQuestLevel[];
  /** Daily challenge: last completed date (ISO) */
  dailyLastPlayed: string | null;
  /** Daily challenge: best score */
  dailyBestScore: number;
}

const STORAGE_KEY = "pp-word-quest-v1";

const DEFAULT_PROGRESS: WordQuestProgress = {
  highScores: { 1: 0, 2: 0, 3: 0 },
  gamesPlayed: 0,
  currentStreak: 0,
  lastPlayDate: null,
  unlockedLevels: [1],
  dailyLastPlayed: null,
  dailyBestScore: 0,
};

// ── Persistence ───────────────────────────────────────────────────────────────

export function loadWordQuestProgress(): WordQuestProgress {
  if (typeof window === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<WordQuestProgress>;
    // Merge with defaults so new fields don't break old saves
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      highScores: { ...DEFAULT_PROGRESS.highScores, ...parsed.highScores },
      unlockedLevels: parsed.unlockedLevels ?? [1],
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveWordQuestProgress(progress: WordQuestProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function isConsecutiveDay(prev: string | null): boolean {
  if (!prev) return false;
  const prevDate = new Date(prev + "T00:00:00");
  const today = new Date(todayISO() + "T00:00:00");
  const diffMs = today.getTime() - prevDate.getTime();
  const diffDays = diffMs / 86_400_000;
  return diffDays === 1;
}

/**
 * Record a completed game. Updates high score, streak, unlock state.
 * Returns the updated progress.
 */
export function recordGameComplete(
  level: WordQuestLevel,
  totalScore: number,
): WordQuestProgress {
  const progress = loadWordQuestProgress();
  const today = todayISO();

  // High score
  if (totalScore > progress.highScores[level]) {
    progress.highScores[level] = totalScore;
  }

  // Games played
  progress.gamesPlayed += 1;

  // Streak: only bump if this is a new day
  if (progress.lastPlayDate !== today) {
    if (isConsecutiveDay(progress.lastPlayDate)) {
      progress.currentStreak += 1;
    } else if (progress.lastPlayDate !== today) {
      // Reset streak if gap > 1 day (but keep 1 for today)
      progress.currentStreak = 1;
    }
  }
  progress.lastPlayDate = today;

  // Unlock progression
  // Level 2: complete Level 1 at any score
  if (level === 1 && !progress.unlockedLevels.includes(2)) {
    progress.unlockedLevels.push(2);
  }
  // Level 3: complete Level 2 with 40+ points (80% of 50 base)
  if (level === 2 && totalScore >= 40 && !progress.unlockedLevels.includes(3)) {
    progress.unlockedLevels.push(3);
  }

  saveWordQuestProgress(progress);
  return progress;
}

/**
 * Record a daily challenge result.
 */
export function recordDailyComplete(totalScore: number): WordQuestProgress {
  const progress = loadWordQuestProgress();
  const today = todayISO();

  progress.dailyLastPlayed = today;
  if (totalScore > progress.dailyBestScore) {
    progress.dailyBestScore = totalScore;
  }

  // Also counts toward streak
  if (progress.lastPlayDate !== today) {
    if (isConsecutiveDay(progress.lastPlayDate)) {
      progress.currentStreak += 1;
    } else {
      progress.currentStreak = 1;
    }
  }
  progress.lastPlayDate = today;
  progress.gamesPlayed += 1;

  saveWordQuestProgress(progress);
  return progress;
}

/**
 * Check if a level is unlocked.
 */
export function isLevelUnlocked(
  level: WordQuestLevel,
  progress: WordQuestProgress,
): boolean {
  return progress.unlockedLevels.includes(level);
}

/**
 * Check if the daily challenge has been completed today.
 */
export function isDailyCompleted(progress: WordQuestProgress): boolean {
  return progress.dailyLastPlayed === todayISO();
}

/**
 * Deterministic daily seed — everyone gets the same words each day.
 * Returns a numeric hash from a date string.
 */
export function dailySeed(date?: string): number {
  const str = date ?? todayISO();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * Seeded shuffle — deterministic given the same seed.
 */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
