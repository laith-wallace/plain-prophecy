'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProfileOnboarding from "@/components/profile/ProfileOnboarding";
import TailoredContent from "@/components/profile/TailoredContent";
import Link from "next/link";
import './profile.css';

export default function ProfilePage() {
  const user = useQuery(api.users.viewer);
  // getTailoredContent expects no args, it handles the user itself
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
      <div className="profile-container unauthenticated">
        <div className="profile-hero">
          <h1>Your Personal Journey</h1>
          <p>Join us to unlock personalized study paths and track your progress through the scriptures.</p>
          <div className="auth-actions">
            <Link href="/login" className="cta-button primary">
              Sign In / Register
            </Link>
            <Link href="/studies" className="cta-button secondary">
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

  return (
    <div className="profile-container dashboard">
      <div className="profile-header">
        <div className="user-profile-summary">
          <div className="user-avatar">{user.name?.[0] || 'S'}</div>
          <div className="user-details">
            <h1>Welcome, {user.name || 'Seeker'}</h1>
            <div className="user-badges">
              <span className="badge level">{user.spiritualLevel || 'New Explorer'}</span>
              {user.interests?.map((interest: string) => (
                <span key={interest} className="badge interest">{interest}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="profile-main">
        <section className="tailored-section">
          <div className="section-header">
            <h2>Your Personal Path</h2>
            <p>Specially curated studies based on your profile.</p>
          </div>
          
          {tailoredContent === undefined ? (
            <div className="content-loading">Loading your path...</div>
          ) : (
            <TailoredContent lessons={tailoredContent} />
          )}
        </section>

        <section className="getting-started-section">
          <div className="promo-card">
            <h3>Explore the Prophecy Map</h3>
            <p>See how all the prophecies fit together in our interactive celestial map.</p>
            <Link href="/studies/map" className="promo-link">View Map →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
