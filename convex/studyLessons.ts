import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

const sectionValidator = v.object({
  id: v.optional(v.string()),
  era: v.optional(v.string()),
  badge: v.optional(v.string()),
  heading: v.string(),
  body: v.optional(v.string()),
  contentBlocks: v.optional(v.array(v.object({ label: v.string(), text: v.string() }))),
  christCentre: v.optional(v.string()),
  keyVerse: v.optional(v.object({ text: v.string(), ref: v.string() })),
});

const lessonFields = {
  courseId: v.id("studyCourses"),
  slug: v.string(),
  title: v.string(),
  order: v.number(),
  body: v.string(),
  scriptureRef: v.string(),
  tags: v.array(v.string()),
  published: v.boolean(),
  readingTime: v.optional(v.number()),
  keyVerse: v.optional(v.string()),
  keyVerseRef: v.optional(v.string()),
  intro: v.optional(v.string()),
  christCentre: v.optional(v.string()),
  nextLesson: v.optional(v.object({ book: v.string(), lesson: v.string(), title: v.string() })),
  sections: v.optional(v.array(sectionValidator)),
  cardImageId: v.optional(v.string()),
};

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const lesson = await ctx.db
      .query("studyLessons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("published"), true))
      .first();
    
    if (!lesson) return null;
    
    let cardImageUrl = null;
    if (lesson.cardImageId) {
      cardImageUrl = await ctx.storage.getUrl(lesson.cardImageId);
    }
    
    return { ...lesson, cardImageUrl };
  },
});

export const getByCourse = query({
  args: { courseId: v.id("studyCourses") },
  handler: async (ctx, args) => {
    const lessons = await ctx.db
      .query("studyLessons")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("published"), true))
      .order("asc")
      .collect();
    
    return Promise.all(
      lessons.map(async (l) => {
        let cardImageUrl = null;
        if (l.cardImageId) {
          cardImageUrl = await ctx.storage.getUrl(l.cardImageId);
        }
        return { ...l, cardImageUrl };
      })
    );
  },
});

export const getAllByCourseAdmin = query({
  args: { courseId: v.id("studyCourses") },
  handler: async (ctx, { courseId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    const lessons = await ctx.db
      .query("studyLessons")
      .withIndex("by_course", (q) => q.eq("courseId", courseId))
      .order("asc")
      .collect();
    
    return Promise.all(
      lessons.map(async (l) => {
        let cardImageUrl = null;
        if (l.cardImageId) {
          cardImageUrl = await ctx.storage.getUrl(l.cardImageId);
        }
        return { ...l, cardImageUrl };
      })
    );
  },
});

export const getByIdAdmin = query({
  args: { id: v.id("studyLessons") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    const lesson = await ctx.db.get(id);
    if (!lesson) return null;
    
    let cardImageUrl = null;
    if (lesson.cardImageId) {
      cardImageUrl = await ctx.storage.getUrl(lesson.cardImageId);
    }
    
    return { ...lesson, cardImageUrl };
  },
});

export const getAllSlugs = query({
  handler: async (ctx) => {
    const lessons = await ctx.db.query("studyLessons").collect();
    const courses = await ctx.db.query("studyCourses").collect();
    const courseMap = new Map(courses.map((c) => [c._id, c.slug]));
    return lessons
      .filter((l) => l.published)
      .map((l) => ({ book: courseMap.get(l.courseId) ?? "", lesson: l.slug }));
  },
});

export const add = mutation({
  args: lessonFields,
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.insert("studyLessons", args);
  },
});

export const update = mutation({
  args: { id: v.id("studyLessons"), ...lessonFields },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("studyLessons") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});
