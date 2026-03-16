"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { Doc } from "@/convex/_generated/dataModel";

interface Props {
  doctrine: Doc<"doctrines">;
}

const categoryLabel: Record<string, string> = {
  rapture: "Second Coming",
  antichrist: "Antichrist",
  daniel: "Daniel",
  revelation: "Revelation",
};

const sectionGradient: Record<string, string> = {
  "the-claim": "linear-gradient(160deg, #1A0A0A 0%, #0A0606 100%)",
  "the-text": "linear-gradient(160deg, #0A1018 0%, #050A10 100%)",
  "the-origin": "linear-gradient(160deg, #10180A 0%, #060A05 100%)",
  "the-truth": "linear-gradient(160deg, #0A1A0A 0%, #050A05 100%)",
};

const sectionAccent: Record<string, string> = {
  "the-claim": "#E05050",
  "the-text": "#6A9FD8",
  "the-origin": "#D4A840",
  "the-truth": "#62B87A",
};

export default function DoctrineContent({ doctrine }: Props) {
  const [copied, setCopied] = useState(false);
  const [shareBarDismissed, setShareBarDismissed] = useState(false);

  // Reveal on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [doctrine]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitter = () => {
    const text = encodeURIComponent(
      `"${doctrine.verdict}" — ${doctrine.title} | Plain Prophecy`
    );
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `${doctrine.title} — ${doctrine.verdict}\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <>
      <article
        style={{
          background: "#0a0a06",
          minHeight: "100vh",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* ── HEADER ── */}
        <header
          className="reveal"
          style={{
            position: "relative",
            zIndex: 10,
            padding: "64px 24px 0",
            textAlign: "center",
            maxWidth: 800,
            margin: "0 auto",
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
              marginBottom: "12px",
            }}
          >
            {categoryLabel[doctrine.category] ?? doctrine.category}
          </div>
          <h1
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(28px, 6vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            {doctrine.title.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} style={{ color: "var(--gold, #C9A84C)" }}>
                  {word}
                </span>
              ) : (
                <React.Fragment key={i}>{word} </React.Fragment>
              )
            )}
          </h1>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "520px",
              margin: "0 auto 10px",
              lineHeight: 1.6,
              fontStyle: "italic",
            }}
          >
            {doctrine.subtitle}
          </p>
          <div
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "12px",
              color: "#C9A84C",
              opacity: 0.7,
              letterSpacing: "0.1em",
              marginBottom: "48px",
            }}
          >
            {doctrine.scriptureRef}
          </div>
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "620px",
              margin: "0 auto 64px",
              lineHeight: 1.75,
            }}
          >
            {doctrine.intro}
          </p>
        </header>

        {/* ── SECTIONS ── */}
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "0 24px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {doctrine.sections.map((section) => {
            const accent = sectionAccent[section.id] ?? "#C9A84C";
            const gradient =
              sectionGradient[section.id] ??
              "linear-gradient(160deg, #111108 0%, #0a0a06 100%)";

            return (
              <div
                key={section.id}
                className="reveal"
                style={{
                  background: gradient,
                  border: `1px solid ${accent}22`,
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* Section header */}
                <div
                  style={{
                    padding: "24px 28px 20px",
                    borderBottom: `1px solid ${accent}18`,
                  }}
                >
                  {section.badge && (
                    <div
                      style={{
                        fontFamily: "IBM Plex Mono, monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: accent,
                        opacity: 0.8,
                        marginBottom: "8px",
                      }}
                    >
                      {section.era ? `${section.era} · ` : ""}
                      {section.badge}
                    </div>
                  )}
                  <h2
                    style={{
                      fontFamily: "Cinzel, serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#fff",
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {section.heading}
                  </h2>
                </div>

                {/* Section body */}
                <div style={{ padding: "24px 28px 28px" }}>
                  {section.contentBlocks.map((block, i) => (
                    <div
                      key={i}
                      style={{ marginBottom: i < section.contentBlocks.length - 1 ? "24px" : "0" }}
                    >
                      <div
                        style={{
                          fontFamily: "IBM Plex Mono, monospace",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: accent,
                          opacity: 0.7,
                          marginBottom: "8px",
                        }}
                      >
                        {block.label}
                      </div>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "rgba(255,255,255,0.82)",
                          lineHeight: 1.75,
                          margin: 0,
                        }}
                      >
                        {block.text}
                      </p>
                    </div>
                  ))}

                  {/* Key verse */}
                  {section.keyVerse && (
                    <div
                      style={{
                        marginTop: "24px",
                        borderTop: `1px solid ${accent}18`,
                        paddingTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "IBM Plex Mono, monospace",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#C9A84C",
                          opacity: 0.6,
                          marginBottom: "10px",
                        }}
                      >
                        Key Verse
                      </div>
                      <p
                        style={{
                          fontFamily: "Cinzel, serif",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.7)",
                          lineHeight: 1.8,
                          fontStyle: "italic",
                          margin: "0 0 8px",
                        }}
                      >
                        &ldquo;{section.keyVerse.text}&rdquo;
                      </p>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#C9A84C",
                          opacity: 0.7,
                          letterSpacing: "0.06em",
                          fontFamily: "Cinzel, serif",
                        }}
                      >
                        {section.keyVerse.ref}
                      </div>
                    </div>
                  )}

                  {/* Christ at the Centre */}
                  {section.christCentre && (
                    <div
                      style={{
                        marginTop: "24px",
                        background: "rgba(201,168,76,0.06)",
                        border: "1px solid rgba(201,168,76,0.15)",
                        borderRadius: "6px",
                        padding: "18px 20px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "IBM Plex Mono, monospace",
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#C9A84C",
                          marginBottom: "10px",
                        }}
                      >
                        ✦ Christ at the Centre
                      </div>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.75)",
                          lineHeight: 1.75,
                          margin: 0,
                          fontStyle: "italic",
                        }}
                      >
                        {section.christCentre}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── VERDICT CARD ── */}
        <div
          className="reveal"
          style={{
            maxWidth: 800,
            margin: "0 auto 48px",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(160deg, #1A180A 0%, #0F0E06 100%)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
                opacity: 0.7,
                marginBottom: "16px",
              }}
            >
              Verdict
            </div>
            <p
              style={{
                fontFamily: "Cinzel, serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                color: "#fff",
                lineHeight: 1.5,
                margin: 0,
                fontWeight: 600,
              }}
            >
              {doctrine.verdict}
            </p>
          </div>
        </div>

        {/* ── CLOSING CHRIST CENTRE ── */}
        <div
          className="reveal"
          style={{
            maxWidth: 640,
            margin: "0 auto 80px",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "16px",
            }}
          >
            ✦ Christ at the Centre
          </div>
          <p
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.85,
              fontStyle: "italic",
            }}
          >
            {doctrine.christCentre}
          </p>
        </div>

        {/* ── FOOTER NAV ── */}
        <footer
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "11px",
                opacity: 0.4,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {categoryLabel[doctrine.category]} · {doctrine.scriptureRef}
            </div>

            {doctrine.nextDoctrine ? (
              <Link
                href={`/doctrine/${doctrine.nextDoctrine.slug}`}
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    color: "#C9A84C",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontFamily: "IBM Plex Mono, monospace",
                  }}
                >
                  Next Doctrine
                </span>
                <span
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "clamp(20px, 4vw, 28px)",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {doctrine.nextDoctrine.title}
                </span>
                <span
                  style={{
                    color: "#C9A84C",
                    fontSize: "24px",
                    marginTop: "4px",
                  }}
                >
                  →
                </span>
              </Link>
            ) : (
              <div>
                <Link
                  href="/doctrine"
                  style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "12px",
                    color: "#C9A84C",
                    textDecoration: "none",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ← All Doctrines
                </Link>
              </div>
            )}
          </div>
        </footer>
      </article>

      {/* ── SHARE BAR ── */}
      {!shareBarDismissed && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(10,10,6,0.96)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            zIndex: 200,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "10px",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginRight: "4px",
            }}
          >
            Share
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              color: copied ? "#C9A84C" : "rgba(255,255,255,0.7)",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "6px 14px",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={handleWhatsApp}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            WhatsApp
          </button>
          <button
            onClick={handleTwitter}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            Twitter / X
          </button>
          <button
            onClick={() => setShareBarDismissed(true)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.3)",
              cursor: "pointer",
              fontSize: "16px",
              padding: "4px 8px",
              marginLeft: "4px",
            }}
            aria-label="Dismiss share bar"
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
