import React from 'react'
import { TimelineEvent, AXIS_Y, yearToX } from '@/data/timeline-visual'

interface TimelineEventNodeProps {
  event: TimelineEvent
  isActive: boolean
  accentColour: string
  zoomTier: 1 | 2 | 3 | 4 | 5
  onClick: () => void
}

// ── Milestone circle radius by tier ─────────────────────────────────────────
const TIER_RADIUS: Record<1 | 2 | 3, number> = { 1: 55, 2: 40, 3: 26 }

// ── Vertical milestone line extents ─────────────────────────────────────────
const LINE_BOTTOM_Y = 995  // extends through all three bands (bands end ~990)

// ── 5-row label system — rows spread across the full 400px label area above axis ──
// Row 1 = just above the axis rail; Row 5 = near the top of the canvas
const LABEL_ROW_Y: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 370,
  2: 295,
  3: 215,
  4: 130,
  5: 45,
}

// ── Badge/dot colours — vivid ────────────────────────────────────────────────
const BADGE_COLOURS: Record<string, string> = {
  fulfilled:  '#5a9ef5',  // bright blue
  historical: '#3ebd72',  // bright green
  present:    '#f0a820',  // vivid amber
  future:     'rgba(255,255,255,0.60)',
}

export default function TimelineEventNode({
  event,
  isActive,
  accentColour,
  zoomTier,
  onClick,
}: TimelineEventNodeProps) {
  const x          = yearToX(event.year)
  const r          = TIER_RADIUS[event.tier]
  const dotColour  = isActive ? accentColour : (BADGE_COLOURS[event.badge] ?? 'rgba(255,255,255,0.6)')
  const isToday    = event.id.endsWith('-today')
  const isFuture   = event.badge === 'future'

  // ── Label visibility based on zoom level ──────────────────────────────────
  // zoomTier ≤ 2 (very zoomed out): show shortLabel on the circle only
  // zoomTier = 3 (default ~21px): show full label for tier 1 only
  // zoomTier ≥ 4 (zoomed in ~28px+): show tier 1 + tier 2 labels + date sublabel
  const showShortTag    = zoomTier <= 2
  const showFullLabel   = zoomTier >= 3 && event.tier === 1
  const showTier2Label  = zoomTier >= 4 && event.tier === 2
  const showDateSublabel = zoomTier >= 4 && event.tier === 1

  // Label Y from the 5-row system; date sublabel sits 55 SVG units below the main label
  const labelY     = LABEL_ROW_Y[event.labelRow]
  const dateLabelY = Math.min(labelY + 55, AXIS_Y - 20)

  // Line starts at the label row when a label is visible; short stub otherwise
  const lineTopY = (showFullLabel || showTier2Label)
    ? labelY
    : showShortTag
      ? AXIS_Y - 75
      : AXIS_Y - 60

  return (
    <g
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${event.label} — ${event.dateLabel}`}
      style={{ cursor: 'pointer' }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() }
      }}
    >
      {/* ── Large invisible touch / click target spanning the milestone line ── */}
      <rect
        x={x - 30}
        y={0}
        width={60}
        height={LINE_BOTTOM_Y}
        fill="transparent"
      />

      {/* ── Vertical milestone line ── */}
      <line
        x1={x}
        y1={lineTopY}
        x2={x}
        y2={LINE_BOTTOM_Y}
        stroke={isActive ? accentColour : 'rgba(255,255,255,0.22)'}
        strokeWidth={isActive ? 8 : 5}
        strokeDasharray={isFuture ? '24,16' : undefined}
        opacity={isActive ? 1 : 0.7}
      />

      {/* ── Glow halo behind circle when active ── */}
      {isActive && (
        <circle
          cx={x}
          cy={AXIS_Y}
          r={r + 35}
          fill={`${dotColour}1a`}
          stroke={`${dotColour}44`}
          strokeWidth={4}
        />
      )}

      {/* ── Dark background circle to mask overlapping stalks/axis ── */}
      <circle
        cx={x}
        cy={AXIS_Y}
        r={r + 8}
        fill="#010408"
      />

      {/* ── Milestone circle on the axis ── */}
      <circle
        cx={x}
        cy={AXIS_Y}
        r={r}
        fill={dotColour}
        stroke={isActive ? '#ffffff' : 'rgba(255,255,255,0.55)'}
        strokeWidth={isActive ? 7 : 5}
      />

      {/* ── Today pulsing ring ── */}
      {isToday && (
        <circle
          cx={x}
          cy={AXIS_Y}
          r={r + 20}
          fill="none"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth={5}
          strokeDasharray="14,10"
        />
      )}

      {/* ── Short tag on circle (zoomed out) — just the year ── */}
      {showShortTag && (
        <text
          x={x}
          y={AXIS_Y + 14}
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize={42}
          fontWeight={700}
          fill={isActive ? '#ffffff' : 'rgba(0,0,0,0.85)'}
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {event.shortLabel}
        </text>
      )}

      {/* ── Full event label (tier 1 at zoomTier ≥ 3, tier 2 at zoomTier ≥ 4) ── */}
      {(showFullLabel || showTier2Label) && (
        <text
          x={x}
          y={labelY}
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize={event.tier === 1 ? 75 : 60}
          fontWeight={event.tier === 1 ? 700 : 500}
          fill={isActive ? accentColour : 'rgba(255,255,255,0.88)'}
          style={{ 
            userSelect: 'none', 
            pointerEvents: 'none',
            paintOrder: 'stroke fill',
            stroke: '#010408',
            strokeWidth: 16,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        >
          {event.label}
        </text>
      )}

      {/* ── Date sublabel (tier 1 only, zoomTier ≥ 4) ── */}
      {showDateSublabel && (
        <text
          x={x}
          y={dateLabelY}
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize={52}
          fontWeight={400}
          fill={isActive ? accentColour : 'rgba(255,255,255,0.50)'}
          style={{ 
            userSelect: 'none', 
            pointerEvents: 'none',
            paintOrder: 'stroke fill',
            stroke: '#010408',
            strokeWidth: 12,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        >
          {event.dateLabel}
        </text>
      )}
    </g>
  )
}
