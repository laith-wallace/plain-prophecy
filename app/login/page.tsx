"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import LoginCarousel from "@/components/ui/LoginCarousel";
import "./login.css";


function LoginPageContent() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "admin" || roleParam === "user") {
      setRole(roleParam as "user" | "admin");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await signIn("password", formData);
      
      // Redirect based on role
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (err) {
      console.error(err);
      setError(flow === "signIn" ? "Invalid email or password." : "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try with email.");
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Left Section: Login Form */}
      <section className="login-left-section">
        <div className="login-form-container">
          <div className="login-logo-container">
            <Link href="/">
              <Image 
                src="/images/login/logo.png" 
                alt="Plain Prophecy Logo" 
                width={48} 
                height={48} 
                priority
              />
            </Link>
          </div>

          <div className="login-welcome-text">
            <h1>{flow === "signIn" ? "Welcome back" : "Create account"}</h1>
            <p>{flow === "signIn" ? "Sign into Plain Prophecy" : "Join the Plain Prophecy community"}</p>
          </div>

          {/* User/Admin Role Toggle */}
          <div className="role-toggle-container">
            <div className="role-option">
              <input 
                type="radio" 
                id="user-role" 
                name="role" 
                checked={role === "user"} 
                onChange={() => setRole("user")} 
              />
              <label htmlFor="user-role" className="role-label" id="user-role-label">User</label>
            </div>
            <div className="role-option">
              <input 
                type="radio" 
                id="admin-role" 
                name="role" 
                checked={role === "admin"} 
                onChange={() => setRole("admin")} 
              />
              <label htmlFor="admin-role" className="role-label" id="admin-role-label">Admin</label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <input type="hidden" name="flow" value={flow} />

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                required
                autoComplete="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>


            <div className="form-extras">
              <label className="remember-me">
                <input type="checkbox" name="remember" />
                <span>Remember for 30 days</span>
              </label>
              <Link href="/forgot-password" title="Coming soon" className="forgot-password">
                Forgot password
              </Link>
            </div>

            {error && <p className="error-message text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="signin-button"
            >
              {loading ? "Signing in..." : (flow === "signIn" ? "Sign in" : "Sign up")}
            </button>

            {flow === "signIn" && (
              <div className="quick-login-container">
                <button
                  type="button"
                  className="quick-login-button"
                  onClick={() => {
                    const emailInput = document.getElementById("email") as HTMLInputElement;
                    const passwordInput = document.getElementById("password") as HTMLInputElement;
                    if (emailInput && passwordInput) {
                      emailInput.value = "laithwallace@gmail.com";
                      passwordInput.value = "admin123";
                    }
                  }}
                >
                  Quick Fill (Demo)
                </button>
              </div>
            )}


            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="google-button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </form>

          <div className="signup-prompt">
            {flow === "signIn" ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
              className="signup-link"
            >
              {flow === "signIn" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </section>

      {/* Right Section: Carousel */}
      <section className="login-right-section">
        <LoginCarousel />
      </section>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center text-amber-500">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
