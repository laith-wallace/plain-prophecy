import { v } from "convex/values";
import { query } from "./_generated/server";

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("studyLessons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("published"), true))
      .first();
  },
});

export const getByCourse = query({
  args: { courseId: v.id("studyCourses") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("studyLessons")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("published"), true))
      .order("asc")
      .collect();
  },
});
