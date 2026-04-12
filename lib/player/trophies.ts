import type { PlayerState, TrophyId } from "./state";

export interface TrophyDef {
  id: TrophyId;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  check: (state: PlayerState) => boolean;
}

export const TROPHY_DEFS: TrophyDef[] = [
  {
    id: "first-blood",
    name: "First Blood",
    description: "Complete any single game",
    icon: "🗡️",
    xpReward: 25,
    check: (s) =>
      s.games.daniel.completions > 0 ||
      s.games.gospel.completions > 0 ||
      s.games.revelation.completions > 0 ||
      s.games.wordQuest.levelsCompleted.length > 0,
  },
  {
    id: "daniels-disciple",
    name: "Daniel's Disciple",
    description: 'Complete Daniel with all "Fulfilled"',
    icon: "🦁",
    xpReward: 50,
    check: (s) => {
      const choices = s.games.daniel.fulfillmentChoices;
      const vals = Object.values(choices);
      return vals.length >= 8 && vals.every((v) => v === "fulfilled");
    },
  },
  {
    id: "gospel-carrier",
    name: "Gospel Carrier",
    description: "Complete the Gospel deck",
    icon: "✝️",
    xpReward: 25,
    check: (s) => s.games.gospel.completions > 0,
  },
  {
    id: "revelation-reader",
    name: "Revelation Reader",
    description: "Complete all 22 Revelation chapters",
    icon: "📜",
    xpReward: 50,
    check: (s) => s.games.revelation.completions > 0,
  },
  {
    id: "memory-master",
    name: "Memory Master",
    description: 'Get 10 "Easy" ratings in a single Verse Memory session',
    icon: "🧠",
    xpReward: 50,
    // Checked at runtime by the VM game when session ends
    check: () => false,
  },
  {
    id: "word-champion",
    name: "Word Champion",
    description: "Complete all 3 Word Quest levels",
    icon: "📚",
    xpReward: 50,
    check: (s) =>
      [1, 2, 3].every((l) => s.games.wordQuest.levelsCompleted.includes(l)),
  },
  {
    id: "seven-day-flame",
    name: "Seven-Day Flame",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    xpReward: 100,
    check: (s) => s.currentStreak >= 7,
  },
  {
    id: "thirty-day-pillar",
    name: "Thirty-Day Pillar",
    description: "Maintain a 30-day streak",
    icon: "🏛️",
    xpReward: 100,
    check: (s) => s.currentStreak >= 30,
  },
  {
    id: "connection-weaver",
    name: "Connection Weaver",
    description: "View Connection Web with all 8 nodes lit",
    icon: "🕸️",
    xpReward: 25,
    check: (s) => s.games.daniel.cardsRevealed.length >= 8,
  },
  {
    id: "speed-prophet",
    name: "Speed Prophet",
    description: "Complete Daniel in timed mode under 3 minutes",
    icon: "⏱️",
    xpReward: 75,
    check: (s) =>
      s.games.daniel.bestTime !== null && s.games.daniel.bestTime < 180_000,
  },
  {
    id: "cross-pollinator",
    name: "Cross-Pollinator",
    description: "Play all 5 games at least once",
    icon: "🌿",
    xpReward: 50,
    check: (s) =>
      s.games.daniel.cardsRevealed.length > 0 &&
      s.games.gospel.cardsRevealed.length > 0 &&
      s.games.revelation.cardsRevealed.length > 0 &&
      Object.keys(s.games.verseMemory.cardProgress).length > 0 &&
      s.games.wordQuest.levelsCompleted.length > 0,
  },
  {
    id: "verse-vault",
    name: "Verse Vault",
    description: 'Memorize 10 verses (rated "Easy" at least twice)',
    icon: "💎",
    xpReward: 75,
    check: (s) => {
      const mastered = Object.values(s.games.verseMemory.cardProgress).filter(
        (cp) => cp.repetitions >= 2 && cp.easeFactor >= 2.5,
      );
      return mastered.length >= 10;
    },
  },
  {
    id: "scholar-rank",
    name: "Scholar Rank",
    description: "Reach 500 total XP",
    icon: "🎓",
    xpReward: 25,
    check: (s) => s.totalXP >= 500,
  },
  {
    id: "prophet-rank",
    name: "Prophet Rank",
    description: "Reach 4,000 total XP",
    icon: "⚡",
    xpReward: 50,
    check: (s) => s.totalXP >= 4_000,
  },
  {
    id: "keyboard-warrior",
    name: "Keyboard Warrior",
    description: "Complete any game using only keyboard",
    icon: "⌨️",
    xpReward: 25,
    // Checked at runtime by games tracking input method
    check: () => false,
  },
];

export function checkTrophyUnlocks(
  state: PlayerState,
): { id: TrophyId; def: TrophyDef }[] {
  const newUnlocks: { id: TrophyId; def: TrophyDef }[] = [];

  for (const def of TROPHY_DEFS) {
    if (state.trophies[def.id]) continue; // already unlocked
    if (def.check(state)) {
      newUnlocks.push({ id: def.id, def });
    }
  }

  return newUnlocks;
}
