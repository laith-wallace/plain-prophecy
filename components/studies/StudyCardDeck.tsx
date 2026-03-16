"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { StudyLesson, StudyBook } from "@/data/studies";
import { getCardMeta } from "@/data/studyCardMeta";
import StudyCard from "./StudyCard";

// Flatten all lessons into a single ordered list with their book context
interface FlatLesson {
  lesson: StudyLesson;
  book: StudyBook;
}

function buildFlatLessons(
  books: (StudyBook & { lessons: StudyLesson[] })[],
  bookFilter: string
): FlatLesson[] {
  return books
    .filter((book) => bookFilter === "all" || book.slug === bookFilter)
    .flatMap((book) => book.lessons.map((lesson) => ({ lesson, book })));
}

// Wrap index for infinite loop
function wrap(index: number, total: number): number {
  return ((index % total) + total) % total;
}

// Responsive card width — matches CSS: min(360px, 82vw) | min(320px, 92vw) on phones
function getCardWidth(): number {
  if (typeof window === "undefined") return 320;
  const vw = window.innerWidth;
  return vw <= 480 ? Math.min(320, vw * 0.92) : Math.min(360, vw * 0.82);
}

interface StudyCardDeckProps {
  bookFilter?: string;
}

export default function StudyCardDeck({ bookFilter = "all" }: StudyCardDeckProps) {
  const booksData = useQuery(api.studyCourses.getAllWithLessons);
  const lessons = booksData ? buildFlatLessons(booksData as (StudyBook & { lessons: StudyLesson[] })[], bookFilter) : [];
  const TOTAL = lessons.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardW, setCardW] = useState(getCardWidth);

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

  // Reset to first card when filter changes
  useEffect(() => {
    setActiveIndex(0);
    setFlippedIndex(null);
  }, [bookFilter]);

  // Keep cardW in sync with window size (phone rotation, etc.)
  useEffect(() => {
    const onResize = () => setCardW(getCardWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || TOTAL === 0) return;
      setFlippedIndex(null);
      setActiveIndex(wrap(index, TOTAL));
    },
    [isAnimating, TOTAL]
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
      // Tap — setPointerCapture swallows the click event so we flip directly here
      setDragOffset(0);
      const activeLessonIdx = wrap(activeIndex, TOTAL);
      setFlippedIndex((prev) => (prev === activeLessonIdx ? null : activeLessonIdx));
    } else {
      // Snap back
      setDragOffset(0);
    }
  }

  if (booksData === undefined) {
    return (
      <div className="scd-root">
        <div className="si-skeleton">
          <div className="si-skeleton-card" />
        </div>
      </div>
    );
  }

  if (TOTAL === 0) {
    return (
      <div className="scd-root">
        <div className="scd-empty">No studies in this book yet.</div>
      </div>
    );
  }

  // ── Card rendering window ─────────────────────────────────────────────────
  const slots = [
    { slot: -1, lessonIndex: wrap(activeIndex - 1, TOTAL) },
    { slot: 0,  lessonIndex: wrap(activeIndex,     TOTAL) },
    { slot: 1,  lessonIndex: wrap(activeIndex + 1, TOTAL) },
    { slot: 2,  lessonIndex: wrap(activeIndex + 2, TOTAL) },
  ];

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
          const { lesson, book } = lessons[lessonIndex];
          const meta = getCardMeta(lesson.slug);
          const isActive = slot === 0;
          const isFlipped = flippedIndex === lessonIndex;

          // Pixel offset from centre
          const baseX = slot * (cardW + GAP);
          let scale = 1;
          let opacity = 1;
          const zIndex = 10 - Math.abs(slot);

          if (slot === -1) { scale = 0.88; opacity = 0.35; }
          else if (slot === 1) { scale = 0.88; opacity = 0.55; }
          else if (slot === 2) { scale = 0.78; opacity = 0.25; }

          // Apply live drag to active card + shift neighbours proportionally
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
                onUnflip={() => setFlippedIndex(null)}
              />
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="scd-dots" aria-label="Study card position">
        {lessons.map((_, i) => (
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
