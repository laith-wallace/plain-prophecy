"use client";

import { usePlayer } from "@/lib/PlayerContext";
import { PlayerBar } from "./PlayerBar";
import { GameTile } from "./GameTile";
import { TrophyShelf } from "./TrophyShelf";

export function GameHub() {
  const { state, rank } = usePlayer();

  const danielProgress =
    state.games.daniel.cardsRevealed.length / 8;
  const gospelProgress =
    state.games.gospel.cardsRevealed.length / 8;
  const revelationProgress =
    state.games.revelation.cardsRevealed.length / 22;
  const vmTotal = Object.keys(state.games.verseMemory.cardProgress).length;
  const vmProgress = vmTotal / 28;
  const wqProgress =
    state.games.wordQuest.levelsCompleted.length / 3;

  return (
    <div className="game-hub">
      <PlayerBar />

      <div className="game-hub-content">
        {/* Hero */}
        <section className="game-hub-hero">
          <div className="game-hub-hero-eyebrow">Plain Prophecy</div>
          <h1 className="game-hub-hero-title">Your Arena</h1>
          <div className="game-hub-hero-rank">
            <span className="game-hub-hero-rank-name">
              {rank.currentRank}
            </span>
            {rank.nextRank && (
              <span className="game-hub-hero-rank-next">
                {rank.xpNeeded} XP to {rank.nextRank}
              </span>
            )}
          </div>
        </section>

        {/* Game tiles — 2-column grid */}
        <section className="game-hub-grid">
          <GameTile
            href="/games/daniel"
            title="Daniel"
            subtitle="Prophecy Connections"
            icon="🦁"
            progress={danielProgress}
            color="#C9A84C"
            meta="8 prophecies"
            badge={danielProgress === 0 ? "NEW" : undefined}
          />
          <GameTile
            href="/gospel"
            title="Gospel"
            subtitle="Core Truths"
            icon="✝️"
            progress={gospelProgress}
            color="#E8A020"
            meta="8 cards"
            badge={gospelProgress === 0 ? "NEW" : undefined}
          />
          <GameTile
            href="/revelation"
            title="Revelation"
            subtitle="Chapter by Chapter"
            icon="📜"
            progress={revelationProgress}
            color="#7A9ABB"
            meta="22 chapters"
            badge={revelationProgress === 0 ? "NEW" : undefined}
          />
          <GameTile
            href="/games/verse-memory"
            title="Verses"
            subtitle="Spaced Repetition"
            icon="🧠"
            progress={vmProgress}
            color="#6BCB77"
            meta={`${vmTotal}/28 seen`}
          />
          <GameTile
            href="/games/word-quest"
            title="Word Quest"
            subtitle="Vocabulary Match"
            icon="📚"
            progress={wqProgress}
            color="#A78BFA"
            meta="3 levels"
            badge={wqProgress === 0 ? "NEW" : undefined}
          />
        </section>

        {/* Trophy shelf */}
        <TrophyShelf />
      </div>
    </div>
  );
}
