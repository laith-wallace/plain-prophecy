export interface VisionCell {
  visionId: "daniel-2" | "daniel-7" | "daniel-8" | "revelation-13";
  present: boolean;
  symbol: string;
  symbolName: string;
  scripture: string;
  keyLine: string;
  description: string;
}

export interface EmpireRow {
  id: string;
  name: string;
  era: string;
  color: string;
  textColor: "dark" | "light";
  convergenceNote: string;
  cells: VisionCell[];
}

export const VISIONS = [
  {
    id: "daniel-2",
    label: "Daniel 2",
    subtitle: "The Statue",
    icon: "🗿",
    scripture: "Dan 2:31–45",
    columnNote: null,
  },
  {
    id: "daniel-7",
    label: "Daniel 7",
    subtitle: "The Four Beasts",
    icon: "🦁",
    scripture: "Dan 7:1–27",
    columnNote: null,
  },
  {
    id: "daniel-8",
    label: "Daniel 8",
    subtitle: "Ram & Goat",
    icon: "🐏",
    scripture: "Dan 8:1–14",
    columnNote: "Vision begins at Medo-Persia — Babylon had already fallen.",
  },
  {
    id: "revelation-13",
    label: "Revelation 13",
    subtitle: "The Sea Beast",
    icon: "🌊",
    scripture: "Rev 13:1–10",
    columnNote:
      "The beast doesn't show empires as phases — it inherits all their features at once (Rev 13:2).",
  },
] as const;

export const empireRows: EmpireRow[] = [
  {
    id: "babylon",
    name: "Babylon",
    era: "605 – 539 BC",
    color: "#C9A84C",
    textColor: "dark",
    convergenceNote:
      "Two independent visions written decades apart both open on the same golden empire — the probability of coincidence collapses.",
    cells: [
      {
        visionId: "daniel-2",
        present: true,
        symbol: "🗿",
        symbolName: "Head of Gold",
        scripture: "Dan 2:38",
        keyLine: '"You are the head of gold."',
        description:
          "Babylon stands alone at the top — the most glorious of the four kingdoms. Gold is the costliest metal; the empire was the richest and most absolute in its authority.",
      },
      {
        visionId: "daniel-7",
        present: true,
        symbol: "🦁",
        symbolName: "Lion with Eagle's Wings",
        scripture: "Dan 7:4",
        keyLine: '"The first was like a lion and had eagle\'s wings."',
        description:
          "King of beasts, king of birds — Babylon's royal majesty and blazing speed of conquest. The wings plucked and the beast given a man's heart: Nebuchadnezzar's humbling (Dan 4).",
      },
      {
        visionId: "daniel-8",
        present: false,
        symbol: "",
        symbolName: "",
        scripture: "",
        keyLine: "",
        description: "",
      },
      {
        visionId: "revelation-13",
        present: true,
        symbol: "🦁",
        symbolName: "Lion's Mouth",
        scripture: "Rev 13:2",
        keyLine: '"Its mouth was like a lion\'s mouth."',
        description:
          "The composite sea beast inherits Babylon's commanding, royal voice. Every empire that followed spoke with an authority first modelled in Babylon's throne room.",
      },
    ],
  },
  {
    id: "medo-persia",
    name: "Medo-Persia",
    era: "539 – 331 BC",
    color: "#A8B8C8",
    textColor: "dark",
    convergenceNote:
      "Three visions use different symbols — silver, a lopsided bear, a two-horned ram — and all land on the same dual-natured empire. None of the authors could compare notes.",
    cells: [
      {
        visionId: "daniel-2",
        present: true,
        symbol: "🥈",
        symbolName: "Chest & Arms of Silver",
        scripture: "Dan 2:39",
        keyLine: '"After you shall arise another kingdom inferior to yours."',
        description:
          "Two arms mirror the Medo-Persian coalition — powerful but not as unified as Babylon. Silver is valuable yet less than gold: a vast empire, but more diffuse in its authority.",
      },
      {
        visionId: "daniel-7",
        present: true,
        symbol: "🐻",
        symbolName: "Lopsided Bear",
        scripture: "Dan 7:5",
        keyLine:
          '"It was raised up on one side, and had three ribs in its mouth."',
        description:
          "The higher side is Persia's dominance over Media. Three ribs = the three major powers it devoured: Lydia, Babylon, and Egypt. A crushing, methodical empire.",
      },
      {
        visionId: "daniel-8",
        present: true,
        symbol: "🐏",
        symbolName: "Ram with Two Horns",
        scripture: "Dan 8:3, 20",
        keyLine:
          '"The ram that you saw with the two horns is the kings of Media and Persia."',
        description:
          "Gabriel interprets this directly — the only empire named explicitly in Daniel 8. One horn taller than the other, again capturing Persia's dominance over its Median partner.",
      },
      {
        visionId: "revelation-13",
        present: true,
        symbol: "🐻",
        symbolName: "Bear's Feet",
        scripture: "Rev 13:2",
        keyLine: '"Its feet were like a bear\'s."',
        description:
          "Persia's grinding, unstoppable advance encoded in the sea beast's feet. The weight and methodical crushing power of the bear-empire lives on in every power that came after.",
      },
    ],
  },
  {
    id: "greece",
    name: "Greece",
    era: "331 – 168 BC",
    color: "#A0673A",
    textColor: "light",
    convergenceNote:
      "Daniel 8 names Alexander the Great centuries before he was born. Daniel 2 and 7 describe the same empire with matching imagery from completely different visions.",
    cells: [
      {
        visionId: "daniel-2",
        present: true,
        symbol: "🥉",
        symbolName: "Belly & Thighs of Bronze",
        scripture: "Dan 2:39",
        keyLine: '"A third kingdom of bronze, which shall rule over all the earth."',
        description:
          "Bronze was the metal of Greek warfare — Alexander's soldiers wore it from Macedon to India. The belly and thighs suggest the swiftness and reach of a world-spanning conquest.",
      },
      {
        visionId: "daniel-7",
        present: true,
        symbol: "🐆",
        symbolName: "Four-Headed Leopard",
        scripture: "Dan 7:6",
        keyLine:
          '"Four wings of a bird on its back, and the beast had four heads."',
        description:
          "Leopard speed plus four wings = Alexander's astonishing pace. The four heads = his four generals (Ptolemy, Seleucus, Cassander, Lysimachus) who divided the empire after his death in 323 BC.",
      },
      {
        visionId: "daniel-8",
        present: true,
        symbol: "🐐",
        symbolName: "He-Goat with One Horn",
        scripture: "Dan 8:5, 21",
        keyLine:
          '"The goat is the king of Greece. And the great horn between his eyes is the first king."',
        description:
          "The most explicit interpretation in Scripture: Alexander named, his death implied by the horn breaking at its peak, and the four-way split of his empire named. All confirmed by secular history.",
      },
      {
        visionId: "revelation-13",
        present: true,
        symbol: "🐆",
        symbolName: "Leopard's Body",
        scripture: "Rev 13:2",
        keyLine: '"The beast was like a leopard."',
        description:
          "Greece's restless speed and cultural penetration form the very body of the composite beast. Hellenism's language and culture saturated every empire that came after it — including Rome.",
      },
    ],
  },
  {
    id: "rome",
    name: "Rome",
    era: "168 BC – 476 AD",
    color: "#6A7A8A",
    textColor: "light",
    convergenceNote:
      "Four visions, four completely different symbols, all pointing to the same iron empire. Daniel 7 doesn't even give it an animal name — Rome defied every natural category.",
    cells: [
      {
        visionId: "daniel-2",
        present: true,
        symbol: "⚔️",
        symbolName: "Legs of Iron",
        scripture: "Dan 2:40",
        keyLine:
          '"Strong as iron, because iron breaks in pieces and shatters all things."',
        description:
          "No softening metal — iron is the strongest and hardest. Two legs foretell the East/West split of the empire. Rome ruled not by culture or trade but by crushing military force.",
      },
      {
        visionId: "daniel-7",
        present: true,
        symbol: "🦷",
        symbolName: "Terrible Beast",
        scripture: "Dan 7:7",
        keyLine:
          '"Dreadful and terrible, exceedingly strong. It had great iron teeth."',
        description:
          "Deliberately nameless — no natural animal could represent Rome. It broke and devoured its victims and stamped the residue underfoot. Iron teeth again echo Daniel 2's iron legs.",
      },
      {
        visionId: "daniel-8",
        present: true,
        symbol: "📯",
        symbolName: "Little Horn (Phase 1)",
        scripture: "Dan 8:9",
        keyLine:
          '"Out of one of them came a little horn, which grew exceedingly great."',
        description:
          "Rome emerging from the territory of one of Greece's four successors — the Seleucid region. Growing south, east, and toward the glorious land (Judea): Rome's Mediterranean expansion in precise geographical order.",
      },
      {
        visionId: "revelation-13",
        present: true,
        symbol: "🐉",
        symbolName: "Dragon's Power",
        scripture: "Rev 13:2",
        keyLine:
          '"The dragon gave it his power and his throne and great authority."',
        description:
          "Pagan Rome as the vehicle of Satan's earthly rule. Imperial authority passed from the dragon (Rome's pagan power) to the beast — mirroring how Rome's civil power transferred to the medieval church.",
      },
    ],
  },
  {
    id: "divided",
    name: "Divided Europe",
    era: "476 AD – Present",
    color: "#8A6A5A",
    textColor: "light",
    convergenceNote:
      "All four visions agree: a fragmented power arises from Rome's wreckage, accompanied by a religious authority that dominates for exactly 1,260 years. History names the dates.",
    cells: [
      {
        visionId: "daniel-2",
        present: true,
        symbol: "🏛️",
        symbolName: "Feet of Iron & Clay",
        scripture: "Dan 2:41–43",
        keyLine: '"The kingdom shall be partly strong and partly brittle."',
        description:
          "Rome's iron fragments mixed with Germanic peoples (clay) that refuse to bond. Charlemagne, Napoleon, Hitler, the EU — every attempt to reunify Europe has failed, exactly as prophesied.",
      },
      {
        visionId: "daniel-7",
        present: true,
        symbol: "📯",
        symbolName: "Ten Horns + Little Horn",
        scripture: "Dan 7:8, 24–25",
        keyLine:
          '"A little horn… shall speak words against the Most High… for a time, times, and half a time."',
        description:
          "Ten Germanic kingdoms from Rome's ruins; the little horn uproots three (Heruli 493, Vandals 534, Ostrogoths 538 AD) and rules for 1,260 years (538–1798 AD). The Reformers unanimously identified this power.",
      },
      {
        visionId: "daniel-8",
        present: true,
        symbol: "📯",
        symbolName: "Little Horn (Phase 2)",
        scripture: "Dan 8:11–12",
        keyLine: '"It cast down truth to the ground, and it acted and prospered."',
        description:
          "The same power as Daniel 7's little horn, now described spiritually rather than politically — casting down truth, defiling the sanctuary. A religious corruption of Christ's heavenly priesthood.",
      },
      {
        visionId: "revelation-13",
        present: true,
        symbol: "⏳",
        symbolName: "42 Months of Authority",
        scripture: "Rev 13:5",
        keyLine: '"It was given authority to act for forty-two months."',
        description:
          "42 months = 1,260 prophetic days = 1,260 years by the day-year principle (Num 14:34; Ezek 4:6). 538–1798 AD. The same period as Daniel 7's little horn — a third independent confirmation of the same timeframe.",
      },
    ],
  },
  {
    id: "kingdom",
    name: "God's Kingdom",
    era: "Second Coming → Eternity",
    color: "#E8E0D0",
    textColor: "dark",
    convergenceNote:
      "Every vision ends the same way: not with another human empire, but with a divine kingdom that arrives from outside history and never ends. This is the point of all four visions.",
    cells: [
      {
        visionId: "daniel-2",
        present: true,
        symbol: "🪨",
        symbolName: "Stone Cut Without Hands",
        scripture: "Dan 2:34–35, 44",
        keyLine:
          '"The God of heaven will set up a kingdom that shall never be destroyed."',
        description:
          "Not built by military conquest, political dynasty, or intermarriage — it arrives from outside history entirely. The stone strikes, the statue crumbles, and the stone becomes a mountain filling the whole earth.",
      },
      {
        visionId: "daniel-7",
        present: true,
        symbol: "☁️",
        symbolName: "Son of Man",
        scripture: "Dan 7:13–14",
        keyLine:
          '"He was given dominion and glory and a kingdom, that all peoples… should serve him."',
        description:
          "Jesus cited this verse at his trial (Matt 26:64) — claiming to be the one receiving the eternal kingdom before the Ancient of Days. His enthronement in heaven first, then his return to earth.",
      },
      {
        visionId: "daniel-8",
        present: true,
        symbol: "🕍",
        symbolName: "Sanctuary Restored",
        scripture: "Dan 8:14",
        keyLine: '"Then the sanctuary shall be restored to its rightful state."',
        description:
          "After the little horn's defilement, restoration. The heavenly sanctuary — of which the earthly was only a copy (Heb 8:2) — is cleansed. Points to Christ's completed priestly ministry before his return.",
      },
      {
        visionId: "revelation-13",
        present: false,
        symbol: "",
        symbolName: "",
        scripture: "",
        keyLine: "",
        description: "",
      },
    ],
  },
];
