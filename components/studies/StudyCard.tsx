"use client";

import React from "react";
import Link from "next/link";
import type { StudyLesson, StudyBook } from "@/data/studies";
import type { StudyCardMeta } from "@/data/studyCardMeta";
import StudyCardFront from "./StudyCardFront";
import StudyCardBack from "./StudyCardBack";

interface Props {
  lesson: StudyLesson;
  book: StudyBook;
  meta: StudyCardMeta;
  isFlipped: boolean;
  onFlip: () => void;
  onUnflip: () => void;
}

export default function StudyCard({
  lesson,
  book,
  meta,
  isFlipped,
  onFlip,
  onUnflip,
}: Props) {
  const studyHref = `/studies/${book.slug}/${lesson.slug}`;

  return (
    <div className="sc-root">
      <div
        className={`sc-flipper ${isFlipped ? "sc-flipper--flipped" : ""}`}
        aria-label={isFlipped ? `${lesson.title} details` : `${lesson.title} — tap to explore`}
      >
        {/* Front */}
        <div className="sc-face sc-face--front">
          <StudyCardFront lesson={lesson} meta={meta} />
        </div>

        {/* Back */}
        <div className="sc-face sc-face--back">
          <StudyCardBack
            lesson={lesson}
            meta={meta}
            studyHref={studyHref}
            onClose={onUnflip}
          />
        </div>
      </div>
    </div>
  );
}
