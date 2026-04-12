"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  type PlayerState,
  type TrophyId,
  type XPSource,
  type GameId,
  createDefaultPlayerState,
} from "./player/state";
import { loadPlayerState, savePlayerState } from "./player/storage";
import { awardXP as awardXPFn, getXPForNextRank } from "./player/xp";
import { updateStreak } from "./player/streaks";
import {
  checkTrophyUnlocks,
  TROPHY_DEFS,
  type TrophyDef,
} from "./player/trophies";
import { play as playSound, setMasterVolume } from "./sounds/engine";
import type { SoundId } from "./sounds/definitions";
import { useConvexSync } from "./player/useConvexSync";

// ─── XP Animation Queue ─────────────────────────────────────────────────────

export interface XPToastItem {
  id: number;
  amount: number;
  label: string;
}

export interface TrophyToastItem {
  id: number;
  def: TrophyDef;
}

// ─── Context Shape ───────────────────────────────────────────────────────────

interface PlayerContextValue {
  state: PlayerState;
  rank: ReturnType<typeof import("./player/xp").getXPForNextRank>;

  // Actions
  awardXP: (source: XPSource, amount: number, label: string) => void;
  unlockTrophy: (trophyId: TrophyId) => void;
  updateGameProgress: <K extends GameId>(
    game: K,
    updater: (prev: PlayerState["games"][K]) => PlayerState["games"][K],
  ) => void;
  toggleSound: () => void;
  playSound: (id: SoundId) => void;

  // Animation queues (consumed by UI components)
  xpToasts: XPToastItem[];
  dismissXPToast: (id: number) => void;
  trophyToasts: TrophyToastItem[];
  dismissTrophyToast: (id: number) => void;
}

const PlayerCtx = createContext<PlayerContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

let toastCounter = 0;

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>(createDefaultPlayerState);
  const [loaded, setLoaded] = useState(false);
  const [xpToasts, setXPToasts] = useState<XPToastItem[]>([]);
  const [trophyToasts, setTrophyToasts] = useState<TrophyToastItem[]>([]);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadPlayerState();
    setState(saved);
    setLoaded(true);
    setMasterVolume(saved.soundEnabled);

    // Update streak on mount
    const result = updateStreak(saved);
    if (result.streakIncremented) {
      setState(result.state);
      savePlayerState(result.state);
    }
  }, []);

  // Persist on every state change (after initial load)
  useEffect(() => {
    if (loaded) savePlayerState(state);
  }, [state, loaded]);

  // Sync to Convex for cross-device persistence
  useConvexSync(state, setState);

  const pushXPToast = useCallback((amount: number, label: string) => {
    const id = ++toastCounter;
    setXPToasts((prev) => [...prev, { id, amount, label }]);
    // Auto-dismiss after 2.5s
    setTimeout(() => {
      setXPToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const pushTrophyToast = useCallback((def: TrophyDef) => {
    const id = ++toastCounter;
    setTrophyToasts((prev) => [...prev, { id, def }]);
  }, []);

  const awardXP = useCallback(
    (source: XPSource, amount: number, label: string) => {
      setState((prev) => {
        const result = awardXPFn(prev, source, amount, label);
        return result.state;
      });
      pushXPToast(amount, label);
      playSound("xp-toast");

      // Check for trophy unlocks after XP award
      setTimeout(() => {
        const current = stateRef.current;
        const newUnlocks = checkTrophyUnlocks(current);
        for (const { id, def } of newUnlocks) {
          setState((prev) => ({
            ...prev,
            trophies: {
              ...prev.trophies,
              [id]: { unlockedAt: Date.now() },
            },
          }));
          pushTrophyToast(def);
          playSound("trophy-unlock");
          // Trophy XP (don't recurse — add directly)
          setState((prev) => {
            const result = awardXPFn(prev, "trophy", def.xpReward, def.name);
            return result.state;
          });
          pushXPToast(def.xpReward, `🏆 ${def.name}`);
        }
      }, 300);
    },
    [pushXPToast, pushTrophyToast],
  );

  const unlockTrophy = useCallback(
    (trophyId: TrophyId) => {
      setState((prev) => {
        if (prev.trophies[trophyId]) return prev; // already unlocked
        const def = TROPHY_DEFS.find((d) => d.id === trophyId);
        if (!def) return prev;
        pushTrophyToast(def);
        playSound("trophy-unlock");
        const updated = {
          ...prev,
          trophies: {
            ...prev.trophies,
            [trophyId]: { unlockedAt: Date.now() },
          },
        };
        // Award trophy XP
        const result = awardXPFn(
          updated,
          "trophy",
          def.xpReward,
          def.name,
        );
        pushXPToast(def.xpReward, `🏆 ${def.name}`);
        return result.state;
      });
    },
    [pushXPToast, pushTrophyToast],
  );

  const updateGameProgress = useCallback(
    <K extends GameId>(
      game: K,
      updater: (prev: PlayerState["games"][K]) => PlayerState["games"][K],
    ) => {
      setState((prev) => ({
        ...prev,
        games: {
          ...prev.games,
          [game]: updater(prev.games[game] as PlayerState["games"][K]),
        },
      }));
    },
    [],
  );

  const toggleSound = useCallback(() => {
    setState((prev) => {
      const next = !prev.soundEnabled;
      setMasterVolume(next);
      return { ...prev, soundEnabled: next };
    });
  }, []);

  const playSoundCb = useCallback(
    (id: SoundId) => {
      if (stateRef.current.soundEnabled) playSound(id);
    },
    [],
  );

  const dismissXPToast = useCallback((id: number) => {
    setXPToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissTrophyToast = useCallback((id: number) => {
    setTrophyToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Compute rank info
  const rank = getXPForNextRank(state.totalXP);

  const value: PlayerContextValue = {
    state,
    rank,
    awardXP,
    unlockTrophy,
    updateGameProgress,
    toggleSound,
    playSound: playSoundCb,
    xpToasts,
    dismissXPToast,
    trophyToasts,
    dismissTrophyToast,
  };

  return <PlayerCtx.Provider value={value}>{children}</PlayerCtx.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerCtx);
  if (!ctx) {
    throw new Error("usePlayer must be used within <PlayerProvider>");
  }
  return ctx;
}
