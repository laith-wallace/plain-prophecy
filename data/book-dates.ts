// Approximate authorship dates for all 66 KJV Bible books.
// Used by the "How Did They Know?" hover stat on the /connections page.
// Dates are approximate midpoints of scholarly consensus ranges.

export interface BookDate {
  writtenBc: number | null  // BC date (positive number) or null
  writtenAd: number | null  // AD date or null
}

export const BOOK_DATES: Record<string, BookDate> = {
  // ── Old Testament ─────────────────────────────────────────────────────────
  Gen:    { writtenBc: 1400, writtenAd: null },
  Exod:   { writtenBc: 1400, writtenAd: null },
  Lev:    { writtenBc: 1400, writtenAd: null },
  Num:    { writtenBc: 1400, writtenAd: null },
  Deut:   { writtenBc: 1400, writtenAd: null },
  Josh:   { writtenBc: 1380, writtenAd: null },
  Judg:   { writtenBc: 1050, writtenAd: null },
  Ruth:   { writtenBc: 1000, writtenAd: null },
  '1Sam': { writtenBc: 930,  writtenAd: null },
  '2Sam': { writtenBc: 930,  writtenAd: null },
  '1Kgs': { writtenBc: 550,  writtenAd: null },
  '2Kgs': { writtenBc: 550,  writtenAd: null },
  '1Chr': { writtenBc: 430,  writtenAd: null },
  '2Chr': { writtenBc: 430,  writtenAd: null },
  Ezra:   { writtenBc: 430,  writtenAd: null },
  Neh:    { writtenBc: 430,  writtenAd: null },
  Esth:   { writtenBc: 470,  writtenAd: null },
  Job:    { writtenBc: 2000, writtenAd: null }, // patriarchal era (events); composition debated
  Ps:     { writtenBc: 1000, writtenAd: null }, // primarily Davidic era
  Prov:   { writtenBc: 950,  writtenAd: null },
  Eccl:   { writtenBc: 940,  writtenAd: null },
  Song:   { writtenBc: 960,  writtenAd: null },
  Isa:    { writtenBc: 700,  writtenAd: null },
  Jer:    { writtenBc: 600,  writtenAd: null },
  Lam:    { writtenBc: 586,  writtenAd: null },
  Ezek:   { writtenBc: 590,  writtenAd: null },
  Dan:    { writtenBc: 550,  writtenAd: null },
  Hos:    { writtenBc: 750,  writtenAd: null },
  Joel:   { writtenBc: 830,  writtenAd: null },
  Amos:   { writtenBc: 760,  writtenAd: null },
  Obad:   { writtenBc: 840,  writtenAd: null },
  Jonah:  { writtenBc: 760,  writtenAd: null },
  Mic:    { writtenBc: 700,  writtenAd: null },
  Nah:    { writtenBc: 660,  writtenAd: null },
  Hab:    { writtenBc: 610,  writtenAd: null },
  Zeph:   { writtenBc: 625,  writtenAd: null },
  Hag:    { writtenBc: 520,  writtenAd: null },
  Zech:   { writtenBc: 520,  writtenAd: null },
  Mal:    { writtenBc: 430,  writtenAd: null },
  // ── New Testament ─────────────────────────────────────────────────────────
  Matt:   { writtenBc: null, writtenAd: 60  },
  Mark:   { writtenBc: null, writtenAd: 50  },
  Luke:   { writtenBc: null, writtenAd: 60  },
  John:   { writtenBc: null, writtenAd: 90  },
  Acts:   { writtenBc: null, writtenAd: 62  },
  Rom:    { writtenBc: null, writtenAd: 57  },
  '1Cor': { writtenBc: null, writtenAd: 55  },
  '2Cor': { writtenBc: null, writtenAd: 56  },
  Gal:    { writtenBc: null, writtenAd: 49  },
  Eph:    { writtenBc: null, writtenAd: 62  },
  Phil:   { writtenBc: null, writtenAd: 62  },
  Col:    { writtenBc: null, writtenAd: 62  },
  '1Thess': { writtenBc: null, writtenAd: 51 },
  '2Thess': { writtenBc: null, writtenAd: 51 },
  '1Tim': { writtenBc: null, writtenAd: 63  },
  '2Tim': { writtenBc: null, writtenAd: 67  },
  Titus:  { writtenBc: null, writtenAd: 64  },
  Phlm:   { writtenBc: null, writtenAd: 62  },
  Heb:    { writtenBc: null, writtenAd: 68  },
  Jas:    { writtenBc: null, writtenAd: 49  },
  '1Pet': { writtenBc: null, writtenAd: 64  },
  '2Pet': { writtenBc: null, writtenAd: 67  },
  '1John': { writtenBc: null, writtenAd: 90 },
  '2John': { writtenBc: null, writtenAd: 90 },
  '3John': { writtenBc: null, writtenAd: 90 },
  Jude:   { writtenBc: null, writtenAd: 65  },
  Rev:    { writtenBc: null, writtenAd: 95  },
}

/**
 * Calculate the approximate gap in years between two books' authorship dates.
 * Returns absolute difference.
 */
export function gapYears(fromAbbr: string, toAbbr: string): number {
  const from = BOOK_DATES[fromAbbr]
  const to = BOOK_DATES[toAbbr]
  if (!from || !to) return 0
  const fromYear = from.writtenAd != null ? from.writtenAd : -(from.writtenBc!)
  const toYear = to.writtenAd != null ? to.writtenAd : -(to.writtenBc!)
  return Math.abs(toYear - fromYear)
}

/**
 * Only show the time gap badge if the gap is >= 100 years.
 * Sub-century connections within the same period are too approximate to be meaningful.
 */
export function shouldShowGap(gap: number): boolean {
  return gap >= 100
}

/**
 * Format a book's date for display.
 * e.g. "~550 BC" or "~AD 95"
 */
export function formatBookDate(abbr: string): string {
  const d = BOOK_DATES[abbr]
  if (!d) return ''
  if (d.writtenBc != null) return `~${d.writtenBc} BC`
  if (d.writtenAd != null) return `~AD ${d.writtenAd}`
  return ''
}
