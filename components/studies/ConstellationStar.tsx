'use client'

import { useState, useCallback } from 'react'
import { PulsarStar, StarCategory } from '@/data/pulsar-map'

interface ConstellationStarProps {
  star: PulsarStar
  cx: number
  cy: number
  isActive: boolean
  onClick: () => void
}

const CATEGORY_COLOURS: Record<StarCategory, string> = {
  gospel: '#C9A84C',
  prophecy: '#7A9ABB',
  doctrine: '#B8906A',
}

export default function ConstellationStar({
  star,
  cx,
  cy,
  isActive,
  onClick,
}: ConstellationStarProps) {
  const [hovered, setHovered] = useState(false)

  const colour = CATEGORY_COLOURS[star.category]
  const isComingSoon = star.status === 'coming-soon'

  const radius = isActive ? 12 : hovered ? 9 : isComingSoon ? 5 : 6
  const fillOpacity = isComingSoon ? 0.4 : isActive ? 1 : hovered ? 1 : 0.6
  const labelOpacity = isActive || hovered ? 1 : 0
  const labelY = cy - (isActive || hovered ? 20 : 16)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    },
    [onClick]
  )

  // Glow filter id — unique per star
  const glowId = `glow-${star.id}`

  return (
    <g
      className="constellation-star"
      role="button"
      aria-label={`${star.label}${isComingSoon ? ' (coming soon)' : ''}`}
      aria-pressed={isActive}
      tabIndex={0}
      style={{ cursor: 'pointer', outline: 'none' }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <defs>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={isActive ? 6 : 3} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 44×44px invisible touch target */}
      <circle cx={cx} cy={cy} r={22} fill="transparent" />

      {/* Visual star circle */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={colour}
        fillOpacity={fillOpacity}
        stroke={isComingSoon ? colour : 'none'}
        strokeWidth={isComingSoon ? 1 : 0}
        strokeDasharray={isComingSoon ? '3 2' : undefined}
        filter={isActive || hovered ? `url(#${glowId})` : undefined}
        style={{
          transition: 'r 0.2s ease, fill-opacity 0.2s ease',
        }}
      />

      {/* Star label — SVG text above the star */}
      <text
        x={cx}
        y={labelY}
        textAnchor="middle"
        fontFamily="'Cinzel', serif"
        fontSize={10}
        fill={isComingSoon ? 'rgba(255,255,255,0.4)' : '#FFFFFF'}
        fontStyle={isComingSoon ? 'italic' : 'normal'}
        opacity={labelOpacity}
        style={{
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {star.label}
      </text>
    </g>
  )
}
