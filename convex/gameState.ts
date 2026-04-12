import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

/**
 * Sync the full PlayerState from localStorage to Convex.
 * Uses last-write-wins with syncedAt timestamp.
 */
export const syncGameState = mutation({
  args: {
    totalXP: v.number(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastActiveDate: v.string(),
    soundEnabled: v.boolean(),
    trophies: v.any(),
    games: v.object({
      daniel: v.object({
        completions: v.number(),
        bestTime: v.optional(v.number()),
        cardsRevealed: v.array(v.string()),
        fulfillmentChoices: v.any(),
      }),
      gospel: v.object({
        completions: v.number(),
        bestTime: v.optional(v.number()),
        cardsRevealed: v.array(v.string()),
        fulfillmentChoices: v.any(),
      }),
      revelation: v.object({
        completions: v.number(),
        bestTime: v.optional(v.number()),
        cardsRevealed: v.array(v.string()),
        fulfillmentChoices: v.any(),
        lastCardIndex: v.number(),
      }),
      verseMemory: v.object({ cardProgress: v.any() }),
      wordQuest: v.object({
        levelsCompleted: v.array(v.number()),
        bestScores: v.any(),
      }),
    }),
    syncedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;

    const user = await ctx.db.get(userId);
    if (!user) return;

    // Only write if client timestamp is newer
    const existing = user.gameState;
    if (existing && existing.syncedAt >= args.syncedAt) return;

    await ctx.db.patch(userId, {
      gameState: args,
      // Also sync streak to legacy fields for profile compatibility
      currentStreak: args.currentStreak,
      lastActiveDate: args.lastActiveDate,
    });
  },
});

/**
 * Load game state for the authenticated user.
 */
export const loadGameState = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    return user?.gameState ?? null;
  },
});
