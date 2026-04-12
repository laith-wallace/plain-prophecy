// ─── Player State Types ──────────────────────────────────────────────────────
// Unified state for the entire games ecosystem.
// Storage key: "pp-player-v1" in localStorage.

export type PlayerRank =
  | "Seeker" // 0–99 XP
  | "Student" // 100–499
  | "Scholar" // 500–1 499
  | "Watchman" // 1 500–3 999
  | "Prophet" // 4 000–9 999
  | "Elder"; // 10 000+

export const RANK_THRESHOLDS: { rank: PlayerRank; minXP: number }[] = [
  { rank: "Elder", minXP: 10_000 },
  { rank: "Prophet", minXP: 4_000 },
  { rank: "Watchman", minXP: 1_500 },
  { rank: "Scholar", minXP: 500 },
  { rank: "Student", minXP: 100 },
  { rank: "Seeker", minXP: 0 },
];

export const RANK_ICONS: Record<PlayerRank, string> = {
  Seeker: "🔍",
  Student: "📖",
  Scholar: "🎓",
  Watchman: "🏰",
  Prophet: "⚡",
  Elder: "👑",
};

// ─── XP Event ────────────────────────────────────────────────────────────────

export type GameId =
  | "daniel"
  | "gospel"
  | "revelation"
  | "verseMemory"
  | "wordQuest";

export type XPSource = GameId | "streak" | "trophy";

export interface XPEvent {
  source: XPSource;
  amount: number;
  timestamp: number;
  label: string;
}

// ─── Per-Game Progress ───────────────────────────────────────────────────────

export interface SwipeGameProgress {
  completions: number;
  bestTime: number | null; // ms, timed mode
  cardsRevealed: string[];
  fulfillmentChoices: Record<string, "fulfilled" | "unsure">;
}

export interface RevelationProgress extends SwipeGameProgress {
  lastCardIndex: number; // save-and-resume
}

export interface VerseMemoryProgress {
  /** Migrated from pp-verse-memory-v1 on first load. */
  cardProgress: Record<
    string,
    {
      id: string;
      interval: number;
      easeFactor: number;
      repetitions: number;
      nextReview: number;
      lastSeen: number;
    }
  >;
}

export interface WordQuestProgress {
  levelsCompleted: number[]; // e.g. [1, 2]
  bestScores: Record<number, number>; // level → best score
}

export interface GamesProgress {
  daniel: SwipeGameProgress;
  gospel: SwipeGameProgress;
  revelation: RevelationProgress;
  verseMemory: VerseMemoryProgress;
  wordQuest: WordQuestProgress;
}

// ─── Trophies ────────────────────────────────────────────────────────────────

export type TrophyId =
  | "first-blood"
  | "daniels-disciple"
  | "gospel-carrier"
  | "revelation-reader"
  | "memory-master"
  | "word-champion"
  | "seven-day-flame"
  | "thirty-day-pillar"
  | "connection-weaver"
  | "speed-prophet"
  | "cross-pollinator"
  | "verse-vault"
  | "scholar-rank"
  | "prophet-rank"
  | "keyboard-warrior";

export interface TrophyUnlock {
  unlockedAt: number; // Unix ms
}

// ─── Root State ──────────────────────────────────────────────────────────────

export interface PlayerState {
  version: 1;
  displayName: string;
  totalXP: number;
  xpLog: XPEvent[]; // last 50
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // ISO "2026-04-12"
  soundEnabled: boolean;
  games: GamesProgress;
  trophies: Record<TrophyId, TrophyUnlock>;
}

// ─── Default state ───────────────────────────────────────────────────────────

export function createDefaultPlayerState(): PlayerState {
  return {
    version: 1,
    displayName: "Seeker",
    totalXP: 0,
    xpLog: [],
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: "",
    soundEnabled: true,
    games: {
      daniel: {
        completions: 0,
        bestTime: null,
        cardsRevealed: [],
        fulfillmentChoices: {},
      },
      gospel: {
        completions: 0,
        bestTime: null,
        cardsRevealed: [],
        fulfillmentChoices: {},
      },
      revelation: {
        completions: 0,
        bestTime: null,
        cardsRevealed: [],
        fulfillmentChoices: {},
        lastCardIndex: 0,
      },
      verseMemory: {
        cardProgress: {},
      },
      wordQuest: {
        levelsCompleted: [],
        bestScores: {},
      },
    },
    trophies: {} as Record<TrophyId, TrophyUnlock>,
  };
}
