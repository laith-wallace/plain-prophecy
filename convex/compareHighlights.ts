import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("compareHighlights").withIndex("by_type_order").collect();
  },
});

export const getAllAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.query("compareHighlights").withIndex("by_type_order").collect();
  },
});

export const add = mutation({
  args: {
    type: v.union(v.literal("futuristWeakness"), v.literal("sdaStrength")),
    text: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.insert("compareHighlights", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("compareHighlights"),
    type: v.union(v.literal("futuristWeakness"), v.literal("sdaStrength")),
    text: v.string(),
    order: v.number(),
  },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("compareHighlights") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});
