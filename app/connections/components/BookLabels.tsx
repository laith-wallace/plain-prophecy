'use client'

import type { BookMeta } from '@/types/connections'

interface BookLabelsProps {
  books: BookMeta[] | undefined
  chapters: { book: number; verseStart: number; verseCount: number; chapterStart: number }[] | undefined
  onBookClick: (bookIndex: number) => void
}

export default function BookLabels({ books, chapters, onBookClick }: BookLabelsProps) {
  if (!books || !chapters) return null

  const totalVerses = chapters[chapters.length - 1].verseStart + chapters[chapters.length - 1].verseCount
  const mattBook = books[39]
  const ntX = mattBook ? (mattBook.verseStart / totalVerses) * 100 : 50

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 32,
        pointerEvents: 'none',
        /* Gradient shelf lifts labels off the arc visualization */
        background: 'linear-gradient(to top, rgba(8,8,15,0.85) 0%, transparent 100%)',
      }}
      className="hidden sm:block"
    >
      {books.map((book) => {
        const leftPct = (book.verseStart / totalVerses) * 100
        const widthPct = (book.totalVerses / totalVerses) * 100
        return (
          <button
            key={book.abbr}
            onClick={() => onBookClick(book.index)}
            title={book.name}
            style={{
              position: 'absolute',
              left: `${leftPct}%`,
              width: `${widthPct}%`,
              bottom: 4,
              height: 22,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
              overflow: 'hidden',
            }}
          >
            {widthPct > 1.2 && (
              <span
                style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: 8,
                  color: '#C8C8B8',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  userSelect: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                {book.displayAbbr}
              </span>
            )}
          </button>
        )
      })}

      {/* OT/NT divider */}
      <div
        style={{
          position: 'absolute',
          left: `${ntX}%`,
          bottom: 34,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
        className="hidden md:flex"
      >
        <div style={{ width: 20, height: 1, background: 'rgba(201,168,76,0.3)' }} />
        <span
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 7,
            color: '#C9A84C',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}
        >
          OT · NT
        </span>
        <div style={{ width: 20, height: 1, background: 'rgba(201,168,76,0.3)' }} />
      </div>
    </div>
  )
}
