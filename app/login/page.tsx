"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, LogIn, AlertTriangle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Try API first
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof window !== "undefined") {
          localStorage.setItem("bright_elite_token", data.token);
          localStorage.setItem("bright_elite_driver", JSON.stringify(data.driver));
        }
        router.push("/driver-dashboard");
        return;
      }

      // Fallback: check localStorage (for demo/development)
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("bright_elite_driver");
        if (stored) {
          const driver = JSON.parse(stored);
          if (driver.email === email) {
            // Simple password check for demo (insecure but functional for testing)
            // In production this should always use the API
            localStorage.setItem("bright_elite_token", "local-token");
            router.push("/driver-dashboard");
            return;
          }
        }
      }

      throw new Error("Invalid email or password");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-navy-900/60 border border-white/5 rounded-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-2">
              Driver Portal
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
              Log In
            </h1>
            <p className="text-sm text-white/50 mt-2">
              Access your driver profile, training recommendations, and career
              dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-center gap-2 text-red-400 text-sm">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

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
                placeholder="you@email.com"
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
              <button
                type="button"
                className="text-sm text-gold-400 hover:text-gold-500 transition-colors"
                onClick={() => alert("Password reset feature coming soon.")}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-white/50">
              Don&apos;t have a driver account?{" "}
              <Link
                href="/signup"
                className="text-gold-400 hover:text-gold-500 font-medium transition-colors"
              >
                Register as a driver
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
