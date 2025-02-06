import Hero from "./_components/Hero";
import Navbar from "../components/ layout/Navbar";

import Highlights from "./_components/Highlights";
import GetStarted from "./_components/GetStarted";

export default function Home() {
  return (
    <>
      <div className="relative z-0">
        <Navbar />
        <Hero />
        <Highlights />
        <GetStarted />
      </div>
    </>
  );
}
