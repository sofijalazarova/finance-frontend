"use client";

import React from "react";

import { RiLogoutBoxFill } from "react-icons/ri";
import { MdAccountBalance } from "react-icons/md";

import Navbar from "./Navbar";
import Link from "next/link";

import AddAccount from "../accounts/AddAccount";
import { useAccountsQuery } from "@/lib/queries/useAccountsQuery";
import { useAuthGuard } from "@/lib/auth/useAuth";

export default function Sidebar() {
  const { logout } = useAuthGuard({});

  const { data: accounts } = useAccountsQuery();

  return (
    <>
      <Navbar />
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-dark-teal-green border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 flex flex-col justify-between overflow-y-auto bg-dark-teal-green dark:bg-gray-800">
          <div>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="accounts"
                  className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-black transition-all duration-100 hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdAccountBalance size={20} />
                  <span className="ms-3">Accounts</span>
                </Link>
              </li>

              <li>
                {accounts &&
                  accounts.map((account: AccountModel) => {
                    return (
                      <div
                        key={account.id}
                        className="flex justify-between items-center text-white hover:bg-emerald-700 p-4 transition duration-150 rounded-lg"
                      >
                        <p>{account.name}</p>
                        <p>${account.balance}</p>
                      </div>
                    );
                  })}
              </li>

              <li>
                <AddAccount />
              </li>
            </ul>
          </div>
          <div className="text-right">
            <button onClick={logout}>
              <RiLogoutBoxFill size={40} className="text-white" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
