"use client";

import { StudyBook, StudyLesson } from "@/data/studies";
import InteractiveStudyTemplate from "./InteractiveStudyTemplate";
import Daniel2Statue from "./Visuals/Daniel2Statue";
import GospelPlaceholder from "./GospelPlaceholder";

interface StudyContentProps {
  book: StudyBook;
  lesson: StudyLesson;
}

export default function StudyContent({ book, lesson }: StudyContentProps) {
  // If this is a gospel study, show the dedicated placeholder
  if (book.slug === "gospel") {
    // Generate a quick placeholder configuration based on the lesson
    const svgMotif = (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
        <path d="M80 20 L88 72 L140 80 L88 88 L80 140 L72 88 L20 80 L72 72 Z" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinejoin="round" />
        <path d="M80 80 L115 45 M80 80 L115 115 M80 80 L45 115 M80 80 L45 45" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="80" cy="80" r="16" stroke="#C9A84C" strokeWidth="2" fill="#08080F" />
        <circle cx="80" cy="80" r="4" fill="#C9A84C" />
      </svg>
    );

    return (
      <GospelPlaceholder
        eyebrow="The Gospel · Coming Soon"
        title={
          <>
            {lesson.title.split(' ')[0]} <span className="text-[#C9A84C]">{lesson.title.split(' ').slice(1).join(' ')}</span>
          </>
        }
        subtitle="This study is currently in development."
        bodyText="We're currently writing the content for this crucial section. When completed, this study will explore how every prophetic text points to Christ's life, death, and resurrection."
        anchorVerse={<>&quot;{lesson.keyVerse}&quot; — {lesson.keyVerseRef}</>}
        svgMotif={svgMotif}
      />
    );
  }

  // Determine which visual component to use based on the lesson slug
  let VisualComponent = undefined;
  
  if (lesson.slug === "daniel-2") {
    VisualComponent = Daniel2Statue;
  }
  // Add more conditions here as we create visuals for other studies (e.g. Daniel 7)

  return (
    <InteractiveStudyTemplate 
      book={book} 
      lesson={lesson} 
      VisualComponent={VisualComponent} 
    />
  );
}
