"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  WORD_QUEST_LEVEL_ICONS,
  WORD_QUEST_LEVEL_LABELS,
  WORD_QUEST_ROUND_SIZE,
  wordQuestEntries,
  type WordQuestEntry,
  type WordQuestLevel,
} from "@/data/bible-word-game";
import {
  dailySeed,
  seededShuffle,
} from "@/lib/word-quest-progress";
import { usePlayer } from "@/lib/PlayerContext";

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
const TIMER_SECONDS = 60;

// ─── Confetti ─────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

function spawnConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#f4b24a", "#7aa9e8", "#c4a6f0", "#86efac", "#fbbf24", "#fb7185"];
  const particles: Particle[] = [];
  const cx = canvas.width / 2;
  const cy = canvas.height * 0.35;

  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 6;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 4 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      life: 1,
    });
  }

  let frameId: number;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    for (const p of particles) {
      if (p.life <= 0) continue;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.life -= 0.018;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    if (alive) {
      frameId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
}

// ─── Share result generator ───────────────────────────────────────────────────

function generateShareText(
  mode: "level" | "daily",
  level: WordQuestLevel | null,
  score: number,
  maxCombo: number,
  matchResults: boolean[],
): string {
  const grid = matchResults.map((ok) => (ok ? "\u2705" : "\u274c")).join("");
  const header =
    mode === "daily"
      ? `Bible Word Quest \u00b7 Daily ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
      : `Bible Word Quest \u00b7 ${WORD_QUEST_LEVEL_LABELS[level!]} ${WORD_QUEST_LEVEL_ICONS[level!]}`;
  const lines = [
    header,
    `${grid}  ${score} pts`,
    maxCombo >= 2 ? `\ud83d\udd25 ${maxCombo}x combo` : "",
    "",
    "plainprophecy.com/games/word-quest",
  ];
  return lines.filter(Boolean).join("\n");
}

// ─── Progress shape for sub-components ────────────────────────────────────────

interface WQProgress {
  highScores: Record<number, number>;
  currentStreak: number;
  dailyLastPlayed: string | null;
  dailyBestScore: number;
}

function isDailyDone(p: WQProgress): boolean {
  return p.dailyLastPlayed === new Date().toISOString().slice(0, 10);
}

// ─── LevelSelect ──────────────────────────────────────────────────────────────

function LevelSelect({
  onSelect,
  onDaily,
  timerEnabled,
  onTimerToggle,
  progress,
  checkUnlocked,
}: {
  onSelect: (lvl: WordQuestLevel) => void;
  onDaily: () => void;
  timerEnabled: boolean;
  onTimerToggle: () => void;
  progress: WQProgress;
  checkUnlocked: (lvl: WordQuestLevel) => boolean;
}) {
  const previews = useMemo(() => {
    const out: Record<WordQuestLevel, string> = { 1: "", 2: "", 3: "" };
    for (const lvl of LEVELS) {
      out[lvl] = wordQuestEntries
        .filter((w) => w.level === lvl)
        .slice(0, 5)
        .map((w) => w.word)
        .join(" \u00b7 ");
    }
    return out;
  }, []);

  const dailyDone = isDailyDone(progress);

  return (
    <div className="wq-level-select">
      <div className="wq-hero">
        <div className="wq-hero-eyebrow">Plain Prophecy \u00b7 Vocabulary</div>
        <h1 className="wq-hero-title">
          Bible <span>Word</span> Quest
        </h1>
        <p className="wq-hero-subtitle">
          Match the word to its meaning. Every correct match reveals the
          scripture behind it.
        </p>
        {progress.currentStreak > 0 && (
          <p style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#fbbf24",
            margin: 0,
          }}>
            \ud83d\udd25 {progress.currentStreak} day streak
          </p>
        )}
      </div>

      {/* Daily Challenge */}
      <button
        type="button"
        className="wq-level-card"
        style={{
          borderColor: dailyDone ? "rgba(134,239,172,0.3)" : "rgba(251,191,36,0.4)",
          background: dailyDone ? "rgba(134,239,172,0.06)" : "rgba(251,191,36,0.06)",
          opacity: dailyDone ? 0.6 : 1,
        }}
        onClick={onDaily}
        disabled={dailyDone}
      >
        <div className="wq-level-card-icon" aria-hidden="true">
          {dailyDone ? "\u2705" : "\ud83d\udcc5"}
        </div>
        <div className="wq-level-card-label" style={{ color: dailyDone ? "#86efac" : "#fbbf24" }}>
          {dailyDone ? "Daily Complete!" : "Daily Challenge"}
        </div>
        <div className="wq-level-card-preview">
          {dailyDone
            ? `Best: ${progress.dailyBestScore} pts`
            : "Same 5 words for everyone today"}
        </div>
        <div className="wq-level-card-meta">
          {dailyDone ? "Come back tomorrow" : "5 words \u00b7 All levels"}
        </div>
      </button>

      <div className="wq-timer-toggle">
        <input
          type="checkbox"
          id="wq-timer"
          checked={timerEnabled}
          onChange={onTimerToggle}
        />
        <label htmlFor="wq-timer">Timed mode ({TIMER_SECONDS}s)</label>
      </div>

      <div className="wq-level-grid">
        {LEVELS.map((lvl) => {
          const unlocked = checkUnlocked(lvl);
          const best = progress.highScores[lvl];
          return (
            <button
              key={lvl}
              type="button"
              className={`wq-level-card wq-level-card--${lvl}`}
              onClick={() => unlocked && onSelect(lvl)}
              disabled={!unlocked}
              style={!unlocked ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
            >
              <div className="wq-level-card-icon" aria-hidden="true">
                {unlocked ? WORD_QUEST_LEVEL_ICONS[lvl] : "\ud83d\udd12"}
              </div>
              <div className="wq-level-card-label">
                {WORD_QUEST_LEVEL_LABELS[lvl]}
              </div>
              <div className="wq-level-card-preview">
                {unlocked
                  ? previews[lvl]
                  : lvl === 2
                    ? "Complete Explorer to unlock"
                    : "Score 40+ on Adventurer to unlock"}
              </div>
              <div className="wq-level-card-meta">
                {unlocked && best > 0
                  ? `Best: ${best} pts \u00b7 Level ${lvl}`
                  : `${WORD_QUEST_ROUND_SIZE} words \u00b7 Level ${lvl}`}
              </div>
            </button>
          );
        })}
      </div>

      <Link href="/games" className="wq-back-link">
        \u2190 Back to games
      </Link>
    </div>
  );
}

// ─── RevealModal ──────────────────────────────────────────────────────────────

function RevealModal({ entry, comboCount }: { entry: WordQuestEntry; comboCount: number }) {
  return (
    <div className="wq-reveal" role="dialog" aria-live="polite">
      <div className="wq-reveal-card">
        <div className="wq-reveal-emoji" aria-hidden="true">
          {entry.emoji}
        </div>
        <p className="wq-reveal-word">{entry.word}</p>
        {comboCount >= 2 && (
          <p style={{
            color: "#fbbf24",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase" as const,
            margin: "0 0 0.35rem",
          }}>
            {comboCount}x combo!
          </p>
        )}
        <p className="wq-reveal-def">{entry.definition}</p>
        <div className="wq-reveal-scripture">{entry.scripture}</div>
      </div>
    </div>
  );
}

// ─── GameOverScreen ───────────────────────────────────────────────────────────

function GameOverScreen({
  mode,
  level,
  score,
  total,
  maxCombo,
  timeBonus,
  matchResults,
  progress,
  justUnlocked,
  checkUnlocked,
  onPlayAgain,
  onNextLevel,
  onChooseLevel,
}: {
  mode: "level" | "daily";
  level: WordQuestLevel;
  score: number;
  total: number;
  maxCombo: number;
  timeBonus: number;
  matchResults: boolean[];
  progress: WQProgress;
  justUnlocked: WordQuestLevel | null;
  checkUnlocked: (lvl: WordQuestLevel) => boolean;
  onPlayAgain: () => void;
  onNextLevel: () => void;
  onChooseLevel: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const finalScore = score + timeBonus;
  const isNewBest = mode === "level"
    ? finalScore >= progress.highScores[level] && finalScore > 0
    : finalScore >= progress.dailyBestScore && finalScore > 0;

  const handleShare = async () => {
    const text = generateShareText(mode, level, finalScore, maxCombo, matchResults);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  };

  return (
    <div className="wq-gameover">
      <div className="wq-gameover-icon" aria-hidden="true">
        {mode === "daily" ? "\ud83d\udcc5" : "\ud83c\udfc6"}
      </div>
      <h2 className="wq-gameover-title">
        {mode === "daily" ? "Daily Complete!" : "You did it!"}
      </h2>
      {isNewBest && (
        <p style={{
          color: "#fbbf24",
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          margin: "0 0 0.25rem",
        }}>
          \u2b50 New personal best!
        </p>
      )}
      <p className="wq-gameover-sub">
        {WORD_QUEST_LEVEL_ICONS[level]} {WORD_QUEST_LEVEL_LABELS[level]} \u00b7{" "}
        {finalScore} pts
      </p>

      {/* Match result grid */}
      <div style={{
        display: "flex",
        gap: "0.35rem",
        marginBottom: "0.5rem",
        fontSize: "1.25rem",
      }}>
        {matchResults.map((ok, i) => (
          <span key={i}>{ok ? "\u2705" : "\u274c"}</span>
        ))}
      </div>

      {/* Score breakdown */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        width: "100%",
        maxWidth: "240px",
        marginBottom: "0.5rem",
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "0.58rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.55)" }}>
          <span>Base score</span>
          <span>{total} pts</span>
        </div>
        {score - total > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", color: "#fbbf24" }}>
            <span>Combo bonus</span>
            <span>+{score - total} pts</span>
          </div>
        )}
        {timeBonus > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", color: "#86efac" }}>
            <span>Time bonus</span>
            <span>+{timeBonus} pts</span>
          </div>
        )}
        {maxCombo >= 2 && (
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.4)" }}>
            <span>Best combo</span>
            <span>{maxCombo}x</span>
          </div>
        )}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#fff",
          fontWeight: 700,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "0.35rem",
          marginTop: "0.1rem",
        }}>
          <span>Total</span>
          <span>{finalScore} pts</span>
        </div>
        {progress.currentStreak > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", color: "#fbbf24", marginTop: "0.25rem" }}>
            <span>\ud83d\udd25 Streak</span>
            <span>{progress.currentStreak} days</span>
          </div>
        )}
      </div>

      {justUnlocked && (
        <div style={{
          background: "rgba(134,239,172,0.1)",
          border: "1px solid rgba(134,239,172,0.3)",
          borderRadius: "10px",
          padding: "0.65rem 1rem",
          width: "100%",
          textAlign: "center",
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "#86efac",
          marginBottom: "0.25rem",
        }}>
          \ud83d\udd13 {WORD_QUEST_LEVEL_LABELS[justUnlocked]} unlocked!
        </div>
      )}

      <button type="button" className="wq-btn" onClick={handleShare}>
        {copied ? "\u2705 Copied!" : "\ud83d\udcca Share your score"}
      </button>
      {mode === "level" && (
        <button type="button" className="wq-btn wq-btn--primary" onClick={onPlayAgain}>
          Play again
        </button>
      )}
      {mode === "level" && level < 3 && checkUnlocked((level + 1) as WordQuestLevel) && (
        <button type="button" className="wq-btn" onClick={onNextLevel}>
          Next level \u2192
        </button>
      )}
      <button type="button" className="wq-btn wq-btn--ghost" onClick={onChooseLevel}>
        {mode === "daily" ? "Play levels" : "Choose level"}
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type GameMode = "level" | "daily";

export default function WordQuestClient() {
  const [mode, setMode] = useState<GameMode>("level");
  const [level, setLevel] = useState<WordQuestLevel | null>(null);
  const [words, setWords] = useState<WordQuestEntry[]>([]);
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [justMatched, setJustMatched] = useState<string | null>(null);
  const [wrong, setWrong] = useState<string[]>([]);
  const [revealed, setRevealed] = useState<WordQuestEntry | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [matchResults, setMatchResults] = useState<boolean[]>([]);

  // Combo
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // Timer
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeBonus, setTimeBonus] = useState(0);

  // PlayerContext integration
  const { state: playerState, awardXP, updateGameProgress, playSound, toggleSound } = usePlayer();
  const soundOn = playerState.soundEnabled;

  // Derive progress from PlayerContext
  const wqState = playerState.games.wordQuest;
  const levelsCompleted = wqState.levelsCompleted;
  const bestScores = wqState.bestScores as Record<number, number>;
  const isLevelUnlocked = (lvl: WordQuestLevel): boolean => {
    if (lvl === 1) return true;
    if (lvl === 2) return levelsCompleted.includes(1);
    if (lvl === 3) return levelsCompleted.includes(2) && (bestScores[2] ?? 0) >= 40;
    return false;
  };

  const [justUnlocked, setJustUnlocked] = useState<WordQuestLevel | null>(null);
  const [dailyLastPlayed, setDailyLastPlayed] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("pp-wq-daily-date");
  });
  const [dailyBestScore, setDailyBestScore] = useState(() => {
    if (typeof window === "undefined") return 0;
    return parseInt(localStorage.getItem("pp-wq-daily-best") ?? "0", 10);
  });

  // Construct progress object for sub-components
  const progress: WQProgress = useMemo(() => ({
    highScores: bestScores,
    currentStreak: playerState.currentStreak,
    dailyLastPlayed,
    dailyBestScore,
  }), [bestScores, playerState.currentStreak, dailyLastPlayed, dailyBestScore]);

  const confettiRef = useRef<HTMLCanvasElement>(null);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || gameOver) return;
    if (timeLeft <= 0) {
      setTimerRunning(false);
      // Timer ran out — end the game with current state
      setTimeBonus(0);
      const finalScore = score;
      if (level) {
        const xp = Math.round(finalScore / 5);
        if (xp > 0) awardXP("wordQuest", xp, `Word Quest Level ${level}`);
        const prevCompleted = [...levelsCompleted];
        updateGameProgress("wordQuest", (prev) => ({
          ...prev,
          levelsCompleted: [...new Set([...prev.levelsCompleted, level])],
          bestScores: { ...(prev.bestScores as Record<number, number>), [level]: Math.max((prev.bestScores as Record<number, number>)[level] ?? 0, finalScore) },
        }));
        // Check if a new level was unlocked
        if (level === 1 && !prevCompleted.includes(1)) setJustUnlocked(2);
        if (level === 2 && finalScore >= 40 && !prevCompleted.includes(2)) setJustUnlocked(3);
      }
      if (mode === "daily") {
        const today = new Date().toISOString().slice(0, 10);
        setDailyLastPlayed(today);
        localStorage.setItem("pp-wq-daily-date", today);
        if (score > dailyBestScore) {
          setDailyBestScore(score);
          localStorage.setItem("pp-wq-daily-best", String(score));
        }
      }
      setGameOver(true);
      playSound("completion");
      return;
    }
    const id = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning, timeLeft, gameOver, score, mode, level, levelsCompleted, awardXP, updateGameProgress, playSound, dailyBestScore]);

  const startLevel = useCallback((lvl: WordQuestLevel) => {
    const pool = wordQuestEntries.filter((w) => w.level === lvl);
    const selected = shuffle(pool).slice(0, WORD_QUEST_ROUND_SIZE);
    setMode("level");
    setLevel(lvl);
    setWords(selected);
    setLeftItems(shuffle(selected.map((w) => w.word)));
    setRightItems(shuffle(selected.map((w) => w.definition)));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setJustMatched(null);
    setWrong([]);
    setRevealed(null);
    setScore(0);
    setGameOver(false);
    setCelebrating(false);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(TIMER_SECONDS);
    setTimeBonus(0);
    setMatchResults([]);
    setJustUnlocked(null);
    if (timerEnabled) setTimerRunning(true);
  }, [timerEnabled]);

  const startDaily = useCallback(() => {
    const seed = dailySeed();
    const allWords = seededShuffle(wordQuestEntries, seed);
    const selected = allWords.slice(0, WORD_QUEST_ROUND_SIZE);
    // Determine the "level" aesthetic from the majority level
    const levelCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
    selected.forEach((w) => levelCounts[w.level]++);
    const displayLevel = (Object.entries(levelCounts).sort((a, b) => b[1] - a[1])[0][0]) as unknown as WordQuestLevel;

    setMode("daily");
    setLevel(displayLevel);
    setWords(selected);
    setLeftItems(seededShuffle(selected.map((w) => w.word), seed + 1));
    setRightItems(seededShuffle(selected.map((w) => w.definition), seed + 2));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setJustMatched(null);
    setWrong([]);
    setRevealed(null);
    setScore(0);
    setGameOver(false);
    setCelebrating(false);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(TIMER_SECONDS);
    setTimeBonus(0);
    setMatchResults([]);
    setJustUnlocked(null);
    if (timerEnabled) setTimerRunning(true);
  }, [timerEnabled]);

  // ── Match detection ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedLeft || !selectedRight) return;

    const wordObj = words.find((w) => w.word === selectedLeft);
    const isMatch = wordObj && wordObj.definition === selectedRight;

    if (isMatch && wordObj) {
      const newMatched = [...matched, selectedLeft];
      const newCombo = combo + 1;
      const comboMultiplier = newCombo >= 3 ? 2 : newCombo >= 2 ? 1.5 : 1;
      const points = Math.round(10 * comboMultiplier);

      setMatched(newMatched);
      setJustMatched(selectedLeft);
      setRevealed(wordObj);
      setScore((s) => s + points);
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCelebrating(true);
      setMatchResults((r) => [...r, true]);

      if (navigator.vibrate) navigator.vibrate(15);
      playSound("wq-match");
      if (confettiRef.current) spawnConfetti(confettiRef.current);

      const wasLastMatch = newMatched.length === words.length;
      const timeout = window.setTimeout(() => {
        setCelebrating(false);
        setRevealed(null);
        setJustMatched(null);
        if (wasLastMatch) {
          const bonus = timerEnabled ? timeLeft * 2 : 0;
          setTimeBonus(bonus);
          setTimerRunning(false);

          // Calculate final score for persistence
          // score state already includes combo bonuses from all matches
          // We need the current score + the points we just added + time bonus
          const currentScore = score + points;
          const finalScore = currentScore + bonus;

          if (level) {
            const xp = Math.round(finalScore / 5);
            if (xp > 0) awardXP("wordQuest", xp, `Word Quest Level ${level}`);
            const prevCompleted = [...levelsCompleted];
            updateGameProgress("wordQuest", (prev) => ({
              ...prev,
              levelsCompleted: [...new Set([...prev.levelsCompleted, level])],
              bestScores: { ...(prev.bestScores as Record<number, number>), [level]: Math.max((prev.bestScores as Record<number, number>)[level] ?? 0, finalScore) },
            }));
            if (level === 1 && !prevCompleted.includes(1)) setJustUnlocked(2);
            if (level === 2 && finalScore >= 40 && !prevCompleted.includes(2)) setJustUnlocked(3);
          }
          if (mode === "daily") {
            const today = new Date().toISOString().slice(0, 10);
            setDailyLastPlayed(today);
            localStorage.setItem("pp-wq-daily-date", today);
            if (finalScore > dailyBestScore) {
              setDailyBestScore(finalScore);
              localStorage.setItem("pp-wq-daily-best", String(finalScore));
            }
          }

          setGameOver(true);
          playSound("completion");
          if (confettiRef.current) spawnConfetti(confettiRef.current);
        }
      }, 2600);
      setSelectedLeft(null);
      setSelectedRight(null);
      return () => window.clearTimeout(timeout);
    }

    // Wrong match
    const pair = [selectedLeft, selectedRight];
    setWrong(pair);
    setCombo(0);
    setMatchResults((r) => [...r, false]);
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
    playSound("wq-wrong");
    const timeout = window.setTimeout(() => {
      setWrong([]);
    }, 650);
    setSelectedLeft(null);
    setSelectedRight(null);
    return () => window.clearTimeout(timeout);
  }, [selectedLeft, selectedRight, words, matched, combo, timerEnabled, timeLeft, mode, level, score, levelsCompleted, awardXP, updateGameProgress, playSound, dailyBestScore]);

  // Timer display helpers
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerColorClass =
    timerPercent > 50 ? "wq-timer-fill--safe" :
    timerPercent > 20 ? "wq-timer-fill--warn" :
    "wq-timer-fill--danger";

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
          <LevelSelect
            onSelect={startLevel}
            onDaily={startDaily}
            timerEnabled={timerEnabled}
            onTimerToggle={() => setTimerEnabled((t) => !t)}
            progress={progress}
            checkUnlocked={isLevelUnlocked}
          />
        </div>
      </div>
    );
  }

  // ── Render: game over ────────────────────────────────────────────────────
  if (gameOver) {
    return (
      <div className={`wq-layout wq-layout--level-${level}`}>
        <canvas ref={confettiRef} className="wq-confetti" />
        <header className="wq-header">
          <Link href="/games" className="wq-header-brand">
            Plain<span>Prophecy</span>
          </Link>
          <div className="wq-header-label">
            {mode === "daily" ? "Daily" : WORD_QUEST_LEVEL_LABELS[level]} \u00b7 Complete
          </div>
        </header>
        <div className="wq-content">
          <GameOverScreen
            mode={mode}
            level={level}
            score={score}
            total={matched.length * 10}
            maxCombo={maxCombo}
            timeBonus={timeBonus}
            matchResults={matchResults}
            progress={progress}
            justUnlocked={justUnlocked}
            checkUnlocked={isLevelUnlocked}
            onPlayAgain={() => mode === "daily" ? startDaily() : startLevel(level)}
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
      <canvas ref={confettiRef} className="wq-confetti" />

      <header className="wq-header">
        <Link href="/games" className="wq-header-brand">
          Plain<span>Prophecy</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="wq-header-label">
            {mode === "daily" ? "\ud83d\udcc5 Daily" : `${WORD_QUEST_LEVEL_ICONS[level]} ${WORD_QUEST_LEVEL_LABELS[level]}`}
          </div>
          <button
            type="button"
            className="wq-sound-btn"
            onClick={toggleSound}
            aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
          >
            {soundOn ? "\ud83d\udd0a" : "\ud83d\udd07"}
          </button>
        </div>
      </header>

      <div className="wq-scorebar">
        <span className="wq-scorebar-score">\u2605 {score}</span>
        <span className={`wq-combo ${combo >= 2 ? "wq-combo--active" : ""}`}>
          {combo >= 2 ? `${combo}x combo` : ""}
        </span>
        <div style={{ flex: 1 }} />
        {timerEnabled && (
          <span className="wq-timer-label">{timeLeft}s</span>
        )}
        <button
          type="button"
          className="wq-scorebar-back"
          onClick={() => { setTimerRunning(false); setLevel(null); }}
        >
          \u2190 Levels
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ width: "min(100%, 520px)", margin: "0 auto", padding: "0 1rem" }}>
        <div className="wq-progress-bar">
          <div
            className="wq-progress-fill"
            style={{ width: `${(matched.length / words.length) * 100}%` }}
          />
        </div>
        {timerEnabled && (
          <div className="wq-timer-bar" style={{ marginTop: "0.35rem" }}>
            <div
              className={`wq-timer-fill ${timerColorClass}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        )}
      </div>

      <div className="wq-content">
        <div className="wq-board">
          <div className="wq-column">
            <div className="wq-column-label">Words</div>
            {leftItems.map((word) => {
              const wordObj = words.find((w) => w.word === word);
              const isMatched = matched.includes(word);
              const isJustMatched = justMatched === word;
              const isSelected = selectedLeft === word;
              const isWrong = wrong.includes(word);
              const classes = [
                "wq-tile",
                "wq-tile--word",
                isMatched ? "wq-tile--matched" : "",
                isJustMatched ? "wq-tile--just-matched" : "",
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

      {celebrating && revealed && <RevealModal entry={revealed} comboCount={combo} />}
    </div>
  );
}
