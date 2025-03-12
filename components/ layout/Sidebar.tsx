"use client";

import React, { useState } from "react";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdAccountBalance } from "react-icons/md";
import Navbar from "./Navbar";
import Link from "next/link";
import { useAccountsQuery } from "@/lib/queries/useAccountsQuery";
import { useAuthGuard } from "@/lib/auth/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReusableModal from "../ui/ReusableModal";
import CreateAccountForm from "../accounts/CreateAccountForm";
import { editAccount } from "@/lib/api/data-service";

export default function Sidebar() {
  const { logout } = useAuthGuard({});
  const queryClient = useQueryClient();
  const { data: accounts } = useAccountsQuery();

  const { mutate } = useMutation({
    mutationFn: ({ accountId, data }: { accountId: number; data: any }) =>
      editAccount(accountId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });

  const [editingAccount, setEditingAccount] = useState<number | null>(null);
  const [editedValues, setEditedValues] = useState<{
    [key: string]: { name: string; balance: string };
  }>({});
  const [editingField, setEditingField] = useState<{
    accountId: number | null;
    field: "name" | "balance" | null;
  }>({
    accountId: null,
    field: null,
  });

  const handleEdit = (
    accountId: number,
    field: "name" | "balance",
    value: string
  ) => {
    setEditedValues((prev) => ({
      ...prev,
      [accountId]: {
        name:
          prev[accountId]?.name ??
          accounts?.find((a) => a.id === accountId)?.name ??
          "",
        balance:
          prev[accountId]?.balance ??
          accounts?.find((a) => a.id === accountId)?.balance ??
          "",
        [field]: value,
      },
    }));
  };

  const handleSave = (accountId: number) => {
    if (!editedValues[accountId]) return;
    const { name, balance } = editedValues[accountId];
    const data = {
      name,
      balance,
      type: accounts?.find((a) => a.id === accountId)?.type,
    };

    mutate({ accountId, data });

    setEditingAccount({ accountId: null, field: null });
  };

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
                    const isEditingName =
                      editingField.accountId === account.id &&
                      editingField.field === "name";
                    const isEditingBalance =
                      editingField.accountId === account.id &&
                      editingField.field === "balance";

                    return (
                      <div
                        key={account.id}
                        className="flex justify-between items-center text-white hover:bg-emerald-700 p-4 transition duration-150 rounded-lg"
                      >
                        {isEditingName ? (
                          <input
                            type="text"
                            value={
                              editedValues[account.id]?.name ?? account.name
                            }
                            onChange={(e) =>
                              handleEdit(account.id, "name", e.target.value)
                            }
                            onBlur={() => handleSave(account.id)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleSave(account.id)
                            }
                            className="bg-transparent w-1/2 border border-white focus:outline-none text-white"
                            autoFocus
                          />
                        ) : (
                          <p
                            onClick={() =>
                              setEditingField({
                                accountId: account.id,
                                field: "name",
                              })
                            }
                          >
                            {account.name}
                          </p>
                        )}

                        {isEditingBalance ? (
                          <input
                            type="text"
                            value={
                              editedValues[account.id]?.balance ??
                              account.balance
                            }
                            onChange={(e) =>
                              handleEdit(account.id, "balance", e.target.value)
                            }
                            onBlur={() => handleSave(account.id)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleSave(account.id)
                            }
                            className="bg-transparent text-right w-1/2 border border-white focus:outline-none text-white "
                            autoFocus
                          />
                        ) : (
                          <p
                            onClick={() =>
                              setEditingField({
                                accountId: account.id,
                                field: "balance",
                              })
                            }
                          >
                            ${Number(account.balance).toFixed(2)}
                          </p>
                        )}
                      </div>
                    );
                  })}
              </li>

              {/* <li>
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
              </li> */}

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
