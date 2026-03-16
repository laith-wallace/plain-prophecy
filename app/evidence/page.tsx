import type { Metadata } from "next";
import EvidenceTab from "@/app/compare/EvidenceTab";

export const metadata: Metadata = {
  title: "Evidence Today — Prophecy in Action",
  description:
    "Six major prophetic signs in active fulfilment right now. The Historicist framework predicted these developments from Scripture centuries before they occurred. Christian nationalism, Sunday law, Babylon, Mark of the Beast infrastructure, the papal wound healed, and the unsealing of Daniel.",
  alternates: {
    canonical: "https://plainprophecy.com/evidence",
  },
  openGraph: {
    title: "Evidence Today — Prophecy in Action | Plain Prophecy",
    description:
      "Six prophetic signs in active fulfilment. The Historicist framework predicted these developments from Scripture centuries before they occurred.",
    url: "https://plainprophecy.com/evidence",
    type: "website",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Evidence Today — Plain Prophecy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evidence Today — Prophecy in Action",
    description: "Six major prophetic signs in active fulfilment right now.",
  },
};

export default function EvidencePage() {
  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "3rem 2rem 5rem",
        }}
      >
        {/* Page header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--sda-accent)",
              opacity: 0.8,
              marginBottom: "0.75rem",
            }}
          >
            Revelation 13–14 · Daniel 12
          </div>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              color: "var(--paper)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: "0 0 1rem",
            }}
          >
            Evidence Today
          </h1>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-sans)",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              maxWidth: 640,
              margin: 0,
            }}
          >
            The Historicist framework predicted these developments from Scripture
            centuries before they occurred. Each section maps a prophetic marker to
            its contemporary fulfilment, with mainstream news sources for verification.
          </p>
        </div>

        {/* Evidence sections rendered from Convex */}
        <EvidenceTab />
      </div>
    </div>
  );
}
