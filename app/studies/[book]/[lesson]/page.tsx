import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import StudyContent from "@/components/studies/StudyContent";

interface Props {
  params: Promise<{ book: string; lesson: string }>;
}

async function getCourseAndLesson(bookSlug: string, lessonSlug: string) {
  const course = await fetchQuery(api.studyCourses.getWithLessons, { slug: bookSlug });
  if (!course) return null;
  const lesson = course.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { book: course, lesson };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book: bookSlug, lesson: lessonSlug } = await params;
  const found = await getCourseAndLesson(bookSlug, lessonSlug);
  if (!found) return { title: "Study Not Found" };

  const { book, lesson } = found;
  return {
    title: `${lesson.title} — ${book.title} Study`,
    description: lesson.intro,
    alternates: {
      canonical: `https://plainprophecy.com/studies/${bookSlug}/${lessonSlug}`,
    },
    openGraph: {
      title: `${lesson.title} | Plain Prophecy Studies`,
      description: lesson.intro,
      url: `https://plainprophecy.com/studies/${bookSlug}/${lessonSlug}`,
      type: "article",
    },
  };
}

export default async function StudyLessonPage({ params }: Props) {
  const { book: bookSlug, lesson: lessonSlug } = await params;
  const found = await getCourseAndLesson(bookSlug, lessonSlug);
  if (!found) notFound();

  return <StudyContent book={found.book} lesson={found.lesson} />;
}
