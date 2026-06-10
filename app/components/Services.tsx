import { Shield, Users, GraduationCap, Plane, Compass } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Executive & VVIP Chauffeur Services",
    description:
      "Premium chauffeur-driven mobility for diplomats, executives, and high-profile clients. Discreet, punctual, and impeccably professional.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
  },
  {
    icon: Users,
    title: "Corporate Driver Outsourcing",
    description:
      "Supply trained, certified, and vetted professional drivers to organizations on short-term or long-term contracts.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80",
  },
  {
    icon: GraduationCap,
    title: "Elite Driver Training & Certification",
    description:
      "Our 5-day intensive program produces certified drivers across three tiers: ECCD, EECC, and ETMS. Defensive driving, VIP protocol, and more.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80",
  },
  {
    icon: Plane,
    title: "Executive Mobility & Airport Transfers",
    description:
      "Seamless airport pickups and executive point-to-point transfers with real-time coordination and luxury fleet standards.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
  },
  {
    icon: Compass,
    title: "Tours, Travel & Road Expeditions",
    description:
      "Custom-curated travel experiences across Kenya and East Africa. From wildlife safaris to corporate retreats.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
            What We Offer
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Our Core Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group bg-navy-900/60 border border-white/5 rounded-lg overflow-hidden hover:border-gold-400/30 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-gold-500/10 flex items-center justify-center">
                    <s.icon size={20} className="text-gold-400" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white leading-snug">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
