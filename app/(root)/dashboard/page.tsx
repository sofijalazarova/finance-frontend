"use client";

import Balance from "@/app/_components/Balance";
import MontlyBudget from "@/app/_components/MontlyBudget";
import TableDashboard from "@/app/_components/TableDashboard";
import TransactionsTable from "@/app/_components/TransactionsTable";

import React from "react";

const Dashboard = () => {
 
  return (
    <>
      <div className="max-w-9xl h-screen mx-auto flex flex-col">
        <div className="grid grid-cols-7 grid-rows-6 h-full gap-4 mt-20 mb-10">
          <Balance />
          <div className="border p-2 bg-white border-vibrant-mint-green col-span-5 row-span-4 rounded-3xl flex justify-center">
            <TableDashboard />
          </div>
          <MontlyBudget />
          <div className="border bg-white border-vibrant-mint-green rounded-3xl row-span-3 col-span-2 flex justify-center">
            Chart
          </div>
          <div className="border p-2 md:px-10 bg-white border-vibrant-mint-green row-span-2  col-span-5 rounded-3xl flex justify-center">
            <TransactionsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
