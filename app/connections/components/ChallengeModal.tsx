'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { CHALLENGES } from '@/data/connection-challenges'
import type { Challenge, FindItChallenge, CountItChallenge, NameItChallenge } from '@/types/connections'

interface ChallengeModalProps {
  open: boolean
  onClose: () => void
}

export default function ChallengeModal({ open, onClose }: ChallengeModalProps) {
  const challengeRef = useRef<Challenge | null>(null)
  if (!challengeRef.current) {
    challengeRef.current = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]
  }

  const challenge = challengeRef.current
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

  function handleClose() {
    setAnswer('')
    setResult(null)
    challengeRef.current = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]
    onClose()
  }

  function checkAnswer() {
    if (!challenge) return
    let correct = false

    if (challenge.type === 'countIt') {
      const num = parseInt(answer)
      const c = challenge as CountItChallenge
      correct = !isNaN(num) && Math.abs(num - c.correctAnswer) <= c.tolerance
    } else if (challenge.type === 'nameIt') {
      // handled by button click
    } else if (challenge.type === 'findIt') {
      const lower = answer.toLowerCase()
      const c = challenge as FindItChallenge
      correct =
        c.targetArcTo.toLowerCase().includes(lower) ||
        lower.includes(c.targetArcTo.split('.')[0].toLowerCase())
    }

    setResult(correct ? 'correct' : 'wrong')
    if (correct) {
      setTimeout(handleClose, 1800)
    }
  }

  function handleNameItSelect(idx: number) {
    const c = challenge as NameItChallenge
    const correct = idx === c.correctIndex
    setResult(correct ? 'correct' : 'wrong')
    if (correct) setTimeout(handleClose, 1800)
  }

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8,8,15,0.7)',
              zIndex: 80,
              backdropFilter: 'blur(2px)',
            }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 90,
              width: 'min(440px, calc(100vw - 32px))',
              background: '#0D0D1A',
              border: result === 'correct'
                ? '1px solid rgba(240,208,128,0.5)'
                : '1px solid rgba(201,168,76,0.2)',
              borderRadius: 12,
              padding: '24px',
              boxShadow: result === 'correct'
                ? '0 0 24px rgba(240,208,128,0.15)'
                : '0 20px 60px rgba(0,0,0,0.5)',
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Dismiss challenge"
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#9A9A8A',
                padding: 4,
              }}
            >
              <X size={16} />
            </button>

            {/* Label */}
            <div
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 9,
                color: '#C9A84C',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Challenge
            </div>

            {/* Question */}
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 15,
                color: '#F5F5F0',
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              {challenge?.question}
            </p>

            {/* Answer area */}
            {result === null && challenge && (
              <AnswerArea
                challenge={challenge}
                answer={answer}
                onAnswerChange={setAnswer}
                onSubmit={checkAnswer}
                onNameItSelect={handleNameItSelect}
              />
            )}

            {/* Hint (FindIt) */}
            {challenge?.type === 'findIt' && result === null && (
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: '#9A9A8A', marginTop: 10, fontStyle: 'italic' }}>
                Hint: {(challenge as FindItChallenge).hint}
              </p>
            )}

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: 16, textAlign: 'center' }}
                >
                  {result === 'correct' ? (
                    <div>
                      <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: 18, color: '#F0D080', marginBottom: 4 }}>
                        ✦ Correct!
                      </div>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: 12, color: '#9A9A8A' }}>
                        You&apos;ve earned insight. Keep exploring.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: '#9A9A8A', marginBottom: 8 }}>
                        Not quite — try again?
                      </div>
                      <button
                        onClick={() => setResult(null)}
                        style={{
                          background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 6,
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-inter)',
                          fontSize: 12,
                          color: '#F5F5F0',
                        }}
                      >
                        Try again
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function AnswerArea({
  challenge,
  answer,
  onAnswerChange,
  onSubmit,
  onNameItSelect,
}: {
  challenge: Challenge
  answer: string
  onAnswerChange: (v: string) => void
  onSubmit: () => void
  onNameItSelect: (idx: number) => void
}) {
  if (challenge.type === 'nameIt') {
    const c = challenge as NameItChallenge
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {c.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onNameItSelect(i)}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              padding: '10px 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter)',
              fontSize: 13,
              color: '#F5F5F0',
              textAlign: 'left',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget).style.borderColor = 'rgba(201,168,76,0.3)' }}
            onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            {opt}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <input
        type={challenge.type === 'countIt' ? 'number' : 'text'}
        value={answer}
        onChange={e => onAnswerChange(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') onSubmit() }}
        placeholder={challenge.type === 'countIt' ? 'Enter a number…' : 'Enter verse reference…'}
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: 6,
          padding: '8px 12px',
          fontFamily: 'var(--font-inter)',
          fontSize: 13,
          color: '#F5F5F0',
          outline: 'none',
        }}
      />
      <button
        onClick={onSubmit}
        disabled={!answer.trim()}
        style={{
          background: '#C9A84C',
          border: 'none',
          borderRadius: 6,
          padding: '8px 16px',
          cursor: answer.trim() ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-inter)',
          fontSize: 12,
          color: '#08080F',
          fontWeight: 600,
          opacity: answer.trim() ? 1 : 0.5,
        }}
      >
        Submit
      </button>
    </div>
  )
}
