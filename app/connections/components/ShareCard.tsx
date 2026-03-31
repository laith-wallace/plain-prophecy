'use client'

import { useCallback } from 'react'
import { Download } from 'lucide-react'
import { formatVerseRef } from '@/data/book-metadata'
import { gapYears, shouldShowGap, formatBookDate } from '@/data/book-dates'
import { findChristThreadConnection } from '@/data/christ-thread'
import type { ArcHit, CrossReferenceData } from '@/types/connections'

interface ShareCardProps {
  arc: ArcHit
  data: CrossReferenceData
}

export default function ShareCard({ arc, data }: ShareCardProps) {
  const handleDownload = useCallback(async () => {
    const fromRef = formatVerseRef(arc.fromVerseIndex, data.chapters)
    const toRef = formatVerseRef(arc.toVerseIndex, data.chapters)
    const fromBook = getBookAbbr(arc.fromVerseIndex, data)
    const toBook = getBookAbbr(arc.toVerseIndex, data)
    const fromOsis = toOsisRef(arc.fromVerseIndex, data)
    const toOsis = toOsisRef(arc.toVerseIndex, data)
    const christConn = findChristThreadConnection(fromOsis, toOsis)
    const gap = gapYears(fromBook, toBook)
    const fromDate = formatBookDate(fromBook)
    const toDate = formatBookDate(toBook)

    // Create a 1080×1080 canvas
    const SIZE = 1080
    const canvas = document.createElement('canvas')
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Background
    ctx.fillStyle = '#08080F'
    ctx.fillRect(0, 0, SIZE, SIZE)

    // Radial gold glow
    const grd = ctx.createRadialGradient(540, 200, 0, 540, 200, 500)
    grd.addColorStop(0, 'rgba(201,168,76,0.12)')
    grd.addColorStop(1, 'transparent')
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, SIZE, SIZE)

    // Wordmark
    ctx.font = '700 28px "Cinzel", serif'
    ctx.fillStyle = '#F5F5F0'
    ctx.textAlign = 'center'
    ctx.fillText('Plain Prophecy', 540, 90)

    // Divider line
    ctx.strokeStyle = 'rgba(201,168,76,0.2)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(200, 110)
    ctx.lineTo(880, 110)
    ctx.stroke()

    // Stars/flourish
    ctx.fillStyle = '#C9A84C'
    ctx.font = '20px serif'
    ctx.fillText('✦', 540, 320)

    // From verse
    ctx.font = 'italic 700 38px "Cinzel", serif'
    ctx.fillStyle = '#C9A84C'
    ctx.textAlign = 'center'
    ctx.fillText(fromRef, 540, 380)

    // Arrow / gap
    if (shouldShowGap(gap)) {
      ctx.font = '500 22px Inter, sans-serif'
      ctx.fillStyle = '#9A9A8A'
      ctx.fillText(`↕  ${gap.toLocaleString()} years  ↕`, 540, 435)
    } else {
      ctx.font = '500 22px Inter, sans-serif'
      ctx.fillStyle = '#9A9A8A'
      ctx.fillText('↕', 540, 435)
    }

    // To verse
    ctx.font = 'italic 700 38px "Cinzel", serif'
    ctx.fillStyle = '#C9A84C'
    ctx.fillText(toRef, 540, 495)

    // Verse text (christ thread only)
    if (christConn?.fromText) {
      const text = christConn.fromText.length > 140
        ? christConn.fromText.slice(0, 140) + '…'
        : christConn.fromText
      ctx.font = 'italic 20px Inter, sans-serif'
      ctx.fillStyle = '#9A9A8A'
      wrapText(ctx, `"${text}"`, 540, 590, 760, 32)
    }

    // Date range
    if (shouldShowGap(gap) && fromDate && toDate) {
      ctx.font = '400 20px Inter, sans-serif'
      ctx.fillStyle = '#9A9A8A'
      ctx.textAlign = 'center'
      ctx.fillText(`Written ${fromDate}  ·  Written ${toDate}`, 540, 850)
    }

    // URL
    ctx.font = '400 18px Inter, sans-serif'
    ctx.fillStyle = '#C9A84C'
    ctx.fillText('plainprophecy.com/connections', 540, 980)

    // Border flourish
    ctx.strokeStyle = 'rgba(201,168,76,0.1)'
    ctx.lineWidth = 2
    ctx.strokeRect(30, 30, SIZE - 60, SIZE - 60)

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `connection-${fromRef.replace(/\s/g, '-')}-${toRef.replace(/\s/g, '-')}.png`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 5000)
    }, 'image/png')
  }, [arc, data])

  return (
    <button
      onClick={handleDownload}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6,
        padding: '10px 14px',
        cursor: 'pointer',
        fontFamily: 'var(--font-inter)',
        fontSize: 13,
        color: '#9A9A8A',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Download size={14} />
      Download share card (1080×1080)
    </button>
  )
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): void {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  ctx.textAlign = 'center'
  for (const word of words) {
    const testLine = line + word + ' '
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY)
      line = word + ' '
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  if (line.trim()) ctx.fillText(line.trim(), x, currentY)
}

function getBookAbbr(verseIndex: number, data: CrossReferenceData): string {
  const books = data.books
  let lo = 0, hi = books.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (books[mid].verseStart <= verseIndex) lo = mid
    else hi = mid - 1
  }
  return books[lo].abbr
}

function toOsisRef(verseIndex: number, data: CrossReferenceData): string {
  const books = data.books
  const chapters = data.chapters
  const bookIdx = getBookIndexFromVerse(verseIndex, data)
  const book = books[bookIdx]

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

function getBookIndexFromVerse(verseIndex: number, data: CrossReferenceData): number {
  const books = data.books
  let lo = 0, hi = books.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (books[mid].verseStart <= verseIndex) lo = mid
    else hi = mid - 1
  }
  return lo
}
