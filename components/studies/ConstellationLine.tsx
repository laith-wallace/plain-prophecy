'use client'

import { StarCategory } from '@/data/pulsar-map'

interface ConstellationLineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  active: boolean
  category: StarCategory
}

const CATEGORY_COLOURS: Record<StarCategory, string> = {
  gospel:   '#C9A84C',
  prophecy: '#7A9ABB',
  doctrine: '#B8906A',
}

export default function ConstellationLine({
  x1, y1, x2, y2, active, category,
}: ConstellationLineProps) {
  const colour = CATEGORY_COLOURS[category]
  const lineId = `lp-${x2.toFixed(0)}-${y2.toFixed(0)}`
  const pathD  = `M ${x1} ${y1} L ${x2} ${y2}`

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={active ? `${colour}CC` : 'rgba(201,168,76,0.22)'}
        strokeWidth={active ? 1.5 : 1}
        strokeDasharray="5 7"
        style={{ transition: 'stroke 0.25s ease, stroke-width 0.25s ease' }}
      />

      {active && (
        <>
          <defs>
            <path id={lineId} d={pathD} />
          </defs>
          <circle r={3.5} fill={colour} opacity={0.9}>
            <animateMotion
              dur="0.8s"
              begin="0s"
              fill="freeze"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.42 0 0.58 1"
            >
              <mpath href={`#${lineId}`} />
            </animateMotion>
          </circle>
        </>
      )}
    </g>
  )
}
