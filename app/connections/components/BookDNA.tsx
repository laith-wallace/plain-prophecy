'use client'

import { useMemo, useRef, useEffect } from 'react'
import { BOOKS } from '@/data/book-metadata'
import type { CrossReferenceData } from '@/types/connections'

interface BookDNAProps {
  bookIndex: number
  data: CrossReferenceData
}

export default function BookDNA({ bookIndex, data }: BookDNAProps) {
  const book = BOOKS[bookIndex]
  const miniCanvasRef = useRef<HTMLCanvasElement>(null)

  const stats = useMemo(() => {
    if (!book) return null
    const refs = data.refs
    const books = data.books
    if (!books[bookIndex]) return null

    let total = 0
    const partnerCount: Map<number, number> = new Map()
    let crossTestament = 0
    let intraOT = 0
    const verseConnectionCount: Map<number, number> = new Map()

    for (const [from, to, ] of refs) {
      const fromBook = getBookIndex(from, books)
      const toBook = getBookIndex(to, books)

      if (fromBook !== bookIndex && toBook !== bookIndex) continue
      total++

      const partner = fromBook === bookIndex ? toBook : fromBook
      partnerCount.set(partner, (partnerCount.get(partner) ?? 0) + 1)

      if (books[fromBook].testament !== books[toBook].testament) crossTestament++
      else if (books[fromBook].testament === 'OT') intraOT++

      const myVerse = fromBook === bookIndex ? from : to
      verseConnectionCount.set(myVerse, (verseConnectionCount.get(myVerse) ?? 0) + 1)
    }

    // Strongest partner
    let strongestBook = -1
    let strongestCount = 0
    for (const [bIdx, cnt] of partnerCount) {
      if (cnt > strongestCount) { strongestCount = cnt; strongestBook = bIdx }
    }

    // Top 5 most-connected verses
    const topVerses = [...verseConnectionCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([verseIdx, count]) => {
        const ch = getChapter(verseIdx, data.chapters)
        const verse = verseIdx - ch.verseStart + 1
        return { ref: `${book.displayAbbr} ${ch.chapter}:${verse}`, count }
      })

    const crossPct = total > 0 ? Math.round((crossTestament / total) * 100) : 0
    const intraOTPct = total > 0 ? Math.round((intraOT / total) * 100) : 0

    return {
      total,
      strongestBook: strongestBook >= 0 ? books[strongestBook] : null,
      strongestCount,
      crossPct,
      intraOTPct,
      topVerses,
    }
  }, [bookIndex, book, data])

  // Mini arc diagram
  useEffect(() => {
    const canvas = miniCanvasRef.current
    if (!canvas || !stats || !book) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width = 200
    const H = canvas.height = 60
    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'
    ctx.scale(dpr, dpr)

    ctx.fillStyle = '#0A0A14'
    ctx.fillRect(0, 0, W, H)

    const lastChapter = data.chapters[data.chapters.length - 1]
    const totalVerses = lastChapter.verseStart + lastChapter.verseCount
    const baseline = H - 6

    ctx.lineWidth = 0.5
    ctx.globalAlpha = 0.8

    let drawn = 0
    for (const [from, to] of data.refs) {
      const fromBook = getBookIndex(from, data.books)
      const toBook = getBookIndex(to, data.books)
      if (fromBook !== bookIndex && toBook !== bookIndex) continue
      if (drawn > 500) break  // cap for mini canvas
      drawn++

      const x1 = (from / totalVerses) * W
      const x2 = (to / totalVerses) * W
      const span = Math.abs(x2 - x1)
      const peakY = baseline - Math.min(span * 0.45, baseline * 0.9)

      const dist = Math.abs(toBook - fromBook) / 66
      const r = Math.round(99 + (240 - 99) * dist)
      const g = Math.round(102 + (168 - 102) * dist)
      const b = Math.round(241 + (76 - 241) * dist)
      ctx.strokeStyle = `rgb(${r},${g},${b})`

      ctx.beginPath()
      ctx.moveTo(x1, baseline)
      ctx.quadraticCurveTo((x1 + x2) / 2, peakY, x2, baseline)
      ctx.stroke()
    }

    ctx.globalAlpha = 1
  }, [bookIndex, book, data, stats])

  if (!book || !stats) return null

  return (
    <div style={{ padding: '0 1rem 2rem', color: '#F5F5F0' }}>
      {/* Book title */}
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 22,
            color: '#F5F5F0',
            marginBottom: 4,
          }}
        >
          {book.name}
        </h2>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 11,
            color: '#9A9A8A',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {book.testament === 'OT' ? 'Old Testament' : 'New Testament'} · {book.chapters} chapters
        </span>
      </div>

      {/* Mini arc diagram */}
      <canvas
        ref={miniCanvasRef}
        aria-hidden="true"
        style={{ borderRadius: 4, marginBottom: 16, display: 'block' }}
      />

      {/* Total connections */}
      <div
        style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.15)',
          borderRadius: 6,
          padding: '10px 12px',
          marginBottom: 12,
        }}
      >
        <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 24, color: '#C9A84C' }}>
          {stats.total.toLocaleString()}
        </div>
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#9A9A8A' }}>
          total connections
        </div>
      </div>

      {/* Strongest link */}
      {stats.strongestBook && (
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 12,
            color: '#9A9A8A',
            marginBottom: 12,
            lineHeight: 1.5,
          }}
        >
          {book.displayAbbr} connects most strongly with{' '}
          <span style={{ color: '#F5F5F0' }}>{stats.strongestBook.name}</span>
          {' '}— {stats.strongestCount.toLocaleString()} shared arcs
        </div>
      )}

      {/* Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <StatPill label="Cross-testament" value={`${stats.crossPct}%`} />
        <StatPill label="Intra-OT" value={`${stats.intraOTPct}%`} />
      </div>

      {/* Top verses */}
      {stats.topVerses.length > 0 && (
        <div>
          <div
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 10,
              color: '#9A9A8A',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Most connected verses
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {stats.topVerses.map((v) => (
              <div
                key={v.ref}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 10px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 4,
                }}
              >
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 12, color: '#F5F5F0' }}>
                  {v.ref}
                </span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#C9A84C' }}>
                  {v.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 6,
        padding: '8px 10px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 16, color: '#F5F5F0', marginBottom: 2 }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 9, color: '#9A9A8A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
    </div>
  )
}

function getBookIndex(verseIndex: number, books: CrossReferenceData['books']): number {
  let lo = 0, hi = books.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (books[mid].verseStart <= verseIndex) lo = mid
    else hi = mid - 1
  }
  return lo
}

function getChapter(verseIndex: number, chapters: CrossReferenceData['chapters']) {
  let lo = 0, hi = chapters.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (chapters[mid].verseStart <= verseIndex) lo = mid
    else hi = mid - 1
  }
  return chapters[lo]
}
