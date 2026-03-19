import React from 'react'
import { PeriodBand, AXIS_Y, yearToX } from '@/data/timeline-visual'

interface TimelinePeriodBandProps {
  band: PeriodBand
}

// ── Gantt-bar layout constants ──────────────────────────────────────────────
const BAND_H     = 150   // tall bar — at k=0.14 renders at ~21px; at k=0.35 renders at ~52px
const BAND_GAP   = 20    // gap between lanes
const BAND_TOP_Y = AXIS_Y + 100  // starts well below axis + tick labels

export default function TimelinePeriodBand({ band }: TimelinePeriodBandProps) {
  const x1 = yearToX(band.startYear)
  const x2 = yearToX(band.endYear)
  const w  = x2 - x1
  const y  = BAND_TOP_Y + band.bandIndex * (BAND_H + BAND_GAP)

  // Clamp label to visible portion (left-justified inside bar)
  const labelX = x1 + 60

  return (
    <g aria-hidden="true">
      {/* ── Main band fill ── */}
      <rect
        x={x1}
        y={y}
        width={w}
        height={BAND_H}
        fill={band.colour}
        rx={12}
        ry={12}
      />

      {/* ── Left-edge "tab" — solid accent colour, no left rounding ── */}
      <rect
        x={x1}
        y={y}
        width={18}
        height={BAND_H}
        fill={band.stroke}
        rx={0}
        ry={0}
      />
      {/* Round the right side of the tab so it doesn't look clipped */}
      <rect
        x={x1}
        y={y}
        width={9}
        height={BAND_H}
        fill={band.stroke}
      />

      {/* ── Top border ── */}
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={band.stroke}
        strokeWidth={2}
        opacity={0.5}
      />

      {/* ── Bottom border ── */}
      <line
        x1={x1}
        y1={y + BAND_H}
        x2={x2}
        y2={y + BAND_H}
        stroke={band.stroke}
        strokeWidth={2}
        opacity={0.5}
      />

      {/* ── Right boundary ── */}
      <line
        x1={x2}
        y1={y}
        x2={x2}
        y2={y + BAND_H}
        stroke={band.stroke}
        strokeWidth={4}
        opacity={0.7}
      />

      {/* ── Band label — left-justified inside bar, like a Gantt task name ── */}
      {w > 300 && (
        <text
          x={labelX + 28}
          y={y + BAND_H / 2 + 22}
          textAnchor="start"
          fontFamily="'Inter', sans-serif"
          fontSize={65}
          fontWeight={700}
          fill={band.stroke}
          opacity={0.9}
          letterSpacing="1"
          style={{ userSelect: 'none' }}
        >
          {band.label}
        </text>
      )}
    </g>
  )
}
