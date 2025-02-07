"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdAccountBalance } from "react-icons/md";
import AddAccount from "../../app/_components/AddAccount";
import { useAuthGuard } from "@/lib/auth/useAuth";

const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Transactions",
    href: "/transactions",
  },
  {
    name: "Analytics",
    href: "/analytics",
  },
  {
    name: "Saving Goals",
    href: "/savings",
  },
];

export default function Sidebar() {
  const [greeting, setGreeting] = useState("");
  const { user, logout } = useAuthGuard({});

  useEffect(() => {
    const getGreetingMessage = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "Good morning";
      else if (hour >= 12 && hour < 18) return "Good afternoon";
      else return "Good evening";
    };

    setGreeting(getGreetingMessage());
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-start w-full space-x-48">
            <Link href="/">
              <Image
                src={Logo}
                alt="logo"
                width={100}
                height={100}
                className=" ml-16"
              />
            </Link>

            <div className="flex items-center space-x-4">
              <p className="lg:text-3xl font-light text-dark-slate">
                {greeting}, {user.firstName}
              </p>
            </div>

            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-dark-teal-green border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 flex flex-col justify-between overflow-y-auto bg-dark-teal-green dark:bg-gray-800">
          <div>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-black transition-all duration-100 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdAccountBalance size={20} />
                  <span className="ms-3">Accounts</span>
                </a>
              </li>

              <li>
                <AddAccount />
              </li>
            </ul>
          </div>
          <div className="">
            <button onClick={logout}>
              <RiLogoutBoxFill size={40} className="text-white" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
