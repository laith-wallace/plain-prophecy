'use client';

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import ProfileOnboarding from "@/components/profile/ProfileOnboarding";
import LevelProgressCard from "@/components/profile/LevelProgressCard";
import Link from "next/link";
import Image from "next/image";
import { Lock, Search, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import { LESSON_CARD_IMAGES } from "@/data/lessonCardImages";
import './profile.css';

// ---- Types ----

type CardCategory = "gospel" | "prophecy" | "doctrine";
type CardState = "completed" | "inprogress" | "locked";
type FilterKey = "all" | "completed" | "inprogress" | "locked";


// ---- Helpers ----

function getCourseCategory(slug: string): CardCategory {
  if (slug.includes("daniel") || slug.includes("revelation")) return "prophecy";
  if (slug.includes("gospel") || slug.includes("jesus")) return "gospel";
  return "doctrine";
}

function getLessonState(
  lessonSlug: string,
  completionMap: Record<string, { completed: boolean; started: boolean }> | undefined
): CardState {
  if (completionMap?.[lessonSlug]?.completed) return "completed";
  if (completionMap?.[lessonSlug]?.started) return "inprogress";
  return "locked";
}

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Seeker",
  intermediate: "Student",
  advanced: "Scholar",
};

const LEVEL_NUMS: Record<string, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

const CATEGORY_LABELS: Record<CardCategory, string> = {
  gospel: "Gospel",
  prophecy: "Prophecy",
  doctrine: "Doctrine",
};

// ---- Study Card ----

interface StudyCardProps {
  title: string;
  courseTitle: string;
  courseSlug: string;
  lessonSlug: string;
  category: CardCategory;
  state: CardState;
  isNextUp?: boolean;
  cardImage?: string;
}

function StudyCard({ title, courseTitle: _courseTitle, courseSlug, lessonSlug, category, state, isNextUp, cardImage }: StudyCardProps) {
  const cardClass = [
    "study-card",
    `study-card--${category}`,
    `study-card--${state}`,
    isNextUp ? "study-card--next" : "",
    cardImage ? "study-card--has-artwork" : "",
  ].filter(Boolean).join(" ");

  return (
    <Link href={`/studies/${courseSlug}/${lessonSlug}`} className={cardClass} prefetch={true}>
      {/* Artwork image */}
      {cardImage && (
        <div className="card-artwork">
          <Image src={cardImage} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
      )}

      {/* State badge */}
      {state === "completed" && (
        <div className="card-collected-badge">COLLECTED</div>
      )}
      {state === "inprogress" && (
        <div className="card-inprogress-badge">IN PROGRESS</div>
      )}
      {isNextUp && state === "locked" && (
        <div className="card-next-badge">NEXT UP</div>
      )}

      {/* Lock / next-up icon */}
      {state === "locked" && !isNextUp && (
        <>
          <div className="card-lock-center">
            <Lock size={22} />
          </div>
          <div className="card-start-overlay">
            <span className="card-start-overlay-pill">Start Study</span>
            <span className="card-start-overlay-arrow">↓</span>
          </div>
        </>
      )}
      {isNextUp && state === "locked" && (
        <div className="card-start-overlay">
          <span className="card-start-overlay-pill">Begin →</span>
        </div>
      )}

      {/* Card body (bottom) */}
      <div className="card-body">
        <div className="card-category-pill">
          {state === "completed" && <span className="card-star">✦</span>}
          {CATEGORY_LABELS[category]}
        </div>
        <p className="card-title">{title}</p>
      </div>

      {/* Progress bar for in-progress */}
      {state === "inprogress" && (
        <div className="card-progress-bar">
          <div className="card-progress-bar-fill" />
        </div>
      )}
    </Link>
  );
}

// ---- Page ----

export default function ProfilePage() {
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const user = useQuery(api.users.viewer);
  const allCoursesWithLessons = useQuery(api.studyCourses.getAllWithLessons);
  const lastLesson = useQuery(api.profile.getLastLesson);
  const progress = useQuery(api.profile.getProgress);
  const completionMap = useQuery(api.profile.getStudyCompletionMap);

  // ---- Loading ----
  if (user === undefined) {
    return (
      <div className="profile-loading">
        <div className="loader" />
        <p>Connecting to Prophecy...</p>
      </div>
    );
  }

  // ---- Unauthenticated ----
  if (user === null) {
    return (
      <div className="profile-unauth-container">
        <div className="profile-unauth-card">
          <div className="unauth-icon-wrapper">
            <UserIcon size={40} />
          </div>
          <h1>Your Personal Journey</h1>
          <p>Join us to unlock personalized study paths, track prophecy revelations, and save your progress across devices.</p>
          <div className="auth-actions">
            <Link href="/login" className="dashboard-btn primary">Sign In / Register</Link>
            <Link href="/studies" className="dashboard-btn secondary">Browse Public Studies</Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- Onboarding ----
  if (!user.onboardingComplete && !onboardingDone) {
    return <ProfileOnboarding onComplete={() => setOnboardingDone(true)} />;
  }

  // ---- Derived data ----
  const levelKey = (user.spiritualLevel as string) ?? "beginner";
  const levelLabel = LEVEL_LABELS[levelKey] ?? "Seeker";
  const levelNum = LEVEL_NUMS[levelKey] ?? 1;

  // Build course-grouped lesson list with state and "Next Up" flag
  const courseGroups = allCoursesWithLessons?.map((course) => {
    const category = getCourseCategory(course.slug);
    let foundNextUp = false;

    const lessons = course.lessons.map((l) => {
      const state = getLessonState(l.slug, completionMap ?? undefined);
      let isNextUp = false;
      if (!foundNextUp && state === "locked") {
        isNextUp = true;
        foundNextUp = true;
      }
      return { ...l, courseSlug: course.slug, courseTitle: course.title, category, state, isNextUp };
    });

    const completedCount = lessons.filter((l) => l.state === "completed").length;
    return { ...course, category, lessons, completedCount };
  }) ?? [];

  const allLessonsFlat = courseGroups.flatMap((c) => c.lessons);

  const totalCollected = allLessonsFlat.filter((l) => l.state === "completed").length;

  const filterCounts: Record<FilterKey, number> = {
    all: allLessonsFlat.length,
    completed: allLessonsFlat.filter((l) => l.state === "completed").length,
    inprogress: allLessonsFlat.filter((l) => l.state === "inprogress").length,
    locked: allLessonsFlat.filter((l) => l.state === "locked").length,
  };

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all", label: `All (${filterCounts.all})` },
    { key: "completed", label: `Collected (${filterCounts.completed})` },
    { key: "inprogress", label: `In Progress (${filterCounts.inprogress})` },
    { key: "locked", label: `Locked (${filterCounts.locked})` },
  ];

  // For the grouped grid: filter lessons per course, skip empty courses
  const visibleCourseGroups = courseGroups.map((course) => ({
    ...course,
    lessons: course.lessons.filter((l) =>
      activeFilter === "all" ? true : l.state === activeFilter
    ),
  })).filter((c) => c.lessons.length > 0);

  const isLoading = allCoursesWithLessons === undefined || completionMap === undefined;

  return (
    <main className="dashboard-main">
      {/* ── Header (search bar) ── */}
      <header className="dashboard-header">
        <button
          className="header-search"
          onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
          aria-label="Open search"
        >
          <Search size={15} />
          <span className="header-search-placeholder">Search lessons, prophecies...</span>
          <kbd className="header-search-kbd">⌘K</kbd>
        </button>
        <div className="header-actions">
          <div className="header-user-summary">
            <div className="header-avatar-mini">
              {user.image ? (
                <Image src={user.image} alt="User" width={32} height={32} />
              ) : (
                user.name?.[0] || "?"
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Section 1: Profile Hero ── */}
      <motion.section
        className="profile-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-avatar-wrap">
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={84}
              height={84}
              className="hero-avatar-img"
            />
          ) : (
            <div className="hero-avatar-placeholder">
              {user.name?.[0] || "S"}
            </div>
          )}
        </div>

        <h1 className="hero-name">{user.name || "Seeker"}</h1>

        <div className="hero-level-badge">
          {levelLabel} · Level {levelNum}
        </div>

        <div className="hero-stats-row">
          <div className="hero-stat">
            <span className="hero-stat-value">{progress?.completedCount ?? 0}</span>
            <span className="hero-stat-label">Collected</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{progress?.streak ?? 0}</span>
            <span className="hero-stat-label">Day Streak</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-value">{progress?.totalXp ?? 0}</span>
            <span className="hero-stat-label">Total XP</span>
          </div>
        </div>

        <Link href="/profile/settings" className="hero-settings-link">
          Settings
        </Link>
      </motion.section>

      {/* ── Section 2: Collection Grid ── */}
      <section className="collection-section">
        <div className="collection-header-row">
          <h2 className="collection-title">Your Collection</h2>
          <span className="collection-counter">
            {totalCollected} / {allLessonsFlat.length} collected
          </span>
        </div>

        {/* Filter tabs */}
        <div className="filter-tabs" role="group" aria-label="Filter collection">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`filter-tab${activeFilter === f.key ? " active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Course-grouped grid */}
        {isLoading ? (
          <div className="collection-empty">Loading your collection...</div>
        ) : visibleCourseGroups.length === 0 ? (
          <div className="collection-empty">
            {activeFilter === "completed"
              ? "No collected studies yet. Complete a lesson to add it here."
              : activeFilter === "inprogress"
              ? "No studies in progress right now."
              : "Nothing to show."}
          </div>
        ) : (
          <div className="course-groups">
            {visibleCourseGroups.map((course) => (
              <div key={course._id} className="course-group">
                <div className="course-group-header">
                  <span className="course-group-title">{course.title}</span>
                  <span className="course-group-count">
                    {course.completedCount} / {course.lessons.length}
                  </span>
                </div>
                <div className="collection-grid">
                  {course.lessons.map((lesson, i) => (
                    <motion.div
                      key={lesson._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <StudyCard
                        title={lesson.title}
                        courseTitle={lesson.courseTitle}
                        courseSlug={lesson.courseSlug}
                        lessonSlug={lesson.slug}
                        category={lesson.category}
                        state={lesson.state}
                        isNextUp={lesson.isNextUp}
                        cardImage={LESSON_CARD_IMAGES[lesson.slug]}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Section 3: Continue Studying strip ── */}
      <div className="continue-strip">
        {lastLesson === undefined ? (
          <div className="continue-strip-empty">Loading...</div>
        ) : lastLesson === null ? (
          <>
            <div className="continue-strip-mini-card study-card--doctrine">📖</div>
            <div className="continue-strip-info">
              <p className="continue-strip-course">Start your journey</p>
              <p className="continue-strip-lesson">Begin Your Collection</p>
            </div>
            <Link href="/studies" className="continue-strip-btn">
              Browse Studies →
            </Link>
          </>
        ) : (
          <>
            <div
              className={`continue-strip-mini-card study-card--${getCourseCategory(lastLesson.courseSlug)}`}
              aria-hidden="true"
            >
              ✦
            </div>
            <div className="continue-strip-info">
              <p className="continue-strip-course">{lastLesson.courseTitle}</p>
              <p className="continue-strip-lesson">{lastLesson.title}</p>
            </div>
            <Link
              href={`/studies/${lastLesson.courseSlug}/${lastLesson.slug}`}
              className="continue-strip-btn"
            >
              Resume →
            </Link>
          </>
        )}
      </div>

      {/* ── Section 4: Level Progress ── */}
      {progress !== undefined && progress !== null && (
        <section className="level-section">
          <LevelProgressCard
            spiritualLevel={
              (user.spiritualLevel as "beginner" | "intermediate" | "advanced") ?? "beginner"
            }
            completedCount={progress.completedCount}
          />
        </section>
      )}

      {/* ── Section 5: Map Promo ── */}
      <section className="promo-section">
        <div className="promo-content">
          <h3>Celestial Prophecy Map</h3>
          <p>Visualize the timeline of truth.</p>
          <Link href="/studies/map" className="dashboard-btn primary small">
            Launch Map
          </Link>
        </div>
      </section>
    </main>
  );
}
