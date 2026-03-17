"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StudyBook, StudyLesson } from "@/data/studies";
import ProphecyQuiz from "./ProphecyQuiz";

interface InteractiveStudyTemplateProps {
  book: StudyBook;
  lesson: StudyLesson;
  VisualComponent?: React.ComponentType<{ activeSection: string; onSectionSelect: (id: string) => void }>;
}

export default function InteractiveStudyTemplate({ book, lesson, VisualComponent }: InteractiveStudyTemplateProps) {
  const interactiveSections = (lesson.sections ?? []).filter(s => s.id);
  const hasInteractive = interactiveSections.length > 0;
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeSectionId = activeIndex !== null ? interactiveSections[activeIndex].id! : "none";
  const activeSection = activeIndex !== null ? interactiveSections[activeIndex] : null;

  const handleSectionSelect = (id: string) => {
    const idx = interactiveSections.findIndex(s => s.id === id);
    if (idx !== -1) setActiveIndex(idx);
  };

  const stepKingdom = (dir: number) => {
    if (activeIndex === null) {
      if (dir === 1) setActiveIndex(0);
      return;
    }
    const nextIdx = activeIndex + dir;
    if (nextIdx >= 0 && nextIdx < interactiveSections.length) {
      setActiveIndex(nextIdx);
    }
  };

  // Setup basic scroll intersection observer hook if we want reveal effects later
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [lesson]);

  // CSS mappings for detail card gradients based on id (similar to original HTML inline styles)
  const getCardStyle = (id?: string) => {
    switch(id) {
      case "gold": return { background: "linear-gradient(160deg, #2A1F00 0%, #0F0C00 100%)" };
      case "silver": return { background: "linear-gradient(160deg, #0D1A22 0%, #060E14 100%)" };
      case "bronze": return { background: "linear-gradient(160deg, #1A0F05 0%, #0A0602 100%)" };
      case "iron": return { background: "linear-gradient(160deg, #0A1018 0%, #040608 100%)" };
      case "clay": return { background: "linear-gradient(160deg, #100A08 0%, #060404 100%)" };
      case "stone": return { background: "linear-gradient(160deg, #1A1A0A 0%, #0A0A04 100%)" };
      default: return {};
    }
  };

  const getBadgeColor = (id?: string) => {
    switch(id) {
      case "gold": return "#C9A84C";
      case "silver": return "#A8B8C8";
      case "bronze": return "#C0885A";
      case "iron": return "#8A9AAA";
      case "clay": return "#907060";
      case "stone": return "#C9A84C";
      default: return "#FFFFFF";
    }
  };

  const getHeadingColor = (id?: string) => {
    switch(id) {
      case "gold": return "#F0D080";
      case "silver": return "#D0E0F0";
      case "bronze": return "#E0A870";
      case "iron": return "#B0C0D0";
      case "clay": return "#C0A898";
      case "stone": return "#F0D080";
      default: return "#FFFFFF";
    }
  };

  return (
    <article className="study-template-root">
      {/* ── HEADER ── */}
      <header className="reveal" style={{ position: 'relative', zIndex: 10, padding: '48px 24px 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '12px' }}>
          {book.title}
        </div>
        <h1 style={{ fontFamily: 'Cinzel', fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: '16px' }}>
          {lesson.title.split(' ').map((word, i, arr) => 
            i === arr.length - 1 ? <span key={i} style={{ color: 'var(--gold)' }}>{word}</span> : <React.Fragment key={i}>{word} </React.Fragment>
          )}
        </h1>
        <p className="subtitle" style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', maxWidth: '480px', margin: '0 auto 8px', lineHeight: 1.6 }}>
          {lesson.intro}
        </p>
        <div className="scripture-ref" style={{ fontFamily: 'Cinzel', fontSize: '12px', color: 'var(--gold)', opacity: 0.7, letterSpacing: '0.1em', marginBottom: '40px' }}>
          {lesson.scriptureRef}
        </div>
      </header>

      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      {hasInteractive ? (
        <div className="study-main">
          {/* STATUE / VISUAL COLUMN */}
          <div className="visual-col">
            <div className="kingdom-counter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px', position: 'relative', zIndex: 10 }}>
              <span className="counter-chip" style={{ fontFamily: 'Cinzel', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--gold)', opacity: 0.75, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                {activeSection ? `${activeIndex! + 1} of ${interactiveSections.length} · ${activeSection.heading}` : "Overview"}
              </span>
            </div>
            
            <div className="visual-label">Tap each section</div>
            
            {VisualComponent && (
              <VisualComponent activeSection={activeSectionId} onSectionSelect={handleSectionSelect} />
            )}
            
            <div className="mobile-hint" style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '12px', marginBottom: '24px' }}>
              ↑ Tap any part of the image ↑
            </div>

            {/* Nav dots */}
            <div className="nav-dots">
              {interactiveSections.map((sec, idx) => (
                <div 
                  key={sec.id}
                  className={`nav-dot ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>

            {/* Prev / Next navigation arrows */}
            <div className="nav-arrows" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px', position: 'relative', zIndex: 10 }}>
              <button 
                className="nav-btn" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', lineHeight: 1 }}
                onClick={() => stepKingdom(-1)} 
                disabled={activeIndex === null || activeIndex === 0}
                title="Previous"
              >
                &#8592;
              </button>
              <button 
                className="nav-btn" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', lineHeight: 1 }}
                onClick={() => stepKingdom(1)}  
                disabled={activeIndex !== null && activeIndex === interactiveSections.length - 1}
                title="Next"
              >
                &#8594;
              </button>
            </div>
          </div>

          {/* INFO / CONTENT COLUMN */}
          <div className="content-col">
            <div className="progress-strip">
              <div className="progress-fill" style={{ width: `${(activeIndex !== null ? (activeIndex + 1) / interactiveSections.length : 0) * 100}%` }}></div>
            </div>

            {!activeSection && (
              <div className="prompt-card reveal">
                <div className="prompt-icon">🏛</div>
                <p className="prompt-text">Explore this prophetic vision visually.</p>
                <p className="prompt-hint">Select a section of the visual to begin →</p>
              </div>
            )}

            {activeSection && (
              <div className="detail-card visible reveal" style={getCardStyle(activeSection.id)}>
                <div className="detail-header">
                  <div className="detail-era" style={{ color: getBadgeColor(activeSection.id) }}>{activeSection.era}</div>
                  <div className="detail-title" style={{ color: getHeadingColor(activeSection.id) }}>{activeSection.heading}</div>
                  <div className="detail-dates">By Daniel</div>
                  {activeSection.badge && (
                    <div className="detail-badge" style={{ color: getBadgeColor(activeSection.id) }}>{activeSection.badge}</div>
                  )}
                </div>
                <div className="detail-body">
                  {/* Dynamic Content Blocks */}
                  {activeSection.contentBlocks?.map((block, i) => (
                    <div className="section-block" key={i}>
                      <div className="section-label">{block.label}</div>
                      <p className="section-text">{block.text}</p>
                    </div>
                  ))}
                  
                  {/* Standard Body fallback */}
                  {activeSection.body && !activeSection.contentBlocks && (
                    <div className="section-block">
                      <p className="section-text">{activeSection.body}</p>
                    </div>
                  )}

                  {/* Christ at the Centre */}
                  {activeSection.christCentre && (
                    <div className="christ-block">
                      <div className="christ-label">✦ Christ at the Centre</div>
                      <p className="christ-text">{activeSection.christCentre}</p>
                    </div>
                  )}
                  
                  {/* Key Verse Spotlight */}
                  {activeSection.keyVerse && (
                    <div className="verse-spotlight" style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                      <div className="verse-spotlight-label" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.6, marginBottom: '8px' }}>Key Verse</div>
                      <div className="verse-spotlight-text" style={{ fontFamily: 'Cinzel', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontStyle: 'italic' }}>{activeSection.keyVerse.text}</div>
                      <div className="verse-spotlight-ref" style={{ marginTop: '6px', fontSize: '11px', color: 'var(--gold)', opacity: 0.7, letterSpacing: '0.06em' }}>{activeSection.keyVerse.ref}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Fallback for traditional structure (no interactive sections) */
        <div style={{ maxWidth: '800px', margin: '0 auto', color: '#fff', padding: '0 24px 80px' }}>
          {(lesson.sections ?? []).map((section, idx) => (
            <div key={idx} style={{ marginBottom: '48px' }} className="reveal">
              <h2 style={{ fontFamily: 'Cinzel', fontSize: '24px', fontWeight: 700, color: 'var(--gold)', marginBottom: '20px' }}>{section.heading}</h2>
              {section.contentBlocks && section.contentBlocks.length > 0 ? (
                section.contentBlocks.map((block, bi) => (
                  <div key={bi} className="section-block" style={{ marginBottom: '20px', paddingLeft: '16px', borderLeft: '2px solid rgba(201,168,76,0.25)' }}>
                    <div className="section-label" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.75, marginBottom: '8px' }}>{block.label}</div>
                    <p className="section-text" style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(255,255,255,0.82)' }}>{block.text}</p>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>{section.body}</p>
              )}
            </div>
          ))}
          
          <div className="christ-block reveal" style={{ marginTop: '40px' }}>
            <div className="christ-label">✦ Christ at the Centre</div>
            <p className="christ-text">{lesson.christCentre}</p>
          </div>
        </div>
      )}

      {/* ── PROPHECY QUIZ ── */}
      <div style={{ padding: '0 24px' }}>
        <ProphecyQuiz lessonSlug={lesson.slug} />
      </div>

      {/* ── CLOSING VERSE ── */}
      <div className="closing reveal" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '60px 24px', maxWidth: '600px', margin: '0 auto' }}>
        <p className="closing-verse" style={{ fontFamily: 'Cinzel', fontSize: '16px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '8px' }}>
          &ldquo;The great God has made known to the king what shall be after this. The dream is certain, and its interpretation sure.&rdquo;
        </p>
        <div className="closing-ref" style={{ fontSize: '12px', color: 'var(--gold)', opacity: 0.7, letterSpacing: '0.1em' }}>
          Daniel 2:45
        </div>
      </div>

      {/* Footer nav */}
      <footer className="study-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '40px 24px', textAlign: 'center' }}>
        <div className="study-footer-inner" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <div className="study-footer-tag" style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {book.title} · {lesson.scriptureRef}
          </div>

          {lesson.nextLesson ? (
            <Link
              href={`/studies/${lesson.nextLesson.book}/${lesson.nextLesson.lesson}`}
              style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
            >
              <span style={{ fontSize: '14px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Next Study</span>
              <span style={{ fontFamily: 'Cinzel', fontSize: '28px', color: '#fff', fontWeight: 700 }}>{lesson.nextLesson.title}</span>
              <span style={{ color: 'var(--gold)', fontSize: '24px', marginTop: '8px' }}>→</span>
            </Link>
          ) : (
            <div className="study-final-note" style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
              You&apos;ve completed this series — more studies coming soon.
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}
