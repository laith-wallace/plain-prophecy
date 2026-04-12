"use client";

import type { RevelationCard } from "@/data/revelation-cards";

interface Act {
  id: string;
  label: string;
  color: string;
  startIndex: number;
  endIndex: number;
}

export const REVELATION_ACTS: Act[] = [
  { id: "churches",    label: "Christ & the Churches", color: "#C9A84C", startIndex: 0,  endIndex: 2  },
  { id: "seals",       label: "Seals & Trumpets",      color: "#B85C3A", startIndex: 3,  endIndex: 10 },
  { id: "controversy", label: "The Great Controversy",  color: "#7B4FA2", startIndex: 11, endIndex: 17 },
  { id: "finale",      label: "The Finale",             color: "#D4AF37", startIndex: 18, endIndex: 21 },
];

export function getActForIndex(index: number): Act {
  for (const act of REVELATION_ACTS) {
    if (index >= act.startIndex && index <= act.endIndex) return act;
  }
  return REVELATION_ACTS[0];
}

export function isActBoundary(prevIndex: number, nextIndex: number): boolean {
  return getActForIndex(prevIndex).id !== getActForIndex(nextIndex).id;
}

export function ProphecyTimeline({
  cards,
  currentIndex,
  completed,
}: {
  cards: RevelationCard[];
  currentIndex: number;
  completed: string[];
}) {
  return (
    <div className="rev-timeline">
      <div className="rev-timeline-track">
        {cards.map((card, i) => {
          const act = getActForIndex(i);
          const isDone = completed.includes(card.id);
          const isCurrent = i === currentIndex;
          return (
            <div
              key={card.id}
              className={`rev-timeline-node ${isDone ? "rev-timeline-node--done" : ""} ${isCurrent ? "rev-timeline-node--current" : ""}`}
              style={{ "--node-color": isDone || isCurrent ? act.color : "rgba(255,255,255,0.1)" } as React.CSSProperties}
              title={`Ch ${card.number}: ${card.title}`}
            >
              <div className="rev-timeline-dot" />
              {i < cards.length - 1 && (
                <div className={`rev-timeline-line ${isDone ? "rev-timeline-line--done" : ""}`} style={{ "--line-color": isDone ? act.color : "rgba(255,255,255,0.06)" } as React.CSSProperties} />
              )}
            </div>
          );
        })}
      </div>
      <div className="rev-timeline-acts">
        {REVELATION_ACTS.map((act) => {
          const span = act.endIndex - act.startIndex + 1;
          return (
            <div
              key={act.id}
              className="rev-timeline-act-label"
              style={{ flex: span, color: act.color }}
            >
              {act.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
