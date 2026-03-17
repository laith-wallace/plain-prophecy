'use client'

interface PulsarCoreProps {
  cx: number
  cy: number
}

const GOLD = '#C9A84C'
const GOLD_LIGHT = '#F0D080'

export default function PulsarCore({ cx, cy }: PulsarCoreProps) {
  return (
    <g className="pulsar-core-group">
      <defs>
        {/* Core radial glow */}
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#FFFFFF" stopOpacity={1} />
          <stop offset="30%" stopColor={GOLD_LIGHT} stopOpacity={0.8} />
          <stop offset="70%" stopColor={GOLD} stopOpacity={0.3} />
          <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
        </radialGradient>
      </defs>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes pulsar-ring {
            0%   { transform: scale(0.5); opacity: 0.9; }
            100% { transform: scale(2.2); opacity: 0;   }
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

      {/* Outer corona glow — very wide, very faint */}
      <circle
        cx={cx}
        cy={cy}
        r={140}
        fill="rgba(201,168,76,0.04)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={100}
        fill="rgba(240,208,128,0.06)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={70}
        fill="rgba(255,230,150,0.09)"
      />

      {/* Animated rings */}
      <circle
        className="pulsar-ring-3"
        cx={cx}
        cy={cy}
        r={110}
        fill="none"
        stroke="rgba(201,168,76,0.10)"
        strokeWidth={1.5}
      />
      <circle
        className="pulsar-ring-2"
        cx={cx}
        cy={cy}
        r={75}
        fill="none"
        stroke="rgba(240,208,128,0.22)"
        strokeWidth={1.5}
      />
      <circle
        className="pulsar-ring-1"
        cx={cx}
        cy={cy}
        r={44}
        fill="none"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth={2}
      />

      {/* Inner warm haze */}
      <circle
        cx={cx}
        cy={cy}
        r={36}
        fill="rgba(255,220,120,0.14)"
      />

      {/* Core glow circle — gradient */}
      <circle
        cx={cx}
        cy={cy}
        r={28}
        fill="url(#core-glow)"
      />

      {/* Hard white core */}
      <circle
        cx={cx}
        cy={cy}
        r={14}
        fill="#FFFFFF"
      />

      {/* "God IS Love" label */}
      <text
        x={cx}
        y={cy + 48}
        textAnchor="middle"
        fontFamily="'Cinzel', serif"
        fontSize={14}
        fontWeight={700}
        fill={GOLD}
        letterSpacing="0.08em"
      >
        God IS Love
      </text>

      {/* Scripture reference */}
      <text
        x={cx}
        y={cy + 64}
        textAnchor="middle"
        fontFamily="'Inter', sans-serif"
        fontSize={10}
        fill="rgba(255,255,255,0.45)"
        letterSpacing="0.04em"
      >
        1 John 4:8
      </text>
    </g>
  )
}
