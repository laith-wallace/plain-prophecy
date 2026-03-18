import type { Metadata } from 'next'
import GospelClient from './GospelClient'

export const metadata: Metadata = {
  title: 'The Gospel — God IS Love | Plain Prophecy',
  description:
    'Swipe through 8 cards about the Gospel. Every card anchored to the love of God — and connected to a full study.',
  alternates: {
    canonical: 'https://plainprophecy.com/gospel',
  },
  openGraph: {
    title: 'The Gospel — God IS Love',
    description:
      'Eight cards. One centre. Swipe through the core of the Christian Gospel and see how every truth is a window into the love of God.',
    url: 'https://plainprophecy.com/gospel',
    type: 'website',
  },
}

export default function GospelPage() {
  return <GospelClient />
}
