"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-navy-900/60 border border-white/5 rounded-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-2">
              Welcome Back
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
              Log In to Your Account
            </h1>
            <p className="text-sm text-white/50 mt-2">
              Access your bookings, training schedules, and corporate service
              requests.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-white/50">
                <input
                  type="checkbox"
                  className="rounded border-white/20 bg-navy-950 text-gold-500 focus:ring-gold-400"
                />
                Remember me
              </label>
              <Link
                href="/login"
                className="text-sm text-gold-400 hover:text-gold-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset coming soon.");
                }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} />
              Log In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/50">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-gold-400 hover:text-gold-500 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
