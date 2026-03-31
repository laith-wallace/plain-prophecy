"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { verseMemoryCards, type VerseMemoryCard } from "@/data/verse-memory";
import {
  calculateNextReview,
  getCardProgress,
  getSortedQueue,
  loadProgress,
  nextDueTimestamp,
  saveProgress,
  type CardProgress,
  type Rating,
} from "@/lib/spaced-repetition";

// ─── Types ────────────────────────────────────────────────────────────────────

type GamePhase = "loading" | "empty" | "reviewing" | "session-done";

const SESSION_TARGET = 10;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatNextDue(ts: number): string {
  const diffMs = ts - Date.now();
  const diffH = Math.ceil(diffMs / (1000 * 60 * 60));
  if (diffH <= 1) return "less than an hour";
  if (diffH < 24) return `${diffH} hours`;
  const diffD = Math.ceil(diffH / 24);
  return diffD === 1 ? "tomorrow" : `${diffD} days`;
}

function bookLabel(book: VerseMemoryCard["book"]): string {
  const map: Record<VerseMemoryCard["book"], string> = {
    daniel: "Daniel",
    revelation: "Revelation",
    isaiah: "Isaiah",
    genesis: "Genesis",
    psalms: "Psalms",
    zechariah: "Zechariah",
    micah: "Micah",
    matthew: "Matthew",
    hebrews: "Hebrews",
  };
  return map[book];
}

// ─── SessionProgressBar ───────────────────────────────────────────────────────

function SessionProgressBar({ answered }: { answered: number }) {
  const pct = Math.min(100, (answered / SESSION_TARGET) * 100);
  return (
    <div className="vm-progress-track" aria-hidden="true">
      <div className="vm-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

// ─── RatingButtons ────────────────────────────────────────────────────────────

function RatingButtons({ onRate }: { onRate: (r: Rating) => void }) {
  return (
    <div className="vm-rating-row" role="group" aria-label="Rate your recall">
      <button className="vm-rating-btn vm-rating-again" onClick={() => onRate(0)}>
        Again
      </button>
      <button className="vm-rating-btn vm-rating-hard" onClick={() => onRate(1)}>
        Hard
      </button>
      <button className="vm-rating-btn vm-rating-good" onClick={() => onRate(2)}>
        Good
      </button>
      <button className="vm-rating-btn vm-rating-easy" onClick={() => onRate(3)}>
        Easy
      </button>
    </div>
  );
}

// ─── MemoryCard ───────────────────────────────────────────────────────────────

function MemoryCard({
  card,
  isFlipped,
  onReveal,
  onRate,
}: {
  card: VerseMemoryCard;
  isFlipped: boolean;
  onReveal: () => void;
  onRate: (r: Rating) => void;
}) {
  return (
    <div className="vm-card" aria-live="polite">
      <div className={`vm-card-inner${isFlipped ? " vm-card-inner--flipped" : ""}`}>
        {/* Front */}
        <div className="vm-card-face vm-card-front" aria-hidden={isFlipped}>
          <div className="vm-card-badges">
            <span className="vm-badge vm-badge--book">{bookLabel(card.book)}</span>
            <span className="vm-badge vm-badge--theme">{card.theme}</span>
          </div>
          <div className="vm-card-reference">{card.reference}</div>
          <p className="vm-card-clue">{card.contextClue}</p>
          <button className="vm-reveal-btn" onClick={onReveal} autoFocus>
            Reveal verse
          </button>
        </div>

        {/* Back */}
        <div className="vm-card-face vm-card-back" aria-hidden={!isFlipped}>
          <div className="vm-card-reference vm-card-reference--back">{card.reference}</div>
          <blockquote className="vm-verse-text">{card.verseText}</blockquote>
          <div className="vm-christ-anchor">
            <span className="vm-christ-anchor-label">Christ anchor</span>
            {card.christAnchor}
          </div>
          <RatingButtons onRate={onRate} />
        </div>
      </div>
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState({
  progress,
  onReviewAll,
}: {
  progress: Record<string, CardProgress>;
  onReviewAll: () => void;
}) {
  const nextTs = nextDueTimestamp(verseMemoryCards, progress);

  return (
    <div className="vm-empty">
      <div className="vm-empty-icon">✓</div>
      <h2 className="vm-empty-title">All caught up.</h2>
      <p className="vm-empty-sub">
        {nextTs
          ? `Your next verse is due in ${formatNextDue(nextTs)}.`
          : "You have no verses scheduled yet."}
      </p>
      <button className="vm-empty-btn" onClick={onReviewAll}>
        Review all anyway
      </button>
      <Link href="/games" className="vm-back-link">
        ← Back to games
      </Link>
    </div>
  );
}

// ─── SessionCompleteScreen ────────────────────────────────────────────────────

function SessionCompleteScreen({
  answered,
  onContinue,
}: {
  answered: number;
  onContinue: () => void;
}) {
  return (
    <div className="vm-session-done">
      <div className="vm-session-done-icon">✝</div>
      <h2 className="vm-session-done-title">Session complete.</h2>
      <p className="vm-session-done-sub">
        You reviewed {answered} verse{answered !== 1 ? "s" : ""} today.
      </p>
      <button className="vm-session-done-btn" onClick={onContinue}>
        Keep going
      </button>
      <Link href="/games" className="vm-back-link">
        ← Back to games
      </Link>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VerseMemoryClient() {
  const [phase, setPhase] = useState<GamePhase>("loading");
  const [progress, setProgress] = useState<Record<string, CardProgress>>({});
  const [queue, setQueue] = useState<VerseMemoryCard[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionAnswered, setSessionAnswered] = useState(0);

  // SSR-safe localStorage read
  useEffect(() => {
    const saved = loadProgress();
    setProgress(saved);
    const sorted = getSortedQueue(verseMemoryCards, saved);
    const dueOrNew = sorted.filter((c) => {
      const p = saved[c.id];
      return !p || p.nextReview === 0 || Date.now() >= p.nextReview;
    });
    setQueue(sorted);
    setQueueIndex(0);
    setPhase(dueOrNew.length === 0 ? "empty" : "reviewing");
  }, []);

  const currentCard = queue[queueIndex];

  const handleReveal = useCallback(() => {
    setIsFlipped(true);
  }, []);

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!currentCard) return;

      const cardProg = getCardProgress(currentCard.id, progress);
      const updated = calculateNextReview(cardProg, rating);

      const newProgress = { ...progress, [currentCard.id]: updated };
      setProgress(newProgress);
      saveProgress(newProgress);

      const newAnswered = sessionAnswered + 1;
      setSessionAnswered(newAnswered);
      setIsFlipped(false);

      if (newAnswered >= SESSION_TARGET) {
        setPhase("session-done");
        return;
      }

      setQueueIndex((i) => i + 1);

      // If we've exhausted the queue, re-sort and loop
      if (queueIndex + 1 >= queue.length) {
        const sorted = getSortedQueue(verseMemoryCards, newProgress);
        setQueue(sorted);
        setQueueIndex(0);
      }
    },
    [currentCard, progress, sessionAnswered, queue.length, queueIndex]
  );

  const handleReviewAll = useCallback(() => {
    // Reset all nextReview to 0 so everything is due
    const reset: Record<string, CardProgress> = {};
    for (const [id, p] of Object.entries(progress)) {
      reset[id] = { ...p, nextReview: 0 };
    }
    setProgress(reset);
    saveProgress(reset);
    const sorted = getSortedQueue(verseMemoryCards, reset);
    setQueue(sorted);
    setQueueIndex(0);
    setSessionAnswered(0);
    setIsFlipped(false);
    setPhase("reviewing");
  }, [progress]);

  const handleContinue = useCallback(() => {
    // Continue past session target
    setPhase("reviewing");
    if (queueIndex >= queue.length) {
      const sorted = getSortedQueue(verseMemoryCards, progress);
      setQueue(sorted);
      setQueueIndex(0);
    }
  }, [queueIndex, queue.length, progress]);

  // ── Keyboard shortcuts ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "reviewing") return;
    const handler = (e: KeyboardEvent) => {
      if (!isFlipped) {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleReveal();
        }
        return;
      }
      const map: Record<string, Rating> = { "1": 0, "2": 1, "3": 2, "4": 3 };
      if (e.key in map) handleRate(map[e.key]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, isFlipped, handleReveal, handleRate]);

  // ── Render ────────────────────────────────────────────────────────────────

  if (phase === "loading") {
    return <div className="vm-layout vm-layout--loading" aria-busy="true" />;
  }

  return (
    <div className="vm-layout">
      {/* Header */}
      <header className="vm-header">
        <Link href="/games" className="vm-header-brand">
          Plain<span>Prophecy</span>
        </Link>
        <div className="vm-header-label">Verse Memory</div>
      </header>

      <SessionProgressBar answered={sessionAnswered} />

      {/* Content */}
      <div className="vm-content">
        {phase === "empty" && (
          <EmptyState progress={progress} onReviewAll={handleReviewAll} />
        )}

        {phase === "session-done" && (
          <SessionCompleteScreen
            answered={sessionAnswered}
            onContinue={handleContinue}
          />
        )}

        {phase === "reviewing" && currentCard && (
          <>
            <MemoryCard
              card={currentCard}
              isFlipped={isFlipped}
              onReveal={handleReveal}
              onRate={handleRate}
            />
            <div className="vm-card-counter">
              {queueIndex + 1} / {Math.min(queue.length, SESSION_TARGET)}
            </div>
            {!isFlipped && (
              <p className="vm-keyboard-hint">
                Space or Enter to reveal · 1–4 to rate after
              </p>
            )}
          </>
        )}

        {phase === "reviewing" && !currentCard && (
          <EmptyState progress={progress} onReviewAll={handleReviewAll} />
        )}
      </div>
    </div>
  );
}
