import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const updateProfile = mutation({
  args: {
    spiritualLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
    interests: v.optional(v.array(v.string())),
    funnelLevel: v.optional(v.union(v.literal("basic"), v.literal("intermediate"), v.literal("advanced"))),
    onboardingComplete: v.optional(v.boolean()),
    lastLessonId: v.optional(v.id("studyLessons")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    await ctx.db.patch(userId, {
      ...args,
    });
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
