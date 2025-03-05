import React from "react";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import Link from "next/link";
import TransactionTable from "@/components/transactions/TransactionsTable";
import ReusableModal from "../ui/ReusableModal";
import AddTransactionForm from "./AddTransactionForm";

const RecentTransactions = () => {
  const { data: transactions = [] } = useTransactionsQuery();

  const recentTransactions = transactions
    ?.toSorted(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime()
    )
    .slice(0, 3);

  return (
    <div className="flex flex-col pt-3 h-full w-full">
      <div className="flex items-center justify-between mb-2 font-inter">
        <h1 className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal">
          Recent transactions
        </h1>
        <div className="flex space-x-2">
          <div>
            <ReusableModal
              title="Add Transaction"
              triggerText="Add new transaction"
              buttonClass="p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out"
            >
              <AddTransactionForm />
            </ReusableModal>
          </div>
          <Link href="transactions">
            <button className="p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out">
              See all
            </button>
          </Link>
        </div>
      </div>

      {!transactions?.length ? (
        <div>No transactions added yet!</div>
      ) : (
        <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <div className="px-3 py-2 w-full font-roboto">
            <TransactionTable transactions={recentTransactions ?? []} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
