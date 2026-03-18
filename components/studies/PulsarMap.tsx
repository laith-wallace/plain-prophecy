'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { PulsarMapData } from '@/data/pulsar-map'
import PulsarCore from './PulsarCore'
import ConstellationLine from './ConstellationLine'
import ConstellationStar from './ConstellationStar'
import StarCard from './StarCard'

interface PulsarMapProps {
  data: PulsarMapData
}

const CANVAS_SIZE = 1000
const CENTRE      = CANVAS_SIZE / 2
const MAX_RADIUS  = CANVAS_SIZE * 0.40
const MIN_ZOOM    = 0.2
const MAX_ZOOM    = 8
const DRAG_THRESHOLD = 4

function starCoords(angle: number, distance: number) {
  const radians = ((angle - 90) * Math.PI) / 180
  return {
    x: CENTRE + Math.cos(radians) * (distance * MAX_RADIUS),
    y: CENTRE + Math.sin(radians) * (distance * MAX_RADIUS),
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Milky Way starfield — all coords in 0–1000 space
// ─────────────────────────────────────────────────────────────────────────────
function StarfieldBackground() {
  const bgStars = [
    { x: 42,  y: 58,  r: 0.8, o: 0.5,  col: 'w' }, { x: 118, y: 32,  r: 0.6, o: 0.4,  col: 'w' },
    { x: 88,  y: 142, r: 1.0, o: 0.55, col: 'b' }, { x: 195, y: 75,  r: 0.7, o: 0.45, col: 'w' },
    { x: 155, y: 198, r: 0.5, o: 0.35, col: 'w' }, { x: 62,  y: 268, r: 1.2, o: 0.6,  col: 'b' },
    { x: 228, y: 155, r: 0.6, o: 0.4,  col: 'w' }, { x: 310, y: 88,  r: 0.9, o: 0.5,  col: 'w' },
    { x: 278, y: 42,  r: 0.7, o: 0.45, col: 'b' }, { x: 42,  y: 380, r: 0.8, o: 0.4,  col: 'w' },
    { x: 148, y: 320, r: 1.1, o: 0.55, col: 'b' }, { x: 92,  y: 445, r: 0.6, o: 0.35, col: 'w' },
    { x: 198, y: 412, r: 0.9, o: 0.5,  col: 'w' }, { x: 345, y: 165, r: 0.7, o: 0.4,  col: 'w' },
    { x: 388, y: 48,  r: 1.3, o: 0.65, col: 'b' }, { x: 268, y: 288, r: 0.5, o: 0.3,  col: 'w' },
    { x: 582, y: 22,  r: 0.8, o: 0.5,  col: 'w' }, { x: 648, y: 68,  r: 1.1, o: 0.55, col: 'b' },
    { x: 718, y: 32,  r: 0.6, o: 0.4,  col: 'w' }, { x: 785, y: 78,  r: 0.9, o: 0.5,  col: 'w' },
    { x: 855, y: 38,  r: 1.4, o: 0.65, col: 'b' }, { x: 922, y: 88,  r: 0.7, o: 0.45, col: 'w' },
    { x: 968, y: 42,  r: 0.5, o: 0.35, col: 'w' }, { x: 935, y: 165, r: 1.0, o: 0.5,  col: 'b' },
    { x: 878, y: 228, r: 0.8, o: 0.45, col: 'w' }, { x: 962, y: 295, r: 0.6, o: 0.35, col: 'w' },
    { x: 820, y: 168, r: 1.2, o: 0.6,  col: 'b' }, { x: 748, y: 138, r: 0.7, o: 0.4,  col: 'w' },
    { x: 688, y: 188, r: 0.9, o: 0.5,  col: 'w' }, { x: 558, y: 112, r: 1.5, o: 0.7,  col: 'b' },
    { x: 495, y: 42,  r: 0.6, o: 0.4,  col: 'w' }, { x: 468, y: 118, r: 0.8, o: 0.45, col: 'w' },
    { x: 55,  y: 628, r: 0.9, o: 0.5,  col: 'w' }, { x: 112, y: 692, r: 1.1, o: 0.55, col: 'b' },
    { x: 48,  y: 758, r: 0.6, o: 0.4,  col: 'w' }, { x: 168, y: 748, r: 0.8, o: 0.45, col: 'w' },
    { x: 88,  y: 842, r: 1.3, o: 0.6,  col: 'b' }, { x: 215, y: 812, r: 0.7, o: 0.4,  col: 'w' },
    { x: 148, y: 902, r: 0.5, o: 0.35, col: 'w' }, { x: 58,  y: 928, r: 1.0, o: 0.5,  col: 'b' },
    { x: 248, y: 888, r: 0.8, o: 0.45, col: 'w' }, { x: 322, y: 942, r: 1.2, o: 0.6,  col: 'w' },
    { x: 178, y: 968, r: 0.6, o: 0.35, col: 'b' }, { x: 298, y: 758, r: 0.9, o: 0.5,  col: 'w' },
    { x: 388, y: 828, r: 1.1, o: 0.55, col: 'b' }, { x: 448, y: 908, r: 0.7, o: 0.4,  col: 'w' },
    { x: 338, y: 688, r: 0.8, o: 0.45, col: 'w' }, { x: 128, y: 568, r: 1.4, o: 0.65, col: 'b' },
    { x: 618, y: 928, r: 0.9, o: 0.5,  col: 'w' }, { x: 698, y: 892, r: 1.1, o: 0.55, col: 'b' },
    { x: 778, y: 948, r: 0.6, o: 0.4,  col: 'w' }, { x: 848, y: 908, r: 0.8, o: 0.45, col: 'w' },
    { x: 928, y: 868, r: 1.2, o: 0.6,  col: 'b' }, { x: 968, y: 788, r: 0.7, o: 0.4,  col: 'w' },
    { x: 942, y: 718, r: 0.5, o: 0.35, col: 'w' }, { x: 878, y: 658, r: 1.0, o: 0.5,  col: 'b' },
    { x: 958, y: 558, r: 0.8, o: 0.45, col: 'w' }, { x: 528, y: 968, r: 0.6, o: 0.35, col: 'w' },
    { x: 748, y: 832, r: 1.3, o: 0.6,  col: 'b' }, { x: 818, y: 768, r: 0.9, o: 0.5,  col: 'w' },
    { x: 558, y: 858, r: 1.1, o: 0.55, col: 'b' }, { x: 468, y: 958, r: 0.7, o: 0.4,  col: 'w' },
    { x: 858, y: 398, r: 0.8, o: 0.4,  col: 'w' }, { x: 918, y: 458, r: 0.6, o: 0.3,  col: 'w' },
    { x: 158, y: 548, r: 0.7, o: 0.35, col: 'w' }, { x: 198, y: 628, r: 0.9, o: 0.45, col: 'w' },
  ]
  const bandStars = [
    { x: 95,  y: 648, r: 1.0, o: 0.65, col: 'b' }, { x: 148, y: 602, r: 1.4, o: 0.7,  col: 'c' },
    { x: 118, y: 688, r: 0.8, o: 0.6,  col: 'b' }, { x: 185, y: 638, r: 1.2, o: 0.65, col: 'b' },
    { x: 162, y: 562, r: 0.9, o: 0.6,  col: 'c' }, { x: 228, y: 598, r: 1.5, o: 0.75, col: 'c' },
    { x: 248, y: 548, r: 1.1, o: 0.65, col: 'b' }, { x: 205, y: 718, r: 0.7, o: 0.55, col: 'b' },
    { x: 268, y: 668, r: 1.3, o: 0.7,  col: 'c' }, { x: 298, y: 618, r: 0.9, o: 0.6,  col: 'b' },
    { x: 315, y: 568, r: 1.6, o: 0.75, col: 'c' }, { x: 338, y: 528, r: 1.0, o: 0.65, col: 'b' },
    { x: 358, y: 608, r: 1.2, o: 0.7,  col: 'c' }, { x: 378, y: 558, r: 1.8, o: 0.8,  col: 'c' },
    { x: 398, y: 498, r: 1.0, o: 0.65, col: 'b' }, { x: 418, y: 578, r: 1.4, o: 0.75, col: 'c' },
    { x: 438, y: 528, r: 1.1, o: 0.7,  col: 'b' }, { x: 458, y: 478, r: 0.8, o: 0.6,  col: 'b' },
    { x: 368, y: 658, r: 1.0, o: 0.6,  col: 'b' }, { x: 408, y: 618, r: 1.5, o: 0.75, col: 'c' },
    { x: 448, y: 448, r: 1.3, o: 0.7,  col: 'c' }, { x: 388, y: 708, r: 0.7, o: 0.5,  col: 'b' },
    { x: 478, y: 558, r: 0.9, o: 0.55, col: 'b' }, { x: 488, y: 498, r: 1.2, o: 0.65, col: 'c' },
    { x: 508, y: 448, r: 0.8, o: 0.55, col: 'b' }, { x: 518, y: 548, r: 1.0, o: 0.6,  col: 'b' },
    { x: 538, y: 498, r: 1.4, o: 0.7,  col: 'c' }, { x: 558, y: 448, r: 0.9, o: 0.6,  col: 'b' },
    { x: 468, y: 608, r: 0.7, o: 0.5,  col: 'b' }, { x: 528, y: 578, r: 1.1, o: 0.65, col: 'c' },
    { x: 578, y: 528, r: 1.3, o: 0.7,  col: 'c' }, { x: 598, y: 478, r: 0.9, o: 0.6,  col: 'b' },
    { x: 618, y: 428, r: 1.6, o: 0.75, col: 'c' }, { x: 638, y: 498, r: 1.1, o: 0.65, col: 'b' },
    { x: 658, y: 448, r: 0.8, o: 0.55, col: 'b' }, { x: 678, y: 398, r: 1.4, o: 0.7,  col: 'c' },
    { x: 588, y: 568, r: 0.7, o: 0.5,  col: 'b' }, { x: 628, y: 538, r: 1.2, o: 0.65, col: 'c' },
    { x: 668, y: 508, r: 0.9, o: 0.6,  col: 'b' }, { x: 648, y: 358, r: 1.0, o: 0.6,  col: 'b' },
    { x: 698, y: 448, r: 1.1, o: 0.65, col: 'c' }, { x: 718, y: 398, r: 1.5, o: 0.75, col: 'c' },
    { x: 738, y: 348, r: 0.9, o: 0.6,  col: 'b' }, { x: 758, y: 418, r: 1.3, o: 0.7,  col: 'c' },
    { x: 778, y: 368, r: 1.0, o: 0.65, col: 'b' }, { x: 798, y: 318, r: 1.7, o: 0.8,  col: 'c' },
    { x: 818, y: 388, r: 0.8, o: 0.55, col: 'b' }, { x: 838, y: 338, r: 1.2, o: 0.65, col: 'c' },
    { x: 858, y: 288, r: 0.9, o: 0.6,  col: 'b' }, { x: 878, y: 358, r: 1.4, o: 0.7,  col: 'c' },
    { x: 898, y: 308, r: 1.0, o: 0.6,  col: 'b' }, { x: 918, y: 358, r: 0.7, o: 0.5,  col: 'b' },
    { x: 708, y: 478, r: 0.8, o: 0.5,  col: 'b' }, { x: 748, y: 458, r: 1.1, o: 0.6,  col: 'c' },
  ]
  const brightStars = [
    { x: 228, y: 588, r: 2.8, o: 0.95, col: 'c' }, { x: 378, y: 528, r: 2.2, o: 0.9, col: 'c' },
    { x: 548, y: 458, r: 2.5, o: 0.95, col: 'c' }, { x: 708, y: 398, r: 2.0, o: 0.85, col: 'c' },
    { x: 818, y: 328, r: 2.8, o: 0.95, col: 'c' }, { x: 148, y: 628, r: 1.8, o: 0.8, col: 'c' },
    { x: 458, y: 488, r: 1.6, o: 0.75, col: 'c' }, { x: 628, y: 428, r: 2.2, o: 0.9, col: 'c' },
    { x: 938, y: 298, r: 1.5, o: 0.75, col: 'c' }, { x: 388, y: 88,  r: 2.0, o: 0.85, col: 'w' },
    { x: 848, y: 122, r: 1.8, o: 0.8,  col: 'b' }, { x: 68,  y: 798, r: 1.8, o: 0.8, col: 'w' },
    { x: 888, y: 798, r: 2.0, o: 0.85, col: 'b' }, { x: 218, y: 878, r: 1.6, o: 0.75, col: 'w' },
    { x: 778, y: 858, r: 1.8, o: 0.8,  col: 'b' },
  ]
  const colourMap = {
    w: (o: number) => `rgba(255,255,255,${o})`,
    b: (o: number) => `rgba(160,200,255,${o})`,
    c: (o: number) => `rgba(100,220,255,${o})`,
  }
  return (
    <g aria-hidden="true">
      {[...bgStars, ...bandStars].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={colourMap[s.col as keyof typeof colourMap](s.o)} />
      ))}
      {brightStars.map((s, i) => (
        <g key={`b${i}`}>
          <circle cx={s.x} cy={s.y} r={s.r * 4}   fill={colourMap[s.col as keyof typeof colourMap](0.12)} />
          <circle cx={s.x} cy={s.y} r={s.r * 2.2} fill={colourMap[s.col as keyof typeof colourMap](0.28)} />
          <circle cx={s.x} cy={s.y} r={s.r}        fill={colourMap[s.col as keyof typeof colourMap](s.o)} />
        </g>
      ))}
    </g>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
const ZOOM_BTN: React.CSSProperties = {
  width: 36, height: 36,
  background: 'rgba(10,10,15,0.8)',
  border: '1px solid rgba(201,168,76,0.3)',
  borderRadius: 8,
  color: 'rgba(201,168,76,0.85)',
  fontSize: 20, fontWeight: 300, lineHeight: 1,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(8px)',
  transition: 'border-color 0.12s, color 0.12s',
}

// ─────────────────────────────────────────────────────────────────────────────
export default function PulsarMap({ data }: PulsarMapProps) {
  const containerRef    = useRef<HTMLDivElement>(null)
  const contentGroupRef = useRef<SVGGElement>(null)

  // ── Transform stored as plain ref — zero React re-renders during pan/zoom ──
  const T    = useRef({ x: 0, y: 0, k: 1 })
  const initT = useRef({ x: 0, y: 0, k: 1 }) // saved initial (for reset)
  const raf  = useRef<number | null>(null)

  // ── Minimal React state ──────────────────────────────────────────────────
  const [activeStarId, setActiveStarId] = useState<string | null>(null)
  const [showReset,    setShowReset]    = useState(false)
  const showResetRef = useRef(false)

  // ── Drag / pinch refs ────────────────────────────────────────────────────
  const drag  = useRef<{ ox: number; oy: number; px: number; py: number } | null>(null)
  const pinch = useRef<{ dist: number; cx: number; cy: number } | null>(null)
  const moved = useRef(false)

  // ── Commit transform directly to DOM ────────────────────────────────────
  const commit = useCallback(() => {
    const g = contentGroupRef.current
    if (!g) return
    const { x, y, k } = T.current
    g.style.transform = `translate(${x}px, ${y}px) scale(${k})`

    // Only trigger React re-render when reset-button visibility changes
    const needReset = (
      Math.abs(x - initT.current.x) > 5 ||
      Math.abs(y - initT.current.y) > 5 ||
      Math.abs(k - initT.current.k) > 0.05
    )
    if (needReset !== showResetRef.current) {
      showResetRef.current = needReset
      setShowReset(needReset)
    }
  }, [])

  // ── Schedule a single rAF commit (Figma-style batching) ─────────────────
  const flush = useCallback(() => {
    if (raf.current !== null) return
    raf.current = requestAnimationFrame(() => {
      raf.current = null
      commit()
    })
  }, [commit])

  // ── Zoom toward a screen-space point ────────────────────────────────────
  const zoomTo = useCallback((cx: number, cy: number, newK: number) => {
    newK = Math.min(Math.max(newK, MIN_ZOOM), MAX_ZOOM)
    const ratio = newK / T.current.k
    T.current = {
      x: cx - (cx - T.current.x) * ratio,
      y: cy - (cy - T.current.y) * ratio,
      k: newK,
    }
    flush()
  }, [flush])

  // ── Compute and apply initial "fit to screen" transform ─────────────────
  const resetView = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width: W, height: H } = el.getBoundingClientRect()
    if (!W || !H) return
    const isMobile = W < 768
    // Mobile: zoom in so the core + nearest stars fill the viewport width.
    // Desktop: show the whole map with breathing room.
    const fitK = Math.min(W / CANVAS_SIZE, H / CANVAS_SIZE)
    const k = isMobile ? fitK * 1.35 : fitK * 0.85
    const x = (W - CANVAS_SIZE * k) / 2
    const y = (H - CANVAS_SIZE * k) / 2
    T.current    = { x, y, k }
    initT.current = { x, y, k }
    commit() // immediate — no rAF delay on first render
  }, [commit])

  // ── Measure container on mount + resize ─────────────────────────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    resetView()
    const ro = new ResizeObserver(resetView)
    ro.observe(el)
    return () => ro.disconnect()
  }, [resetView])

  // ── All event listeners in one effect ───────────────────────────────────
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as Element).closest('a, button')) return
      if (pinch.current) return
      drag.current  = { ox: T.current.x, oy: T.current.y, px: e.clientX, py: e.clientY }
      moved.current = false
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current) return
      const dx = e.clientX - drag.current.px
      const dy = e.clientY - drag.current.py
      if (!moved.current && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      if (!moved.current) { moved.current = true; el.style.cursor = 'grabbing' }
      T.current = { ...T.current, x: drag.current.ox + dx, y: drag.current.oy + dy }
      flush()
    }

    const onPointerUp = () => {
      if (drag.current) { drag.current = null; el.style.cursor = 'grab' }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const cx   = e.clientX - rect.left
      const cy   = e.clientY - rect.top
      // ctrlKey = true on trackpad pinch; use tighter sensitivity for mouse wheel
      const sensitivity = e.ctrlKey ? 0.012 : 0.0008
      const factor = Math.exp(-e.deltaY * sensitivity)
      zoomTo(cx, cy, T.current.k * factor)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return
      drag.current = null
      const [t1, t2] = [e.touches[0], e.touches[1]]
      pinch.current = {
        dist: Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY),
        cx:   (t1.clientX + t2.clientX) / 2,
        cy:   (t1.clientY + t2.clientY) / 2,
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinch.current) return
      e.preventDefault()
      const [t1, t2] = [e.touches[0], e.touches[1]]
      const newDist  = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      const rect     = el.getBoundingClientRect()
      const cx       = (t1.clientX + t2.clientX) / 2 - rect.left
      const cy       = (t1.clientY + t2.clientY) / 2 - rect.top
      zoomTo(cx, cy, T.current.k * (newDist / pinch.current.dist))
      pinch.current = { dist: newDist, cx, cy }
    }

    const onTouchEnd = () => { pinch.current = null }

    const onKey = (e: KeyboardEvent) => {
      const rect = el.getBoundingClientRect()
      const cx   = rect.width / 2
      const cy   = rect.height / 2
      if (e.key === 'Escape') setActiveStarId(null)
      if (e.key === '+' || e.key === '=') zoomTo(cx, cy, T.current.k * 1.3)
      if (e.key === '-')                  zoomTo(cx, cy, T.current.k / 1.3)
      if (e.key === '0')                  resetView()
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup',   onPointerUp)
    window.addEventListener('keydown',     onKey)
    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('wheel',       onWheel,      { passive: false })
    el.addEventListener('touchstart',  onTouchStart, { passive: true })
    el.addEventListener('touchmove',   onTouchMove,  { passive: false })
    el.addEventListener('touchend',    onTouchEnd)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup',   onPointerUp)
      window.removeEventListener('keydown',     onKey)
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('wheel',       onWheel)
      el.removeEventListener('touchstart',  onTouchStart)
      el.removeEventListener('touchmove',   onTouchMove)
      el.removeEventListener('touchend',    onTouchEnd)
    }
  }, [zoomTo, flush, resetView])

  const handleStarClick = useCallback((id: string) => {
    if (moved.current) { moved.current = false; return }
    setActiveStarId(prev => prev === id ? null : id)
  }, [])

  const activeStar = activeStarId ? data.stars.find(s => s.id === activeStarId) : undefined

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
        cursor: 'grab',
        background: '#010408',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overscrollBehavior: 'none',
      }}
    >
      {/* ── SVG — fills container, no preserveAspectRatio, we own all transforms ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
        aria-label="God IS Love constellation map — every study orbiting a central truth"
        role="img"
      >
        <defs>
          {/* All gradients use userSpaceOnUse anchored to 0–1000 canvas space */}
          <radialGradient id="m-bg" cx="500" cy="500" r="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#060D1E" />
            <stop offset="60%"  stopColor="#030810" />
            <stop offset="100%" stopColor="#010408" />
          </radialGradient>
          <radialGradient id="m-bl" cx="280" cy="620" r="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(20,80,180,0.30)" />
            <stop offset="35%"  stopColor="rgba(10,50,130,0.18)" />
            <stop offset="70%"  stopColor="rgba(5,25,70,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="m-bc" cx="520" cy="500" r="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(15,70,170,0.28)" />
            <stop offset="40%"  stopColor="rgba(8,45,120,0.16)" />
            <stop offset="75%"  stopColor="rgba(4,20,60,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="m-br" cx="760" cy="380" r="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(18,75,175,0.26)" />
            <stop offset="40%"  stopColor="rgba(10,48,125,0.15)" />
            <stop offset="75%"  stopColor="rgba(5,22,65,0.07)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="m-h1" cx="240" cy="600" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(0,160,240,0.28)" />
            <stop offset="40%"  stopColor="rgba(0,100,180,0.14)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="m-h2" cx="680" cy="420" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(0,180,255,0.26)" />
            <stop offset="40%"  stopColor="rgba(0,110,190,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="m-h3" cx="880" cy="300" r="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(0,150,220,0.20)" />
            <stop offset="50%"  stopColor="rgba(0,90,160,0.09)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id="m-gd" cx="500" cy="500" r="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(201,168,76,0.20)" />
            <stop offset="35%"  stopColor="rgba(160,110,30,0.10)" />
            <stop offset="70%"  stopColor="rgba(80,55,15,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* ── Fixed full-screen background — always covers the entire SVG element ── */}
        <rect x="0" y="0" width="100%" height="100%" fill="#010408" />

        {/* ── Panning / zooming group — direct DOM transform, no React re-renders ── */}
        <g ref={contentGroupRef} style={{ willChange: 'transform' }}>
          {/* Space background */}
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-bg)" />
          {/* Milky Way nebula band */}
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-bl)" />
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-bc)" />
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-br)" />
          {/* Cyan hot spots */}
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-h1)" />
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-h2)" />
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-h3)" />
          {/* Dense starfield */}
          <StarfieldBackground />
          {/* Gold pulsar warmth */}
          <rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} fill="url(#m-gd)" />

          {/* Constellation lines */}
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

          {/* Study star nodes */}
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

          {/* Pulsar core */}
          <PulsarCore cx={CENTRE} cy={CENTRE} />
        </g>
      </svg>

      {/* ── Star card overlay ── */}
      {activeStar && (
        <div
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '0 16px 24px' }}
          className="star-card-wrap"
        >
          <StarCard star={activeStar} onClose={() => setActiveStarId(null)} />
        </div>
      )}

      {/* ── Zoom controls ── */}
      <div
        className={`zoom-controls${activeStarId ? ' card-open' : ''}`}
        style={{ position: 'absolute', bottom: 88, right: 16, zIndex: 30, display: 'flex', flexDirection: 'column', gap: 4 }}
        aria-label="Zoom controls"
      >
        {([
          { label: '+', title: 'Zoom in',  factor: 1.4 },
          { label: '−', title: 'Zoom out', factor: 1 / 1.4 },
        ] as const).map(({ label, title, factor }) => (
          <button
            key={label}
            title={title}
            aria-label={title}
            style={ZOOM_BTN}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)'; e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = 'rgba(201,168,76,0.85)' }}
            onClick={() => {
              const rect = containerRef.current?.getBoundingClientRect()
              if (rect) zoomTo(rect.width / 2, rect.height / 2, T.current.k * factor)
            }}
          >
            {label}
          </button>
        ))}
        {showReset && (
          <button
            title="Reset view (0)"
            aria-label="Reset view"
            style={{ ...ZOOM_BTN, fontSize: 18 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)'; e.currentTarget.style.color = '#C9A84C' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = 'rgba(201,168,76,0.85)' }}
            onClick={resetView}
          >
            ↺
          </button>
        )}
      </div>

      <style>{`
        /* ── Mobile: card slides up from bottom ── */
        .star-card-wrap {
          padding-bottom: max(24px, env(safe-area-inset-bottom)) !important;
        }

        /* ── Mobile: move zoom controls above the open card ── */
        @media (max-width: 767px) {
          .zoom-controls.card-open {
            bottom: calc(72vh + 8px) !important;
          }
        }

        /* ── Desktop: card floats on the right side ── */
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
