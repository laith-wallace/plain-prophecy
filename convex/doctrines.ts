import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const sectionValidator = v.object({
  id: v.string(),
  heading: v.string(),
  badge: v.optional(v.string()),
  era: v.optional(v.string()),
  contentBlocks: v.array(v.object({ label: v.string(), text: v.string() })),
  christCentre: v.optional(v.string()),
  keyVerse: v.optional(v.object({ text: v.string(), ref: v.string() })),
});

const doctrineFields = {
  slug: v.string(),
  title: v.string(),
  subtitle: v.string(),
  scriptureRef: v.string(),
  category: v.union(
    v.literal("rapture"),
    v.literal("antichrist"),
    v.literal("daniel"),
    v.literal("revelation")
  ),
  intro: v.string(),
  sections: v.array(sectionValidator),
  christCentre: v.string(),
  verdict: v.string(),
  nextDoctrine: v.optional(v.object({ slug: v.string(), title: v.string() })),
  published: v.boolean(),
  order: v.number(),
  metaTitle: v.optional(v.string()),
  metaDescription: v.optional(v.string()),
  ogImage: v.optional(v.string()),
};

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("doctrines")
      .withIndex("by_order")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

export const getAllAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.query("doctrines").withIndex("by_order").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("doctrines")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const getByIdAdmin = query({
  args: { id: v.id("doctrines") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.get(id);
  },
});

export const add = mutation({
  args: doctrineFields,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.insert("doctrines", args);
  },
});

export const update = mutation({
  args: { id: v.id("doctrines"), ...doctrineFields },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("doctrines") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});
