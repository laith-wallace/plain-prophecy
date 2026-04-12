"use client";

import { usePlayer } from "@/lib/PlayerContext";
import { TROPHY_DEFS } from "@/lib/player/trophies";

export function TrophyShelf() {
  const { state } = usePlayer();

  return (
    <div className="trophy-shelf">
      <div className="trophy-shelf-label">Trophies</div>
      <div className="trophy-shelf-scroll">
        {TROPHY_DEFS.map((def) => {
          const unlocked = !!state.trophies[def.id];
          return (
            <div
              key={def.id}
              className={`trophy-shelf-item ${unlocked ? "trophy-shelf-item--unlocked" : ""}`}
              title={unlocked ? `${def.name}: ${def.description}` : "Locked"}
            >
              <span className="trophy-shelf-icon" aria-hidden="true">
                {unlocked ? def.icon : "🔒"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
