'use client';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProfileOnboarding from "@/components/profile/ProfileOnboarding";
import TailoredContent from "@/components/profile/TailoredContent";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  History, 
  Settings, 
  LogOut, 
  Star, 
  Award, 
  Activity,
  ChevronRight,
  Search,
  Calendar,
  Bell,
  User as UserIcon
} from "lucide-react";
import { motion } from "framer-motion";
import './profile.css';

export default function ProfilePage() {
  const user = useQuery(api.users.viewer);
  const tailoredContent = useQuery(api.profile.getTailoredContent);

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

  if (!user.onboardingComplete) {
    return <ProfileOnboarding onComplete={() => {}} />;
  }

  // Dashboard sidebar links
  const sidebarLinks = [
    { icon: <LayoutDashboard size={18} />, label: "Overview", active: true },
    { icon: <BookOpen size={18} />, label: "My Studies", active: false },
    { icon: <Compass size={18} />, label: "Prophecy Map", active: false, href: "/studies/map" },
    { icon: <Star size={18} />, label: "Bookmarks", active: false },
    { icon: <History size={18} />, label: "Activity Log", active: false },
    { icon: <Settings size={18} />, label: "Account Settings", active: false },
  ];

  // Mock stats for aesthetic "WOW" factor
  const stats = [
    { label: "Lessons Started", value: "3", sub: "/ 12 Total", icon: <BookOpen size={20} /> },
    { label: "Prophecies Found", value: "8", sub: "/ 25 Revealed", icon: <Compass size={20} /> },
    { label: "Study Streak", value: "5", sub: "Days Active", icon: <Activity size={20} /> },
    { label: "Sanctuary Rank", value: "Seeker", sub: "Level 2", icon: <Award size={20} /> },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar - Desktop Only */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Image src="/plain-prophecy-logo.svg" alt="Logo" width={100} height={24} />
        </div>
        
        <nav className="sidebar-nav">
          {sidebarLinks.map((link, i) => (
            link.href ? (
              <Link key={i} href={link.href} className={`sidebar-link ${link.active ? 'active' : ''}`}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ) : (
              <button key={i} className={`sidebar-link ${link.active ? 'active' : ''}`}>
                {link.icon}
                <span>{link.label}</span>
              </button>
            )
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link logout">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-search">
            <Search size={16} />
            <input type="text" placeholder="Search lessons, prophecies..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <button className="icon-btn"><Calendar size={20} /></button>
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

              {/* Weekly Progress Chart Mockup */}
              <section className="dashboard-section card-box">
                <div className="section-header-row">
                  <h2>Study Intensity</h2>
                  <div className="chart-legend">
                    <span className="dot"></span>
                    <span>Last 7 Days</span>
                  </div>
                </div>
                <div className="chart-placeholder">
                  <svg className="chart-svg" viewBox="0 0 400 100">
                    <path 
                      className="chart-path"
                      d="M0,80 Q50,60 100,75 T200,40 T300,60 T400,20" 
                      fill="none" 
                      stroke="var(--sda-accent)" 
                      strokeWidth="2"
                    />
                    <path 
                      className="chart-path-glow"
                      d="M0,80 Q50,60 100,75 T200,40 T300,60 T400,20" 
                      fill="none" 
                      stroke="var(--sda-accent)" 
                      strokeWidth="4"
                      opacity="0.3"
                    />
                  </svg>
                  <div className="chart-labels">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>
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
                  <button className="edit-avatar">Edit</button>
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
                    <span className="value">March 2026</span>
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
    </div>
  );
}
