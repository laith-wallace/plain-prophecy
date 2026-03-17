import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { lessons } from "@/data/lessons";
import JsonLd from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) return {};
  return {
    title: `${lesson.title} — Plain Prophecy`,
    description: lesson.summary,
    alternates: { canonical: `https://plainprophecy.com/learn/${slug}` },
    openGraph: {
      title: lesson.title,
      description: lesson.subtitle,
      url: `https://plainprophecy.com/learn/${slug}`,
      type: "article",
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson) notFound();

  const relatedLessons = lessons.filter((l) => lesson.relatedSlugs.includes(l.slug));
  const nextLesson = lessons.find((l) => l.number === lesson.number + 1);
  const prevLesson = lessons.find((l) => l.number === lesson.number - 1);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: lesson.title,
    description: lesson.summary,
    url: `https://plainprophecy.com/learn/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Plain Prophecy",
      url: "https://plainprophecy.com",
    },
  };

  return (
    <main>
      <JsonLd schema={articleSchema} />

      {/* Hero */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          padding: "3.5rem 2rem 3rem",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: 0.4,
              marginBottom: "1.5rem",
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Link href="/learn" style={{ color: "inherit", textDecoration: "none" }}>
              Learn
            </Link>
            <span>›</span>
            <span>Lesson {lesson.number}</span>
          </div>

          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{lesson.symbol}</div>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            {lesson.title}
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.65,
              opacity: 0.7,
              maxWidth: 600,
              marginBottom: "1.5rem",
            }}
          >
            {lesson.subtitle}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            <span>{lesson.scripture}</span>
            <span>·</span>
            <span>{lesson.readingTime} read</span>
          </div>
        </div>
      </section>

      {/* Summary callout */}
      <div
        style={{
          background: "var(--cream-mid)",
          borderBottom: "2px solid var(--ink)",
        }}
      >
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            padding: "1.5rem 2rem",
            display: "flex",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--neutral)",
              paddingTop: "0.15rem",
              flexShrink: 0,
            }}
          >
            Summary
          </div>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#3a3530" }}>
            {lesson.summary}
          </p>
        </div>
      </div>

      {/* Article body */}
      <article
        style={{ maxWidth: 780, margin: "0 auto", padding: "3rem 2rem" }}
      >
        {lesson.sections.map((section, i) => (
          <div
            key={i}
            style={{ marginBottom: "3rem" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.015em",
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "2px solid var(--ink)",
              }}
            >
              {section.heading}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {section.body.map((para, j) => (
                <p
                  key={j}
                  style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "#2a2520" }}
                >
                  {para}
                </p>
              ))}
            </div>

            {section.callout && (
              <div
                style={{
                  marginTop: "1.5rem",
                  background: "var(--sda-primary)",
                  color: "white",
                  padding: "1.25rem 1.5rem",
                  borderLeft: "4px solid var(--sda-accent)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.65,
                    marginBottom: "0.4rem",
                  }}
                >
                  {section.callout.label}
                </div>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.65, opacity: 0.9 }}>
                  {section.callout.text}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Key dates */}
        {lesson.keyDates && lesson.keyDates.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              marginBottom: "3rem",
              border: "2px solid var(--ink)",
            }}
          >
            <div
              style={{
                background: "var(--ink)",
                color: "var(--paper)",
                padding: "0.75rem 1.25rem",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Key Dates
            </div>
            <div>
              {lesson.keyDates.map((kd, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    padding: "0.85rem 1.25rem",
                    borderTop: i > 0 ? "1px solid var(--cream-mid)" : "none",
                    alignItems: "baseline",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--sda-primary)",
                      flexShrink: 0,
                      minWidth: "5.5rem",
                    }}
                  >
                    {kd.date}
                  </div>
                  <div style={{ fontSize: "0.85rem", lineHeight: 1.5, color: "#3a3530" }}>
                    {kd.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Related lessons */}
      {relatedLessons.length > 0 && (
        <section
          style={{
            background: "var(--cream-mid)",
            borderTop: "2px solid var(--ink)",
            padding: "3rem 2rem",
          }}
        >
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <div
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--neutral)",
                marginBottom: "1.25rem",
              }}
            >
              Related Lessons
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "1rem",
              }}
            >
              {relatedLessons.map((rl) => (
                <Link
                  key={rl.slug}
                  href={`/learn/${rl.slug}`}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                    border: "2px solid var(--ink)",
                    background: "var(--paper)",
                    padding: "1rem",
                    textDecoration: "none",
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ fontSize: "1.25rem", lineHeight: 1, flexShrink: 0 }}>
                    {rl.symbol}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-ibm-plex-mono)",
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        opacity: 0.4,
                        marginBottom: "0.2rem",
                      }}
                    >
                      Lesson {rl.number}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {rl.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      <nav
        style={{
          borderTop: "2px solid var(--ink)",
          background: "var(--paper)",
          padding: "2rem",
        }}
        aria-label="Lesson navigation"
      >
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                textDecoration: "none",
                color: "var(--ink)",
                maxWidth: "45%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                }}
              >
                ← Previous
              </span>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                {prevLesson.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/learn"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--neutral)",
              }}
            >
              ← All Lessons
            </Link>
          )}

          {nextLesson ? (
            <Link
              href={`/learn/${nextLesson.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                textDecoration: "none",
                color: "var(--ink)",
                textAlign: "right",
                maxWidth: "45%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "0.58rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                }}
              >
                Next →
              </span>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                {nextLesson.title}
              </span>
            </Link>
          ) : (
            <Link
              href="/compare"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--sda-primary)",
                fontWeight: 600,
              }}
            >
              Compare Frameworks →
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
