'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formatVerseRef } from '@/data/book-metadata'
import { gapYears, shouldShowGap, formatBookDate } from '@/data/book-dates'
import type { ArcHit, CrossReferenceData } from '@/types/connections'

interface HoverTooltipProps {
  arc: ArcHit | null
  pos: { x: number; y: number } | null
  data: CrossReferenceData | null
  onViewConnection: () => void
}

export default function HoverTooltip({ arc, pos, data, onViewConnection }: HoverTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)
  const liveRef = useRef<HTMLDivElement>(null)

  // Compute position (clamp to viewport)
  const tipX = pos ? Math.min(pos.x + 16, window.innerWidth - 260) : 0
  const tipY = pos ? Math.max(pos.y - 80, 8) : 0

  // Update aria-live region when arc changes
  useEffect(() => {
    if (!arc || !data || !liveRef.current) return
    const from = formatVerseRef(arc.fromVerseIndex, data.chapters)
    const to = formatVerseRef(arc.toVerseIndex, data.chapters)
    liveRef.current.textContent = `Connection: ${from} to ${to}`
  }, [arc, data])

  const content = (() => {
    if (!arc || !data) return null
    const from = formatVerseRef(arc.fromVerseIndex, data.chapters)
    const to = formatVerseRef(arc.toVerseIndex, data.chapters)
    const fromBookAbbr = data.books[getBookIndex(arc.fromVerseIndex, data)]?.abbr ?? ''
    const toBookAbbr = data.books[getBookIndex(arc.toVerseIndex, data)]?.abbr ?? ''
    const gap = gapYears(fromBookAbbr, toBookAbbr)
    const fromDate = formatBookDate(fromBookAbbr)
    const toDate = formatBookDate(toBookAbbr)
    return { from, to, gap, fromDate, toDate }
  })()

  return (
    <>
      {/* Aria-live region for screen readers */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      <AnimatePresence>
        {arc && pos && content && (
          <motion.div
            ref={tooltipRef}
            key={arc.arcIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'linear' }}
            style={{
              position: 'fixed',
              left: tipX,
              top: tipY,
              zIndex: 50,
              pointerEvents: 'none',
              width: 220,
            }}
          >
            <div
              style={{
                background: 'rgba(13,13,26,0.96)',
                border: '1px solid rgba(201,168,76,0.25)',
                borderRadius: 8,
                padding: '10px 12px',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Verse refs */}
              <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 11, color: '#F5F5F0', marginBottom: 6 }}>
                {content.from}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginBottom: 6,
                color: '#9A9A8A',
              }}>
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
                  <path d="M5 0v14M1 10l4 4 4-4" stroke="#9A9A8A" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 11, color: '#F5F5F0' }}>
                  {content.to}
                </span>
              </div>

              {/* Time gap badge */}
              {shouldShowGap(content.gap) && (
                <div
                  style={{
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    borderRadius: 4,
                    padding: '4px 6px',
                    marginBottom: 8,
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, color: '#9A9A8A', marginBottom: 2 }}>
                    {content.fromDate} → {content.toDate}
                  </div>
                  <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 10, color: '#C9A84C' }}>
                    {content.gap.toLocaleString()} years between authors
                  </div>
                </div>
              )}

              {/* CTA */}
              <button
                onPointerDown={(e) => { e.stopPropagation(); onViewConnection() }}
                style={{
                  pointerEvents: 'auto',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 10,
                  color: '#C9A84C',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                View Connection
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <path d="M1 4h6M4 1l3 3-3 3" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function getBookIndex(verseIndex: number, data: CrossReferenceData): number {
  const books = data.books
  let lo = 0, hi = books.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (books[mid].verseStart <= verseIndex) lo = mid
    else hi = mid - 1
  }
  return lo
}
