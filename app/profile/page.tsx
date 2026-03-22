'use client';
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import ProfileOnboarding from "@/components/profile/ProfileOnboarding";
import TailoredContent from "@/components/profile/TailoredContent";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Compass,
  Activity,
  Award,
  ChevronRight,
  Search,
  User as UserIcon
} from "lucide-react";
import { motion } from "framer-motion";
import './profile.css';

export default function ProfilePage() {
  const [onboardingDone, setOnboardingDone] = useState(false);
  const user = useQuery(api.users.viewer);
  const tailoredContent = useQuery(api.profile.getTailoredContent);
  const allCoursesWithLessons = useQuery(api.studyCourses.getAllWithLessons);
  const lastLesson = useQuery(api.profile.getLastLesson);

  if (user === undefined) {
    return (
      <div className="profile-loading">
        <div className="loader"></div>
        <p>Connecting to Prophecy...</p>
      </div>
    );
  }

  if (user === null) {
    return (
      <div className="profile-unauth-container">
        <div className="profile-unauth-card">
          <div className="unauth-icon-wrapper">
            <UserIcon size={40} />
          </div>
          <h1>Your Personal Journey</h1>
          <p>Join us to unlock personalized study paths, track prophecy revelations, and save your progress across device.</p>
          <div className="auth-actions">
            <Link href="/login" className="dashboard-btn primary">
              Sign In / Register
            </Link>
            <Link href="/studies" className="dashboard-btn secondary">
              Browse Public Studies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user.onboardingComplete && !onboardingDone) {
    return <ProfileOnboarding onComplete={() => setOnboardingDone(true)} />;
  }

  const totalLessons = allCoursesWithLessons?.reduce((acc, c) => acc + c.lessons.length, 0);
  const levelLabel = user.spiritualLevel
    ? user.spiritualLevel.charAt(0).toUpperCase() + user.spiritualLevel.slice(1)
    : "Beginner";

  const stats = [
    {
      label: "Study Library",
      value: allCoursesWithLessons === undefined ? "—" : String(totalLessons),
      sub: "lessons available",
      icon: <BookOpen size={20} />,
    },
    {
      label: "Your Path",
      value: tailoredContent === undefined ? "—" : String(tailoredContent?.length ?? 0),
      sub: "tailored for you",
      icon: <Compass size={20} />,
    },
    {
      label: "Your Foundation",
      value: levelLabel,
      sub: "spiritual level",
      icon: <Award size={20} />,
    },
    {
      label: "Your Interests",
      value: String(user.interests?.length ?? 0),
      sub: user.interests?.length === 1 ? "topic chosen" : "topics chosen",
      icon: <Activity size={20} />,
    },
  ];

  return (
    <main className="dashboard-main">
      {/* Top Header */}
      <header className="dashboard-header">
        <button
          className="header-search"
          onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
          aria-label="Open search"
        >
          <Search size={16} />
          <span className="header-search-placeholder">Search lessons, prophecies...</span>
          <kbd className="header-search-kbd">⌘K</kbd>
        </button>
        <div className="header-actions">
          <div className="header-user-summary">
            <div className="header-avatar-mini">
              {user.image ? (
                <Image src={user.image} alt="User" width={32} height={32} />
              ) : (
                user.name?.[0] || '?'
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Welcome Section */}
        <section className="dashboard-welcome">
          <div className="welcome-text">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome back, {user.name?.split(' ')[0] || 'Seeker'}
            </motion.h1>
            <p>Your spiritual journey through prophecy continues here.</p>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="stat-icon-box">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.value}<span>{stat.sub}</span></h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Grid Content */}
        <div className="dashboard-grid">
          {/* Left Column: Tailored Content */}
          <div className="dashboard-col col-main">
            <section className="dashboard-section card-box">
              <div className="section-header-row">
                <h2>Active Study Path</h2>
                <Link href="/studies" className="view-all">View All Path <ChevronRight size={14} /></Link>
              </div>
              <div className="tailored-dashboard-container">
                {tailoredContent === undefined ? (
                  <div className="content-loading">Syncing your path...</div>
                ) : tailoredContent === null ? (
                  <div className="content-empty">No recommendations found yet.</div>
                ) : (
                  <TailoredContent lessons={tailoredContent} />
                )}
              </div>
            </section>

            {/* Continue Studying */}
            <section className="dashboard-section card-box">
              <div className="section-header-row">
                <h2>{lastLesson ? "Continue Studying" : "Start Your Journey"}</h2>
              </div>
              {lastLesson === undefined ? (
                <div className="content-loading">Loading...</div>
              ) : lastLesson === null ? (
                <div className="continue-card">
                  <p style={{ color: "var(--dash-text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    You haven&apos;t started a lesson yet. Explore the study library and begin your first lesson.
                  </p>
                  <div className="continue-card-footer">
                    <Link href="/studies" className="dashboard-btn primary small">
                      Browse Studies <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="continue-card">
                  <p className="continue-card-course">{lastLesson.courseTitle}</p>
                  <h3 className="continue-card-title">{lastLesson.title}</h3>
                  {lastLesson.intro && (
                    <p className="continue-card-intro">{lastLesson.intro}</p>
                  )}
                  {lastLesson.readingTime && (
                    <p className="continue-card-meta">~{lastLesson.readingTime} min read</p>
                  )}
                  <div className="continue-card-footer">
                    <Link
                      href={`/studies/${lastLesson.courseSlug}/${lastLesson.slug}`}
                      className="dashboard-btn primary small"
                    >
                      Resume Lesson <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column: User Info & Extras */}
          <div className="dashboard-col col-side">
            <section className="dashboard-section card-box user-meta-card">
              <div className="meta-avatar">
                {user.image ? (
                  <Image src={user.image} alt="Profile" width={80} height={80} className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">{user.name?.[0] || 'S'}</div>
                )}
                <Link href="/profile/settings" className="edit-avatar">Settings</Link>
              </div>
              <div className="meta-info">
                <h3>{user.name}</h3>
                <p className="meta-email">{user.email}</p>
                <div className="meta-badge-container">
                  <span className="meta-badge">{user.spiritualLevel || 'Beginner'}</span>
                </div>
              </div>
              <div className="meta-details-list">
                <div className="meta-item">
                  <span className="label">Interests</span>
                  <div className="interest-pills">
                    {user.interests?.map((interest: string) => (
                      <span key={interest} className="pill">{interest}</span>
                    ))}
                  </div>
                </div>
                <div className="meta-item">
                  <span className="label">Member Since</span>
                  <span className="value">
                    {new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
                      new Date((user as any)._creationTime)
                    )}
                  </span>
                </div>
              </div>
            </section>

            <section className="dashboard-section promo-overlay-card">
              <div className="promo-content">
                <h3>Celestial Prophecy Map</h3>
                <p>Visualize the timeline of truth.</p>
                <Link href="/studies/map" className="dashboard-btn primary small">Launch Map</Link>
              </div>
              <div className="promo-bg-glow"></div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
