import { GraduationCap, Shield, Car, Users, FileCheck, Award } from "lucide-react";

const days = [
  {
    day: 1,
    title: "Foundation & Awareness",
    topics: [
      "Introduction & Orientation",
      "Defensive Driving Fundamentals",
      "Road Safety & Traffic Regulations",
      "Vehicle Basics & Pre-Trip Inspection",
    ],
  },
  {
    day: 2,
    title: "Advanced Driving Techniques",
    topics: [
      "Advanced Defensive Driving Techniques",
      "Hazard Perception & Risk Assessment",
      "Eco-Driving & Fuel Efficiency",
      "Emergency Maneuvers",
    ],
  },
  {
    day: 3,
    title: "Executive & VIP Protocol",
    topics: [
      "Executive Chauffeur & VIP Protocol",
      "Professionalism & Etiquette",
      "Confidentiality & Discretion",
      "First Impressions & Grooming",
    ],
  },
  {
    day: 4,
    title: "Vehicle Maintenance & Care",
    topics: [
      "Vehicle Maintenance & Care",
      "Advanced Vehicle Systems",
      "Preventive Maintenance",
      "Breakdown & Emergency Response",
    ],
  },
  {
    day: 5,
    title: "Assessment & Certification",
    topics: [
      "Practical Driving Evaluation",
      "Written Examination",
      "Certification & Award Ceremony",
      "ECCD / EECC / ETMS Tier Assignment",
    ],
  },
];

const tiers = [
  {
    code: "ECCD",
    name: "Elite Certified Corporate Driver",
    desc: "Entry-level certification for corporate fleet and professional driving roles. Covers defensive driving, road safety, and vehicle care.",
    icon: Car,
  },
  {
    code: "EECC",
    name: "Elite Executive Chauffeur Certification",
    desc: "Mid-tier certification for executive and VIP service roles. Includes advanced defensive driving, VIP protocol, and professional etiquette.",
    icon: Users,
  },
  {
    code: "ETMS",
    name: "Elite Tactical Mobility Specialist",
    desc: "Elite-tier certification for high-risk, diplomatic, and tactical mobility assignments. Covers advanced maneuvers, threat assessment, and executive protection driving.",
    icon: Shield,
  },
];

export default function DriverTrainingPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-navy-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80"
            alt="Elite driver training"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 to-navy-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
            Professional Development
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
            5-Day Elite Driver Training Program
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            An intensive, certification-grade program designed to produce world-class corporate drivers, executive chauffeurs, and tactical mobility specialists.
          </p>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-16 md:py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-2">Duration</h3>
              <p className="text-sm text-white/60">5 Intensive Days</p>
            </div>
            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <FileCheck size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-2">Certification</h3>
              <p className="text-sm text-white/60">3-Tier Framework</p>
            </div>
            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Award size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-2">Outcome</h3>
              <p className="text-sm text-white/60">Industry-Ready Professionals</p>
            </div>
          </div>

          {/* Day-by-Day */}
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Curriculum</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Day-by-Day Breakdown</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {days.map((d) => (
              <div key={d.day} className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 hover:border-gold-400/20 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                    <span className="font-display text-sm font-bold text-gold-400">D{d.day}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{d.title}</h3>
                </div>
                <ul className="space-y-3">
                  {d.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-gold-400 mt-1 shrink-0">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Final Card */}
            <div className="bg-navy-900/60 border border-gold-400/20 rounded-lg p-6 md:p-8 flex flex-col justify-center items-center text-center">
              <div className="w-14 h-14 rounded-full bg-gold-500/10 flex items-center justify-center mb-4">
                <Award size={28} className="text-gold-400" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white mb-2">Certified Graduate</h3>
              <p className="text-sm text-white/60">
                Upon completion, candidates are awarded a tiered certification and placed in our elite driver pool for corporate placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Tiers */}
      <section className="py-16 md:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Tiers</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Certification Framework</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {tiers.map((t) => (
              <div key={t.code} className="bg-navy-950/60 border border-white/5 rounded-lg p-6 md:p-8 hover:border-gold-400/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mb-5">
                  <t.icon size={22} className="text-gold-400" />
                </div>
                <p className="font-display text-sm font-bold text-gold-400 uppercase tracking-wider mb-2">{t.code}</p>
                <h3 className="font-display text-lg font-semibold text-white mb-3">{t.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Clients */}
      <section className="py-16 md:py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">Who We Serve</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Our Target Clients</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {["Corporates", "NGOs", "Embassies", "Government Agencies", "Executives", "Conference Organizers"].map((c) => (
              <span
                key={c}
                className="inline-block bg-navy-900 border border-white/5 text-sm text-white/70 px-5 py-2 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
