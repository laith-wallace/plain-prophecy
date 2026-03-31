'use client'

import { useRef, useEffect, useCallback } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { CanvasRenderer } from './CanvasRenderer'
import BookLabels from './BookLabels'
import type { CrossReferenceData, FilterState, ArcHit } from '@/types/connections'

interface ScriptureWebCanvasProps {
  data: CrossReferenceData | null
  filterState: FilterState
  loadState: 'idle' | 'loading' | 'loaded' | 'error'
  onArcHover: (arc: ArcHit | null, pos: { x: number; y: number } | null) => void
  onArcClick: (arc: ArcHit) => void
  onBookClick: (bookIndex: number) => void
}

export default function ScriptureWebCanvas({
  data,
  filterState,
  loadState,
  onArcHover,
  onArcClick,
  onBookClick,
}: ScriptureWebCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<CanvasRenderer | null>(null)
  const initDoneRef = useRef(false)

  // Init renderer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    rendererRef.current = new CanvasRenderer(canvas)
    return () => {
      rendererRef.current?.destroy()
      rendererRef.current = null
      initDoneRef.current = false
    }
  }, [])

  // Init with data when loaded
  useEffect(() => {
    if (!data || !rendererRef.current || initDoneRef.current) return
    initDoneRef.current = true
    rendererRef.current.init(data)
  }, [data])

  // Apply filter state
  useEffect(() => {
    if (!initDoneRef.current || !rendererRef.current) return
    rendererRef.current.setFilter(filterState)
  }, [filterState])

  // Resize observer
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const obs = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry || !rendererRef.current || !initDoneRef.current) return
      const { width, height } = entry.contentRect
      rendererRef.current.resize(width, height)
    })
    obs.observe(container)
    return () => obs.disconnect()
  }, [])

  // Pointer move → hover detection
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = rendererRef.current
    if (!r || !initDoneRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const hit = r.hitTest(x, y)
    r.setHoveredArc(hit ? hit.arcIndex : null)
    onArcHover(hit, hit ? { x: e.clientX, y: e.clientY } : null)
  }, [onArcHover])

  const handlePointerLeave = useCallback(() => {
    const r = rendererRef.current
    if (!r) return
    r.setHoveredArc(null)
    onArcHover(null, null)
  }, [onArcHover])

  // Click → open discovery panel
  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const r = rendererRef.current
    if (!r || !initDoneRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const hit = r.hitTest(x, y)
    if (hit) onArcClick(hit)
  }, [onArcClick])

  // Touch end → tap to select
  const handleTouchEnd = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    const r = rendererRef.current
    if (!r || !initDoneRef.current) return
    const touch = e.changedTouches[0]
    if (!touch) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const hit = r.hitTest(x, y)
    if (hit) onArcClick(hit)
  }, [onArcClick])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(35vh, 50vh, 60vh)',
        background: '#08080F',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'crosshair',
          touchAction: 'none',
        }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        onTouchEnd={handleTouchEnd}
      />

      {/* Book labels overlay */}
      <BookLabels
        books={data?.books}
        chapters={data?.chapters}
        onBookClick={onBookClick}
      />

      {/* Loading skeleton */}
      {loadState === 'loading' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#08080F',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <Skeleton className="h-1 w-48 rounded-full" style={{ background: 'rgba(201,168,76,0.15)' }} />
          <p
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '0.75rem',
              color: '#9A9A8A',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Weaving the web…
          </p>
          <Skeleton className="h-1 w-32 rounded-full" style={{ background: 'rgba(201,168,76,0.08)' }} />
        </div>
      )}

      {/* Error state */}
      {loadState === 'error' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#08080F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#9A9A8A' }}>
            Could not load cross-reference data. Please refresh.
          </p>
        </div>
      )}

      {/* Accessibility: screen-reader hint */}
      <p className="sr-only">
        Interactive visualisation of 63,779 Bible cross-references. Use the &quot;View as table&quot; button below for an accessible version.
      </p>
    </div>
  )
}
