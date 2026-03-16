import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const metadata: Metadata = {
  title: "Doctrine — Plain Prophecy",
  description:
    "These teachings are common in many churches today. Here is what Scripture actually says — examined through the historicist lens of the Reformation.",
  alternates: {
    canonical: "https://plainprophecy.com/doctrine",
  },
  openGraph: {
    title: "Doctrine | Plain Prophecy",
    description:
      "These teachings are common in many churches today. Here is what Scripture actually says.",
    url: "https://plainprophecy.com/doctrine",
    type: "website",
  },
};

const categoryLabel: Record<string, string> = {
  rapture: "Second Coming",
  antichrist: "Antichrist",
  daniel: "Daniel",
  revelation: "Revelation",
};

export default async function DoctrinePage() {
  const doctrines = await fetchQuery(api.doctrines.getAll);

  return (
    <main
      style={{
        background: "#0a0a06",
        minHeight: "100dvh",
        color: "#fff",
        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "72px 24px 48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: "16px",
          }}
        >
          Plain Prophecy
        </div>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Doctrine
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          These teachings are common in many churches today. Here is what
          Scripture actually says — examined through the historicist lens of the
          Reformation.
        </p>
      </header>

      {/* Doctrine grid */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 96px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "24px",
        }}
      >
        {doctrines.map((doctrine) => (
          <Link
            key={doctrine.slug}
            href={`/doctrine/${doctrine.slug}`}
            style={{ textDecoration: "none" }}
          >
            <article
              className="doctrine-card"
              style={{
                background: "linear-gradient(160deg, #111108 0%, #0a0a06 100%)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "8px",
                padding: "32px",
                cursor: "pointer",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  opacity: 0.8,
                }}
              >
                {categoryLabel[doctrine.category] ?? doctrine.category}
              </div>
              <h2
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {doctrine.title}
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.6,
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {doctrine.subtitle}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.65,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                {doctrine.intro}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {doctrine.scriptureRef}
                </span>
                <span
                  style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "11px",
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Read →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>

      {/* Compare callout */}
      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 96px",
        }}
      >
        <Link href="/compare" style={{ textDecoration: "none" }}>
          <div
            className="compare-callout"
            style={{
              background: "linear-gradient(135deg, #0f1a10 0%, #0a0a06 100%)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "8px",
              padding: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              transition: "border-color 0.2s ease",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  opacity: 0.8,
                }}
              >
                Interpretive Frameworks
              </div>
              <p
                style={{
                  fontFamily: "Cinzel, serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                How does Historicism compare to Futurism?
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  lineHeight: 1.6,
                  maxWidth: 480,
                }}
              >
                Timelines, accuracy scoring, biblical pillars, and historical evidence — side by side.
              </p>
            </div>
            <span
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "13px",
                color: "#C9A84C",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              See Comparison →
            </span>
          </div>
        </Link>
      </section>

      <style>{`
        .doctrine-card:hover {
          border-color: rgba(201,168,76,0.4) !important;
          transform: translateY(-2px);
        }
        .compare-callout:hover {
          border-color: rgba(201,168,76,0.45) !important;
        }
        @media (max-width: 640px) {
          section { grid-template-columns: 1fr !important; }
          .compare-callout { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </main>
  );
}
