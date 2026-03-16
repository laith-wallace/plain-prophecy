import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("studyCourses")
      .withIndex("by_slug")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

export const getWithLessons = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const course = await ctx.db
      .query("studyCourses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    if (!course) return null;

    const lessons = await ctx.db
      .query("studyLessons")
      .withIndex("by_course", (q) => q.eq("courseId", course._id))
      .collect();
    
    return { ...course, lessons: lessons.filter(l => l.published).sort((a,b) => a.order - b.order) };
  },
});

export const getAllAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.query("studyCourses").order("asc").collect();
  },
});

export const getByIdAdmin = query({
  args: { id: v.id("studyCourses") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.get(id);
  },
});

export const add = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    order: v.number(),
    published: v.boolean(),
    icon: v.optional(v.string()),
    hasSeparator: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.insert("studyCourses", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("studyCourses"),
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    order: v.number(),
    published: v.boolean(),
    icon: v.optional(v.string()),
    hasSeparator: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("studyCourses") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});
