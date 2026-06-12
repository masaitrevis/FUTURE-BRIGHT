import Hero from "./components/Hero";
import Services from "./components/Services";
import Subsidiaries from "./components/Subsidiaries";
import About from "./components/About";
import Team from "./components/Team";
import CTA from "./components/CTA";
import ContactSection from "./components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Subsidiaries />
      <About />
      <Team />
      <CTA />
      <ContactSection />
    </>
  );
}
