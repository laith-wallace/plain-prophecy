'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Framework,
  CANVAS_H,
  historicistFramework,
  futuristFramework,
  preteristFramework,
  ALL_FRAMEWORKS,
  yearToX,
} from '@/data/timeline-visual'
import TimelineAxis from './TimelineAxis'
import TimelinePeriodBand from './TimelinePeriodBand'
import TimelineEventNode from './TimelineEventNode'
import TimelineEventCard from './TimelineEventCard'
import TimelineFrameworkToggle from './TimelineFrameworkToggle'
import TimelineJumpButtons from './TimelineJumpButtons'

const MIN_ZOOM      = 0.03
const MAX_ZOOM      = 12
const DRAG_THRESHOLD = 4

// ── Zoom tier drives tick interval selection ─────────────────────────────────
// Default zoom k≈0.14 → tier 2 (200-yr ticks). Elements are 7× larger so thresholds shift.
function getZoomTier(k: number): 1 | 2 | 3 | 4 | 5 {
  if (k < 0.06)  return 1   // 500-yr ticks
  if (k < 0.14)  return 2   // 200-yr ticks
  if (k < 0.35)  return 3   // 100-yr ticks
  if (k < 0.85)  return 4   // 50-yr ticks
  return 5                   // 10-yr ticks
}

const ZOOM_BTN: React.CSSProperties = {
  width: 36, height: 36,
  background: 'rgba(10,10,15,0.85)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  color: 'rgba(255,255,255,0.6)',
  fontSize: 18, fontWeight: 300, lineHeight: 1,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  backdropFilter: 'blur(8px)',
  transition: 'border-color 0.12s, color 0.12s',
}

const FRAMEWORK_MAP = {
  historicist: historicistFramework,
  futurist:    futuristFramework,
  preterist:   preteristFramework,
}

export default function PropheticTimeline() {
  const containerRef    = useRef<HTMLDivElement>(null)
  const contentGroupRef = useRef<SVGGElement>(null)

  // ── Transform stored as plain ref — zero React re-renders during pan/zoom ──
  const T     = useRef({ x: 0, y: 0, k: 1 })
  const initT = useRef({ x: 0, y: 0, k: 1 })
  const raf   = useRef<number | null>(null)

  // ── React state — only changes that require a re-render ──────────────────
  const [activeEventId,  setActiveEventId]  = useState<string | null>(null)
  const [activeFramework, setActiveFramework] = useState<Framework>('historicist')
  const [showReset,      setShowReset]      = useState(false)
  const [zoomTier,       setZoomTier]       = useState<1|2|3|4|5>(2)

  const showResetRef = useRef(false)
  const zoomTierRef  = useRef<1|2|3|4|5>(2)

  // ── Drag / pinch refs ────────────────────────────────────────────────────
  const drag  = useRef<{ ox: number; oy: number; px: number; py: number } | null>(null)
  const pinch = useRef<{ dist: number; cx: number; cy: number } | null>(null)
  const moved = useRef(false)

  const framework = FRAMEWORK_MAP[activeFramework]

  // ── Commit transform directly to DOM ────────────────────────────────────
  const commit = useCallback(() => {
    const g = contentGroupRef.current
    if (!g) return
    const { x, y, k } = T.current
    g.style.transform = `translate(${x}px, ${y}px) scale(${k})`

    const needReset = (
      Math.abs(x - initT.current.x) > 5 ||
      Math.abs(y - initT.current.y) > 5 ||
      Math.abs(k - initT.current.k) > 0.05
    )
    if (needReset !== showResetRef.current) {
      showResetRef.current = needReset
      setShowReset(needReset)
    }

    const tier = getZoomTier(k)
    if (tier !== zoomTierRef.current) {
      zoomTierRef.current = tier
      setZoomTier(tier)
    }
  }, [])

  const flush = useCallback(() => {
    if (raf.current !== null) return
    raf.current = requestAnimationFrame(() => {
      raf.current = null
      commit()
    })
  }, [commit])

  // ── Smooth animated pan/zoom to a target transform ───────────────────────
  const animateTo = useCallback((targetX: number, targetY: number, targetK: number) => {
    const startT  = { ...T.current }
    const startMs = performance.now()
    const DURATION = 420

    function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

    function step(now: number) {
      const p = Math.min((now - startMs) / DURATION, 1)
      const e = ease(p)
      T.current = {
        x: startT.x + (targetX - startT.x) * e,
        y: startT.y + (targetY - startT.y) * e,
        k: startT.k + (targetK - startT.k) * e,
      }
      commit()
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [commit])

  // ── Zoom toward a screen-space point ────────────────────────────────────
  const zoomTo = useCallback((cx: number, cy: number, newK: number) => {
    newK = Math.min(Math.max(newK, MIN_ZOOM), MAX_ZOOM)
    const ratio = newK / T.current.k
    const el = containerRef.current
    const H = el?.getBoundingClientRect().height ?? 500
    // Clamp y so the timeline doesn't drift too far vertically
    const newX = cx - (cx - T.current.x) * ratio
    const newY = cy - (cy - T.current.y) * ratio
    const maxVertical = H * 0.55
    T.current = { x: newX, y: Math.max(-maxVertical, Math.min(maxVertical, newY)), k: newK }
    flush()
  }, [flush])

  // ── Jump target for a prophetic period band ─────────────────────────────
  const jumpTargetForBand = useCallback((startYear: number, endYear: number) => {
    const el = containerRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    const W = rect.width  || window.innerWidth
    const H = rect.height || window.innerHeight
    if (!W || !H) return null
    const svgX1   = yearToX(startYear)
    const svgX2   = yearToX(endYear)
    const padding = (svgX2 - svgX1) * 0.15
    const k       = (W * 0.80) / (svgX2 - svgX1 + 2 * padding)
    const svgCx   = (svgX1 + svgX2) / 2
    const x       = W / 2 - svgCx * k
    const y       = (H - CANVAS_H * k) / 2
    return { x, y, k }
  }, [])

  // ── Initial "fit to screen" transform ───────────────────────────────────
  const resetView = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Fall back to window dimensions if container hasn't been painted yet
    const W = rect.width  || window.innerWidth
    const H = rect.height || window.innerHeight
    if (!W || !H) return

    const isMobile = W < 768
    let targetX: number, targetY: number, targetK: number

    if (isMobile) {
      // Mobile: show 600 BC → 200 AD — the 70-weeks anchor cluster
      const x1 = yearToX(-600)
      const x2 = yearToX(200)
      targetK = (W * 0.88) / (x2 - x1)
      targetX = W / 2 - ((x1 + x2) / 2) * targetK
      targetY = (H - CANVAS_H * targetK) / 2
    } else {
      // Desktop: show 600 BC → 700 AD — 70-weeks + papal rise era (readable at ~21px)
      const x1 = yearToX(-600)
      const x2 = yearToX(700)
      targetK = (W * 0.90) / (x2 - x1)
      targetX = W / 2 - ((x1 + x2) / 2) * targetK
      targetY = (H - CANVAS_H * targetK) / 2
    }

    // On first load (initT not set yet), snap immediately
    const isFirstLoad = initT.current.k === 1 && initT.current.x === 0
    initT.current = { x: targetX, y: targetY, k: targetK }

    if (isFirstLoad) {
      T.current = { x: targetX, y: targetY, k: targetK }
      commit()
    } else {
      animateTo(targetX, targetY, targetK)
    }
  }, [commit, animateTo])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Use rAF to ensure the container has been painted and has its final dimensions
    const frame = requestAnimationFrame(resetView)
    const ro = new ResizeObserver(resetView)
    ro.observe(el)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [resetView])

  // ── All event listeners ──────────────────────────────────────────────────
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
      const el2 = containerRef.current
      const H = el2?.getBoundingClientRect().height ?? 500
      const maxVertical = H * 0.55
      const newY = drag.current.oy + dy
      T.current = {
        ...T.current,
        x: drag.current.ox + dx,
        y: Math.max(-maxVertical, Math.min(maxVertical, newY)),
      }
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
      if (e.key === 'Escape') setActiveEventId(null)
      if (e.key === '+' || e.key === '=') zoomTo(cx, cy, T.current.k * 1.35)
      if (e.key === '-')                  zoomTo(cx, cy, T.current.k / 1.35)
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

  const handleEventClick = useCallback((id: string) => {
    if (moved.current) { moved.current = false; return }
    setActiveEventId(prev => prev === id ? null : id)
  }, [])

  const handleFrameworkChange = useCallback((fw: Framework) => {
    setActiveFramework(fw)
    setActiveEventId(null)
  }, [])

  const activeEvent = activeEventId
    ? framework.events.find(e => e.id === activeEventId)
    : undefined

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: 'grab',
        background: '#010408',
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        overscrollBehavior: 'none',
      }}
    >
      {/* ── SVG canvas ── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
        aria-label="Interactive prophetic timeline — pan and zoom to explore"
        role="img"
      >
        {/* Fixed background */}
        <rect x="0" y="0" width="100%" height="100%" fill="#010408" />

        {/* Subtle gradient atmosphere */}
        <defs>
          <radialGradient id="tl-atm" cx="50%" cy="50%" r="60%">
            <stop offset="0%"   stopColor="#0a1020" />
            <stop offset="100%" stopColor="#010408" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#tl-atm)" />

        {/* ── Panning / zooming group — direct DOM transform ── */}
        <g ref={contentGroupRef} style={{ willChange: 'transform' }}>
          {/* Period bands */}
          {framework.bands.map(band => (
            <TimelinePeriodBand key={band.id} band={band} />
          ))}

          {/* Axis rail + ticks + labels */}
          <TimelineAxis zoomTier={zoomTier} />

          {/* Event nodes */}
          {framework.events.map(event => (
            <TimelineEventNode
              key={event.id}
              event={event}
              isActive={activeEventId === event.id}
              accentColour={framework.accentColour}
              zoomTier={zoomTier}
              onClick={() => handleEventClick(event.id)}
            />
          ))}
        </g>
      </svg>

      {/* ── Header: back link + title + framework toggle ── */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'clamp(12px, 2.5vw, 22px) 16px 0',
          pointerEvents: 'none',
        }}
      >
        {/* Back link */}
        <div style={{ alignSelf: 'flex-start', pointerEvents: 'auto', marginBottom: 8 }}>
          <Link
            href="/studies"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            ← Studies
          </Link>
        </div>

        {/* Eyebrow */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: `${framework.accentColour}88`,
          margin: '0 0 8px',
        }}>
          Plain Prophecy · The Timeline
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 'clamp(18px, 2.8vw, 38px)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.15,
          margin: '0 0 8px',
          textAlign: 'center',
          textShadow: `0 0 40px ${framework.accentColour}22`,
        }}>
          Written{' '}
          <span style={{ color: framework.accentColour }}>Before</span>{' '}
          It Happened
        </h1>

        {/* Framework toggle */}
        <div style={{ pointerEvents: 'auto', marginTop: 6 }}>
          <TimelineFrameworkToggle
            frameworks={ALL_FRAMEWORKS}
            active={activeFramework}
            onChange={handleFrameworkChange}
          />
        </div>
      </header>

      {/* ── Event card overlay ── */}
      {activeEvent && (
        <div className="tl-card-wrap" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, padding: '0 16px 24px' }}>
          <TimelineEventCard
            event={activeEvent}
            accentColour={framework.accentColour}
            onClose={() => setActiveEventId(null)}
          />
        </div>
      )}

      {/* ── Period jump buttons ── */}
      <TimelineJumpButtons
        bands={framework.bands}
        hidden={!!activeEvent}
        onJump={band => {
          const target = jumpTargetForBand(band.startYear, band.endYear)
          if (target) animateTo(target.x, target.y, target.k)
        }}
      />

      {/* ── Hint text ── */}
      {!activeEvent && (
        <p style={{
          position: 'absolute',
          bottom: 'max(18px, env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(10px, 1.2vw, 12px)',
          fontStyle: 'italic',
          color: 'rgba(255,255,255,0.2)',
          margin: 0,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          Drag to pan · Pinch or scroll to zoom · Tap events to explore
        </p>
      )}

      {/* ── Zoom controls ── */}
      <div
        className={`tl-zoom${activeEvent ? ' card-open' : ''}`}
        style={{ position: 'absolute', bottom: 56, right: 16, zIndex: 30, display: 'flex', flexDirection: 'column', gap: 4 }}
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
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
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
            style={{ ...ZOOM_BTN, fontSize: 16 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#ffffff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
            onClick={resetView}
          >
            ↺
          </button>
        )}
      </div>

      <style>{`
        /* Mobile: card slides up from bottom */
        .tl-card-wrap {
          padding-bottom: max(24px, env(safe-area-inset-bottom)) !important;
        }

        /* Mobile: move zoom controls above open card */
        @media (max-width: 767px) {
          .tl-zoom.card-open {
            bottom: calc(68vh + 8px) !important;
          }
        }

        /* Desktop: card floats on the right */
        @media (min-width: 768px) {
          .tl-card-wrap {
            top: 50% !important;
            bottom: auto !important;
            left: auto !important;
            right: 24px !important;
            transform: translateY(-50%);
            width: 380px;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
