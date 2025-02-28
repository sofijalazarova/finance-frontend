import Hero from "../components/ui/Hero";

import Highlights from "../components/ui/Highlights";
import Header from "@/components/ layout/Header";
import Contact from "../components/ui/Contact";

export default function Home() {
  return (
    <>
      <div className="relative z-0">
        <div>
          <Header />
          <section id="hero">
            <Hero />
          </section>
        </div>

        <section id="features">
          <Highlights />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </>
  );
}
