'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { BOOKS } from '@/data/book-metadata'
import type { CrossReferenceData } from '@/types/connections'

interface VerseSearchProps {
  data: CrossReferenceData | null
  onVerseSelect: (verseIndex: number, connectionCount: number) => void
  onClear: () => void
}

interface Suggestion {
  label: string
  bookIndex: number
  chapter: number
  verse: number
  verseIndex: number
}

export default function VerseSearch({ data, onVerseSelect, onClear }: VerseSearchProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const [selected, setSelected] = useState<{ label: string; verseIndex: number; count: number } | null>(null)
  const [crossTestament, setCrossTestament] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const buildSuggestions = useCallback((q: string): Suggestion[] => {
    if (!q.trim() || !data) return []
    const lower = q.toLowerCase()
    const results: Suggestion[] = []

    for (const book of BOOKS) {
      if (
        !book.name.toLowerCase().startsWith(lower) &&
        !book.displayAbbr.toLowerCase().startsWith(lower) &&
        !book.abbr.toLowerCase().startsWith(lower)
      ) continue

      // Check for chapter/verse pattern: "Gen 1:1" or "Gen 1" or "Genesis 1:1"
      const rest = q.slice(book.name.length).trim() || q.slice(book.abbr.length).trim() || q.slice(book.displayAbbr.length).trim()
      const chVerseMatch = rest.match(/^(\d+)(?::(\d+))?/)

      if (chVerseMatch) {
        const chNum = parseInt(chVerseMatch[1])
        const verseNum = chVerseMatch[2] ? parseInt(chVerseMatch[2]) : 1
        if (chNum < 1 || chNum > book.chapters) continue

        // Find chapter entry in runtime data
        const chEntry = data.chapters.find(c => c.book === book.index && c.chapter === chNum)
        if (!chEntry) continue

        const vNum = Math.min(verseNum, chEntry.verseCount)
        const verseIndex = chEntry.verseStart + vNum - 1

        results.push({
          label: `${book.name} ${chNum}:${vNum}`,
          bookIndex: book.index,
          chapter: chNum,
          verse: vNum,
          verseIndex,
        })
        if (results.length >= 8) break
      } else {
        // Just a book name match — suggest first verse
        const chEntry = data.chapters.find(c => c.book === book.index && c.chapter === 1)
        if (chEntry) {
          results.push({
            label: `${book.name} 1:1`,
            bookIndex: book.index,
            chapter: 1,
            verse: 1,
            verseIndex: chEntry.verseStart,
          })
        }
        if (results.length >= 8) break
      }
    }
    return results
  }, [data])

  useEffect(() => {
    setSuggestions(buildSuggestions(query))
    setActiveIdx(-1)
  }, [query, buildSuggestions])

  const handleSelect = useCallback((sug: Suggestion) => {
    if (!data) return
    const refs = data.refs
    const count = refs.filter(r => r[0] === sug.verseIndex || r[1] === sug.verseIndex).length

    // Check if any connections cross testaments
    const fromBookIndex = sug.bookIndex
    let crosses = false
    for (const r of refs) {
      if (r[0] === sug.verseIndex || r[1] === sug.verseIndex) {
        const otherIdx = r[0] === sug.verseIndex ? r[1] : r[0]
        const otherBook = data.books.find(b => otherIdx >= b.verseStart && otherIdx <= b.verseEnd)
        if (otherBook && otherBook.testament !== data.books[fromBookIndex].testament) {
          crosses = true
          break
        }
      }
    }

    setCrossTestament(crosses)
    setSelected({ label: sug.label, verseIndex: sug.verseIndex, count })
    setQuery(sug.label)
    setSuggestions([])
    onVerseSelect(sug.verseIndex, count)
  }, [data, onVerseSelect])

  const handleClear = () => {
    setQuery('')
    setSelected(null)
    setCrossTestament(false)
    setSuggestions([])
    onClear()
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, -1))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      handleSelect(suggestions[activeIdx])
    } else if (e.key === 'Escape') {
      setSuggestions([])
      setActiveIdx(-1)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search a verse… e.g. Daniel 7:13"
          aria-label="Search a Bible verse to highlight its connections"
          aria-autocomplete="list"
          role="combobox"
          aria-controls="verse-search-listbox"
          aria-expanded={suggestions.length > 0}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 6,
            padding: '8px 36px 8px 12px',
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: '#F5F5F0',
            outline: 'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)' }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.25)' }}
        />
        {(query || selected) && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: 8,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9A9A8A',
              padding: 4,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {suggestions.length > 0 && (
        <ul
          ref={listRef}
          id="verse-search-listbox"
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            background: '#0D0D1A',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 6,
            padding: '4px 0',
            zIndex: 100,
            listStyle: 'none',
            margin: '4px 0 0',
          }}
        >
          {suggestions.map((sug, i) => (
            <li
              key={sug.label}
              role="option"
              aria-selected={i === activeIdx}
              onMouseDown={() => handleSelect(sug)}
              style={{
                padding: '7px 12px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                color: i === activeIdx ? '#C9A84C' : '#F5F5F0',
                background: i === activeIdx ? 'rgba(201,168,76,0.08)' : 'transparent',
              }}
            >
              {sug.label}
            </li>
          ))}
        </ul>
      )}

      {/* Results count */}
      {selected && (
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 10,
              color: '#C9A84C',
              background: 'rgba(201,168,76,0.1)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: 4,
              padding: '2px 6px',
            }}
          >
            {selected.count} connections found
          </span>
        </div>
      )}

      {/* Cross-testament banner */}
      {crossTestament && (
        <p
          style={{
            marginTop: 6,
            fontFamily: 'var(--font-inter)',
            fontSize: 10,
            color: '#9A9A8A',
            fontStyle: 'italic',
          }}
        >
          This verse speaks across both Testaments — written centuries apart.
        </p>
      )}
    </div>
  )
}
