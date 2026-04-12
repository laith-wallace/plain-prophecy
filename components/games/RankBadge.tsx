"use client";

import { RANK_ICONS, type PlayerRank } from "@/lib/player/state";

export function RankBadge({
  rank,
  size = "md",
}: {
  rank: PlayerRank;
  size?: "sm" | "md";
}) {
  return (
    <span className={`rank-badge rank-badge--${size}`}>
      <span className="rank-badge-icon" aria-hidden="true">
        {RANK_ICONS[rank]}
      </span>
      <span className="rank-badge-label">{rank}</span>
    </span>
  );
}
