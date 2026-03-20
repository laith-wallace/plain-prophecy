'use client'

import React from 'react'
import { TimelineEvent } from '@/data/timeline-visual'
import { ScriptureRef } from '@/components/ui/ScriptureRef'

interface TimelineEventCardProps {
  event: TimelineEvent
  accentColour: string
  onClose: () => void
}

const BADGE_LABELS: Record<string, string> = {
  fulfilled:  'Fulfilled',
  historical: 'Historical',
  present:    'Present Age',
  future:     'Future',
}

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  fulfilled:  { background: 'rgba(58,123,213,0.15)',  color: '#7aaee8' },
  historical: { background: 'rgba(46,125,82,0.15)',   color: '#5abf88' },
  present:    { background: 'rgba(184,134,11,0.15)',  color: '#d4a43a' },
  future:     { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' },
}

export default function TimelineEventCard({ event, accentColour, onClose }: TimelineEventCardProps) {
  const badgeStyle = BADGE_STYLES[event.badge] ?? BADGE_STYLES.future

  return (
    <>
      <style>{`
        @keyframes tl-card-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes tl-card-fade-in {
          from { transform: translateX(10px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .tl-card-mobile  { animation: tl-card-slide-up 0.28s ease-out forwards; }
        .tl-card-desktop { animation: tl-card-fade-in  0.22s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .tl-card-mobile, .tl-card-desktop { animation: none; opacity: 1; transform: none; }
        }
        @media (max-width: 767px) {
          .tl-card {
            max-height: 66vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            border-radius: 18px 18px 0 0 !important;
            padding-bottom: max(16px, env(safe-area-inset-bottom)) !important;
          }
          .tl-card h2 { font-size: 18px !important; }
        }
        @media (min-width: 768px) {
          .tl-card-backdrop { display: none !important; }
        }
      `}</style>

      {/* Mobile backdrop */}
      <div
        className="tl-card-backdrop"
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(0,0,0,0.55)',
        }}
      />

      <div
        className="tl-card tl-card-mobile tl-card-desktop"
        role="dialog"
        aria-modal="false"
        aria-label={`${event.label} — timeline event`}
        style={{
          background: 'linear-gradient(160deg, #141410 0%, #0A0A06 100%)',
          border: `1px solid ${accentColour}33`,
          borderRadius: 18,
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span
            style={{
              ...badgeStyle,
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 20,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {BADGE_LABELS[event.badge]}
          </span>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.45)',
              fontSize: 20,
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: 6,
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            ×
          </button>
        </div>

        {/* Date */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 10,
          color: accentColour,
          margin: '0 0 6px 0',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          {event.dateLabel}
        </p>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Cinzel', serif",
          fontSize: 22,
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 14px 0',
          lineHeight: 1.2,
        }}>
          {event.label}
        </h2>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 14 }} />

        {/* Description */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13.5,
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.72,
          margin: '0 0 16px 0',
        }}>
          {event.desc}
        </p>

        {/* Scripture refs */}
        {event.refs && (
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: accentColour,
            margin: 0,
            opacity: 0.8,
            letterSpacing: '0.02em',
          }}>
            {event.refs.split(' · ').map((ref, i, arr) => (
              <span key={ref}>
                <ScriptureRef style={{ color: accentColour }}>{ref.trim()}</ScriptureRef>
                {i < arr.length - 1 && (
                  <span style={{ opacity: 0.5 }}> · </span>
                )}
              </span>
            ))}
          </p>
        )}
      </div>
    </>
  )
}
