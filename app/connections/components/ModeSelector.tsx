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
    id: 'christThread',
    label: 'Christ Thread',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M7 1v12M3 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
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
              <span className="hidden sm:inline">{mode.label}</span>
            </button>
          )
        })}
      </div>

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
            <div style={{ padding: '10px 0 14px' }}>
              <VerseSearch
                data={data}
                onVerseSelect={onVerseSelect}
                onClear={onVerseClear}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book DNA instruction */}
      <AnimatePresence>
        {activeMode === 'bookDna' && (
          <motion.div
            key="dna-hint"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                padding: '8px 0 12px',
                fontFamily: 'var(--font-inter)',
                fontSize: 11,
                color: '#9A9A8A',
                fontStyle: 'italic',
              }}
            >
              Click any book label on the canvas to see its connection fingerprint.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Christ Thread caption */}
      <AnimatePresence>
        {activeMode === 'christThread' && (
          <motion.div
            key="ct-caption"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                padding: '8px 0 12px',
                fontFamily: 'var(--font-cinzel)',
                fontSize: 11,
                color: '#C9A84C',
                fontStyle: 'italic',
              }}
            >
              Every shadow has a substance. Every type has an antitype. Every arc points home.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
