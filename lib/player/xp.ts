import {
  type PlayerRank,
  type PlayerState,
  type XPEvent,
  type XPSource,
  RANK_THRESHOLDS,
} from "./state";

const MAX_XP_LOG = 50;

export function computeRank(totalXP: number): PlayerRank {
  for (const { rank, minXP } of RANK_THRESHOLDS) {
    if (totalXP >= minXP) return rank;
  }
  return "Seeker";
}

export function getXPForNextRank(totalXP: number): {
  currentRank: PlayerRank;
  nextRank: PlayerRank | null;
  xpNeeded: number;
  progressFraction: number;
} {
  const currentRank = computeRank(totalXP);
  const currentIdx = RANK_THRESHOLDS.findIndex((t) => t.rank === currentRank);

  if (currentIdx === 0) {
    // Already max rank
    return {
      currentRank,
      nextRank: null,
      xpNeeded: 0,
      progressFraction: 1,
    };
  }

  const nextTier = RANK_THRESHOLDS[currentIdx - 1];
  const currentTier = RANK_THRESHOLDS[currentIdx];
  const range = nextTier.minXP - currentTier.minXP;
  const progress = totalXP - currentTier.minXP;

  return {
    currentRank,
    nextRank: nextTier.rank,
    xpNeeded: nextTier.minXP - totalXP,
    progressFraction: Math.min(progress / range, 1),
  };
}

export function awardXP(
  state: PlayerState,
  source: XPSource,
  amount: number,
  label: string,
): { state: PlayerState; event: XPEvent } {
  const event: XPEvent = {
    source,
    amount,
    timestamp: Date.now(),
    label,
  };

  const xpLog = [event, ...state.xpLog].slice(0, MAX_XP_LOG);
  const totalXP = state.totalXP + amount;

  return {
    state: { ...state, totalXP, xpLog },
    event,
  };
}
