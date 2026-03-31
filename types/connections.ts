// Shared types for the /connections "Web of Scripture" feature

export interface BookMeta {
  index: number
  name: string
  abbr: string           // OSIS abbreviation (e.g. "Gen", "Rev")
  displayAbbr: string    // Human-readable short name (e.g. "Gen", "Rev")
  chapters: number
  verseStart: number     // Cumulative verse index of first verse in this book
  verseEnd: number       // Cumulative verse index of last verse in this book (inclusive)
  chapterStart: number   // Cumulative chapter index of first chapter in this book
  testament: 'OT' | 'NT'
  totalVerses: number
}

export interface ChapterMeta {
  book: number           // Book index (0-65)
  chapter: number        // Chapter number within book (1-based)
  verseCount: number     // Number of verses in this chapter
  chapterStart: number   // Cumulative chapter index across all books
  verseStart: number     // Cumulative verse index of first verse in this chapter
}

export interface CrossReferenceData {
  refs: [number, number, number][]  // [fromVerseIndex, toVerseIndex, votes]
  books: BookMeta[]
  chapters: ChapterMeta[]
}

export type FilterMode = 'base' | 'verse' | 'christThread' | 'prophecyHighway' | 'bookDna' | 'path'

export interface FilterState {
  mode: FilterMode
  verseIndex?: number           // for 'verse' mode
  arcIndices?: number[]         // for 'christThread' / 'path' modes
  bookMask?: boolean[]          // for 'prophecyHighway' mode (indexed by book index)
  bookIndex?: number            // for 'bookDna' mode
}

export interface ArcHit {
  arcIndex: number
  fromVerseIndex: number
  toVerseIndex: number
  votes: number
}

// Guided discovery paths
export interface DiscoveryStep {
  step: number
  from: string            // OSIS reference e.g. "Gen.12.1"
  to: string              // OSIS reference e.g. "Gal.3.8"
  caption: string
  highlightBooks: string[] // OSIS book abbrs to highlight
}

export interface DiscoveryPath {
  id: string
  title: string
  description: string
  durationMinutes: number
  relatedStudySlug?: string
  steps: DiscoveryStep[]
}

// Study challenges
export type ChallengeType = 'findIt' | 'countIt' | 'nameIt'

export interface BaseChallengeinterfaceBase {
  id: string
  type: ChallengeType
  question: string
  xpReward: number
}

export interface FindItChallenge extends BaseChallengeinterfaceBase {
  type: 'findIt'
  targetArcFrom: string    // OSIS reference
  targetArcTo: string      // OSIS reference
  hint: string
}

export interface CountItChallenge extends BaseChallengeinterfaceBase {
  type: 'countIt'
  correctAnswer: number
  tolerance: number
}

export interface NameItChallenge extends BaseChallengeinterfaceBase {
  type: 'nameIt'
  options: string[]
  correctIndex: number
}

export type Challenge = FindItChallenge | CountItChallenge | NameItChallenge

// Christ Thread curated connections
export interface ChristThreadConnection {
  from: string          // OSIS reference e.g. "Dan.9.25"
  to: string            // OSIS reference e.g. "Luk.3.1"
  label: string
  gapYears: number
  type: 'prophecy_fulfilment' | 'typological_shadow'
  fromText?: string     // Optional verse text snippet
  toText?: string
}
