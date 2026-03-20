// data/empire-map.ts
// Historical Empire Map — geographic data for Daniel 2 empire progression
//
// Territory coordinates are real lat/lng points derived from historical sources.
// They were originally computed from a schematic SVG canvas using:
//   lng = x / 14.12 − 10   (canvas x → longitude)
//   lat = 55 − y / 22.86   (canvas y → latitude)
// …then rounded and geographically verified.

export type EmpireId =
  | 'babylon'
  | 'medo-persia'
  | 'greece'
  | 'rome'
  | 'divided'
  | 'kingdom'

export interface LatLngPoint {
  lat: number
  lng: number
}

export interface EmpireMapEntry {
  id: EmpireId
  name: string
  era: string
  capital: string
  /** Position of the capital city on the map */
  capitalCoords: LatLngPoint
  color: string       // territory fill — matches parallels.ts empireRows
  glowColor: string
  textColor: 'dark' | 'light'
  bibleRef: string
  bibleText: string
  historicNote: string
  /** Territory polygon (main shape) */
  coordinates: LatLngPoint[]
  /** For Divided Rome: [westFragment, eastFragment] */
  subCoordinates?: LatLngPoint[][]
  statueSection: string
}

// ─── Empire territory polygons ────────────────────────────────────────────────

// Babylon — Mesopotamia: modern Iraq, eastern Syria, Kuwait
const BABYLON: LatLngPoint[] = [
  { lat: 35.1, lng: 36.4 }, { lat: 37.9, lng: 41.0 }, { lat: 38.2, lng: 43.0 },
  { lat: 38.5, lng: 46.3 }, { lat: 37.4, lng: 48.1 }, { lat: 35.6, lng: 49.1 },
  { lat: 33.5, lng: 48.8 }, { lat: 31.7, lng: 47.6 }, { lat: 30.0, lng: 46.7 },
  { lat: 28.8, lng: 44.0 }, { lat: 29.1, lng: 41.0 }, { lat: 30.0, lng: 38.2 },
  { lat: 31.4, lng: 36.9 }, { lat: 33.3, lng: 36.1 },
]

// Medo-Persia — Egypt/Libya through Anatolia to the Indus River
const MEDO_PERSIA: LatLngPoint[] = [
  { lat: 32.4, lng: 20.3 }, { lat: 40.9, lng: 21.7 }, { lat: 43.0, lng: 26.0 },
  { lat: 43.3, lng: 29.2 }, { lat: 43.3, lng: 35.5 }, { lat: 43.7, lng: 41.1 },
  { lat: 43.7, lng: 50.3 }, { lat: 41.7, lng: 60.1 }, { lat: 37.5, lng: 68.0 },
  { lat: 32.2, lng: 73.0 }, { lat: 27.8, lng: 71.4 }, { lat: 23.9, lng: 67.2 },
  { lat: 23.0, lng: 60.7 }, { lat: 26.2, lng: 56.6 }, { lat: 27.5, lng: 52.3 },
  { lat: 29.1, lng: 48.1 }, { lat: 28.8, lng: 45.0 }, { lat: 29.1, lng: 41.1 },
  { lat: 30.0, lng: 38.2 }, { lat: 31.8, lng: 35.2 }, { lat: 31.6, lng: 30.1 },
  { lat: 32.0, lng: 25.0 },
]

// Greece (Alexander) — from mainland Greece all the way to the Indus
const GREECE: LatLngPoint[] = [
  { lat: 36.7, lng: 19.8 }, { lat: 41.4, lng: 21.9 }, { lat: 43.2, lng: 26.1 },
  { lat: 43.3, lng: 29.2 }, { lat: 43.3, lng: 35.5 }, { lat: 43.7, lng: 41.1 },
  { lat: 43.8, lng: 50.9 }, { lat: 41.7, lng: 60.1 }, { lat: 37.4, lng: 68.7 },
  { lat: 32.5, lng: 73.4 }, { lat: 28.1, lng: 72.1 }, { lat: 23.9, lng: 67.2 },
  { lat: 23.0, lng: 60.7 }, { lat: 26.2, lng: 56.6 }, { lat: 27.5, lng: 52.3 },
  { lat: 29.1, lng: 48.1 }, { lat: 28.8, lng: 45.0 }, { lat: 29.1, lng: 41.1 },
  { lat: 30.0, lng: 38.2 }, { lat: 31.8, lng: 35.2 }, { lat: 31.6, lng: 30.1 },
  { lat: 32.0, lng: 25.0 }, { lat: 32.4, lng: 20.3 }, { lat: 34.1, lng: 17.8 },
]

// Rome — the full Mediterranean Rim: Portugal to Levant, Rhine to Sahara
const ROME: LatLngPoint[] = [
  { lat: 38.7, lng: -8.7 }, { lat: 43.4, lng: -7.7 }, { lat: 47.7, lng: -5.5 },
  { lat: 49.7, lng: -2.4 }, { lat: 51.1, lng:  2.2 }, { lat: 51.2, lng:  6.4 },
  { lat: 49.2, lng:  8.8 }, { lat: 47.4, lng: 11.3 }, { lat: 46.9, lng: 16.5 },
  { lat: 46.2, lng: 20.0 }, { lat: 45.6, lng: 24.8 }, { lat: 43.2, lng: 29.2 },
  { lat: 42.2, lng: 30.5 }, { lat: 40.4, lng: 33.3 }, { lat: 38.3, lng: 35.3 },
  { lat: 33.8, lng: 35.3 }, { lat: 31.8, lng: 35.2 }, { lat: 31.6, lng: 30.1 },
  { lat: 32.0, lng: 25.0 }, { lat: 32.4, lng: 20.3 }, { lat: 32.6, lng: 13.9 },
  { lat: 36.7, lng: 10.4 }, { lat: 37.0, lng:  7.8 }, { lat: 36.6, lng:  5.4 },
  { lat: 35.4, lng:  2.3 }, { lat: 35.2, lng: -1.4 }, { lat: 35.4, lng: -5.0 },
  { lat: 35.7, lng: -7.7 },
]

// Divided Rome — same footprint split at the Diocletianic administrative divide (~lon 18.5)
// West: Hispania + Gaul + Italy
const DIVIDED_WEST: LatLngPoint[] = [
  { lat: 38.7, lng: -8.7 }, { lat: 43.4, lng: -7.7 }, { lat: 47.7, lng: -5.5 },
  { lat: 49.7, lng: -2.4 }, { lat: 51.1, lng:  2.2 }, { lat: 51.2, lng:  6.4 },
  { lat: 49.2, lng:  8.8 }, { lat: 47.4, lng: 11.3 }, { lat: 46.9, lng: 16.5 },
  { lat: 46.6, lng: 18.5 }, { lat: 37.5, lng: 18.5 },
  { lat: 32.6, lng: 13.9 }, { lat: 36.7, lng: 10.4 }, { lat: 37.0, lng:  7.8 },
  { lat: 36.6, lng:  5.4 }, { lat: 35.4, lng:  2.3 }, { lat: 35.2, lng: -1.4 },
  { lat: 35.4, lng: -5.0 }, { lat: 35.7, lng: -7.7 },
]
// East: Balkans + Anatolia + Levant + Egypt (Byzantine)
const DIVIDED_EAST: LatLngPoint[] = [
  { lat: 46.6, lng: 18.5 }, { lat: 46.2, lng: 20.0 }, { lat: 45.6, lng: 24.8 },
  { lat: 43.2, lng: 29.2 }, { lat: 42.2, lng: 30.5 }, { lat: 40.4, lng: 33.3 },
  { lat: 38.3, lng: 35.3 }, { lat: 33.8, lng: 35.3 }, { lat: 31.8, lng: 35.2 },
  { lat: 31.6, lng: 30.1 }, { lat: 32.0, lng: 25.0 }, { lat: 32.4, lng: 20.3 },
  { lat: 37.5, lng: 18.5 },
]

// ─── Empire data ──────────────────────────────────────────────────────────────

export const empireMapData: EmpireMapEntry[] = [
  {
    id: 'babylon',
    name: 'Babylon',
    era: '626 – 539 BC',
    capital: 'Babylon (modern Iraq)',
    capitalCoords: { lat: 32.5, lng: 44.4 },
    color: '#C9A84C',
    glowColor: '#f59e0b',
    textColor: 'dark',
    bibleRef: 'Daniel 2:38',
    bibleText: '"You are the head of gold."',
    historicNote:
      'The Babylonian Empire dominated the ancient Near East from its capital on the Euphrates. Under Nebuchadnezzar II it stretched from the Persian Gulf through Mesopotamia and the Levant — the richest and most absolute power of its age.',
    coordinates: BABYLON,
    statueSection: 'Gold',
  },
  {
    id: 'medo-persia',
    name: 'Medo-Persia',
    era: '539 – 331 BC',
    capital: 'Susa & Persepolis (Iran)',
    capitalCoords: { lat: 32.2, lng: 48.3 },
    color: '#A8B8C8',
    glowColor: '#94a3b8',
    textColor: 'dark',
    bibleRef: 'Daniel 2:39',
    bibleText: '"After you shall arise another kingdom."',
    historicNote:
      'The Achaemenid Persian Empire became the largest the ancient world had yet seen — stretching from Greece and Egypt in the west to the Indus River in the east. More than two million square miles under one throne.',
    coordinates: MEDO_PERSIA,
    statueSection: 'Silver',
  },
  {
    id: 'greece',
    name: 'Greece',
    era: '331 – 168 BC',
    capital: 'Pella → Alexandria',
    capitalCoords: { lat: 40.6, lng: 22.5 },
    color: '#A0673A',
    glowColor: '#b45309',
    textColor: 'light',
    bibleRef: 'Daniel 2:39',
    bibleText: '"A third kingdom of bronze, which shall rule over all the earth."',
    historicNote:
      "Alexander the Great conquered the Persian Empire in just nine years. By 323 BC his territory stretched from Greece to the Indus — farther east than any Western army had marched. When he died aged 32, his four generals divided the world between them.",
    coordinates: GREECE,
    statueSection: 'Bronze',
  },
  {
    id: 'rome',
    name: 'Rome',
    era: '168 BC – AD 476',
    capital: 'Rome (Italy)',
    capitalCoords: { lat: 41.9, lng: 12.5 },
    color: '#6A7A8A',
    glowColor: '#64748b',
    textColor: 'light',
    bibleRef: 'Daniel 2:40',
    bibleText: '"A fourth kingdom, strong as iron — it shall break and crush all these."',
    historicNote:
      'Rome encircled the entire Mediterranean Sea — which the Romans called Mare Nostrum, "our sea." At its peak, the Roman Empire bound more of the ancient world together under a single power than any empire before or since.',
    coordinates: ROME,
    statueSection: 'Iron',
  },
  {
    id: 'divided',
    name: 'Divided Europe',
    era: 'AD 476 – present',
    capital: 'No single capital — never reunited',
    capitalCoords: { lat: 48.8, lng: 2.3 },
    color: '#8A6A5A',
    glowColor: '#78716c',
    textColor: 'light',
    bibleRef: 'Daniel 2:41–43',
    bibleText: '"The kingdom shall be divided… iron mixed with clay."',
    historicNote:
      'When the Western Roman Empire fell in 476 AD it shattered into a patchwork of Germanic kingdoms — Franks, Visigoths, Ostrogoths, Lombards. Every attempt to reunite Europe under one ruler — Charlemagne, Napoleon, Hitler — has failed. Exactly as Daniel foresaw.',
    coordinates: ROME,
    subCoordinates: [DIVIDED_WEST, DIVIDED_EAST],
    statueSection: 'Iron & Clay',
  },
  {
    id: 'kingdom',
    name: "God's Kingdom",
    era: 'The Age to Come',
    capital: 'The New Jerusalem',
    capitalCoords: { lat: 31.8, lng: 35.2 },
    color: '#9333ea',
    glowColor: '#a855f7',
    textColor: 'light',
    bibleRef: 'Daniel 2:44',
    bibleText: '"God will set up a kingdom that shall never be destroyed."',
    historicNote:
      'The stone cut without hands — not built by any human dynasty — strikes the statue and fills the whole earth. This is the point every empire in Daniel 2 has been building toward: not another king in the sequence, but a divine kingdom that ends all human kingdoms forever.',
    coordinates: [],
    statueSection: 'Stone',
  },
]

export const EMPIRE_ORDER: EmpireId[] = [
  'babylon',
  'medo-persia',
  'greece',
  'rome',
  'divided',
  'kingdom',
]
