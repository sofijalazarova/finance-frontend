import Hero from "./_components/Hero";

import Highlights from "./_components/Highlights";
import GetStarted from "./_components/GetStarted";
import Header from "@/components/ layout/Header";
import Contact from "./_components/Contact";

export default function Home() {
  return (
    <>
      <div className="relative z-0">
        <Header />
        <Hero />
        <Highlights />
        <Contact />
      </div>
    </>
  );
}
