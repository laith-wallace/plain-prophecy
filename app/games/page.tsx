import type { Metadata } from "next";
import Link from "next/link";
import ProphetClient from "./ProphetClient";

export const metadata: Metadata = {
  title: "Games — Bible Prophecy Games | Plain Prophecy",
  description:
    "Play through Daniel's prophecies, the Gospel, and Revelation chapter by chapter. Stake your claim before the reveal — then see how history confirms each one and how every card points to Christ.",
  alternates: {
    canonical: "https://plainprophecy.com/games",
  },
  openGraph: {
    title: "Games — Bible Prophecy Games",
    description:
      "Swipe through Daniel, the Gospel, and Revelation. Commit to an answer, then see the historical truth and the Christ-centred anchor of each card.",
    url: "https://plainprophecy.com/games",
    type: "website",
  },
};

export default function GamesPage() {
  return (
    <div>
      {/* Games switcher */}
      <nav
        style={{
          background: 'rgba(8,8,15,0.95)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '0 1rem',
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {/* Active: Prophecy Connections */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '12px 14px',
            fontFamily: 'var(--font-cinzel)',
            fontSize: 11,
            color: '#C9A84C',
            letterSpacing: '0.06em',
            borderBottom: '2px solid #C9A84C',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          ✦ Prophecy Connections
        </span>

        {/* Link: Verse Memory */}
        <Link
          href="/games/verse-memory"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '12px 14px',
            fontFamily: 'var(--font-cinzel)',
            fontSize: 11,
            color: '#9A9A8A',
            letterSpacing: '0.06em',
            borderBottom: '2px solid transparent',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'color 0.15s',
          }}
        >
          Verse Memory
        </Link>
      </nav>

      <ProphetClient />
    </div>
  );
}
