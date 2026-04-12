import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  prophecies: defineTable({
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
  }).index("by_number", ["number"]),

  studyCourses: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    order: v.number(),
    published: v.boolean(),
    icon: v.optional(v.string()),
    hasSeparator: v.optional(v.boolean()),
  }).index("by_slug", ["slug"]),

  studyLessons: defineTable({
    courseId: v.id("studyCourses"),
    slug: v.string(),
    title: v.string(),
    order: v.number(),
    body: v.string(),
    scriptureRef: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
    // Structured content (from data/studies.ts migration)
    readingTime: v.optional(v.number()),
    keyVerse: v.optional(v.string()),
    keyVerseRef: v.optional(v.string()),
    intro: v.optional(v.string()),
    christCentre: v.optional(v.string()),
    nextLesson: v.optional(v.object({
      book: v.string(),
      lesson: v.string(),
      title: v.string(),
    })),
    sections: v.optional(v.array(v.object({
      id: v.optional(v.string()),
      era: v.optional(v.string()),
      badge: v.optional(v.string()),
      heading: v.string(),
      body: v.optional(v.string()),
      contentBlocks: v.optional(v.array(v.object({
        label: v.string(),
        text: v.string(),
      }))),
      christCentre: v.optional(v.string()),
      keyVerse: v.optional(v.object({
        text: v.string(),
        ref: v.string(),
      })),
    }))),
    cardImageId: v.optional(v.string()),
  }).index("by_slug", ["slug"]).index("by_course", ["courseId"]),

  blogPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    author: v.string(),
    authorBio: v.optional(v.string()),
    authorImage: v.optional(v.string()),
    authorTwitter: v.optional(v.string()),
    authorLinkedIn: v.optional(v.string()),
    publishedAt: v.number(),
    lastUpdated: v.optional(v.number()),
    readingTime: v.optional(v.number()),
    body: v.string(),
    bodyJson: v.optional(v.any()), // ★ Rich text editor JSON (Tiptap); body kept for backwards compat
    tags: v.array(v.string()),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    ogImage: v.optional(v.string()),
  }).index("by_slug", ["slug"]).index("by_published_at", ["publishedAt"]),

  timelines: defineTable({
    type: v.union(v.literal("futurist"), v.literal("sda"), v.literal("preterist")),
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

  doctrines: defineTable({
    slug: v.string(),
    title: v.string(),
    subtitle: v.string(),
    scriptureRef: v.string(),
    category: v.union(
      v.literal("rapture"),
      v.literal("antichrist"),
      v.literal("daniel"),
      v.literal("revelation")
    ),
    intro: v.string(),
    sections: v.array(v.object({
      id: v.string(),
      heading: v.string(),
      badge: v.optional(v.string()),
      era: v.optional(v.string()),
      contentBlocks: v.array(v.object({
        label: v.string(),
        text: v.string(),
      })),
      christCentre: v.optional(v.string()),
      keyVerse: v.optional(v.object({
        text: v.string(),
        ref: v.string(),
      })),
    })),
    christCentre: v.string(),
    verdict: v.string(),
    nextDoctrine: v.optional(v.object({
      slug: v.string(),
      title: v.string(),
    })),
    published: v.boolean(),
    order: v.number(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    ogImage: v.optional(v.string()),
  }).index("by_slug", ["slug"]).index("by_order", ["order"]),

  pillars: defineTable({
    num: v.string(),
    label: v.string(),
    title: v.string(),
    paragraphs: v.array(v.string()),
    order: v.number(),
  }).index("by_order", ["order"]),

  compareHighlights: defineTable({
    type: v.union(v.literal("futuristWeakness"), v.literal("preteristWeakness"), v.literal("sdaStrength")),
    text: v.string(),
    order: v.number(),
  }).index("by_type_order", ["type", "order"]),
  users: defineTable({
    // Auth fields (required by @convex-dev/auth)
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),

    // Custom profile fields
    role: v.optional(v.union(v.literal("admin"), v.literal("user"))),
    // Added for Profile & Funnel
    spiritualLevel: v.optional(v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced"))),
    interests: v.optional(v.array(v.string())),
    funnelLevel: v.optional(v.union(v.literal("basic"), v.literal("intermediate"), v.literal("advanced"))),
    onboardingComplete: v.optional(v.boolean()),
    lastLessonId: v.optional(v.id("studyLessons")),
    completedLessons: v.optional(v.array(v.id("studyLessons"))),
    startedLessons: v.optional(v.array(v.id("studyLessons"))),
    currentStreak: v.optional(v.number()),
    lastActiveDate: v.optional(v.string()),
    // Word Quest game progress (legacy — kept for backward compat)
    wordQuestGamesPlayed: v.optional(v.number()),
    wordQuestHighScores: v.optional(v.object({
      level1: v.number(),
      level2: v.number(),
      level3: v.number(),
    })),
    // Unified game state (synced from PlayerContext localStorage)
    gameState: v.optional(v.object({
      totalXP: v.number(),
      currentStreak: v.number(),
      longestStreak: v.number(),
      lastActiveDate: v.string(),
      soundEnabled: v.boolean(),
      trophies: v.any(), // Record<TrophyId, { unlockedAt: number }>
      games: v.object({
        daniel: v.object({
          completions: v.number(),
          bestTime: v.optional(v.number()),
          cardsRevealed: v.array(v.string()),
          fulfillmentChoices: v.any(),
        }),
        gospel: v.object({
          completions: v.number(),
          bestTime: v.optional(v.number()),
          cardsRevealed: v.array(v.string()),
          fulfillmentChoices: v.any(),
        }),
        revelation: v.object({
          completions: v.number(),
          bestTime: v.optional(v.number()),
          cardsRevealed: v.array(v.string()),
          fulfillmentChoices: v.any(),
          lastCardIndex: v.number(),
        }),
        verseMemory: v.object({ cardProgress: v.any() }),
        wordQuest: v.object({
          levelsCompleted: v.array(v.number()),
          bestScores: v.any(),
        }),
      }),
      syncedAt: v.number(),
    })),
    // Raw onboarding survey answers for user personalisation data
    onboardingAnswers: v.optional(v.object({
      motivation: v.optional(v.string()),
      foundation: v.optional(v.string()),
      methodology: v.optional(v.string()),
      background: v.optional(v.string()),
      goal: v.optional(v.string()),
    })),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
});
