/**
 * scripts/process-cross-refs.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * One-time build script: downloads the OpenBible.info cross-reference TSV,
 * normalises verse references to integer indices (0 = Gen 1:1, 31101 = Rev 22:21),
 * and writes public/data/cross-references.json.
 *
 * Run: npx tsx scripts/process-cross-refs.ts
 * After running, commit public/data/cross-references.json — do not add to prebuild.
 *
 * Source: https://openbible.info/labs/cross-references/
 * Dataset: TSV with columns: from_verse  to_verse  votes
 * License: Creative Commons Attribution 4.0
 */

import * as fs from 'fs'
import * as path from 'path'

// ── Canonical KJV verse counts per chapter ──────────────────────────────────
// Indexed by book order (0 = Genesis, 65 = Revelation).
// Each sub-array contains verse counts per chapter for that book.
const KJV_CHAPTER_VERSES: number[][] = [
  // 0: Genesis (50 ch)
  [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,43,54,38,34,34,28,34,31,22,33,26],
  // 1: Exodus (40 ch)
  [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
  // 2: Leviticus (27 ch)
  [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,24,16,30,20,31,31,21,45,43],
  // 3: Numbers (36 ch)
  [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],
  // 4: Deuteronomy (34 ch)
  [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],
  // 5: Joshua (24 ch)
  [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
  // 6: Judges (21 ch)
  [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
  // 7: Ruth (4 ch)
  [22,23,18,22],
  // 8: 1 Samuel (31 ch)
  [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],
  // 9: 2 Samuel (24 ch)
  [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],
  // 10: 1 Kings (22 ch)
  [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],
  // 11: 2 Kings (25 ch)
  [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],
  // 12: 1 Chronicles (29 ch)
  [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],
  // 13: 2 Chronicles (36 ch)
  [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],
  // 14: Ezra (10 ch)
  [11,70,13,24,17,22,28,36,15,44],
  // 15: Nehemiah (13 ch)
  [11,20,32,23,19,19,73,18,38,39,36,47,31],
  // 16: Esther (10 ch)
  [22,23,15,17,14,14,10,17,32,3],
  // 17: Job (42 ch)
  [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],
  // 18: Psalms (150 ch)
  [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,20,28,22,35,22,46,18,9,11,68,13,18,24,9,17,21,4,43,11,24,8,23,16,19,5,21,25,13,30,19,14,22,7,26,18,10,22,18,13,17,18,20,42,5,10,21,22,8,22,6,6,21,23,16,10,23,5,17,13,30,11,22,9,18,23,25,12,14,26,30,21,22,12,26,6,22,9,19,22,8,30,21,9,34,12,14,21,32,6,12,22,20,12,26,22,6,14,20,35,27,6,8,17,21,22,17,8,12,10,6,5,12,10,22,13,22,22,8,22,10,22,22,22,14,6,22,18,22,22,6,22,20,18,22,10,22,18,22,8,22,22,22,4,22,8,22,22,22,22,22,11,3,4],
  // 19: Proverbs (31 ch)
  [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],
  // 20: Ecclesiastes (12 ch)
  [18,26,22,16,20,12,29,17,18,20,10,14],
  // 21: Song of Solomon (8 ch)
  [17,17,11,16,16,13,13,14],
  // 22: Isaiah (66 ch)
  [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],
  // 23: Jeremiah (52 ch)
  [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
  // 24: Lamentations (5 ch)
  [22,22,66,22,22],
  // 25: Ezekiel (48 ch)
  [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],
  // 26: Daniel (12 ch)
  [21,49,30,37,31,28,28,27,27,21,45,13],
  // 27: Hosea (14 ch)
  [11,23,5,19,15,11,16,14,17,15,12,14,16,9],
  // 28: Joel (3 ch)
  [20,32,21],
  // 29: Amos (9 ch)
  [15,16,15,13,27,14,17,14,15],
  // 30: Obadiah (1 ch)
  [21],
  // 31: Jonah (4 ch)
  [17,10,10,11],
  // 32: Micah (7 ch)
  [16,13,12,13,15,16,20],
  // 33: Nahum (3 ch)
  [15,13,19],
  // 34: Habakkuk (3 ch)
  [17,20,19],
  // 35: Zephaniah (3 ch)
  [18,15,20],
  // 36: Haggai (2 ch)
  [15,23],
  // 37: Zechariah (14 ch)
  [21,13,10,14,11,15,14,23,17,12,17,14,9,21],
  // 38: Malachi (4 ch)
  [14,17,18,6],
  // 39: Matthew (28 ch)
  [25,23,17,25,48,34,29,34,38,42,45,27,31,32,29,23,21,50,36,26,20,64,46,37,31,16,34,26],
  // 40: Mark (16 ch)
  [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],
  // 41: Luke (24 ch)
  [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],
  // 42: John (21 ch)
  [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],
  // 43: Acts (28 ch)
  [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
  // 44: Romans (16 ch)
  [32,29,31,25,21,23,25,39,33,21,36,21,14,26,33,24],
  // 45: 1 Corinthians (16 ch)
  [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],
  // 46: 2 Corinthians (13 ch)
  [24,17,18,18,21,18,16,24,15,18,33,21,14],
  // 47: Galatians (6 ch)
  [24,21,29,31,26,18],
  // 48: Ephesians (6 ch)
  [23,22,21,28,30,31],
  // 49: Philippians (4 ch)
  [30,30,21,23],
  // 50: Colossians (4 ch)
  [29,23,25,18],
  // 51: 1 Thessalonians (5 ch)
  [10,20,13,18,28],
  // 52: 2 Thessalonians (3 ch)
  [12,17,18],
  // 53: 1 Timothy (6 ch)
  [20,15,16,16,25,21],
  // 54: 2 Timothy (4 ch)
  [18,26,17,22],
  // 55: Titus (3 ch)
  [16,15,15],
  // 56: Philemon (1 ch)
  [25],
  // 57: Hebrews (13 ch)
  [14,18,19,16,14,20,28,13,28,39,40,29,25],
  // 58: James (5 ch)
  [27,26,18,17,20],
  // 59: 1 Peter (5 ch)
  [25,25,22,19,14],
  // 60: 2 Peter (3 ch)
  [21,22,18],
  // 61: 1 John (5 ch)
  [10,29,24,21,21],
  // 62: 2 John (1 ch)
  [13],
  // 63: 3 John (1 ch)
  [14],
  // 64: Jude (1 ch)
  [25],
  // 65: Revelation (22 ch)
  [20,29,36,13,14,25,52,30,24,16,27,33,13,21,16,18,24,21,31,19,28,18],
]

// OSIS book abbreviation → book index mapping
const OSIS_TO_INDEX: Record<string, number> = {
  Gen:0, Exod:1, Lev:2, Num:3, Deut:4, Josh:5, Judg:6, Ruth:7,
  '1Sam':8, '2Sam':9, '1Kgs':10, '2Kgs':11, '1Chr':12, '2Chr':13,
  Ezra:14, Neh:15, Esth:16, Job:17, Ps:18, Prov:19, Eccl:20, Song:21,
  Isa:22, Jer:23, Lam:24, Ezek:25, Dan:26, Hos:27, Joel:28, Amos:29,
  Obad:30, Jonah:31, Mic:32, Nah:33, Hab:34, Zeph:35, Hag:36, Zech:37, Mal:38,
  Matt:39, Mark:40, Luke:41, John:42, Acts:43, Rom:44,
  '1Cor':45, '2Cor':46, Gal:47, Eph:48, Phil:49, Col:50,
  '1Thess':51, '2Thess':52, '1Tim':53, '2Tim':54, Titus:55, Phlm:56,
  Heb:57, Jas:58, '1Pet':59, '2Pet':60, '1John':61, '2John':62, '3John':63,
  Jude:64, Rev:65,
}

const BOOK_NAMES = [
  'Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth',
  '1 Samuel','2 Samuel','1 Kings','2 Kings','1 Chronicles','2 Chronicles',
  'Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon',
  'Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos',
  'Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi',
  'Matthew','Mark','Luke','John','Acts','Romans',
  '1 Corinthians','2 Corinthians','Galatians','Ephesians','Philippians','Colossians',
  '1 Thessalonians','2 Thessalonians','1 Timothy','2 Timothy','Titus','Philemon',
  'Hebrews','James','1 Peter','2 Peter','1 John','2 John','3 John','Jude','Revelation',
]

const BOOK_ABBRS = [
  'Gen','Exod','Lev','Num','Deut','Josh','Judg','Ruth',
  '1Sam','2Sam','1Kgs','2Kgs','1Chr','2Chr','Ezra','Neh','Esth','Job',
  'Ps','Prov','Eccl','Song','Isa','Jer','Lam','Ezek','Dan',
  'Hos','Joel','Amos','Obad','Jonah','Mic','Nah','Hab','Zeph','Hag','Zech','Mal',
  'Matt','Mark','Luke','John','Acts','Rom','1Cor','2Cor','Gal','Eph','Phil','Col',
  '1Thess','2Thess','1Tim','2Tim','Titus','Phlm','Heb','Jas','1Pet','2Pet',
  '1John','2John','3John','Jude','Rev',
]

const TESTAMENT: ('OT' | 'NT')[] = [
  ...Array(39).fill('OT'), ...Array(27).fill('NT'),
]

// ── Build verse index lookup ─────────────────────────────────────────────────

interface ChapterEntry {
  book: number
  chapter: number
  verseCount: number
  chapterStart: number
  verseStart: number
}

interface BookEntry {
  name: string
  abbr: string
  chapters: number
  verseStart: number
  verseEnd: number
  chapterStart: number
  testament: 'OT' | 'NT'
  totalVerses: number
}

function buildMetadata() {
  const books: BookEntry[] = []
  const chapters: ChapterEntry[] = []

  let cumulativeVerses = 0
  let cumulativeChapters = 0

  for (let b = 0; b < 66; b++) {
    const chVerses = KJV_CHAPTER_VERSES[b]
    const bookVerseStart = cumulativeVerses
    const bookChapterStart = cumulativeChapters

    for (let c = 0; c < chVerses.length; c++) {
      chapters.push({
        book: b,
        chapter: c + 1,
        verseCount: chVerses[c],
        chapterStart: cumulativeChapters,
        verseStart: cumulativeVerses,
      })
      cumulativeVerses += chVerses[c]
      cumulativeChapters++
    }

    const bookTotalVerses = chVerses.reduce((a, v) => a + v, 0)

    books.push({
      name: BOOK_NAMES[b],
      abbr: BOOK_ABBRS[b],
      chapters: chVerses.length,
      verseStart: bookVerseStart,
      verseEnd: bookVerseStart + bookTotalVerses - 1,
      chapterStart: bookChapterStart,
      testament: TESTAMENT[b],
      totalVerses: bookTotalVerses,
    })
  }

  return { books, chapters, totalVerses: cumulativeVerses, totalChapters: cumulativeChapters }
}

// Build a fast OSIS reference → verse index map
function buildVerseIndexMap(
  books: BookEntry[],
  chapters: ChapterEntry[]
): Map<string, number> {
  const map = new Map<string, number>()
  for (const ch of chapters) {
    const bookAbbr = BOOK_ABBRS[ch.book]
    for (let v = 1; v <= ch.verseCount; v++) {
      const osis = `${bookAbbr}.${ch.chapter}.${v}`
      map.set(osis, ch.verseStart + v - 1)
    }
  }
  return map
}

// ── Parse OSIS reference ─────────────────────────────────────────────────────
function parseOsisRef(ref: string): { bookAbbr: string; chapter: number; verse: number } | null {
  // Format: "Gen.1.1" or "1Sam.1.1"
  const parts = ref.split('.')
  if (parts.length < 3) return null
  const verse = parseInt(parts[parts.length - 1])
  const chapter = parseInt(parts[parts.length - 2])
  const bookAbbr = parts.slice(0, parts.length - 2).join('.')
  if (isNaN(verse) || isNaN(chapter)) return null
  return { bookAbbr, chapter, verse }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Building metadata...')
  const { books, chapters, totalVerses, totalChapters } = buildMetadata()
  console.log(`  Books: ${books.length}, Chapters: ${totalChapters}, Total verses: ${totalVerses}`)

  if (totalVerses !== 31102) {
    console.warn(`⚠️  Expected 31,102 verses, got ${totalVerses}. Verse counts may need adjustment.`)
  }

  const verseIndexMap = buildVerseIndexMap(books, chapters)

  console.log('Fetching cross-reference data from OpenBible.info...')
  const url = 'https://a.openbible.info/data/cross-references.zip'
  let tsvText: string

  try {
    const resp = await fetch(url)
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const arrayBuf = await resp.arrayBuffer()
    console.log(`  Fetched ${(arrayBuf.byteLength / 1024).toFixed(0)} KB (zip)`)

    // Unzip — the zip contains a single .txt file with TSV data
    const { execSync } = await import('child_process')
    const tmpDir = path.join(process.cwd(), '.tmp-crossrefs')
    fs.mkdirSync(tmpDir, { recursive: true })
    const zipPath = path.join(tmpDir, 'cross-references.zip')
    fs.writeFileSync(zipPath, Buffer.from(arrayBuf))
    execSync(`unzip -o "${zipPath}" -d "${tmpDir}"`, { stdio: 'pipe' })

    // Find the extracted file
    const extracted = fs.readdirSync(tmpDir).filter(f => f.endsWith('.txt') || f.endsWith('.tsv'))
    if (extracted.length === 0) {
      throw new Error('No .txt or .tsv file found in zip')
    }
    tsvText = fs.readFileSync(path.join(tmpDir, extracted[0]), 'utf-8')
    console.log(`  Extracted: ${extracted[0]} (${(tsvText.length / 1024).toFixed(0)} KB)`)

    // Cleanup
    fs.rmSync(tmpDir, { recursive: true, force: true })
  } catch (err) {
    console.error('Failed to fetch cross-reference data:', err)
    console.error('Please check your internet connection and the URL.')
    process.exit(1)
  }

  console.log('Parsing TSV...')
  const lines = tsvText.split('\n').filter(Boolean)
  // Skip header line if present
  const dataLines = lines[0].startsWith('From') || lines[0].startsWith('from') ? lines.slice(1) : lines

  const refs: [number, number, number][] = []
  let skipped = 0

  for (const line of dataLines) {
    const parts = line.split('\t')
    if (parts.length < 3) continue

    const fromOsis = parts[0].trim()
    const toOsis = parts[1].trim()
    const votes = parseInt(parts[2].trim()) || 1

    const fromIndex = verseIndexMap.get(fromOsis)
    const toIndex = verseIndexMap.get(toOsis)

    if (fromIndex === undefined || toIndex === undefined) {
      skipped++
      if (skipped <= 10) {
        console.warn(`  Skipping unresolved ref: ${fromOsis} → ${toOsis}`)
      }
      continue
    }

    refs.push([fromIndex, toIndex, votes])
  }

  console.log(`  Parsed: ${refs.length} connections (skipped ${skipped} unresolved)`)

  if (refs.length < 60000) {
    console.warn(`⚠️  Expected ~63,779 refs, got ${refs.length}. Check the data source.`)
  }

  // ── Write output ────────────────────────────────────────────────────────
  const output = { refs, books, chapters }
  const outputPath = path.join(process.cwd(), 'public', 'data', 'cross-references.json')

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(output))

  const fileSize = fs.statSync(outputPath).size
  console.log(`\n✅ Written: ${outputPath}`)
  console.log(`   Size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   Connections: ${refs.length.toLocaleString()}`)
  console.log(`   Books: ${books.length}`)
  console.log(`   Chapters: ${chapters.length}`)
  console.log(`\n   Verse 0 = ${books[0].abbr} 1:1 (Genesis 1:1)`)
  console.log(`   Verse ${totalVerses - 1} = ${books[65].abbr} ${chapters[chapters.length-1].chapter}:${chapters[chapters.length-1].verseCount} (Rev 22:${chapters[chapters.length-1].verseCount})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
