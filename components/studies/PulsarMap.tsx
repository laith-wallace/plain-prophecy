'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
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

// ─────────────────────────────────────────────────────────────────────────────
// Milky Way-style starfield — deep navy base, blue nebula band, dense stars
// ─────────────────────────────────────────────────────────────────────────────
function StarfieldBackground() {
  // ── Background stars (spread across full canvas) ──
  // w = white, b = blue-tinted, c = cyan-tinted
  const bgStars = [
    // top-left quadrant
    { x: 42,  y: 58,  r: 0.8, o: 0.5, col: 'w' }, { x: 118, y: 32,  r: 0.6, o: 0.4, col: 'w' },
    { x: 88,  y: 142, r: 1.0, o: 0.55, col: 'b' }, { x: 195, y: 75,  r: 0.7, o: 0.45, col: 'w' },
    { x: 155, y: 198, r: 0.5, o: 0.35, col: 'w' }, { x: 62,  y: 268, r: 1.2, o: 0.6, col: 'b' },
    { x: 228, y: 155, r: 0.6, o: 0.4, col: 'w' },  { x: 310, y: 88,  r: 0.9, o: 0.5, col: 'w' },
    { x: 278, y: 42,  r: 0.7, o: 0.45, col: 'b' }, { x: 42,  y: 380, r: 0.8, o: 0.4, col: 'w' },
    { x: 148, y: 320, r: 1.1, o: 0.55, col: 'b' }, { x: 92,  y: 445, r: 0.6, o: 0.35, col: 'w' },
    { x: 198, y: 412, r: 0.9, o: 0.5, col: 'w' },  { x: 345, y: 165, r: 0.7, o: 0.4, col: 'w' },
    { x: 388, y: 48,  r: 1.3, o: 0.65, col: 'b' }, { x: 268, y: 288, r: 0.5, o: 0.3, col: 'w' },
    // top-right quadrant
    { x: 582, y: 22,  r: 0.8, o: 0.5, col: 'w' },  { x: 648, y: 68,  r: 1.1, o: 0.55, col: 'b' },
    { x: 718, y: 32,  r: 0.6, o: 0.4, col: 'w' },  { x: 785, y: 78,  r: 0.9, o: 0.5, col: 'w' },
    { x: 855, y: 38,  r: 1.4, o: 0.65, col: 'b' }, { x: 922, y: 88,  r: 0.7, o: 0.45, col: 'w' },
    { x: 968, y: 42,  r: 0.5, o: 0.35, col: 'w' }, { x: 935, y: 165, r: 1.0, o: 0.5, col: 'b' },
    { x: 878, y: 228, r: 0.8, o: 0.45, col: 'w' }, { x: 962, y: 295, r: 0.6, o: 0.35, col: 'w' },
    { x: 820, y: 168, r: 1.2, o: 0.6, col: 'b' },  { x: 748, y: 138, r: 0.7, o: 0.4, col: 'w' },
    { x: 688, y: 188, r: 0.9, o: 0.5, col: 'w' },  { x: 558, y: 112, r: 1.5, o: 0.7, col: 'b' },
    { x: 495, y: 42,  r: 0.6, o: 0.4, col: 'w' },  { x: 468, y: 118, r: 0.8, o: 0.45, col: 'w' },
    // bottom-left quadrant
    { x: 55,  y: 628, r: 0.9, o: 0.5, col: 'w' },  { x: 112, y: 692, r: 1.1, o: 0.55, col: 'b' },
    { x: 48,  y: 758, r: 0.6, o: 0.4, col: 'w' },  { x: 168, y: 748, r: 0.8, o: 0.45, col: 'w' },
    { x: 88,  y: 842, r: 1.3, o: 0.6, col: 'b' },  { x: 215, y: 812, r: 0.7, o: 0.4, col: 'w' },
    { x: 148, y: 902, r: 0.5, o: 0.35, col: 'w' }, { x: 58,  y: 928, r: 1.0, o: 0.5, col: 'b' },
    { x: 248, y: 888, r: 0.8, o: 0.45, col: 'w' }, { x: 322, y: 942, r: 1.2, o: 0.6, col: 'w' },
    { x: 178, y: 968, r: 0.6, o: 0.35, col: 'b' }, { x: 298, y: 758, r: 0.9, o: 0.5, col: 'w' },
    { x: 388, y: 828, r: 1.1, o: 0.55, col: 'b' }, { x: 448, y: 908, r: 0.7, o: 0.4, col: 'w' },
    { x: 338, y: 688, r: 0.8, o: 0.45, col: 'w' }, { x: 128, y: 568, r: 1.4, o: 0.65, col: 'b' },
    // bottom-right quadrant
    { x: 618, y: 928, r: 0.9, o: 0.5, col: 'w' },  { x: 698, y: 892, r: 1.1, o: 0.55, col: 'b' },
    { x: 778, y: 948, r: 0.6, o: 0.4, col: 'w' },  { x: 848, y: 908, r: 0.8, o: 0.45, col: 'w' },
    { x: 928, y: 868, r: 1.2, o: 0.6, col: 'b' },  { x: 968, y: 788, r: 0.7, o: 0.4, col: 'w' },
    { x: 942, y: 718, r: 0.5, o: 0.35, col: 'w' }, { x: 878, y: 658, r: 1.0, o: 0.5, col: 'b' },
    { x: 958, y: 558, r: 0.8, o: 0.45, col: 'w' }, { x: 528, y: 968, r: 0.6, o: 0.35, col: 'w' },
    { x: 748, y: 832, r: 1.3, o: 0.6, col: 'b' },  { x: 818, y: 768, r: 0.9, o: 0.5, col: 'w' },
    { x: 558, y: 858, r: 1.1, o: 0.55, col: 'b' }, { x: 468, y: 958, r: 0.7, o: 0.4, col: 'w' },
    // sparse mid-corner fills (top-right and bottom-left dark zones stay dark)
    { x: 858, y: 398, r: 0.8, o: 0.4, col: 'w' },  { x: 918, y: 458, r: 0.6, o: 0.3, col: 'w' },
    { x: 158, y: 548, r: 0.7, o: 0.35, col: 'w' }, { x: 198, y: 628, r: 0.9, o: 0.45, col: 'w' },
  ]

  // ── Nebula band stars — brighter, blue-tinted, denser along the diagonal band
  // Band sweeps from (80,680)→(920,320) — the bright Milky Way diagonal
  const bandStars = [
    // left entry of band
    { x: 95,  y: 648, r: 1.0, o: 0.65, col: 'b' }, { x: 148, y: 602, r: 1.4, o: 0.7, col: 'c' },
    { x: 118, y: 688, r: 0.8, o: 0.6, col: 'b' },   { x: 185, y: 638, r: 1.2, o: 0.65, col: 'b' },
    { x: 162, y: 562, r: 0.9, o: 0.6, col: 'c' },   { x: 228, y: 598, r: 1.5, o: 0.75, col: 'c' },
    { x: 248, y: 548, r: 1.1, o: 0.65, col: 'b' },  { x: 205, y: 718, r: 0.7, o: 0.55, col: 'b' },
    { x: 268, y: 668, r: 1.3, o: 0.7, col: 'c' },   { x: 298, y: 618, r: 0.9, o: 0.6, col: 'b' },
    { x: 315, y: 568, r: 1.6, o: 0.75, col: 'c' },  { x: 338, y: 528, r: 1.0, o: 0.65, col: 'b' },
    // centre-left of band (brightest zone)
    { x: 358, y: 608, r: 1.2, o: 0.7, col: 'c' },   { x: 378, y: 558, r: 1.8, o: 0.8, col: 'c' },
    { x: 398, y: 498, r: 1.0, o: 0.65, col: 'b' },  { x: 418, y: 578, r: 1.4, o: 0.75, col: 'c' },
    { x: 438, y: 528, r: 1.1, o: 0.7, col: 'b' },   { x: 458, y: 478, r: 0.8, o: 0.6, col: 'b' },
    { x: 368, y: 658, r: 1.0, o: 0.6, col: 'b' },   { x: 408, y: 618, r: 1.5, o: 0.75, col: 'c' },
    { x: 448, y: 448, r: 1.3, o: 0.7, col: 'c' },   { x: 388, y: 708, r: 0.7, o: 0.5, col: 'b' },
    // centre of band (around pulsar — stars here will be behind the core glow)
    { x: 478, y: 558, r: 0.9, o: 0.55, col: 'b' },  { x: 488, y: 498, r: 1.2, o: 0.65, col: 'c' },
    { x: 508, y: 448, r: 0.8, o: 0.55, col: 'b' },  { x: 518, y: 548, r: 1.0, o: 0.6, col: 'b' },
    { x: 538, y: 498, r: 1.4, o: 0.7, col: 'c' },   { x: 558, y: 448, r: 0.9, o: 0.6, col: 'b' },
    { x: 468, y: 608, r: 0.7, o: 0.5, col: 'b' },   { x: 528, y: 578, r: 1.1, o: 0.65, col: 'c' },
    // centre-right of band
    { x: 578, y: 528, r: 1.3, o: 0.7, col: 'c' },   { x: 598, y: 478, r: 0.9, o: 0.6, col: 'b' },
    { x: 618, y: 428, r: 1.6, o: 0.75, col: 'c' },  { x: 638, y: 498, r: 1.1, o: 0.65, col: 'b' },
    { x: 658, y: 448, r: 0.8, o: 0.55, col: 'b' },  { x: 678, y: 398, r: 1.4, o: 0.7, col: 'c' },
    { x: 588, y: 568, r: 0.7, o: 0.5, col: 'b' },   { x: 628, y: 538, r: 1.2, o: 0.65, col: 'c' },
    { x: 668, y: 508, r: 0.9, o: 0.6, col: 'b' },   { x: 648, y: 358, r: 1.0, o: 0.6, col: 'b' },
    // right entry of band
    { x: 698, y: 448, r: 1.1, o: 0.65, col: 'c' },  { x: 718, y: 398, r: 1.5, o: 0.75, col: 'c' },
    { x: 738, y: 348, r: 0.9, o: 0.6, col: 'b' },   { x: 758, y: 418, r: 1.3, o: 0.7, col: 'c' },
    { x: 778, y: 368, r: 1.0, o: 0.65, col: 'b' },  { x: 798, y: 318, r: 1.7, o: 0.8, col: 'c' },
    { x: 818, y: 388, r: 0.8, o: 0.55, col: 'b' },  { x: 838, y: 338, r: 1.2, o: 0.65, col: 'c' },
    { x: 858, y: 288, r: 0.9, o: 0.6, col: 'b' },   { x: 878, y: 358, r: 1.4, o: 0.7, col: 'c' },
    { x: 898, y: 308, r: 1.0, o: 0.6, col: 'b' },   { x: 918, y: 358, r: 0.7, o: 0.5, col: 'b' },
    { x: 708, y: 478, r: 0.8, o: 0.5, col: 'b' },   { x: 748, y: 458, r: 1.1, o: 0.6, col: 'c' },
  ]

  // ── Bright highlight stars — the shining points in the reference ──
  const brightStars = [
    { x: 228, y: 588, r: 2.8, o: 0.95, col: 'c' },
    { x: 378, y: 528, r: 2.2, o: 0.9, col: 'c' },
    { x: 548, y: 458, r: 2.5, o: 0.95, col: 'c' },
    { x: 708, y: 398, r: 2.0, o: 0.85, col: 'c' },
    { x: 818, y: 328, r: 2.8, o: 0.95, col: 'c' },
    { x: 148, y: 628, r: 1.8, o: 0.8, col: 'c' },
    { x: 458, y: 488, r: 1.6, o: 0.75, col: 'c' },
    { x: 628, y: 428, r: 2.2, o: 0.9, col: 'c' },
    { x: 938, y: 298, r: 1.5, o: 0.75, col: 'c' },
    // scattered brights outside the band
    { x: 388, y: 88,  r: 2.0, o: 0.85, col: 'w' },
    { x: 848, y: 122, r: 1.8, o: 0.8, col: 'b' },
    { x: 68,  y: 798, r: 1.8, o: 0.8, col: 'w' },
    { x: 888, y: 798, r: 2.0, o: 0.85, col: 'b' },
    { x: 218, y: 878, r: 1.6, o: 0.75, col: 'w' },
    { x: 778, y: 858, r: 1.8, o: 0.8, col: 'b' },
  ]

  const colourMap = {
    w: (o: number) => `rgba(255,255,255,${o})`,
    b: (o: number) => `rgba(160,200,255,${o})`,
    c: (o: number) => `rgba(100,220,255,${o})`,
  }

  const allStars = [...bgStars, ...bandStars]

  return (
    <g aria-hidden="true">
      {/* Render all small stars */}
      {allStars.map((s, i) => (
        <circle
          key={i}
          cx={s.x} cy={s.y} r={s.r}
          fill={colourMap[s.col as keyof typeof colourMap](s.o)}
        />
      ))}

      {/* Bright highlight stars with a glow halo */}
      {brightStars.map((s, i) => (
        <g key={`bright-${i}`}>
          {/* Soft glow bloom */}
          <circle
            cx={s.x} cy={s.y}
            r={s.r * 4}
            fill={colourMap[s.col as keyof typeof colourMap](0.12)}
          />
          <circle
            cx={s.x} cy={s.y}
            r={s.r * 2.2}
            fill={colourMap[s.col as keyof typeof colourMap](0.28)}
          />
          {/* Hard bright core */}
          <circle
            cx={s.x} cy={s.y}
            r={s.r}
            fill={colourMap[s.col as keyof typeof colourMap](s.o)}
          />
        </g>
      ))}
    </g>
  )
}

const DRAG_THRESHOLD = 4 // px — movement required to count as a drag

export default function PulsarMap({ data }: PulsarMapProps) {
  const [activeStarId, setActiveStarId] = useState<string | null>(null)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef<{ px: number; py: number; ox: number; oy: number } | null>(null)
  const hasDragged = useRef(false)
  // Stable ref to current pan so the window listener doesn't need pan as a dep
  const panRef = useRef(pan)
  panRef.current = pan

  const activeStar: PulsarStar | undefined = activeStarId
    ? data.stars.find(s => s.id === activeStarId)
    : undefined

  const handleStarClick = useCallback((id: string) => {
    if (hasDragged.current) {
      hasDragged.current = false
      return
    }
    setActiveStarId((prev: string | null) => (prev === id ? null : id))
  }, [])

  const handleClose = useCallback(() => {
    setActiveStarId(null)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('a, button')) return
    const { x, y } = panRef.current
    dragStart.current = { px: e.clientX, py: e.clientY, ox: x, oy: y }
    hasDragged.current = false
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStarId(null)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragStart.current) return
      const dx = e.clientX - dragStart.current.px
      const dy = e.clientY - dragStart.current.py
      if (!hasDragged.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      hasDragged.current = true
      if (!isDragging) setIsDragging(true)
      setPan({ x: dragStart.current.ox + dx, y: dragStart.current.oy + dy })
    }
    const onUp = () => {
      if (dragStart.current) {
        dragStart.current = null
        setIsDragging(false)
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [isDragging])

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <svg
        viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          willChange: 'transform',
        }}
        role="img"
        aria-label="God IS Love constellation map — every study orbiting a central truth"
      >
        <defs>
          {/* ── Deep space base — very dark navy ── */}
          <radialGradient id="bg-deep" cx="50%" cy="50%" r="70%">
            <stop offset="0%"   stopColor="#060D1E" />
            <stop offset="60%"  stopColor="#030810" />
            <stop offset="100%" stopColor="#010408" />
          </radialGradient>

          {/*
           * ── Milky Way nebula band ──
           * Diagonal sweep from lower-left to upper-right.
           * Three overlapping gradients to build the luminous band.
           */}

          {/* Main band — left-centre glow (brightest zone) */}
          <radialGradient id="band-left" cx="28%" cy="62%" r="38%">
            <stop offset="0%"   stopColor="rgba(20,80,180,0.30)" />
            <stop offset="35%"  stopColor="rgba(10,50,130,0.18)" />
            <stop offset="70%"  stopColor="rgba(5,25,70,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Main band — centre glow */}
          <radialGradient id="band-centre" cx="52%" cy="50%" r="35%">
            <stop offset="0%"   stopColor="rgba(15,70,170,0.28)" />
            <stop offset="40%"  stopColor="rgba(8,45,120,0.16)" />
            <stop offset="75%"  stopColor="rgba(4,20,60,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Main band — right glow */}
          <radialGradient id="band-right" cx="76%" cy="38%" r="34%">
            <stop offset="0%"   stopColor="rgba(18,75,175,0.26)" />
            <stop offset="40%"  stopColor="rgba(10,48,125,0.15)" />
            <stop offset="75%"  stopColor="rgba(5,22,65,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Cyan hot-spot 1 — left cluster */}
          <radialGradient id="hot1" cx="24%" cy="60%" r="16%">
            <stop offset="0%"   stopColor="rgba(0,160,240,0.28)" />
            <stop offset="40%"  stopColor="rgba(0,100,180,0.14)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Cyan hot-spot 2 — centre-right cluster */}
          <radialGradient id="hot2" cx="68%" cy="42%" r="14%">
            <stop offset="0%"   stopColor="rgba(0,180,255,0.26)" />
            <stop offset="40%"  stopColor="rgba(0,110,190,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Cyan hot-spot 3 — far-right cluster (faint) */}
          <radialGradient id="hot3" cx="88%" cy="30%" r="12%">
            <stop offset="0%"   stopColor="rgba(0,150,220,0.20)" />
            <stop offset="50%"  stopColor="rgba(0,90,160,0.09)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>

          {/* Pulsar gold glow — keeps the gold accent at the centre */}
          <radialGradient id="pulsar-gold-glow" cx="50%" cy="50%" r="22%">
            <stop offset="0%"   stopColor="rgba(201,168,76,0.20)" />
            <stop offset="35%"  stopColor="rgba(160,110,30,0.10)" />
            <stop offset="70%"  stopColor="rgba(80,55,15,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* ── 1. Base deep-space background ── */}
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#bg-deep)" />

        {/* ── 2. Milky Way nebula band ── */}
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#band-left)" />
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#band-centre)" />
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#band-right)" />

        {/* ── 3. Cyan hot spots (bright star clusters) ── */}
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#hot1)" />
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#hot2)" />
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#hot3)" />

        {/* ── 4. Dense starfield ── */}
        <StarfieldBackground />

        {/* ── 5. Pulsar gold warmth (over the cold blue nebula) ── */}
        <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#pulsar-gold-glow)" />

        {/* ── 6. Constellation lines ── */}
        {data.stars.map(star => {
          const { x, y } = starCoords(star.angle, star.distance)
          return (
            <ConstellationLine
              key={star.id}
              x1={CENTRE} y1={CENTRE}
              x2={x} y2={y}
              active={activeStarId === star.id}
              category={star.category}
            />
          )
        })}

        {/* ── 7. Study star nodes ── */}
        {data.stars.map(star => {
          const { x, y } = starCoords(star.angle, star.distance)
          return (
            <ConstellationStar
              key={star.id}
              star={star}
              cx={x} cy={y}
              isActive={activeStarId === star.id}
              onClick={() => handleStarClick(star.id)}
            />
          )
        })}

        {/* ── 8. Pulsar core — always on top ── */}
        <PulsarCore cx={CENTRE} cy={CENTRE} />
      </svg>

      {/* Star card — outside SVG */}
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
