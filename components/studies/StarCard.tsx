'use client'

import React from 'react'
import Link from 'next/link'
import { PulsarStar, StarCategory } from '@/data/pulsar-map'

interface StarCardProps {
  star: PulsarStar
  onClose: () => void
}

const CATEGORY_LABELS: Record<StarCategory, string> = {
  gospel: 'The Gospel',
  prophecy: 'Prophecy',
  doctrine: 'Doctrine',
}

const CATEGORY_PILL_STYLES: Record<StarCategory, React.CSSProperties> = {
  gospel: {
    background: 'rgba(201,168,76,0.15)',
    color: '#C9A84C',
  },
  prophecy: {
    background: 'rgba(90,130,170,0.15)',
    color: '#7A9ABB',
  },
  doctrine: {
    background: 'rgba(180,140,100,0.15)',
    color: '#B8906A',
  },
}

export default function StarCard({ star, onClose }: StarCardProps) {
  const pillStyle = CATEGORY_PILL_STYLES[star.category]

  return (
    <>
      <style>{`
        @keyframes card-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes card-fade-in {
          from { transform: translateX(-8px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .star-card-mobile {
          animation: card-slide-up 0.3s ease-out forwards;
        }
        .star-card-desktop {
          animation: card-fade-in 0.25s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .star-card-mobile,
          .star-card-desktop {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Mobile backdrop */}
      <div
        className="star-card-backdrop"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(0,0,0,0.5)',
          display: 'none',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="star-card star-card-mobile star-card-desktop"
        role="dialog"
        aria-modal="false"
        aria-label={`${star.label} study card`}
        style={{
          background: 'linear-gradient(160deg, #141410 0%, #0A0A06 100%)',
          border: '1px solid rgba(201,168,76,0.22)',
          borderRadius: 20,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {/* Header row: pill + close */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              ...pillStyle,
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 20,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {CATEGORY_LABELS[star.category]}
          </span>

          <button
            onClick={onClose}
            aria-label="Close card"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.55)',
              fontSize: 20,
              lineHeight: 1,
              padding: '4px 8px',
              borderRadius: 6,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          >
            ×
          </button>
        </div>

        {/* Star label */}
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 24,
            fontWeight: 700,
            color: '#FFFFFF',
            margin: '0 0 6px 0',
            lineHeight: 1.2,
          }}
        >
          {star.label}
        </h2>

        {/* Scripture reference */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: '#C9A84C',
            margin: '0 0 16px 0',
            letterSpacing: '0.04em',
          }}
        >
          {star.scripture}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.08)',
            marginBottom: 14,
          }}
        />

        {/* Scripture text */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 13,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 16px 0',
            lineHeight: 1.6,
          }}
        >
          &ldquo;{star.scriptureText}&rdquo;
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.08)',
            marginBottom: 16,
          }}
        />

        {/* God IS Love label */}
        <p
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 9,
            color: '#C9A84C',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: '0 0 10px 0',
          }}
        >
          ✦ God is Love
        </p>

        {/* Love connection — Christ-block pattern */}
        <div
          style={{
            borderLeft: '3px solid #C9A84C',
            paddingLeft: 14,
            marginBottom: 16,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {star.loveConnection}
          </p>
        </div>

        {/* Summary */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.65,
            margin: '0 0 20px 0',
          }}
        >
          {star.summary}
        </p>

        {/* CTA */}
        {star.status === 'live' ? (
          <Link
            href={star.href}
            style={{
              display: 'block',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#C9A84C',
              border: '1px solid rgba(201,168,76,0.5)',
              borderRadius: 8,
              padding: '10px 18px',
              textDecoration: 'none',
              textAlign: 'center',
              background: 'transparent',
              transition: 'background 0.2s ease',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.background = 'rgba(201,168,76,0.12)')
            }
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.background = 'transparent')
            }
          >
            Start study →
          </Link>
        ) : (
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '10px 18px',
              textAlign: 'center',
              letterSpacing: '0.02em',
              cursor: 'default',
            }}
          >
            Coming soon
          </div>
        )}
      </div>
    </>
  )
}
