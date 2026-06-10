import { Phone, Mail, MapPin, Instagram, Youtube, Facebook, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-navy-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
            alt="Contact us"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 to-navy-900" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-400 text-sm uppercase tracking-[0.25em] font-semibold mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Ready to book executive transport, outsource corporate drivers, or enroll in our elite training program? We are available 24/7.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-20 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-14">
            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Phone size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">Phone</h3>
              <div className="space-y-1">
                <a href="tel:+254700460814" className="block text-sm text-white/70 hover:text-gold-400 transition-colors">+254 700 460814</a>
                <a href="tel:+254720938031" className="block text-sm text-white/70 hover:text-gold-400 transition-colors">+254 720 938031</a>
                <a href="tel:+254723755752" className="block text-sm text-white/70 hover:text-gold-400 transition-colors">+254 723 755752</a>
              </div>
            </div>

            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Mail size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">Email</h3>
              <a href="mailto:info@fbrightventures.co.ke" className="text-sm text-white/70 hover:text-gold-400 transition-colors">info@fbrightventures.co.ke</a>
            </div>

            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">Location</h3>
              <p className="text-sm text-white/70">Nairobi, Kenya</p>
              <p className="text-sm text-white/70">East Africa</p>
            </div>

            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <Send size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">Social</h3>
              <div className="flex items-center justify-center gap-3">
                <a href="https://instagram.com/fbright.ventures" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-400 transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com/@futurebrightventures" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-400 transition-colors" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-400 transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-10">
            <h2 className="font-display text-2xl font-bold text-white text-center mb-2">Send a Message</h2>
            <p className="text-sm text-white/50 text-center mb-8">We will get back to you within 24 hours.</p>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Name</label>
                  <input type="text" placeholder="Your name" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Phone</label>
                  <input type="tel" placeholder="+254 7XX XXX XXX" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Email</label>
                <input type="email" placeholder="you@company.com" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Interest</label>
                <select className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors">
                  <option>Executive Chauffeur Services</option>
                  <option>Corporate Driver Outsourcing</option>
                  <option>Elite Driver Training</option>
                  <option>Airport Transfers</option>
                  <option>Tours & Travel</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Message</label>
                <textarea rows={4} placeholder="How can we help you?" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors resize-none"></textarea>
              </div>
              <button type="button" className="w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold py-3 rounded transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
