"use client";

import React from "react";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import TransactionTable from "@/components/transactions/TransactionTable";
import FilterTransactions from "@/app/_components/FilterTransactions";
import SortTransactions from "@/app/_components/SortTransactions";
import { useAuthGuard } from "@/lib/auth/useAuth";
import Loading from "@/app/_components/Loading";

const Transactions = () => {
  const { data: transactions = [] } = useTransactionsQuery();

  const { user } = useAuthGuard({ middleware: "auth" });

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="max-w-9xl mx-auto h-screen flex flex-col">
      <div className="grid grid-cols-3 grid-rows-1 mt-24">
        <div className="col-span-2 border border-green-400 rounded-xl bg-white">
          <div className="p-10">
            <div className="mb-3 flex justify-between">
              <h1 className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal">
                All transactions
              </h1>
              <div className="flex gap-2">
                <FilterTransactions />
                <SortTransactions />
              </div>
            </div>
            <div className="overflow-y-auto font-roboto rounded-sm border border-gray-200">
              <TransactionTable transactions={transactions} />{" "}
            </div>
          </div>
        </div>
        <div className="col-span-1 ml-4 border border-green-400 rounded-xl bg-white">
          <AddTransactionForm />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
