'use client'

import React from 'react'
import { Framework, FrameworkData } from '@/data/timeline-visual'

interface TimelineFrameworkToggleProps {
  frameworks: FrameworkData[]
  active: Framework
  onChange: (fw: Framework) => void
}

export default function TimelineFrameworkToggle({
  frameworks,
  active,
  onChange,
}: TimelineFrameworkToggleProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      aria-label="Select prophetic framework"
      role="group"
    >
      {frameworks.map(fw => {
        const isActive = fw.id === active
        return (
          <button
            key={fw.id}
            onClick={() => onChange(fw.id)}
            aria-pressed={isActive}
            style={{
              minHeight: 36,
              padding: '6px 14px',
              borderRadius: 20,
              border: `${isActive ? 1.5 : 1}px solid ${isActive ? fw.accentColour : fw.accentColour + '40'}`,
              background: isActive ? `${fw.accentColour}18` : 'rgba(10,10,15,0.7)',
              color: isActive ? fw.accentColour : 'rgba(255,255,255,0.45)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: isActive ? 700 : 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'border-color 0.18s, background 0.18s, color 0.18s',
            }}
          >
            {fw.label}
          </button>
        )
      })}
    </div>
  )
}
