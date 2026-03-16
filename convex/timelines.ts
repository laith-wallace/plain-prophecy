import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const timelineFields = {
  type: v.union(v.literal("futurist"), v.literal("sda"), v.literal("preterist")),
  date: v.string(),
  badge: v.union(v.literal("fulfilled"), v.literal("future"), v.literal("present"), v.literal("historical")),
  title: v.string(),
  desc: v.string(),
  refs: v.string(),
  order: v.number(),
};

export const getTimeline = query({
  args: { type: v.union(v.literal("futurist"), v.literal("sda"), v.literal("preterist")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("timelines")
      .withIndex("by_type_order", (q) => q.eq("type", args.type))
      .collect();
  },
});

export const seedTimelines = internalMutation({
  args: {
    entries: v.array(
      v.object({
        type: v.union(v.literal("futurist"), v.literal("sda"), v.literal("preterist")),
        date: v.string(),
        badge: v.union(
          v.literal("fulfilled"),
          v.literal("future"),
          v.literal("present"),
          v.literal("historical")
        ),
        title: v.string(),
        desc: v.string(),
        refs: v.string(),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const entry of args.entries) {
      const existing = await ctx.db
        .query("timelines")
        .filter(
          (q) =>
            q.and(
              q.eq(q.field("type"), entry.type),
              q.eq(q.field("title"), entry.title)
            )
        )
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, entry);
      } else {
        await ctx.db.insert("timelines", entry);
      }
    }
  },
});

export const getAllAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.query("timelines").collect();
  },
});

export const add = mutation({
  args: timelineFields,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.insert("timelines", args);
  },
});

export const update = mutation({
  args: { id: v.id("timelines"), ...timelineFields },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("timelines") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});
