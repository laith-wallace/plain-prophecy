'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#1e293b] border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="mb-6">
          <Link href="/login" className="text-amber-500 hover:text-amber-400 flex items-center gap-2 text-sm transition-colors">
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-slate-400 mb-8">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-top border-white/5 text-center">
          <p className="text-xs text-slate-500">
            Note: This feature is coming soon. Please contact support if you need immediate assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
