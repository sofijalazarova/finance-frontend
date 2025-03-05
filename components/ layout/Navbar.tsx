"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/public/logo.png";
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

const Navbar = () => {
  const [greeting, setGreeting] = useState("");
  const currentPath = usePathname();
  const { user } = useAuthGuard({});

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
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-1">
        <div className="flex items-center justify-start w-full space-x-52">
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
            <p className="lg:text-3xl font-light text-dark-slate pl-3">
              {greeting}, {user.firstName}
            </p>
          </div>

          <div className="flex items-center space-x-12 ">
            {navLinks.map((link) => (
              <Link
                className={`${
                  currentPath === link.href
                    ? "text-emerald-green font-bold"
                    : "text-gray-600"
                }`}
                key={link.name}
                href={link.href}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
