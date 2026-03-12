"use client";

import React from "react";
import Link from "next/link";
import type { StudyLesson } from "@/data/studies";
import type { StudyCardMeta } from "@/data/studyCardMeta";

interface Props {
  lesson: StudyLesson;
  meta: StudyCardMeta;
  studyHref: string;
  onClose: () => void;
}

export default function StudyCardBack({ lesson, meta, studyHref, onClose }: Props) {
  return (
    <div
      className="scb-root"
      style={{
        background: `radial-gradient(ellipse at 60% 70%, ${meta.accentColor}ff 0%, #050508 100%)`,
      }}
    >
      {/* Noise overlay */}
      <div className="scf-noise" aria-hidden="true" />

      {/* Close button */}
      <button className="scb-close" onClick={onClose} aria-label="Close card details">
        ✕
      </button>

      {/* Header */}
      <div className="scb-header">
        <span className="scb-emoji" aria-hidden="true">{meta.emoji}</span>
        <div>
          <h2 className="scb-title">{lesson.title}</h2>
          <span className="scb-ref">{lesson.scriptureRef}</span>
        </div>
      </div>

      <div className="scb-divider" />

      {/* Key verse */}
      <div className="scb-verse-block">
        <span className="scb-verse-label">Key verse</span>
        <blockquote className="scb-verse">
          &ldquo;{lesson.keyVerse}&rdquo;
          <cite className="scb-verse-ref">— {lesson.keyVerseRef}</cite>
        </blockquote>
      </div>

      {/* What you'll cover */}
      <div className="scb-sections">
        <span className="scb-sections-label">What you&apos;ll cover</span>
        <ul className="scb-section-list">
          {lesson.sections.map((s) => (
            <li key={s.heading} className="scb-section-item">
              <span className="scb-section-dot">›</span>
              <span>{s.heading}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Link href={studyHref} className="scb-cta">
        Go to full study →
      </Link>
    </div>
  );
}
