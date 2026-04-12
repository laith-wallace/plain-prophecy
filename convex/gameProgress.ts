import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const recordWordQuestGame = mutation({
  args: {
    level: v.union(v.literal(1), v.literal(2), v.literal(3)),
    score: v.number(),
  },
  handler: async (ctx, { level, score }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;

    const user = await ctx.db.get(userId);
    if (!user) return;

    // Update high scores
    const highScores = user.wordQuestHighScores ?? { level1: 0, level2: 0, level3: 0 };
    const key = `level${level}` as "level1" | "level2" | "level3";
    if (score > highScores[key]) {
      highScores[key] = score;
    }

    // Streak tracking (same logic as profile.ts markLessonCompleteBySlug)
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = user.lastActiveDate ?? "";
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const newStreak =
      lastDate === today
        ? (user.currentStreak ?? 1)
        : lastDate === yesterday
          ? (user.currentStreak ?? 0) + 1
          : 1;

    await ctx.db.patch(userId, {
      wordQuestHighScores: highScores,
      wordQuestGamesPlayed: (user.wordQuestGamesPlayed ?? 0) + 1,
      lastActiveDate: today,
      currentStreak: newStreak,
    });
  },
});

export const getWordQuestProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user) return null;

    return {
      highScores: user.wordQuestHighScores ?? { level1: 0, level2: 0, level3: 0 },
      gamesPlayed: user.wordQuestGamesPlayed ?? 0,
      streak: user.currentStreak ?? 0,
    };
  },
});
