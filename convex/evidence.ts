import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getPublished = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("evidence")
      .withIndex("by_order")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

export const add = mutation({
  args: {
    num: v.string(),
    label: v.string(),
    title: v.string(),
    prophecyCol: v.object({
      label: v.string(),
      content: v.array(v.string()),
      scripture: v.string(),
    }),
    scriptureCol: v.object({
      label: v.string(),
      content: v.array(v.string()),
      scripture: v.string(),
    }),
    evidenceCol: v.object({
      label: v.string(),
      newsItems: v.array(v.object({
        headline: v.string(),
        meta: v.string(),
        body: v.string(),
      })),
    }),
    mediaCards: v.array(v.object({
      href: v.string(),
      icon: v.string(),
      outlet: v.string(),
      outletClass: v.string(),
      headline: v.string(),
      cta: v.string(),
    })),
    order: v.number(),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("evidence", args);
  },
});

export const getAllAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.query("evidence").withIndex("by_order").collect();
  },
});

export const getById = query({
  args: { id: v.id("evidence") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("evidence"),
    num: v.string(),
    label: v.string(),
    title: v.string(),
    prophecyCol: v.object({
      label: v.string(),
      content: v.array(v.string()),
      scripture: v.string(),
    }),
    scriptureCol: v.object({
      label: v.string(),
      content: v.array(v.string()),
      scripture: v.string(),
    }),
    evidenceCol: v.object({
      label: v.string(),
      newsItems: v.array(v.object({
        headline: v.string(),
        meta: v.string(),
        body: v.string(),
      })),
    }),
    mediaCards: v.array(v.object({
      href: v.string(),
      icon: v.string(),
      outlet: v.string(),
      outletClass: v.string(),
      headline: v.string(),
      cta: v.string(),
    })),
    order: v.number(),
    published: v.boolean(),
  },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("evidence") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});
