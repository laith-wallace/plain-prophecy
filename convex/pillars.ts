import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("pillars").withIndex("by_order").collect();
  },
});

export const getAllAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.query("pillars").withIndex("by_order").collect();
  },
});

export const add = mutation({
  args: {
    num: v.string(),
    label: v.string(),
    title: v.string(),
    paragraphs: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.insert("pillars", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("pillars"),
    num: v.string(),
    label: v.string(),
    title: v.string(),
    paragraphs: v.array(v.string()),
    order: v.number(),
  },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("pillars") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});
