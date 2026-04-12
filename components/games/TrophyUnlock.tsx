"use client";

import { usePlayer } from "@/lib/PlayerContext";

export function TrophyUnlockOverlay() {
  const { trophyToasts, dismissTrophyToast } = usePlayer();

  if (trophyToasts.length === 0) return null;

  const current = trophyToasts[0];

  return (
    <div
      className="trophy-overlay"
      onClick={() => dismissTrophyToast(current.id)}
    >
      <div
        className="trophy-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="trophy-modal-icon" aria-hidden="true">
          {current.def.icon}
        </div>
        <div className="trophy-modal-eyebrow">Trophy Unlocked</div>
        <h2 className="trophy-modal-name">{current.def.name}</h2>
        <p className="trophy-modal-desc">{current.def.description}</p>
        <p className="trophy-modal-xp">+{current.def.xpReward} XP</p>
        <button
          type="button"
          className="trophy-modal-dismiss"
          onClick={() => dismissTrophyToast(current.id)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
