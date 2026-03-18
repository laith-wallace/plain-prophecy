"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { prophecies, type Prophecy } from "@/data/prophecies";

// ─── Connection Web Canvas ───────────────────────────────────────────────────

function ConnectionWeb({
  completed,
  onClose,
  prophecies,
}: {
  completed: string[];
  onClose: () => void;
  prophecies: Prophecy[];
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
  }, [completed, prophecies]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Trap focus within modal and close on Escape
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="map-backdrop" onClick={onClose} role="presentation">
      <div
        className="map-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Prophecy Connection Web"
        ref={containerRef}
        tabIndex={-1}
        style={{ outline: "none" }}
      >
        <div className="map-header">
          <div className="map-title">Prophecy Connection Web</div>
          <button className="map-close-btn" onClick={onClose} aria-label="Close connection web">
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
  totalProphecies,
}: {
  prophecy: Prophecy | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  isLast: boolean;
  totalProphecies: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const handleDrag = useRef({ active: false, startY: 0 });

  const onHandlePointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handleDrag.current = { active: true, startY: e.clientY };
  }, []);

  const onHandlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!handleDrag.current.active) return;
    const dy = Math.max(0, e.clientY - handleDrag.current.startY);
    if (panelRef.current) {
      panelRef.current.style.transition = "none";
      panelRef.current.style.transform = `translateY(${dy}px)`;
    }
  }, []);

  const onHandlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!handleDrag.current.active) return;
      handleDrag.current.active = false;
      const dy = e.clientY - handleDrag.current.startY;
      if (dy > 80) {
        if (panelRef.current) {
          panelRef.current.style.transition = "";
          panelRef.current.style.transform = "";
        }
        onClose();
      } else {
        if (panelRef.current) {
          panelRef.current.style.transition =
            "transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)";
          panelRef.current.style.transform = "";
          setTimeout(() => {
            if (panelRef.current) panelRef.current.style.transition = "";
          }, 260);
        }
      }
    },
    [onClose]
  );

  // Reset panel transform when closed
  useEffect(() => {
    if (!isOpen && panelRef.current) {
      panelRef.current.style.transform = "";
    }
  }, [isOpen]);

  if (!prophecy) return null;

  return (
    <>
      <div
        className={`reveal-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={`reveal-panel ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Reveal: ${prophecy.title}`}
      >
        <div
          className="reveal-panel-handle"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
        />

        <div className="reveal-panel-header">
          <div className="reveal-card-label">
            Prophecy {prophecy.number} of {totalProphecies}
          </div>
          <div className="reveal-card-title">{prophecy.title}</div>
          <div className="reveal-card-scripture">{prophecy.scripture}</div>
        </div>

        <div className="reveal-scrollable">
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

          <div className="reveal-love-section">
            <div className="reveal-love-eyebrow">God&rsquo;s love in this</div>
            <p>{prophecy.reveal.love}</p>
          </div>
        </div>

        <div className="reveal-actions">
          <Link href={prophecy.href} className="reveal-study-link">
            Read full study →
          </Link>
          <button className="reveal-next-btn" onClick={onNext}>
            {isLast ? "See results →" : "Next prophecy →"}
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Swipe Card ───────────────────────────────────────────────────────────────

export interface SwipeCardHandle {
  triggerSwipe: (dir: "left" | "right") => void;
}

const THRESHOLD_FRAC = 0.28;
const MAX_ROTATE = 13;    // degrees — hard cap
const PEAK_FRACTION = 0.2; // tilt peaks at 20% of threshold drag

const SwipeCard = forwardRef<
  SwipeCardHandle,
  {
    prophecy: Prophecy;
    isNext: boolean;
    onSwipeCommit: (dir: "left" | "right") => void;
    onReveal: () => void;
    onHintUsed: () => void;
    isFirstCard?: boolean;
    totalProphecies: number;
  }
>(function SwipeCard(
  { prophecy, isNext, onSwipeCommit, onReveal, onHintUsed, isFirstCard, totalProphecies },
  ref
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayLabelRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    startX: 0,
    currentX: 0,
    startTime: 0,
    pastThreshold: false,
  });
  const committed = useRef(false);
  const [promoting, setPromoting] = useState(false);

  // Animate card promoting from next → active
  useEffect(() => {
    if (!isNext) {
      setPromoting(true);
      const t = setTimeout(() => setPromoting(false), 380);
      return () => clearTimeout(t);
    }
  }, [isNext]);

  const resetTransform = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.transform = "";
      setTimeout(() => { if (card) card.style.transition = ""; }, 400);
    }
  }, []);

  const applyTransform = useCallback((dx: number, flying?: "left" | "right") => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const label = overlayLabelRef.current;
    if (!card || !overlay || !label) return;

    const THRESHOLD = window.innerWidth * THRESHOLD_FRAC;

    if (flying) {
      const releaseX = drag.current.currentX - drag.current.startX;
      const releaseRotate = flying === "right" ? MAX_ROTATE : -MAX_ROTATE;
      const flyX = flying === "right"
        ? window.innerWidth * 1.6
        : -window.innerWidth * 1.6;
      const flyRotate = flying === "right" ? MAX_ROTATE + 7 : -(MAX_ROTATE + 7);

      card.style.transition = "none";
      card.style.transform = `translateX(${releaseX}px) rotate(${releaseRotate}deg)`;
      card.getBoundingClientRect();

      card.style.transition =
        "transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.38s ease-out";
      card.style.transform = `translateX(${flyX}px) rotate(${flyRotate}deg)`;
      card.classList.add("fly-off");
      overlay.style.opacity = "0.92";
      overlay.style.justifyContent = flying === "right" ? "flex-end" : "flex-start";
      overlay.style.background =
        flying === "right" ? "rgba(26,109,60,0.75)" : "rgba(192,57,43,0.65)";
      label.textContent = flying === "right" ? "✓ Fulfilled" : "? Not sure";
      label.style.transform = `rotate(${flying === "right" ? "-20deg" : "20deg"})`;
      return;
    }

    const absDx = Math.abs(dx);
    const peakDx = THRESHOLD * PEAK_FRACTION;
    const rotate = Math.sign(dx) * Math.min(absDx / peakDx, 1) * MAX_ROTATE;
    const scale = 1 - Math.min(absDx / THRESHOLD, 1) * 0.04;

    card.style.transition = "none";
    card.style.transform = `translateX(${dx}px) rotate(${rotate}deg) scale(${scale})`;

    const norm = dx / THRESHOLD;
    const overlayOpacity = Math.min(Math.abs(norm) * 1.8, 0.88);
    overlay.style.opacity = String(overlayOpacity);

    const pastThreshold = Math.abs(dx) > window.innerWidth * 0.28;
    if (pastThreshold && !drag.current.pastThreshold) {
      navigator.vibrate?.(8);
      drag.current.pastThreshold = true;
    } else if (!pastThreshold) {
      drag.current.pastThreshold = false;
    }

    if (dx > 0) {
      overlay.style.background = "rgba(26,109,60,0.75)";
      overlay.style.justifyContent = "flex-end";
      label.textContent = "✓ Fulfilled";
      label.style.transform = "rotate(-20deg)";
    } else {
      overlay.style.background = "rgba(192,57,43,0.65)";
      overlay.style.justifyContent = "flex-start";
      label.textContent = "? Not sure";
      label.style.transform = "rotate(20deg)";
    }
  }, []);

  const snapBack = useCallback((releaseDx: number) => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!card || !overlay) return;

    const THRESHOLD = window.innerWidth * THRESHOLD_FRAC;
    const dragFraction = Math.min(Math.abs(releaseDx) / THRESHOLD, 1);
    const releaseRotate = Math.sign(releaseDx) * dragFraction * MAX_ROTATE;
    const overshootX = -Math.sign(releaseDx) * dragFraction * 14;
    const overshootRotate = -Math.sign(releaseDx) * dragFraction * 2.5;

    card.animate(
      [
        {
          transform: `translateX(${releaseDx}px) rotate(${releaseRotate}deg) scale(${1 - dragFraction * 0.04})`,
        },
        {
          transform: `translateX(${overshootX}px) rotate(${overshootRotate}deg) scale(1.008)`,
          offset: 0.65,
        },
        { transform: "translateX(0) rotate(0deg) scale(1)" },
      ],
      {
        duration: 360 + dragFraction * 220,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        fill: "forwards",
      }
    );

    overlay.style.transition = "opacity 0.22s ease-out";
    overlay.style.opacity = "0";
    drag.current.pastThreshold = false;
    setTimeout(() => {
      if (card) {
        card.style.transform = "";
        card.getAnimations().forEach((a) => a.cancel());
      }
    }, 640);
  }, []);

  const commitSwipe = useCallback(
    (dir: "left" | "right") => {
      if (committed.current) return;
      committed.current = true;
      onHintUsed();
      navigator.vibrate?.(15);
      applyTransform(0, dir);
      setTimeout(() => {
        onSwipeCommit(dir);
      }, 430);
    },
    [applyTransform, onSwipeCommit, onHintUsed]
  );

  useImperativeHandle(ref, () => ({
    triggerSwipe: (dir: "left" | "right") => {
      if (committed.current || isNext) return;
      commitSwipe(dir);
    },
  }));

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isNext || committed.current) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = {
        active: true,
        startX: e.clientX,
        currentX: e.clientX,
        startTime: Date.now(),
        pastThreshold: false,
      };
      const card = cardRef.current;
      if (card) card.getAnimations().forEach((a) => a.cancel());
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
    const dt = Math.max(1, Date.now() - drag.current.startTime);
    const velocity = Math.abs(dx) / dt;
    const DIST_THRESHOLD = window.innerWidth * 0.28;
    const VEL_THRESHOLD = 0.45;

    if (Math.abs(dx) > DIST_THRESHOLD || velocity > VEL_THRESHOLD) {
      commitSwipe(dx > 0 ? "right" : "left");
    } else {
      snapBack(dx);
    }
  }, [commitSwipe, snapBack, THRESHOLD_FRAC]);

  useEffect(() => {
    if (!isFirstCard || isNext) return;
    const t = setTimeout(() => {
      applyTransform(32);
      setTimeout(() => {
        resetTransform();
      }, 420);
    }, 900);
    return () => clearTimeout(t);
  }, [isFirstCard, isNext, applyTransform, resetTransform]);

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
      className={`swipe-card${promoting ? " promoting" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`Prophecy ${prophecy.number}: ${prophecy.title}. Tap or press Enter to reveal.`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onReveal();
        }
      }}
      onClick={() => {
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
        <div className="card-number">Prophecy {prophecy.number} of {totalProphecies}</div>
        <div className="card-symbol">{prophecy.symbol}</div>
        <div className="card-title">{prophecy.title}</div>
        <div className="card-subtitle">{prophecy.subtitle}</div>
        <div className="card-scripture">{prophecy.scripture}</div>
      </div>
    </div>
  );
});

// ─── Completion Screen ────────────────────────────────────────────────────────

function CompletionScreen({
  completed,
  onRestart,
  totalProphecies,
}: {
  completed: string[];
  onRestart: () => void;
  totalProphecies: number;
}) {
  return (
    <div className="completion-screen">
      <div className="completion-symbol">✝</div>
      <div className="completion-overline">
        {completed.length} of {totalProphecies} revealed
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
        <Link href="/studies/map" className="completion-map-btn">
          🕸 View full map
        </Link>
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

// ─── Game Picker ──────────────────────────────────────────────────────────────

function GamePicker({ onSelect }: { onSelect: (mode: "daniel") => void }) {
  return (
    <div className="game-picker">
      <div className="game-picker-eyebrow">Plain Prophecy · Choose your study</div>
      <h1 className="game-picker-title">
        What do you want to{" "}
        <span>explore?</span>
      </h1>
      <p className="game-picker-subtitle">
        Swipe through cards, commit before you see the answer, then get the reveal.
      </p>

      <div className="game-picker-cards">
        <button
          className="game-picker-card"
          onClick={() => onSelect("daniel")}
        >
          <div className="game-picker-card-symbol">📜</div>
          <div className="game-picker-card-label">Book of Daniel</div>
          <div className="game-picker-card-title">Daniel&rsquo;s Prophecies</div>
          <div className="game-picker-card-desc">
            8 visions. Empires, beasts, courtrooms, and a stone that shatters everything. Every prophecy verified by history.
          </div>
          <div className="game-picker-card-meta">8 cards · Prophecy</div>
        </button>

        <Link href="/gospel" className="game-picker-card game-picker-card--gospel">
          <div className="game-picker-card-symbol">♥</div>
          <div className="game-picker-card-label">The Gospel</div>
          <div className="game-picker-card-title">God IS Love</div>
          <div className="game-picker-card-desc">
            8 core truths about the Gospel — each one a window into the love of God and connected to a full study.
          </div>
          <div className="game-picker-card-meta">8 cards · Gospel</div>
        </Link>

        <Link href="/revelation" className="game-picker-card game-picker-card--revelation">
          <div className="game-picker-card-symbol">🌊</div>
          <div className="game-picker-card-label">Book of Revelation</div>
          <div className="game-picker-card-title">Revelation</div>
          <div className="game-picker-card-desc">
            22 chapters. Seals, trumpets, beasts, and a Lamb. Every vision placed in history — and every chapter anchored to the love of God.
          </div>
          <div className="game-picker-card-meta">22 cards · Prophecy</div>
        </Link>
      </div>

      <div className="game-picker-footer">
        <Link href="/studies/map" className="game-picker-map-link">
          🕸 View the full map →
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProphetClient() {
  const [mode, setMode] = useState<"daniel" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [revealCard, setRevealCard] = useState<Prophecy | null>(null);
  const [revealOpen, setRevealOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hintsVisible, setHintsVisible] = useState(true);
  const [cardKey, setCardKey] = useState(0);
  const swipeCardRef = useRef<SwipeCardHandle>(null);

  const done = currentIndex >= prophecies.length && prophecies.length > 0;
  const currentProphecy = prophecies[currentIndex];
  const nextProphecy = prophecies[currentIndex + 1];

  const hideHints = useCallback(() => setHintsVisible(false), []);

  const handleSwipeCommit = useCallback(
    () => {
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
    setCompleted((prev) => {
      if (revealCard && !prev.includes(revealCard.id)) {
        return [...prev, revealCard.id];
      }
      return prev;
    });
    setCurrentIndex((i) => {
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

  useEffect(() => {
    if (!prophecies.length) return;
    const handler = (e: KeyboardEvent) => {
      if (revealOpen || done) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
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

  if (mode === null) {
    return <GamePicker onSelect={setMode} />;
  }

  if (done) {
    return (
      <>
        <CompletionScreen
          completed={completed}
          onRestart={handleRestart}
          totalProphecies={prophecies.length}
        />
        {showMap && (
          <ConnectionWeb
            completed={completed}
            onClose={() => setShowMap(false)}
            prophecies={prophecies}
          />
        )}
      </>
    );
  }

  return (
    <div className="prophet-layout">
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

      <div className="prophet-progress-bar-track">
        <div
          className="prophet-progress-bar-fill"
          style={{ width: `${(completed.length / prophecies.length) * 100}%` }}
        />
      </div>

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
          {nextProphecy && (
            <SwipeCard
              key={`next-${nextProphecy.id}`}
              prophecy={nextProphecy}
              isNext={true}
              onSwipeCommit={() => {}}
              onReveal={() => {}}
              onHintUsed={() => {}}
              totalProphecies={prophecies.length}
            />
          )}

          {currentProphecy && (
            <SwipeCard
              key={`card-${currentProphecy.id}-${cardKey}`}
              ref={swipeCardRef}
              prophecy={currentProphecy}
              isNext={false}
              onSwipeCommit={handleSwipeCommit}
              onReveal={handleReveal}
              onHintUsed={hideHints}
              isFirstCard={currentIndex === 0 && cardKey === 0}
              totalProphecies={prophecies.length}
            />
          )}
        </div>

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

        <div className="swipe-action-btns">
          <button
            className="swipe-action-btn swipe-action-btn--left"
            onClick={() => {
              hideHints();
              swipeCardRef.current?.triggerSwipe("left");
            }}
            aria-label="Not sure — mark prophecy as uncertain"
          >
            ✕
          </button>
          <button
            className="swipe-action-btn swipe-action-btn--reveal"
            onClick={handleReveal}
            aria-label="Reveal prophecy details"
          >
            ?
          </button>
          <button
            className="swipe-action-btn swipe-action-btn--right"
            onClick={() => {
              hideHints();
              swipeCardRef.current?.triggerSwipe("right");
            }}
            aria-label="Fulfilled — mark prophecy as fulfilled"
          >
            ✓
          </button>
        </div>
      </main>

      <footer className="prophet-footer">
        <div className="prophet-footer-text">
          Tap to open study · Swipe to commit · ← → keys · Space to reveal
        </div>
      </footer>

      <RevealPanel
        prophecy={revealCard}
        isOpen={revealOpen}
        onClose={handleRevealClose}
        onNext={handleRevealNext}
        isLast={currentIndex >= prophecies.length}
        totalProphecies={prophecies.length}
      />

      {showMap && (
        <ConnectionWeb
          completed={completed}
          onClose={() => setShowMap(false)}
          prophecies={prophecies}
        />
      )}
    </div>
  );
}
