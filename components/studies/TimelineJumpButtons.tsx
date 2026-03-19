import React from 'react'
import { PeriodBand } from '@/data/timeline-visual'

interface TimelineJumpButtonsProps {
  bands: PeriodBand[]
  onJump: (band: PeriodBand) => void
  hidden: boolean
}

/** Strip short label from "70 Weeks — 490 Years" → "70 Weeks" */
function shortBandLabel(label: string): string {
  const dash = label.indexOf(' —')
  return dash !== -1 ? label.slice(0, dash) : label
}

export default function TimelineJumpButtons({ bands, onJump, hidden }: TimelineJumpButtonsProps) {
  if (hidden) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 'calc(max(36px, env(safe-area-inset-bottom)) + 28px)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 15,
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        maxWidth: '100%',
        padding: '0 16px',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
        pointerEvents: 'auto',
      } as React.CSSProperties}
      aria-label="Jump to prophetic period"
    >
      {bands.map(band => (
        <button
          key={band.id}
          onClick={() => onJump(band)}
          title={`Jump to ${band.label}`}
          aria-label={`Jump to ${band.label}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '8px 14px',
            background: 'rgba(10,10,15,0.82)',
            border: `1px solid ${band.stroke}55`,
            borderRadius: 999,
            color: 'rgba(255,255,255,0.72)',
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            whiteSpace: 'nowrap',
            minHeight: 36,
            flexShrink: 0,
            transition: 'border-color 0.14s, background 0.14s, color 0.14s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${band.stroke}bb`
            e.currentTarget.style.background = `${band.stroke}1a`
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = `${band.stroke}55`
            e.currentTarget.style.background = 'rgba(10,10,15,0.82)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: band.stroke,
              flexShrink: 0,
              boxShadow: `0 0 6px ${band.stroke}88`,
            }}
          />
          {shortBandLabel(band.label)}
        </button>
      ))}
    </div>
  )
}
