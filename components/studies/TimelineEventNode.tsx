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

// ── 5-row label system — rows spread across the full 400px label area above axis ──
// Row 1 = just above the axis rail; Row 5 = near the top of the canvas
const LABEL_ROW_Y: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 260,
  2: 205,
  3: 150,
  4: 95,
  5: 40,
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

  // Label Y from the 5-row system; date sublabel sits 45 SVG units below the main label
  const labelY     = LABEL_ROW_Y[event.labelRow]
  const dateLabelY = Math.min(labelY + 45, AXIS_Y - 75)

  // Stalk starts at AXIS_Y and goes UP to labelY
  const stalkTopY = (showFullLabel || showTier2Label)
    ? labelY
    : showShortTag
      ? AXIS_Y - 75
      : AXIS_Y - 60

  // Diamond radius for the polygon points
  const dr = r * 1.2

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
        x={x - 40}
        y={Math.min(stalkTopY, AXIS_Y - 50)}
        width={80}
        height={Math.max(AXIS_Y - stalkTopY + 100, 150)}
        fill="transparent"
      />

      {/* ── Vertical milestone stalk (extending UP from axis) ── */}
      <line
        x1={x}
        y1={AXIS_Y}
        x2={x}
        y2={stalkTopY}
        stroke={isActive ? accentColour : 'rgba(255,255,255,0.22)'}
        strokeWidth={isActive ? 8 : 4}
        strokeDasharray={isFuture ? '24,16' : undefined}
        opacity={isActive ? 1 : 0.7}
      />

      {/* ── Glow halo behind diamond when active ── */}
      {isActive && (
        <polygon
          points={`${x},${AXIS_Y - (dr + 35)} ${x + (dr + 35)},${AXIS_Y} ${x},${AXIS_Y + (dr + 35)} ${x - (dr + 35)},${AXIS_Y}`}
          fill={`${dotColour}1a`}
          stroke={`${dotColour}44`}
          strokeWidth={4}
        />
      )}

      {/* ── Dark background diamond to mask axis ── */}
      <polygon
        points={`${x},${AXIS_Y - (dr + 8)} ${x + (dr + 8)},${AXIS_Y} ${x},${AXIS_Y + (dr + 8)} ${x - (dr + 8)},${AXIS_Y}`}
        fill="#010408"
      />

      {/* ── Milestone diamond on the axis ── */}
      <polygon
        points={`${x},${AXIS_Y - dr} ${x + dr},${AXIS_Y} ${x},${AXIS_Y + dr} ${x - dr},${AXIS_Y}`}
        fill={dotColour}
        stroke={isActive ? '#ffffff' : 'rgba(255,255,255,0.55)'}
        strokeWidth={isActive ? 7 : 5}
      />

      {/* ── Today pulsing ring (diamond style) ── */}
      {isToday && (
        <polygon
          points={`${x},${AXIS_Y - (dr + 25)} ${x + (dr + 25)},${AXIS_Y} ${x},${AXIS_Y + (dr + 25)} ${x - (dr + 25)},${AXIS_Y}`}
          fill="none"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth={5}
          strokeDasharray="20,15"
        />
      )}

      {/* ── Short tag on diamond (zoomed out) — just the year ── */}
      {showShortTag && (
        <text
          x={x}
          y={AXIS_Y + 12}
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize={38}
          fontWeight={700}
          fill={isActive ? '#ffffff' : 'rgba(0,0,0,0.85)'}
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {event.shortLabel}
        </text>
      )}

      {/* ── Full event label (Titles unified at size 65) ── */}
      {(showFullLabel || showTier2Label) && (
        <text
          x={x}
          y={labelY - 20} // Positioned slightly above the stalk end
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize={65}
          fontWeight={700}
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

      {/* ── Date sublabel (consistent style) ── */}
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
