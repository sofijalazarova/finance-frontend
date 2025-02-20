import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";

const Header = () => {
  return (
    <header className="w-full flex items-center fixed top-0 z-20">
      <div className="flex items-center justify-between w-full px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <Image src={Logo} alt="logo" width={150} height={150} />
          </Link>
        </div>

        <nav className="flex items-center space-x-20 font-medium text-lg">
          <Link href="/" className="text-green-700 font-bold hover:underline">
            Home
          </Link>
          <Link
            href="features"
            className="text-gray-600 hover:text-green-700 hover:underline"
          >
            Features
          </Link>
          <Link
            href="contact"
            className="text-gray-600 hover:text-green-700 hover:underline"
          >
            Contact
          </Link>
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
