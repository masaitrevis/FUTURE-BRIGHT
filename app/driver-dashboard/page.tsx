"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Award,
  Car,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Shield,
  CheckCircle,
  LogOut,
  ChevronRight,
  BookOpen,
  Star,
  AlertTriangle,
} from "lucide-react";
import {
  DriverProfile,
  getClassificationLabel,
  getClassificationColor,
  getClassificationBadge,
  TrainingProgram,
  DriverClass,
} from "@/app/lib/driver";

export default function DriverDashboard() {
  const router = useRouter();
  const [driver, setDriver] = useState<DriverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("bright_elite_token");
    const storedDriver = localStorage.getItem("bright_elite_driver");

    if (!token && !storedDriver) {
      router.push("/login");
      return;
    }

    if (storedDriver) {
      try {
        const parsed = JSON.parse(storedDriver);
        setDriver(parsed);
      } catch {
        localStorage.removeItem("bright_elite_driver");
        localStorage.removeItem("bright_elite_token");
        router.push("/login");
        return;
      }
    }

    fetchProfile();
  }, [router]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("bright_elite_token");
      if (!token) return;

      const res = await fetch("/api/driver/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.driver) {
          setDriver(data.driver);
          localStorage.setItem("bright_elite_driver", JSON.stringify(data.driver));
        }
      }
    } catch {
      // offline or error - keep local data
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bright_elite_token");
    localStorage.removeItem("bright_elite_driver");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="text-center max-w-md">
          <AlertTriangle size={40} className="text-gold-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Session Expired</h2>
          <p className="text-white/60 text-sm mb-6">Please log in again to access your dashboard.</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  const classificationColor = getClassificationColor(driver.classification as DriverClass);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-2">
              Driver Portal
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
              Welcome back, {driver.fullName?.split(" ")[0]}
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Classification Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold mb-8 ${classificationColor}`}>
          <Award size={16} />
          {getClassificationBadge(driver.classification as DriverClass)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-navy-900/60 border border-white/5 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <User size={24} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">{driver.fullName}</h3>
                  <p className="text-sm text-white/50">{getClassificationLabel(driver.classification as DriverClass)}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={14} className="text-white/40" />
                  <span className="text-white/70">{driver.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={14} className="text-white/40" />
                  <span className="text-white/70">{driver.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={14} className="text-white/40" />
                  <span className="text-white/70">{driver.location || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Car size={14} className="text-white/40" />
                  <span className="text-white/70">License: {driver.licenseCategory} - {driver.licenseNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star size={14} className="text-white/40" />
                  <span className="text-white/70">{driver.yearsExperience} years experience</span>
                </div>
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="bg-navy-900/60 border border-white/5 rounded-xl p-6">
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <Shield size={16} className="text-gold-400" />
                Skills & Certifications
              </h3>
              <div className="space-y-2">
                {driver.hasDefensiveDriving && (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle size={14} />
                    Defensive Driving Certified
                  </div>
                )}
                {driver.hasFirstAid && (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle size={14} />
                    First Aid Certified
                  </div>
                )}
                {driver.languages && driver.languages.length > 0 && (
                  <div className="text-sm text-white/60">
                    Languages: {driver.languages.join(", ")}
                  </div>
                )}
                <div className="text-sm text-white/60">
                  Vehicles: {driver.vehicleTypes?.join(", ") || "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Trainings & Next Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended Trainings */}
            <div className="bg-navy-900/60 border border-white/5 rounded-xl p-6">
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap size={16} className="text-gold-400" />
                Recommended Training Programs
              </h3>
              {driver.recommendedTrainings && driver.recommendedTrainings.length > 0 ? (
                <div className="space-y-4">
                  {driver.recommendedTrainings.map((training: TrainingProgram) => (
                    <div
                      key={training.id}
                      className="bg-navy-950 rounded-lg p-4 border border-white/5 hover:border-gold-400/20 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gold-400 font-display font-bold text-sm">
                              {training.code}
                            </span>
                            <h4 className="text-white font-medium text-sm">{training.name}</h4>
                          </div>
                          <p className="text-xs text-white/50 mb-3">{training.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {training.skills.map((skill) => (
                              <span
                                key={skill}
                                className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <span className="text-xs text-gold-400 font-medium">{training.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/50">No trainings currently recommended.</p>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-navy-900/60 border border-white/5 rounded-xl p-6">
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle size={16} className="text-gold-400" />
                Your Next Steps
              </h3>
              {driver.nextSteps && driver.nextSteps.length > 0 ? (
                <ul className="space-y-3">
                  {driver.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                        <span className="text-xs text-gold-400 font-medium">{i + 1}</span>
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-white/50">No next steps at this time.</p>
              )}
            </div>

            {/* Training Program Link */}
            <div className="bg-navy-950 border border-gold-400/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-white mb-1">
                    5-Day Elite Driver Training
                  </h3>
                  <p className="text-sm text-white/50">
                    Intensive certification program for corporate drivers, chauffeurs, and mobility specialists.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/driver-training")}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm shrink-0"
                >
                  View Program
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-navy-900/60 border border-white/5 rounded-xl p-6">
              <h3 className="font-display font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-gold-400" />
                Account Status
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{driver.yearsExperience}</div>
                  <div className="text-xs text-white/50">Years Exp.</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{driver.vehicleTypes?.length || 0}</div>
                  <div className="text-xs text-white/50">Vehicle Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {driver.hasDefensiveDriving ? "Yes" : "No"}
                  </div>
                  <div className="text-xs text-white/50">Defensive Driving</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {driver.hasFirstAid ? "Yes" : "No"}
                  </div>
                  <div className="text-xs text-white/50">First Aid</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
