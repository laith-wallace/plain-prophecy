import { v } from "convex/values";
import { query } from "./_generated/server";

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
