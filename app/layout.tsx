import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bright Elite Tours and Travels | Premium Executive Transport Nairobi",
  description:
    "Premium Professional Mobility & Executive Transport Solutions. Executive chauffeur services, corporate driver outsourcing, elite driver training, and airport transfers in Nairobi, Kenya.",
  keywords: [
    "chauffeur services",
    "executive transport",
    "corporate driver outsourcing",
    "driver training",
    "airport transfers",
    "Nairobi",
    "Kenya",
    "VIP transport",
    "fleet management",
  ],
  authors: [{ name: "Bright Elite Tours and Travels" }],
  openGraph: {
    title: "Bright Elite Tours and Travels",
    description: "Premium Professional Mobility & Executive Transport Solutions",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
