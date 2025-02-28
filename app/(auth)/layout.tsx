"use client";

import Image from "next/image";
import loginImage from "@/public/login.png";
import { useAuthGuard } from "@/lib/auth/useAuth";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex items-center min-h-screen w-full justify-center bg-gray-100 font-roboto">
      <div className="flex flex-col md:flex-row w-full max-w-7xl h-auto md:h-[800px]">
        <div className="w-full md:w-1/2 justify-center flex flex-col text-center p-4 md:p-32 bg-white border border-vibrant-mint-green rounded-l-xl">
          <Image
            src={loginImage}
            alt="login"
            width={300}
            height={300}
            className="object-contain mx-auto"
          />
          <div className="p-6 rounded drop-shadow-md">
            <span className="text-dark-emerald-green text-lg md:text-xl">
              Track your income, manage
              <br />
              expenses, and stay on top of your
              <br />
              budget effortlessly. Log in to take
              <br />
              control of your financial journey!
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center bg-pale-mint p-4  border border-r-vibrant-mint-green rounded-r-xl border-y-vibrant-mint-green">
          {children}
        </div>
      </div>
    </main>
  );
}
