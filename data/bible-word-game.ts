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
  {
    word: "Heaven",
    definition: "God's home where there is no more pain or tears",
    scripture:
      "Revelation 21:4 — 'He will wipe every tear from their eyes. There will be no more death.'",
    emoji: "🌤️",
    level: 1,
  },
  {
    word: "Love",
    definition: "The greatest gift — how God feels about us",
    scripture:
      "1 John 4:8 — 'Whoever does not love does not know God, because God is love.'",
    emoji: "❤️",
    level: 1,
  },
  {
    word: "Hope",
    definition: "Confident expectation of what God has promised",
    scripture:
      "Romans 15:13 — 'May the God of hope fill you with all joy and peace as you trust in him.'",
    emoji: "🌈",
    level: 1,
  },
  {
    word: "Mercy",
    definition: "God choosing not to punish us as we deserve",
    scripture:
      "Lamentations 3:22 — 'Because of the Lord's great love we are not consumed, for his compassions never fail.'",
    emoji: "🕊️",
    level: 1,
  },
  {
    word: "Creation",
    definition: "God making everything from nothing in six days",
    scripture:
      "Genesis 1:1 — 'In the beginning God created the heavens and the earth.'",
    emoji: "🌍",
    level: 1,
  },
  {
    word: "Bible",
    definition: "God's written word — His message to humanity",
    scripture:
      "2 Timothy 3:16 — 'All Scripture is God-breathed and is useful for teaching.'",
    emoji: "📖",
    level: 1,
  },
  {
    word: "Angels",
    definition: "Heavenly beings who serve God and protect His people",
    scripture:
      "Psalm 91:11 — 'For he will command his angels concerning you to guard you in all your ways.'",
    emoji: "👼",
    level: 1,
  },
  {
    word: "Peace",
    definition: "Inner calm that comes from trusting Jesus",
    scripture:
      "John 14:27 — 'Peace I leave with you; my peace I give you. I do not give to you as the world gives.'",
    emoji: "☮️",
    level: 1,
  },
  {
    word: "Promise",
    definition: "Something God says He will do — and always keeps",
    scripture:
      "2 Peter 3:9 — 'The Lord is not slow in keeping his promise.'",
    emoji: "🤞",
    level: 1,
  },
  {
    word: "Joy",
    definition: "Deep happiness that doesn't depend on circumstances",
    scripture:
      "Nehemiah 8:10 — 'The joy of the Lord is your strength.'",
    emoji: "😊",
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
  {
    word: "Parable",
    definition: "A story Jesus told to teach a spiritual truth",
    scripture:
      "Matthew 13:34 — 'Jesus spoke all these things to the crowd in parables.'",
    emoji: "📝",
    level: 2,
  },
  {
    word: "Disciple",
    definition: "A follower of Jesus who learns and obeys His teaching",
    scripture:
      "John 8:31 — 'If you hold to my teaching, you are really my disciples.'",
    emoji: "🚶",
    level: 2,
  },
  {
    word: "Tithe",
    definition: "Giving back a tenth of what God has blessed us with",
    scripture:
      "Malachi 3:10 — 'Bring the whole tithe into the storehouse… and see if I will not throw open the floodgates of heaven.'",
    emoji: "💰",
    level: 2,
  },
  {
    word: "Communion",
    definition: "Bread and juice remembering Jesus' sacrifice for us",
    scripture:
      "1 Corinthians 11:24 — 'This is my body, which is for you; do this in remembrance of me.'",
    emoji: "🍞",
    level: 2,
  },
  {
    word: "Testimony",
    definition: "Your personal story of how God changed your life",
    scripture:
      "Revelation 12:11 — 'They triumphed over him by the blood of the Lamb and by the word of their testimony.'",
    emoji: "🗣️",
    level: 2,
  },
  {
    word: "Stewardship",
    definition: "Taking care of everything God has entrusted to us",
    scripture:
      "1 Peter 4:10 — 'Each of you should use whatever gift you have received to serve others.'",
    emoji: "🌱",
    level: 2,
  },
  {
    word: "Atonement",
    definition: "Jesus taking the punishment we deserved",
    scripture:
      "Romans 5:11 — 'We also boast in God through our Lord Jesus Christ, through whom we have now received reconciliation.'",
    emoji: "✝️",
    level: 2,
  },
  {
    word: "Miracle",
    definition: "Something only God can do that breaks natural laws",
    scripture:
      "Psalm 77:14 — 'You are the God who performs miracles; you display your power among the peoples.'",
    emoji: "⚡",
    level: 2,
  },
  {
    word: "Righteousness",
    definition: "Being right with God — a gift through faith in Jesus",
    scripture:
      "Romans 3:22 — 'This righteousness is given through faith in Jesus Christ to all who believe.'",
    emoji: "⚖️",
    level: 2,
  },
  {
    word: "Sanctuary",
    definition: "The place where God meets His people and forgives sin",
    scripture:
      "Hebrews 8:2 — 'He serves in the sanctuary, the true tabernacle set up by the Lord.'",
    emoji: "🏛️",
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
  {
    word: "Remnant",
    definition: "The faithful few who keep God's commandments to the end",
    scripture:
      "Revelation 12:17 — 'The dragon was enraged… and went off to wage war against the rest of her offspring — those who keep God's commands.'",
    emoji: "🔥",
    level: 3,
  },
  {
    word: "Judgment",
    definition: "When God examines every life to set everything right",
    scripture:
      "Ecclesiastes 12:14 — 'For God will bring every deed into judgment, including every hidden thing.'",
    emoji: "⚖️",
    level: 3,
  },
  {
    word: "Intercession",
    definition: "Jesus standing before God and speaking on our behalf",
    scripture:
      "Hebrews 7:25 — 'He is able to save completely those who come to God through him, because he always lives to intercede for them.'",
    emoji: "🙌",
    level: 3,
  },
  {
    word: "Seal",
    definition: "God's mark of ownership and protection on His people",
    scripture:
      "Ephesians 1:13 — 'You were marked in him with a seal, the promised Holy Spirit.'",
    emoji: "🔏",
    level: 3,
  },
  {
    word: "Millennium",
    definition: "The thousand years in heaven before God remakes the earth",
    scripture:
      "Revelation 20:6 — 'They will be priests of God and of Christ and will reign with him for a thousand years.'",
    emoji: "🏔️",
    level: 3,
  },
  {
    word: "Advent",
    definition: "The second coming of Jesus — visible and glorious",
    scripture:
      "Revelation 1:7 — 'Look, he is coming with the clouds, and every eye will see him.'",
    emoji: "☁️",
    level: 3,
  },
  {
    word: "Justification",
    definition: "God declaring us not guilty because of Jesus",
    scripture:
      "Romans 5:1 — 'Since we have been justified through faith, we have peace with God through our Lord Jesus Christ.'",
    emoji: "📋",
    level: 3,
  },
  {
    word: "Sanctification",
    definition: "The Holy Spirit gradually making us more like Jesus",
    scripture:
      "1 Thessalonians 5:23 — 'May God himself, the God of peace, sanctify you through and through.'",
    emoji: "🌿",
    level: 3,
  },
  {
    word: "Babylon",
    definition: "A Bible symbol for false religion that opposes God",
    scripture:
      "Revelation 18:4 — 'Come out of her, my people, so that you will not share in her sins.'",
    emoji: "🏰",
    level: 3,
  },
  {
    word: "Three Angels",
    definition: "Heaven's final call — fear God, Babylon is fallen, don't take the mark",
    scripture:
      "Revelation 14:7 — 'Fear God and give him glory, because the hour of his judgment has come.'",
    emoji: "📣",
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
