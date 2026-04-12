"use client";

export function StreakBadge({ count }: { count: number }) {
  if (count < 1) return null;
  return (
    <span className={`streak-badge ${count >= 7 ? "streak-badge--hot" : ""}`}>
      <span className="streak-badge-flame" aria-hidden="true">
        🔥
      </span>
      <span className="streak-badge-count">{count}</span>
    </span>
  );
}
