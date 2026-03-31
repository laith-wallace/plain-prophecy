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
  // NT divider position
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
        height: 24,
        pointerEvents: 'none',
      }}
      className="hidden sm:block"
    >
      {/* Book name labels */}
      {books.map((book) => {
        const leftPct = (book.verseStart / totalVerses) * 100
        const widthPct = (book.totalVerses / totalVerses) * 100
        return (
          <button
            key={book.index}
            onClick={() => onBookClick(book.index)}
            title={book.name}
            style={{
              position: 'absolute',
              left: `${leftPct}%`,
              width: `${widthPct}%`,
              bottom: 2,
              height: 20,
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
                  fontSize: 7,
                  color: '#9A9A8A',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  userSelect: 'none',
                }}
              >
                {book.displayAbbr}
              </span>
            )}
          </button>
        )
      })}

      {/* OT/NT divider label */}
      <div
        style={{
          position: 'absolute',
          left: `${ntX}%`,
          bottom: 26,
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
        className="hidden md:flex"
      >
        <span
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 7,
            color: '#C9A84C',
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
          }}
        >
          OT · NT
        </span>
      </div>
    </div>
  )
}
