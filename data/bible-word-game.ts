// Bible Word Quest — data
//
// Core gospel + prophecy vocabulary for the Word Quest matching game.
// Every word is anchored to a Christ-centred definition and a scripture
// reference so the reveal lands on the word, not the ritual.

export type WordQuestLevel = 1 | 2 | 3;

export interface WordQuestEntry {
  /** The vocabulary word (the thing the player is matching). */
  word: string;
  /** A short, plain-English definition — no jargon, no gatekeeping. */
  definition: string;
  /** Scripture reference + short quotation used on the reveal. */
  scripture: string;
  /** A single emoji used as a visual anchor for the word. */
  emoji: string;
  /** Difficulty tier. 1 = Explorer, 2 = Adventurer, 3 = Champion. */
  level: WordQuestLevel;
}

export const wordQuestEntries: WordQuestEntry[] = [
  // ── Level 1 · Explorer ────────────────────────────────────────────────────
  {
    word: "Grace",
    definition: "God's gift of love that we don't deserve",
    scripture:
      "Ephesians 2:8 — 'For it is by grace you have been saved, through faith.'",
    emoji: "🎁",
    level: 1,
  },
  {
    word: "Faith",
    definition: "Trusting God even when we can't see Him",
    scripture:
      "Hebrews 11:1 — 'Faith is being sure of what we hope for and certain of what we do not see.'",
    emoji: "🌟",
    level: 1,
  },
  {
    word: "Prayer",
    definition: "Talking and listening to God",
    scripture:
      "Philippians 4:6 — 'Do not be anxious about anything, but in everything, by prayer… present your requests to God.'",
    emoji: "🙏",
    level: 1,
  },
  {
    word: "Sabbath",
    definition: "God's special day of rest and worship",
    scripture:
      "Exodus 20:8 — 'Remember the Sabbath day by keeping it holy.'",
    emoji: "✨",
    level: 1,
  },
  {
    word: "Sin",
    definition: "Choosing to break God's law",
    scripture: "1 John 3:4 — 'Everyone who sins breaks God's law.'",
    emoji: "⚠️",
    level: 1,
  },

  // ── Level 2 · Adventurer ──────────────────────────────────────────────────
  {
    word: "Forgiveness",
    definition: "God wiping away everything wrong we have done",
    scripture:
      "1 John 1:9 — 'If we confess our sins, He is faithful and just to forgive us our sins.'",
    emoji: "💛",
    level: 2,
  },
  {
    word: "Gospel",
    definition: "The good news that Jesus saves us",
    scripture:
      "Mark 1:15 — 'The kingdom of God has come near. Repent and believe the good news!'",
    emoji: "📖",
    level: 2,
  },
  {
    word: "Holy Spirit",
    definition: "God's presence and power living inside us",
    scripture:
      "John 14:26 — 'The Holy Spirit will teach you all things.'",
    emoji: "🕊️",
    level: 2,
  },
  {
    word: "Baptism",
    definition: "Going under water as a sign of new life in Jesus",
    scripture:
      "Romans 6:4 — 'We were buried with Him through baptism… we too may live a new life.'",
    emoji: "💧",
    level: 2,
  },
  {
    word: "Worship",
    definition: "Honouring God with all of who we are",
    scripture:
      "John 4:24 — 'God is spirit, and his worshippers must worship in the Spirit and in truth.'",
    emoji: "🎵",
    level: 2,
  },

  // ── Level 3 · Champion ────────────────────────────────────────────────────
  {
    word: "Covenant",
    definition: "A special promise between God and His people",
    scripture:
      "Genesis 17:7 — 'I will establish my covenant as an everlasting covenant between me and you.'",
    emoji: "🤝",
    level: 3,
  },
  {
    word: "Resurrection",
    definition: "Coming back to life after death — what Jesus did",
    scripture:
      "John 11:25 — 'Jesus said, I am the resurrection and the life.'",
    emoji: "⚡",
    level: 3,
  },
  {
    word: "Salvation",
    definition: "Being rescued from sin by what Jesus did for us",
    scripture:
      "Acts 4:12 — 'Salvation is found in no one else, for there is no other name… by which we must be saved.'",
    emoji: "🛡️",
    level: 3,
  },
  {
    word: "Prophecy",
    definition: "A message from God about what will happen",
    scripture:
      "2 Peter 1:21 — 'Prophecy never had its origin in the human will, but prophets spoke from God.'",
    emoji: "📜",
    level: 3,
  },
  {
    word: "Repentance",
    definition: "Turning away from wrong and turning toward God",
    scripture:
      "Acts 3:19 — 'Repent, then, and turn to God, so that your sins may be wiped out.'",
    emoji: "↩️",
    level: 3,
  },
];

export const WORD_QUEST_LEVEL_LABELS: Record<WordQuestLevel, string> = {
  1: "Explorer",
  2: "Adventurer",
  3: "Champion",
};

export const WORD_QUEST_LEVEL_ICONS: Record<WordQuestLevel, string> = {
  1: "🌱",
  2: "🌿",
  3: "🏆",
};

/** How many matches per round (also the pool size per level). */
export const WORD_QUEST_ROUND_SIZE = 5;
