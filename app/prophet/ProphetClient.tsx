"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { prophecies, type Prophecy } from "@/data/prophecies";

// ─── Connection Web Canvas ───────────────────────────────────────────────────

function ConnectionWeb({
  completed,
  onClose,
}: {
  completed: string[];
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.36;

    ctx.clearRect(0, 0, W, H);

    // Node positions
    const nodePositions: Record<string, { x: number; y: number }> = {};
    prophecies.forEach((p, i) => {
      const angle = (i / prophecies.length) * 2 * Math.PI - Math.PI / 2;
      nodePositions[p.id] = {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    });

    // Draw connecting lines between prophecy nodes
    const drawn = new Set<string>();
    prophecies.forEach((p) => {
      p.connections.forEach((connId) => {
        const key = [p.id, connId].sort().join("-");
        if (drawn.has(key)) return;
        drawn.add(key);
        const from = nodePositions[p.id];
        const to = nodePositions[connId];
        if (!from || !to) return;
        const bothDone = completed.includes(p.id) && completed.includes(connId);
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = bothDone
          ? "rgba(232,160,32,0.55)"
          : "rgba(255,255,255,0.08)";
        ctx.lineWidth = bothDone ? 1.5 : 1;
        ctx.stroke();
      });
    });

    // Draw lines from center (Christ) to all completed nodes
    prophecies.forEach((p) => {
      if (!completed.includes(p.id)) return;
      const pos = nodePositions[p.id];
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = "rgba(232,160,32,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw prophecy nodes
    prophecies.forEach((p) => {
      const pos = nodePositions[p.id];
      const done = completed.includes(p.id);

      // Glow for completed
      if (done) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(232,160,32,0.15)";
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 16, 0, 2 * Math.PI);
      ctx.fillStyle = done ? "rgba(232,160,32,0.9)" : "rgba(255,255,255,0.06)";
      ctx.strokeStyle = done
        ? "rgba(232,160,32,1)"
        : "rgba(255,255,255,0.2)";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();

      // Symbol inside node
      ctx.font = "13px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = done ? "#0f0e0c" : "rgba(255,255,255,0.5)";
      ctx.fillText(p.symbol, pos.x, pos.y);

      // Label below
      ctx.font = `600 9px "IBM Plex Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = done ? "rgba(232,160,32,0.9)" : "rgba(255,255,255,0.3)";

      // Wrap title to 2 lines if needed
      const words = p.title.split(" ");
      let line1 = "";
      let line2 = "";
      let switchedLine = false;
      words.forEach((w) => {
        if (!switchedLine && (line1 + w).length < 12) {
          line1 += (line1 ? " " : "") + w;
        } else {
          switchedLine = true;
          line2 += (line2 ? " " : "") + w;
        }
      });

      const labelY = pos.y + 20;
      ctx.fillText(line1, pos.x, labelY);
      if (line2) ctx.fillText(line2, pos.x, labelY + 11);
    });

    // Christ centre node — glow
    ctx.beginPath();
    ctx.arc(cx, cy, 36, 0, 2 * Math.PI);
    const allDone = prophecies.every((p) => completed.includes(p.id));
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 36);
    gradient.addColorStop(0, allDone ? "rgba(232,160,32,0.4)" : "rgba(232,160,32,0.15)");
    gradient.addColorStop(1, "rgba(232,160,32,0)");
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(232,160,32,0.95)";
    ctx.strokeStyle = "rgba(232,160,32,1)";
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 16px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#0f0e0c";
    ctx.fillText("✝", cx, cy + 1);

    ctx.font = `700 8px "IBM Plex Mono", monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(232,160,32,0.9)";
    ctx.fillText("CHRIST", cx, cy + 28);
  }, [completed]);

  return (
    <div className="map-backdrop" onClick={onClose}>
      <div className="map-container" onClick={(e) => e.stopPropagation()}>
        <div className="map-header">
          <div className="map-title">Prophecy Connection Web</div>
          <button className="map-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={440}
          height={380}
          className="map-canvas"
          style={{ width: "100%", height: "auto" }}
        />
        <div className="map-legend">
          <div className="map-legend-item">
            <div
              className="map-legend-dot"
              style={{ background: "rgba(232,160,32,0.9)" }}
            />
            Revealed
          </div>
          <div className="map-legend-item">
            <div
              className="map-legend-dot"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
            Unrevealed
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reveal Panel ─────────────────────────────────────────────────────────────

function RevealPanel({
  prophecy,
  isOpen,
  onClose,
  onNext,
  isLast,
}: {
  prophecy: Prophecy | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  isLast: boolean;
}) {
  if (!prophecy) return null;

  return (
    <>
      <div
        className={`reveal-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <div
        className={`reveal-panel ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Reveal: ${prophecy.title}`}
      >
        <div className="reveal-panel-handle" />

        <div className="reveal-panel-header">
          <div className="reveal-card-label">
            Prophecy {prophecy.number} of {prophecies.length}
          </div>
          <div className="reveal-card-title">{prophecy.title}</div>
          <div className="reveal-card-scripture">{prophecy.scripture}</div>
        </div>

        <div className="reveal-section">
          <div className="reveal-label">What it said</div>
          <p>{prophecy.reveal.what}</p>
        </div>

        <div className="reveal-section">
          <div className="reveal-label">What history shows</div>
          <p>{prophecy.reveal.history}</p>
        </div>

        <div className="reveal-christ-anchor">
          <div className="reveal-label">Christ at the centre</div>
          <p>{prophecy.reveal.christ}</p>
        </div>

        <div className="reveal-actions">
          <button className="reveal-close-btn" onClick={onClose}>
            Study more
          </button>
          <button className="reveal-next-btn" onClick={onNext}>
            {isLast ? "See results →" : "Next prophecy →"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Swipe Card ───────────────────────────────────────────────────────────────

function SwipeCard({
  prophecy,
  isNext,
  onSwipeCommit,
  onReveal,
  onHintUsed,
}: {
  prophecy: Prophecy;
  isNext: boolean;
  onSwipeCommit: (dir: "left" | "right") => void;
  onReveal: () => void;
  onHintUsed: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLabelRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, currentX: 0 });
  const committed = useRef(false);

  const applyTransform = useCallback((dx: number, flying?: "left" | "right") => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const label = overlayLabelRef.current;
    if (!card || !overlay || !label) return;

    if (flying) {
      const flyX = flying === "right" ? window.innerWidth * 1.4 : -window.innerWidth * 1.4;
      card.style.transform = `translateX(${flyX}px) rotate(${flying === "right" ? 20 : -20}deg)`;
      card.classList.add("fly-off");
      overlay.style.opacity = "0.9";
      overlay.style.background =
        flying === "right"
          ? "rgba(26,109,60,0.75)"
          : "rgba(192,57,43,0.65)";
      label.textContent = flying === "right" ? "✓ Fulfilled" : "? Not sure";
      return;
    }

    const norm = dx / (window.innerWidth * 0.4);
    const rotate = norm * 15;
    const scale = 1 - Math.abs(norm) * 0.06;
    card.style.transform = `translateX(${dx}px) rotate(${rotate}deg) scale(${scale})`;

    const overlayOpacity = Math.min(Math.abs(norm) * 1.8, 0.85);
    overlay.style.opacity = String(overlayOpacity);
    if (dx > 0) {
      overlay.style.background = "rgba(26,109,60,0.75)";
      label.textContent = "✓ Fulfilled";
    } else {
      overlay.style.background = "rgba(192,57,43,0.65)";
      label.textContent = "? Not sure";
    }
  }, []);

  const resetTransform = useCallback(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;
    card.classList.add("snap-back");
    card.style.transform = "translateX(0) rotate(0deg) scale(1)";
    overlay.style.opacity = "0";
    setTimeout(() => {
      card.classList.remove("snap-back");
    }, 400);
  }, []);

  const commitSwipe = useCallback(
    (dir: "left" | "right") => {
      if (committed.current) return;
      committed.current = true;
      onHintUsed();
      applyTransform(0, dir);
      setTimeout(() => {
        onSwipeCommit(dir);
      }, 380);
    },
    [applyTransform, onSwipeCommit, onHintUsed]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isNext || committed.current) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { active: true, startX: e.clientX, currentX: e.clientX };
      const card = cardRef.current;
      if (card) card.classList.remove("snap-back");
    },
    [isNext]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drag.current.active || committed.current) return;
      drag.current.currentX = e.clientX;
      const dx = e.clientX - drag.current.startX;
      applyTransform(dx);
    },
    [applyTransform]
  );

  const handlePointerUp = useCallback(() => {
    if (!drag.current.active || committed.current) return;
    drag.current.active = false;
    const dx = drag.current.currentX - drag.current.startX;
    const threshold = window.innerWidth * 0.28;
    if (Math.abs(dx) > threshold) {
      commitSwipe(dx > 0 ? "right" : "left");
    } else {
      resetTransform();
    }
  }, [commitSwipe, resetTransform]);

  if (isNext) {
    return (
      <div className="swipe-card next-card" aria-hidden="true">
        <div className="swipe-card-inner">
          <div className="card-number">Prophecy {prophecy.number}</div>
          <div className="card-symbol">{prophecy.symbol}</div>
          <div className="card-title">{prophecy.title}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="swipe-card"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={() => {
        // Only open reveal on simple tap (no drag)
        const totalDrag = Math.abs(drag.current.currentX - drag.current.startX);
        if (totalDrag < 8) onReveal();
      }}
    >
      <div
        ref={overlayRef}
        className="swipe-overlay"
        style={{ opacity: 0 }}
      >
        <div ref={overlayLabelRef} className="overlay-label" />
      </div>
      <div className="swipe-card-inner">
        <div className="card-number">Prophecy {prophecy.number} of {prophecies.length}</div>
        <div className="card-symbol">{prophecy.symbol}</div>
        <div className="card-title">{prophecy.title}</div>
        <div className="card-subtitle">{prophecy.subtitle}</div>
        <div className="card-scripture">{prophecy.scripture}</div>
      </div>
    </div>
  );
}

// ─── Completion Screen ────────────────────────────────────────────────────────

function CompletionScreen({
  completed,
  onRestart,
  onShowMap,
}: {
  completed: string[];
  onRestart: () => void;
  onShowMap: () => void;
}) {
  return (
    <div className="completion-screen">
      <div className="completion-symbol">✝</div>
      <div className="completion-overline">
        {completed.length} of {prophecies.length} revealed
      </div>
      <h1 className="completion-title">
        One story.{" "}
        <span>One centre.</span>
      </h1>
      <p className="completion-text">
        From Nebuchadnezzar&rsquo;s dream to Michael standing up — every vision
        converges on the same point. The stone that shatters all kingdoms. The
        Son of Man who receives eternal dominion. The High Priest who intercedes
        without ceasing. Jesus, in every chapter.
      </p>
      <div className="completion-actions">
        <button className="completion-restart-btn" onClick={onRestart}>
          Start again →
        </button>
        <button className="completion-map-btn" onClick={onShowMap}>
          🕸 View full map
        </button>
        <Link
          href="/compare"
          className="completion-restart-btn"
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "var(--paper)",
          }}
        >
          Deep study →
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProphetClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [revealCard, setRevealCard] = useState<Prophecy | null>(null);
  const [revealOpen, setRevealOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hintsVisible, setHintsVisible] = useState(true);
  const [cardKey, setCardKey] = useState(0); // forces card remount after swipe

  const done = currentIndex >= prophecies.length;
  const currentProphecy = prophecies[currentIndex];
  const nextProphecy = prophecies[currentIndex + 1];

  const hideHints = useCallback(() => setHintsVisible(false), []);

  const handleSwipeCommit = useCallback(
    () => {
      const prophecy = prophecies[currentIndex];
      setCompleted((prev) =>
        prev.includes(prophecy.id) ? prev : [...prev, prophecy.id]
      );
      // Brief pause, then show reveal
      setTimeout(() => {
        setRevealCard(prophecy);
        setRevealOpen(true);
        setCardKey((k) => k + 1);
        setCurrentIndex((i) => i + 1);
      }, 60);
    },
    [currentIndex]
  );

  const handleReveal = useCallback(() => {
    if (!currentProphecy) return;
    setRevealCard(currentProphecy);
    setRevealOpen(true);
  }, [currentProphecy]);

  const handleRevealClose = useCallback(() => {
    setRevealOpen(false);
  }, []);

  const handleRevealNext = useCallback(() => {
    setRevealOpen(false);
    // If current card wasn't swiped (opened via tap), advance now
    setCompleted((prev) => {
      if (revealCard && !prev.includes(revealCard.id)) {
        return [...prev, revealCard.id];
      }
      return prev;
    });
    setCurrentIndex((i) => {
      // Only advance if the reveal card matches current (tap-reveal path)
      if (revealCard && prophecies[i]?.id === revealCard.id) {
        setCardKey((k) => k + 1);
        return i + 1;
      }
      return i;
    });
  }, [revealCard]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setCompleted([]);
    setRevealCard(null);
    setRevealOpen(false);
    setShowMap(false);
    setHintsVisible(true);
    setCardKey((k) => k + 1);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (revealOpen || done) return;
      if (e.key === "ArrowRight") {
        hideHints();
        // Trigger right swipe programmatically — just call the commit
        const prophecy = prophecies[currentIndex];
        if (!prophecy) return;
        setCompleted((prev) =>
          prev.includes(prophecy.id) ? prev : [...prev, prophecy.id]
        );
        setTimeout(() => {
          setRevealCard(prophecy);
          setRevealOpen(true);
          setCardKey((k) => k + 1);
          setCurrentIndex((i) => i + 1);
        }, 60);
      } else if (e.key === "ArrowLeft") {
        hideHints();
        const prophecy = prophecies[currentIndex];
        if (!prophecy) return;
        setCompleted((prev) =>
          prev.includes(prophecy.id) ? prev : [...prev, prophecy.id]
        );
        setTimeout(() => {
          setRevealCard(prophecy);
          setRevealOpen(true);
          setCardKey((k) => k + 1);
          setCurrentIndex((i) => i + 1);
        }, 60);
      } else if (e.key === " ") {
        e.preventDefault();
        handleReveal();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, revealOpen, done, hideHints, handleReveal]);

  if (done) {
    return (
      <>
        <CompletionScreen
          completed={completed}
          onRestart={handleRestart}
          onShowMap={() => setShowMap(true)}
        />
        {showMap && (
          <ConnectionWeb
            completed={completed}
            onClose={() => setShowMap(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="prophet-layout">
      {/* Header */}
      <header className="prophet-header">
        <Link href="/" className="prophet-header-brand">
          Plain<span>Prophecy</span>
        </Link>
        <div className="prophet-progress">
          {currentIndex + 1} / {prophecies.length}
        </div>
        <button
          className="prophet-map-btn"
          onClick={() => setShowMap(true)}
          aria-label="Open prophecy connection map"
        >
          🕸 Map
        </button>
      </header>

      {/* Stage */}
      <main className="prophet-stage">
        <div
          style={{
            textAlign: "center",
            marginBottom: "1.25rem",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: 0.4,
          }}
        >
          Swipe or tap · Commit before you see
        </div>

        <div className="card-stack">
          {/* Next card (behind) */}
          {nextProphecy && (
            <SwipeCard
              key={`next-${nextProphecy.id}`}
              prophecy={nextProphecy}
              isNext={true}
              onSwipeCommit={() => {}}
              onReveal={() => {}}
              onHintUsed={() => {}}
            />
          )}

          {/* Current card (top) */}
          <SwipeCard
            key={`card-${currentProphecy.id}-${cardKey}`}
            prophecy={currentProphecy}
            isNext={false}
            onSwipeCommit={handleSwipeCommit}
            onReveal={handleReveal}
            onHintUsed={hideHints}
          />
        </div>

        {/* Swipe hints */}
        <div
          className={`swipe-hints ${!hintsVisible ? "hidden" : ""}`}
          aria-hidden="true"
        >
          <div className="hint-arrow left">
            <span className="hint-arrow-icon">←</span>
            <span>Not sure</span>
          </div>
          <div className="hint-arrow right">
            <span>Fulfilled</span>
            <span className="hint-arrow-icon">→</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="prophet-footer">
        <div className="prophet-footer-text">
          Tap to open study · Swipe to commit · ← → keys · Space to reveal
        </div>
      </footer>

      {/* Reveal Panel */}
      <RevealPanel
        prophecy={revealCard}
        isOpen={revealOpen}
        onClose={handleRevealClose}
        onNext={handleRevealNext}
        isLast={currentIndex >= prophecies.length}
      />

      {/* Connection Web Map */}
      {showMap && (
        <ConnectionWeb
          completed={completed}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}
