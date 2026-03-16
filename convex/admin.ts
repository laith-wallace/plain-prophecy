import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const dashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");

    const [
      evidence,
      prophecies,
      timelines,
      studyCourses,
      studyLessons,
      doctrines,
      blog,
      pillars,
      compareHighlights,
    ] = await Promise.all([
      ctx.db.query("evidence").collect(),
      ctx.db.query("prophecies").collect(),
      ctx.db.query("timelines").collect(),
      ctx.db.query("studyCourses").collect(),
      ctx.db.query("studyLessons").collect(),
      ctx.db.query("doctrines").collect(),
      ctx.db.query("blogPosts").collect(),
      ctx.db.query("pillars").collect(),
      ctx.db.query("compareHighlights").collect(),
    ]);

    return {
      evidence: { total: evidence.length, published: evidence.filter((e) => e.published).length },
      prophecies: { total: prophecies.length, published: prophecies.filter((p) => p.published).length },
      timelines: { total: timelines.length },
      studyCourses: { total: studyCourses.length, published: studyCourses.filter((c) => c.published).length },
      studyLessons: { total: studyLessons.length, published: studyLessons.filter((l) => l.published).length },
      doctrines: { total: doctrines.length, published: doctrines.filter((d) => d.published).length },
      blog: { total: blog.length, published: blog.filter((p) => p.published).length },
      pillars: { total: pillars.length },
      compareHighlights: { total: compareHighlights.length },
    };
  },
});
