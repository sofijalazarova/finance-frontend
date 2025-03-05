"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";

import { Link as ScrollLink } from "react-scroll";

const navLinks = [
  {
    id: "hero",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const Header = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full flex items-center fixed top-0 z-20 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between w-full px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image src={Logo} alt="logo" width={150} height={150} />
          </Link>
        </div>

        <nav className="flex items-center space-x-20 font-medium text-lg">
          {navLinks.map((nav) => (
            <ScrollLink
              key={nav.id}
              to={nav.id}
              smooth={true}
              duration={500}
              className={`${
                active === nav.title ? "text-black" : "text-green-700"
              } hover:text-black text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              {nav.title}
            </ScrollLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="sign-in">
            <button className="px-4 py-2 border border-dark-emerald-green text-dark-emerald-green rounded-xl hover:bg-bright-leaf-green   hover:text-white transition-all ease-in-out cursor-pointer">
              Sign in
            </button>
          </Link>
          <Link href="sign-up">
            <button className="px-4 py-2 bg-dark-emerald-green text-white rounded-xl hover:bg-bright-leaf-green transition-all duration-300 ease-in-out cursor-pointer">
              Sign up
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-[calc(100%-1350px)] right-[350px] h-[1px] bg-green-700"></div>
    </header>
  );
};

export default Header;
