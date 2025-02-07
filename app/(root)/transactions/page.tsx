import React from "react";
import CustomTable from "@/app/_components/CustomTable";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";

const Transactions = () => {
  return (
    <div className="max-w-9xl mx-auto h-screen flex flex-col">
      <div className="grid grid-cols-3 grid-rows-1 mt-24">
        <div className="col-span-2 border border-green-400 rounded-xl bg-white">
          <div className="p-10">
            <div className="mb-3">
              <h1 className="text-xl font-inter">Recent transactions</h1>
            </div>
            <div className="overflow-y-auto font-roboto rounded-sm border border-gray-200">
              <CustomTable />
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
