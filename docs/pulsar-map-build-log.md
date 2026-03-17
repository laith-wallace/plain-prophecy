# Pulsar Map — Build Log

**Route:** `/studies/map`
**Branch:** `claude/pulsar-map-constellation-tipU7`

---

## What Was Built

An immersive, fullscreen interactive constellation map at `/studies/map`. Every study, prophecy, and doctrine on the site is plotted as a star orbiting a central pulsing core labelled **God IS Love** (1 John 4:8). The visual language is a deep-space Milky Way — dark navy, a diagonal nebula band, dense starfield, and gold-tinted pulsar at the centre.

---

## Files Created

### Route

| File | Purpose |
|---|---|
| `app/studies/map/page.tsx` | Page route — fullscreen layout, header, footer, legend pills |

### Components

| File | Purpose |
|---|---|
| `components/studies/PulsarMap.tsx` | Root SVG canvas — composes all sub-components, manages active-star state |
| `components/studies/PulsarCore.tsx` | Animated pulsing gold core at the centre of the map |
| `components/studies/ConstellationLine.tsx` | Dashed line from core to each star; animates a travelling dot on active |
| `components/studies/ConstellationStar.tsx` | Clickable star node — glow, hover, active, coming-soon states |
| `components/studies/StarCard.tsx` | Detail card that opens when a star is clicked |

### Data

| File | Purpose |
|---|---|
| `data/pulsar-map.ts` | All star data + TypeScript types (`PulsarStar`, `PulsarMapData`) |

---

## Architecture

### Canvas

The map renders inside a 1000×1000 SVG `viewBox` with `preserveAspectRatio="xMidYMid meet"`, so it scales cleanly to any screen. The centre point is always `(500, 500)`.

### Star positioning

Each star has an `angle` (degrees, 0–360) and a `distance` (0–1, fraction of max radius). These are converted to `(x, y)` coordinates with:

```ts
const radians = ((angle - 90) * Math.PI) / 180
x = 500 + Math.cos(radians) * (distance * 400)
y = 500 + Math.sin(radians) * (distance * 400)
```

The `−90` rotation puts `angle: 0` at the top of the canvas (12 o'clock).

### Layer order (bottom → top)

1. Deep-space radial gradient background
2. Milky Way nebula band (3 overlapping radial gradients — left, centre, right)
3. Cyan hot-spot clusters (3 more gradients)
4. Dense starfield (`StarfieldBackground` — ~160 hand-placed stars in three layers: background, band, bright highlights)
5. Pulsar gold warmth gradient (warm the cold-blue nebula from the centre)
6. Constellation lines (`ConstellationLine`)
7. Study star nodes (`ConstellationStar`)
8. Pulsar core (`PulsarCore`)
9. Star card (outside SVG, positioned absolute)

### Interaction model

- Click a star → `activeStarId` is set in `PulsarMap` state
- The active star's `ConstellationLine` brightens and fires a travelling-dot animation
- The active `ConstellationStar` grows and glows
- A `StarCard` slides up from the bottom on mobile, appears as a sidebar panel on desktop (768px+)
- Click the same star again, press Escape, or click the card's × to dismiss
- Full keyboard accessibility: `tabIndex`, `role="button"`, `aria-pressed`, Enter/Space handlers

---

## Star Data

13 stars across 3 categories, clustered by position:

### Gospel (gold — top arc, ~300°–45°)
| Star | Angle | Status |
|---|---|---|
| Love for God | 340° | Coming soon |
| Righteousness by Faith | 15° | Coming soon |
| The Resurrection | 45° | Coming soon |
| Jesus at the Centre | 320° | Coming soon |

### Prophecy (blue — right arc, ~80°–165°)
| Star | Angle | Status |
|---|---|---|
| Daniel 2 | 80° | **Live** |
| Daniel 7 | 110° | **Live** |
| Daniel 9 | 140° | **Live** |
| Daniel 8 | 165° | Coming soon |

### Doctrine (bronze — left/bottom arc, ~200°–305°)
| Star | Angle | Status |
|---|---|---|
| The Sabbath | 200° | Coming soon |
| State of the Dead | 225° | Coming soon |
| The Second Coming | 255° | Coming soon |
| The Sanctuary | 282° | Coming soon |
| The Law | 305° | Coming soon |

Each star carries: `label`, `category`, `status`, `angle`, `distance`, `loveConnection` (Christ-centred hook), `scripture`, `scriptureText`, `summary`, `href`.

---

## Visual Design

### Colour palette
| Element | Colour |
|---|---|
| Gospel stars | `#C9A84C` (gold) |
| Prophecy stars | `#7A9ABB` (slate blue) |
| Doctrine stars | `#B8906A` (bronze) |
| Pulsar core | White → gold gradient |
| Background | `#010408` (near-black navy) |
| Nebula band | Deep blue radial gradients |

### Typography
- Headings and labels: **Cinzel** (serif)
- Body and UI: **Inter** (sans-serif)

### Responsive layout
- **Mobile:** StarCard slides up from the bottom as a sheet
- **Desktop (≥768px):** StarCard appears as a fixed-width (360px) sidebar panel, vertically centred on the right
- Map SVG scales to fill the full viewport at all sizes

### Animations
- **Pulsar rings:** Three concentric rings expand outward in a staggered loop (`pulsar-ring` keyframe, 2.5s, offsets 0s / 0.6s / 1.2s). Respects `prefers-reduced-motion`.
- **Travelling dot:** When a line is active, a `<circle>` animates along the path using SVG `<animateMotion>` + cubic-bezier easing.
- **Star card entry:** `card-slide-up` on mobile, `card-fade-in` on desktop. Both respect `prefers-reduced-motion`.
- **Stars:** Smooth `r` and `fill-opacity` transitions on hover/active via CSS `transition`.

---

## Page Layout (`app/studies/map/page.tsx`)

The page uses `position: fixed; inset: 0` to bypass the studies layout and go truly fullscreen. Three overlay layers sit on top of the map SVG using `position: absolute`:

- **Header** (top): back link ← Studies, eyebrow label, H1 title, subtitle
- **Map** (fills remaining space): `PulsarMap` component
- **Footer** (bottom): Psalm 147:4 scripture quote + legend pills (Gospel / Prophecy / Doctrine)

All overlay elements use `pointerEvents: none` with selective `pointerEvents: auto` on interactive children, so the SVG map remains fully clickable behind them.

---

## 404 Fix

After the page was created, the dev server returned a 404 because the `.next` build cache predated the new route (the `app-paths-manifest.json` only listed `/studies/page` and `/studies/[book]/[lesson]/page`). The fix was to delete the stale `.next` directory and restart the dev server, forcing a full route rediscovery.
