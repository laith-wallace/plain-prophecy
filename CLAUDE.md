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

**Source of Truth:** [writing-guidelines.md](file:///Users/laithwallace/CursorProjectDev/Plain%20Prophecy/docs/writing-guidelines.md) (Automated by `.cursor/rules/writing-guidelines.mdc`)

- **Christ-centred & Historicist**: Always anchor to Jesus, using the Reformation consensus.
- **Conversational Depth**: Clear English for 16–24 year olds without losing biblical rigour.
- **Hook Immediately**: Open inside the scene; skip introductions.
- **No Fear**: Wonder-based, not anxiety-driven.

## Content Rules

- **Always**: Cite Bible passages, use short paragraphs, land with a "Christ Pivot".
- **Never**: Present futurism/preterism as equivalent, or rely on date-setting.
- **Mobile-First**: Every UI and content piece must be verified at 390px (iPhone baseline).

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
