'use client'

import { useState, useCallback, useEffect } from 'react'
import { PulsarMapData, PulsarStar } from '@/data/pulsar-map'
import PulsarCore from './PulsarCore'
import ConstellationLine from './ConstellationLine'
import ConstellationStar from './ConstellationStar'
import StarCard from './StarCard'

interface PulsarMapProps {
  data: PulsarMapData
}

const CANVAS_SIZE = 1000
const CENTRE = CANVAS_SIZE / 2        // 500
const MAX_RADIUS = CANVAS_SIZE * 0.40  // 400px

function starCoords(angle: number, distance: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: CENTRE + Math.cos(radians) * (distance * MAX_RADIUS),
    y: CENTRE + Math.sin(radians) * (distance * MAX_RADIUS),
  }
}

// Static starfield background — varying sizes for depth
function StarfieldBackground() {
  const stars = [
    { x: 48,  y: 62,  r: 1.5, o: 0.6 }, { x: 142, y: 38,  r: 0.8, o: 0.4 },
    { x: 234, y: 110, r: 1.2, o: 0.5 }, { x: 312, y: 28,  r: 0.6, o: 0.35 },
    { x: 415, y: 55,  r: 1.8, o: 0.7 }, { x: 520, y: 18,  r: 0.9, o: 0.45 },
    { x: 634, y: 72,  r: 1.3, o: 0.55 }, { x: 728, y: 35,  r: 0.7, o: 0.4 },
    { x: 820, y: 88,  r: 1.6, o: 0.6 }, { x: 912, y: 44,  r: 1.0, o: 0.5 },
    { x: 968, y: 130, r: 0.8, o: 0.35 }, { x: 22,  y: 200, r: 1.4, o: 0.55 },
    { x: 88,  y: 310, r: 0.7, o: 0.3 }, { x: 25,  y: 450, r: 1.9, o: 0.65 },
    { x: 72,  y: 580, r: 0.8, o: 0.4 }, { x: 18,  y: 700, r: 1.2, o: 0.5 },
    { x: 55,  y: 820, r: 0.6, o: 0.35 }, { x: 30,  y: 930, r: 1.5, o: 0.6 },
    { x: 950, y: 220, r: 1.1, o: 0.5 }, { x: 980, y: 380, r: 0.7, o: 0.35 },
    { x: 960, y: 520, r: 1.8, o: 0.7 }, { x: 975, y: 650, r: 0.9, o: 0.45 },
    { x: 945, y: 780, r: 1.3, o: 0.55 }, { x: 965, y: 900, r: 0.6, o: 0.3 },
    { x: 160, y: 940, r: 1.7, o: 0.65 }, { x: 280, y: 970, r: 0.8, o: 0.4 },
    { x: 400, y: 950, r: 1.2, o: 0.5 }, { x: 530, y: 978, r: 0.7, o: 0.35 },
    { x: 660, y: 955, r: 1.5, o: 0.6 }, { x: 790, y: 968, r: 1.0, o: 0.45 },
    { x: 880, y: 942, r: 0.8, o: 0.35 }, { x: 180, y: 180, r: 0.9, o: 0.3 },
    { x: 780, y: 160, r: 1.1, o: 0.45 }, { x: 820, y: 820, r: 0.8, o: 0.35 },
    { x: 190, y: 810, r: 1.3, o: 0.5 }, { x: 340, y: 870, r: 0.7, o: 0.3 },
    { x: 680, y: 860, r: 1.0, o: 0.4 }, { x: 120, y: 550, r: 0.6, o: 0.25 },
    { x: 880, y: 490, r: 1.2, o: 0.5 }, { x: 760, y: 680, r: 0.8, o: 0.35 },
    { x: 240, y: 640, r: 1.4, o: 0.55 }, { x: 860, y: 300, r: 0.7, o: 0.3 },
    { x: 148, y: 748, r: 1.0, o: 0.4 }, { x: 740, y: 420, r: 0.6, o: 0.25 },
    { x: 390, y: 140, r: 1.6, o: 0.6 }, { x: 610, y: 880, r: 0.9, o: 0.4 },
    { x: 500, y: 160, r: 0.7, o: 0.3 }, { x: 470, y: 840, r: 1.1, o: 0.45 },
  ]

  return (
    <g aria-hidden="true">
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={`rgba(255,255,255,${s.o})`} />
      ))}
    </g>
  )
}

export default function PulsarMap({ data }: PulsarMapProps) {
  const [activeStarId, setActiveStarId] = useState<string | null>(null)

  const activeStar: PulsarStar | undefined = activeStarId
    ? data.stars.find(s => s.id === activeStarId)
    : undefined

  const handleStarClick = useCallback((id: string) => {
    setActiveStarId((prev: string | null) => (prev === id ? null : id))
  }, [])

  const handleClose = useCallback(() => {
    setActiveStarId(null)
  }, [])

  // Escape key closes card
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStarId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Fullscreen SVG canvas */}
      <svg
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        role="img"
        aria-label="God IS Love constellation map — every study orbiting a central truth"
      >
        <defs>
          {/* Deep space background */}
          <radialGradient id="bg-deep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0E0C1A" />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>

          {/* Central nebula glow — warm gold emanating from pulsar */}
          <radialGradient id="nebula-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="rgba(201,168,76,0.18)" />
            <stop offset="18%" stopColor="rgba(160,100,30,0.10)" />
            <stop offset="40%" stopColor="rgba(60,40,100,0.07)" />
            <stop offset="70%" stopColor="rgba(20,15,50,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Ambient purple nebula off-centre for depth */}
          <radialGradient id="nebula-ambient" cx="35%" cy="60%" r="50%">
            <stop offset="0%"  stopColor="rgba(80,50,160,0.09)" />
            <stop offset="50%" stopColor="rgba(40,25,80,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* Base background */}
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#bg-deep)" />

        {/* Ambient purple nebula */}
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#nebula-ambient)" />

        {/* Central gold nebula glow */}
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#nebula-core)" />

        {/* Starfield */}
        <StarfieldBackground />

        {/* Constellation lines — behind stars */}
        {data.stars.map(star => {
          const { x, y } = starCoords(star.angle, star.distance)
          return (
            <ConstellationLine
              key={star.id}
              x1={CENTRE}
              y1={CENTRE}
              x2={x}
              y2={y}
              active={activeStarId === star.id}
              category={star.category}
            />
          )
        })}

        {/* Star nodes — on top of lines */}
        {data.stars.map(star => {
          const { x, y } = starCoords(star.angle, star.distance)
          return (
            <ConstellationStar
              key={star.id}
              star={star}
              cx={x}
              cy={y}
              isActive={activeStarId === star.id}
              onClick={() => handleStarClick(star.id)}
            />
          )
        })}

        {/* Pulsar core — always on top */}
        <PulsarCore cx={CENTRE} cy={CENTRE} />
      </svg>

      {/* Star card — outside SVG, positioned absolutely */}
      {activeStar && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '0 16px 24px',
          }}
          className="star-card-wrap"
        >
          <StarCard star={activeStar} onClose={handleClose} />
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .star-card-wrap {
            top: 50% !important;
            bottom: auto !important;
            left: auto !important;
            right: 24px !important;
            transform: translateY(-50%);
            width: 360px;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
