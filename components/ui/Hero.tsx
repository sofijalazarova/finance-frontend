import Image from "next/image";
import React from "react";
import Dashboard from "@/public/dashboard.png";
import HomePage from "@/public/Homepage.png";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto items-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center mt-20 justify-center space-x-6">
            <h1 className="text-6xl font-normal  text-right font-poppins leading-relaxed">
              YOUR PATH TO
              <br /> FINANCIAL FREEDOM <br /> STARTS HERE
            </h1>
            <Image
              src={HomePage}
              alt="dashboard"
              className="w-[400px] h-[300px]"
            />
          </div>
          <div className="flex justify-end gap-10">
            <div>
              <p className="text-2xl mt-5">
                Manage your personal finances with ease – track expenses, set
                <br />
                budgets, and get clear visual analyses of your financial
                situation.
              </p>
              <hr />
              <button className="mt-8 p-4 px-8 text-lg font-bold rounded-lg bg-bright-yellow text-gray-800 shadow-md hover:bg-yellow-500 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
                GET
                <br /> STARTED
              </button>
            </div>
            <div className="-mt-24">
              <Image
                src={Dashboard}
                alt="dashboard"
                className="w-[400px] h-[300px] border border-dark-emerald-green"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
