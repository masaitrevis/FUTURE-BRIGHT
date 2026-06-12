import { ExternalLink, Home, GraduationCap, Plane } from "lucide-react";
import Link from "next/link";

const subsidiaries = [
  {
    name: "Bright Elite Tours & Travels",
    tagline: "Premium Executive Transport & Mobility",
    description:
      "Executive chauffeur services, corporate driver outsourcing, elite driver training, and curated travel experiences across Kenya and East Africa.",
    image: "/images/logo-main.jpg",
    hasWebsite: true,
    website: "https://brightelite.vercel.app",
    icon: Plane,
  },
  {
    name: "Bright Homes",
    tagline: "Unleash Your Wanderlust",
    description:
      "Premium property management, vacation rentals, and real estate solutions. Curated stays for the discerning traveler and homeowner.",
    image: "/images/bright-homes-room.jpg",
    hasWebsite: false,
    website: "#",
    icon: Home,
  },
  {
    name: "Bright Academy",
    tagline: "Securing Future",
    description:
      "Elite training and leadership development programs. Building the next generation of certified professionals through rigorous, world-class education.",
    image: "/images/logo-bright-academy.jpg",
    hasWebsite: false,
    website: "#",
    icon: GraduationCap,
  },
];

export default function Subsidiaries() {
  return (
    <section id="subsidiaries" className="py-20 md:py-28 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
            Our Ecosystem
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Subsidiaries
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mt-4">
            Future Bright Ventures operates a diverse portfolio of companies delivering excellence across mobility, property, and education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subsidiaries.map((sub) => (
            <div
              key={sub.name}
              className="bg-navy-950/60 border border-white/5 rounded-lg overflow-hidden hover:border-gold-400/20 transition-all duration-300 flex flex-col"
            >
              <div className="h-56 overflow-hidden bg-navy-900 flex items-center justify-center p-6">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <sub.icon size={18} className="text-gold-400" />
                  <p className="text-xs text-gold-400 uppercase tracking-wider font-semibold">
                    {sub.tagline}
                  </p>
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {sub.name}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6 flex-grow">
                  {sub.description}
                </p>
                {sub.hasWebsite ? (
                  <Link
                    href={sub.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    Visit Website
                    <ExternalLink size={14} />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/30">
                    Website Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
