import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { blogPosts } from "../data/blog-posts";

export const getAllPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_published_at")
      .filter((q) => q.eq(q.field("published"), true))
      .order("desc")
      .collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getAllAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.query("blogPosts").withIndex("by_published_at").order("desc").collect();
  },
});

export const getByIdAdmin = query({
  args: { id: v.id("blogPosts") },
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
    excerpt: v.string(),
    author: v.string(),
    publishedAt: v.number(),
    body: v.string(),
    tags: v.array(v.string()),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    ogImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    return await ctx.db.insert("blogPosts", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    author: v.string(),
    publishedAt: v.number(),
    body: v.string(),
    tags: v.array(v.string()),
    coverImage: v.optional(v.string()),
    published: v.boolean(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    ogImage: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...rest }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthenticated");
    await ctx.db.delete(id);
  },
});

export const syncBlogPosts = mutation({
  args: {},
  handler: async (ctx) => {
    for (const post of blogPosts) {
      const existing = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", post.slug))
        .first();

      const fields = {
        ...post,
        published: true,
      };

      if (existing) {
        await ctx.db.patch(existing._id, fields);
      } else {
        await ctx.db.insert("blogPosts", fields);
      }
    }
    console.log("Blog posts sync complete!");
  },
});
