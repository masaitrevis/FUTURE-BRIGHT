import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1563720223185-11003d516659?w=1920&q=80"
          alt="Luxury executive transport in Nairobi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 md:pt-32">
        <p className="text-gold-400 text-sm md:text-base uppercase tracking-[0.25em] font-semibold mb-4 md:mb-6">
          Bright Elite Tours & Travels
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
          Premium Professional Mobility{" "}
          <span className="text-gold-400">&</span> Executive Transport
        </h1>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
          Driven by Excellence. Nairobi&apos;s trusted partner for executive
          chauffeur services and corporate driver outsourcing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/254700460814"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-3 rounded transition-colors"
          >
            Book Executive Transport
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-24 border-t border-white/10 pt-8">
          {[
            { num: "5", label: "Core Services" },
            { num: "24/7", label: "Availability" },
            { num: "100%", label: "Professional Excellence" },
            { num: "Kenya", label: "& East Africa" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold text-gold-400">
                {s.num}
              </div>
              <div className="text-xs md:text-sm text-white/50 uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
