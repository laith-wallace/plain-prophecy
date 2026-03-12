"use client";

import Link from "next/link";
import { StudyBook, StudyLesson } from "@/data/studies";

interface StudyContentProps {
  book: StudyBook;
  lesson: StudyLesson;
}

export default function StudyContent({ book, lesson }: StudyContentProps) {
  return (
    <article className="study-article">
      {/* Article header */}
      <header className="study-header">
        <div className="study-eyebrow">
          <span className="study-book-tag">
            {book.icon} {book.title}
          </span>
          <span className="study-scripture-ref">{lesson.scriptureRef}</span>
        </div>

        <h1 className="study-title">{lesson.title}</h1>

        <div className="study-meta">
          <span className="study-read-time">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {lesson.readingTime} min read
          </span>
          <span className="study-meta-divider">·</span>
          <span className="study-meta-label">Christ-Centred Study</span>
        </div>

        <p className="study-intro">{lesson.intro}</p>

        {/* Key Verse callout */}
        <blockquote className="study-key-verse">
          <div className="study-key-verse-label">Key Verse</div>
          <p className="study-key-verse-text">&ldquo;{lesson.keyVerse}&rdquo;</p>
          <cite className="study-key-verse-ref">— {lesson.keyVerseRef}</cite>
        </blockquote>
      </header>

      {/* Divider */}
      <hr className="study-divider" />

      {/* Body sections */}
      <div className="study-body">
        {lesson.sections.map((section, i) => (
          <section key={i} className="study-section">
            <h2 className="study-section-heading">
              <span className="study-section-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              {section.heading}
            </h2>
            <p className="study-section-body">{section.body}</p>
          </section>
        ))}
      </div>

      {/* Christ at the Centre box */}
      <div className="study-christ-box">
        <div className="study-christ-box-header">
          <div className="study-christ-box-icon">✝</div>
          <div>
            <div className="study-christ-box-eyebrow">Christ at the Centre</div>
            <div className="study-christ-box-subhead">
              How this passage reveals Jesus
            </div>
          </div>
        </div>
        <p className="study-christ-box-body">{lesson.christCentre}</p>
      </div>

      {/* Footer nav */}
      <footer className="study-footer">
        <div className="study-footer-inner">
          <div className="study-footer-tag">
            {book.title} · {lesson.scriptureRef}
          </div>

          {lesson.nextLesson ? (
            <Link
              href={`/studies/${lesson.nextLesson.book}/${lesson.nextLesson.lesson}`}
              className="study-next-link"
            >
              <span>Next Study</span>
              <span className="study-next-title">{lesson.nextLesson.title}</span>
              <span className="study-next-arrow">→</span>
            </Link>
          ) : (
            <div className="study-final-note">
              You&apos;ve completed this series — more studies coming soon.
            </div>
          )}
        </div>
      </footer>
    </article>
  );
}
