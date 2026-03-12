import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

export const getByIdStr = query({
  args: { idStr: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("prophecies")
      .withIndex("by_number")
      .filter((q) => q.eq(q.field("idStr"), args.idStr))
      .first();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("prophecies").order("asc").collect();
  },
});

export const seedProphecies = internalMutation({
  args: {
    prophecies: v.array(
      v.object({
        idStr: v.string(),
        number: v.number(),
        title: v.string(),
        subtitle: v.string(),
        symbol: v.string(),
        scripture: v.string(),
        connections: v.array(v.string()),
        reveal: v.object({
          what: v.string(),
          history: v.string(),
          christ: v.string(),
        }),
        published: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const p of args.prophecies) {
      const existing = await ctx.db
        .query("prophecies")
        .filter((q) => q.eq(q.field("idStr"), p.idStr))
        .first();
      if (existing) {
        await ctx.db.patch(existing._id, p);
      } else {
        await ctx.db.insert("prophecies", p);
      }
    }
  },
});
