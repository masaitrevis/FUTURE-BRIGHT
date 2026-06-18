"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  User,
  CreditCard,
  Car,
  Target,
  ChevronRight,
  ChevronLeft,
  Shield,
  AlertTriangle,
  Award,
} from "lucide-react";
import {
  classifyDriver,
  DriverClass,
  getClassificationLabel,
  getClassificationColor,
  getClassificationBadge,
  TrainingProgram,
} from "@/app/lib/driver";

type Step = "personal" | "license" | "experience" | "goals" | "review" | "success";

export default function DriverSignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("personal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    email: "",
    phone: "",
    nationalId: "",
    dateOfBirth: "",
    location: "",
    password: "",
    confirmPassword: "",
    // License
    licenseNumber: "",
    licenseCategory: "B",
    licenseExpiry: "",
    yearsExperience: "",
    // Experience
    vehicleTypes: [] as string[],
    accidentHistory: false,
    accidentDetails: "",
    hasDefensiveDriving: false,
    hasFirstAid: false,
    languages: [] as string[],
    // Goals
    employmentStatus: "unemployed",
    desiredTraining: [] as string[],
  });

  const [classification, setClassification] = useState<{
    classification: DriverClass;
    recommendedTrainings: TrainingProgram[];
    nextSteps: string[];
  } | null>(null);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const toggleArray = (field: string, value: string) => {
    setFormData((prev) => {
      const arr = (prev as any)[field] as string[];
      const exists = arr.includes(value);
      return {
        ...prev,
        [field]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const validateStep = (): boolean => {
    switch (step) {
      case "personal":
        if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
          setError("Please fill in all required fields");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          return false;
        }
        return true;
      case "license":
        if (!formData.licenseNumber || !formData.licenseExpiry || !formData.yearsExperience) {
          setError("Please fill in all license details");
          return false;
        }
        return true;
      case "experience":
        if (formData.vehicleTypes.length === 0) {
          setError("Select at least one vehicle type you can drive");
          return false;
        }
        return true;
      case "goals":
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;

    const steps: Step[] = ["personal", "license", "experience", "goals", "review"];
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1]);
    }
  };

  const prevStep = () => {
    const steps: Step[] = ["personal", "license", "experience", "goals", "review"];
    const idx = steps.indexOf(step);
    if (idx > 0) {
      setStep(steps[idx - 1]);
    }
  };

  const handleReview = () => {
    const result = classifyDriver({
      yearsExperience: parseFloat(formData.yearsExperience) || 0,
      hasDefensiveDriving: formData.hasDefensiveDriving,
      hasFirstAid: formData.hasFirstAid,
      licenseCategory: formData.licenseCategory,
      accidentHistory: formData.accidentHistory,
      vehicleTypes: formData.vehicleTypes,
    });
    setClassification(result);
    setStep("review");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Store driver data locally for dashboard
      if (typeof window !== "undefined") {
        localStorage.setItem("bright_elite_driver", JSON.stringify(data.driver));
        localStorage.setItem("bright_elite_token", data.token || "demo-token");
      }

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const stepIndicator = () => {
    const steps = [
      { id: "personal", label: "Personal", icon: User },
      { id: "license", label: "License", icon: CreditCard },
      { id: "experience", label: "Experience", icon: Car },
      { id: "goals", label: "Goals", icon: Target },
    ];
    const currentIdx = steps.findIndex((s) => s.id === step);

    return (
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === currentIdx;
          const isDone = i < currentIdx;

          return (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gold-500 text-navy-950"
                    : isDone
                    ? "bg-gold-500/20 text-gold-400"
                    : "bg-white/5 text-white/40"
                }`}
              >
                {isDone ? (
                  <CheckCircle size={12} />
                ) : (
                  <Icon size={12} />
                )}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight
                  size={14}
                  className={isDone ? "text-gold-400" : "text-white/20"}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-2">
            Driver Registration
          </p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            Join Bright Elite
          </h1>
          <p className="text-sm text-white/50 mt-2 max-w-md mx-auto">
            Register as a professional driver. We&apos;ll classify your skills and
            recommend the right training programs for your career growth.
          </p>
        </div>

        {/* Step Indicator */}
        {step !== "review" && step !== "success" && stepIndicator()}

        {/* Form Container */}
        <div className="bg-navy-900/60 border border-white/5 rounded-xl p-6 md:p-8">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-center gap-2 text-red-400 text-sm">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          {/* STEP 1: PERSONAL */}
          {step === "personal" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="John Kamau"
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
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@email.com"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    National ID / Passport *
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={(e) => updateField("nationalId", e.target.value)}
                    placeholder="12345678"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateField("dateOfBirth", e.target.value)}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Location / City *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Nairobi, Kenya"
                  className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
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
                    value={formData.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: LICENSE */}
          {step === "license" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    License Number *
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => updateField("licenseNumber", e.target.value)}
                    placeholder="DL-12345678"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    License Category *
                  </label>
                  <select
                    value={formData.licenseCategory}
                    onChange={(e) => updateField("licenseCategory", e.target.value)}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors appearance-none"
                  >
                    <option value="A">A - Motorcycles</option>
                    <option value="B">B - Light Vehicles</option>
                    <option value="C">C - Light Trucks</option>
                    <option value="D">D - Passenger Vehicles</option>
                    <option value="E">E - Heavy Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    License Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => updateField("licenseExpiry", e.target.value)}
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                    Years of Driving Experience *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={formData.yearsExperience}
                    onChange={(e) => updateField("yearsExperience", e.target.value)}
                    placeholder="e.g. 3"
                    className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXPERIENCE */}
          {step === "experience" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Vehicle Types You Can Drive *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: "manual", label: "Manual" },
                    { id: "automatic", label: "Automatic" },
                    { id: "suv", label: "SUV / 4x4" },
                    { id: "van", label: "Van / Minibus" },
                    { id: "bus", label: "Bus / Matatu" },
                    { id: "truck", label: "Truck / Lorry" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => toggleArray("vehicleTypes", v.id)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                        formData.vehicleTypes.includes(v.id)
                          ? "bg-gold-500/20 border-gold-400/50 text-gold-400"
                          : "bg-navy-950 border-white/10 text-white/60 hover:border-white/30"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-center gap-3 p-4 bg-navy-950 rounded-lg border border-white/5">
                  <input
                    type="checkbox"
                    id="defensive"
                    checked={formData.hasDefensiveDriving}
                    onChange={(e) => updateField("hasDefensiveDriving", e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-navy-900 text-gold-500 focus:ring-gold-400"
                  />
                  <label htmlFor="defensive" className="text-sm text-white/70 cursor-pointer">
                    I have Defensive Driving certification
                  </label>
                </div>
                <div className="flex items-center gap-3 p-4 bg-navy-950 rounded-lg border border-white/5">
                  <input
                    type="checkbox"
                    id="firstaid"
                    checked={formData.hasFirstAid}
                    onChange={(e) => updateField("hasFirstAid", e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-navy-900 text-gold-500 focus:ring-gold-400"
                  />
                  <label htmlFor="firstaid" className="text-sm text-white/70 cursor-pointer">
                    I have First Aid certification
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Languages Spoken
                </label>
                <div className="flex flex-wrap gap-2">
                  {["English", "Swahili", "French", "Arabic", "Other"].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleArray("languages", lang)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        formData.languages.includes(lang)
                          ? "bg-gold-500/20 border-gold-400/50 text-gold-400"
                          : "bg-navy-950 border-white/10 text-white/60 hover:border-white/30"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 p-4 bg-navy-950 rounded-lg border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.accidentHistory}
                    onChange={(e) => updateField("accidentHistory", e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-navy-900 text-gold-500 focus:ring-gold-400"
                  />
                  <span className="text-sm text-white/70">
                    I have been involved in an at-fault accident in the past 3 years
                  </span>
                </label>
                {formData.accidentHistory && (
                  <textarea
                    value={formData.accidentDetails}
                    onChange={(e) => updateField("accidentDetails", e.target.value)}
                    placeholder="Please provide brief details..."
                    rows={3}
                    className="mt-3 w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                )}
              </div>
            </div>
          )}

          {/* STEP 4: GOALS */}
          {step === "goals" && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Current Employment Status
                </label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => updateField("employmentStatus", e.target.value)}
                  className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors appearance-none"
                >
                  <option value="unemployed">Unemployed - Looking for work</option>
                  <option value="self-employed">Self-employed / Freelance driver</option>
                  <option value="employed">Employed - Seeking better opportunities</option>
                  <option value="part-time">Part-time - Want full-time</option>
                  <option value="student">Student / Learning to drive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Training Programs I&apos;m Interested In
                </label>
                <div className="space-y-3">
                  {[
                    {
                      id: "eccd",
                      label: "ECCD - Entry Level Certified Driver",
                      desc: "Foundation for new drivers",
                    },
                    {
                      id: "eecc",
                      label: "EECC - Executive Certified Chauffeur",
                      desc: "VIP & luxury vehicle training",
                    },
                    {
                      id: "etms",
                      label: "ETMS - Executive Transport Specialist",
                      desc: "Fleet & management skills",
                    },
                    {
                      id: "defensive",
                      label: "Defensive Driving Refresher",
                      desc: "Advanced safety techniques",
                    },
                    {
                      id: "firstaid",
                      label: "First Aid & Emergency Response",
                      desc: "Medical emergency training",
                    },
                    {
                      id: "protocol",
                      label: "VIP Protocol & Etiquette",
                      desc: "Professional conduct standards",
                    },
                  ].map((t) => (
                    <label
                      key={t.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.desiredTraining.includes(t.id)
                          ? "bg-gold-500/10 border-gold-400/30"
                          : "bg-navy-950 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.desiredTraining.includes(t.id)}
                        onChange={() => toggleArray("desiredTraining", t.id)}
                        className="w-4 h-4 mt-0.5 rounded border-white/20 bg-navy-900 text-gold-500 focus:ring-gold-400"
                      />
                      <div>
                        <div className="text-sm font-medium text-white">
                          {t.label}
                        </div>
                        <div className="text-xs text-white/50">{t.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {step === "review" && classification && (
            <div className="space-y-6">
              {/* Classification Badge */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${getClassificationColor(
                    classification.classification
                  )}`}
                >
                  <Award size={16} />
                  {getClassificationBadge(classification.classification)}
                </div>
                <h3 className="font-display text-xl font-bold text-white mt-3">
                  {getClassificationLabel(classification.classification)}
                </h3>
              </div>

              {/* Recommended Trainings */}
              <div>
                <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Recommended Training Programs
                </h4>
                <div className="space-y-3">
                  {classification.recommendedTrainings.map((training) => (
                    <div
                      key={training.id}
                      className="bg-navy-950 border border-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-gold-400 font-display font-bold text-sm">
                              {training.code}
                            </span>
                            <h5 className="text-white font-medium text-sm">
                              {training.name}
                            </h5>
                          </div>
                          <p className="text-xs text-white/50 mt-1">
                            {training.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {training.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gold-400 font-medium shrink-0">
                          {training.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Your Next Steps
                </h4>
                <ul className="space-y-2">
                  {classification.nextSteps.map((step, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle size={14} className="text-gold-400 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Summary */}
              <div className="bg-navy-950 rounded-lg p-4 border border-white/5">
                <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">
                  Profile Summary
                </h4>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <dt className="text-white/50">Name</dt>
                  <dd className="text-white text-right">{formData.fullName}</dd>
                  <dt className="text-white/50">Experience</dt>
                  <dd className="text-white text-right">{formData.yearsExperience} years</dd>
                  <dt className="text-white/50">License</dt>
                  <dd className="text-white text-right">{formData.licenseCategory} - {formData.licenseNumber}</dd>
                  <dt className="text-white/50">Vehicles</dt>
                  <dd className="text-white text-right">{formData.vehicleTypes.join(", ")}</dd>
                </dl>
              </div>
            </div>
          )}

          {/* STEP 6: SUCCESS */}
          {step === "success" && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-gold-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Registration Complete!
              </h2>
              <p className="text-sm text-white/60 mb-2">
                Your driver profile has been created and classified.
              </p>
              {classification && (
                <p className="text-sm text-gold-400 font-medium mb-6">
                  Classification: {getClassificationLabel(classification.classification)}
                </p>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => router.push("/driver-dashboard")}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Go to Dashboard
                  <ArrowRight size={16} />
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-gold-400 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== "success" && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              {step !== "personal" && step !== "review" ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step === "review" ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("goals")}
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Creating Account..." : "Complete Registration"}
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : step === "goals" ? (
                <button
                  type="button"
                  onClick={handleReview}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Review & Classify
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-2.5 rounded-lg transition-colors"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Login link */}
        {step !== "success" && (
          <p className="text-center text-sm text-white/50 mt-6">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-gold-400 hover:text-gold-500 font-medium transition-colors"
            >
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
