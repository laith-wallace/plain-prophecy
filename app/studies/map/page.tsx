import type { Metadata } from 'next'
import PulsarMap from '@/components/studies/PulsarMap'
import { pulsarMapData } from '@/data/pulsar-map'

export const metadata: Metadata = {
  title: 'God IS Love — The Connected Map · Plain Prophecy',
  description: 'Every study. Every prophecy. Every doctrine. One truth at the centre.',
}

const CATEGORY_LEGEND = [
  { label: 'The Gospel', colour: '#C9A84C', bg: 'rgba(201,168,76,0.15)' },
  { label: 'Prophecy',   colour: '#7A9ABB', bg: 'rgba(90,130,170,0.15)' },
  { label: 'Doctrine',   colour: '#B8906A', bg: 'rgba(180,140,100,0.15)' },
]

export default function PulsarMapPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#08080F',
        color: '#FFFFFF',
        paddingBottom: 64,
      }}
    >
      {/* Page header */}
      <header
        style={{
          textAlign: 'center',
          padding: '64px 24px 48px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)',
            marginBottom: 16,
          }}
        >
          Plain Prophecy · The Map
        </p>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.15,
            margin: '0 auto 16px',
            maxWidth: 640,
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
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 480,
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}
        >
          Every doctrine, every prophecy, every study — all orbiting one truth.
        </p>

        {/* Scripture pull quote */}
        <blockquote
          style={{
            maxWidth: 420,
            margin: '0 auto',
            padding: '16px 20px',
            borderLeft: '3px solid rgba(201,168,76,0.4)',
            background: 'rgba(201,168,76,0.05)',
            borderRadius: '0 10px 10px 0',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 14,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.75)',
              margin: '0 0 8px 0',
              lineHeight: 1.65,
            }}
          >
            &ldquo;He determines the number of the stars and calls them each by name.&rdquo;
          </p>
          <cite
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: '#C9A84C',
              fontStyle: 'normal',
              letterSpacing: '0.06em',
            }}
          >
            Psalm 147:4
          </cite>
        </blockquote>
      </header>

      {/* Map — padded container */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 16px',
        }}
      >
        <PulsarMap data={pulsarMapData} />
      </div>

      {/* Legend footer */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
          padding: '40px 24px 0',
        }}
        aria-label="Map legend"
      >
        {CATEGORY_LEGEND.map(cat => (
          <div
            key={cat.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: cat.bg,
              border: `1px solid ${cat.colour}33`,
              borderRadius: 20,
              padding: '6px 14px',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: cat.colour,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: cat.colour,
                letterSpacing: '0.04em',
              }}
            >
              {cat.label}
            </span>
          </div>
        ))}
      </footer>
    </main>
  )
}
