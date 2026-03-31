'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Clock } from 'lucide-react'
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'
import PathStep from './PathStep'
import { DISCOVERY_PATHS } from '@/data/discovery-paths'
import type { DiscoveryPath, CrossReferenceData } from '@/types/connections'

interface GuidedPathsDrawerProps {
  open: boolean
  onClose: () => void
  activePath: DiscoveryPath | null
  activeStep: number
  data: CrossReferenceData | null
  onPathSelect: (path: DiscoveryPath) => void
  onStepChange: (step: number) => void
  onPathComplete: (path: DiscoveryPath) => void
}

export default function GuidedPathsDrawer({
  open,
  onClose,
  activePath,
  activeStep,
  data,
  onPathSelect,
  onStepChange,
  onPathComplete,
}: GuidedPathsDrawerProps) {
  const totalSteps = activePath?.steps.length ?? 0
  const currentStep = activePath?.steps[activeStep]

  return (
    <Sheet open={open} onOpenChange={(o: boolean) => { if (!o) onClose() }}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        style={{
          background: '#0D0D1A',
          borderTop: '1px solid rgba(201,168,76,0.15)',
          height: activePath ? '60vh' : 'auto',
          maxHeight: '70vh',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {activePath && (
              <button
                onClick={() => onPathSelect(null as unknown as DiscoveryPath)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9A9A8A', padding: 4 }}
                aria-label="Back to path list"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            <h2
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 13,
                color: '#C9A84C',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {activePath ? activePath.title : 'Start a Journey'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9A9A8A', padding: 4 }}
            aria-label="Close paths drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            {!activePath ? (
              // Path selection grid
              <motion.div
                key="path-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 10,
                  padding: '14px 16px',
                }}
              >
                {DISCOVERY_PATHS.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => onPathSelect(path)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(201,168,76,0.12)',
                      borderRadius: 8,
                      padding: '14px 16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.35)'
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,0.06)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.12)'
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-cinzel)',
                        fontSize: 13,
                        color: '#F5F5F0',
                        marginBottom: 6,
                        lineHeight: 1.3,
                      }}
                    >
                      {path.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: 11,
                        color: '#9A9A8A',
                        lineHeight: 1.5,
                        marginBottom: 8,
                      }}
                    >
                      {path.description}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        fontFamily: 'var(--font-inter)',
                        fontSize: 10,
                        color: '#C9A84C',
                      }}
                    >
                      <Clock size={10} />
                      {path.durationMinutes} min · {path.steps.length} steps
                    </div>
                  </button>
                ))}
              </motion.div>
            ) : (
              // Active path: step view
              <motion.div
                key="path-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ padding: '16px' }}
              >
                {currentStep && (
                  <PathStep
                    step={currentStep}
                    stepNumber={activeStep + 1}
                    totalSteps={totalSteps}
                    data={data}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer: navigation + progress bar */}
        {activePath && (
          <div
            style={{
              flexShrink: 0,
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '12px 16px',
            }}
          >
            {/* Progress bar */}
            <div
              style={{
                height: 2,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
                marginBottom: 12,
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{ height: '100%', background: '#C9A84C', borderRadius: 2 }}
                animate={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => onStepChange(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  padding: '8px 14px',
                  cursor: activeStep === 0 ? 'not-allowed' : 'pointer',
                  fontFamily: 'var(--font-inter)',
                  fontSize: 12,
                  color: activeStep === 0 ? '#9A9A8A' : '#F5F5F0',
                  opacity: activeStep === 0 ? 0.4 : 1,
                }}
              >
                <ChevronLeft size={14} />
                Back
              </button>

              {activeStep < totalSteps - 1 ? (
                <button
                  onClick={() => onStepChange(activeStep + 1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    background: '#C9A84C',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter)',
                    fontSize: 12,
                    color: '#08080F',
                    fontWeight: 600,
                  }}
                >
                  Next
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => onPathComplete(activePath)}
                  style={{
                    background: 'rgba(201,168,76,0.15)',
                    border: '1px solid rgba(201,168,76,0.4)',
                    borderRadius: 6,
                    padding: '8px 14px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: 12,
                    color: '#C9A84C',
                    letterSpacing: '0.05em',
                  }}
                >
                  Complete ✦
                </button>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
