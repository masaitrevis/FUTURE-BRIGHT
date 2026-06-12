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
  title: "Future Bright Ventures Ltd | Premium Mobility, Property & Education",
  description:
    "Future Bright Ventures Ltd - A holding company operating premium subsidiaries across mobility, property, education, and hospitality in Nairobi, Kenya and East Africa.",
  keywords: [
    "Future Bright Ventures",
    "Bright Elite Tours",
    "Bright Homes",
    "Bright Academy",
    "executive transport",
    "corporate driver outsourcing",
    "driver training",
    "property management",
    "Nairobi",
    "Kenya",
  ],
  authors: [{ name: "Future Bright Ventures Ltd" }],
  openGraph: {
    title: "Future Bright Ventures Ltd",
    description: "Premium Mobility, Property & Education Holdings",
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
