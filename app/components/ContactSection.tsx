import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
            Reach Us
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
              <Phone size={22} className="text-gold-400" />
            </div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Phone
            </h3>
            <div className="space-y-1">
              <a href="tel:+254700460814" className="block text-sm text-white/70 hover:text-gold-400 transition-colors">
                +254 700 460814
              </a>
              <a href="tel:+254720938031" className="block text-sm text-white/70 hover:text-gold-400 transition-colors">
                +254 720 938031
              </a>
              <a href="tel:+254723755752" className="block text-sm text-white/70 hover:text-gold-400 transition-colors">
                +254 723 755752
              </a>
            </div>
          </div>

          <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
              <Mail size={22} className="text-gold-400" />
            </div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Email
            </h3>
            <a href="mailto:info@fbrightventures.co.ke" className="text-sm text-white/70 hover:text-gold-400 transition-colors">
              info@fbrightventures.co.ke
            </a>
          </div>

          <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
              <MapPin size={22} className="text-gold-400" />
            </div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Location
            </h3>
            <p className="text-sm text-white/70">
              Nairobi, Kenya<br />East Africa
            </p>
          </div>

          <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
              <Clock size={22} className="text-gold-400" />
            </div>
            <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Availability
            </h3>
            <p className="text-sm text-white/70">
              24/7 Executive<br />Chauffeur Services
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
