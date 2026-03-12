# Feature Specification: Studies Page — Card & List View
**Project**: Plain Prophecy  
**Version**: 1.0  
**Stack**: Next.js 15 (App Router) · Tailwind v4 · shadcn/ui · Convex · TypeScript  
**Scope**: `app/learn/` — index page + individual study pages + shared resource tabs

---

## Overview

Redesign the Studies index page (`app/learn/page.tsx`) from a static list into an immersive, swipeable card experience inspired by health/discovery apps. Users can toggle between a **Card View** (swipeable, full-bleed cards with flip interaction) and a **List View** (compact scannable rows). Both views link into individual study pages that carry the same resource tabs (Listen, Links, Downloads).

---

## User Story

> As a young person discovering biblical prophecy for the first time, I want to browse available studies in a visually engaging way, preview what each one covers before committing, and quickly find videos, links, and downloads related to that study — so that I can go as deep as I want without feeling overwhelmed.

---

## Acceptance Criteria

- [ ] Studies index page renders a toggle between Card View and List View
- [ ] Card View renders full-screen swipeable cards (one at a time, with peek of next card)
- [ ] Each card shows: image, download count badge, title, biblical chapter badge, short description
- [ ] Tapping a card triggers a **flip animation** revealing the card back
- [ ] Card back shows: tabs (Listen · Links · Downloads) with content + a CTA button to the full study page
- [ ] List View shows all studies as compact rows with the same data in a scrollable list
- [ ] Each individual study page (`app/learn/[slug]/page.tsx`) has the same three tabs (Listen · Links · Downloads) with its study-specific resources
- [ ] All study resource data (YouTube links, podcast URLs, download files, external links) is stored in Convex (or JSON in `/data/`) — not hardcoded in components
- [ ] Fully responsive — card view fills mobile screen, adapts gracefully on tablet/desktop
- [ ] Keyboard navigable (arrow keys to move between cards, Escape to unflip)

---

## Page: Studies Index (`app/learn/page.tsx`)

### Layout Structure

```
┌─────────────────────────────────┐
│  Studies          [≡] [⊞]       │  ← Title + View Toggle (list / card)
├─────────────────────────────────┤
│                                 │
│   [   CARD VIEW or LIST VIEW  ] │
│                                 │
└─────────────────────────────────┘
```

### View Toggle

- Two icon buttons in the top-right of the page header: grid icon (card view) and list icon (list view)
- Active state: filled icon, slightly higher opacity
- Default view: **Card View** on mobile, **List View** on desktop (use `useMediaQuery` or CSS)
- Persist preference in `localStorage` key `"pp-studies-view"`

---

## Card View

### Card Deck Behaviour

- One card is active and centred in the viewport
- The next card peeks from the right edge (~30px visible), scaled down slightly (0.95)
- Cards are navigated by:
  - **Swipe left/right** (touch and pointer drag, same physics as the existing `ProphetClient` swipe mechanic)
  - **Left/Right arrow keys**
  - Dot indicators at the bottom showing position
- No "fulfilled / not sure" mechanic here — this is pure navigation, not a quiz

### Card Front

```
┌──────────────────────────────────┐
│  [↓ 1,240]  [Updated]           │  ← badges: download count + optional "New" tag
│                                  │
│        [BEAUTIFUL IMAGE]         │  ← full-bleed illustrative image (see Image Spec)
│                                  │
│  Daniel's Dream          [Dan 2] │  ← title left, chapter badge right
│  The statue that maps            │
│  4000 years of history.          │  ← 1–2 line description
│                                  │
│         Tap to explore →         │  ← subtle hint, bottom-centre
└──────────────────────────────────┘
```

**Card front fields:**
| Field | Source | Notes |
|---|---|---|
| `image` | `/public/studies/[slug].png` or CDN URL | Full-bleed, object-cover |
| `downloadCount` | Convex `studies` table | Formatted: 1200 → "1.2k" |
| `isNew` | Convex `studies.isNew` boolean | Show "New" badge if true |
| `title` | Convex `studies.title` | e.g. "Daniel's Dream" |
| `chapterBadge` | Convex `studies.reference` | e.g. "Dan 2", "Rev 12" |
| `description` | Convex `studies.shortDescription` | Max 100 chars |
| `cardColor` | Convex `studies.accentColor` | Hex, used as card bg tint |

**Card colour palette** (one per study, consistent with the dark cosmic aesthetic):
- Daniel 2 → deep indigo `#1a1040`
- Daniel 7 → dark crimson `#2d0f0f`
- Daniel 8 → dark teal `#0f2d2d`
- Daniel 9 → deep gold-black `#2d2000`
- Daniel 12 → near-black purple `#1a0a2d`
- Revelation studies → vary by chapter

---

### Card Flip Interaction

**Trigger:** Tap/click anywhere on the card front  
**Animation:** CSS `rotateY(180deg)` on a 3D-transformed card container  
- Duration: `400ms`  
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`  
- The front fades out as it rotates, the back fades in from the reverse side  
- Use `backface-visibility: hidden` on both faces  
- Unflip: tap the back, or press `Escape`

**Card Back Layout:**

```
┌──────────────────────────────────┐
│  ✕                               │  ← close/unflip button
│                                  │
│  Daniel's Dream       [Dan 2]    │  ← title + chapter badge
│  ─────────────────────────────   │
│  [Listen]  [Links]  [Downloads]  │  ← tab bar
│  ─────────────────────────────   │
│                                  │
│  TAB CONTENT AREA                │  ← scrollable
│  (videos, links, or downloads)   │
│                                  │
│  ─────────────────────────────   │
│  [ Go to Full Study →          ] │  ← primary CTA → /learn/[slug]
└──────────────────────────────────┘
```

---

## Resource Tabs (shared component)

Used on both the **card back** and the **individual study page**.

Build as a single reusable component: `<StudyResourceTabs studyId={id} />`

### Tab: Listen

Shows a list of audio/video resources. Each item:
```
┌────────────────────────────────┐
│  [Thumbnail]  Dr. Rhonda…      │  ← name/channel
│               Podcast · 42min  │  ← type + duration
│                          [→]   │  ← opens external link
└────────────────────────────────┘
```

Fields per item:
| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "Understanding Daniel's 70 Weeks" |
| `creator` | string | e.g. "3ABN", "Doug Batchelor" |
| `type` | `"youtube" \| "podcast" \| "video"` | Determines icon |
| `url` | string | External URL |
| `thumbnailUrl` | string | YouTube thumbnail or custom |
| `durationMinutes` | number | Optional |
| `disclaimer` | string | "For educational purposes only; no endorsement implied" — show once at top of tab |

### Tab: Links

A list of external reference links. Each item:
```
┌────────────────────────────────┐
│  [🔗]  Amazing Facts Study     │
│        amazingfacts.org  [→]   │
└────────────────────────────────┘
```

Fields per item:
| Field | Type | Notes |
|---|---|---|
| `label` | string | e.g. "Amazing Facts Study Guide" |
| `url` | string | External URL |
| `domain` | string | Auto-extracted from URL for display |
| `type` | `"article" \| "study-guide" \| "commentary"` | Optional tag |

### Tab: Downloads

A list of downloadable PDFs/resources:
```
┌────────────────────────────────┐
│  [📄]  Daniel 2 Study Worksheet│
│        PDF · 2.4 MB     [↓]   │
└────────────────────────────────┘
```

Fields per item:
| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "Daniel 2 Study Worksheet" |
| `fileUrl` | string | Stored in `/public/downloads/` or CDN |
| `fileType` | `"pdf" \| "docx"` | |
| `fileSizeMb` | number | e.g. 2.4 |

---

## List View

Simple, scrollable — for users who prefer to scan.

```
┌────────────────────────────────────┐
│  [img]  Daniel's Dream    [Dan 2]  │
│         The statue that maps…  [↓1.2k] │
├────────────────────────────────────┤
│  [img]  Four Beasts       [Dan 7]  │
│         Four kingdoms rise…   [↓890] │
```

- Image: 56×56px rounded square
- On tap: go directly to `/learn/[slug]` (no flip in list view)
- Show a small "New" badge on the right if applicable
- Sort order: canonical biblical order (Daniel before Revelation, ascending chapter)

---

## Individual Study Page (`app/learn/[slug]/page.tsx`)

### Existing behaviour to preserve
Keep the existing Notion-style content layout (MDX article body, side nav of all studies).

### What to add
Below the study title and intro paragraph, add a `<StudyResourceTabs studyId={study._id} />` component — the same shared component used on the card back, pulling resources from the same Convex data.

The tabs sit between the study intro and the main article body, so users can grab resources before or after reading.

---

## Data Schema (Convex)

### `studies` table (extend existing if present)

```typescript
defineTable({
  // Existing fields
  slug: v.string(),
  title: v.string(),
  shortDescription: v.string(),
  reference: v.string(),         // "Dan 2", "Rev 12"
  number: v.number(),            // canonical sort order
  published: v.boolean(),

  // New fields
  accentColor: v.string(),       // hex, card bg tint
  image: v.string(),             // path or CDN URL
  downloadCount: v.number(),     // total downloads tracked
  isNew: v.optional(v.boolean()),
})
```

### `studyResources` table (new)

```typescript
defineTable({
  studyId: v.id("studies"),
  type: v.union(
    v.literal("listen"),
    v.literal("link"),
    v.literal("download")
  ),
  // Listen fields
  title: v.optional(v.string()),
  creator: v.optional(v.string()),
  mediaType: v.optional(v.union(v.literal("youtube"), v.literal("podcast"), v.literal("video"))),
  url: v.optional(v.string()),
  thumbnailUrl: v.optional(v.string()),
  durationMinutes: v.optional(v.number()),
  // Link fields
  label: v.optional(v.string()),
  domain: v.optional(v.string()),
  linkType: v.optional(v.string()),
  // Download fields
  fileUrl: v.optional(v.string()),
  fileType: v.optional(v.string()),
  fileSizeMb: v.optional(v.number()),
  // Shared
  sortOrder: v.optional(v.number()),
})
```

If Convex isn't available at build time, seed this data as JSON in `/data/studyResources.ts` and import it as a fallback.

---

## File Structure

```
app/
└── learn/
    ├── page.tsx                    ← UPDATE: add view toggle + card/list view
    └── [slug]/
        └── page.tsx                ← UPDATE: add StudyResourceTabs above article body

components/
└── studies/
    ├── StudiesViewToggle.tsx       ← NEW: card/list toggle buttons
    ├── StudyCardDeck.tsx           ← NEW: swipe deck container
    ├── StudyCard.tsx               ← NEW: individual card with flip mechanic
    ├── StudyCardFront.tsx          ← NEW: front face
    ├── StudyCardBack.tsx           ← NEW: back face with tabs
    ├── StudyListView.tsx           ← NEW: list view component
    └── StudyResourceTabs.tsx       ← NEW: shared Listen/Links/Downloads tabs

data/
└── studyResources.ts               ← NEW: seed data (fallback if no Convex)
```

---

## Interaction & Animation Specifications

| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| Card flip | Tap card front | `rotateY(0 → 180deg)` | 400ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Card unflip | Tap back / Escape | `rotateY(180 → 0deg)` | 400ms | same |
| Card swipe dismiss | Drag > 80px | Slide off screen + fade | 250ms | ease-out |
| Card snap-back | Drag < 80px | Return to centre | 300ms | spring (stiffness 200, damping 20) |
| View toggle | Click toggle | Cross-fade between views | 200ms | ease |
| Tab switch | Click tab | Slide content left/right | 150ms | ease |
| List item hover | Hover | Background opacity 0 → 0.08 | 100ms | ease |

**Card tilt on drag** (same spec as ProphetClient):
- Peak tilt of 13° reached at 20% of drag distance
- Rotation = `clamp(-13, delta / (screenWidth * 0.2) * 13, 13)` degrees
- Release: ease-out curve finishing from drag-release position
- Bounce proportional to release velocity (if released at 30% drag → subtle bounce; 80%+ → fly off)

---

## UI States

| State | Card View | List View |
|---|---|---|
| Loading | Skeleton card with pulse animation | Skeleton rows |
| Empty | "No studies published yet" centred message | Same |
| Error | "Couldn't load studies" + retry button | Same |
| No resources in tab | "Coming soon — check back shortly" | N/A |

---

## Responsive Behaviour

| Breakpoint | Card View | List View |
|---|---|---|
| Mobile < 768px | Full-width cards, single column | Full-width list |
| Tablet 768–1024px | Cards at 70% width, centred | Two-column list |
| Desktop > 1024px | Default to list view; card view at 400px width, centred | Three-column grid |

---

## Styling Notes (Tailwind v4 + design system)

- Card background: `accentColor` from data, with a radial gradient overlay towards black at the bottom
- Card corner radius: `rounded-3xl` (24px)
- Card shadow: `shadow-2xl` + subtle inner glow matching `accentColor` at 30% opacity
- Badge style: `rounded-full bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-0.5`
- Chapter badge: `rounded-full bg-white/20 text-white font-semibold text-xs px-3 py-1`
- Tab active state: white text + bottom border `border-b-2 border-white`
- Tab inactive: `text-white/50`, no border
- CTA button: full-width, `bg-white text-black font-semibold rounded-2xl py-3` (high contrast on dark card)
- Download count icon: use a person/user icon (consistent with the Longevity Deck pattern shown in reference images)

---

## Accessibility

- Card deck: `role="region"` with `aria-label="Study cards"`, arrow key navigation, announce current card with `aria-live="polite"`
- Card flip: `aria-expanded` on the card, `aria-label="Flip card to see more"`
- Close button on card back: `aria-label="Close card details"`
- Tabs: use `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected`
- External links: always `target="_blank" rel="noopener noreferrer"` with a visually hidden "opens in new tab" label
- All images: meaningful `alt` text (e.g. "Illustration of the statue from Daniel's dream")

---

## Out of Scope (v1)

- User-generated comments or community reviews on studies (defer to v2)
- Study completion tracking or progress indicators
- Search/filter within studies
- Sharing individual studies to social
- Offline download of study content

---

## Open Questions

- [ ] Are the study images pre-existing or do they need to be created? If creating, should they be AI-generated illustrations or commissioned art?
- [ ] Should download count be real (tracked via Convex mutation on PDF download) or seeded as static numbers to start?
- [ ] Is there a Convex schema already in place for `studies`? If so, share the current schema before extending.
- [ ] Who curates the Listen/Links/Downloads resources — is this an admin panel task or manually added via Convex dashboard for now?
- [ ] Should the card view be the default on all screen sizes, or only mobile?
