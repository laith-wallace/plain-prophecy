import type { PlayerState } from "./state";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export interface StreakResult {
  state: PlayerState;
  streakIncremented: boolean;
  milestonesHit: number[]; // e.g. [7] or [30]
}

export function updateStreak(state: PlayerState): StreakResult {
  const today = todayISO();

  // Already active today — no change
  if (state.lastActiveDate === today) {
    return { state, streakIncremented: false, milestonesHit: [] };
  }

  const yesterday = yesterdayISO();
  let currentStreak: number;

  if (state.lastActiveDate === yesterday) {
    // Consecutive day — increment
    currentStreak = state.currentStreak + 1;
  } else if (state.lastActiveDate === "") {
    // First ever session
    currentStreak = 1;
  } else {
    // Streak broken — reset to 1
    currentStreak = 1;
  }

  const longestStreak = Math.max(state.longestStreak, currentStreak);

  // Check milestones
  const MILESTONES = [7, 30, 100, 365];
  const milestonesHit = MILESTONES.filter(
    (m) => currentStreak >= m && state.currentStreak < m,
  );

  return {
    state: {
      ...state,
      currentStreak,
      longestStreak,
      lastActiveDate: today,
    },
    streakIncremented: true,
    milestonesHit,
  };
}
