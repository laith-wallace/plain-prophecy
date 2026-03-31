'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map as MapIcon } from 'lucide-react'

import ScriptureWebCanvas from './components/ScriptureWebCanvas'
import ConnectionStats from './components/ConnectionStats'
import ModeSelector from './components/ModeSelector'
import HoverTooltip from './components/HoverTooltip'
import DiscoveryPanel from './components/DiscoveryPanel'
import GuidedPathsDrawer from './components/GuidedPathsDrawer'
import ChallengeModal from './components/ChallengeModal'
import ShareCard from './components/ShareCard'

import { CHRIST_THREAD } from '@/data/christ-thread'

import type {
  CrossReferenceData,
  FilterState,
  FilterMode,
  ArcHit,
  DiscoveryPath,
} from '@/types/connections'

export default function ConnectionsClient() {
  // ── Data loading ─────────────────────────────────────────────────────────
  const [data, setData] = useState<CrossReferenceData | null>(null)
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')

  useEffect(() => {
    setLoadState('loading')
    fetch('/data/cross-references.json')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d: CrossReferenceData) => {
        setData(d)
        setLoadState('loaded')
      })
      .catch(() => setLoadState('error'))
  }, [])

  // ── Filter / mode state ───────────────────────────────────────────────────
  const [activeMode, setActiveMode] = useState<FilterMode>('base')
  const [filterState, setFilterState] = useState<FilterState>({ mode: 'base' })

  // Build OSIS → verse index map once data is loaded
  const osisMapRef = useRef<Map<string, number> | null>(null)
  useEffect(() => {
    if (!data) return
    const map = new Map<string, number>()
    for (const ch of data.chapters) {
      const bookAbbr = data.books[ch.book].abbr
      for (let v = 1; v <= ch.verseCount; v++) {
        map.set(`${bookAbbr}.${ch.chapter}.${v}`, ch.verseStart + v - 1)
      }
    }
    osisMapRef.current = map
  }, [data])

  // ── Hover state ───────────────────────────────────────────────────────────
  const [hoveredArc, setHoveredArc] = useState<ArcHit | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)

  const handleArcHover = useCallback((arc: ArcHit | null, pos: { x: number; y: number } | null) => {
    setHoveredArc(arc)
    setTooltipPos(pos)
  }, [])

  // ── Panel state ───────────────────────────────────────────────────────────
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedArc, setSelectedArc] = useState<ArcHit | null>(null)
  const [selectedBook, setSelectedBook] = useState<number | null>(null)
  const [shareArcOpen, setShareArcOpen] = useState(false)

  const handleArcClick = useCallback((arc: ArcHit) => {
    setSelectedArc(arc)
    setSelectedBook(null)
    setPanelOpen(true)
  }, [])

  const handleBookClick = useCallback((bookIndex: number) => {
    setSelectedBook(bookIndex)
    setSelectedArc(null)
    setPanelOpen(true)
    // Switch to bookDna mode
    setActiveMode('bookDna')
    setFilterState({ mode: 'bookDna', bookIndex })
  }, [])

  // ── Guided paths ─────────────────────────────────────────────────────────
  const [pathsDrawerOpen, setPathsDrawerOpen] = useState(false)
  const [activePath, setActivePath] = useState<DiscoveryPath | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  const handlePathSelect = useCallback((path: DiscoveryPath | null) => {
    if (!path) {
      setActivePath(null)
      setActiveStep(0)
      setFilterState({ mode: 'base' })
      setActiveMode('base')
      return
    }
    setActivePath(path)
    setActiveStep(0)
    applyPathStep(path, 0)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStepChange = useCallback((step: number) => {
    if (!activePath) return
    setActiveStep(step)
    applyPathStep(activePath, step)
  }, [activePath]) // eslint-disable-line react-hooks/exhaustive-deps

  function applyPathStep(path: DiscoveryPath, stepIdx: number) {
    const step = path.steps[stepIdx]
    if (!step || !data || !osisMapRef.current) return
    const fromIdx = osisMapRef.current.get(step.from)
    const toIdx = osisMapRef.current.get(step.to)
    if (fromIdx === undefined || toIdx === undefined) return

    // Find arc index matching this from/to pair
    const refs = data.refs
    const arcIndices: number[] = []
    for (let i = 0; i < refs.length; i++) {
      if (
        (refs[i][0] === fromIdx && refs[i][1] === toIdx) ||
        (refs[i][0] === toIdx && refs[i][1] === fromIdx)
      ) {
        arcIndices.push(i)
      }
    }
    setFilterState({ mode: 'path', arcIndices })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlePathComplete = useCallback((_path: DiscoveryPath) => {
    setPathsDrawerOpen(false)
    setActivePath(null)
    setFilterState({ mode: 'base' })
    setActiveMode('base')
    // CTA handled inline in GuidedPathsDrawer
  }, [])

  // ── Challenge modal ───────────────────────────────────────────────────────
  const [challengeOpen, setChallengeOpen] = useState(false)
  const challengeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (loadState !== 'loaded') return
    challengeTimerRef.current = setTimeout(() => setChallengeOpen(true), 90_000)
    return () => {
      if (challengeTimerRef.current) clearTimeout(challengeTimerRef.current)
    }
  }, [loadState])

  // ── Mode change handler ───────────────────────────────────────────────────
  const handleModeChange = useCallback((mode: FilterMode) => {
    setActiveMode(mode)
    if (mode === 'base') {
      setFilterState({ mode: 'base' })
    } else if (mode === 'christThread') {
      // Build Christ Thread arc indices
      if (data && osisMapRef.current) {
        const osisMap = osisMapRef.current
        const refs = data.refs
        const pairs = CHRIST_THREAD.map(c => ({ from: c.from, to: c.to }))
        const arcIndices: number[] = []

        for (const { from, to } of pairs) {
          const fromIdx = osisMap.get(from)
          const toIdx = osisMap.get(to)
          if (fromIdx === undefined || toIdx === undefined) continue
          for (let i = 0; i < refs.length; i++) {
            if (
              (refs[i][0] === fromIdx && refs[i][1] === toIdx) ||
              (refs[i][0] === toIdx && refs[i][1] === fromIdx)
            ) {
              arcIndices.push(i)
            }
          }
        }
        setFilterState({ mode: 'christThread', arcIndices })
      }
    } else if (mode === 'prophecyHighway') {
      setFilterState({ mode: 'prophecyHighway' })
    } else if (mode === 'verse') {
      // Will be updated by handleVerseSelect
      setFilterState({ mode: 'base' })
    } else if (mode === 'bookDna') {
      // Will be updated by handleBookClick
      setFilterState({ mode: 'base' })
    }
  }, [data])

  const handleVerseSelect = useCallback((verseIndex: number) => {
    setFilterState({ mode: 'verse', verseIndex })
  }, [])

  const handleVerseClear = useCallback(() => {
    setFilterState({ mode: 'base' })
  }, [])

  // ── Accessibility table toggle ────────────────────────────────────────────
  const [showTable, setShowTable] = useState(false)

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#08080F',
        color: '#F5F5F0',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Page header */}
      <header
        style={{
          padding: 'env(safe-area-inset-top, 0) 1rem 0',
          paddingTop: 'max(env(safe-area-inset-top, 0px), 16px)',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                color: '#F5F5F0',
                letterSpacing: '0.05em',
                marginBottom: 4,
              }}
            >
              The Web of Scripture
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                color: '#9A9A8A',
                maxWidth: 480,
                lineHeight: 1.5,
              }}
            >
              Every connection in the Bible, visualised. Hover an arc. Click to explore.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => setPathsDrawerOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 6,
                padding: '8px 14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                color: '#C9A84C',
              }}
            >
              <MapIcon size={13} />
              <span className="hidden sm:inline">Start a Journey</span>
              <span className="sm:hidden">Paths</span>
            </button>
            <button
              onClick={() => setChallengeOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '8px 14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                color: '#9A9A8A',
              }}
            >
              Challenge Me
            </button>
          </div>
        </div>

        {/* Animated stats counter */}
        <ConnectionStats triggered={loadState === 'loaded'} />
      </header>

      {/* Mode selector */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1rem' }}>
        <ModeSelector
          activeMode={activeMode}
          data={data}
          onModeChange={handleModeChange}
          onVerseSelect={handleVerseSelect}
          onVerseClear={handleVerseClear}
        />
      </div>

      {/* Canvas container */}
      <div
        style={{ position: 'relative', maxWidth: 1400, margin: '0 auto' }}
      >
        <ScriptureWebCanvas
          data={data}
          filterState={filterState}
          loadState={loadState}
          onArcHover={handleArcHover}
          onArcClick={handleArcClick}
          onBookClick={handleBookClick}
        />

        {/* Hover tooltip (fixed to viewport) */}
        <HoverTooltip
          arc={hoveredArc}
          pos={tooltipPos}
          data={data}
          onViewConnection={() => hoveredArc && handleArcClick(hoveredArc)}
        />

        {/* Christ Thread banner */}
        <AnimatePresence>
          {activeMode === 'christThread' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                position: 'absolute',
                bottom: 32,
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                padding: '8px 16px',
                background: 'rgba(8,8,15,0.8)',
                borderRadius: 4,
                pointerEvents: 'none',
              }}
            >
              <em
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: 11,
                  color: '#C9A84C',
                  fontStyle: 'italic',
                }}
              >
                Every shadow has a substance. Every type has an antitype. Every arc points home.
              </em>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prophecy Highway badge */}
        <AnimatePresence>
          {activeMode === 'prophecyHighway' && loadState === 'loaded' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'rgba(13,13,26,0.9)',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: 6,
                padding: '8px 12px',
                maxWidth: 200,
              }}
            >
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: '#9A9A8A', margin: 0, lineHeight: 1.5 }}>
                Showing arcs between prophetic-core books: Isaiah, Daniel, Revelation and more.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accessibility: View as table toggle */}
      <div style={{ padding: '0.5rem 1rem', maxWidth: 1400, margin: '0 auto' }}>
        <button
          onClick={() => setShowTable(t => !t)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter)',
            fontSize: 11,
            color: '#9A9A8A',
            textDecoration: 'underline',
            padding: 0,
          }}
          aria-expanded={showTable}
        >
          {showTable ? 'Hide' : 'View as table'}
        </button>

        {showTable && data && (
          <div style={{ overflowX: 'auto', marginTop: 8 }}>
            <table
              style={{ borderCollapse: 'collapse', fontSize: 11, fontFamily: 'var(--font-inter)', color: '#9A9A8A' }}
              aria-label="Bible cross-references"
            >
              <thead>
                <tr>
                  {['From Book', 'From Chapter:Verse', 'To Book', 'To Chapter:Verse', 'Votes'].map(h => (
                    <th key={h} style={{ padding: '4px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.refs.slice(0, 200).map(([from, to, votes], i) => {
                  const fromRef = formatVerseRef(from, data.chapters)
                  const toRef = formatVerseRef(to, data.chapters)
                  const [fromBook, fromChVerse] = fromRef.split(' ')
                  const [toBook, toChVerse] = toRef.split(' ')
                  return (
                    <tr key={i}>
                      <td style={{ padding: '3px 8px' }}>{fromBook}</td>
                      <td style={{ padding: '3px 8px' }}>{fromChVerse}</td>
                      <td style={{ padding: '3px 8px' }}>{toBook}</td>
                      <td style={{ padding: '3px 8px' }}>{toChVerse}</td>
                      <td style={{ padding: '3px 8px' }}>{votes}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p style={{ fontSize: 10, color: '#9A9A8A', marginTop: 4 }}>
              Showing first 200 of {data.refs.length.toLocaleString()} connections.
            </p>
          </div>
        )}
      </div>

      {/* Share card (if panel is open with a selected arc) */}
      {panelOpen && selectedArc && data && shareArcOpen && (
        <div style={{ padding: '0 1rem', maxWidth: 1400, margin: '0 auto', paddingBottom: '1rem' }}>
          <ShareCard arc={selectedArc} data={data} />
        </div>
      )}

      {/* Discovery panel (right side / bottom sheet) */}
      <DiscoveryPanel
        open={panelOpen}
        onClose={() => { setPanelOpen(false); setShareArcOpen(false) }}
        selectedArc={selectedArc}
        selectedBook={selectedBook}
        data={data}
        onShareArc={() => setShareArcOpen(true)}
      />

      {/* Guided paths drawer */}
      <GuidedPathsDrawer
        open={pathsDrawerOpen}
        onClose={() => setPathsDrawerOpen(false)}
        activePath={activePath}
        activeStep={activeStep}
        data={data}
        onPathSelect={handlePathSelect}
        onStepChange={handleStepChange}
        onPathComplete={handlePathComplete}
      />

      {/* Challenge modal */}
      <ChallengeModal
        open={challengeOpen}
        onClose={() => setChallengeOpen(false)}
      />
    </div>
  )
}

// Import inline helper
function formatVerseRef(
  verseIndex: number,
  chapters: { book: number; chapter: number; verseCount: number; verseStart: number; chapterStart: number }[]
): string {
  if (!chapters?.length) return `[${verseIndex}]`
  let lo = 0, hi = chapters.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (chapters[mid].verseStart <= verseIndex) lo = mid
    else hi = mid - 1
  }
  const ch = chapters[lo]
  const verse = verseIndex - ch.verseStart + 1
  return `Ch${ch.chapter}:${verse}`
}
