'use client'

import Link from 'next/link'
import { Share2, ExternalLink } from 'lucide-react'
import { formatVerseRef } from '@/data/book-metadata'
import { gapYears, shouldShowGap, formatBookDate } from '@/data/book-dates'
import { findChristThreadConnection } from '@/data/christ-thread'
import type { ArcHit, CrossReferenceData } from '@/types/connections'

interface ConnectionDetailProps {
  arc: ArcHit
  data: CrossReferenceData
  onShare: () => void
}

export default function ConnectionDetail({ arc, data, onShare }: ConnectionDetailProps) {
  const fromRef = formatVerseRef(arc.fromVerseIndex, data.chapters)
  const toRef = formatVerseRef(arc.toVerseIndex, data.chapters)

  const fromBookIndex = getBookIndex(arc.fromVerseIndex, data)
  const toBookIndex = getBookIndex(arc.toVerseIndex, data)
  const fromBook = data.books[fromBookIndex]
  const toBook = data.books[toBookIndex]

  const gap = gapYears(fromBook.abbr, toBook.abbr)
  const fromDate = formatBookDate(fromBook.abbr)
  const toDate = formatBookDate(toBook.abbr)

  // Check if this is a curated Christ Thread connection
  const fromOsis = toOsisRef(arc.fromVerseIndex, data)
  const toOsis = toOsisRef(arc.toVerseIndex, data)
  const christConn = findChristThreadConnection(fromOsis, toOsis)

  const crossTestament = fromBook.testament !== toBook.testament

  return (
    <div style={{ padding: '0 1rem 2rem', color: '#F5F5F0' }}>
      {/* Verse references */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 18,
            color: '#F5F5F0',
            marginBottom: 4,
          }}
        >
          {fromRef}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true">
            <path d="M6 0v16M2 12l4 4 4-4" stroke="#9A9A8A" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 18, color: '#F5F5F0' }}>
            {toRef}
          </div>
        </div>
      </div>

      {/* Cross-testament badge */}
      {crossTestament && (
        <div
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 6,
            padding: '6px 10px',
            marginBottom: 12,
            fontFamily: 'var(--font-inter)',
            fontSize: 11,
            color: '#C9A84C',
          }}
        >
          ✦ Cross-testament connection
        </div>
      )}

      {/* Christ Thread label */}
      {christConn && (
        <div
          style={{
            background: 'rgba(240,208,128,0.08)',
            border: '1px solid rgba(240,208,128,0.25)',
            borderRadius: 6,
            padding: '8px 12px',
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 12,
              color: '#F0D080',
              marginBottom: 4,
            }}
          >
            ✦ Christ Thread
          </div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#9A9A8A' }}>
            {christConn.label}
          </div>
        </div>
      )}

      {/* Why this matters — Christ Thread */}
      {christConn && (
        <div
          style={{
            borderLeft: '2px solid rgba(240,208,128,0.35)',
            paddingLeft: 12,
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 12,
              color: '#9A9A8A',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: 4,
            }}
          >
            This isn&apos;t coincidence — it&apos;s convergence. The same Spirit moved both writers toward the same revelation of Christ.
          </p>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 9, color: 'rgba(201,168,76,0.55)', letterSpacing: '0.08em' }}>
            2 TIMOTHY 3:16
          </p>
        </div>
      )}

      {/* Time gap */}
      {shouldShowGap(gap) && (
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 6,
            padding: '10px 12px',
            marginBottom: 16,
          }}
        >
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#9A9A8A', marginBottom: 6 }}>
            Written {fromDate} → Written {toDate}
          </div>
          <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 20, color: '#C9A84C', marginBottom: 2 }}>
            {gap.toLocaleString()} years
          </div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#9A9A8A', marginBottom: 8 }}>
            between the two authors
          </div>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: 'rgba(154,154,138,0.7)', fontStyle: 'italic' }}>
            Two people, separated by centuries — yet the echo is unmistakable.
          </div>
        </div>
      )}

      {/* Verse text (christ thread only) */}
      {christConn?.fromText && (
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: '#9A9A8A',
              lineHeight: 1.6,
              fontStyle: 'italic',
              borderLeft: '2px solid rgba(201,168,76,0.3)',
              paddingLeft: 12,
              marginBottom: 8,
            }}
          >
            {christConn.fromText}
          </p>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 10, color: '#C9A84C' }}>{fromRef}</p>
        </div>
      )}
      {christConn?.toText && (
        <div style={{ marginBottom: 16 }}>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: '#9A9A8A',
              lineHeight: 1.6,
              fontStyle: 'italic',
              borderLeft: '2px solid rgba(240,208,128,0.3)',
              paddingLeft: 12,
              marginBottom: 8,
            }}
          >
            {christConn.toText}
          </p>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 10, color: '#C9A84C' }}>{toRef}</p>
        </div>
      )}
      {!christConn && (
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#9A9A8A', marginBottom: 16, fontStyle: 'italic' }}>
          Open your Bible to read the verse text.
        </p>
      )}

      {/* Confidence badge */}
      {arc.votes > 5 && (
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 10, color: '#9A9A8A', marginBottom: 16 }}>
          Confidence: {arc.votes} scholar votes
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button
          onClick={onShare}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 6,
            padding: '10px 14px',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: '#C9A84C',
          }}
        >
          <Share2 size={14} />
          Share this connection
        </button>

        {/* CTA to related study */}
        {(fromBook.abbr === 'Dan' || toBook.abbr === 'Dan') && (
          <Link
            href="/studies/daniel/vision-one"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: '10px 14px',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: '#9A9A8A',
            }}
          >
            <ExternalLink size={14} />
            Explore the Daniel study
          </Link>
        )}
        {(fromBook.abbr === 'Rev' || toBook.abbr === 'Rev') && (
          <Link
            href="/studies"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: '10px 14px',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: '#9A9A8A',
            }}
          >
            <ExternalLink size={14} />
            Explore Revelation studies
          </Link>
        )}
      </div>
    </div>
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

function toOsisRef(verseIndex: number, data: CrossReferenceData): string {
  const books = data.books
  const chapters = data.chapters
  const bookIdx = getBookIndex(verseIndex, data)
  const book = books[bookIdx]

  // Find chapter
  let lo = 0, hi = chapters.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (chapters[mid].verseStart <= verseIndex) lo = mid
    else hi = mid - 1
  }
  const ch = chapters[lo]
  const verse = verseIndex - ch.verseStart + 1
  return `${book.abbr}.${ch.chapter}.${verse}`
}
