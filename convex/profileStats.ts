import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

// Rank thresholds — must match lib/player/state.ts
const RANK_THRESHOLDS = [
  { rank: "Elder", minXP: 10_000 },
  { rank: "Prophet", minXP: 4_000 },
  { rank: "Watchman", minXP: 1_500 },
  { rank: "Scholar", minXP: 500 },
  { rank: "Student", minXP: 100 },
  { rank: "Seeker", minXP: 0 },
] as const;

function computeRank(totalXP: number): string {
  for (const { rank, minXP } of RANK_THRESHOLDS) {
    if (totalXP >= minXP) return rank;
  }
  return "Seeker";
}

/**
 * Unified profile query — returns all game stats, XP, trophies, streaks
 * for the profile page.
 */
export const getFullProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    const gs = user.gameState;
    const completedLessons = user.completedLessons ?? [];
    const lessonXP = completedLessons.length * 100;
    const totalXP = gs ? Math.max(gs.totalXP, lessonXP) : lessonXP;

    return {
      // Identity
      name: user.name ?? "Seeker",
      image: user.image ?? null,
      spiritualLevel: user.spiritualLevel ?? "beginner",

      // XP & Rank
      totalXP,
      rank: computeRank(totalXP),

      // Streaks
      currentStreak: gs?.currentStreak ?? user.currentStreak ?? 0,
      longestStreak: gs?.longestStreak ?? 0,

      // Per-game stats
      daniel: gs ? {
        cardsRevealed: gs.games.daniel.cardsRevealed.length,
        completions: gs.games.daniel.completions,
        bestTime: gs.games.daniel.bestTime ?? null,
      } : { cardsRevealed: 0, completions: 0, bestTime: null },

      gospel: gs ? {
        cardsRevealed: gs.games.gospel.cardsRevealed.length,
        completions: gs.games.gospel.completions,
      } : { cardsRevealed: 0, completions: 0 },

      revelation: gs ? {
        cardsRevealed: gs.games.revelation.cardsRevealed.length,
        completions: gs.games.revelation.completions,
      } : { cardsRevealed: 0, completions: 0 },

      verseMemory: gs ? {
        cardsLearned: Object.keys(gs.games.verseMemory.cardProgress ?? {}).length,
      } : { cardsLearned: 0 },

      wordQuest: gs ? {
        levelsCompleted: gs.games.wordQuest.levelsCompleted,
        bestScores: gs.games.wordQuest.bestScores as Record<string, number>,
      } : { levelsCompleted: [], bestScores: {} },

      // Trophies
      trophies: gs?.trophies ? Object.entries(gs.trophies as Record<string, { unlockedAt: number }>).map(
        ([id, data]) => ({ id, unlockedAt: data.unlockedAt })
      ) : [],

      // Lessons
      completedLessons: completedLessons.length,
    };
  },
});
