"use client";

import Loading from "@/app/_components/Loading";
import CategorySpendingBarChart from "@/components/analytics/CategorySpendingBarChart";
import Balance from "@/components/dashboard/Balance";
import MontlyBudget from "@/components/dashboard/MontlyBudget";
import TableDashboard from "@/components/dashboard/TableDashboard";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { useAuthGuard } from "@/lib/auth/useAuth";

import React from "react";

const Dashboard = () => {
  const { user } = useAuthGuard({ middleware: "auth" });

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <div className="max-w-9xl h-screen mx-auto flex flex-col">
        <div className="grid grid-cols-7 grid-rows-6 h-full gap-4 mt-20 mb-10">
          <Balance />
          <div className="border p-2 bg-white border-vibrant-mint-green col-span-5 row-span-4 rounded-3xl flex justify-center">
            <TableDashboard />
          </div>
          <MontlyBudget />
          <CategorySpendingBarChart />
          <div className="border p-2 md:px-10 bg-white border-vibrant-mint-green row-span-2  col-span-5 rounded-3xl flex justify-center">
            <TransactionsTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
