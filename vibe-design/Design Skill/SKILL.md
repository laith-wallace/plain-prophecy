# Plain Prophecy — Design Skill

Curated from [taste-skill](https://github.com/Leonxlnx/taste-skill). Adapted for a content-heavy, scripture-first site targeting 16–24 year olds.

---

## Design Parameters

```
DESIGN_VARIANCE:  5   // Structured but not corporate. Occasional split layouts.
MOTION_INTENSITY: 3   // Subtle only. Never distracts from the Word.
VISUAL_DENSITY:   3   // Generous whitespace. Content breathes.
```

Override these in your prompt if a specific screen calls for it.

---

## Typography

**Use these fonts — in order of preference:**
- `Geist` (default body/UI)
- `Outfit`
- `Cabinet Grotesk`
- `Satoshi`

**Never use Inter.** It reads as generic template work.

Set font via `next/font/google` or local font. Apply to `<html>` in the root layout.

---

## Color

- One accent color, desaturated. Think deep amber, warm stone, aged parchment — not neon.
- Backgrounds: off-white or very dark. Not pure `#ffffff` or `#000000`.
- **Never use:** AI blue (`#6366f1`), AI purple, gradient rainbow, glowing neon borders.
- Use Tailwind's opacity utilities for tonal layering instead of adding new colors.

---

## Layout

- Default to a reading-first layout: max content width `max-w-2xl` or `max-w-3xl`, centered.
- For landing/hero sections: split-screen or edge-anchored layouts preferred over dead-center stacks.
- Use `min-h-[100dvh]` — never `h-screen` (breaks iOS Safari).
- Cards use `rounded-2xl` with subtle shadow: `shadow-sm` or a custom `box-shadow` with low opacity.
- Avoid grid-heavy dashboard patterns (this is a content site, not a SaaS app).

---

## Motion

- Animate only `transform` and `opacity`. **Never animate** `top`, `left`, `width`, or `height`.
- Use CSS transitions for simple hover states. Reach for Framer Motion only when the interaction genuinely benefits from spring physics.
- If using Framer Motion: `stiffness: 100, damping: 20` for natural feel.
- No scroll-triggered fireworks. Subtle fade-ins are enough.
- Perpetual animations (pulse, float) only on decorative elements — never on text or CTAs.

---

## React / Next.js Rules

- Default to **Server Components**. Wrap interactive features in small, isolated `"use client"` components.
- Don't make an entire page a Client Component because one button needs `onClick`.
- Check `package.json` before importing a library you haven't seen in the project. List install commands if missing.
- Check Tailwind version before using v4-specific syntax (`@theme`, `oklch()`, etc.).

---

## Content Rules (AI Anti-Patterns)

**Never generate:**
- Placeholder names: "John Doe", "Jane Smith", "User"
- Startup buzzwords: "Seamless", "Unleash", "Next-gen", "Powerful"
- Fake statistics: "10,000+ users", "99.9% uptime"
- Placeholder scripture: always use real Bible references when content is needed
- `// TODO: implement this` or `// ... rest of the code` in final output

**Always generate complete implementations.** If approaching a token limit, stop at a clean function or section boundary and signal where to resume — don't truncate silently.

---

## Component Checklist (pre-output)

Before finishing any component or page, verify:

- [ ] Mobile layout works — used `min-h-[100dvh]`, not `h-screen`
- [ ] No hardcoded content arrays in the component — data lives in `/data/` or Convex
- [ ] Interactive elements are in isolated `"use client"` components
- [ ] Empty state, loading state, and error state are handled
- [ ] Animations only on `transform`/`opacity`
- [ ] No banned fonts, colors, or copy patterns from above
- [ ] Code is complete — no placeholders, no truncation

---

## Plain Prophecy Aesthetic Reference

The site should feel like **Relevant Magazine met an Anselm Kiefer painting** — warm, serious, alive. Not a church bulletin. Not a startup landing page. Not a Wikipedia article.

Think:
- Dark parchment or warm slate backgrounds
- Serif display headlines (for prophecy titles and pull quotes)
- Clean sans-serif for body
- Aged amber or gold as the single accent
- Space to breathe between sections
- Typography that earns the reader's trust before the content does
