"use client";

import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// TikTok icon component
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5A2.89 2.89 0 016.39 15a2.89 2.89 0 012.89-2.89c.3 0 .6.05.88.13v-3.5a6.35 6.35 0 00-.88-.06A6.39 6.39 0 002.89 15a6.39 6.39 0 006.39 6.39 6.39 6.39 0 006.39-6.39V8.17a8.18 8.18 0 004.77 1.53V6.39a4.81 4.81 0 01-1.84-.7z"/>
    </svg>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/5c530529-bf88-47f8-a24e-7abeec54d328", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

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
              <a href="mailto:bmasai@fbrightventures.com" className="text-sm text-white/70 hover:text-gold-400 transition-colors">bmasai@fbrightventures.com</a>
            </div>

            <div className="bg-navy-900/60 border border-white/5 rounded-lg p-6 md:p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                <MapPin size={22} className="text-gold-400" />
              </div>
              <h3 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-3">Location</h3>
              <p className="text-sm text-white/70">Future Bright Centre, Embakasi</p>
              <p className="text-sm text-white/70">P.O.BOX 121313, GPO-00100</p>
              <p className="text-sm text-white/70">Nairobi, Kenya</p>
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
                <a href="https://tiktok.com/@FUTUREBRIGHTVENTURES" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-gold-400 transition-colors" aria-label="TikTok">
                  <TikTokIcon size={20} />
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

            {status === "success" && (
              <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-green-400">Message Sent!</p>
                  <p className="text-xs text-green-300/70">Thank you for reaching out. We will be in touch soon.</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-400">Failed to send</p>
                  <p className="text-xs text-red-300/70">{errorMsg}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+254 7XX XXX XXX" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors" />
              </div>
              <div>
                <label htmlFor="interest" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Interest</label>
                <select id="interest" name="interest" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400/50 transition-colors">
                  <option>Executive Chauffeur Services</option>
                  <option>Corporate Driver Outsourcing</option>
                  <option>Airport Transfers</option>
                  <option>Tours & Travel</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Message</label>
                <textarea id="message" name="message" rows={4} required placeholder="How can we help you?" className="w-full bg-navy-950 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-colors resize-none"></textarea>
              </div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-navy-950 font-semibold py-3 rounded transition-colors inline-flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
