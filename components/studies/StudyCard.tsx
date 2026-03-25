"use client";

import React from "react";
import type { StudyLesson, StudyBook } from "@/data/studies";
import type { StudyCardMeta } from "@/data/studyCardMeta";
import StudyCardFront from "./StudyCardFront";
import StudyCardBack from "./StudyCardBack";
import { LESSON_CARD_IMAGES } from "@/data/lessonCardImages";
import { motion } from "framer-motion";

interface Props {
  lesson: StudyLesson;
  book: StudyBook;
  meta: StudyCardMeta;
  isFlipped: boolean;
  onUnflip: () => void;
}

export default function StudyCard({
  lesson,
  book,
  meta,
  isFlipped,
  onUnflip,
}: Props) {
  const studyHref = `/studies/${book.slug}/${lesson.slug}`;
  const cardImage = lesson.cardImageUrl || LESSON_CARD_IMAGES[lesson.slug];

  return (
    <div className="sc-root">
      <motion.div
        className="sc-flipper"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 1.1,
          restDelta: 0.001
        }}
        style={{ transformStyle: "preserve-3d" }}
        aria-label={isFlipped ? `${lesson.title} details` : `${lesson.title} — tap to explore`}
      >
        {/* Front */}
        <div 
          className="sc-face sc-face--front" 
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            zIndex: isFlipped ? 0 : 2,
            pointerEvents: isFlipped ? "none" : "auto"
          }}
        >
          <StudyCardFront lesson={lesson} meta={meta} cardImage={cardImage} />
        </div>

        {/* Back */}
        <div 
          className="sc-face sc-face--back" 
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            zIndex: isFlipped ? 2 : 0,
            pointerEvents: isFlipped ? "auto" : "none"
          }}
        >
          <StudyCardBack
            lesson={lesson}
            meta={meta}
            studyHref={studyHref}
            onClose={onUnflip}
          />
        </div>
      </motion.div>
    </div>
  );
}
