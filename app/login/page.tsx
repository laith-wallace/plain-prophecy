"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import '@/app/profile/profile.css';

export default function LoginPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await signIn("password", formData);
      router.push("/profile");
    } catch (err) {
      console.error(err);
      setError(flow === "signIn" ? "Invalid email or password." : "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <Link href="/" className="login-logo">Plain Prophecy</Link>
          <h1>{flow === "signIn" ? "Welcome Back" : "Begin Your Journey"}</h1>
          <p className="login-subtitle">
            {flow === "signIn" 
              ? "Sign in to access your personalized study path." 
              : "Create an account to track your progress and get tailored recommendations."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input type="hidden" name="flow" value={flow} />

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cta-button primary full-width"
          >
            {loading ? "Please wait..." : (flow === "signIn" ? "Sign In" : "Create Account")}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {flow === "signIn" ? "New to Plain Prophecy? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => { setFlow(flow === "signIn" ? "signUp" : "signIn"); setError(null); }}
              className="toggle-flow-btn"
            >
              {flow === "signIn" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
