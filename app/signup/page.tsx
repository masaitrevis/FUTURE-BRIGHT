"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    serviceInterest: "Executive Chauffeur",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    setStep("success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <div className="w-full max-w-lg">
        {step === "form" ? (
          <div className="bg-navy-900/60 border border-white/5 rounded-xl p-8 md:p-10">
            <div className="text-center mb-8">
              <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-2">
                Get Started
              </p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
                Create Your Account
              </h1>
              <p className="text-sm text-white/50 mt-2">
                Book chauffeur services, enroll in training, or request corporate
                driver outsourcing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Service Interest *
                </label>
                <select
                  name="serviceInterest"
                  required
                  value={formData.serviceInterest}
                  onChange={handleChange}
                  className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors appearance-none"
                >
                  <option>Executive Chauffeur</option>
                  <option>Driver Training</option>
                  <option>Corporate Outsourcing</option>
                  <option>Airport Transfers</option>
                  <option>Tours & Travel</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-sm text-white/50 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-gold-400 hover:text-gold-500 font-medium transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        ) : (
          <div className="bg-navy-900/60 border border-white/5 rounded-xl p-8 md:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-gold-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Welcome to Bright Elite
            </h2>
            <p className="text-sm text-white/60 mb-6">
              Your account has been created. Our team will reach out to you
              within 24 hours to finalize your service request.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Go to Home
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-gold-400 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
