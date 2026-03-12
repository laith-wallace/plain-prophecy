import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  prophecies: defineTable({
    idStr: v.string(), // e.g. "dream-statue"
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
  }).index("by_number", ["number"]),

  studyCourses: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    order: v.number(),
    published: v.boolean(),
  }).index("by_slug", ["slug"]),

  studyLessons: defineTable({
    courseId: v.id("studyCourses"),
    slug: v.string(),
    title: v.string(),
    order: v.number(),
    body: v.string(), // MDX string
    scriptureRef: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
  }).index("by_slug", ["slug"]).index("by_course", ["courseId"]),

  blogPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    author: v.string(),
    publishedAt: v.number(), // Timestamp
    body: v.string(), // MDX string
    tags: v.array(v.string()),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
  }).index("by_slug", ["slug"]).index("by_published_at", ["publishedAt"]),

  timelines: defineTable({
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
  }).index("by_type_order", ["type", "order"]),

  evidence: defineTable({
    num: v.string(),
    label: v.string(),
    title: v.string(),
    prophecyCol: v.object({
      label: v.string(),
      content: v.array(v.string()),
      scripture: v.string(),
    }),
    scriptureCol: v.object({
      label: v.string(),
      content: v.array(v.string()),
      scripture: v.string(),
    }),
    evidenceCol: v.object({
      label: v.string(),
      newsItems: v.array(v.object({
        headline: v.string(),
        meta: v.string(),
        body: v.string(),
      })),
    }),
    mediaCards: v.array(v.object({
      href: v.string(),
      icon: v.string(),
      outlet: v.string(),
      outletClass: v.string(),
      headline: v.string(),
      cta: v.string(),
    })),
    order: v.number(),
    published: v.boolean(),
  }).index("by_order", ["order"]),
});
