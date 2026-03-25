"use client";

import React from "react";
import StudyCardFront from "@/components/studies/StudyCardFront";
import { getCardMeta } from "@/data/studyCardMeta";
import { LESSON_CARD_IMAGES } from "@/data/lessonCardImages";

interface StudyCardPreviewProps {
  lesson: {
    slug: string;
    title: string;
    scriptureRef: string;
    readingTime?: number;
  };
  cardImageUrl?: string | null;
}

export default function StudyCardPreview({ lesson, cardImageUrl }: StudyCardPreviewProps) {
  const meta = getCardMeta(lesson.slug);
  const fallbackImage = LESSON_CARD_IMAGES[lesson.slug];
  const displayImage = cardImageUrl || fallbackImage;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider">Card Preview</h3>
      <div className="relative group">
        <div className="w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-stone-800">
          <StudyCardFront
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            lesson={lesson as any}
            meta={meta} 
            cardImage={displayImage} 
          />
        </div>
        <div className="mt-2 text-[10px] text-stone-500 italic">
          {cardImageUrl ? "Using uploaded artwork" : fallbackImage ? "Using legacy hardcoded artwork" : "No artwork assigned"}
        </div>
      </div>
    </div>
  );
}
