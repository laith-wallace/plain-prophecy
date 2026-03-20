"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RotateCcw, Share2 } from "lucide-react";
import type { StudyLesson } from "@/data/studies";
import type { StudyCardMeta } from "@/data/studyCardMeta";
import ShareCardModal from "./ShareCardModal";
import { ScriptureRef } from "@/components/ui/ScriptureRef";

interface Props {
  lesson: StudyLesson;
  meta: StudyCardMeta;
  studyHref: string;
  onClose: () => void;
}

export default function StudyCardBack({ lesson, meta, studyHref, onClose }: Props) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div
      className="scb-root"
      style={{
        background: `radial-gradient(ellipse at 60% 70%, ${meta.accentColor}ff 0%, #050508 100%)`,
      }}
    >
      {/* Noise overlay */}
      <div className="scf-noise" aria-hidden="true" />

      {/* Top action row */}
      <div className="scb-top-row">
        <button
          className="scb-share"
          onClick={() => setShareOpen(true)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Share this verse"
        >
          <Share2 size={14} strokeWidth={2} />
        </button>
        <button
          className="scb-close"
          onClick={onClose}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Flip card back"
        >
          <RotateCcw size={14} strokeWidth={2} />
        </button>
      </div>

      {/* Header */}
      <div className="scb-header">
        <span className="scb-emoji" aria-hidden="true">{meta.emoji}</span>
        <div>
          <h2 className="scb-title">{lesson.title}</h2>
          <ScriptureRef className="scb-ref">{lesson.scriptureRef}</ScriptureRef>
        </div>
      </div>

      <div className="scb-divider" />

      {/* Key verse */}
      <div className="scb-verse-block">
        <span className="scb-verse-label">Key verse</span>
        <blockquote className="scb-verse">
          &ldquo;{lesson.keyVerse}&rdquo;
          <cite className="scb-verse-ref">— <ScriptureRef>{lesson.keyVerseRef ?? ""}</ScriptureRef></cite>
        </blockquote>
      </div>

      {/* What you'll cover */}
      <div className="scb-sections">
        <span className="scb-sections-label">What you&apos;ll cover</span>
        <ul className="scb-section-list">
          {(lesson.sections ?? []).map((s) => (
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

      <ShareCardModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        lesson={lesson}
        meta={meta}
      />
    </div>
  );
}
