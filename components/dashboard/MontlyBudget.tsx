import { fetchBudget } from "@/lib/api/data-service";
import { useQuery } from "@tanstack/react-query";

import { format, startOfMonth, endOfMonth } from "date-fns";
import React from "react";
import AddBudget from "./AddBudget";

const MontlyBudget = () => {
  const { data: budget } = useQuery({
    queryKey: ["budget"],
    queryFn: fetchBudget,
  });

  const today = new Date();
  const startDate = format(startOfMonth(today), "MMM dd, yyyy");
  const endDate = format(endOfMonth(today), "MMM dd, yyyy");

  return (
    <div className="relative border bg-white border-vibrant-mint-green col-span-2 row-span-2 rounded-3xl flex flex-col md:flex-row justify-between items-start px-8 py-6 shadow-lg">
      <AddBudget />

      <div className="flex flex-col font-roboto justify-evenly space-y-4 items-start pt-5 w-full">
        <h1 className="text-2xl font-semibold text-dark-slate">
          Monthly budget
        </h1>
        <h2 className="text-sm text-gray-500">
          {startDate} - {endDate}
        </h2>
        <p className="text-5xl font-bold font-inter text-green-900">
          ${budget?.totalBudget.toFixed(2)}
        </p>
        <p className="text-emerald-green text-sm">
          <span className="font-bold">+9,5%</span> compared to last month
        </p>
      </div>
    </div>
  );
};

export default MontlyBudget;
