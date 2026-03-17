import type { Metadata } from 'next'
import Link from 'next/link'
import PulsarMap from '@/components/studies/PulsarMap'
import { pulsarMapData } from '@/data/pulsar-map'

export const metadata: Metadata = {
  title: 'God IS Love — The Connected Map · Plain Prophecy',
  description: 'Every study. Every prophecy. Every doctrine. One truth at the centre.',
}

const CATEGORY_LEGEND = [
  { label: 'The Gospel', colour: '#C9A84C', bg: 'rgba(201,168,76,0.12)' },
  { label: 'Prophecy',   colour: '#7A9ABB', bg: 'rgba(90,130,170,0.12)' },
  { label: 'Doctrine',   colour: '#B8906A', bg: 'rgba(180,140,100,0.12)' },
]

export default function PulsarMapPage() {
  return (
    /*
     * Fullscreen container — 100dvh so it fills the true viewport on mobile
     * (avoids browser chrome overlap). Overflow hidden keeps it contained.
     */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#06060E',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Top bar: back link + page title ── */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '28px 24px 0',
          pointerEvents: 'none',
        }}
      >
        {/* Back link — re-enables pointer events */}
        <div
          style={{
            alignSelf: 'flex-start',
            pointerEvents: 'auto',
            marginBottom: 8,
          }}
        >
          <Link
            href="/studies"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.6)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ← Studies
          </Link>
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            margin: '0 0 10px',
          }}
        >
          Plain Prophecy · The Map
        </p>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(22px, 3.5vw, 44px)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            margin: '0 0 10px',
            textAlign: 'center',
            textShadow: '0 0 40px rgba(201,168,76,0.25)',
          }}
        >
          He{' '}
          <span style={{ color: '#C9A84C' }}>Calls Them</span>{' '}
          Each by Name
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            color: 'rgba(255,255,255,0.45)',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Every doctrine, every prophecy, every study — all orbiting one truth.
        </p>
      </header>

      {/* ── Map fills the rest ── */}
      <PulsarMap data={pulsarMapData} />

      {/* ── Bottom overlay: scripture + legend ── */}
      <footer
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '0 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        {/* Psalm quote */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(10px, 1.2vw, 12px)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.28)',
            margin: 0,
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
        >
          &ldquo;He determines the number of the stars and calls them each by name.&rdquo;
          <span
            style={{
              display: 'inline-block',
              marginLeft: 8,
              color: 'rgba(201,168,76,0.5)',
              fontStyle: 'normal',
              fontSize: '0.85em',
            }}
          >
            Psalm 147:4
          </span>
        </p>

        {/* Legend pills */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}
          aria-label="Map legend"
        >
          {CATEGORY_LEGEND.map(cat => (
            <div
              key={cat.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: cat.bg,
                border: `1px solid ${cat.colour}30`,
                borderRadius: 20,
                padding: '4px 12px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: cat.colour,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: cat.colour,
                  letterSpacing: '0.04em',
                }}
              >
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
