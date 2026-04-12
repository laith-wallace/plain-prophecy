"use client";

import Link from "next/link";
import { usePlayer } from "@/lib/PlayerContext";
import { RankBadge } from "./RankBadge";
import { StreakBadge } from "./StreakBadge";

export function PlayerBar() {
  const { state, rank, toggleSound } = usePlayer();

  return (
    <div className="player-bar">
      <Link href="/games" className="player-bar-brand">
        Plain<span>Prophecy</span>
      </Link>

      <div className="player-bar-center">
        <RankBadge rank={rank.currentRank} size="sm" />
        <div className="player-bar-xp">
          <div className="player-bar-xp-bar">
            <div
              className="player-bar-xp-fill"
              style={{ width: `${rank.progressFraction * 100}%` }}
            />
          </div>
          <span className="player-bar-xp-label">
            {state.totalXP} XP
          </span>
        </div>
      </div>

      <div className="player-bar-right">
        <StreakBadge count={state.currentStreak} />
        <button
          type="button"
          className="player-bar-sound"
          onClick={toggleSound}
          aria-label={state.soundEnabled ? "Mute sound" : "Enable sound"}
        >
          {state.soundEnabled ? "🔊" : "🔇"}
        </button>
      </div>
    </div>
  );
}
