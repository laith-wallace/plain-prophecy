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

const CANVAS_SIZE = 800
const CENTRE = CANVAS_SIZE / 2       // 400
const MAX_RADIUS = CANVAS_SIZE * 0.42 // 336px

function starCoords(angle: number, distance: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: CENTRE + Math.cos(radians) * (distance * MAX_RADIUS),
    y: CENTRE + Math.sin(radians) * (distance * MAX_RADIUS),
  }
}

// Static starfield — radial gradient dots to suggest depth
function StarfieldBackground() {
  // A set of fixed "background star" positions for depth effect
  const staticStars = [
    { x: 120, y: 80, r: 1 }, { x: 680, y: 100, r: 0.8 }, { x: 200, y: 300, r: 1.2 },
    { x: 720, y: 250, r: 0.7 }, { x: 60, y: 500, r: 1 }, { x: 750, y: 560, r: 0.9 },
    { x: 150, y: 680, r: 1.1 }, { x: 640, y: 720, r: 0.8 }, { x: 380, y: 50, r: 0.7 },
    { x: 420, y: 760, r: 1 }, { x: 50, y: 180, r: 0.8 }, { x: 760, y: 400, r: 0.6 },
    { x: 280, y: 130, r: 0.9 }, { x: 560, y: 650, r: 1.1 }, { x: 100, y: 620, r: 0.7 },
    { x: 700, y: 170, r: 1 }, { x: 320, y: 740, r: 0.8 }, { x: 460, y: 90, r: 0.6 },
    { x: 80, y: 350, r: 1.2 }, { x: 730, y: 680, r: 0.9 }, { x: 190, y: 450, r: 0.7 },
    { x: 610, y: 120, r: 1 }, { x: 50, y: 720, r: 0.8 }, { x: 760, y: 320, r: 0.6 },
    { x: 340, y: 30, r: 0.9 }, { x: 500, y: 770, r: 1.1 },
  ]

  return (
    <g aria-hidden="true">
      <rect
        x={0}
        y={0}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        fill="radial-gradient(ellipse at center, #0D0D1A 0%, #08080F 100%)"
      />
      {staticStars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="rgba(255,255,255,0.25)"
        />
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

  // Close card on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStarId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <style>{`
        .pulsar-map-wrap {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .pulsar-canvas-container {
          width: 100%;
          max-width: min(100vw, 480px);
        }

        .pulsar-canvas {
          display: block;
          width: 100%;
          aspect-ratio: 1;
        }

        /* Star card — mobile: fixed bottom sheet */
        .star-card-wrap {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          padding: 0 16px 24px;
          max-height: 85vh;
          overflow-y: auto;
        }

        /* Desktop: side-by-side layout */
        @media (min-width: 768px) {
          .pulsar-map-wrap {
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            gap: 32px;
          }

          .pulsar-canvas-container {
            flex: 0 0 60%;
            max-width: 60%;
          }

          .star-card-wrap {
            position: sticky;
            top: 80px;
            bottom: auto;
            left: auto;
            right: auto;
            flex: 0 0 38%;
            max-width: 38%;
            padding: 0;
            max-height: calc(100vh - 120px);
            overflow-y: auto;
            z-index: 1;
          }
        }

        @media (min-width: 1280px) {
          .pulsar-canvas-container {
            max-width: 560px;
          }

          .star-card-wrap {
            max-width: 380px;
          }
        }
      `}</style>

      <div className="pulsar-map-wrap">
        {/* SVG canvas */}
        <div className="pulsar-canvas-container">
          <svg
            className="pulsar-canvas"
            viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="God IS Love constellation map — every study orbiting a central truth"
          >
            <defs>
              <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0D0D1A" />
                <stop offset="100%" stopColor="#08080F" />
              </radialGradient>
            </defs>

            {/* Background */}
            <rect
              x={0}
              y={0}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              fill="url(#bg-gradient)"
            />

            {/* Static starfield */}
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
        </div>

        {/* Star card — outside SVG */}
        {activeStar && (
          <div className="star-card-wrap">
            <StarCard star={activeStar} onClose={handleClose} />
          </div>
        )}
      </div>
    </>
  )
}
