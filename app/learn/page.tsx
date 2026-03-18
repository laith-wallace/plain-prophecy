import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "@/data/lessons";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Learn — Plain Prophecy",
  description:
    "In-depth study guides on Daniel and Revelation: the day-year principle, the 70 weeks, the 1,260 years, the little horn, the heavenly sanctuary, and the origins of futurism.",
  alternates: {
    canonical: "https://plainprophecy.com/learn",
  },
  openGraph: {
    title: "Learn — In-Depth Prophecy Study Guides",
    description:
      "Six deep-dive lessons on the prophetic framework of Daniel and Revelation — verified by history and Scripture.",
    url: "https://plainprophecy.com/learn",
    type: "website",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Daniel & Revelation: The Historicist Framework",
  description:
    "Six in-depth study guides on the prophetic framework of Daniel and Revelation — verified by history and Scripture.",
  provider: {
    "@type": "Organization",
    name: "Plain Prophecy",
    url: "https://plainprophecy.com",
  },
  hasCourseInstance: lessons.map((l) => ({
    "@type": "CourseInstance",
    name: l.title,
    url: `https://plainprophecy.com/learn/${l.slug}`,
  })),
};

export default function LearnPage() {
  return (
    <main>
      <JsonLd schema={courseSchema} />

      {/* Hero */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "4rem 2rem 3rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.45,
            marginBottom: "1rem",
          }}
        >
          Study Guides
        </div>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 700,
            margin: "0 auto 1.25rem",
          }}
        >
          Learn the Framework
        </h1>
        <p
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.75,
            opacity: 0.7,
          }}
        >
          Six in-depth guides on the foundations of Historicist prophecy interpretation —
          from the day-year principle to the origins of futurism. Each lesson is
          evidence-based, exegetically grounded, and tied to verifiable history.
        </p>
      </section>

      {/* Lesson Grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "3.5rem 2rem 5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/learn/${lesson.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid var(--ink)",
                textDecoration: "none",
                color: "var(--ink)",
                background: "var(--paper)",
                transition: "box-shadow 0.15s",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  background: "var(--ink)",
                  color: "var(--paper)",
                  padding: "1.25rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.4,
                    paddingTop: "0.25rem",
                    flexShrink: 0,
                  }}
                >
                  {String(lesson.number).padStart(2, "0")}
                </span>
                <div>
                  <div style={{ fontSize: "1.6rem", lineHeight: 1, marginBottom: "0.4rem" }}>
                    {lesson.symbol}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {lesson.title}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#3a3530", flex: 1 }}>
                  {lesson.subtitle}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--cream-mid)",
                    paddingTop: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--neutral)",
                    }}
                  >
                    {lesson.scripture}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.6rem",
                      color: "var(--neutral)",
                      opacity: 0.6,
                    }}
                  >
                    {lesson.readingTime}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Callout footer */}
        <div
          style={{
            marginTop: "3rem",
            background: "var(--cream-mid)",
            border: "2px solid var(--ink)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--neutral)",
            }}
          >
            After studying
          </div>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.1rem",
              fontWeight: 700,
              lineHeight: 1.3,
              maxWidth: 600,
            }}
          >
            Put it to the test — compare the two frameworks directly, or work through the
            Daniel prophecies interactively.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/compare"
              style={{
                display: "inline-block",
                background: "var(--ink)",
                color: "var(--paper)",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Compare Frameworks →
            </Link>
            <Link
              href="/games"
              style={{
                display: "inline-block",
                border: "2px solid var(--ink)",
                color: "var(--ink)",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                textDecoration: "none",
              }}
            >
              Try Games →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
