# Christ-Centred Prophecy Site — Build Plan

## Vision

A rigorous, accessible, Christ-centred biblical prophecy resource for any
sincere Christian. Every prophetic period anchors to _who Jesus is_ — not
geopolitics, fear, or denominational recruitment.

**Target audience:** Christians who want to understand prophecy seriously but
are put off by sensationalism or heavy academia.

**Unique angle:** Historicism as the Reformation consensus — presented as
scholarship, not SDA marketing.

---

## Phase 1 — Foundation (Do First, Low Risk)

> Goal: Clean up and validate the current site before any framework migration.

### 1.1 — Rename & Rebrand

- [ ] Choose a domain name that is denomination-neutral (see options below)
- [ ] Update masthead and meta tags to reflect new brand
- [ ] Remove SDA-specific framing from the URL / title — content stays
      unchanged, tone becomes invitation not recruitment

**Domain ideas:**

- `SealedAndOpened.com` — Dan 12:4, "seal the book until the time of the end"
- `ThePropheticRecord.com`
- `LampsAndSeals.com`
- `HistoricistBible.com`

### 1.2 — Refactor Current HTML File

- [ ] Extract all CSS into `/css/main.css`
- [ ] Extract all JavaScript into `/js/main.js`
- [ ] Keep `index.html` lean — just markup
- [ ] Verify Vercel deploy still works after extraction

### 1.3 — Add Basic SEO

- [ ] Unique `<title>` and `<meta description>` tags for each tab view (via JS
      on tab switch)
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`) for social
      sharing
- [ ] Generate a shareable preview image (1200×630) for the site

### 1.4 — Validate & Share

- [ ] Share the current version with 3–5 trusted readers for feedback
- [ ] Does the content land for non-SDAs?
- [ ] Is the scoring section credible or does it feel one-sided?
- [ ] What's missing that would make someone bookmark / share it?

---

## Phase 2 — Next.js Migration

> Goal: Move from single HTML file to a proper multi-page Next.js app.

### 2.1 — Project Setup

- [ ] Initialise Next.js (App Router) in a new directory
  ```bash
  npx create-next-app@latest prophecy-site --app --ts --tailwind --eslint
  ```
- [ ] Configure Tailwind typography plugin for long-form article rendering
- [ ] Port the existing CSS design tokens into Tailwind config
- [ ] Set up Vercel project for the new repo

### 2.2 — Page Structure

```
app/
├── page.tsx                  ← Landing / Home (new — see Phase 3)
├── compare/
│   └── page.tsx              ← Futurist vs Historicist (current site content)
├── evidence/
│   └── page.tsx              ← Evidence Today tab
├── learn/
│   ├── page.tsx              ← Course index
│   └── [slug]/
│       └── page.tsx          ← Individual lesson pages
├── prophecy/
│   ├── page.tsx              ← Prophecy index
│   └── [slug]/
│       └── page.tsx          ← Deep-dive article per prophecy
└── about/
    └── page.tsx              ← Mission, hermeneutical statement
```

### 2.3 — Content in MDX

- [ ] Install `@next/mdx` and `next-mdx-remote`
- [ ] Write content as `.mdx` files — Markdown + React components
- [ ] First articles to write:
  - `daniel-9-the-70-weeks.mdx`
  - `who-is-the-antichrist.mdx`
  - `the-1260-years.mdx`
  - `what-is-the-investigative-judgment.mdx`
  - `mark-of-the-beast-explained.mdx`

### 2.4 — Migrate Existing Content

- [ ] Port all 4 tabs from `index.html` into corresponding Next.js pages
- [ ] Convert hardcoded era blocks, score rows, and pillar cards to data-driven
      components
- [ ] Move all content data into `/data/` as JSON files:
  - `data/timelines.json`
  - `data/scoring-criteria.json`
  - `data/pillars.json`
  - `data/evidence-sections.json`

---

## Phase 3 — New Homepage

> Goal: A homepage that tells the story — why this matters and where to start.

### Structure

```
Hero
  ├── Headline: "What Did the Reformers Believe About Prophecy?"
  └── Sub: Short hook on the Reformation consensus + invitation to explore

Why It Matters (3-column)
  ├── Daniel's 70 Weeks — verified to the year
  ├── 1,260 Years — verified to the decade
  └── The Second Coming — one event, every eye

Start Here (Learning Path)
  ├── "I'm new to prophecy" → Daniel 2 explainer
  ├── "I know Futurism" → Comparison tab
  └── "Show me the evidence" → Evidence Today tab

Featured Article
  └── Latest deep-dive

Scripture Anchor
  └── Large pull quote — Christ at the centre
```

---

## Phase 4 — Learn Section (Courses)

> Goal: Structured learning paths so users go deep, not just skim.

### Courses to Build

| Course                      | Lessons                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ |
| **Daniel Unlocked**         | Dan 2 · Dan 7 · Dan 8 · Dan 9 · Dan 12                                         |
| **Revelation Explained**    | The 7 Churches · 7 Seals · 7 Trumpets · Rev 12–14 · Rev 17–18 · Rev 20–22      |
| **The Antichrist Question** | What it is · Little Horn · 2 Thess 2 · 1 John · Historical ID                  |
| **The Second Coming**       | One event · Signs · State of the dead · Millennium                             |
| **Mark of the Beast**       | What it is (historically) · What it is (prophetically) · Sunday law connection |

### Features

- [ ] Progress tracking (localStorage first, then auth later)
- [ ] Printable PDF study guide per lesson
- [ ] Scripture references linked to Bible Gateway

---

## Phase 5 — Search & Discovery

- [ ] Full-text search across all articles and lessons (Orama or Pagefind — both
      free, static-site compatible)
- [ ] Tag system: `#daniel` `#1260-years` `#antichrist` `#second-coming`
      `#mark-of-the-beast`
- [ ] Related articles panel on each page
- [ ] Scripture index — look up a verse, see every article that addresses it

---

## Phase 6 — Community & Engagement (Optional / Later)

- [ ] Email newsletter (Resend or Buttondown — free tier)
- [ ] Shareable "study cards" — auto-generated OG images per prophecy point
- [ ] Comments via Giscus (GitHub Discussions — no database needed)
- [ ] Study group resources — downloadable slides per lesson

---

## Tech Stack Summary

| Layer     | Choice                          | Why                                             |
| --------- | ------------------------------- | ----------------------------------------------- |
| Framework | Next.js 15 (App Router)         | MDX articles, routing, API routes for OG images |
| Styling   | Tailwind v4 + Typography plugin | Design system + readable long-form articles     |
| Content   | MDX files in `/content/`        | Write in Markdown, render as React              |
| Search    | Orama (client-side)             | Zero server cost, works statically              |
| Deploy    | Vercel                          | Already familiar, free for this scale           |
| Email     | Resend (later)                  | Developer-friendly, generous free tier          |

---

## Immediate Next Steps (This Week)

1. **Decide on the domain name / brand** — this shapes everything
2. **Extract CSS and JS** from `index.html` into separate files
3. **Add Open Graph meta tags** so the current site shares properly
4. **Write the first deep-dive article** (Daniel 9 — 70 Weeks) as a plain `.md`
   file even before the migration — validates whether the writing voice works
5. **Init the Next.js project** in a parallel folder and migrate the comparison
   tab first

---

## What NOT to Build (Yet)

- ❌ User accounts / login — complexity without clear payoff right now
- ❌ Comments — moderate a theology comments section before you have traffic?
  No.
- ❌ Mobile app — the web site IS the mobile experience with good responsive CSS
- ❌ Podcast / video production — write the articles first, the other formats
  follow naturally
