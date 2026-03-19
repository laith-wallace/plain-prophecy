import React from 'react'
import { TIMELINE_START, TIMELINE_END, AXIS_Y, CANVAS_W, yearToX } from '@/data/timeline-visual'

interface TimelineAxisProps {
  zoomTier: 1 | 2 | 3 | 4 | 5
}

const TICK_INTERVALS: Record<number, number> = {
  1: 500,
  2: 200,
  3: 100,
  4: 50,
  5: 10,
}

// Bottom of bands — TODAY line extends down to here
const BANDS_BOTTOM_Y = AXIS_Y + 100 + 3 * 150 + 2 * 20  // = 400+100+450+40 = 990

function formatYear(year: number): string {
  if (year === 0) return '0'
  if (year < 0) return `${Math.abs(year)} BC`
  return `${year} AD`
}

function generateTicks(interval: number): number[] {
  const ticks: number[] = []
  const start = Math.ceil(TIMELINE_START / interval) * interval
  for (let y = start; y <= TIMELINE_END; y += interval) {
    ticks.push(y)
  }
  return ticks
}

export default function TimelineAxis({ zoomTier }: TimelineAxisProps) {
  const interval   = TICK_INTERVALS[zoomTier]
  const ticks      = generateTicks(interval)
  const todayX     = yearToX(2026)
  const axisLeft   = yearToX(TIMELINE_START - 50)
  const axisRight  = yearToX(TIMELINE_END + 50)

  return (
    <g aria-hidden="true">
      {/* ── Main axis rail ── */}
      <line
        x1={axisLeft}
        y1={AXIS_Y}
        x2={axisRight}
        y2={AXIS_Y}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={8}
      />

      {/* ── Tick marks + labels (hang DOWN from axis) ── */}
      {ticks.map(year => {
        const x       = yearToX(year)
        const isMajor = year % (interval * 5) === 0 || zoomTier <= 2
        const isZero  = year === 0
        return (
          <g key={year}>
            <line
              x1={x}
              y1={AXIS_Y}
              x2={x}
              y2={AXIS_Y + (isMajor ? 50 : 25)}
              stroke={isZero ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)'}
              strokeWidth={isZero ? 5 : 3}
            />
            {isMajor && (
              <text
                x={x}
                y={AXIS_Y + 68}
                textAnchor="middle"
                fontFamily="'Inter', sans-serif"
                fontSize={isZero ? 62 : 52}
                fill={isZero ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)'}
                fontWeight={isZero ? 700 : 400}
              >
                {formatYear(year)}
              </text>
            )}
          </g>
        )
      })}

      {/* ── AD/BC divider at year 0 ── */}
      <line
        x1={yearToX(0)}
        y1={AXIS_Y - 60}
        x2={yearToX(0)}
        y2={AXIS_Y + 85}
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={3}
        strokeDasharray="12,8"
      />

      {/* "BC" label — sits just below the tick zone, above the first band */}
      <text
        x={yearToX(-30)}
        y={AXIS_Y + 80}
        textAnchor="end"
        fontFamily="'Inter', sans-serif"
        fontSize={45}
        fill="rgba(255,255,255,0.45)"
        letterSpacing="6"
        fontWeight={600}
      >
        BC
      </text>

      {/* "AD" label */}
      <text
        x={yearToX(30)}
        y={AXIS_Y + 80}
        textAnchor="start"
        fontFamily="'Inter', sans-serif"
        fontSize={45}
        fill="rgba(255,255,255,0.45)"
        letterSpacing="6"
        fontWeight={600}
      >
        AD
      </text>

      {/* ── TODAY line — spans from above axis through all bands ── */}
      <line
        x1={todayX}
        y1={AXIS_Y - 80}
        x2={todayX}
        y2={BANDS_BOTTOM_Y}
        stroke="rgba(255,255,255,0.40)"
        strokeWidth={5}
        strokeDasharray="20,12"
      />
      {/* TODAY label above axis */}
      <text
        x={todayX}
        y={AXIS_Y - 90}
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize={52}
        fill="rgba(255,255,255,0.80)"
        fontWeight={700}
        letterSpacing="4"
      >
        TODAY
      </text>

      {/* ── Axis end arrows ── */}
      <polygon
        points={`${axisLeft},${AXIS_Y} ${axisLeft + 70},${AXIS_Y - 25} ${axisLeft + 70},${AXIS_Y + 25}`}
        fill="rgba(255,255,255,0.18)"
      />
      <polygon
        points={`${axisRight},${AXIS_Y} ${axisRight - 70},${AXIS_Y - 25} ${axisRight - 70},${AXIS_Y + 25}`}
        fill="rgba(255,255,255,0.18)"
      />

      {/* Canvas width anchor (keeps SVG coordinate space correct) */}
      <rect x={0} y={0} width={CANVAS_W} height={1} fill="none" />
    </g>
  )
}
