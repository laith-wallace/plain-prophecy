import type { Metadata } from 'next'
import Link from 'next/link'
import PulsarMap from '@/components/studies/PulsarMap'
import { pulsarMapData } from '@/data/pulsar-map'

export const metadata: Metadata = {
  title: 'God IS Love — The Connected Map · Plain Prophecy',
  description: 'Every study. Every prophecy. Every doctrine. One truth at the centre.',
}

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
        background: '#010408',
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
          padding: 'clamp(14px, 3vw, 28px) 16px 0',
          pointerEvents: 'none',
        }}
      >
        {/* Back link + Timeline link row — re-enables pointer events */}
        <div
          style={{
            alignSelf: 'flex-start',
            pointerEvents: 'auto',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
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
          <Link
            href="/studies/timeline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.45)',
              textDecoration: 'none',
            }}
          >
            Timeline →
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

      {/* ── Map fills the rest (psalm + filter pills rendered inside PulsarMap) ── */}
      <PulsarMap data={pulsarMapData} />
    </div>
  )
}
