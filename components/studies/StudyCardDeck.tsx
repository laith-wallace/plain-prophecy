"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { studyBooks, type StudyLesson, type StudyBook } from "@/data/studies";
import { getCardMeta } from "@/data/studyCardMeta";
import StudyCard from "./StudyCard";

// Flatten all lessons into a single ordered list with their book context
interface FlatLesson {
  lesson: StudyLesson;
  book: StudyBook;
}

function buildFlatLessons(): FlatLesson[] {
  return studyBooks.flatMap((book) =>
    book.lessons.map((lesson) => ({ lesson, book }))
  );
}

const ALL_LESSONS = buildFlatLessons();
const TOTAL = ALL_LESSONS.length;

// Wrap index for infinite loop
function wrap(index: number, total: number): number {
  return ((index % total) + total) % total;
}

export default function StudyCardDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const deckRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (flippedIndex !== null) {
        if (e.key === "Escape") setFlippedIndex(null);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const dir = e.key === "ArrowRight" ? 1 : -1;
        goTo(activeIndex + dir);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, flippedIndex]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setFlippedIndex(null);
      setActiveIndex(wrap(index, TOTAL));
    },
    [isAnimating]
  );

  // ── Drag handlers ─────────────────────────────────────────────────────────
  function handlePointerDown(e: React.PointerEvent) {
    if (flippedIndex !== null) return; // no dragging while flipped
    isDragging.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setDragOffset(delta);
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - startX.current;
    const screenW = deckRef.current?.offsetWidth ?? 400;
    const COMMIT_THRESHOLD = screenW * 0.28; // 28% screen width to commit swipe

    if (Math.abs(delta) > COMMIT_THRESHOLD) {
      const dir = delta > 0 ? -1 : 1; // drag right → go back, drag left → go forward
      setIsAnimating(true);
      setDragOffset(dir * (screenW + 100)); // fly off screen
      setTimeout(() => {
        goTo(activeIndex + dir);
        setDragOffset(0);
        setIsAnimating(false);
      }, 260);
    } else if (Math.abs(delta) < 6) {
      // Tap — handled by card's own onClick
      setDragOffset(0);
    } else {
      // Snap back
      setDragOffset(0);
    }
  }

  // ── Card rendering window ─────────────────────────────────────────────────
  // Visible slots: prev(-1), active(0), next(+1), far-next(+2)
  const slots = [
    { slot: -1, lessonIndex: wrap(activeIndex - 1, TOTAL) },
    { slot: 0,  lessonIndex: wrap(activeIndex,     TOTAL) },
    { slot: 1,  lessonIndex: wrap(activeIndex + 1, TOTAL) },
    { slot: 2,  lessonIndex: wrap(activeIndex + 2, TOTAL) },
  ];

  // Card width in px (approximated — CSS uses min(360px, 82vw))
  const cardW = typeof window !== "undefined" ? Math.min(360, window.innerWidth * 0.82) : 320;
  // Gap between card edges
  const GAP = 18;

  const tilt =
    dragOffset !== 0
      ? Math.max(-13, Math.min(13, (dragOffset / (cardW * 0.2)) * 13))
      : 0;

  return (
    <div className="scd-root" ref={deckRef}>
      {/* Card rail */}
      <div
        className="scd-rail"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {slots.map(({ slot, lessonIndex }) => {
          const { lesson, book } = ALL_LESSONS[lessonIndex];
          const meta = getCardMeta(lesson.slug);
          const isActive = slot === 0;
          const isFlipped = flippedIndex === lessonIndex;

          // Pixel offset from centre
          let baseX = slot * (cardW + GAP);
          let scale = 1;
          let opacity = 1;
          let zIndex = 10 - Math.abs(slot);

          if (slot === -1) { scale = 0.88; opacity = 0.35; }
          else if (slot === 1) { scale = 0.88; opacity = 0.55; }
          else if (slot === 2) { scale = 0.78; opacity = 0.25; }

          // Apply live drag to active card + shift neighbours proportionally
          const dragFrac = isAnimating ? 0 : dragOffset / cardW;
          const shiftX = isActive ? dragOffset : slot !== -1 ? -dragOffset * 0.25 : 0;
          const totalX = baseX + shiftX;
          const rotate = isActive ? tilt : 0;
          const isDragged = isActive && isDragging.current;

          return (
            <div
              key={lessonIndex}
              className={`scd-card-wrap ${isActive ? "scd-card-wrap--active" : ""}`}
              style={{
                transform: `translateX(${totalX}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition: isDragged ? "none" : "transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <StudyCard
                lesson={lesson}
                book={book}
                meta={meta}
                isFlipped={isFlipped}
                onFlip={() => setFlippedIndex(isFlipped ? null : lessonIndex)}
                onUnflip={() => setFlippedIndex(null)}
              />
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="scd-dots" aria-label="Study card position">
        {ALL_LESSONS.map((_, i) => (
          <button
            key={i}
            className={`scd-dot ${i === wrap(activeIndex, TOTAL) ? "scd-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to study ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        className="scd-arrow scd-arrow--prev"
        onClick={() => goTo(activeIndex - 1)}
        aria-label="Previous study"
      >
        ‹
      </button>
      <button
        className="scd-arrow scd-arrow--next"
        onClick={() => goTo(activeIndex + 1)}
        aria-label="Next study"
      >
        ›
      </button>
    </div>
  );
}
