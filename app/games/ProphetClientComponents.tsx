"use client";

import React, { useState, useRef, useEffect } from "react";

// ─── Shared type ──────────────────────────────────────────────────────────────
export interface Prophecy {
  _id: string;
  id: string; // mapped from idStr
  idStr: string;
  number: number;
  title: string;
  subtitle: string;
  symbol: string;
  scripture: string;
  connections: string[];
  reveal: {
    what: string;
    history: string;
    christ: string;
  };
  published: boolean;
}

// ─── SwipeHint ────────────────────────────────────────────────────────────────
export function SwipeHint({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
  if (!visible) return null;
  return (
    <div className="swipe-hint" onClick={onDismiss}>
      <span className="swipe-hint-arrow">←</span>
      <span className="swipe-hint-text">Swipe to explore</span>
      <span className="swipe-hint-arrow">→</span>
    </div>
  );
}

// ─── SwipeCard ────────────────────────────────────────────────────────────────
export function SwipeCard({
  prophecy,
  onSwipeCommit,
  onTap,
}: {
  prophecy: Prophecy;
  onSwipeCommit: () => void;
  onTap: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const [offset, setOffset] = useState(0);
  const [gone, setGone] = useState(false);

  const THRESHOLD = 80;

  function handlePointerDown(e: React.PointerEvent) {
    isDragging.current = true;
    startX.current = e.clientX;
    cardRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setOffset(delta);
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - startX.current;

    if (Math.abs(delta) > THRESHOLD) {
      // Committed swipe
      setGone(true);
      setTimeout(onSwipeCommit, 200);
    } else if (Math.abs(delta) < 5) {
      // Tap
      setOffset(0);
      onTap();
    } else {
      setOffset(0);
    }
  }

  const rotation = offset / 20;
  const opacity = gone ? 0 : Math.max(0, 1 - Math.abs(offset) / 300);

  return (
    <div
      ref={cardRef}
      className="swipe-card"
      style={{
        transform: gone
          ? `translateX(${offset > 0 ? 500 : -500}px) rotate(${rotation}deg)`
          : `translateX(${offset}px) rotate(${rotation}deg)`,
        opacity,
        transition: isDragging.current ? "none" : "transform 0.3s ease, opacity 0.3s ease",
        touchAction: "none",
        cursor: "grab",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="swipe-card-symbol">{prophecy.symbol}</div>
      <div className="swipe-card-scripture">{prophecy.scripture}</div>
      <h2 className="swipe-card-title">{prophecy.title}</h2>
      <p className="swipe-card-subtitle">{prophecy.subtitle}</p>
      <div className="swipe-card-tap-hint">Tap to reveal →</div>
    </div>
  );
}

// ─── RevealPanel ──────────────────────────────────────────────────────────────
export function RevealPanel({
  prophecy,
  isOpen,
  onClose,
  onNext,
  isLast,
}: {
  prophecy: Prophecy;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  isLast: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="reveal-overlay" onClick={onClose}>
      <div className="reveal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="reveal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="reveal-symbol">{prophecy.symbol}</div>
        <div className="reveal-scripture">{prophecy.scripture}</div>
        <h2 className="reveal-title">{prophecy.title}</h2>

        <div className="reveal-section">
          <div className="reveal-section-label">The Vision</div>
          <p className="reveal-section-body">{prophecy.reveal.what}</p>
        </div>

        <div className="reveal-section">
          <div className="reveal-section-label">History Confirms</div>
          <p className="reveal-section-body">{prophecy.reveal.history}</p>
        </div>

        <div className="reveal-section reveal-christ">
          <div className="reveal-section-label">Christ at the Centre</div>
          <p className="reveal-section-body">{prophecy.reveal.christ}</p>
        </div>

        <div className="reveal-actions">
          <button className="reveal-btn-close" onClick={onClose}>
            Back to cards
          </button>
          <button className="reveal-btn-next" onClick={onNext}>
            {isLast ? "See Results" : "Next Prophecy →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ConnectionWeb ────────────────────────────────────────────────────────────
export function ConnectionWeb({
  completed,
  onClose,
  prophecies,
}: {
  completed: string[];
  onClose: () => void;
  prophecies: Prophecy[];
}) {
  return (
    <div className="connection-overlay" onClick={onClose}>
      <div className="connection-panel" onClick={(e) => e.stopPropagation()}>
        <button className="reveal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="connection-title">Prophetic Connections</h2>
        <p className="connection-subtitle">
          {completed.length} of {prophecies.length} prophecies explored
        </p>
        <div className="connection-grid">
          {prophecies.map((p) => {
            const isCompleted = completed.includes(p.id);
            return (
              <div
                key={p.id}
                className={`connection-node ${isCompleted ? "connection-node--done" : ""}`}
              >
                <div className="connection-node-symbol">{p.symbol}</div>
                <div className="connection-node-title">{p.title}</div>
                {!isCompleted && (
                  <div className="connection-node-locked">🔒</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── CompletionScreen ─────────────────────────────────────────────────────────
export function CompletionScreen({
  completed,
  onRestart,
  onShowMap,
  totalProphecies,
}: {
  completed: string[];
  onRestart: () => void;
  onShowMap: () => void;
  totalProphecies: number;
}) {
  return (
    <div className="completion-screen">
      <div className="completion-inner">
        <div className="completion-symbol">✝</div>
        <h1 className="completion-title">All Prophecies Explored</h1>
        <p className="completion-body">
          You&apos;ve walked through {completed.length} of {totalProphecies} Daniel
          prophecies. Every timeline — from Babylon to the Second Coming —
          points to the same Person.
        </p>
        <blockquote className="completion-verse">
          &ldquo;The testimony of Jesus is the spirit of prophecy.&rdquo;
          <cite>— Revelation 19:10</cite>
        </blockquote>
        <div className="completion-actions">
          <button className="completion-btn-map" onClick={onShowMap}>
            🕸 View Connection Web
          </button>
          <button className="completion-btn-restart" onClick={onRestart}>
            ↺ Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
