"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function AdminLoginPage() {
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
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
      router.push("/admin");
    } catch {
      setError(flow === "signIn" ? "Invalid email or password." : "Could not create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950">
      <div className="w-full max-w-sm space-y-6 p-8 bg-stone-900 rounded-xl border border-stone-800">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-stone-100">Plain Prophecy</h1>
          <p className="text-sm text-stone-400">{flow === "signIn" ? "Admin dashboard — sign in to continue" : "Create your admin account"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="flow" value={flow} />

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-stone-300">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm text-stone-300">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? (flow === "signIn" ? "Signing in…" : "Creating account…") : (flow === "signIn" ? "Sign in" : "Create account")}
          </button>
        </form>

        <p className="text-center text-xs text-stone-500">
          {flow === "signIn" ? "No account yet? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => { setFlow(flow === "signIn" ? "signUp" : "signIn"); setError(null); }}
            className="text-amber-500 hover:text-amber-400 underline"
          >
            {flow === "signIn" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
