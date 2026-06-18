"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-xl text-white font-semibold">
              Bright Elite <span className="text-gold-400">Tours & Travels</span>
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Premium executive transport and elite driver training. Delivering excellence across Kenya and East Africa.
            </p>
            <p className="text-xs text-gold-400 font-medium tracking-wider uppercase">
              Driven by Excellence
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/60 hover:text-gold-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Executive Chauffeur Services",
                "Corporate Driver Outsourcing",
                "Elite Driver Training",
                "Airport Transfers",
                "Tours & Road Expeditions",
              ].map((s) => (
                <li key={s} className="text-sm text-white/60">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <Phone size={16} className="text-gold-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
              <a href="tel:+254720938031" className="block hover:text-gold-400 transition-colors">+254 720 938031</a>
                  <a href="tel:+254700460814" className="block hover:text-gold-400 transition-colors">+254 700 460814</a>
                  <a href="tel:+254723755752" className="block hover:text-gold-400 transition-colors">+254 723 755752</a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={16} className="text-gold-400 shrink-0" />
                <a href="mailto:bmasai@fbrightventures.com" className="hover:text-gold-400 transition-colors">bmasai@fbrightventures.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} className="text-gold-400 shrink-0" />
                Future Bright Centre, Embakasi, P.O.BOX 121313, GPO-00100
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com/fbright.ventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://tiktok.com/@FUTUREBRIGHTVENTURES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold-400 transition-colors"
                  aria-label="TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5A2.89 2.89 0 016.39 15a2.89 2.89 0 012.89-2.89c.3 0 .6.05.88.13v-3.5a6.35 6.35 0 00-.88-.06A6.39 6.39 0 002.89 15a6.39 6.39 0 006.39 6.39 6.39 6.39 0 006.39-6.39V8.17a8.18 8.18 0 004.77 1.53V6.39a4.81 4.81 0 01-1.84-.7z"/></svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-gold-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Bright Elite Tours & Travels. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            A subsidiary of Future Bright Ventures Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
