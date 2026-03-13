"use client";

import { StudyBook, StudyLesson } from "@/data/studies";
import InteractiveStudyTemplate from "./InteractiveStudyTemplate";
import Daniel2Statue from "./Visuals/Daniel2Statue";
// import GospelPlaceholder from "./GospelPlaceholder";

interface StudyContentProps {
  book: StudyBook;
  lesson: StudyLesson;
}

export default function StudyContent({ book, lesson }: StudyContentProps) {

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
