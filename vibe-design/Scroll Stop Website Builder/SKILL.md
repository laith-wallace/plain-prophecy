# 🚀 Scroll-Stop Website Building Skills

> Your go-to reference for building websites that grab attention, convert
> visitors, and feel unforgettable.

---

## 1. 🎯 The Scroll-Stop Mindset

Before writing a single line of code, ask yourself:

- **"Would I stop scrolling for this?"**
- **"Is the value crystal clear in under 3 seconds?"**
- **"Does every section earn the user's next scroll?"**

Every element on your page must **pull the eye, answer a question, or trigger an
emotion**. If it doesn't — cut it.

---

## 2. ⚡ Above the Fold (Hero Section) — The Most Important 5 Seconds

The hero either hooks them or loses them. Make every pixel count.

### Must-Haves

- **One bold headline** — Clear outcome, not clever wordplay. Lead with _what
  they get_.
- **One supporting subheadline** — Explain _who it's for_ and _how it works_ in
  1–2 sentences.
- **One primary CTA button** — Strong action verb. ("Start Free", "Get My Plan",
  "See It Live")
- **Visual proof** — Hero image, video, screenshot, or illustration that
  reinforces the headline.
- **No navigation clutter** — Minimal top nav. Remove distractions.

### Power Formulas for Headlines

| Formula                            | Example                                      |
| ---------------------------------- | -------------------------------------------- |
| [Result] without [Pain]            | "Rank on Google Without Paying for Ads"      |
| [Number] + [Result] in [Timeframe] | "50 Leads in 30 Days — Guaranteed"           |
| The [Adjective] way to [Goal]      | "The Effortless Way to Build Your Portfolio" |
| For [Audience] who want [Outcome]  | "For Founders Who Want More Customers"       |

### Hero Design Rules

- Font size: **headline ≥ 56px**, subheadline ≥ 20px on desktop
- Contrast ratio: **≥ 4.5:1** for accessibility
- CTA button: **high contrast color**, padding at least 14px × 28px
- Mobile hero must load in **< 2 seconds** (optimize images aggressively)

---

## 3. 🎨 Visual Hierarchy — Guide the Eye

Users scan in an **F-pattern** or **Z-pattern**. Design with that in mind.

### The Hierarchy Stack (top to bottom priority)

1. **Headline** — biggest, boldest
2. **Visual / Image** — draws the eye first instinctively
3. **Subheadline / Supporting copy** — second read
4. **CTA Button** — high contrast, isolated with white space
5. **Trust signals** — logos, stars, counts

### Typography Rules

- Max **2 font families** — one for headings, one for body
- Heading scale: `H1 > H2 > H3` with clear size jumps (don't be subtle)
- Body line-height: `1.6–1.8` for readability
- Max line width: **65–75 characters** (use `max-width: 680px` on paragraphs)
- Never use font sizes below **16px** for body text

### Color Rules

- **60-30-10 rule**: 60% background, 30% primary, 10% accent
- Pick **one** accent color for CTAs and highlights — use it consistently
- Use whitespace as a design element — it creates focus and breathability
- Dark mode: use `#0f0f0f` (not pure black) for backgrounds; softer on eyes

---

## 4. 🧠 Copywriting That Converts

Design gets them to stop. **Copy gets them to act.**

### The PAS Framework

- **P**roblem — Agitate the pain the user feels right now
- **A**gitate — Make it vivid. Why does this problem cost them?
- **S**olve — Present your solution as the clear answer

### The FAB Framework

- **F**eature → **A**dvantage → **B**enefit
- Don't just list features. Tell users _what it means for them_.

> ❌ "256GB Storage" ✅ "256GB Storage — store 10 years of photos without ever
> deleting one"

### Microcopy Checklist

- [ ] Button text starts with an action verb
- [ ] Form placeholders are helpful, not obvious
- [ ] Error messages are human and helpful ("That email looks off" not "Invalid
      input")
- [ ] Empty states have a clear next action
- [ ] Tooltips exist for anything potentially confusing

---

## 5. 📱 Mobile-First Layout Rules

**Over 60% of web traffic is mobile.** If it's broken on mobile, it's broken.

### Layout Checklist

- [ ] Single-column layout on mobile — no side-by-side content below 768px
- [ ] Touch targets minimum **44×44px** (buttons, links, icons)
- [ ] No horizontal scroll on any viewport
- [ ] Text never overflows its container
- [ ] Images are responsive (`max-width: 100%`, use `srcset` for performance)
- [ ] CTAs are reachable with one thumb (bottom-third of screen)
- [ ] Test on real devices, not just browser dev tools

### Breakpoints to Always Handle

| Breakpoint | Width  | Target Device |
| ---------- | ------ | ------------- |
| xs         | 320px  | Small phones  |
| sm         | 480px  | Large phones  |
| md         | 768px  | Tablets       |
| lg         | 1024px | Small laptops |
| xl         | 1280px | Desktops      |
| 2xl        | 1536px | Large screens |

---

## 6. 🔥 Scroll-Triggering Section Patterns

These section types are proven to keep users engaged as they scroll.

### Section 1 — Social Proof / Trust Bar

- Logos of brands/clients ("As seen in", "Trusted by")
- Place immediately below the hero for maximum trust transfer
- Use grayscale logos so they don't clash with your palette

### Section 2 — Problem / Pain Section

- Call out the exact frustrations your audience feels
- Use language pulled from real customer reviews (mirror their words)
- Makes the user feel _seen_ before you sell

### Section 3 — Features → Benefits Section

- Icon + headline + 1–2 line description per feature
- 3 or 6 features in a grid (asymmetric feels unfinished)
- Always frame features as what the user _gains_, not what the product _does_

### Section 4 — Social Proof / Testimonials

- Real names + real photos = 3× more credible
- Include the **result** in the testimonial, not just sentiment
  - ❌ "Great product, love it!"
  - ✅ "I got 3 new clients in my first week using this."
- Video testimonials beat text by a wide margin if available

### Section 5 — Demo / How It Works

- 3-step process ("Simple as 1-2-3") reduces perceived complexity
- Screenshot walkthrough or short video (under 90 seconds)
- Reduce friction anxiety before the CTA

### Section 6 — Final CTA / Offer Section

- Restate the core value proposition
- Add urgency or scarcity if honest (limited spots, closing date)
- Repeat your primary CTA button
- Address the last objection in fine print ("No credit card required", "Cancel
  anytime")

---

## 7. ⚙️ Performance — Speed Is a Design Feature

A beautiful site that loads slowly is a broken site.

### Core Web Vitals Targets

| Metric                                | Target      | What It Measures     |
| ------------------------------------- | ----------- | -------------------- |
| LCP (Largest Contentful Paint)        | **< 2.5s**  | Perceived load speed |
| FID / INP (Interaction to Next Paint) | **< 200ms** | Responsiveness       |
| CLS (Cumulative Layout Shift)         | **< 0.1**   | Visual stability     |

### Performance Checklist

- [ ] Compress all images (use WebP format)
- [ ] Use `loading="lazy"` on all below-fold images
- [ ] Preload hero image with `,[object Object],`
- [ ] Self-host or use CDN for fonts
- [ ] Limit to **≤ 2 custom fonts**, only load weights you use
- [ ] Minify CSS, JS, and HTML in production
- [ ] Remove unused CSS (PurgeCSS, or Tailwind's built-in purge)
- [ ] Defer non-critical JavaScript
- [ ] Use a CDN for static assets

---

## 8. 🧩 UX Micro-Details That Separate Good from Great

These small touches create a feeling of quality users can't always name.

### Interactions & Animation

- Hover states on every clickable element (cursor: pointer + visual feedback)
- Subtle entrance animations on scroll (fade-in, slide-up — keep under 400ms)
- Smooth scroll behavior (`scroll-behavior: smooth`)
- Loading skeletons instead of blank screens while content loads
- Page transitions feel polished, not jarring

### Forms That Don't Kill Conversions

- Ask for the minimum info needed (fewer fields = higher completion)
- Inline validation — don't wait until submit to show errors
- Autofocus on first field
- "Submit" is the worst button label — use outcome-based labels
  - ✅ "Get My Free Report", "Start My Trial", "Book My Spot"
- Show a success state that confirms what happens next

### Navigation

- Sticky nav only if it adds value (e.g., CTA in nav bar)
- Hamburger menus on mobile: full-screen overlay feels premium
- Active state on current page link
- Logo always links back to home

---

## 9. ♿ Accessibility — Design for Everyone

Accessibility is not optional — it improves UX for all users.

### Quick Wins Checklist

- [ ] All images have descriptive `alt` text
- [ ] Color is never the **only** way to convey information
- [ ] Focus states are visible (don't do `outline: none` without a replacement)
- [ ] Heading order is logical: H1 → H2 → H3 (never skip levels)
- [ ] Form inputs have associated `,[object Object]
