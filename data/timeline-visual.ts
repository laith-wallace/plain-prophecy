// ─────────────────────────────────────────────────────────────────────────────
// Prophetic Timeline — visual data
//
// This file adds numeric year coordinates and visual metadata to the prose-first
// EraBlocks already defined in timelines.ts.  It is the single source of truth
// for the interactive PropheticTimeline component.
// ─────────────────────────────────────────────────────────────────────────────

export type BadgeType = 'fulfilled' | 'future' | 'present' | 'historical'
export type Framework = 'historicist' | 'futurist' | 'preterist'

// ── Canvas coordinate system ─────────────────────────────────────────────────
export const TIMELINE_START = -700  // 700 BC
export const TIMELINE_END   = 2150  // comfortably past present
export const CANVAS_W       = 10000 // SVG user-units wide
export const CANVAS_H       = 1000  // SVG user-units tall
export const AXIS_Y         = 400   // axis is in the lower-middle — labels float ABOVE it, Gantt bands sit BELOW

/** Convert a calendar year to an x-coordinate in SVG user-units. */
export function yearToX(year: number): number {
  return ((year - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * CANVAS_W
}

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  id: string
  year: number           // negative = BC  (e.g. -457 = 457 BC)
  dateLabel: string      // human-readable date string for the card
  label: string          // node label — short phrase
  shortLabel: string     // even shorter for congested zoom-out areas
  desc: string
  refs: string
  badge: BadgeType
  tier: 1 | 2 | 3        // 1 = major, 2 = secondary, 3 = minor
  labelRow: 1 | 2 | 3 | 4 | 5  // explicit row — 1 = just above axis, 5 = near top of canvas
}

export interface PeriodBand {
  id: string
  startYear: number
  endYear: number
  label: string
  colour: string   // semi-transparent fill for the band rect
  stroke: string   // boundary line colour
  bandIndex: number // 0, 1, 2 — controls vertical stacking below axis
}

export interface FrameworkData {
  id: Framework
  label: string
  primaryColour: string
  accentColour: string
  events: TimelineEvent[]
  bands: PeriodBand[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Historicist / SDA framework — the primary lens of this site
// ─────────────────────────────────────────────────────────────────────────────

const historicistEvents: TimelineEvent[] = [
  {
    id: 'hist-decree',
    year: -457,
    dateLabel: '457 BC',
    label: 'Decree of Artaxerxes',
    shortLabel: '457 BC',
    desc: 'Artaxerxes I issues the decree to "restore and rebuild Jerusalem" — the starting gun for both the 70 weeks (Dan 9) and the 2,300 days (Dan 8). This date is verified by the Elephantine Papyri and cross-checked by three independent lines of Persian chronology.',
    refs: 'Dan 9:25 · Ezra 7:11–26',
    badge: 'historical',
    tier: 1,
    labelRow: 3,
  },
  {
    id: 'hist-baptism',
    year: 27,
    dateLabel: '27 AD',
    label: 'Baptism of Christ',
    shortLabel: '27 AD',
    desc: '69 prophetic weeks (483 literal years) after 457 BC lands precisely at 27 AD — the year the Holy Spirit descended on Jesus at the Jordan River. Luke 3 confirms this was the 15th year of Tiberius Caesar, corroborated by Roman historians.',
    refs: 'Dan 9:25 · Luke 3:1–22',
    badge: 'fulfilled',
    tier: 1,
    labelRow: 3,
  },
  {
    id: 'hist-cross',
    year: 31,
    dateLabel: '31 AD',
    label: 'The Crucifixion',
    shortLabel: '31 AD',
    desc: 'The middle of the 70th week — "Messiah cut off, but not for himself." The phrase means a violent, substitutionary death: not punished for his own sin, but for ours. Three and a half years into the final week, exactly as prophesied.',
    refs: 'Dan 9:26–27 · Isa 53:8 · Matt 27',
    badge: 'fulfilled',
    tier: 1,
    labelRow: 1,
  },
  {
    id: 'hist-stephen',
    year: 34,
    dateLabel: '34 AD',
    label: 'Gospel to the Gentiles',
    shortLabel: '34 AD',
    desc: 'The stoning of Stephen marks the formal end of the 70 weeks — the point at which the exclusive focus on the Jewish nation transitions to the full Gentile world mission. The 490 years are cut off from the 2,300 days, leaving 1,810 years.',
    refs: 'Dan 9:27 · Acts 7:54–60 · Acts 8:1–4',
    badge: 'fulfilled',
    tier: 2,
    labelRow: 5,
  },
  {
    id: 'hist-papal-rise',
    year: 538,
    dateLabel: '538 AD',
    label: 'Papal Supremacy Begins',
    shortLabel: '538 AD',
    desc: 'Justinian\'s decree (534 AD) grants the bishop of Rome supremacy over all churches, and takes full effect in 538 AD when the last of the three opposing Arian kingdoms is subdued. The 1,260-year period of Dan 7:25, Rev 12:6 and Rev 12:14 begins.',
    refs: 'Dan 7:25 · Rev 12:6 · Rev 12:14',
    badge: 'historical',
    tier: 1,
    labelRow: 2,
  },
  {
    id: 'hist-papal-fall',
    year: 1798,
    dateLabel: '1798 AD',
    label: 'Napoleon Captures the Pope',
    shortLabel: '1798 AD',
    desc: 'Exactly 1,260 years after 538 AD, General Berthier enters Rome on Napoleon\'s orders and takes Pope Pius VI prisoner. He dies in French captivity — the "deadly wound" to the beast (Rev 13:3). Secular historians mark this as the end of the medieval papacy\'s political power.',
    refs: 'Rev 13:3 · Dan 7:25 · Rev 12:6',
    badge: 'fulfilled',
    tier: 1,
    labelRow: 3,
  },
  {
    id: 'hist-investigative',
    year: 1844,
    dateLabel: '1844 AD',
    label: 'End of 2,300 Days',
    shortLabel: '1844 AD',
    desc: '2,300 prophetic days (years) from 457 BC ends in 1844 AD — the beginning of the cleansing of the heavenly sanctuary. Christ\'s high-priestly ministry moves into its final phase: the pre-Advent investigative judgment. Dan 8:14 finds its fulfilment not on earth but in heaven.',
    refs: 'Dan 8:14 · Heb 8:1–2 · Rev 14:6–7',
    badge: 'present',
    tier: 1,
    labelRow: 1,
  },
  {
    id: 'hist-today',
    year: 2026,
    dateLabel: 'Today · 2026',
    label: 'We Are Here',
    shortLabel: 'Now',
    desc: 'We live after the 2,300 days have ended, after 1798, after the three angels\' messages began going to the world (Rev 14:6–12). The next great event on the prophetic calendar is the visible, literal, personal return of Christ — not secret, not spiritual, but undeniable.',
    refs: 'Rev 14:6–12 · 1 Thess 4:16–17 · Rev 1:7',
    badge: 'present',
    tier: 1,
    labelRow: 2,
  },
  {
    id: 'hist-second-coming',
    year: 2100,
    dateLabel: 'Future — exact date unknown',
    label: 'Second Coming of Christ',
    shortLabel: 'Return',
    desc: 'The literal, visible, audible return of Jesus Christ. Every eye will see him (Rev 1:7). The righteous dead are resurrected; the living righteous are caught up together with them. No secret rapture — this is the loudest event in history.',
    refs: 'Rev 1:7 · 1 Thess 4:16–17 · Matt 24:30–31',
    badge: 'future',
    tier: 1,
    labelRow: 4,
  },
]

const historicistBands: PeriodBand[] = [
  {
    id: 'band-70-weeks',
    startYear: -457,
    endYear: 34,
    label: '70 Weeks — 490 Years',
    colour: 'rgba(255,185,0,0.22)',
    stroke: '#F5B800',
    bandIndex: 0,
  },
  {
    id: 'band-2300-days',
    startYear: -457,
    endYear: 1844,
    label: '2,300 Days — 2,300 Years',
    colour: 'rgba(0,210,100,0.18)',
    stroke: '#00D264',
    bandIndex: 1,
  },
  {
    id: 'band-1260-years',
    startYear: 538,
    endYear: 1798,
    label: '1,260 Years',
    colour: 'rgba(180,100,255,0.18)',
    stroke: '#B464FF',
    bandIndex: 2,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Futurist / Dispensationalist framework
// ─────────────────────────────────────────────────────────────────────────────

const futuristEvents: TimelineEvent[] = [
  {
    id: 'fut-incarnation',
    year: -4,
    dateLabel: '~4 BC',
    label: 'Incarnation of Christ',
    shortLabel: '4 BC',
    desc: 'The Word becomes flesh. Futurists agree that Christ\'s birth, life, and ministry are foundational — where divergence begins is in how the 70 weeks of Daniel 9 are interpreted. Most futurists see 69 of the 70 weeks as fulfilled by the cross, with the 70th week deferred to the future.',
    refs: 'Luke 2:1–7 · John 1:14',
    badge: 'historical',
    tier: 1,
    labelRow: 2,
  },
  {
    id: 'fut-cross',
    year: 33,
    dateLabel: '~33 AD',
    label: 'Crucifixion & Resurrection',
    shortLabel: '33 AD',
    desc: '69 weeks end at the cross. In the futurist reading, the Messiah is "cut off" here, Israel rejects him, and the prophetic clock stops — creating an indefinite "Church Age" gap. The 70th week is paused and awaits a future fulfilment during a literal 7-year tribulation period.',
    refs: 'Dan 9:26 · Matt 27 · Acts 2',
    badge: 'historical',
    tier: 1,
    labelRow: 4,
  },
  {
    id: 'fut-church-age',
    year: 100,
    dateLabel: 'Church Age (33 AD – present)',
    label: 'Church Age',
    shortLabel: 'Church',
    desc: 'A "parenthesis" in prophecy — not predicted by the Old Testament prophets, according to dispensationalism. God\'s prophetic programme for Israel is paused while he deals with the church. This gap is not found in Daniel 9 itself but is a theological inference.',
    refs: 'Eph 3:1–6 · Rom 11:25',
    badge: 'present',
    tier: 2,
    labelRow: 1,
  },
  {
    id: 'fut-rapture',
    year: 2040,
    dateLabel: 'Future — imminent',
    label: 'Secret Rapture',
    shortLabel: 'Rapture',
    desc: 'The futurist position: Christ returns secretly for the Church, removing believers before the Tribulation begins. This doctrine was first systematised by John Nelson Darby in the 1830s and popularised through the Scofield Reference Bible (1909). It has no direct biblical term.',
    refs: '1 Thess 4:16–17 · John 14:3',
    badge: 'future',
    tier: 1,
    labelRow: 3,
  },
  {
    id: 'fut-tribulation',
    year: 2050,
    dateLabel: 'Future — 7 years',
    label: '7-Year Tribulation',
    shortLabel: '7 yrs',
    desc: 'The deferred 70th week of Daniel — a literal 7-year period of unprecedented global suffering. An individual "Antichrist" (a single end-time person) makes a peace treaty with Israel, breaks it at 3.5 years, sets up an "Abomination of Desolation," and persecutes believers.',
    refs: 'Dan 9:27 · Rev 6–19 · Matt 24:15–21',
    badge: 'future',
    tier: 1,
    labelRow: 1,
  },
  {
    id: 'fut-second-coming',
    year: 2057,
    dateLabel: 'Future — after tribulation',
    label: 'Visible Return of Christ',
    shortLabel: 'Return',
    desc: 'At the end of the 7-year tribulation, Christ returns visibly with his saints to defeat the Antichrist at Armageddon and establish a literal 1,000-year reign in Jerusalem from the rebuilt temple.',
    refs: 'Rev 19:11–21 · Zech 14:4',
    badge: 'future',
    tier: 1,
    labelRow: 5,
  },
  {
    id: 'fut-millennium',
    year: 2070,
    dateLabel: 'Future — 1,000 years on earth',
    label: 'Earthly Millennium',
    shortLabel: 'Millennium',
    desc: 'A literal 1,000-year reign of Christ on earth from Jerusalem. Israel is restored as the central nation. This earthly, political millennium is a key distinctives of dispensational futurism — contrasted with the historicist view of the millennium as in heaven after the Second Coming.',
    refs: 'Rev 20:1–6 · Isa 11:6–9',
    badge: 'future',
    tier: 2,
    labelRow: 2,
  },
]

const futuristBands: PeriodBand[] = [
  {
    id: 'fut-band-church-age',
    startYear: 33,
    endYear: 2038,
    label: 'Church Age (Gap)',
    colour: 'rgba(60,120,220,0.18)',
    stroke: '#5A8EE0',
    bandIndex: 0,
  },
  {
    id: 'fut-band-trib',
    startYear: 2040,
    endYear: 2057,
    label: '7-Year Tribulation',
    colour: 'rgba(220,60,40,0.22)',
    stroke: '#E04030',
    bandIndex: 1,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Preterist framework
// ─────────────────────────────────────────────────────────────────────────────

const preteristEvents: TimelineEvent[] = [
  {
    id: 'pret-incarnation',
    year: -4,
    dateLabel: '~4 BC',
    label: 'Incarnation of Christ',
    shortLabel: '4 BC',
    desc: 'The preterist framework agrees with historicists that Christ\'s life and ministry are the centrepiece of prophecy. Where it diverges is in locating the fulfilment of most New Testament and Daniel prophecies before 70 AD.',
    refs: 'Luke 2:1–7 · John 1:14',
    badge: 'historical',
    tier: 2,
    labelRow: 4,
  },
  {
    id: 'pret-ministry',
    year: 27,
    dateLabel: '27–33 AD',
    label: 'Ministry of Christ',
    shortLabel: '27 AD',
    desc: 'Christ\'s ministry, cross, and resurrection. Preterists see the "great tribulation" as referring to the Roman-Jewish war era, not a future global event. Many prophecies in Matthew 24 are read as warnings to the first-century Jewish generation.',
    refs: 'Matt 24:1–34 · Luke 21:20–24',
    badge: 'historical',
    tier: 1,
    labelRow: 3,
  },
  {
    id: 'pret-cross',
    year: 33,
    dateLabel: '33 AD',
    label: 'Crucifixion — 70th Week',
    shortLabel: '33 AD',
    desc: 'The 70th week ends at (or near) the cross. Unlike futurism, preterism does not defer the 70th week. Unlike historicism, it places the entire 70 weeks in the first century without the day-year principle — treating prophetic years as literal years.',
    refs: 'Dan 9:26–27 · Heb 9:26 · Matt 27',
    badge: 'historical',
    tier: 1,
    labelRow: 1,
  },
  {
    id: 'pret-jewish-war',
    year: 66,
    dateLabel: '66 AD',
    label: 'Jewish War Begins',
    shortLabel: '66 AD',
    desc: 'The Roman-Jewish War (66–73 AD) is the central eschatological event in preterist thinking. Jesus\' warnings in Matthew 24 about "fleeing to the mountains" and "the abomination of desolation" are read as instructions for first-century Christians to escape Jerusalem.',
    refs: 'Matt 24:15–20 · Luke 21:20–21',
    badge: 'historical',
    tier: 1,
    labelRow: 4,
  },
  {
    id: 'pret-jerusalem',
    year: 70,
    dateLabel: '70 AD',
    label: 'Jerusalem Destroyed',
    shortLabel: '70 AD',
    desc: 'General Titus destroys Jerusalem and the Temple. Preterists see this as the primary fulfilment of Daniel\'s "abomination of desolation," Matthew 24, Revelation 6–18, and much of the Old Testament prophetic literature. The "great tribulation" is this event, now past.',
    refs: 'Dan 9:26 · Luke 21:22–24 · Rev 1:1',
    badge: 'fulfilled',
    tier: 1,
    labelRow: 2,
  },
  {
    id: 'pret-now',
    year: 2026,
    dateLabel: 'Today · 2026',
    label: 'Kingdom Established',
    shortLabel: 'Now',
    desc: 'In the preterist view, the Kingdom of God was fully inaugurated after 70 AD. Most prophecy is now in the past. The Church\'s calling is to disciple nations and build God\'s kingdom on earth. Partial preterism still anticipates a future Second Coming and resurrection.',
    refs: 'Matt 28:18–20 · Rev 11:15',
    badge: 'present',
    tier: 1,
    labelRow: 2,
  },
]

const preteristBands: PeriodBand[] = [
  {
    id: 'pret-band-70weeks',
    startYear: -457,
    endYear: 33,
    label: '70 Weeks (literal years)',
    colour: 'rgba(220,160,60,0.20)',
    stroke: '#D4A040',
    bandIndex: 0,
  },
  {
    id: 'pret-band-fulfil',
    startYear: 33,
    endYear: 70,
    label: 'Fulfilment Window',
    colour: 'rgba(180,100,255,0.18)',
    stroke: '#B464FF',
    bandIndex: 1,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Exported framework objects
// ─────────────────────────────────────────────────────────────────────────────

export const historicistFramework: FrameworkData = {
  id: 'historicist',
  label: 'Historicist',
  primaryColour: '#1a3d2b',
  accentColour: '#e8a020',
  events: historicistEvents,
  bands: historicistBands,
}

export const futuristFramework: FrameworkData = {
  id: 'futurist',
  label: 'Futurist',
  primaryColour: '#1a2e5c',
  accentColour: '#c0392b',
  events: futuristEvents,
  bands: futuristBands,
}

export const preteristFramework: FrameworkData = {
  id: 'preterist',
  label: 'Preterist',
  primaryColour: '#5c3a1a',
  accentColour: '#b07d3a',
  events: preteristEvents,
  bands: preteristBands,
}

export const ALL_FRAMEWORKS: FrameworkData[] = [
  historicistFramework,
  futuristFramework,
  preteristFramework,
]
