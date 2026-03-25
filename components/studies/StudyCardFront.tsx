"use client";

import React from "react";
import Image from "next/image";
import type { StudyLesson } from "@/data/studies";
import type { StudyCardMeta } from "@/data/studyCardMeta";
import { ScriptureRef } from "@/components/ui/ScriptureRef";

interface Props {
  lesson: StudyLesson;
  meta: StudyCardMeta;
  cardImage?: string;
  category?: "gospel" | "prophecy" | "doctrine";
  priority?: boolean;
  imgLoading?: "eager" | "lazy";
}

export default function StudyCardFront({ lesson, meta, cardImage, category, priority, imgLoading }: Props) {
  const hasArtwork = !!cardImage;

  return (
    <div
      className={[
        "scf-root",
        hasArtwork ? "scf-root--has-artwork" : "",
        category ? `scf-root--${category}` : "",
      ].filter(Boolean).join(" ")}
    >
      {/* Artwork image */}
      {cardImage && (
        <div className="scf-artwork">
          <Image
            src={cardImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority={priority}
            loading={priority ? undefined : imgLoading}
          />
          <div className="scf-artwork-overlay" />
        </div>
      )}

      {/* Subtle noise texture overlay */}
      <div className="scf-noise" aria-hidden="true" />

      {/* Top badges row */}
      <div className="scf-badges">
        {meta.isNew && <span className="scf-badge scf-badge--new">New</span>}
        <ScriptureRef className="scf-badge scf-badge--ref">{lesson.scriptureRef}</ScriptureRef>
      </div>

      {/* Vertical spacer or emoji illustration */}
      {!hasArtwork ? (
        <div className="scf-emoji" aria-hidden="true">
          {meta.emoji}
        </div>
      ) : (
        <div style={{ flex: 1 }} aria-hidden="true" />
      )}

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
