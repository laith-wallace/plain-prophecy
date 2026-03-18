import type { Metadata } from 'next'
import RevelationClient from './RevelationClient'

export const metadata: Metadata = {
  title: 'Revelation — Every Chapter, Every Vision | Plain Prophecy',
  description:
    'Swipe through all 22 chapters of Revelation. The prophetic significance, the historical fulfilment, and the love of God — on every card.',
  alternates: {
    canonical: 'https://plainprophecy.com/revelation',
  },
  openGraph: {
    title: 'Revelation — Every Chapter, Every Vision',
    description:
      '22 chapters. Seals, trumpets, beasts, and a Lamb. Every vision placed in history — and every chapter anchored to the love of God.',
    url: 'https://plainprophecy.com/revelation',
    type: 'website',
  },
}

export default function RevelationPage() {
  return <RevelationClient />
}
