import type { MetadataRoute } from "next";
import { studyBooks } from "@/data/studies";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://plainprophecy.com";

  const [blogPosts, publishedDoctrines] = await Promise.all([
    fetchQuery(api.blog.getAllPosts).catch(() => []),
    fetchQuery(api.doctrines.getAll).catch(() => []),
  ]);

  const blogPostRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const doctrineRoutes: MetadataRoute.Sitemap = publishedDoctrines.map((d) => ({
    url: `${baseUrl}/doctrine/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const studyLessonRoutes: MetadataRoute.Sitemap = studyBooks.flatMap((book) =>
    book.lessons.map((lesson) => ({
      url: `${baseUrl}/studies/${book.slug}/${lesson.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/doctrine`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/prophet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogPostRoutes,
    ...doctrineRoutes,
    ...studyLessonRoutes,
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
