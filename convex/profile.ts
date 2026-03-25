import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

const LEVEL_THRESHOLDS = { intermediate: 5, advanced: 15 } as const;

const answersArg = v.optional(v.object({
  motivation: v.optional(v.string()),
  foundation: v.optional(v.string()),
  methodology: v.optional(v.string()),
  background: v.optional(v.string()),
  goal: v.optional(v.string()),
}));

export const updateProfile = mutation({
  args: {
    spiritualLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
    interests: v.optional(v.array(v.string())),
    funnelLevel: v.optional(v.union(v.literal("basic"), v.literal("intermediate"), v.literal("advanced"))),
    onboardingComplete: v.optional(v.boolean()),
    lastLessonId: v.optional(v.id("studyLessons")),
    answers: answersArg,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const { answers, ...rest } = args;
    await ctx.db.patch(userId, {
      ...rest,
      ...(answers !== undefined ? { onboardingAnswers: answers } : {}),
    });
  },
});

export const updateProfileImage = mutation({
  args: { image: v.string() },
  handler: async (ctx, { image }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(userId, { image });
  },
});

export const resetOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    await ctx.db.patch(userId, { onboardingComplete: false });
  },
});

export const getTailoredContent = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);
    if (!user || !user.onboardingComplete) return null;

    const interests = user.interests || [];
    const level = user.spiritualLevel || "beginner";

    // Simple logic to find matching lessons
    const allLessons = await ctx.db.query("studyLessons").filter(q => q.eq(q.field("published"), true)).collect();

    // Map interests to lesson slugs or tags
    const interestMap: Record<string, string[]> = {
      evidence: ["day-year-principle", "seventy-weeks-decoded"],
      application: ["heavenly-sanctuary"],
      current_events: ["twelve-sixty-years"],
      revelation: ["little-horn-identified"],
    };

    const recommendedSlugs = new Set<string>();
    interests.forEach((interest: string) => {
      (interestMap[interest] || []).forEach((slug: string) => recommendedSlugs.add(slug));
    });

    // If no interests matched, provide defaults based on level
    if (recommendedSlugs.size === 0) {
      if (level === "beginner") {
        recommendedSlugs.add("day-year-principle");
      } else {
        recommendedSlugs.add("twelve-sixty-years");
      }
    }

    const filteredLessons = allLessons.filter(l => recommendedSlugs.has(l.slug));

    const lessonsWithCourse = await Promise.all(filteredLessons.map(async (l) => {
      const course = await ctx.db.get(l.courseId);
      return { ...l, courseSlug: course?.slug || "" };
    }));

    return lessonsWithCourse;
  },
});

export const markLessonCompleteBySlug = mutation({
  args: { bookSlug: v.string(), lessonSlug: v.string() },
  handler: async (ctx, { bookSlug, lessonSlug }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Resolve the course
    const course = await ctx.db
      .query("studyCourses")
      .withIndex("by_slug", (q) => q.eq("slug", bookSlug))
      .first();
    if (!course) return;

    // Resolve the lesson
    const lesson = await ctx.db
      .query("studyLessons")
      .withIndex("by_course", (q) => q.eq("courseId", course._id))
      .collect()
      .then((ls) => ls.find((l) => l.slug === lessonSlug));
    if (!lesson) return;

    const user = await ctx.db.get(userId);
    const completed = user?.completedLessons ?? [];
    if (completed.includes(lesson._id)) return; // already marked

    const next = [...completed, lesson._id];

    // Auto-promote spiritual level at thresholds
    let level = user?.spiritualLevel ?? "beginner";
    if (next.length >= LEVEL_THRESHOLDS.advanced) level = "advanced";
    else if (next.length >= LEVEL_THRESHOLDS.intermediate) level = "intermediate";

    // Streak tracking
    const today = new Date().toISOString().slice(0, 10);
    const lastDate = user?.lastActiveDate ?? "";
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
    const newStreak =
      lastDate === today ? (user?.currentStreak ?? 1)
      : lastDate === yesterday ? (user?.currentStreak ?? 0) + 1
      : 1;

    await ctx.db.patch(userId, {
      completedLessons: next,
      spiritualLevel: level,
      lastActiveDate: today,
      currentStreak: newStreak,
    });
  },
});

export const getProgress = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    const completedLessons = user?.completedLessons ?? [];
    return {
      completedCount: completedLessons.length,
      completedIds: completedLessons,
      spiritualLevel: user?.spiritualLevel ?? "beginner",
      totalXp: completedLessons.length * 100,
      streak: user?.currentStreak ?? 0,
    };
  },
});

export const markLessonStarted = mutation({
  args: { bookSlug: v.string(), lessonSlug: v.string() },
  handler: async (ctx, { bookSlug, lessonSlug }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return;

    const course = await ctx.db
      .query("studyCourses")
      .withIndex("by_slug", (q) => q.eq("slug", bookSlug))
      .first();
    if (!course) return;

    const lesson = await ctx.db
      .query("studyLessons")
      .withIndex("by_course", (q) => q.eq("courseId", course._id))
      .collect()
      .then((ls) => ls.find((l) => l.slug === lessonSlug));
    if (!lesson) return;

    const user = await ctx.db.get(userId);
    const started = user?.startedLessons ?? [];
    if (started.includes(lesson._id)) return; // already recorded

    await ctx.db.patch(userId, {
      startedLessons: [...started, lesson._id],
      lastLessonId: lesson._id,
    });
  },
});

export const isLessonComplete = query({
  args: { bookSlug: v.string(), lessonSlug: v.string() },
  handler: async (ctx, { bookSlug, lessonSlug }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const course = await ctx.db
      .query("studyCourses")
      .withIndex("by_slug", (q) => q.eq("slug", bookSlug))
      .first();
    if (!course) return false;

    const lesson = await ctx.db
      .query("studyLessons")
      .withIndex("by_course", (q) => q.eq("courseId", course._id))
      .collect()
      .then((ls) => ls.find((l) => l.slug === lessonSlug));
    if (!lesson) return false;

    const user = await ctx.db.get(userId);
    return (user?.completedLessons ?? []).includes(lesson._id);
  },
});

export const getLastLesson = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    if (!user?.lastLessonId) return null;
    const lesson = await ctx.db.get(user.lastLessonId);
    if (!lesson) return null;
    const course = await ctx.db.get(lesson.courseId);
    return {
      title: lesson.title,
      slug: lesson.slug,
      courseSlug: course?.slug ?? "",
      courseTitle: course?.title ?? "",
      intro: lesson.intro ?? null,
      readingTime: lesson.readingTime ?? null,
    };
  },
});

// ★ SCHEMA CHANGE — run npx convex deploy
export const getStudyCompletionMap = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return {};
    const user = await ctx.db.get(userId);
    const completedIds = new Set(user?.completedLessons ?? []);
    const startedIds = new Set(user?.startedLessons ?? []);
    const allLessons = await ctx.db
      .query("studyLessons")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
    const map: Record<string, { completed: boolean; started: boolean }> = {};
    for (const lesson of allLessons) {
      map[lesson.slug] = {
        completed: completedIds.has(lesson._id),
        started: startedIds.has(lesson._id),
      };
    }
    return map;
  },
});
