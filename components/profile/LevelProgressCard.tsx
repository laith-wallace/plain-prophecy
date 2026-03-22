"use client";

import { CheckCircle2, Lock } from "lucide-react";

const LEVELS = [
  { key: "beginner",     label: "Seeker",  level: 1, required: 0,  description: "Beginning the journey" },
  { key: "intermediate", label: "Student", level: 2, required: 5,  description: "Growing in understanding" },
  { key: "advanced",     label: "Scholar", level: 3, required: 15, description: "Deep in the Word" },
] as const;

interface LevelProgressCardProps {
  spiritualLevel: "beginner" | "intermediate" | "advanced";
  completedCount: number;
}

export default function LevelProgressCard({ spiritualLevel, completedCount }: LevelProgressCardProps) {
  const currentIdx = LEVELS.findIndex((l) => l.key === spiritualLevel);
  const currentLevel = LEVELS[currentIdx];
  const nextLevel = LEVELS[currentIdx + 1];

  // Progress toward the next level
  const progressFrom = currentLevel.required;
  const progressTo = nextLevel?.required ?? currentLevel.required;
  const progressCount = Math.min(completedCount - progressFrom, progressTo - progressFrom);
  const progressPct = nextLevel
    ? Math.min(100, Math.round((progressCount / (progressTo - progressFrom)) * 100))
    : 100;

  return (
    <section
      className="rounded-2xl p-5"
      style={{ background: "#1c1917", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest font-mono mb-0.5" style={{ color: "#e8a020" }}>
            Your Level
          </p>
          <h2 className="text-lg font-bold text-white">
            {currentLevel.label}
            <span className="ml-2 text-sm font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>
              Level {currentLevel.level}
            </span>
          </h2>
        </div>
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{ background: "rgba(232,160,32,0.12)", color: "#e8a020", fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          {currentLevel.level}
        </div>
      </div>

      {/* Progress bar toward next level */}
      {nextLevel ? (
        <div className="mb-5">
          <div className="flex justify-between items-baseline mb-1.5">
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Progress to {nextLevel.label}
            </span>
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>
              {completedCount} / {nextLevel.required} studies
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #e8a020, #f0c040)" }}
            />
          </div>
        </div>
      ) : (
        <div className="mb-5 flex items-center gap-2">
          <CheckCircle2 size={14} style={{ color: "#e8a020" }} />
          <span className="text-xs" style={{ color: "#e8a020" }}>
            Maximum level reached — {completedCount} studies completed
          </span>
        </div>
      )}

      {/* All levels */}
      <div className="space-y-2">
        {LEVELS.map((lvl, i) => {
          const isPast = i < currentIdx;
          const isCurrent = i === currentIdx;
          const isFuture = i > currentIdx;

          return (
            <div
              key={lvl.key}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5"
              style={{
                background: isCurrent
                  ? "rgba(232,160,32,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: isCurrent
                  ? "1px solid rgba(232,160,32,0.2)"
                  : "1px solid transparent",
                opacity: isFuture ? 0.55 : 1,
              }}
            >
              {/* Level circle */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: isPast
                    ? "rgba(232,160,32,0.9)"
                    : isCurrent
                    ? "rgba(232,160,32,0.2)"
                    : "rgba(255,255,255,0.08)",
                  color: isPast ? "#0c0a09" : isCurrent ? "#e8a020" : "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                }}
              >
                {isPast ? <CheckCircle2 size={14} /> : lvl.level}
              </div>

              {/* Label + description */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold leading-none"
                  style={{ color: isCurrent ? "#fff" : isFuture ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.8)" }}
                >
                  {lvl.label}
                </p>
                <p
                  className="text-xs mt-0.5 leading-none"
                  style={{ color: isCurrent ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.25)" }}
                >
                  {lvl.description}
                </p>
              </div>

              {/* Requirement badge */}
              <div
                className="flex items-center gap-1 text-xs font-mono flex-shrink-0"
                style={{ color: isFuture ? "rgba(255,255,255,0.3)" : isPast ? "#e8a020" : "rgba(255,255,255,0.4)" }}
              >
                {isFuture && <Lock size={10} />}
                <span>{lvl.required === 0 ? "Start" : `${lvl.required} studies`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
