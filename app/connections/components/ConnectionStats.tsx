'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface ConnectionStatsProps {
  triggered: boolean
}

export default function ConnectionStats({ triggered }: ConnectionStatsProps) {
  const count = useMotionValue(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (triggered && !hasAnimated.current) {
      hasAnimated.current = true
      animate(count, 63779, { duration: 2.2, ease: 'easeOut' })
    }
  }, [triggered, count])

  return (
    <div className="text-center pt-10 pb-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={triggered ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CountDisplay count={count} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={triggered ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.9rem',
          color: '#9A9A8A',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginTop: '0.5rem',
        }}
      >
        40 authors · 1,500 years · one story
      </motion.p>
    </div>
  )
}

function CountDisplay({ count }: { count: ReturnType<typeof useMotionValue<number>> }) {
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString())
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.5rem' }}>
      <motion.span
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          color: '#C9A84C',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {rounded}
      </motion.span>
      <span
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: '#9A9A8A',
          letterSpacing: '0.05em',
        }}
      >
        connections
      </span>
    </div>
  )
}
