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
  title: "Bright Elite Tours & Travels | Premium Executive Transport & Driver Training",
  description:
    "Bright Elite Tours and Travels - Premium executive chauffeur services, corporate driver outsourcing, and elite driver training across Kenya and East Africa.",
  keywords: [
    "Bright Elite Tours",
    "executive transport",
    "corporate driver outsourcing",
    "driver training",
    "chauffeur services",
    "Nairobi",
    "Kenya",
  ],
  authors: [{ name: "Bright Elite Tours & Travels" }],
  openGraph: {
    title: "Bright Elite Tours & Travels",
    description: "Premium Executive Transport & Driver Training",
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
