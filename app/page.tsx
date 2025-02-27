import Hero from "./_components/Hero";

import Highlights from "./_components/Highlights";
import Header from "@/components/ layout/Header";
import Contact from "./_components/Contact";

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
