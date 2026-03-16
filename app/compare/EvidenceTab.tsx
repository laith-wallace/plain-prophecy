"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function getYouTubeId(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v");
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("?")[0];
  } catch {}
  return null;
}

export default function EvidenceTab() {
  const sections = useQuery(api.evidence.getPublished);

  if (sections === undefined) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="ev-intro">
        <p>
          The Historicist framework predicted these developments from Scripture centuries before they occurred. Each section below maps a prophetic marker to its contemporary fulfilment, with mainstream news sources for verification.
        </p>
      </div>

      {sections.map((sec, i) => (
        <div className="ev-section" key={i}>
          <div className="ev-section-header">
            <div className="ev-section-number">{sec.num}</div>
            <div className="ev-section-title-wrap">
              <div className="ev-section-label">{sec.label}</div>
              <div className="ev-section-title">{sec.title}</div>
            </div>
          </div>
          <div className="ev-columns">
            {/* Prophecy Col */}
            <div className="ev-col">
              <div className="ev-col-head" style={{ color: "var(--sda-accent)" }}>{sec.prophecyCol.label}</div>
              <div className="ev-col-body">
                {sec.prophecyCol.content.map((p, j) => <p key={j}>{p}</p>)}
                {sec.prophecyCol.scripture && (
                  <span className="ev-scripture">{sec.prophecyCol.scripture}</span>
                )}
              </div>
            </div>
            {/* Scripture Col */}
            <div className="ev-col">
              <div className="ev-col-head" style={{ color: "#c8934a" }}>{sec.scriptureCol.label}</div>
              <div className="ev-col-body">
                {sec.scriptureCol.content.map((p, j) => <p key={j}>{p}</p>)}
                {sec.scriptureCol.scripture && (
                  <span className="ev-scripture">{sec.scriptureCol.scripture}</span>
                )}
              </div>
            </div>
            {/* Evidence Col */}
            <div className="ev-col" style={{ padding: 0 }}>
              <div className="ev-col-head" style={{ color: "#e06060" }}>{sec.evidenceCol.label}</div>
              <div>
                {sec.evidenceCol.newsItems.map((item, j) => (
                  <div className="ev-news-item" key={j}>
                    <div className="ev-news-headline">{item.headline}</div>
                    <div className="ev-news-meta">{item.meta}</div>
                    <div className="ev-news-body">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Media Cards */}
          <div className="media-row">
            <div className="media-row-label">▶ Watch media coverage</div>
            <div className="media-cards">
              {sec.mediaCards.map((mc, j) => (
                <a className="media-card" href={mc.href} target="_blank" rel="noopener noreferrer" key={j}>
                  <div className="media-thumb">
                    {(() => {
                      const ytId = getYouTubeId(mc.href);
                      return ytId ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
                          alt={mc.headline}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                          loading="lazy"
                        />
                      ) : (
                        <div className="thumb-icon">{mc.icon}</div>
                      );
                    })()}
                    <div className="play-btn">▶</div>
                  </div>
                  <div className="media-info">
                    <span className={`outlet-badge ${mc.outletClass}`}>{mc.outlet}</span>
                    <div className="media-headline">{mc.headline}</div>
                    <div className="media-cta">{mc.cta}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Summary Banner */}
      <div className="ev-summary-banner" style={{ background: "linear-gradient(135deg, var(--sda-primary) 0%, #0d2218 100%)", marginTop: "1.5rem" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.5rem" }}>Assessment</div>
        <div className="sb-title">The Prophetic Framework Is Active — Not Theoretical</div>
        <div className="sb-grid">
          {[
            { num: "6", desc: "Major prophetic signs in active fulfilment" },
            { num: "130+", desc: "Nations developing CBDC infrastructure" },
            { num: "183", desc: "States with Vatican diplomatic ties" },
            { num: "2033", desc: "Vatican's target for global Christian unity" },
          ].map((stat, i) => (
            <div className="sb-stat" key={i}>
              <div className="num">{stat.num}</div>
              <div className="desc">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
