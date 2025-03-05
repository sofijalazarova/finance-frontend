"use client";

import React from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdAccountBalance } from "react-icons/md";
import Navbar from "./Navbar";
import Link from "next/link";
import { useAccountsQuery } from "@/lib/queries/useAccountsQuery";
import { useAuthGuard } from "@/lib/auth/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import ReusableModal from "../ui/ReusableModal";
import CreateAccountForm from "../accounts/CreateAccountForm";

export default function Sidebar() {
  const { logout } = useAuthGuard({});
  const queryClient = useQueryClient();
  const { data: accounts } = useAccountsQuery();

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
  };

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
                        <p>${Number(account.balance).toFixed(2)}</p>
                      </div>
                    );
                  })}
              </li>

              <li>
                <ReusableModal
                  title="Add account"
                  triggerText="Add Account"
                  buttonClass="p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 w-full hover:bg-gray-200 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out"
                >
                  <CreateAccountForm />
                </ReusableModal>
              </li>
            </ul>
          </div>
          <div className="text-right">
            <button onClick={handleLogout} title="Logout">
              <RiLogoutBoxFill size={40} className="text-white" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
