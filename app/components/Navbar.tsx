"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/driver-training", label: "Driver Training" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo-main.jpg"
              alt="Future Bright Ventures"
              className="h-10 w-auto rounded"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl font-semibold text-white tracking-tight leading-tight">
                Future Bright
              </span>
              <span className="hidden sm:inline font-display text-xs text-gold-400 tracking-wide leading-tight">
                Ventures Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/80 hover:text-gold-400 transition-colors uppercase tracking-wider"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <a
                href="tel:+254700460814"
                className="inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold px-4 py-2 rounded transition-colors border border-white/10"
              >
                <Phone size={14} />
                Book Now
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-navy-900 border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-white/80 hover:text-gold-400 transition-colors py-2 uppercase tracking-wider"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <a
                href="tel:+254700460814"
                className="inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold py-2 rounded transition-colors border border-white/10"
              >
                <Phone size={14} />
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
