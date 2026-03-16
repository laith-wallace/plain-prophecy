"use client";
import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  scoringCriteria,
  scoringMethodology,
  preteristDeductions,
  sdaDeductions,
} from "@/data/scoring";
import EvidenceTab from "./EvidenceTab";

type Tab = "timelines" | "scoring" | "pillars" | "evidence";

export default function CompareClient() {
  const [activeTab, setActiveTab] = useState<Tab>("timelines");
  const futuristData = useQuery(api.timelines.getTimeline, { type: "futurist" });
  const preteristData = useQuery(api.timelines.getTimeline, { type: "preterist" });
  const sdaData = useQuery(api.timelines.getTimeline, { type: "sda" });
  const pillarsData = useQuery(api.pillars.getAll);
  const highlightsData = useQuery(api.compareHighlights.getAll);

  const pillars = pillarsData ?? [];
  const futuristWeaknesses = (highlightsData ?? []).filter((h) => h.type === "futuristWeakness").map((h) => h.text);
  const preteristWeaknesses = (highlightsData ?? []).filter((h) => h.type === "preteristWeakness").map((h) => h.text);
  const sdaStrengths = (highlightsData ?? []).filter((h) => h.type === "sdaStrength").map((h) => h.text);

  // Progress bar + scroll-to-top
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    const btn = document.getElementById("scroll-top");
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      if (bar) bar.style.width = pct + "%";
      if (btn) btn.classList.toggle("visible", el.scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Share bar links
  useEffect(() => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      "Futurism vs Preterism vs Historicism — a rigorous evidential comparison"
    );
    const tw = document.getElementById("tw-btn") as HTMLAnchorElement | null;
    const wa = document.getElementById("wa-btn") as HTMLAnchorElement | null;
    if (tw) tw.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    if (wa) wa.href = `https://wa.me/?text=${text}%20${url}`;
  }, []);

  function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.getElementById("copy-btn");
      if (btn) { btn.classList.add("copied"); setTimeout(() => btn.classList.remove("copied"), 2000); }
    });
  }

  return (
    <>
      <div id="progress-bar" />
      <button id="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Back to top">↑</button>
      <div id="share-bar">
        <span className="sb-lbl">Share</span>
        <button className="share-btn" id="copy-btn" onClick={copyLink}>🔗 Copy Link</button>
        <a className="share-btn" id="wa-btn" href="" target="_blank" rel="noopener">💬 WhatsApp</a>
        <a className="share-btn" id="tw-btn" href="" target="_blank" rel="noopener">𝕏 Twitter</a>
        <button id="share-dismiss" onClick={() => { const el = document.getElementById("share-bar"); if (el) el.style.display = "none"; }} title="Dismiss">✕</button>
      </div>

      <div className="compare-wrapper">
        {/* Masthead */}
        <div style={{ textAlign: "center", borderBottom: "3px double var(--ink)", paddingBottom: "2rem", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--neutral)", marginBottom: "0.75rem" }}>
            Biblical Prophecy · Hermeneutical Comparison · Scholarly Analysis
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Evangelical Futurism
            <span style={{ fontSize: "0.55em", fontWeight: 400, fontStyle: "italic", color: "var(--neutral)", display: "inline", margin: "0 0.4em" }}>·</span>
            Preterism
            <span style={{ fontSize: "0.55em", fontWeight: 400, fontStyle: "italic", color: "var(--neutral)", display: "inline", margin: "0 0.4em" }}>·</span>
            SDA Historicism
          </h1>
          <div style={{ fontSize: "0.9rem", color: "var(--neutral)", marginTop: "0.75rem", fontStyle: "italic" }}>
            A comparative analysis of prophetic timelines and their biblical foundations
          </div>
        </div>

        {/* Tab Nav */}
        <nav className="tab-nav">
          {(["timelines", "scoring", "pillars", "evidence"] as Tab[]).map((t) => (
            <button
              key={t}
              className={`tab-btn ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t === "timelines" ? "Timelines" : t === "scoring" ? "Accuracy Scoring" : t === "pillars" ? "Biblical Pillars" : "Evidence Today"}
            </button>
          ))}
        </nav>

        {/* ===== TAB 1: TIMELINES ===== */}
        {activeTab === "timelines" && (
          <div style={{ animation: "fadeTab 0.2s ease forwards" }}>
            <div className="comparison-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              {/* Futurist Column */}
              <div className="timeline-column">
                <div className="col-header futurist">
                  <span className="tradition">Evangelical / Dispensationalist</span>
                  <h2>Futurist Prophetic Timeline</h2>
                  <span className="origin">Origins: J.N. Darby (1830s), C.I. Scofield, Hal Lindsey, Tim LaHaye</span>
                </div>
                <div>
                  {!futuristData ? (
                    <div className="era-block loading">Loading timeline...</div>
                  ) : (
                    futuristData.map((era, i) => (
                      <div className="era-block" key={i}>
                        <div className="era-date futurist-date">{era.date}</div>
                        <div className="era-content">
                          <div className={`badge ${era.badge}`}>{era.badge === 'fulfilled' ? 'Fulfilled' : era.badge === 'future' ? 'Future' : era.badge === 'present' ? 'Present (Parenthesis)' : 'Historical'}</div>
                          <h3>{era.title}</h3>
                          <p className="era-desc">{era.desc}</p>
                          <p className="era-ref">{era.refs}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Preterist Column */}
              <div className="timeline-column">
                <div className="col-header preterist">
                  <span className="tradition">Preterist / 1st-Century Fulfilment</span>
                  <h2>Preterist Prophetic Timeline</h2>
                  <span className="origin">Origins: Luis de Alcazar (1614), developed by J.S. Russell, popularised in modern scholarship by R.C. Sproul</span>
                </div>
                <div>
                  {!preteristData ? (
                    <div className="era-block loading">Loading timeline...</div>
                  ) : (
                    preteristData.map((era, i) => (
                      <div className="era-block" key={i}>
                        <div className="era-date preterist-date">{era.date}</div>
                        <div className="era-content">
                          <div className={`badge ${era.badge}`}>{era.badge === 'fulfilled' ? 'Fulfilled (1st Century)' : era.badge === 'future' ? 'Future' : era.badge === 'present' ? 'Ongoing / Partial' : 'Historical'}</div>
                          <h3>{era.title}</h3>
                          <p className="era-desc">{era.desc}</p>
                          <p className="era-ref">{era.refs}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* SDA Column */}
              <div className="timeline-column">
                <div className="col-header sda">
                  <span className="tradition">SDA / Protestant Historicism</span>
                  <h2>SDA Historicist Timeline</h2>
                  <span className="origin">Origins: Reformation (Luther, Calvin, Newton), Miller Movement, SDA pioneers (1844–present)</span>
                </div>
                <div>
                  {!sdaData ? (
                    <div className="era-block loading">Loading timeline...</div>
                  ) : (
                    sdaData.map((era, i) => (
                      <div className="era-block" key={i}>
                        <div className="era-date sda-date">{era.date}</div>
                        <div className="era-content">
                          <div className={`badge ${era.badge}`}>{era.badge === 'fulfilled' ? 'Historically Verified' : era.badge === 'historical' ? 'Historically Identified' : era.badge === 'present' ? 'Present Truth' : 'Future'}</div>
                          <h3>{era.title}</h3>
                          <p className="era-desc">{era.desc}</p>
                          <p className="era-ref">{era.refs}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="key-diff" style={{ marginTop: "2rem" }}>
              <h4>⚑ The Central Hermeneutical Divide</h4>
              <p>All three frameworks agree the Cross is central — but disagree radically on what prophecy points to after it. Futurism defers most fulfilment to a future 7-year period (with a 2,000-year gap no text supports). Preterism closes the book at 70 AD, leaving 2,000 years of church history prophetically silent. Historicism alone traces a continuous prophetic thread from Daniel to the present — every anchor historically verified.</p>
            </div>
          </div>
        )}

        {/* ===== TAB 2: SCORING ===== */}
        {activeTab === "scoring" && (
          <div style={{ animation: "fadeTab 0.2s ease forwards" }}>
            <div className="accuracy-intro">
              <p>Each criterion is assessed on biblical evidence, internal consistency, historical verification, and hermeneutical methodology. All three traditions are held to the same evidentiary standard. Scores are 1–10.</p>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="criteria-table">
                <thead>
                  <tr>
                    <th style={{ width: "16%" }}>Criterion</th>
                    <th style={{ width: "22%" }}>Futurist Position</th>
                    <th style={{ width: "22%" }}>Preterist Position</th>
                    <th style={{ width: "22%" }}>SDA Historicist Position</th>
                    <th style={{ width: "6%" }} className="score-cell">Fut.</th>
                    <th style={{ width: "6%" }} className="score-cell">Pret.</th>
                    <th style={{ width: "6%" }} className="score-cell">SDA</th>
                  </tr>
                </thead>
                <tbody>
                  {scoringCriteria.map((row, i) => (
                    <tr key={i}>
                      <td className="criterion" data-label="Criterion">{row.criterion}</td>
                      <td data-label="Futurist Position">{row.futuristPosition}</td>
                      <td data-label="Preterist Position">{row.preteristPosition}</td>
                      <td data-label="SDA Historicist Position">{row.sdaPosition}</td>
                      <td className="score-cell" data-label="Futurist Score">
                        <span className={`score-pill ${row.futuristClass}`}>{row.futuristScore}/10</span>
                      </td>
                      <td className="score-cell" data-label="Preterist Score">
                        <span className={`score-pill ${row.preteristClass}`}>{row.preteristScore}/10</span>
                      </td>
                      <td className="score-cell" data-label="SDA Score">
                        <span className={`score-pill ${row.sdaClass}`}>{row.sdaScore}/10</span>
                      </td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td className="criterion" data-label="Criterion">TOTAL SCORE (out of 100)</td>
                    <td data-label="Futurist Position" />
                    <td data-label="Preterist Position" />
                    <td data-label="SDA Historicist Position" />
                    <td className="score-cell" data-label="Futurist Score">
                      <span className="score-pill score-low" style={{ width: 64 }}>29/100</span>
                    </td>
                    <td className="score-cell" data-label="Preterist Score">
                      <span className="score-pill score-low" style={{ width: 64 }}>43/100</span>
                    </td>
                    <td className="score-cell" data-label="SDA Score">
                      <span className="score-pill score-high" style={{ width: 64 }}>89/100</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* How Scoring Works */}
            <div className="scoring-explainer">
              <div>
                <div className="se-eyebrow">Methodology</div>
                <h2 className="se-title">How Scoring Works</h2>
                <p className="se-subtitle">Each criterion is scored 1–10 on five independent axes, then averaged. This is not advocacy scoring — all three traditions are held to the same evidentiary standard.</p>
              </div>
              <div className="se-criteria-grid">
                {scoringMethodology.map((m, i) => (
                  <div className="se-criterion-card" key={i}>
                    <div className="se-crit-num">{m.num}</div>
                    <div className="se-crit-content">
                      <div className="se-crit-title">{m.title}</div>
                      <p className="se-crit-desc">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="se-deductions">
                <div className="se-ded-header">
                  <div className="se-eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem" }}>Honest Assessment — Preterism</div>
                  <h3 className="se-ded-title">Where Preterism Has Partial Merit</h3>
                  <p className="se-ded-intro">Preterism scores higher than Futurism because it anchors prophecy to verifiable history and reads the 70 weeks correctly. But it closes the prophetic book at 70 AD — and full preterism&apos;s denial of a future bodily resurrection is its most significant exegetical failure.</p>
                </div>
                <div className="se-ded-grid">
                  {preteristDeductions.map((d, i) => (
                    <div className="se-ded-item" key={i}>
                      <div className="se-ded-label">{d.label}</div>
                      <p className="se-ded-reason">{d.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="se-deductions" style={{ marginTop: "2rem" }}>
                <div className="se-ded-header">
                  <div className="se-eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginBottom: "0.4rem" }}>Honest Assessment — Historicism</div>
                  <h3 className="se-ded-title">Why Some Historicist Positions Are Not 10/10</h3>
                  <p className="se-ded-intro">The Historicist framework scores significantly higher than both alternatives across every criterion — but intellectual honesty demands acknowledging where legitimate scholarly pushback exists. A 10/10 requires near-unanimous agreement among qualified exegetes.</p>
                </div>
                <div className="se-ded-grid">
                  {sdaDeductions.map((d, i) => (
                    <div className="se-ded-item" key={i}>
                      <div className="se-ded-label">{d.label}</div>
                      <p className="se-ded-reason">{d.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 3: PILLARS ===== */}
        {activeTab === "pillars" && (
          <div style={{ animation: "fadeTab 0.2s ease forwards" }}>
            <div className="pillars-grid">
              {pillars.map((p, i) => (
                <div className="pillar-card" key={i}>
                  <div className="card-head">
                    <div className="card-num">{p.num}</div>
                    <div>
                      <div className="card-label">{p.label}</div>
                      <div className="card-title">{p.title}</div>
                    </div>
                  </div>
                  <div className="card-body">
                    {p.paragraphs.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="verdict-panel" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div className="verdict-side futurist-v">
                <h3><span className="v-tag futurist-tag">Futurist</span> Critical Weaknesses</h3>
                <ul>
                  {futuristWeaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
              <div className="verdict-side preterist-v">
                <h3><span className="v-tag preterist-tag">Preterist</span> Critical Weaknesses</h3>
                <ul>
                  {preteristWeaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
              <div className="verdict-side sda-v">
                <h3><span className="v-tag sda-tag">SDA Historicist</span> Biblical Strengths</h3>
                <ul>
                  {sdaStrengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>

            <div className="final-banner">
              <div className="fb-label">Scholarly Verdict</div>
              <div className="fb-headline">The Historicist-SDA Framework is Exegetically Superior</div>
              <div className="fb-body">
                The SDA/Historicist prophetic framework rests on an explicitly stated hermeneutical principle (day-year), multiple historically verified anchors, internal biblical coherence, and the full weight of the Reformation tradition. Preterism correctly anchors the 70 weeks to Christ and rejects the futurist gap — but closes the prophetic canon at 70 AD, leaving 2,000 years of church history prophetically silent, and full preterism requires a spiritual resurrection that contradicts Paul. Evangelical Futurism depends on an unproven gap, a theologically problematic rebuilt Temple, a doctrinally invented Rapture, and a hermeneutic with Counter-Reformation origins. Popularity is not the same as accuracy. The biblical data strongly favours the Historicist reading.
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB 4: EVIDENCE ===== */}
        {activeTab === "evidence" && (
          <div style={{ animation: "fadeTab 0.2s ease forwards" }}>
            <EvidenceTab />
          </div>
        )}
      </div>
    </>
  );
}
