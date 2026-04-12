"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  WORD_QUEST_LEVEL_ICONS,
  WORD_QUEST_LEVEL_LABELS,
  WORD_QUEST_ROUND_SIZE,
  wordQuestEntries,
  type WordQuestEntry,
  type WordQuestLevel,
} from "@/data/bible-word-game";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const LEVELS: WordQuestLevel[] = [1, 2, 3];

// ─── LevelSelect ──────────────────────────────────────────────────────────────

function LevelSelect({ onSelect }: { onSelect: (lvl: WordQuestLevel) => void }) {
  const previews = useMemo(() => {
    const out: Record<WordQuestLevel, string> = { 1: "", 2: "", 3: "" };
    for (const lvl of LEVELS) {
      out[lvl] = wordQuestEntries
        .filter((w) => w.level === lvl)
        .map((w) => w.word)
        .join(" · ");
    }
    return out;
  }, []);

  return (
    <div className="wq-level-select">
      <div className="wq-hero">
        <div className="wq-hero-eyebrow">Plain Prophecy · Vocabulary</div>
        <h1 className="wq-hero-title">
          Bible <span>Word</span> Quest
        </h1>
        <p className="wq-hero-subtitle">
          Match the word to its meaning. Every correct match reveals the
          scripture behind it.
        </p>
      </div>

      <div className="wq-level-grid">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            type="button"
            className={`wq-level-card wq-level-card--${lvl}`}
            onClick={() => onSelect(lvl)}
          >
            <div className="wq-level-card-icon" aria-hidden="true">
              {WORD_QUEST_LEVEL_ICONS[lvl]}
            </div>
            <div className="wq-level-card-label">{WORD_QUEST_LEVEL_LABELS[lvl]}</div>
            <div className="wq-level-card-preview">{previews[lvl]}</div>
            <div className="wq-level-card-meta">
              {WORD_QUEST_ROUND_SIZE} words · Level {lvl}
            </div>
          </button>
        ))}
      </div>

      <Link href="/games" className="wq-back-link">
        ← Back to games
      </Link>
    </div>
  );
}

// ─── RevealModal ──────────────────────────────────────────────────────────────

function RevealModal({ entry }: { entry: WordQuestEntry }) {
  return (
    <div className="wq-reveal" role="dialog" aria-live="polite">
      <div className="wq-reveal-card">
        <div className="wq-reveal-emoji" aria-hidden="true">
          {entry.emoji}
        </div>
        <p className="wq-reveal-word">{entry.word}</p>
        <p className="wq-reveal-def">{entry.definition}</p>
        <div className="wq-reveal-scripture">{entry.scripture}</div>
      </div>
    </div>
  );
}

// ─── GameOverScreen ───────────────────────────────────────────────────────────

function GameOverScreen({
  level,
  score,
  total,
  onPlayAgain,
  onNextLevel,
  onChooseLevel,
}: {
  level: WordQuestLevel;
  score: number;
  total: number;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onChooseLevel: () => void;
}) {
  return (
    <div className="wq-gameover">
      <div className="wq-gameover-icon" aria-hidden="true">
        🏆
      </div>
      <h2 className="wq-gameover-title">You did it!</h2>
      <p className="wq-gameover-sub">
        {WORD_QUEST_LEVEL_ICONS[level]} {WORD_QUEST_LEVEL_LABELS[level]} · {score} / {total}
      </p>
      <button type="button" className="wq-btn wq-btn--primary" onClick={onPlayAgain}>
        Play again
      </button>
      {level < 3 && (
        <button type="button" className="wq-btn" onClick={onNextLevel}>
          Next level →
        </button>
      )}
      <button type="button" className="wq-btn wq-btn--ghost" onClick={onChooseLevel}>
        Choose level
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WordQuestClient() {
  const [level, setLevel] = useState<WordQuestLevel | null>(null);
  const [words, setWords] = useState<WordQuestEntry[]>([]);
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<WordQuestEntry | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const startLevel = (lvl: WordQuestLevel) => {
    const pool = wordQuestEntries.filter((w) => w.level === lvl);
    const selected = shuffle(pool).slice(0, WORD_QUEST_ROUND_SIZE);
    setLevel(lvl);
    setWords(selected);
    setLeftItems(shuffle(selected.map((w) => w.word)));
    setRightItems(shuffle(selected.map((w) => w.definition)));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setWrong([]);
    setRevealed(null);
    setScore(0);
    setGameOver(false);
    setCelebrating(false);
  };

  // ── Match detection ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedLeft || !selectedRight) return;

    const wordObj = words.find((w) => w.word === selectedLeft);
    const isMatch = wordObj && wordObj.definition === selectedRight;

    if (isMatch && wordObj) {
      const newMatched = [...matched, selectedLeft];
      setMatched(newMatched);
      setRevealed(wordObj);
      setScore((s) => s + 10);
      setCelebrating(true);
      const wasLastMatch = newMatched.length === words.length;
      const timeout = window.setTimeout(() => {
        setCelebrating(false);
        setRevealed(null);
        if (wasLastMatch) setGameOver(true);
      }, 2600);
      setSelectedLeft(null);
      setSelectedRight(null);
      return () => window.clearTimeout(timeout);
    }

    // Wrong match — shake both cards briefly
    const pair = [selectedLeft, selectedRight];
    setWrong(pair);
    const timeout = window.setTimeout(() => {
      setWrong([]);
    }, 650);
    setSelectedLeft(null);
    setSelectedRight(null);
    return () => window.clearTimeout(timeout);
  }, [selectedLeft, selectedRight, words, matched]);

  // ── Render: level select ─────────────────────────────────────────────────
  if (level === null) {
    return (
      <div className="wq-layout">
        <header className="wq-header">
          <Link href="/games" className="wq-header-brand">
            Plain<span>Prophecy</span>
          </Link>
          <div className="wq-header-label">Word Quest</div>
        </header>
        <div className="wq-content">
          <LevelSelect onSelect={startLevel} />
        </div>
      </div>
    );
  }

  // ── Render: game over ────────────────────────────────────────────────────
  if (gameOver) {
    return (
      <div className={`wq-layout wq-layout--level-${level}`}>
        <header className="wq-header">
          <Link href="/games" className="wq-header-brand">
            Plain<span>Prophecy</span>
          </Link>
          <div className="wq-header-label">
            {WORD_QUEST_LEVEL_LABELS[level]} · Complete
          </div>
        </header>
        <div className="wq-content">
          <GameOverScreen
            level={level}
            score={score}
            total={words.length * 10}
            onPlayAgain={() => startLevel(level)}
            onNextLevel={() => {
              if (level < 3) startLevel((level + 1) as WordQuestLevel);
            }}
            onChooseLevel={() => setLevel(null)}
          />
        </div>
      </div>
    );
  }

  // ── Render: playing ──────────────────────────────────────────────────────
  return (
    <div className={`wq-layout wq-layout--level-${level}`}>
      <header className="wq-header">
        <Link href="/games" className="wq-header-brand">
          Plain<span>Prophecy</span>
        </Link>
        <div className="wq-header-label">
          {WORD_QUEST_LEVEL_ICONS[level]} {WORD_QUEST_LEVEL_LABELS[level]}
        </div>
      </header>

      <div className="wq-scorebar">
        <span className="wq-scorebar-score">★ {score}</span>
        <span className="wq-scorebar-progress">
          {matched.length} / {words.length} matched
        </span>
        <button
          type="button"
          className="wq-scorebar-back"
          onClick={() => setLevel(null)}
        >
          ← Levels
        </button>
      </div>

      <div className="wq-content">
        <div className="wq-board">
          <div className="wq-column">
            <div className="wq-column-label">Words</div>
            {leftItems.map((word) => {
              const wordObj = words.find((w) => w.word === word);
              const isMatched = matched.includes(word);
              const isSelected = selectedLeft === word;
              const isWrong = wrong.includes(word);
              const classes = [
                "wq-tile",
                "wq-tile--word",
                isMatched ? "wq-tile--matched" : "",
                isSelected ? "wq-tile--selected" : "",
                isWrong ? "wq-tile--wrong" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  type="button"
                  key={word}
                  className={classes}
                  disabled={isMatched}
                  aria-pressed={isSelected}
                  onClick={() =>
                    setSelectedLeft(isSelected ? null : word)
                  }
                >
                  <span className="wq-tile-emoji" aria-hidden="true">
                    {wordObj?.emoji}
                  </span>
                  <span className="wq-tile-word">{word}</span>
                </button>
              );
            })}
          </div>

          <div className="wq-column">
            <div className="wq-column-label">Meanings</div>
            {rightItems.map((def) => {
              const wordObj = words.find((w) => w.definition === def);
              const isMatched = wordObj
                ? matched.includes(wordObj.word)
                : false;
              const isSelected = selectedRight === def;
              const isWrong = wrong.includes(def);
              const classes = [
                "wq-tile",
                "wq-tile--def",
                isMatched ? "wq-tile--matched" : "",
                isSelected ? "wq-tile--selected" : "",
                isWrong ? "wq-tile--wrong" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <button
                  type="button"
                  key={def}
                  className={classes}
                  disabled={isMatched}
                  aria-pressed={isSelected}
                  onClick={() =>
                    setSelectedRight(isSelected ? null : def)
                  }
                >
                  {def}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {celebrating && revealed && <RevealModal entry={revealed} />}
    </div>
  );
}
