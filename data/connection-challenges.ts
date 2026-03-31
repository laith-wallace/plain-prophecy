// Study challenge questions for the /connections ChallengeModal.
// Three types: FindIt, CountIt, NameIt.
// Theologically vetted — no futurist/preterist interpretations.

import type { Challenge } from '@/types/connections'

export const CHALLENGES: Challenge[] = [
  // ── Type A: Find It ──────────────────────────────────────────────────────
  {
    id: 'find-daniel-palm-sunday',
    type: 'findIt',
    question:
      'Daniel 9:25 contains a prophecy about the Anointed One entering Jerusalem. Which verse in Matthew records the fulfilment of this moment?',
    xpReward: 50,
    targetArcFrom: 'Dan.9.25',
    targetArcTo: 'Matt.21.5',
    hint: 'Look for the arc connecting Daniel to Matthew. Jesus enters Jerusalem on a donkey — Zechariah 9:9 and Matthew 21:5 are the key connection.',
  },
  {
    id: 'find-gen-john3',
    type: 'findIt',
    question:
      'Genesis 22 — where Abraham offers his only son — is called the "shadow" of something in the New Testament. Which verse in John explicitly points back to it?',
    xpReward: 50,
    targetArcFrom: 'Gen.22.2',
    targetArcTo: 'John.3.16',
    hint: 'Think about what John 3:16 says about God\'s "only Son." This is the substance of the Genesis 22 shadow.',
  },
  {
    id: 'find-malachi-mark',
    type: 'findIt',
    question:
      "Malachi 3:1 promises that God would send a messenger to prepare the way. Mark's Gospel opens with this exact quote. Find the arc between them.",
    xpReward: 40,
    targetArcFrom: 'Mal.3.1',
    targetArcTo: 'Mark.1.2',
    hint: 'Malachi ends the Old Testament. Mark opens the New Testament. The gap between them is 400 years of silence — broken by a messenger.',
  },

  // ── Type B: Count It ────────────────────────────────────────────────────
  {
    id: 'count-daniel-rev',
    type: 'countIt',
    question:
      'How many cross-references connect the book of Daniel to the book of Revelation? (Enter your best estimate — within ±20 is correct)',
    xpReward: 60,
    correctAnswer: 150,
    tolerance: 20,
  },
  {
    id: 'count-isa53',
    type: 'countIt',
    question:
      'Isaiah 53 — the suffering servant chapter — is one of the most cross-referenced passages in the Bible. Roughly how many connections does it have to the New Testament? (within ±10)',
    xpReward: 60,
    correctAnswer: 40,
    tolerance: 10,
  },
  {
    id: 'count-psalm22',
    type: 'countIt',
    question:
      'Psalm 22 begins with the exact words Jesus cried from the cross. How many cross-references does Psalm 22 have in total across the whole Bible? (within ±15)',
    xpReward: 50,
    correctAnswer: 55,
    tolerance: 15,
  },

  // ── Type C: Name It ─────────────────────────────────────────────────────
  {
    id: 'name-most-referenced',
    type: 'nameIt',
    question:
      'Which chapter of the Bible has the most cross-references connecting to other passages?',
    xpReward: 40,
    options: ['Psalm 22', 'Isaiah 53', 'Revelation 13', 'Daniel 7'],
    correctIndex: 1,
  },
  {
    id: 'name-70-weeks-decree',
    type: 'nameIt',
    question:
      'The 70 Weeks prophecy in Daniel 9 begins counting from "the word to restore and rebuild Jerusalem." Which Persian king issued this decree?',
    xpReward: 50,
    options: ['Cyrus', 'Darius I', 'Artaxerxes I', 'Xerxes'],
    correctIndex: 2,
  },
  {
    id: 'name-longest-arc',
    type: 'nameIt',
    question:
      'The longest possible arc on this visualisation connects Genesis to which book — the furthest connection across the entire Bible?',
    xpReward: 30,
    options: ['Hebrews', 'Revelation', 'John', '2 Peter'],
    correctIndex: 1,
  },
  {
    id: 'name-bronze-serpent',
    type: 'nameIt',
    question:
      'Jesus told Nicodemus that "as Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up." Which book records the original bronze serpent story?',
    xpReward: 30,
    options: ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
    correctIndex: 2,
  },
  {
    id: 'name-christ-thread-count',
    type: 'nameIt',
    question:
      'When you activate the "Christ Thread" filter, you see only the curated messianic connections. Which approximate range best describes how many connections are shown?',
    xpReward: 40,
    options: ['5–10', '15–25', '50–60', 'Over 100'],
    correctIndex: 1,
  },
]
