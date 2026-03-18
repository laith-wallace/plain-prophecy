'use client'

import Link from 'next/link'
import {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { revelationCards, type RevelationCard } from '@/data/revelation-cards'

// ─── Constants ────────────────────────────────────────────────────────────────

const THRESHOLD_FRAC = 0.28
const MAX_ROTATE     = 13
const PEAK_FRACTION  = 0.2

// ─── Reveal Panel ─────────────────────────────────────────────────────────────

function RevelationRevealPanel({
  card,
  isOpen,
  onClose,
  onNext,
  isLast,
  totalCards,
}: {
  card: RevelationCard | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  isLast: boolean
  totalCards: number
}) {
  const panelRef  = useRef<HTMLDivElement>(null)
  const handleDrag = useRef({ active: false, startY: 0 })

  const onHandlePointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    handleDrag.current = { active: true, startY: e.clientY }
  }, [])

  const onHandlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!handleDrag.current.active) return
    const dy = Math.max(0, e.clientY - handleDrag.current.startY)
    if (panelRef.current) {
      panelRef.current.style.transition = 'none'
      panelRef.current.style.transform  = `translateY(${dy}px)`
    }
  }, [])

  const onHandlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!handleDrag.current.active) return
      handleDrag.current.active = false
      const dy = e.clientY - handleDrag.current.startY
      if (dy > 80) {
        if (panelRef.current) {
          panelRef.current.style.transition = ''
          panelRef.current.style.transform  = ''
        }
        onClose()
      } else {
        if (panelRef.current) {
          panelRef.current.style.transition =
            'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)'
          panelRef.current.style.transform = ''
          setTimeout(() => {
            if (panelRef.current) panelRef.current.style.transition = ''
          }, 260)
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen && panelRef.current) {
      panelRef.current.style.transform = ''
    }
  }, [isOpen])

  if (!card) return null

  return (
    <>
      <div
        className={`reveal-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className={`reveal-panel ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Revelation ${card.number}: ${card.title}`}
      >
        <div
          className="reveal-panel-handle"
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
        />

        <div className="reveal-panel-header">
          <div className="reveal-card-label">
            Chapter {card.number} of {totalCards}
          </div>
          <div className="reveal-card-title">{card.title}</div>
          <div className="reveal-card-scripture">{card.scripture}</div>
        </div>

        <div className="reveal-scrollable">
          <div className="reveal-section">
            <div className="reveal-label">The Vision</div>
            <p>{card.reveal.what}</p>
          </div>

          <div className="reveal-section">
            <div className="reveal-label">Prophetic significance</div>
            <p>{card.reveal.prophecy}</p>
          </div>

          <div className="reveal-christ-anchor">
            <div className="reveal-label">History confirms</div>
            <p>{card.reveal.history}</p>
          </div>

          <div className="reveal-love-section">
            <div className="reveal-love-eyebrow">God&rsquo;s love in this</div>
            <p>{card.reveal.love}</p>
          </div>
        </div>

        <div className="reveal-actions">
          <Link href={card.href} className="reveal-study-link">
            Read full study →
          </Link>
          <button className="reveal-next-btn" onClick={onNext}>
            {isLast ? 'Finish →' : 'Next chapter →'}
          </button>
        </div>
      </div>
    </>
  )
}

// ─── Swipe Card ───────────────────────────────────────────────────────────────

export interface RevelationCardHandle {
  triggerSwipe: (dir: 'left' | 'right') => void
}

const RevelationSwipeCard = forwardRef<
  RevelationCardHandle,
  {
    card: RevelationCard
    isNext: boolean
    onSwipeCommit: () => void
    onReveal: () => void
    onHintUsed: () => void
    isFirstCard?: boolean
    totalCards: number
  }
>(function RevelationSwipeCard(
  { card, isNext, onSwipeCommit, onReveal, onHintUsed, isFirstCard, totalCards },
  ref
) {
  const cardRef      = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const overlayLabel = useRef<HTMLDivElement>(null)
  const drag = useRef({
    active: false, startX: 0, currentX: 0, startTime: 0, pastThreshold: false,
  })
  const committed  = useRef(false)
  const [promoting, setPromoting] = useState(false)

  useEffect(() => {
    if (!isNext) {
      setPromoting(true)
      const t = setTimeout(() => setPromoting(false), 380)
      return () => clearTimeout(t)
    }
  }, [isNext])

  const resetTransform = useCallback(() => {
    const c = cardRef.current
    if (c) {
      c.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)'
      c.style.transform  = ''
      setTimeout(() => { if (c) c.style.transition = '' }, 400)
    }
  }, [])

  const applyTransform = useCallback((dx: number, flying?: 'left' | 'right') => {
    const c = cardRef.current
    const o = overlayRef.current
    const l = overlayLabel.current
    if (!c || !o || !l) return

    const THRESHOLD = window.innerWidth * THRESHOLD_FRAC

    if (flying) {
      const releaseX      = drag.current.currentX - drag.current.startX
      const flyX          = flying === 'right' ? window.innerWidth * 1.6 : -window.innerWidth * 1.6
      const flyRotate     = flying === 'right' ? MAX_ROTATE + 7 : -(MAX_ROTATE + 7)
      const releaseRotate = flying === 'right' ? MAX_ROTATE : -MAX_ROTATE

      c.style.transition = 'none'
      c.style.transform  = `translateX(${releaseX}px) rotate(${releaseRotate}deg)`
      c.getBoundingClientRect()
      c.style.transition = 'transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.38s ease-out'
      c.style.transform  = `translateX(${flyX}px) rotate(${flyRotate}deg)`
      c.classList.add('fly-off')
      o.style.opacity        = '0.92'
      o.style.justifyContent = flying === 'right' ? 'flex-end' : 'flex-start'
      o.style.background     = flying === 'right' ? 'rgba(26,109,60,0.75)' : 'rgba(192,57,43,0.65)'
      l.textContent          = flying === 'right' ? '✓ Fulfilled' : '? Not sure'
      l.style.transform      = `rotate(${flying === 'right' ? '-20deg' : '20deg'})`
      return
    }

    const absDx    = Math.abs(dx)
    const peakDx   = THRESHOLD * PEAK_FRACTION
    const rotate   = Math.sign(dx) * Math.min(absDx / peakDx, 1) * MAX_ROTATE
    const scale    = 1 - Math.min(absDx / THRESHOLD, 1) * 0.04

    c.style.transition = 'none'
    c.style.transform  = `translateX(${dx}px) rotate(${rotate}deg) scale(${scale})`

    const norm         = dx / THRESHOLD
    o.style.opacity    = String(Math.min(Math.abs(norm) * 1.8, 0.88))

    const past = Math.abs(dx) > window.innerWidth * 0.28
    if (past && !drag.current.pastThreshold) {
      navigator.vibrate?.(8)
      drag.current.pastThreshold = true
    } else if (!past) {
      drag.current.pastThreshold = false
    }

    if (dx > 0) {
      o.style.background     = 'rgba(26,109,60,0.75)'
      o.style.justifyContent = 'flex-end'
      l.textContent          = '✓ Fulfilled'
      l.style.transform      = 'rotate(-20deg)'
    } else {
      o.style.background     = 'rgba(192,57,43,0.65)'
      o.style.justifyContent = 'flex-start'
      l.textContent          = '? Not sure'
      l.style.transform      = 'rotate(20deg)'
    }
  }, [])

  const snapBack = useCallback((releaseDx: number) => {
    const c = cardRef.current
    const o = overlayRef.current
    if (!c || !o) return
    const THRESHOLD     = window.innerWidth * THRESHOLD_FRAC
    const frac          = Math.min(Math.abs(releaseDx) / THRESHOLD, 1)
    const releaseRotate = Math.sign(releaseDx) * frac * MAX_ROTATE
    const overshootX    = -Math.sign(releaseDx) * frac * 14
    const overshootR    = -Math.sign(releaseDx) * frac * 2.5

    c.animate(
      [
        { transform: `translateX(${releaseDx}px) rotate(${releaseRotate}deg) scale(${1 - frac * 0.04})` },
        { transform: `translateX(${overshootX}px) rotate(${overshootR}deg) scale(1.008)`, offset: 0.65 },
        { transform: 'translateX(0) rotate(0deg) scale(1)' },
      ],
      { duration: 360 + frac * 220, easing: 'cubic-bezier(0.34,1.56,0.64,1)', fill: 'forwards' }
    )
    o.style.transition = 'opacity 0.22s ease-out'
    o.style.opacity    = '0'
    drag.current.pastThreshold = false
    setTimeout(() => {
      if (c) { c.style.transform = ''; c.getAnimations().forEach(a => a.cancel()) }
    }, 640)
  }, [])

  const commitSwipe = useCallback(
    (dir: 'left' | 'right') => {
      if (committed.current) return
      committed.current = true
      onHintUsed()
      navigator.vibrate?.(15)
      applyTransform(0, dir)
      setTimeout(onSwipeCommit, 430)
    },
    [applyTransform, onSwipeCommit, onHintUsed]
  )

  useImperativeHandle(ref, () => ({
    triggerSwipe: (dir: 'left' | 'right') => {
      if (committed.current || isNext) return
      commitSwipe(dir)
    },
  }))

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isNext || committed.current) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { active: true, startX: e.clientX, currentX: e.clientX, startTime: Date.now(), pastThreshold: false }
    cardRef.current?.getAnimations().forEach(a => a.cancel())
  }, [isNext])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current.active || committed.current) return
    drag.current.currentX = e.clientX
    applyTransform(e.clientX - drag.current.startX)
  }, [applyTransform])

  const handlePointerUp = useCallback(() => {
    if (!drag.current.active || committed.current) return
    drag.current.active = false
    const dx       = drag.current.currentX - drag.current.startX
    const dt       = Math.max(1, Date.now() - drag.current.startTime)
    const velocity = Math.abs(dx) / dt
    if (Math.abs(dx) > window.innerWidth * 0.28 || velocity > 0.45) {
      commitSwipe(dx > 0 ? 'right' : 'left')
    } else {
      snapBack(dx)
    }
  }, [commitSwipe, snapBack])

  useEffect(() => {
    if (!isFirstCard || isNext) return
    const t = setTimeout(() => {
      applyTransform(32)
      setTimeout(resetTransform, 420)
    }, 900)
    return () => clearTimeout(t)
  }, [isFirstCard, isNext, applyTransform, resetTransform])

  if (isNext) {
    return (
      <div className="swipe-card revelation-swipe-card next-card" aria-hidden="true">
        <div className="swipe-card-inner">
          <div className="card-number">Chapter {card.number}</div>
          <div className="card-symbol">{card.symbol}</div>
          <div className="card-title">{card.title}</div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={`swipe-card revelation-swipe-card${promoting ? ' promoting' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`Chapter ${card.number}: ${card.title}. Tap to reveal.`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onReveal() }
      }}
      onClick={() => {
        if (Math.abs(drag.current.currentX - drag.current.startX) < 8) onReveal()
      }}
    >
      <div ref={overlayRef} className="swipe-overlay" style={{ opacity: 0 }}>
        <div ref={overlayLabel} className="overlay-label" />
      </div>
      <div className="swipe-card-inner">
        <div className="card-number">Chapter {card.number} of {totalCards}</div>
        <div className="card-symbol">{card.symbol}</div>
        <div className="card-title">{card.title}</div>
        <div className="card-subtitle">{card.subtitle}</div>
        <div className="card-scripture">{card.scripture}</div>
      </div>
    </div>
  )
})

// ─── Completion Screen ────────────────────────────────────────────────────────

function RevelationCompletionScreen({
  onRestart,
  totalCards,
}: {
  onRestart: () => void
  totalCards: number
}) {
  return (
    <div className="completion-screen">
      <div className="completion-symbol">💫</div>
      <div className="completion-overline">{totalCards} chapters explored</div>
      <h1 className="completion-title">
        One story.{' '}
        <span>One centre. One love.</span>
      </h1>
      <p className="completion-text">
        From the risen Christ in chapter one to &ldquo;Come, Lord Jesus&rdquo; in chapter
        twenty-two — every vision, every seal, every trumpet points to the same
        Lamb who was slain and is now worthy to open every seal.
      </p>
      <div className="completion-actions">
        <button className="completion-restart-btn" onClick={onRestart}>
          Start again →
        </button>
        <Link href="/studies/map" className="completion-map-btn">
          🕸 View full map
        </Link>
        <Link
          href="/studies"
          className="completion-restart-btn"
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.25)', color: 'var(--paper)' }}
        >
          All studies →
        </Link>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function RevelationClient() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed,    setCompleted]    = useState<string[]>([])
  const [revealCard,   setRevealCard]   = useState<RevelationCard | null>(null)
  const [revealOpen,   setRevealOpen]   = useState(false)
  const [hintsVisible, setHintsVisible] = useState(true)
  const [cardKey,      setCardKey]      = useState(0)
  const swipeCardRef = useRef<RevelationCardHandle>(null)

  const done        = currentIndex >= revelationCards.length
  const currentCard = revelationCards[currentIndex]
  const nextCard    = revelationCards[currentIndex + 1]
  const hideHints   = useCallback(() => setHintsVisible(false), [])

  const handleSwipeCommit = useCallback(() => {
    const card = revelationCards[currentIndex]
    if (!card) return
    setCompleted(prev => prev.includes(card.id) ? prev : [...prev, card.id])
    setTimeout(() => {
      setRevealCard(card)
      setRevealOpen(true)
      setCardKey(k => k + 1)
      setCurrentIndex(i => i + 1)
    }, 60)
  }, [currentIndex])

  const handleReveal = useCallback(() => {
    if (!currentCard) return
    setRevealCard(currentCard)
    setRevealOpen(true)
  }, [currentCard])

  const handleRevealClose = useCallback(() => setRevealOpen(false), [])

  const handleRevealNext = useCallback(() => {
    setRevealOpen(false)
    setCompleted(prev => {
      if (revealCard && !prev.includes(revealCard.id)) return [...prev, revealCard.id]
      return prev
    })
    setCurrentIndex(i => {
      if (revealCard && revelationCards[i]?.id === revealCard.id) {
        setCardKey(k => k + 1)
        return i + 1
      }
      return i
    })
  }, [revealCard])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setCompleted([])
    setRevealCard(null)
    setRevealOpen(false)
    setHintsVisible(true)
    setCardKey(k => k + 1)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (revealOpen || done) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        hideHints()
        const card = revelationCards[currentIndex]
        if (!card) return
        setCompleted(prev => prev.includes(card.id) ? prev : [...prev, card.id])
        setTimeout(() => {
          setRevealCard(card)
          setRevealOpen(true)
          setCardKey(k => k + 1)
          setCurrentIndex(i => i + 1)
        }, 60)
      } else if (e.key === ' ') {
        e.preventDefault()
        handleReveal()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentIndex, revealOpen, done, hideHints, handleReveal])

  if (done) {
    return (
      <RevelationCompletionScreen
        onRestart={handleRestart}
        totalCards={revelationCards.length}
      />
    )
  }

  return (
    <div className="prophet-layout">
      <header className="prophet-header">
        <Link href="/" className="prophet-header-brand">
          Plain<span>Prophecy</span>
        </Link>
        <div className="prophet-progress">
          {currentIndex + 1} / {revelationCards.length}
        </div>
        <Link href="/games" className="prophet-map-btn">
          ← Games
        </Link>
      </header>

      <div className="prophet-progress-bar-track">
        <div
          className="prophet-progress-bar-fill"
          style={{
            width: `${(completed.length / revelationCards.length) * 100}%`,
            background: '#7A9ABB',
          }}
        />
      </div>

      <main className="prophet-stage">
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.4,
          }}
        >
          Swipe or tap · Book of Revelation
        </div>

        <div className="card-stack">
          {nextCard && (
            <RevelationSwipeCard
              key={`next-${nextCard.id}`}
              card={nextCard}
              isNext={true}
              onSwipeCommit={() => {}}
              onReveal={() => {}}
              onHintUsed={() => {}}
              totalCards={revelationCards.length}
            />
          )}
          {currentCard && (
            <RevelationSwipeCard
              key={`card-${currentCard.id}-${cardKey}`}
              ref={swipeCardRef}
              card={currentCard}
              isNext={false}
              onSwipeCommit={handleSwipeCommit}
              onReveal={handleReveal}
              onHintUsed={hideHints}
              isFirstCard={currentIndex === 0 && cardKey === 0}
              totalCards={revelationCards.length}
            />
          )}
        </div>

        <div className={`swipe-hints ${!hintsVisible ? 'hidden' : ''}`} aria-hidden="true">
          <div className="hint-arrow left">
            <span className="hint-arrow-icon">←</span>
            <span>Not sure</span>
          </div>
          <div className="hint-arrow right">
            <span>Fulfilled</span>
            <span className="hint-arrow-icon">→</span>
          </div>
        </div>

        <div className="swipe-action-btns">
          <button
            className="swipe-action-btn swipe-action-btn--left"
            onClick={() => { hideHints(); swipeCardRef.current?.triggerSwipe('left') }}
            aria-label="Not sure"
          >✕</button>
          <button
            className="swipe-action-btn swipe-action-btn--reveal"
            onClick={handleReveal}
            aria-label="Reveal chapter details"
          >?</button>
          <button
            className="swipe-action-btn swipe-action-btn--right"
            onClick={() => { hideHints(); swipeCardRef.current?.triggerSwipe('right') }}
            aria-label="Fulfilled"
          >✓</button>
        </div>
      </main>

      <footer className="prophet-footer">
        <div className="prophet-footer-text">
          Tap to open · Swipe to move · Space to reveal
        </div>
      </footer>

      <RevelationRevealPanel
        card={revealCard}
        isOpen={revealOpen}
        onClose={handleRevealClose}
        onNext={handleRevealNext}
        isLast={currentIndex >= revelationCards.length}
        totalCards={revelationCards.length}
      />
    </div>
  )
}
