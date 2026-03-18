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
  gospel:   '#C9A84C',
  prophecy: '#7A9ABB',
  doctrine: '#B8906A',
}

// Glow colours — slightly lighter/warmer for the bloom
const GLOW_COLOURS: Record<StarCategory, string> = {
  gospel:   'rgba(240,208,128,0.5)',
  prophecy: 'rgba(130,175,220,0.5)',
  doctrine: 'rgba(200,160,110,0.5)',
}

export default function ConstellationStar({
  star,
  cx,
  cy,
  isActive,
  onClick,
}: ConstellationStarProps) {
  const [hovered, setHovered] = useState(false)

  const colour      = CATEGORY_COLOURS[star.category]
  const glowColour  = GLOW_COLOURS[star.category]
  const isComingSoon = star.status === 'coming-soon'
  const isHighlit   = isActive || hovered

  // Sizes — much bigger for visual impact
  const coreR   = isActive ? 14 : hovered ? 11 : isComingSoon ? 6 : 8
  const glowR   = isActive ? 28 : hovered ? 20 : 14
  const glowOp  = isActive ? 0.55 : hovered ? 0.40 : 0.18
  const coreOp  = isComingSoon ? 0.45 : 1

  const labelOp = isHighlit ? 1 : 0.35
  const labelY  = cy - coreR - 10

  const glowId = `glow-${star.id}`
  const glowFillId = `glow-fill-${star.id}`

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    },
    [onClick]
  )

  return (
    <g
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
        <radialGradient id={glowFillId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={colour} stopOpacity={0.9} />
          <stop offset="60%"  stopColor={colour} stopOpacity={0.3} />
          <stop offset="100%" stopColor={colour} stopOpacity={0} />
        </radialGradient>
        <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={isActive ? 10 : 5} result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 44×44px invisible touch target */}
      <circle cx={cx} cy={cy} r={22} fill="transparent" />

      {/* Soft glow bloom */}
      <circle
        cx={cx}
        cy={cy}
        r={glowR}
        fill={glowColour}
        opacity={glowOp}
        style={{ transition: 'r 0.2s ease, opacity 0.2s ease' }}
      />

      {/* Core star circle */}
      <circle
        cx={cx}
        cy={cy}
        r={coreR}
        fill={colour}
        fillOpacity={coreOp}
        stroke={isComingSoon ? colour : 'none'}
        strokeWidth={isComingSoon ? 1.5 : 0}
        strokeDasharray={isComingSoon ? '3 3' : undefined}
        strokeOpacity={isComingSoon ? 0.6 : 0}
        filter={isHighlit ? `url(#${glowId})` : undefined}
        style={{ transition: 'r 0.2s ease, fill-opacity 0.2s ease' }}
      />

      {/* Star label */}
      <text
        x={cx}
        y={labelY}
        textAnchor="middle"
        fontFamily="'Cinzel', serif"
        fontSize={16}
        fill={isComingSoon ? 'rgba(255,255,255,0.45)' : '#FFFFFF'}
        fontStyle={isComingSoon ? 'italic' : 'normal'}
        opacity={labelOp}
        style={{ transition: 'opacity 0.2s ease', pointerEvents: 'none', userSelect: 'none' }}
      >
        {star.label}
      </text>
    </g>
  )
}
