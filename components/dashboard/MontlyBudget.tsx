import { fetchBudget, getPercentage } from "@/lib/api/data-service";
import { useQuery } from "@tanstack/react-query";

import { format, startOfMonth, endOfMonth } from "date-fns";
import React from "react";
import AddBudget from "./AddBudget";

const MontlyBudget = () => {
  const { data: budget } = useQuery({
    queryKey: ["budget"],
    queryFn: fetchBudget,
  });

  const { data: percentage } = useQuery({
    queryKey: ["budgetPercentage"],
    queryFn: getPercentage,
  });

  const today = new Date();
  const startDate = format(startOfMonth(today), "MMM dd, yyyy");
  const endDate = format(endOfMonth(today), "MMM dd, yyyy");

  return (
    <div className="relative border bg-white border-vibrant-mint-green col-span-2 row-span-2 rounded-3xl flex flex-col md:flex-row justify-between items-start px-8 py-6 shadow-lg">
      <AddBudget totalBudget={budget?.totalBudget} />

      <div className="flex flex-col font-roboto justify-evenly space-y-4 items-start pt-5 w-full">
        <h1 className="text-2xl font-semibold text-dark-slate">
          Monthly budget
        </h1>
        <h2 className="text-sm text-gray-500">
          {startDate} - {endDate}
        </h2>

        <div>
          <div className="flex gap-2">
            <p
              className={`text-5xl font-bold font-inter ${
                budget?.totalBudget < 0 ? "text-red-600" : "text-green-900"
              }`}
            >
              ${budget?.totalBudget.toFixed(2)}
            </p>

            {budget?.totalBudget < 0 && (
              <p className="text-red-600 font-bold text-sm">
                You assigned more than you have! Please un-assign money from
                some of the categories!
              </p>
            )}
          </div>
          <p className="text-emerald-green text-sm mt-4">
            <span className="font-bold">
              {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
            </span>{" "}
            compared to last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default MontlyBudget;
