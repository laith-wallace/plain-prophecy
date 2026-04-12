"use client";

import { useCallback, useEffect, useRef } from "react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { PlayerState } from "./state";

const DEBOUNCE_MS = 3000;

/**
 * Inner hook that actually calls useQuery/useMutation.
 * Separated so the outer wrapper can catch errors.
 */
function useConvexSyncInner(
  state: PlayerState,
  setState: (updater: (prev: PlayerState) => PlayerState) => void,
) {
  const { isAuthenticated } = useConvexAuth();
  const syncMutation = useMutation(api.gameState.syncGameState);
  // Skip query entirely for unauthenticated users
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const serverState = (useQuery as any)(
    api.gameState.loadGameState,
    isAuthenticated ? {} : "skip",
  ) as ServerGameState | null | undefined;

  const lastSyncHash = useRef("");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMerged = useRef(false);

  // Merge server state on initial load
  useEffect(() => {
    if (!isAuthenticated || hasMerged.current || serverState === undefined) return;
    hasMerged.current = true;

    if (!serverState) return; // No server state — nothing to merge

    setState((local) => mergeStates(local, serverState));
  }, [isAuthenticated, serverState, setState]);

  // Debounced push to server on state change
  const pushToServer = useCallback(() => {
    if (!isAuthenticated) return;

    const hash = JSON.stringify({
      totalXP: state.totalXP,
      currentStreak: state.currentStreak,
      trophies: state.trophies,
      games: state.games,
    });

    if (hash === lastSyncHash.current) return;
    lastSyncHash.current = hash;

    // Convert null bestTimes to undefined for Convex compatibility
    const convertBestTime = (t: number | null) => t ?? undefined;
    const payload = {
      totalXP: state.totalXP,
      currentStreak: state.currentStreak,
      longestStreak: state.longestStreak,
      lastActiveDate: state.lastActiveDate,
      soundEnabled: state.soundEnabled,
      trophies: state.trophies as Record<string, unknown>,
      games: {
        daniel: {
          ...state.games.daniel,
          bestTime: convertBestTime(state.games.daniel.bestTime),
          fulfillmentChoices: state.games.daniel.fulfillmentChoices as Record<string, unknown>,
        },
        gospel: {
          ...state.games.gospel,
          bestTime: convertBestTime(state.games.gospel.bestTime),
          fulfillmentChoices: state.games.gospel.fulfillmentChoices as Record<string, unknown>,
        },
        revelation: {
          ...state.games.revelation,
          bestTime: convertBestTime(state.games.revelation.bestTime),
          fulfillmentChoices: state.games.revelation.fulfillmentChoices as Record<string, unknown>,
        },
        verseMemory: state.games.verseMemory,
        wordQuest: state.games.wordQuest,
      },
      syncedAt: Date.now(),
    };

    syncMutation(payload).catch(() => {
      // Sync failed — localStorage is the fallback
    });
  }, [isAuthenticated, state, syncMutation]);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(pushToServer, DEBOUNCE_MS);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [pushToServer, isAuthenticated]);
}

/**
 * Public hook — delegates to the inner implementation.
 */
export function useConvexSync(
  state: PlayerState,
  setState: (updater: (prev: PlayerState) => PlayerState) => void,
) {
  useConvexSyncInner(state, setState);
}

// ── Merge logic ─────────────────────────────────────────────────────────────
// Principle: never lose progress. Take max XP, max streaks, union of arrays,
// max of scores, union of trophies.

// Server game state shape — matches the Convex gameState schema
interface ServerGameState {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  soundEnabled: boolean;
  trophies: Record<string, { unlockedAt: number }>;
  games: {
    daniel: { completions: number; bestTime?: number; cardsRevealed: string[]; fulfillmentChoices: Record<string, string> };
    gospel: { completions: number; bestTime?: number; cardsRevealed: string[]; fulfillmentChoices: Record<string, string> };
    revelation: { completions: number; bestTime?: number; cardsRevealed: string[]; fulfillmentChoices: Record<string, string>; lastCardIndex: number };
    verseMemory: { cardProgress: Record<string, unknown> };
    wordQuest: { levelsCompleted: number[]; bestScores: Record<string, number> };
  };
  syncedAt: number;
}

function mergeStates(
  local: PlayerState,
  server: ServerGameState,
): PlayerState {
  return {
    ...local,
    totalXP: Math.max(local.totalXP, server.totalXP),
    currentStreak: Math.max(local.currentStreak, server.currentStreak),
    longestStreak: Math.max(local.longestStreak, server.longestStreak),
    lastActiveDate:
      local.lastActiveDate > server.lastActiveDate
        ? local.lastActiveDate
        : server.lastActiveDate,
    trophies: mergeTrophies(local.trophies, server.trophies),
    games: {
      daniel: mergeSwipeGame(local.games.daniel, normalizeSwipeGame(server.games.daniel)),
      gospel: mergeSwipeGame(local.games.gospel, normalizeSwipeGame(server.games.gospel)),
      revelation: {
        ...mergeSwipeGame(local.games.revelation, normalizeSwipeGame(server.games.revelation) as typeof local.games.revelation),
        lastCardIndex: Math.max(
          local.games.revelation.lastCardIndex,
          server.games.revelation.lastCardIndex,
        ),
      },
      verseMemory: {
        cardProgress: mergeCardProgress(
          local.games.verseMemory.cardProgress as unknown as Record<string, Record<string, unknown>>,
          server.games.verseMemory.cardProgress as unknown as Record<string, Record<string, unknown>>,
        ) as typeof local.games.verseMemory.cardProgress,
      },
      wordQuest: {
        levelsCompleted: [
          ...new Set([
            ...local.games.wordQuest.levelsCompleted,
            ...server.games.wordQuest.levelsCompleted,
          ]),
        ],
        bestScores: mergeScores(
          local.games.wordQuest.bestScores as Record<string, number>,
          server.games.wordQuest.bestScores as Record<string, number>,
        ),
      },
    },
  };
}

// Convert server's undefined bestTime to null for local state compatibility
function normalizeSwipeGame(
  server: { completions: number; bestTime?: number; cardsRevealed: string[]; fulfillmentChoices: Record<string, string> },
) {
  return {
    ...server,
    bestTime: server.bestTime ?? null,
    fulfillmentChoices: server.fulfillmentChoices as Record<string, "fulfilled" | "unsure">,
  };
}

function mergeSwipeGame<
  T extends {
    completions: number;
    bestTime: number | null;
    cardsRevealed: string[];
    fulfillmentChoices: Record<string, string>;
  },
>(local: T, server: T): T {
  return {
    ...local,
    completions: Math.max(local.completions, server.completions),
    bestTime:
      local.bestTime === null
        ? server.bestTime
        : server.bestTime === null
          ? local.bestTime
          : Math.min(local.bestTime, server.bestTime),
    cardsRevealed: [...new Set([...local.cardsRevealed, ...server.cardsRevealed])],
    fulfillmentChoices: { ...server.fulfillmentChoices, ...local.fulfillmentChoices },
  };
}

function mergeTrophies(
  local: Record<string, { unlockedAt: number }>,
  server: Record<string, { unlockedAt: number }>,
): Record<string, { unlockedAt: number }> {
  const merged = { ...server };
  for (const [id, trophy] of Object.entries(local)) {
    if (!merged[id] || trophy.unlockedAt < merged[id].unlockedAt) {
      merged[id] = trophy;
    }
  }
  return merged;
}

function mergeCardProgress(
  local: Record<string, Record<string, unknown>>,
  server: Record<string, Record<string, unknown>>,
): Record<string, Record<string, unknown>> {
  const merged = { ...server };
  for (const [id, card] of Object.entries(local)) {
    const serverCard = merged[id] as { lastSeen?: number } | undefined;
    const localCard = card as { lastSeen?: number };
    if (!serverCard || (localCard.lastSeen ?? 0) > (serverCard.lastSeen ?? 0)) {
      merged[id] = card;
    }
  }
  return merged;
}

function mergeScores(
  local: Record<string, number>,
  server: Record<string, number>,
): Record<string, number> {
  const merged = { ...server };
  for (const [key, val] of Object.entries(local)) {
    merged[key] = Math.max(merged[key] ?? 0, val);
  }
  return merged;
}
