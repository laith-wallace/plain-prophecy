import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findLesson, studyBooks } from "@/data/studies";
import StudyContent from "@/components/studies/StudyContent";

interface Props {
  params: Promise<{ book: string; lesson: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { book: bookSlug, lesson: lessonSlug } = await params;
  const found = findLesson(bookSlug, lessonSlug);
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

export function generateStaticParams() {
  return studyBooks.flatMap((book) =>
    book.lessons.map((lesson) => ({
      book: book.slug,
      lesson: lesson.slug,
    }))
  );
}

export default async function StudyLessonPage({ params }: Props) {
  const { book: bookSlug, lesson: lessonSlug } = await params;
  const found = findLesson(bookSlug, lessonSlug);
  if (!found) notFound();

  return <StudyContent book={found.book} lesson={found.lesson} />;
}
