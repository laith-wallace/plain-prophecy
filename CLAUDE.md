# Plain Prophecy — CLAUDE.md

## Project Overview

**Plain Prophecy** is a Christ-centred biblical prophecy resource built for 16–24 year olds. The goal is to become the most biblically accurate and accessible prophecy website on the internet — starting with the books of Daniel and Revelation, then expanding to all major biblical prophecies.

The site is written from a **Seventh-day Adventist perspective**, rooted in historicist hermeneutics and the Reformation consensus. The priority is always **biblical accuracy and a Christ-centred focus**, not denominational promotion or recruitment.

---

## Mission

Help young people (16–24) understand Christ-centred biblical prophecy in a way that is:
- **Friendly and engaging** — not academic gatekeeping, not fear-mongering
- **Biblically rigorous** — every claim is traceable back to Scripture
- **Shareable** — content is designed to travel on social platforms
- **Christ-centred** — every prophetic period anchors to who Jesus is, not geopolitics or end-time speculation

---

## Voice & Tone

### Primary voice
Modelled after **Relevant Magazine** (relevantmagazine.com): warm, approachable, culturally aware, and intelligent. Write like a knowledgeable older sibling — not a lecturer, not a hype person.

### Key principles
- **Default to clear and conversational.** Short sentences. Plain English. No jargon without explanation.
- **Elevate when the content demands it.** Some passages, prophecies, and theological concepts require precision. Don't hide from university-level clarity when the subject calls for it — just make sure the reader is brought along with you.
- **Never condescend.** Our readers are sharp. Treat them that way.
- **Punchy openings.** Hook the reader in the first sentence. Think Twitter thread openers, not essay introductions.
- **Active voice.** Prophecy is alive — write like it.

### Avoid
- Fear-based framing ("you need to know this before it's too late")
- Denominational insider language without explanation
- Speculative end-time date-setting
- Talking down to the reader
- Wall-of-text paragraphs — break them up

---

## Theological Framework

### Hermeneutic: Historicism
All prophetic interpretation must follow a **historicist hermeneutical approach** — the Reformation consensus. Prophecy in Daniel and Revelation finds its fulfilment across the span of history, with Christ as the centrepiece.

**This is the only lens used on this site.** Futurist and preterist interpretations are not presented as equally valid alternatives. They may be acknowledged to help readers understand the landscape, but they must never be treated as biblically equivalent to the historicist reading.

### Exegetical method
When working through any prophetic passage, the AI must consider:
1. **Original situation** — What was happening when this was written? Who was the original audience?
2. **Literary context** — What kind of writing is this (apocalyptic, poetry, narrative, prophecy)?
3. **Concordance cross-references** — What do other scriptures say that illuminate this passage?
4. **Christ-centred anchor** — How does this point to, or find its fulfilment in, Jesus?

Never assume what a passage is saying. Let Scripture interpret Scripture. Every key claim should have a biblical reference attached.

### Denominational stance
The site is written from a **Seventh-day Adventist perspective**. This is not hidden, but it is also not the point. The goal is biblical accuracy. Do not lead with denominational identity — lead with the Word.

### Scope
- **Currently in focus:** Daniel and Revelation
- **Expanding to:** All major biblical prophecies over time
- **Goal:** The most biblically accurate prophecy resource on the internet

---

## Content Rules

### Always do
- Cite the specific Bible passage for every claim (book, chapter, verse)
- Use the historicist interpretive framework consistently
- Keep Christ at the centre of every prophetic explanation
- Make content scannable — use headings, pull quotes, and short paragraphs
- Write for a reader who is intelligent but not yet theologically trained

### Never do
- Present futurism or preterism as equally valid to historicism
- Make date predictions or speculative end-time timelines
- Use fear as the primary motivator for engagement
- Write in a way that feels like SDA recruitment material
- Ignore the literary context of a passage when interpreting prophecy

---

## Shareable Content

### Current platform priority
1. **Twitter / X threads** — Primary social format. Hook in tweet 1, build the case tweet by tweet, close with a scripture anchor and CTA to the site.
2. **YouTube Shorts** — Coming. Script style: punchy, visual, 30–60 seconds.
3. **Instagram Reels** — Coming. Same as Shorts.
4. **TikTok** — Coming. Same format.

### Social content rules
- Threads and scripts should be instantly understandable without reading the full article
- Every piece of social content should have a clear hook, a core insight, and a landing point
- Always include a scripture reference
- Keep the tone consistent with the site — informative and engaging, not alarmist

---

## Design Philosophy

### Mobile-first, always
**Every UI component, page, and feature must be designed mobile-first.** Our audience (16–24 year olds) primarily accesses this site on their phones. This is the law:

- **Design and build for mobile first, then enhance for desktop.** If it looks great on desktop but broken on mobile, it is broken, full stop.
- Use `clamp()`, `min()`, `max()`, and responsive units (`dvh`, `dvw`, `svh`) rather than fixed pixel sizes wherever the layout may differ across screen sizes.
- Always handle `env(safe-area-inset-bottom)` and `env(safe-area-inset-top)` for full-screen layouts — iPhones have notches and home indicators.
- Touch interactions must be deliberate: tap targets minimum 44×44px, appropriate `touchAction`, and smooth pinch/pan for any zoomable canvas.
- Test at 390px width (iPhone 15) as the baseline viewport before checking desktop.
- Scrollable containers on mobile must use `-webkit-overflow-scrolling: touch` and sensible `max-height` constraints.
- `position: fixed` full-screen overlays must account for browser chrome — prefer `100dvh` over `100vh`.

**Beautiful desktop is a bonus. Working mobile is the baseline.**

---

## Tech Stack

### Approved stack
| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind v4 |
| UI Components | shadcn/ui |
| Database | Convex |
| Deploy | Vercel |
| Content | MDX files in `/content/` |

### Conventions
- Use the **App Router** exclusively — no Pages Router
- Use **TypeScript** throughout — no plain `.js` files in the `app/` or `components/` directories
- Use **shadcn/ui** components where a pre-built component exists rather than building from scratch
- Keep data in `/data/` as JSON or in Convex — no hardcoded content arrays in component files
- Follow the existing file structure in `app/` and `components/`

### Approved libraries (add only with good reason)
- `@next/mdx` / `next-mdx-remote` for article content
- `orama` or `pagefind` for client-side search
- `resend` for email (future)

### Do not add without explicit approval
- New databases or ORMs (Convex is the chosen DB)
- Authentication libraries (not yet scoped)
- Any library that materially increases bundle size without clear justification

---

## File Structure Reference

```
app/
├── page.tsx                  ← Home / Landing
├── about/page.tsx            ← Mission + hermeneutical statement
├── compare/page.tsx          ← Historicism vs Futurism comparison
├── evidence/page.tsx         ← Evidence Today
├── prophet/page.tsx          ← Prophecy deep-dives index
├── learn/
│   ├── page.tsx              ← Course index
│   └── [slug]/page.tsx       ← Individual lessons
└── prophecy/
    ├── page.tsx
    └── [slug]/page.tsx       ← Per-prophecy articles

components/
data/                         ← JSON data files (timelines, scoring, pillars)
content/                      ← MDX articles and lessons
public/                       ← Static assets
```

---

## Prophecy Content Currently in Scope

### Daniel
- Daniel 2 — The statue and world empires
- Daniel 7 — The four beasts and the little horn
- Daniel 8 — The ram, goat, and 2,300 days
- Daniel 9 — The 70 weeks (anchor prophecy)
- Daniel 12 — The time of the end seals opened

### Revelation
- The 7 Churches
- The 7 Seals
- The 7 Trumpets
- Revelation 12–14 — The Woman, the Dragon, the Three Angels
- Revelation 17–18 — Babylon identified
- Revelation 20–22 — The Millennium and New Earth

---

## What This Site Is Not

- ❌ A prophecy news blog reacting to current events
- ❌ An SDA recruitment or evangelism funnel
- ❌ A fear-based end-time countdown site
- ❌ An academic journal (though rigour is valued)
- ❌ A debate platform for competing interpretive frameworks
