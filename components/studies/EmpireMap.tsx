'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps'
import {
  empireMapData,
  EMPIRE_ORDER,
  type EmpireId,
  type LatLngPoint,
} from '@/data/empire-map'

// ─── Map styling ──────────────────────────────────────────────────────────────

const HISTORICAL_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry',         stylers: [{ color: '#2d2416' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#c9a875' }] },
  { elementType: 'labels.text.stroke',stylers: [{ color: '#1a1208' }] },
  { featureType: 'water',  elementType: 'geometry',    stylers: [{ color: '#0b1620' }] },
  { featureType: 'water',  elementType: 'labels.text', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#2a2016' }] },
  { featureType: 'road',      stylers: [{ visibility: 'off' }] },
  { featureType: 'transit',   stylers: [{ visibility: 'off' }] },
  { featureType: 'poi',       stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.locality',     elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.neighborhood', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.land_parcel',  stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#5a4a2a' }, { weight: 0.5 }] },
]

// Full-world bounds used for the Kingdom state
const WORLD_BOUNDS = { north: 58, south: 8, east: 85, west: -22 }

// ─── Polygon layer + auto-fit bounds ─────────────────────────────────────────

interface EmpirePolygonsProps {
  activeId: EmpireId
}

function EmpirePolygons({ activeId }: EmpirePolygonsProps) {
  const map = useMap()
  const polyRefs = useRef<{ empireId: EmpireId; poly: google.maps.Polygon; subIdx: number }[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null)

  // Create all polygons once when the map mounts
  useEffect(() => {
    if (!map) return
    const created: typeof polyRefs.current = []

    for (const empire of empireMapData.filter((e) => e.id !== 'kingdom')) {
      const paths = empire.subCoordinates ?? [empire.coordinates]
      paths.forEach((path, subIdx) => {
        const poly = new google.maps.Polygon({
          paths: path as LatLngPoint[],
          map,
          fillColor: empire.color,
          fillOpacity: 0,
          strokeColor: empire.color,
          strokeOpacity: 0,
          strokeWeight: 1.5,
          zIndex: 1,
          clickable: false,
        })
        created.push({ empireId: empire.id, poly, subIdx })
      })
    }

    polyRefs.current = created
    return () => {
      created.forEach(({ poly }) => poly.setMap(null))
      polyRefs.current = []
    }
  }, [map])

  // Animate polygon opacity on empire change
  useEffect(() => {
    for (const { empireId, poly, subIdx } of polyRefs.current) {
      const empire = empireMapData.find((e) => e.id === empireId)!
      const isActive = empireId === activeId
      let targetFill: number
      if (!isActive) {
        targetFill = 0
      } else if (empire.subCoordinates) {
        targetFill = subIdx === 0 ? 0.65 : 0.50
      } else {
        targetFill = 0.68
      }
      animatePolygonOpacity(poly, targetFill, isActive ? 0.85 : 0, isActive ? 2 : 1)
    }
  }, [activeId])

  // ── Capital city marker (classic Marker — no mapId required) ─────────────
  useEffect(() => {
    if (!map) return

    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null)
      markerRef.current = null
    }

    if (activeId === 'kingdom') return

    const empire = empireMapData.find((e) => e.id === activeId)!

    markerRef.current = new google.maps.Marker({
      position: empire.capitalCoords,
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: empire.color,
        fillOpacity: 1,
        strokeColor: 'rgba(255,255,255,0.35)',
        strokeWeight: 1.5,
      },
      title: empire.capital,
      zIndex: 10,
    })

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
        markerRef.current = null
      }
    }
  }, [map, activeId])

  // ── Auto-fit map camera to active empire bounds ───────────────────────────
  useEffect(() => {
    if (!map) return

    if (activeId === 'kingdom') {
      map.fitBounds(WORLD_BOUNDS, 0)
      return
    }

    const empire = empireMapData.find((e) => e.id === activeId)!
    const allCoords = empire.subCoordinates
      ? empire.subCoordinates.flat()
      : empire.coordinates

    if (allCoords.length === 0) return

    const bounds = new google.maps.LatLngBounds()
    allCoords.forEach((pt) => bounds.extend(pt))
    map.fitBounds(bounds, 48)
  }, [map, activeId])

  return null
}

/** rAF opacity tween — Google Maps Polygons have no CSS transitions */
function animatePolygonOpacity(
  poly: google.maps.Polygon,
  targetFill: number,
  targetStroke: number,
  zIndex: number,
) {
  const DURATION = 400
  const start = performance.now()
  const startFill   = (poly.get('fillOpacity')   as number) ?? 0
  const startStroke = (poly.get('strokeOpacity') as number) ?? 0

  function tick(now: number) {
    const t = Math.min((now - start) / DURATION, 1)
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    poly.setOptions({
      fillOpacity:   startFill   + (targetFill   - startFill)   * ease,
      strokeOpacity: startStroke + (targetStroke - startStroke) * ease,
      zIndex,
    })
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// ─── Main component ───────────────────────────────────────────────────────────

const AUTOPLAY_DURATION = 4500 // ms per empire

export default function EmpireMap() {
  const [activeId, setActiveId]   = useState<EmpireId>('babylon')
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress]   = useState(0) // 0–100

  const activeEmpire = empireMapData.find((e) => e.id === activeId)!
  const activeIdx    = EMPIRE_ORDER.indexOf(activeId)
  const canGoPrev    = activeIdx > 0
  const canGoNext    = activeIdx < EMPIRE_ORDER.length - 1

  // Navigate — pauses auto-play on manual interaction
  const goTo = useCallback((id: EmpireId, pausePlay = true) => {
    if (pausePlay) setIsPlaying(false)
    setActiveId(id)
    setProgress(0)
  }, [])

  const handlePrev = useCallback(() => {
    if (canGoPrev) goTo(EMPIRE_ORDER[activeIdx - 1])
  }, [activeIdx, canGoPrev, goTo])

  const handleNext = useCallback((fromAutoplay = false) => {
    if (canGoNext) goTo(EMPIRE_ORDER[activeIdx + 1], !fromAutoplay)
  }, [activeIdx, canGoNext, goTo])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft')  handlePrev()
      if (e.key === ' ')          { e.preventDefault(); setIsPlaying((p) => !p) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev])

  // Auto-play timer + progress bar
  useEffect(() => {
    if (!isPlaying) { setProgress(0); return }

    const startTime = performance.now()

    const rafId = { current: 0 }
    function tick() {
      const elapsed = performance.now() - startTime
      setProgress(Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100))
      if (elapsed < AUTOPLAY_DURATION) {
        rafId.current = requestAnimationFrame(tick)
      }
    }
    rafId.current = requestAnimationFrame(tick)

    const timeout = setTimeout(() => {
      setProgress(0)
      if (activeIdx >= EMPIRE_ORDER.length - 1) {
        setIsPlaying(false)
      } else {
        handleNext(true)
      }
    }, AUTOPLAY_DURATION)

    return () => {
      cancelAnimationFrame(rafId.current)
      clearTimeout(timeout)
    }
  }, [isPlaying, activeId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Touch swipe on map area
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const dy = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }, [handleNext, handlePrev])

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''

  return (
    <div className="em-root">
      <style>{`
        .em-root {
          position: fixed; inset: 0; background: #0d1018;
          display: flex; flex-direction: column; overflow: hidden;
          font-family: Inter, system-ui, sans-serif;
        }
        .em-canvas-wrap {
          position: relative; flex: 0 0 55dvh; overflow: hidden;
        }
        .em-panel {
          display: flex; flex-direction: column; flex: 1; overflow: hidden;
          background: rgba(5, 8, 14, 0.8);
          border-top: 1px solid rgba(255, 240, 200, 0.07);
        }
        @media (min-width: 768px) {
          .em-root         { flex-direction: row; }
          .em-canvas-wrap  { flex: 1; }
          .em-panel        { flex: 0 0 380px; border-top: none; border-left: 1px solid rgba(255,240,200,0.07); }
        }
        .em-progress-bar-track {
          height: 2px; background: rgba(255,240,200,0.06); flex-shrink: 0;
          position: relative; overflow: hidden;
        }
        .em-selector {
          display: flex; overflow-x: auto; gap: 8px; padding: 10px 16px;
          border-bottom: 1px solid rgba(255, 240, 200, 0.07);
          flex-shrink: 0; scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .em-selector::-webkit-scrollbar { display: none; }
        .em-info {
          flex: 1; overflow-y: auto; padding: 20px;
          -webkit-overflow-scrolling: touch;
        }
        .em-nav-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid rgba(255,240,200,0.18);
          background: rgba(0,0,0,0.5); color: rgba(255,240,200,0.85);
          font-size: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          z-index: 5; line-height: 1; transition: opacity 180ms ease;
        }
        .em-nav-btn:disabled { opacity: 0.2; cursor: not-allowed; }
        .em-nav-btn:not(:disabled):hover { background: rgba(0,0,0,0.7); }
        .em-play-btn {
          position: absolute; top: 14px; right: 14px; z-index: 10;
          width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid rgba(255,240,200,0.22);
          background: rgba(0,0,0,0.55); color: rgba(255,240,200,0.8);
          font-size: 13px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          transition: background 180ms ease;
        }
        .em-play-btn:hover { background: rgba(0,0,0,0.75); }
        @keyframes kingdom-pulse {
          0%, 100% { opacity: 0.22; } 50% { opacity: 0.48; }
        }
@media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* ── Map canvas ─────────────────────────────────────────────────────── */}
      <div
        className="em-canvas-wrap"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Back link */}
        <Link href="/studies" style={{
          position: 'absolute', top: 14, left: 14, zIndex: 10,
          color: 'rgba(255,240,200,0.5)', fontSize: 12,
          textDecoration: 'none', letterSpacing: '0.05em',
        }}>
          ← Studies
        </Link>

        {/* Title */}
        <div style={{
          position: 'absolute', top: 14, left: '50%',
          transform: 'translateX(-50%)', zIndex: 10,
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          <span style={{
            color: 'rgba(255,240,200,0.5)', fontSize: 11,
            fontFamily: "'Cinzel', serif", letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}>
            Daniel 2 · Empire Map
          </span>
        </div>

        {/* Play / Pause button */}
        <button
          className="em-play-btn"
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? 'Pause auto-play' : 'Watch prophecy unfold'}
          title={isPlaying ? 'Pause' : 'Watch prophecy unfold'}
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>

        {/* Google Maps */}
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={{ lat: 36, lng: 32 }}
            defaultZoom={4}
            mapTypeId="terrain"
            disableDefaultUI
            gestureHandling="greedy"
            restriction={{
              latLngBounds: WORLD_BOUNDS,
              strictBounds: false,
            }}
            styles={HISTORICAL_STYLE}
            style={{ width: '100%', height: '100%' }}
          >
            <EmpirePolygons activeId={activeId} />
          </Map>
        </APIProvider>

        {/* Kingdom overlay */}
        {activeId === 'kingdom' && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(ellipse at 53% 66%, rgba(168,85,247,0.45) 0%, rgba(124,58,237,0.18) 45%, transparent 75%)',
            animation: 'kingdom-pulse 2.4s ease-in-out infinite',
          }}>
            <div style={{ textAlign: 'center', padding: '0 24px' }}>
              <div style={{
                fontSize: 'clamp(16px, 3vw, 26px)',
                fontFamily: "'Cinzel', serif",
                color: 'rgba(225,210,255,0.72)',
                letterSpacing: '0.04em', marginBottom: 10,
              }}>
                His kingdom shall never be destroyed
              </div>
              <div style={{
                fontSize: 13, fontFamily: "'IBM Plex Mono', monospace",
                color: 'rgba(225,210,255,0.38)', letterSpacing: '0.1em',
              }}>
                Daniel 2:44
              </div>
            </div>
          </div>
        )}

        {/* Prev / Next arrows */}
        <button className="em-nav-btn" onClick={handlePrev}
          disabled={!canGoPrev} style={{ left: 12 }} aria-label="Previous empire">
          ‹
        </button>
        <button className="em-nav-btn" onClick={() => handleNext()}
          disabled={!canGoNext} style={{ right: 12 }} aria-label="Next empire">
          ›
        </button>
      </div>

      {/* ── Side / bottom panel ───────────────────────────────────────────── */}
      <div className="em-panel">

        {/* Auto-play progress bar */}
        <div className="em-progress-bar-track">
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            width: `${progress}%`,
            background: activeEmpire.color,
            transition: isPlaying ? 'none' : 'width 200ms ease',
          }} />
        </div>

        {/* Empire selector tabs */}
        <div className="em-selector" role="tablist" aria-label="Select empire">
          {empireMapData.map((e) => {
            const isActive = e.id === activeId
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => goTo(e.id)}
                style={{
                  flexShrink: 0, padding: '6px 14px', borderRadius: 20,
                  border: `1px solid ${isActive ? e.color : 'rgba(255,240,200,0.14)'}`,
                  background: isActive ? `${e.color}20` : 'transparent',
                  color: isActive ? e.color : 'rgba(255,240,200,0.45)',
                  fontSize: 12, fontFamily: "'Cinzel', serif", cursor: 'pointer',
                  whiteSpace: 'nowrap', transition: 'all 200ms ease',
                  letterSpacing: '0.05em',
                }}
              >
                {e.name}
              </button>
            )
          })}
        </div>

        {/* Info panel */}
        <div className="em-info">
          <div style={{ marginBottom: 6 }}>
            <span style={{
              fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
              color: 'rgba(255,240,200,0.38)', letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}>
              {activeEmpire.statueSection} · {activeEmpire.era}
            </span>
          </div>

          <h2 style={{
            fontSize: 28, fontFamily: "'Cinzel', serif",
            color: activeEmpire.color, margin: '0 0 6px', lineHeight: 1.1,
          }}>
            {activeEmpire.name}
          </h2>

          <div style={{
            fontSize: 12, fontFamily: "'IBM Plex Mono', monospace",
            color: 'rgba(255,240,200,0.45)', marginBottom: 18,
          }}>
            ◎ {activeEmpire.capital}
          </div>

          <div style={{ borderLeft: `3px solid ${activeEmpire.color}`, paddingLeft: 14, marginBottom: 18 }}>
            <div style={{
              fontSize: 11, fontFamily: "'IBM Plex Mono', monospace",
              color: activeEmpire.color, marginBottom: 5,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {activeEmpire.bibleRef}
            </div>
            <div style={{
              fontSize: 14, fontFamily: "Georgia, 'Times New Roman', serif",
              color: 'rgba(255,240,200,0.75)', fontStyle: 'italic', lineHeight: 1.55,
            }}>
              {activeEmpire.bibleText}
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,240,200,0.62)', lineHeight: 1.68, margin: 0 }}>
            {activeEmpire.historicNote}
          </p>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6, marginTop: 24, alignItems: 'center' }}>
            {EMPIRE_ORDER.map((id, i) => {
              const e = empireMapData.find((emp) => emp.id === id)!
              return (
                <button key={id} onClick={() => goTo(id)} aria-label={e.name} style={{
                  width: i === activeIdx ? 20 : 6, height: 6, borderRadius: 3,
                  border: 'none', padding: 0, cursor: 'pointer',
                  background: i === activeIdx ? activeEmpire.color : 'rgba(255,240,200,0.18)',
                  transition: 'all 280ms ease',
                }} />
              )
            })}
          </div>

          {/* Hints */}
          <div style={{
            marginTop: 14, fontSize: 10, fontFamily: "'IBM Plex Mono', monospace",
            color: 'rgba(255,240,200,0.20)', letterSpacing: '0.06em', lineHeight: 1.7,
          }}>
            ← → keys · swipe · space to play
          </div>
        </div>
      </div>
    </div>
  )
}
