# Truus Design Inspiration — Patterns to Steal

Purpose: capture the colour, interaction, typography and animation patterns used
on https://truus.co, and transform them into actionable design + implementation
notes you can apply to your homepage redesign for a 16–24 audience.

---

## Overview

This document distills the visual and interaction language of the site into
reusable patterns: tonal palette, typographic tactics, copy voice, layout
strategies, micro-interactions, and animation recipes. For each pattern there
are "how to apply" notes and short implementation snippets (HTML/CSS/JS). Use
this as a checklist when redesigning your homepage.

---

## 1. Colour & Contrast Patterns

Goal: energetic, playful, and high-contrast colours that read well on device
screens and feel young.

Observed patterns

- Palette uses saturated accent colours (electric pink, lime, cyan) on dark or
  near-white backgrounds.
- Accent colours are used sparingly (buttons, emoji/illustrations, highlights)
  against neutral backgrounds.
- High contrast text for accessibility but with occasional softer muted copy for
  secondary lines.

Practical palette (inspired)

- Primary accent: #FF3B8A (electric pink)
- Secondary accent: #00D1B2 (mint/cyan)
- Tertiary accent: #FFD166 (warm yellow)
- Neutral dark: #0F1724 (near-black)
- Neutral light: #F8FAFC (off-white)

How to apply

- Use 60/30/10 rule: 60% neutrals, 30% primary layout color, 10% accent.
- Reserve accent for CTAs, interactive states, and small illustrative elements
  that catch the eye.
- Use grayscale logos or desaturated brand marks in trust bars so accents remain
  meaningful.

Implementation tip — CSS variables

:root { --bg: #F8FAFC; --text: #0F1724; --accent-1: #FF3B8A; --accent-2:
#00D1B2; --accent-3: #FFD166; }

.button-primary { background:
linear-gradient(90deg,var(--accent-1),var(--accent-2)); color: white;
box-shadow: 0 8px 24px rgba(15,23,36,0.12); }

Accessibility note

- Check contrast of accent text on backgrounds (AA or AAA depending on size).
  Use tools like contrast-checker to validate.

---

## 2. Typography Techniques

Observed patterns

- Mixed-weight headlines, often italicizing or emphasizing 1–2 words within the
  headline for spoken emphasis.
- Occasional letter-spacing and scattered/kerning effects for hero lines.
- Large, bold type for headlines; smaller, informal body copy.

Recommended type scale

- H1: clamp(2.8rem, 6vw, 4.5rem) — very bold
- H2: clamp(1.6rem, 3.5vw, 2.8rem)
- Body: 16–18px, line-height 1.6

Styling trick: emphasis via italics and weight swaps

,[object Object],

CSS .headline { font-weight: 800; } .headline em.accent { font-style: italic;
font-weight: 800; color: var(--accent-1); }

Letter-by-letter entrance (short example)

- Wrap each char in a span and animate opacity/translateY with stagger delays
  using CSS variables or JS.

---

## 3. Copy Voice & Tone

Observed

- Informal, direct, playful, sometimes self-aware ("not to brag").
- Short sentences, contractions, and statements that feel like chat or social
  copy.

Voice rules for 16–24 audience

- Be authentic, avoid corporate speak.
- Use short lines, push personality into microcopy.
- Sprinkle self-aware humour or small asides.
- Use emoji/illustration to reinforce tone where appropriate.

Example microcopy

- CTA: "Let's make noise" vs generic "Contact us"
- Form success: "Nice! We'll slide into your inbox."

---

## 4. Layout & Composition Patterns

Observed

- Large interactive hero with draggable/scrollable interaction.
- Dense photo-grid of faces (human, candid) for team/trust sections.
- Portfolio grid cards with playful SVG/emoji overlays.

Component rules

- Hero: full-bleed, sticky center media, with scattered headline + CTA.
- Grid: variable card sizing with hover reveals + small illustrative badges.
- Team: mosaic-style photos, minimal framing, no rigid headshot circles.

Implementation snippet — card overlay

,[object Object],

.card { position: relative; } .card .badge { position: absolute; top: 12px;
left: 12px; transform: translateZ(0); }

---

## 5. Interaction Patterns

Observed

- Drag / click hero interaction
- Letter-by-letter animations
- Hover states that feel springy (scale & shadow)
- Click to open project with smooth partial page transitions

Design for touch

- Ensure drag affordances are large enough; provide alternative tap actions.
- Show subtle drag handle or microcopy: "Drag / Click to Explore"

Implementation hint: springy hover using CSS

.hover-spring { transition: transform 280ms cubic-bezier(.2,.9,.3,1), box-shadow
200ms; } .hover-spring:hover { transform: translateY(-6px) scale(1.02);
box-shadow: 0 16px 40px rgba(15,23,36,0.18); }

---

## 6. Animation Techniques

Observed

- Letter stagger reveal (each char appears sequentially)
- Subtle parallax on the hero
- Smooth fade/slide on card load
- SVG/emoji float motions

Letter stagger CSS example (small)

.letter { display:inline-block; opacity:0; transform: translateY(20px); }
.letter.in { opacity:1; transform: none; transition: transform 420ms
cubic-bezier(.2,.9,.3,1), opacity 420ms; }

JS to stagger

const chars = document.querySelectorAll('.letter'); chars.forEach((c, i) =>
setTimeout(()=> c.classList.add('in'), i * 40));

Performance tips

- Prefer CSS transforms and opacity; avoid animating layout properties.
- Use will-change: transform on animating elements.
- Use requestAnimationFrame for JS-driven motion.

---

## 7. Illustrations & Emoji Usage

Observed

- Small playful icons overlaid on work cards and in copy to add personality.
- Custom SVGs with simple fills, often matching accent colours.

How to use

- Use a compact set of icons (6–10) and reuse them as a motif.
- Keep SVGs simple (no heavy filters) to ensure performance.

Example: an SVG badge sized 36px with accent fill.

---

## 8. Accessibility & Performance Considerations

- Ensure contrast for headlines and CTAs (WCAG AA baseline).
- Provide keyboard-accessible focus states for interactive elements.
- Compress images to WebP where possible; lazy-load offscreen assets.
- Prefer vector SVGs for icons and small illustrations.

Performance checklist

- Preload hero assets but keep payload small (<300KB ideally)
- Serve responsive images with srcset
- Defer non-critical JS and animations until after first paint

---

## 9. "Steal This" Implementation Recipes

Pattern 1 — Letter by letter hero line

- HTML: wrap each character in a span with class `letter`
- CSS: initial translateY(20px) + opacity 0
- JS: iterate spans with staggered delay to add `in` class

Pattern 2 — Interactive/Draggable hero hint

- Provide a visible handle icon and fallback tap action
- Use pointer events to allow both mouse drag and touch pan

Pattern 3 — Card with emoji overlay

- Absolutely position a small badge inside the card
- Add subtle entrance animation on reveal

---

## 10. Prompts for Claude / AI Builder

Use these to generate code snippets or to ask for full components.

Prompt: "Produce a responsive hero that uses a staggered letter animation for
the headline, an interactive draggable center media, and a CTA. Keep code as a
single HTML file with inline CSS and JS. Make design feel playful and targeted
to ages 16–24. Use accent colours: #FF3B8A and #00D1B2."

Prompt: "Create a grid of portfolio cards where each card has a small emoji
badge in the corner and a hover reveal. Provide accessible markup and CSS only."

---

## 11. Documentation / Pattern Recording Plan

We should record each discovered pattern as a separate section in the repository
of design skills so they can be reused. Proposed files to create (md):

- `palette-and-usage.md` — variables, dos/don'ts, contrast checks
- `headline-and-typography.md` — scale, emphasis rules, examples
- `interactions.md` — drag hero, hover springs, transitions
- `animation-recipes.md` — letter stagger, parallax, svg float
- `components.md` — cards, team grid, trust bar, badges

Each file should include:

- Short description + visual intent
- Code snippet (HTML/CSS/JS)
- Accessibility notes
- Checklist for QA

---

## 12. Quick To-Do for Your Home Page Update

1. Adopt the palette variables and run a contrast check on your existing pages.
2. Replace hero headline with mixed-weight/italic emphasis and add letter
   stagger.
3. Add a small interactive element (drag/tap) to the hero to invite exploration.
4. Replace rigid team headshots with a candid mosaic photo grid.
5. Add emoji badges to portfolio items and reduce copy formality to match voice.
6. Test performance on mobile and iOS Safari; optimize hero assets.

---
