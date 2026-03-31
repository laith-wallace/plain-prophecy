# PRD — Bible Connections Visualiser
**Feature Name:** The Web of Scripture  
**Route:** `/connections`  
**Project:** Plain Prophecy (plainprophecy.com)  
**Version:** 1.0  
**Date:** March 2026  
**Author:** Laith Wallace  

---

## BEFORE YOU WRITE A SINGLE LINE OF CODE

Read the following files in this exact order:

1. `CLAUDE.md` — absorb the design system tokens, voice, and theological framework
2. `app/page.tsx` — understand the existing page layout pattern
3. `components/` — catalogue what UI primitives already exist before building new ones
4. `tailwind.config.ts` — confirm all colour tokens before using any value
5. `data/` — understand how existing JSON data files are structured

Do not assume. Verify every token, every import path, every component API against the actual source files before writing code.

---

## Overview

The Web of Scripture is an interactive visualisation of all 63,779 cross-references in the Bible. It lives at `/connections` and serves as the most compelling entry point on the entire site — a visual argument that the Bible is a single, unified, Christ-centred text written by 40 authors over 1,500 years.

This is not a data dashboard. It is an invitation to explore. Every interaction should feel like discovery, not study. The user arrives curious and leaves with a question they want to answer — ideally one that leads them into the Studies section.

The original visualisation was created by **Chris Harrison** (Carnegie Mellon University) and **Pastor Christoph Römhild** in 2007. The underlying cross-reference dataset is public domain, sourced primarily from the **Treasury of Scripture Knowledge** and available at `https://openbible.info/labs/cross-references/`.

---

## Design System — Non-Negotiable

All styling must use the Plain Prophecy public site design system. Do not use the admin shell's stone/amber tokens here.

```
Background:     #08080F
Primary gold:   #C9A84C
Gold highlight: #F0D080
Text primary:   #F5F5F0
Text secondary: #9A9A8A
Display font:   Cinzel (headings, labels)
Body font:      Inter
Star-field:     radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)
```

The visual centrepiece should feel like a cosmic artefact — as if someone pulled back the curtain on the night sky and the arcs between the stars turned out to be scripture references.

---

## Data Architecture

### Step 1 — Fetch and process the dataset

Download the cross-reference data from OpenBible.info and process it into a compressed JSON file at build time. Store as `public/data/cross-references.json.gz`.

The dataset contains rows of: `from_verse`, `to_verse`, `votes` (confidence score).

Normalise verse references to an integer index (0–31,101) using standard chapter/verse counts per book. Store as:

```ts
// public/data/cross-references.json
{
  "refs": [
    [fromIndex: number, toIndex: number, votes: number],
    // ... 63,779 entries
  ],
  "books": [
    { "name": "Genesis", "abbr": "Gen", "chapters": 50, "verseStart": 0, "verseEnd": 1532, "testament": "OT" },
    // ... 66 books
  ],
  "chapters": [
    { "book": 0, "chapter": 1, "verseCount": 31, "chapterStart": 0 },
    // ... 1,189 chapters
  ]
}
```

This enables O(1) lookups from any verse to its book/chapter metadata.

Load lazily on the client — do not bundle this with the page JS. Use a `useEffect` + `fetch` with a loading state.

### Step 2 — Verse-to-position mapping

Each of the 1,189 Bible chapters maps to a horizontal position on the canvas. The x-position of a chapter is proportional to its cumulative verse count. This preserves Harrison's original genius: the bar graph at the bottom IS the timeline of the Bible.

```ts
const chapterXPosition = (chapterIndex: number): number => {
  return (chapters[chapterIndex].chapterStart / TOTAL_VERSES) * CANVAS_WIDTH
}
```

### Step 3 — Arc colour logic

Each arc is coloured by the proportional distance between its two chapters:

```ts
const arcColour = (fromChapter: number, toChapter: number): string => {
  const distance = Math.abs(fromChapter - toChapter) / TOTAL_CHAPTERS
  // Short arcs = blue/violet (#6366F1 → #8B5CF6)
  // Medium arcs = green/teal (#10B981 → #06B6D4)
  // Long arcs = gold/amber (#C9A84C → #F0D080)
  // Full span (Genesis ↔ Revelation) = pure white (#FFFFFF)
}
```

The colour ramp from violet → teal → gold → white replicates Harrison's rainbow effect while harmonising with the Plain Prophecy palette.

---

## Rendering Architecture

**Critical decision:** 63,779 arcs cannot be rendered in SVG or as DOM elements. Use HTML5 Canvas for the visualisation layer with a React wrapper.

### Canvas layer (CanvasRenderer.ts)

A TypeScript class, not a React component. Responsible for:
- Initialising the canvas with `devicePixelRatio` scaling for retina displays
- Rendering all arcs in a single `requestAnimationFrame` loop
- Managing a dirty-flag system so only changed arcs trigger a re-render
- Exposing a `setFilter(filter: FilterState)` method that dims irrelevant arcs and brightens relevant ones
- Exposing a `hitTest(x: number, y: number): ArcHit | null` for hover detection

Use `OffscreenCanvas` for the base render (all arcs at low opacity), composited onto the main canvas. This means hovering/filtering only needs to repaint the highlight layer, not re-render all 63k arcs.

### React wrapper (ScriptureWeb.tsx)

Wraps the canvas and manages:
- Data loading state
- Active filter/mode state
- Tooltip positioning
- Side panel open/close
- Keyboard navigation

---

## Page Structure — `/connections`

```
<ConnectionsPage>
  ├── <PageHeader />                    ← "The Web of Scripture" — Cinzel display, brief intro
  ├── <ModeSelector />                  ← 5 filter modes (see below)
  ├── <CanvasContainer>
  │   ├── <ScriptureWebCanvas />        ← The main visualisation
  │   ├── <BookLabels />                ← Book names beneath the chapter bars
  │   ├── <TestamentDivider />          ← OT | NT line at Malachi/Matthew boundary
  │   └── <HoverTooltip />             ← Appears on arc hover
  ├── <DiscoveryPanel />               ← Slides in from the right on verse/arc click
  ├── <GuidedPathsDrawer />            ← Opens from bottom on "Explore Paths" click
  └── <ConnectionStats />              ← Animated counter: "63,779 connections. One story."
```

---

## Feature 1 — The Base Visualisation

### Behaviour

On page load:
1. Show the `ConnectionStats` counter animating up to 63,779 with a Framer Motion count-up
2. Lazy-load the cross-reference JSON (show skeleton state during load)
3. Render all arcs at 15% opacity — this is the "full web" resting state
4. Render the chapter bar graph at the bottom in alternating `#1A1A2E` / `#0F0F1A`
5. Book names sit beneath their respective chapter groups in Cinzel, 9px, `#9A9A8A`
6. The OT/NT boundary line glows gold `#C9A84C`

### Hover state

When the user hovers anywhere on the canvas:
- `hitTest()` finds the nearest arc within 6px
- That arc brightens to 100% opacity in its colour
- All other arcs dim to 8% opacity
- The `HoverTooltip` appears showing:
  - From verse reference (book chapter:verse)
  - To verse reference
  - Time gap badge (see Feature 5)

### Click state

Clicking an arc opens the `DiscoveryPanel` with the full connection detail.

---

## Feature 2 — Bible Interprets Bible Mode

**Toggle label:** "Scripture Links"  
**Icon:** Two overlapping circles (Lucide `link-2`)

### Behaviour

A verse search input appears at the top of the ModeSelector area. The user types any verse reference (e.g. "Daniel 7:13" or "Rev 1:7").

On submit:
1. Find all arcs where `fromVerse` or `toVerse` matches the input
2. Animate: all non-matching arcs fade to 4% opacity over 400ms
3. Matching arcs animate in sequentially (staggered 8ms each) from 0 → 100% opacity
4. Each arc animates its draw from the selected verse outward (arc grows from one end)
5. The count badge updates: "47 connections found"

If the verse has connections spanning both testaments, a subtle banner appears:
> "This verse speaks across both Testaments — written centuries apart."

### Verse search autocomplete

As the user types, show a dropdown of matching verse references using a simple prefix search against the books/chapters array. Keyboard navigable.

---

## Feature 3 — The Christ Thread

**Toggle label:** "Christ Thread"  
**Icon:** Gold cross / crown (custom SVG, not Lucide)  
**Visual:** All matching arcs render in `#F0D080` gold, pulsing softly (0.8s ease-in-out opacity 60%→100%)

### What constitutes the Christ Thread

Precompute a curated set of messianic connections and store in `data/christ-thread.json`. This is not algorithmic — it requires theological curation. Include:

**Direct Messianic Prophecies → NT Fulfilment:**
- Genesis 3:15 → Revelation 12:17
- Psalm 22:1–18 (all verses) → Matthew 27, Luke 23, John 19
- Isaiah 7:14 → Matthew 1:23
- Isaiah 9:6–7 → Luke 1:32–33
- Isaiah 53 (all verses) → Multiple NT
- Daniel 7:13–14 → Matthew 24:30, Revelation 1:7, 14:14
- Daniel 9:24–27 → Luke 3:1, John 12:12–13
- Micah 5:2 → Matthew 2:6
- Zechariah 9:9 → Matthew 21:5
- Zechariah 11:12–13 → Matthew 27:9
- Malachi 3:1 → Mark 1:2

**Typological Shadows → Substance:**
- Genesis 22 (Isaac) → Hebrews 11:17–19, John 3:16
- Exodus 12 (Passover Lamb) → 1 Corinthians 5:7, John 1:29
- Numbers 21:8–9 (Bronze Serpent) → John 3:14–15
- Leviticus 16 (Day of Atonement) → Hebrews 9
- Joshua 5:15 (Rahab's scarlet cord) → Hebrews 11:31, James 2:25
- Jonah 1:17 → Matthew 12:40
- 2 Samuel 7:12–16 (Davidic Covenant) → Luke 1:32–33, Acts 2:30

**Store format:**
```json
// data/christ-thread.json
{
  "connections": [
    {
      "from": "Dan.9.25",
      "to": "Luk.3.1",
      "label": "The 70 Weeks → Baptism of Jesus",
      "gap_years": 483,
      "type": "prophecy_fulfilment"
    }
  ]
}
```

### Visual treatment

When Christ Thread mode is active:
1. All non-Christ-Thread arcs fade to 3% opacity (near invisible)
2. Christ Thread arcs render gold `#F0D080` with a soft glow filter (`filter: blur(1px) brightness(1.4)`)
3. A pulsing animation draws attention: arcs breathe from 70% → 100% opacity on a 2s staggered cycle
4. The canvas background subtly shifts to show a radial gold glow from the centre

A fixed banner beneath the canvas reads:
> *"Every shadow has a substance. Every type has an antitype. Every arc points home."*  — in Cinzel italic, `#C9A84C`

---

## Feature 4 — Prophecy Highway Mode

**Toggle label:** "Prophecy Highway"  
**Icon:** Lucide `map` or `route`

### What is the Prophecy Highway

The prophetic books form a spine through the Bible. Highlight only the connections between the following book clusters:

**Prophetic Core books:**
- OT: Isaiah, Jeremiah, Ezekiel, Daniel, Zechariah, Malachi, Psalms (selected), Genesis 1–12
- NT: Matthew 24, Mark 13, Luke 21, Revelation (all), Hebrews, 1–2 Peter

Filter to arcs where **both endpoints** fall within Prophetic Core books.

### Visual treatment

- Non-highway arcs: 3% opacity
- Highway arcs: rendered slightly thicker (1.5px vs 0.8px default), colour preserved from distance ramp
- A faint dotted trail animates along the strongest arcs (those with `votes > 10`) — like a signal travelling through a circuit

### Callout badge

A badge appears at the Daniel ↔ Revelation region of the canvas:
> "Daniel and Revelation share 38% of all cross-prophetic connections"

(Verify this stat against the actual data before shipping.)

---

## Feature 5 — "How Did They Know?" Hover Stats

This feature enhances **every** arc hover, not just specific modes.

When hovering an arc, the `HoverTooltip` shows:

```
┌─────────────────────────────────────────┐
│  Daniel 7:13                            │
│  ↕  Revelation 1:7                      │
│                                         │
│  📅  Written ~550 BC  →  Written ~AD 95  │
│  ⏳  645 years between authors           │
│                                         │
│  [View Connection →]                    │
└─────────────────────────────────────────┘
```

**Date data:**
Store approximate authorship dates in `data/book-dates.json`:

```json
{
  "Dan": { "written_bc": 550, "written_ad": null },
  "Rev": { "written_bc": null, "written_ad": 95 },
  "Isa": { "written_bc": 700, "written_ad": null },
  "Mat": { "written_bc": null, "written_ad": 60 }
}
```

**Gap calculation:**
```ts
const gapYears = (fromBook: string, toBook: string): number => {
  const from = bookDates[fromBook]
  const to = bookDates[toBook]
  const fromYear = from.written_ad ?? -(from.written_bc!)
  const toYear = to.written_ad ?? -(to.written_bc!)
  return Math.abs(toYear - fromYear)
}
```

**Display rule:** Only show the gap badge if `gapYears >= 100`. Sub-century connections within the same testament period show only the verse references.

---

## Feature 6 — Guided Discovery Paths

**Entry point:** A "Start a Journey" button in the page header, and a persistent bottom drawer handle.

### The 6 curated paths

Store in `data/discovery-paths.json`. Each path is a sequence of 4–8 highlighted connections that the user steps through one at a time.

```json
{
  "paths": [
    {
      "id": "covenant-thread",
      "title": "The Covenant Thread",
      "description": "From Abraham to the cross — one unbroken promise.",
      "duration_minutes": 4,
      "steps": [
        {
          "step": 1,
          "from": "Gen.12.1",
          "to": "Gal.3.8",
          "caption": "God makes a promise to Abraham. Paul says the Gospel was preached to Abraham in advance.",
          "highlight_books": ["Gen", "Gal"]
        }
      ]
    },
    {
      "id": "sanctuary-thread",
      "title": "The Sanctuary Unveiled",
      "description": "The tabernacle wasn't furniture — it was a blueprint of heaven.",
      "duration_minutes": 5,
      "steps": [...]
    },
    {
      "id": "70-weeks",
      "title": "The 70 Weeks Trail",
      "description": "One prophecy. One date. One fulfilment. The most precise prophecy in Scripture.",
      "duration_minutes": 6,
      "steps": [...]
    },
    {
      "id": "daniel-revelation",
      "title": "Daniel Meets Revelation",
      "description": "Two books. 600 years apart. Telling the same story.",
      "duration_minutes": 5,
      "steps": [...]
    },
    {
      "id": "christ-thread-path",
      "title": "The Christ Thread",
      "description": "Every shadow. Every type. Every arc. Follow them home.",
      "duration_minutes": 7,
      "steps": [...]
    },
    {
      "id": "remnant",
      "title": "The Remnant Story",
      "description": "There has always been a faithful remnant. From Elijah to Revelation 12.",
      "duration_minutes": 4,
      "steps": [...]
    }
  ]
}
```

### Path UX

When a path is active:
1. The `GuidedPathsDrawer` slides up from the bottom (60vh height, dismissible)
2. The canvas highlights only the arcs for the current step
3. The caption appears in the drawer in Inter, 16px
4. A progress bar shows step X of N
5. "Next →" and "← Back" buttons advance through steps
6. The canvas camera (scroll/zoom) animates to keep the highlighted arc centred
7. On path completion: a subtle celebration animation (gold particles from the highlighted arcs) + a CTA to the related Study:
   > "Ready to go deeper? Start the 70 Weeks study →"

---

## Feature 7 — Study Challenge Integration

**Requires:** The existing XP/gamification infrastructure. Read the existing gamification hooks/context before implementing.

### Challenge types

Three types of challenges trigger from the Connections page:

**Type A — Find It**
> "Daniel 9:25 connects to a Gospel passage about Jesus entering Jerusalem. Which verse?"
The user must click the correct arc within 3 attempts. Correct answer: Zechariah 9:9 → Matthew 21:5.

**Type B — Count It**
> "How many arcs connect Daniel 7 to the book of Revelation?"
The user submits a number. Within ±3 of the correct answer = correct.

**Type C — Name It**
> "The verse with the most cross-references in the entire Bible is ___."
Multiple choice. (Answer: Isaiah 53 / Psalm 22.)

### Implementation

Store challenges in `data/connection-challenges.json`. Render via a `<ChallengeModal />` component that:
- Appears after 90 seconds of engagement (not immediately — let them explore first)
- Or triggers when the user clicks a "Challenge Me" button in the header
- Awards XP via the existing `useXP()` hook (or equivalent — check actual hook name in codebase)
- Shows a brief "Correct!" animation using Framer Motion before dismissing

Do not block the visualisation with the challenge. It appears as an overlay with a clear dismiss option.

---

## Feature 8 — Book DNA Fingerprint

**Entry point:** Click any book label in the chapter bar graph.

### Behaviour

Clicking "Daniel" (for example):
1. All arcs dim to 4%
2. Only arcs where **one endpoint is in Daniel** animate in
3. The `DiscoveryPanel` slides open showing:
   - Book name in Cinzel display
   - Total connection count
   - Most connected book (e.g. "Daniel connects most strongly with Revelation — 847 shared arcs")
   - A mini arc diagram (200px wide) showing just this book's fingerprint
   - A breakdown: % of arcs are intra-OT, % cross-testament, % point to NT
   - The top 5 most-connected specific verses with their verse text

```tsx
// DiscoveryPanel content for Book DNA mode
<BookDNA
  book="Daniel"
  totalConnections={2847}
  strongestLink={{ book: "Revelation", count: 847 }}
  crossTestamentPercent={62}
  topVerses={[
    { ref: "Dan 7:13", connections: 34, text: "...one like a Son of Man..." },
    ...
  ]}
/>
```

### Design

The mini arc diagram inside the panel uses a scaled-down canvas (200×80px) rendering only the selected book's arcs. This is a separate lightweight canvas, not the main one.

---

## Feature 9 — Shareable Connection Cards

**Entry point:** The `DiscoveryPanel` shows a "Share this connection" button for any single arc detail view.

### Card design

A 1080×1080 canvas (Instagram format) rendered client-side using an offscreen canvas:

```
┌─────────────────────────────────────────┐
│           [Plain Prophecy wordmark]      │
│                                         │
│   ✦  Daniel 9:25                        │
│       ↕  645 years  ↕                   │
│   ✦  Luke 3:1                           │
│                                         │
│   "Know and understand this: From the  │
│    issuing of the decree... until the  │
│    Anointed One comes."                │
│                               Dan 9:25  │
│                                         │
│   Written ~550 BC · Fulfilled ~AD 27    │
│                                         │
│        plainprophecy.com/connections    │
└─────────────────────────────────────────┘
```

- Background: `#08080F` with a subtle gold radial glow
- Verse text in Cinzel italic, 18px
- Reference in gold `#C9A84C`
- Time gap badge prominent

Trigger the download via `canvas.toBlob()` → `URL.createObjectURL()` → `<a download>`.

---

## Component Tree

```
app/connections/
├── page.tsx                          ← Server component, metadata, layout
├── ConnectionsClient.tsx             ← 'use client' wrapper, data loading
├── components/
│   ├── ScriptureWebCanvas.tsx        ← Canvas React wrapper
│   ├── CanvasRenderer.ts             ← Pure TS class, no React
│   ├── ModeSelector.tsx              ← 5 mode toggle tabs
│   ├── HoverTooltip.tsx              ← Positioned tooltip on arc hover
│   ├── DiscoveryPanel.tsx            ← Slide-in right panel
│   ├── BookDNA.tsx                   ← Content inside DiscoveryPanel for book view
│   ├── ConnectionDetail.tsx          ← Content inside DiscoveryPanel for arc view
│   ├── GuidedPathsDrawer.tsx         ← Bottom drawer for curated paths
│   ├── PathStep.tsx                  ← Individual step card inside drawer
│   ├── ChallengeModal.tsx            ← Study challenge overlay
│   ├── ConnectionStats.tsx           ← Animated counter hero
│   ├── VerseSearch.tsx               ← Autocomplete verse input
│   └── ShareCard.tsx                 ← Offscreen canvas card generator
data/
├── cross-references.json             ← Processed 63k refs (generated at build)
├── christ-thread.json                ← Curated messianic connections
├── discovery-paths.json              ← 6 guided learning paths
├── connection-challenges.json        ← Study challenge questions
├── book-dates.json                   ← Authorship date ranges per book
└── book-metadata.json                ← Name, abbr, testament, chapter/verse counts
scripts/
└── process-cross-refs.ts             ← Build script to download + process OpenBible data
```

---

## Page Layout & Responsive Behaviour

### Desktop (≥1024px)
- Full-width canvas at 100vw, 60vh height
- ModeSelector sits above the canvas as a tab row
- DiscoveryPanel slides in from the right as a 380px overlay (not pushing content)
- GuidedPathsDrawer occupies 50vh from the bottom
- Chapter bar graph is fully legible

### Tablet (768–1023px)
- Canvas height drops to 45vh
- Book labels hidden — show only on hover
- ModeSelector scrolls horizontally
- DiscoveryPanel becomes a bottom sheet (100vw, 60vh)

### Mobile (<768px)
- Canvas height: 35vh
- Book labels hidden entirely
- Chapter bar graph still visible at reduced resolution
- Touch to select an arc (no hover) — tap opens DiscoveryPanel
- Guided Paths take priority on mobile — show "Start a Path" as the primary CTA above the canvas
- Share card generation still works

---

## Animation Spec

All animations use **Framer Motion** (already in the stack). Canvas animations use `requestAnimationFrame`.

| Interaction | Animation | Duration | Easing |
|---|---|---|---|
| Page load — stats counter | Count up 0 → 63,779 | 2000ms | easeOut |
| Data loaded — arc reveal | Arcs fade in from 0% opacity, staggered left→right | 1200ms total | easeInOut |
| Mode switch | Non-relevant arcs fade out | 400ms | easeOut |
| Mode switch | Relevant arcs fade in | 600ms | easeIn |
| Hover arc | Target arc brightens, others dim | 150ms | linear |
| DiscoveryPanel open | Slide in from right, 380px | 300ms | spring(stiffness:300, damping:30) |
| GuidedPathsDrawer | Slide up from bottom | 350ms | spring(stiffness:280, damping:32) |
| Path step advance | Canvas arc transitions | 500ms | easeInOut |
| Christ Thread pulse | Arc opacity 70% → 100% | 2000ms | sinusoidal, infinite |
| Challenge correct | Gold particle burst | 800ms | easeOut then decay |
| Share card | Fade in, scale 0.9 → 1.0 | 250ms | spring |

---

## Performance Requirements

- Initial page load (before data): < 1.5s
- Data fetch + parse: complete within 3s on 3G
- Canvas render (63k arcs at base state): < 100ms after data loaded
- Mode switch filter: < 16ms (single frame) using dirty-flag system
- Hover hitTest: < 2ms using spatial index (pre-build a simple grid index at data load time)
- Memory: canvas + data < 80MB heap on mobile Chrome
- Smooth 60fps on all interactions

**Canvas performance rules:**
- Never call `clearRect` + full redraw on hover — use the two-layer composite approach
- Pre-compute all arc `Path2D` objects once at data load time
- Store arc geometry as `Float32Array` for memory efficiency
- Batch colour changes using `globalAlpha` layering rather than per-arc `strokeStyle` changes

---

## Accessibility

- The visualisation itself is decorative — wrap in `aria-hidden="true"`
- Provide a `<table>` alternative accessible via a "View as table" toggle (hidden by default, shown to screen readers)
- The table lists: From Book | From Chapter:Verse | To Book | To Chapter:Verse | Type
- ModeSelector tabs are fully keyboard navigable (`role="tablist"`)
- DiscoveryPanel is focus-trapped when open (`focus-trap` pattern)
- All tooltips are announced via `aria-live="polite"`
- Colour is never the only differentiator (arc thickness also varies by mode)

---

## SEO & Metadata

```tsx
// app/connections/page.tsx
export const metadata = {
  title: "The Web of Scripture — 63,779 Bible Cross-References | Plain Prophecy",
  description: "Visualise every connection in the Bible. 63,779 cross-references. 40 authors. 1,500 years. One story.",
  openGraph: {
    title: "The Web of Scripture",
    description: "Every connection in the Bible, visualised.",
    images: [{ url: "/og/connections.png", width: 1200, height: 630 }]
  }
}
```

Generate an OG image (`public/og/connections.png`) using a static render of the base visualisation with the title overlaid. This can be a pre-rendered PNG exported from the canvas at build time.

---

## Do Not

- **Do not use SVG for the arcs.** 63,779 SVG elements will freeze the browser.
- **Do not render all arcs at full opacity** in the base state — the image becomes illegible.
- **Do not load the full cross-reference JSON in the page bundle.** Fetch it lazily.
- **Do not hardcode colour values** — use the CSS variables and Tailwind tokens from the design system.
- **Do not add new database tables or Convex mutations** for this feature. All data is static JSON files.
- **Do not install new libraries without justification.** D3 may be used for scale utilities only — do not use it for DOM rendering (Canvas only).
- **Do not use the admin design system tokens** (stone/amber) anywhere on this page.
- **Do not present futurist or preterist interpretations** in any tooltip, caption, or panel content.
- **Do not fabricate cross-reference data.** Use only the OpenBible.info dataset and the curated `christ-thread.json`.
- **Do not make the Christ Thread connections algorithm-only.** The theological curation in `christ-thread.json` is the source of truth.
- **Do not show the Challenge Modal in the first 90 seconds** of a user session.
- **Do not block the visualisation** — all panels, modals, and drawers must have clear dismiss actions.
- **Do not call `npx convex deploy`** — this feature requires no schema changes.

---

## Build Script

Create `scripts/process-cross-refs.ts` to run at build time:

```ts
// Fetches https://openbible.info/labs/cross-references/
// Parses the TSV: from_verse \t to_verse \t votes
// Normalises to integer verse indices
// Writes public/data/cross-references.json
// Logs total count for verification
```

Run via `package.json` scripts:
```json
"prebuild": "ts-node scripts/process-cross-refs.ts"
```

---

## Verification Checklist

Before marking this feature complete, verify every item:

**Data**
- [ ] `cross-references.json` contains exactly 63,779 entries (log and assert count)
- [ ] All 66 books are present in `book-metadata.json`
- [ ] All 1,189 chapters are present in the chapters array
- [ ] Verse index 0 = Genesis 1:1, verse index 31,101 = Revelation 22:21
- [ ] `book-dates.json` covers all 66 books
- [ ] `christ-thread.json` contains at minimum the 18 connections listed in Feature 3

**Rendering**
- [ ] Canvas renders at correct devicePixelRatio on retina displays (no blur)
- [ ] All 63,779 arcs render without browser freezing (test on low-end Android)
- [ ] Hover hitTest returns correct arc within 6px tolerance
- [ ] Two-layer composite approach is working (base layer + highlight layer)
- [ ] OT/NT boundary renders at correct x-position (after Malachi, before Matthew)

**Features**
- [ ] Bible Interprets Bible mode filters correctly to only arcs touching the searched verse
- [ ] Christ Thread mode shows only curated connections, not algorithmic
- [ ] Prophecy Highway mode shows only connections between Prophetic Core books
- [ ] "How Did They Know?" gap displays correctly (no gap shown for same-century connections)
- [ ] All 6 Guided Paths step through correctly and canvas follows each step
- [ ] Study Challenge awards XP via existing gamification hook
- [ ] Book DNA panel shows correct connection count per book
- [ ] Share card generates correctly as 1080×1080 PNG download

**Design**
- [ ] All colours match the Plain Prophecy public site design system exactly
- [ ] No stone/amber admin tokens present anywhere on this page
- [ ] Cinzel used for all display labels; Inter for all body text
- [ ] Framer Motion animations match the spec durations and easings
- [ ] Canvas background matches `#08080F`

**Responsive**
- [ ] Desktop layout correct (canvas 60vh, DiscoveryPanel side overlay)
- [ ] Tablet layout correct (canvas 45vh, DiscoveryPanel bottom sheet)
- [ ] Mobile layout correct (canvas 35vh, touch-to-select working)

**Accessibility**
- [ ] Canvas wrapped in `aria-hidden="true"`
- [ ] Table fallback renders correctly with correct data
- [ ] ModeSelector tabs keyboard navigable
- [ ] DiscoveryPanel focus-trapped when open

**Performance**
- [ ] Canvas render < 100ms after data loaded (measure in DevTools Performance panel)
- [ ] Hover response < 16ms (no frame drops on hover)
- [ ] Data fetch complete < 3s on throttled 3G (DevTools network throttling)
- [ ] Heap memory < 80MB after full render (DevTools Memory panel)

---

## Success Criteria

This feature succeeds if:

1. A 17-year-old who has never studied the Bible opens `/connections`, spends at least 3 minutes exploring without being prompted, and clicks through to at least one Study.
2. The Christ Thread filter produces an emotional response — the moment you turn it on, the argument is self-evident.
3. The "How Did They Know?" stat on a Genesis → Revelation arc creates a moment of genuine wonder.
4. At least one path completion leads to a Study session start (trackable via existing analytics).
5. The Share Card gets used organically — people post it without being told to.

---

*This is the most ambitious single page on the site. It is the visual argument for everything Plain Prophecy exists to say. Build it accordingly.*
