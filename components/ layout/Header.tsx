"use client"

import { useAuthGuard } from "@/lib/auth/useAuth";
import Link from "next/link";
import Loading from "../../app/_components/Loading";

const Header = () => {

  const {user} = useAuthGuard({middleware: "auth"});

  if(!user) return <Loading/>

  return (
    <header className="w-full flex items-center fixed top-0 z-20 ">
      <div className="flex items-center  justify-between w-full px-8 pt-4  max-w-9xl mx-auto">
        <div>
          <p className="text-3xl font-light text-dark-slate">
            Good morning, {user.firstName}
          </p>
        </div>
        <nav className="flex items-center space-x-6">
          <Link
            href="dashboard"
            className="text-emerald-green font-bold hover:underline transition-all duration-200 ease-in-out active:text-green-900"
          >
            Dashboard
          </Link>
          <Link
            href="transactions"
            className="text-gray-600 hover:text-green-700 hover:underline transition-all duration-200 ease-in-out active:text-green-900"
          >
            Transactions
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-green-700 hover:underline transition-all duration-200 ease-in-out"
          >
            Analytics
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-green-700 hover:underline transition-all duration-200 ease-in-out"
          >
            Savings Goals
          </Link>
        </nav>

       
      </div>

      <div className="absolute bottom-0 left-[calc(100%-1280px)] right-[193px] h-[1px] bg-green-700"></div>
    </header>
  );
};

export default Header;
