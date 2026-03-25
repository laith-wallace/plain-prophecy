// Card-specific display metadata for each study lesson.
// Keyed by lesson slug. These augment the rich data already in data/studies.ts
// with the visual fields needed for the card deck index.
// When Convex gains these fields on studyCourses, swap this lookup for a query.

export interface StudyCardMeta {
  emoji: string;
  accentColor: string; // dark hex — card background tint
  isNew?: boolean;
  shortDescription: string; // ≤ 90 chars
}

export const studyCardMeta: Record<string, StudyCardMeta> = {
  "love-for-god": {
    emoji: "❤️",
    accentColor: "#0f0a0a",
    shortDescription:
      "Before rules, before rituals — God loved us first. The foundation of everything.",
  },
  "righteousness-by-faith": {
    emoji: "🕊️",
    accentColor: "#0a0a12",
    shortDescription:
      "Righteousness is not achieved, it's received. A gift through faith in Jesus Christ.",
  },
  "the-resurrection": {
    emoji: "🌅",
    accentColor: "#0a0d0a",
    shortDescription:
      "The empty tomb is God's 'Amen' to Christ's 'It is finished.' Death defeated forever.",
  },
  "jesus-at-the-centre": {
    emoji: "✝️",
    accentColor: "#0a0d14",
    shortDescription:
      "Every page of Scripture, from Genesis to Revelation, points to one Person.",
  },
  "the-sabbath": {
    emoji: "🕊️",
    accentColor: "#0a0d0a",
    isNew: true,
    shortDescription:
      "Creation joy, liberation, Greek word studies, and every major objection answered.",
  },
  "daniel-1": {
    emoji: "🥗",
    accentColor: "#0a0a05",
    shortDescription:
      "Four teenagers stand trial by fire and food in the heart of pagan Babylon.",
  },
  "daniel-2": {
    emoji: "🗿",
    accentColor: "#0d0b1f",
    shortDescription:
      "The statue that maps 4,000 years of world history — and where it ends.",
  },
  "daniel-7": {
    emoji: "🦁",
    accentColor: "#1a0808",
    isNew: false,
    shortDescription:
      "Four predatory empires seen from heaven's perspective — then the Son of Man arrives.",
  },
  "2300-days": {
    emoji: "🐏",
    accentColor: "#041a1a",
    shortDescription:
      "The longest time prophecy in Scripture, pinpointing events from 457 BC to 1844 AD.",
  },
  "daniel-9": {
    emoji: "⏳",
    accentColor: "#1a1000",
    shortDescription:
      "Gabriel names the exact year of Christ's baptism, death, and the end of Israel's probation.",
  },
  "70-week-prophecy": {
    emoji: "📜",
    accentColor: "#0f0a1f",
    shortDescription:
      "The prophetic keystone of the Bible — 70 weeks that point to one Man.",
  },
  "daniel-12": {
    emoji: "🌅",
    accentColor: "#0a0a1f",
    isNew: true,
    shortDescription:
      "Probation closes, the dead rise, and Daniel receives his personal resurrection promise.",
  },
  "seven-seals": {
    emoji: "🔏",
    accentColor: "#100a1a",
    shortDescription:
      "The Lamb opens seven seals — mapping the spiritual history of the church age.",
  },
  "revelation-13": {
    emoji: "🐉",
    accentColor: "#0f0505",
    shortDescription:
      "Two beasts, a mark, and the ultimate question: who will you worship?",
  },
  "revelation-14": {
    emoji: "📯",
    accentColor: "#05100f",
    isNew: true,
    shortDescription:
      "The final gospel call before Christ returns — three angels, three urgent messages.",
  },
  "antichrist-development": {
    emoji: "🎭",
    accentColor: "#150505",
    shortDescription:
      "The mystery of lawlessness — not a figure from horror movies, but a spirit from within.",
  },
};

export function getCardMeta(slug: string): StudyCardMeta {
  return (
    studyCardMeta[slug] ?? {
      emoji: "📖",
      accentColor: "#0d0d0d",
      shortDescription: "A deep-dive into biblical prophecy.",
    }
  );
}
