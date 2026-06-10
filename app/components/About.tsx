import { Award, CheckCircle } from "lucide-react";

const values = ["Discipline", "Integrity", "Professionalism", "Safety", "Excellence"];

const certifications = [
  { code: "ECCD", name: "Elite Certified Corporate Driver", desc: "Foundation-level certification for corporate fleet readiness." },
  { code: "EECC", name: "Elite Executive Chauffeur Certification", desc: "Advanced certification for executive and VIP-level service." },
  { code: "ETMS", name: "Elite Tactical Mobility Specialist", desc: "Elite tier for high-risk, diplomatic, and tactical transport." },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"
                alt="Executive transport on a Kenyan road"
                className="w-full h-80 md:h-[28rem] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-navy-950 border border-gold-400/30 rounded-lg p-5 md:p-6 max-w-[260px]">
              <p className="font-display text-2xl md:text-3xl font-bold text-gold-400">5</p>
              <p className="text-xs md:text-sm text-white/70">Days of intensive Elite Driver Training</p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Nairobi&apos;s Standard for Executive Transport
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Bright Elite Tours and Travels is a subsidiary of{" "}
              <strong className="text-white">Future Bright Ventures Ltd</strong>, built to deliver
              premium professional mobility and executive transport solutions across Kenya
              and East Africa. We serve corporates, NGOs, embassies, government agencies,
              and high-net-worth individuals who demand discretion, safety, and excellence.
            </p>

            <div className="mb-8">
              <p className="text-sm text-white/50 uppercase tracking-wider font-semibold mb-3">
                Our Core Values
              </p>
              <div className="flex flex-wrap gap-3">
                {values.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1.5 text-sm text-white/80 bg-navy-800 px-3 py-1.5 rounded-full border border-white/5"
                  >
                    <CheckCircle size={14} className="text-gold-400" />
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-sm text-white/50 uppercase tracking-wider font-semibold mb-3">
                Certification Framework
              </p>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div
                    key={c.code}
                    className="flex items-start gap-3 bg-navy-950/60 border border-white/5 rounded-lg p-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                      <Award size={16} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {c.code} — {c.name}
                      </p>
                      <p className="text-xs text-white/50">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
