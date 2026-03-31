'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import ConnectionDetail from './ConnectionDetail'
import BookDNA from './BookDNA'
import type { ArcHit, CrossReferenceData } from '@/types/connections'

interface DiscoveryPanelProps {
  open: boolean
  onClose: () => void
  selectedArc: ArcHit | null
  selectedBook: number | null
  data: CrossReferenceData | null
  onShareArc: () => void
}

export default function DiscoveryPanel({
  open,
  onClose,
  selectedArc,
  selectedBook,
  data,
  onShareArc,
}: DiscoveryPanelProps) {
  const title = selectedArc
    ? 'Connection Detail'
    : selectedBook !== null && data
    ? data.books[selectedBook]?.name ?? 'Book'
    : 'Discovery'

  return (
    <Sheet open={open} onOpenChange={(open: boolean) => { if (!open) onClose() }}>
      <SheetContent
        side="right"
        className="overflow-y-auto"
        style={{
          background: '#0D0D1A',
          borderLeft: '1px solid rgba(201,168,76,0.15)',
          width: 'min(380px, 100vw)',
          maxWidth: '100vw',
          padding: 0,
          color: '#F5F5F0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SheetHeader
          style={{
            padding: '1rem 1rem 0.75rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}
        >
          <SheetTitle
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 14,
              color: '#C9A84C',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </SheetTitle>
        </SheetHeader>

        <div style={{ flex: 1, overflowY: 'auto', paddingTop: '1rem' }}>
          {data && selectedArc && (
            <ConnectionDetail
              arc={selectedArc}
              data={data}
              onShare={onShareArc}
            />
          )}
          {data && selectedBook !== null && selectedArc === null && (
            <BookDNA
              bookIndex={selectedBook}
              data={data}
            />
          )}
          {!data && (
            <p style={{ padding: '1rem', fontFamily: 'var(--font-inter)', fontSize: 13, color: '#9A9A8A' }}>
              Loading…
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
