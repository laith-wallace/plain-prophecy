"use client";

import React from "react";
import type { StudyLesson } from "@/data/studies";
import type { StudyCardMeta } from "@/data/studyCardMeta";

interface Props {
  lesson: StudyLesson;
  meta: StudyCardMeta;
}

export default function StudyCardFront({ lesson, meta }: Props) {
  return (
    <div
      className="scf-root"
      style={{
        background: `radial-gradient(ellipse at 40% 30%, ${meta.accentColor}ee 0%, #050508 100%)`,
      }}
    >
      {/* Subtle noise texture overlay */}
      <div className="scf-noise" aria-hidden="true" />

      {/* Top badges row */}
      <div className="scf-badges">
        {meta.isNew && <span className="scf-badge scf-badge--new">New</span>}
        <span className="scf-badge scf-badge--ref">{lesson.scriptureRef}</span>
      </div>

      {/* Central emoji illustration */}
      <div className="scf-emoji" aria-hidden="true">
        {meta.emoji}
      </div>

      {/* Card body */}
      <div className="scf-body">
        <div className="scf-reading-time">
          <span className="scf-dot-glyph">·</span>
          {lesson.readingTime ?? '?'} min read
        </div>
        <h2 className="scf-title">{lesson.title}</h2>
        <p className="scf-desc">{meta.shortDescription}</p>
      </div>

      {/* Tap hint */}
      <div className="scf-hint">Tap to explore →</div>
    </div>
  );
}
