import { v } from "convex/values";
import { query } from "./_generated/server";

export const getAllPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_published_at")
      .filter((q) => q.eq(q.field("published"), true))
      .order("desc")
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});
