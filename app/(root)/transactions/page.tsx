"use client";

import React from "react";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import TransactionTable from "@/components/transactions/TransactionTable";
import FilterTransactions from "@/components/transactions/FilterTransactions";
import SortTransactions from "@/components/transactions/SortTransactions";

import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { useAuthGuard } from "@/lib/auth/useAuth";
import Loading from "@/app/_components/Loading";

const Transactions = () => {
  const { data: transactions = [] } = useTransactionsQuery();

  const { user } = useAuthGuard({ middleware: "auth" });

  if (!user) {
    return <Loading />;
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, "transactions.xlsx");
  };

  return (
    <div className="max-w-9xl mx-auto h-screen flex flex-col">
      <div className="grid grid-cols-3 grid-rows-1 mt-24">
        <div className="col-span-2 border border-green-400 rounded-xl bg-white">
          <div className="p-10 h-full">
            <div className="mb-3 flex justify-between">
              <h1 className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal">
                All transactions
              </h1>
              <div className="flex gap-2">
                <FilterTransactions />
                <SortTransactions />
              </div>
            </div>
            <div className="flex flex-col justify-between pb-14 h-full">
              <div className="overflow-y-auto font-roboto rounded-sm border border-gray-200">
                <TransactionTable transactions={transactions} />{" "}
              </div>
              <Button
                className="w-1/5 bg-dark-teal-green"
                onClick={() => exportToExcel()}
              >
                Export
              </Button>
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
