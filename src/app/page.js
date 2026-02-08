import Hero from "./components/2-Hero/Hero";
import Projects from "./components/6-Projects/Projects";
import Services from "./components/3-Services/Services";
import About from "./components/4-About/About";
import Testimonials from "./components/7-Testimonials/Testimonials";
import Journey from "./components/8-Journey/Journey";
import Contact from "./components/5-Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Services />
      <About />
      <Journey />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
