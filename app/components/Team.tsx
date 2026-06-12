import { Linkedin } from "lucide-react";

const team = [
  {
    name: "Benjamin Masai",
    role: "CEO & Co-Founder",
    org: "Future Bright Ventures",
    image: "/images/benjamin-masai.jpg",
  },
  {
    name: "Miriam Njeri",
    role: "Finance Director & Co-Founder",
    org: "Future Bright Ventures",
    image: "/images/miriam-njeri.jpg",
  },
  {
    name: "Michael Kiptoo",
    role: "Head of Business Operations",
    org: "Bright Elite Tours & Travels",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export default function Team() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
            Our Team
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Leadership
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((t) => (
            <div
              key={t.name}
              className="bg-navy-900/60 border border-white/5 rounded-lg overflow-hidden text-center group"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-white">
                  {t.name}
                </h3>
                <p className="text-sm text-gold-400 mt-1">{t.role}</p>
                <p className="text-xs text-white/50 mt-1">{t.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
