'use client';

import React from 'react';
import Link from 'next/link';
import { Doc } from '@/convex/_generated/dataModel';

interface TailoredContentProps {
  lessons: (Doc<'studyLessons'> & { courseSlug: string })[] | null | undefined;
}

export default function TailoredContent({ lessons }: TailoredContentProps) {
  if (!lessons || lessons.length === 0) {
    return (
      <div className="no-content">
        <p>We&apos;re still tailoring your path. Try answering more questions or check back later!</p>
      </div>
    );
  }

  return (
    <div className="tailored-grid">
      {lessons.map((lesson) => (
        <Link 
          key={lesson._id} 
          href={`/studies/${lesson.courseSlug}/${lesson.slug}`}
          className="tailored-card"
        >
          <div className="card-interest-tag">
            {lesson.tags[0] || 'General'}
          </div>
          <div className="card-content">
            <h3>{lesson.title}</h3>
            <p>{lesson.intro || 'Continue your journey with this lesson.'}</p>
          </div>
          <div className="card-footer">
            <span>Start Lesson</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
