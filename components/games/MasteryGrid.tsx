"use client";

import { verseMemoryCards } from "@/data/verse-memory";
import type { CardProgress } from "@/lib/spaced-repetition";

function getMasteryLevel(p: CardProgress | undefined): "unseen" | "again" | "hard" | "good" | "easy" {
  if (!p || p.lastSeen === 0) return "unseen";
  if (p.repetitions === 0) return "again";
  if (p.easeFactor < 2.0) return "hard";
  if (p.easeFactor < 2.5) return "good";
  return "easy";
}

const MASTERY_COLORS: Record<string, string> = {
  unseen: "rgba(255,255,255,0.08)",
  again: "#f87171",
  hard: "#fb923c",
  good: "#86efac",
  easy: "#C9A84C",
};

export function MasteryGrid({
  progress,
  isOpen,
  onToggle,
}: {
  progress: Record<string, CardProgress>;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const total = verseMemoryCards.length;
  const seen = Object.values(progress).filter((p) => p.lastSeen > 0).length;
  const mastered = Object.values(progress).filter((p) => p.easeFactor >= 2.5 && p.repetitions >= 2).length;

  return (
    <div className="mastery-section">
      <button className="mastery-toggle" onClick={onToggle} type="button">
        <span className="mastery-toggle-label">Mastery</span>
        <span className="mastery-toggle-count">{mastered}/{total}</span>
        <span className="mastery-toggle-arrow">{isOpen ? "▾" : "▸"}</span>
      </button>

      {isOpen && (
        <div className="mastery-panel">
          <div className="mastery-stats">
            <span>{seen} seen</span>
            <span>{mastered} mastered</span>
          </div>
          <div className="mastery-grid">
            {verseMemoryCards.map((card) => {
              const p = progress[card.id];
              const level = getMasteryLevel(p);
              return (
                <div
                  key={card.id}
                  className="mastery-dot"
                  style={{ background: MASTERY_COLORS[level] }}
                  title={`${card.reference} — ${level}`}
                />
              );
            })}
          </div>
          <div className="mastery-legend">
            <span><span className="mastery-legend-dot" style={{ background: MASTERY_COLORS.unseen }} /> Unseen</span>
            <span><span className="mastery-legend-dot" style={{ background: MASTERY_COLORS.again }} /> Again</span>
            <span><span className="mastery-legend-dot" style={{ background: MASTERY_COLORS.hard }} /> Hard</span>
            <span><span className="mastery-legend-dot" style={{ background: MASTERY_COLORS.good }} /> Good</span>
            <span><span className="mastery-legend-dot" style={{ background: MASTERY_COLORS.easy }} /> Mastered</span>
          </div>
        </div>
      )}
    </div>
  );
}
