'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Layers, Link2, Map } from 'lucide-react'
import VerseSearch from './VerseSearch'
import type { FilterMode, CrossReferenceData } from '@/types/connections'

interface ModeSelectorProps {
  activeMode: FilterMode
  data: CrossReferenceData | null
  onModeChange: (mode: FilterMode) => void
  onVerseSelect: (verseIndex: number, count: number) => void
  onVerseClear: () => void
}

const MODES: { id: FilterMode; label: string; icon: React.ReactNode }[] = [
  {
    id: 'christThread',
    label: 'Christ Thread',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1v12M3 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'base',
    label: 'Full Web',
    icon: <Layers size={14} />,
  },
  {
    id: 'verse',
    label: 'Scripture Links',
    icon: <Link2 size={14} />,
  },
  {
    id: 'prophecyHighway',
    label: 'Prophecy Highway',
    icon: <Map size={14} />,
  },
  {
    id: 'bookDna',
    label: 'Book DNA',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M3 2c0 3 8 3 8 7M11 2C11 5 3 5 3 9M3 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const MODE_DESCRIPTORS: Record<FilterMode, string> = {
  christThread: 'Tracing the scarlet thread from Genesis to Revelation',
  base: 'All 63,779 cross-references — the fingerprint of divine authorship',
  verse: 'Search any verse to see every thread connecting to it',
  prophecyHighway: 'Connections within the prophetic-core books',
  bookDna: 'Tap a book label on the canvas to see its connection fingerprint',
  path: 'Following a guided journey through Scripture',
}

export default function ModeSelector({
  activeMode,
  data,
  onModeChange,
  onVerseSelect,
  onVerseClear,
}: ModeSelectorProps) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 1rem',
      }}
    >
      {/* Tab row */}
      <div
        role="tablist"
        aria-label="Visualisation modes"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          gap: 0,
        }}
      >
        {MODES.map((mode) => {
          const isActive = activeMode === mode.id
          return (
            <button
              key={mode.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onModeChange(mode.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 14px',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid #C9A84C' : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter)',
                fontSize: 12,
                color: isActive ? '#C9A84C' : '#9A9A8A',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s, border-color 0.15s',
                flexShrink: 0,
              }}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          )
        })}
      </div>

      {/* Mode descriptor */}
      <motion.p
        key={activeMode}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '6px 0 10px',
          fontFamily: activeMode === 'christThread' ? 'var(--font-cinzel)' : 'var(--font-inter)',
          fontSize: 11,
          color: activeMode === 'christThread' ? '#C9A84C' : '#9A9A8A',
          fontStyle: 'italic',
        }}
      >
        {MODE_DESCRIPTORS[activeMode]}
      </motion.p>

      {/* Scripture Links search input */}
      <AnimatePresence>
        {activeMode === 'verse' && (
          <motion.div
            key="verse-search"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 14 }}>
              <VerseSearch
                data={data}
                onVerseSelect={onVerseSelect}
                onClear={onVerseClear}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
