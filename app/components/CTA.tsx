import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-navy-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-800 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80"
              alt="Luxury car"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-800/95 to-navy-800/70" />
          </div>
          <div className="relative z-10 p-8 md:p-14 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
                Get Started
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-4">
                Ready for Premium Executive Transport?
              </h2>
              <p className="text-white/60">
                Contact us today to arrange chauffeur services, corporate driver outsourcing, or enroll in our elite driver training program.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-3 rounded transition-colors shrink-0"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
