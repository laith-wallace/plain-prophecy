import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Biblical Prophecy, Plain and Simple",
  description:
    "A Christ-centred, rigorous resource for understanding biblical prophecy. Discover the Reformation consensus on Daniel and Revelation — verified by history and Scripture.",
  alternates: {
    canonical: "https://plainprophecy.com",
  },
  openGraph: {
    title: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
    description:
      "Discover the Reformation consensus on Daniel and Revelation — Futurism vs Historicism, rigorously compared.",
    url: "https://plainprophecy.com",
    type: "website",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plain Prophecy — Biblical Prophecy, Plain and Simple",
    description: "Discover the Reformation consensus on Daniel and Revelation — rigorously compared.",
    images: ["/og/og-default.png"],
  },
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Plain Prophecy",
  url: "https://plainprophecy.com",
  description:
    "A Christ-centred, rigorous resource for understanding biblical prophecy. Futurism vs Historicism compared through Scripture and history.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://plainprophecy.com/compare?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const features = [
  {
    icon: "📜",
    title: "Daniel's 70 Weeks",
    subtitle: "Verified to the Year",
    desc: "457 BC → 27 AD → 31 AD → 34 AD. Every data point in Daniel 9 is confirmed by independent archaeology and secular chronology. No other prophetic system matches this precision.",
    ref: "Dan 9:24–27",
  },
  {
    icon: "⏳",
    title: "The 1,260 Years",
    subtitle: "Verified to the Decade",
    desc: "Six independent Bible texts point to the same period. Applied historically: 538 AD (Justinian) to 1798 AD (Napoleon captures the Pope) = exactly 1,260 years. This is not coincidence.",
    ref: "Dan 7:25 · Rev 12:6, 14 · Rev 13:5",
  },
  {
    icon: "☁",
    title: "The Second Coming",
    subtitle: "One Event — Every Eye Sees",
    desc: "\"Every eye shall see Him\" (Rev 1:7). \"The Lord himself shall descend with a shout\" (1 Thess 4:16). Scripture describes one visible, glorious, audible return of Christ — not two secret/public stages invented in 1830.",
    ref: "Rev 1:7 · 1 Thess 4:16–17",
  },
];

const paths = [
  {
    label: "I'm new to this",
    desc: "Start with the side-by-side timeline — see both prophetic frameworks laid out from Scripture.",
    href: "/compare",
    cta: "View Timelines →",
    accent: "var(--sda-primary)",
  },
  {
    label: "I know Futurism",
    desc: "Go straight to the accuracy scoring — 10 criteria, evaluated against the same evidentiary standard.",
    href: "/compare",
    cta: "See Scoring →",
    accent: "var(--futurist-primary)",
  },
  {
    label: "Show me the evidence",
    desc: "See six prophetic signs in active fulfilment today — verified by mainstream news sources.",
    href: "/compare",
    cta: "View Evidence →",
    accent: "#8b4513",
  },
  {
    label: "Learn by doing",
    desc: "Swipe through 8 Daniel prophecies — commit to an answer before the reveal, then see how history and Scripture converge on Christ.",
    href: "/prophet",
    cta: "Start Prophet →",
    accent: "var(--sda-accent)",
  },
];

export default function HomePage() {
  return (
    <main>
      <JsonLd schema={webSiteSchema} />

      <section
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative rule */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ height: 1, width: 60, background: "var(--sda-accent)", opacity: 0.5 }} />
          <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.62rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>
            Plain Prophecy
          </div>
          <div style={{ height: 1, width: 60, background: "var(--sda-accent)", opacity: 0.5 }} />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 800,
            margin: "0 auto 1.25rem",
          }}
        >
          Biblical Prophecy.
          <br />
          <span style={{ color: "var(--sda-accent)" }}>Plain and Simple.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            maxWidth: 600,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            opacity: 0.75,
          }}
        >
          What the Reformers believed — rigorously examined. Every prophetic
          anchor verified against history. Christ at the centre of every timeline.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/compare"
            style={{
              display: "inline-block",
              background: "var(--sda-accent)",
              color: "var(--ink)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.85rem 2rem",
              textDecoration: "none",
              fontWeight: 600,
              transition: "opacity 0.2s",
            }}
          >
            Start Comparing →
          </Link>
          <Link
            href="/about"
            style={{
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "var(--paper)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.85rem 2rem",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            Our Mission
          </Link>
        </div>

        {/* Scripture anchor */}
        <div
          style={{
            marginTop: "3.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            maxWidth: 600,
            margin: "3.5rem auto 0",
          }}
        >
          <blockquote
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontStyle: "italic",
              lineHeight: 1.6,
              opacity: 0.8,
            }}
          >
            &ldquo;Seal not the sayings of the prophecy of this book: for the time is at hand.&rdquo;
          </blockquote>
          <cite
            style={{
              display: "block",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.5,
              marginTop: "0.75rem",
            }}
          >
            Revelation 22:10
          </cite>
        </div>
      </section>

      {/* WHY IT MATTERS — 3 columns */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--neutral)", marginBottom: "0.5rem" }}>
            Evidence
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Why the Historicist Framework Stands
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                border: "2px solid var(--ink)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "var(--ink)",
                  color: "var(--paper)",
                  padding: "1.25rem",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{f.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      opacity: 0.5,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {f.subtitle}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                    }}
                  >
                    {f.title}
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#3a3530", marginBottom: "0.75rem" }}>{f.desc}</p>
                <div
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.65rem",
                    color: "var(--neutral)",
                    opacity: 0.8,
                  }}
                >
                  {f.ref}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* START HERE — learning paths */}
      <section
        style={{
          background: "var(--cream-mid)",
          borderTop: "2px solid var(--divider)",
          borderBottom: "2px solid var(--divider)",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--neutral)", marginBottom: "0.5rem" }}>
              Where to Begin
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              Start Here
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {paths.map((p, i) => (
              <Link
                key={i}
                href={p.href}
                style={{
                  border: "2px solid var(--ink)",
                  background: "var(--paper)",
                  padding: "1.5rem",
                  textDecoration: "none",
                  color: "var(--ink)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: p.accent,
                    fontWeight: 600,
                  }}
                >
                  {p.label}
                </div>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#3a3530", flex: 1 }}>{p.desc}</p>
                <div
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: p.accent,
                    marginTop: "0.5rem",
                  }}
                >
                  {p.cta}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        style={{
          background: "var(--sda-primary)",
          color: "white",
          padding: "3.5rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.75rem" }}>
            The Reformation Consensus
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 900,
              marginBottom: "1rem",
              lineHeight: 1.2,
            }}
          >
            Luther, Calvin, Newton, and Wesley All Agreed
          </h2>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, opacity: 0.85, marginBottom: "2rem" }}>
            The Historicist reading of Daniel and Revelation was the dominant Protestant position for 300 years. Evangelical futurism is a 19th-century innovation with Counter-Reformation origins. The evidence is not close.
          </p>
          <Link
            href="/compare"
            style={{
              display: "inline-block",
              background: "var(--sda-accent)",
              color: "var(--ink)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.85rem 2rem",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            See the Full Comparison →
          </Link>
        </div>
      </section>
    </main>
  );
}
