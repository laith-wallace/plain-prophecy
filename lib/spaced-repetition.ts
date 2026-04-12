import { type VerseMemoryCard } from "@/data/verse-memory";

export type Rating = 0 | 1 | 2 | 3;
// 0 = Again  (complete blackout)
// 1 = Hard   (recalled with significant difficulty)
// 2 = Good   (recalled with effort)
// 3 = Easy   (recalled perfectly)

export interface CardProgress {
  id: string;
  interval: number;     // days until next review
  easeFactor: number;   // SM-2 ease multiplier, starts at 2.5
  repetitions: number;  // consecutive successful reviews
  nextReview: number;   // Unix ms timestamp
  lastSeen: number;     // Unix ms timestamp
}

const STORAGE_KEY = "pp-verse-memory-v1";
const MIN_EASE = 1.3;
const DEFAULT_EASE = 2.5;

// ── SM-2 core ─────────────────────────────────────────────────────────────

export function calculateNextReview(
  card: CardProgress,
  rating: Rating
): CardProgress {
  let { interval, easeFactor, repetitions } = card;

  if (rating < 2) {
    // Failed recall — restart streak
    repetitions = 0;
    interval = 1;
    if (rating === 0) {
      easeFactor = Math.max(MIN_EASE, easeFactor - 0.2);
    }
  } else {
    // Successful recall — advance interval
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }

    // Adjust ease factor: Easy keeps it high, Good is neutral, Hard decreases it
    easeFactor = Math.max(
      MIN_EASE,
      easeFactor + 0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02)
    );

    repetitions += 1;
  }

  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    nextReview: Date.now() + interval * 86_400_000,
    lastSeen: Date.now(),
  };
}

export function isDue(card: CardProgress): boolean {
  return Date.now() >= card.nextReview;
}

function freshCard(id: string): CardProgress {
  return {
    id,
    interval: 0,
    easeFactor: DEFAULT_EASE,
    repetitions: 0,
    nextReview: 0, // due immediately
    lastSeen: 0,
  };
}

// ── localStorage persistence (deprecated — use PlayerContext) ──────────────

/** @deprecated Use PlayerContext state.games.verseMemory.cardProgress instead */
export function loadProgress(): Record<string, CardProgress> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, CardProgress>;
  } catch {
    return {};
  }
}

/** @deprecated Use PlayerContext updateGameProgress("verseMemory", ...) instead */
export function saveProgress(progress: Record<string, CardProgress>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

export function getCardProgress(
  id: string,
  allProgress: Record<string, CardProgress>
): CardProgress {
  return allProgress[id] ?? freshCard(id);
}

// ── Queue sorting ──────────────────────────────────────────────────────────
// Order: due cards first, then new cards (nextReview=0), then future cards

export function getSortedQueue(
  allCards: VerseMemoryCard[],
  progress: Record<string, CardProgress>
): VerseMemoryCard[] {
  const now = Date.now();

  const due: VerseMemoryCard[] = [];
  const fresh: VerseMemoryCard[] = [];
  const future: VerseMemoryCard[] = [];

  for (const card of allCards) {
    const p = progress[card.id];
    if (!p || p.nextReview === 0) {
      fresh.push(card);
    } else if (now >= p.nextReview) {
      due.push(card);
    } else {
      future.push(card);
    }
  }

  return [...due, ...fresh, ...future];
}

// ── Next-due timestamp helper ──────────────────────────────────────────────
// Returns the soonest nextReview among all non-due cards, or null if none.

export function nextDueTimestamp(
  allCards: VerseMemoryCard[],
  progress: Record<string, CardProgress>
): number | null {
  const now = Date.now();
  let soonest: number | null = null;

  for (const card of allCards) {
    const p = progress[card.id];
    if (!p || p.nextReview <= now) continue;
    if (soonest === null || p.nextReview < soonest) {
      soonest = p.nextReview;
    }
  }

  return soonest;
}
