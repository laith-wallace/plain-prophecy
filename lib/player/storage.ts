import { type PlayerState, createDefaultPlayerState } from "./state";

const STORAGE_KEY = "pp-player-v1";
const LEGACY_VM_KEY = "pp-verse-memory-v1";
const LEGACY_WQ_KEY = "pp-word-quest-v1";

export function loadPlayerState(): PlayerState {
  if (typeof window === "undefined") return createDefaultPlayerState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PlayerState;
      if (parsed.version === 1) return parsed;
    }
  } catch {
    // Corrupted data — fall through to default + migration
  }

  // Try migrating legacy data
  const state = createDefaultPlayerState();
  migrateLegacyVerseMemory(state);
  migrateLegacyWordQuest(state);
  savePlayerState(state);
  return state;
}

export function savePlayerState(state: PlayerState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded — silently fail
  }
}

function migrateLegacyVerseMemory(state: PlayerState): void {
  try {
    const raw = localStorage.getItem(LEGACY_VM_KEY);
    if (!raw) return;

    const legacy = JSON.parse(raw) as Record<
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

    state.games.verseMemory.cardProgress = legacy;
    localStorage.removeItem(LEGACY_VM_KEY);
  } catch {
    // Migration failed — leave default empty state
  }
}

function migrateLegacyWordQuest(state: PlayerState): void {
  try {
    const raw = localStorage.getItem(LEGACY_WQ_KEY);
    if (!raw) return;

    const legacy = JSON.parse(raw) as {
      highScores?: Record<string, number>;
      unlockedLevels?: number[];
    };

    if (legacy.highScores) {
      state.games.wordQuest.bestScores = legacy.highScores;
    }
    if (legacy.unlockedLevels) {
      state.games.wordQuest.levelsCompleted = legacy.unlockedLevels.filter((l) => l !== 1);
    }

    localStorage.removeItem(LEGACY_WQ_KEY);
  } catch {
    // Migration failed — leave default empty state
  }
}
