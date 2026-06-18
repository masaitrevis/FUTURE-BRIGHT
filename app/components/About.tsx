import { CheckCircle } from "lucide-react";

const values = ["Discipline", "Integrity", "Professionalism", "Safety", "Excellence"];

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
          </div>
        </div>
      </div>
    </section>
  );
}
