import type { Metadata } from 'next'
import EmpireMap from '@/components/studies/EmpireMap'

export const metadata: Metadata = {
  title: 'Empire Map — Daniel 2 · Plain Prophecy',
  description:
    'The empires of Daniel 2 — Babylon, Medo-Persia, Greece, and Rome — placed on an interactive ancient world map. See the prophecy come to life in real geography.',
  openGraph: {
    title: 'Empire Map — Daniel 2 · Plain Prophecy',
    description:
      'Watch Babylon, Persia, Greece, and Rome rise and fall across the ancient world — exactly as Daniel foresaw centuries before it happened.',
    type: 'website',
  },
}

export default function EmpireMapPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0d1018',
        overflow: 'hidden',
      }}
    >
      <EmpireMap />
    </div>
  )
}
