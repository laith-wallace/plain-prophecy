import type { Metadata } from 'next'
import PropheticTimeline from '@/components/studies/PropheticTimeline'

export const metadata: Metadata = {
  title: 'Prophetic Timeline — Plain Prophecy',
  description:
    'An interactive timeline showing how Daniel\'s prophetic periods — the 70 weeks, 1,260 years, and 2,300 days — map precisely to history, with Christ at the centre.',
  openGraph: {
    title: 'Prophetic Timeline — Plain Prophecy',
    description:
      'Visualise the 70 weeks, 1,260 years, and 2,300 days of biblical prophecy on an interactive timeline.',
    type: 'website',
  },
}

export default function TimelinePage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#010408',
        overflow: 'hidden',
      }}
    >
      <PropheticTimeline />
    </div>
  )
}
