import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Team from "./components/Team";
import CTA from "./components/CTA";
import ContactSection from "./components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Team />
      <CTA />
      <ContactSection />
    </>
  );
}
