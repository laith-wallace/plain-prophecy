"use client";

import React from "react";
import Link from "next/link";
import { studyBooks } from "@/data/studies";
import { getCardMeta } from "@/data/studyCardMeta";

interface StudyListViewProps {
  bookFilter?: string;
}

export default function StudyListView({ bookFilter = "all" }: StudyListViewProps) {
  const filtered = studyBooks.filter(
    (book) => bookFilter === "all" || book.slug === bookFilter
  );

  return (
    <div className="slv-root">
      {filtered.map((book) => (
        <div key={book.slug} className="slv-book-group">
          <div className="slv-book-header">
            <span className="slv-book-icon">{book.icon}</span>
            <h3 className="slv-book-title">{book.title}</h3>
          </div>
          <ul className="slv-list">
            {book.lessons.map((lesson) => {
              const meta = getCardMeta(lesson.slug);
              const href = `/studies/${book.slug}/${lesson.slug}`;
              return (
                <li key={lesson.slug}>
                  <Link href={href} className="slv-row">
                    <div
                      className="slv-thumb"
                      style={{
                        background: `radial-gradient(ellipse at 40% 40%, ${meta.accentColor}cc 0%, #0a0a12 100%)`,
                      }}
                      aria-hidden="true"
                    >
                      {meta.emoji}
                    </div>
                    <div className="slv-info">
                      <div className="slv-row-top">
                        <span className="slv-lesson-title">{lesson.title}</span>
                        {meta.isNew && <span className="slv-badge--new">New</span>}
                      </div>
                      <p className="slv-lesson-desc">{meta.shortDescription}</p>
                      <span className="slv-ref">{lesson.scriptureRef}</span>
                    </div>
                    <span className="slv-arrow" aria-hidden="true">›</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
