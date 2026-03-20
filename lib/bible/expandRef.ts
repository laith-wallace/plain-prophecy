/**
 * Maps common Bible book abbreviations and alternate spellings to the full
 * book name in the format that bible-api.com expects (lowercase, with spaces
 * replaced by "+" when used in a URL).
 *
 * Coverage: all 66 canonical books + common abbreviations found in the data.
 */
export const BOOK_ABBREVIATIONS: Record<string, string> = {
  // Genesis
  gen: "genesis", ge: "genesis",
  // Exodus
  ex: "exodus", exo: "exodus", exod: "exodus",
  // Leviticus
  lev: "leviticus", le: "leviticus",
  // Numbers
  num: "numbers", nu: "numbers", nb: "numbers",
  // Deuteronomy
  deut: "deuteronomy", deu: "deuteronomy", dt: "deuteronomy",
  // Joshua
  josh: "joshua", jos: "joshua",
  // Judges
  judg: "judges", jdg: "judges",
  // Ruth
  ruth: "ruth", ru: "ruth",
  // 1 Samuel
  "1 sam": "1 samuel", "1sam": "1 samuel", "1sa": "1 samuel",
  // 2 Samuel
  "2 sam": "2 samuel", "2sam": "2 samuel", "2sa": "2 samuel",
  // 1 Kings
  "1 kgs": "1 kings", "1kgs": "1 kings", "1 ki": "1 kings", "1ki": "1 kings",
  // 2 Kings
  "2 kgs": "2 kings", "2kgs": "2 kings", "2 ki": "2 kings", "2ki": "2 kings",
  // 1 Chronicles
  "1 chr": "1 chronicles", "1chr": "1 chronicles", "1 chron": "1 chronicles",
  // 2 Chronicles
  "2 chr": "2 chronicles", "2chr": "2 chronicles", "2 chron": "2 chronicles",
  // Ezra
  ezra: "ezra", ezr: "ezra",
  // Nehemiah
  neh: "nehemiah", ne: "nehemiah",
  // Esther
  est: "esther", esth: "esther",
  // Job
  job: "job",
  // Psalms
  ps: "psalms", psa: "psalms", psm: "psalms", pss: "psalms", psalm: "psalms",
  // Proverbs
  prov: "proverbs", pro: "proverbs", prv: "proverbs",
  // Ecclesiastes
  eccl: "ecclesiastes", ecc: "ecclesiastes", qoh: "ecclesiastes",
  // Song of Solomon
  "song": "song of solomon", "sos": "song of solomon", "ss": "song of solomon",
  "song of songs": "song of solomon",
  // Isaiah
  isa: "isaiah", is: "isaiah",
  // Jeremiah
  jer: "jeremiah", je: "jeremiah",
  // Lamentations
  lam: "lamentations", la: "lamentations",
  // Ezekiel
  ezek: "ezekiel", eze: "ezekiel", ezk: "ezekiel",
  // Daniel
  dan: "daniel", da: "daniel", dn: "daniel",
  // Hosea
  hos: "hosea", ho: "hosea",
  // Joel
  joel: "joel", jl: "joel",
  // Amos
  amos: "amos", am: "amos",
  // Obadiah
  obad: "obadiah", ob: "obadiah",
  // Jonah
  jon: "jonah",
  // Micah
  mic: "micah", mi: "micah",
  // Nahum
  nah: "nahum", na: "nahum",
  // Habakkuk
  hab: "habakkuk",
  // Zephaniah
  zeph: "zephaniah", zep: "zephaniah",
  // Haggai
  hag: "haggai",
  // Zechariah
  zech: "zechariah", zec: "zechariah",
  // Malachi
  mal: "malachi",
  // Matthew
  matt: "matthew", mat: "matthew", mt: "matthew",
  // Mark
  mark: "mark", mk: "mark",
  // Luke
  luke: "luke", lk: "luke",
  // John
  john: "john", jn: "john",
  // Acts
  acts: "acts", ac: "acts",
  // Romans
  rom: "romans", ro: "romans",
  // 1 Corinthians
  "1 cor": "1 corinthians", "1cor": "1 corinthians", "1co": "1 corinthians",
  // 2 Corinthians
  "2 cor": "2 corinthians", "2cor": "2 corinthians", "2co": "2 corinthians",
  // Galatians
  gal: "galatians", ga: "galatians",
  // Ephesians
  eph: "ephesians",
  // Philippians
  phil: "philippians", php: "philippians",
  // Colossians
  col: "colossians",
  // 1 Thessalonians
  "1 thess": "1 thessalonians", "1thess": "1 thessalonians", "1th": "1 thessalonians",
  "1 thes": "1 thessalonians", "1thes": "1 thessalonians",
  // 2 Thessalonians
  "2 thess": "2 thessalonians", "2thess": "2 thessalonians", "2th": "2 thessalonians",
  "2 thes": "2 thessalonians", "2thes": "2 thessalonians",
  // 1 Timothy
  "1 tim": "1 timothy", "1tim": "1 timothy", "1ti": "1 timothy",
  // 2 Timothy
  "2 tim": "2 timothy", "2tim": "2 timothy", "2ti": "2 timothy",
  // Titus
  tit: "titus", ti: "titus",
  // Philemon
  phlm: "philemon", phm: "philemon",
  // Hebrews
  heb: "hebrews", he: "hebrews",
  // James
  jas: "james", jm: "james",
  // 1 Peter
  "1 pet": "1 peter", "1pet": "1 peter", "1pe": "1 peter",
  // 2 Peter
  "2 pet": "2 peter", "2pet": "2 peter", "2pe": "2 peter",
  // 1 John
  "1 john": "1 john", "1jn": "1 john", "1jo": "1 john",
  // 2 John
  "2 john": "2 john", "2jn": "2 john", "2jo": "2 john",
  // 3 John
  "3 john": "3 john", "3jn": "3 john", "3jo": "3 john",
  // Jude
  jude: "jude", jud: "jude",
  // Revelation
  rev: "revelation", re: "revelation", rv: "revelation",
}

/**
 * Normalise a raw scripture reference string into the URL path segment
 * that bible-api.com expects.
 *
 * Examples:
 *   "Dan 7:25"        → "daniel+7:25"
 *   "Daniel 2:31–45"  → "daniel+2:31-45"
 *   "Dan 8:3, 20"     → "daniel+8:3"   (comma-separated → first verse only)
 *   "Rev 12:6"        → "revelation+12:6"
 *   "1 Thess 4:16"    → "1+thessalonians+4:16"
 */
export function expandRef(raw: string): string {
  // Strip trailing period, trim whitespace
  let s = raw.trim().replace(/\.$/, "")

  // For comma-separated non-contiguous verses (e.g. "Dan 8:3, 20"),
  // use only the first reference
  if (s.includes(",")) {
    s = s.split(",")[0].trim()
  }

  // Replace en-dash and em-dash with regular hyphen for range refs
  s = s.replace(/[–—]/g, "-")

  // Split into book portion and chapter:verse portion
  // Handles: "Dan 7:25", "Daniel 7:25", "1 Thess 4:16", "1John 1:1"
  // Strategy: the chapter:verse part starts at the first digit that is
  // followed by a colon (or is the last standalone number group).
  const chapterVerseMatch = s.match(/^(.*?)\s+(\d+[:.]\d+.*)$/)
  if (!chapterVerseMatch) {
    // Fallback: URL-encode the whole string with + for spaces
    return s.toLowerCase().replace(/\s+/g, "+")
  }

  const bookPart = chapterVerseMatch[1].trim().toLowerCase()
  const chapterVersePart = chapterVerseMatch[2].replace(/\s/g, "")

  // Look up the book abbreviation; fall back to the raw book part (lowercased)
  const expanded = BOOK_ABBREVIATIONS[bookPart] ?? bookPart

  // Replace spaces in the (potentially multi-word) book name with "+"
  const bookSlug = expanded.replace(/\s+/g, "+")

  return `${bookSlug}+${chapterVersePart}`
}
