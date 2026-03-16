import type { MetadataRoute } from "next";
import { doctrines } from "@/data/doctrines";
import { studyBooks } from "@/data/studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://plainprophecy.com";

  const doctrineRoutes: MetadataRoute.Sitemap = doctrines.map((d) => ({
    url: `${baseUrl}/doctrine/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
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
      url: `${baseUrl}/prophet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
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
