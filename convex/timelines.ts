import { v } from "convex/values";
import { query, internalMutation } from "./_generated/server";

export const getTimeline = query({
  args: { type: v.union(v.literal("futurist"), v.literal("sda")) },
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
        type: v.union(v.literal("futurist"), v.literal("sda")),
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
