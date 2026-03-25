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

export const getAllWithLessons = query({
  handler: async (ctx) => {
    const courses = await ctx.db
      .query("studyCourses")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
    courses.sort((a, b) => a.order - b.order);

    return await Promise.all(
      courses.map(async (course) => {
        const lessons = await ctx.db
          .query("studyLessons")
          .withIndex("by_course", (q) => q.eq("courseId", course._id))
          .filter((q) => q.eq(q.field("published"), true))
          .collect();
        
        const lessonsWithUrls = await Promise.all(
          lessons.map(async (l) => {
            let cardImageUrl = null;
            if (l.cardImageId) {
              cardImageUrl = await ctx.storage.getUrl(l.cardImageId);
            }
            return { ...l, cardImageUrl };
          })
        );
        
        lessonsWithUrls.sort((a, b) => a.order - b.order);
        return { ...course, lessons: lessonsWithUrls };
      })
    );
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
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
    
    const lessonsWithUrls = await Promise.all(
      lessons.map(async (l) => {
        let cardImageUrl = null;
        if (l.cardImageId) {
          cardImageUrl = await ctx.storage.getUrl(l.cardImageId);
        }
        return { ...l, cardImageUrl };
      })
    );
    
    return { ...course, lessons: lessonsWithUrls.sort((a,b) => a.order - b.order) };
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
