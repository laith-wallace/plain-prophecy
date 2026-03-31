'use client'

import type { DiscoveryStep, CrossReferenceData } from '@/types/connections'

interface PathStepProps {
  step: DiscoveryStep
  stepNumber: number
  totalSteps: number
  data: CrossReferenceData | null
}

export default function PathStep({ step, stepNumber, totalSteps, data }: PathStepProps) {
  const fromLabel = resolveOsis(step.from, data)
  const toLabel = resolveOsis(step.to, data)

  return (
    <div style={{ padding: '0 0 1rem' }}>
      {/* Step number */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 10, color: '#C9A84C' }}>
            {stepNumber}
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#9A9A8A' }}>
          Step {stepNumber} of {totalSteps}
        </span>
      </div>

      {/* Verse refs */}
      <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 13, color: '#C9A84C' }}>
          {fromLabel}
        </span>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
          <path d="M0 5h16M11 1l4 4-4 4" stroke="#9A9A8A" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 13, color: '#C9A84C' }}>
          {toLabel}
        </span>
      </div>

      {/* Caption */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 14,
          color: '#F5F5F0',
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {step.caption}
      </p>
    </div>
  )
}

function resolveOsis(osis: string, data: CrossReferenceData | null): string {
  if (!data) {
    // Fall back to parsing from OSIS string
    const parts = osis.split('.')
    if (parts.length < 3) return osis
    return `${parts[0]} ${parts[1]}:${parts[2]}`
  }
  const parts = osis.split('.')
  if (parts.length < 3) return osis
  const bookAbbr = parts.slice(0, parts.length - 2).join('.')
  const ch = parseInt(parts[parts.length - 2])
  const v = parseInt(parts[parts.length - 1])
  const book = data.books.find(b => b.abbr === bookAbbr)
  if (!book) return `${bookAbbr} ${ch}:${v}`
  return `${book.displayAbbr} ${ch}:${v}`
}
