'use client'

interface PulsarCoreProps {
  cx: number
  cy: number
}

const TOKENS = {
  gold: '#C9A84C',
  textMuted: 'rgba(255,255,255,0.55)',
  pulsarCore: '#FFFFFF',
  pulsarRing1: 'rgba(255,255,255,0.35)',
  pulsarRing2: 'rgba(240,208,128,0.18)',
  pulsarRing3: 'rgba(201,168,76,0.08)',
}

export default function PulsarCore({ cx, cy }: PulsarCoreProps) {
  return (
    <g className="pulsar-core-group">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes pulsar-ring {
            0%   { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(1.8); opacity: 0; }
          }
          .pulsar-ring-1 {
            transform-origin: ${cx}px ${cy}px;
            animation: pulsar-ring 2.5s ease-out infinite;
            animation-delay: 0s;
          }
          .pulsar-ring-2 {
            transform-origin: ${cx}px ${cy}px;
            animation: pulsar-ring 2.5s ease-out infinite;
            animation-delay: 0.6s;
          }
          .pulsar-ring-3 {
            transform-origin: ${cx}px ${cy}px;
            animation: pulsar-ring 2.5s ease-out infinite;
            animation-delay: 1.2s;
          }
        }
      `}</style>

      {/* Pulsing rings — rendered behind the core */}
      <circle
        className="pulsar-ring-3"
        cx={cx}
        cy={cy}
        r={90}
        fill="none"
        stroke={TOKENS.pulsarRing3}
        strokeWidth={1}
      />
      <circle
        className="pulsar-ring-2"
        cx={cx}
        cy={cy}
        r={60}
        fill="none"
        stroke={TOKENS.pulsarRing2}
        strokeWidth={1}
      />
      <circle
        className="pulsar-ring-1"
        cx={cx}
        cy={cy}
        r={36}
        fill="none"
        stroke={TOKENS.pulsarRing1}
        strokeWidth={1}
      />

      {/* Core glow */}
      <circle
        cx={cx}
        cy={cy}
        r={24}
        fill="rgba(201,168,76,0.08)"
      />

      {/* Core circle */}
      <circle
        cx={cx}
        cy={cy}
        r={18}
        fill={TOKENS.pulsarCore}
      />

      {/* "God IS Love" label */}
      <text
        x={cx}
        y={cy + 32 + 13}
        textAnchor="middle"
        fontFamily="'Cinzel', serif"
        fontSize={13}
        fill={TOKENS.gold}
        letterSpacing="0.05em"
      >
        God IS Love
      </text>

      {/* Scripture reference */}
      <text
        x={cx}
        y={cy + 32 + 13 + 14}
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize={10}
        fill={TOKENS.textMuted}
      >
        1 John 4:8
      </text>
    </g>
  )
}
