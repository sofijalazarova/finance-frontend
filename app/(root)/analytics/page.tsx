"use client";

import BudgetComparisonChart from "@/app/_components/BudgetComparisonChart";
import BudgetDonutChart from "@/app/_components/BudgetDonutChart";
import CategorySpendingBarChart from "@/app/_components/CategorySpendingBarChart";
import SpendingTrendChart from "@/app/_components/SpendingTrendChart";
import TopSpendingCategoriesChart from "@/app/_components/TopSpendingCategoriesChart";

const Analytics = () => {
  return (
    <>
      <div className="max-w-9xl h-screen mx-auto flex flex-col">
        <div className="grid grid-cols-7 grid-rows-6 h-full gap-4 mt-20 mb-10">
          <div className="col-span-2 row-span-3 w-full rounded-2xl flex flex-col justify-center p-4  border border-vibrant-mint-green shadow-lg">
            <BudgetDonutChart />
          </div>
          <div className="border p-2 bg-white border-vibrant-mint-green col-span-3 row-span-3 rounded-3xl flex justify-center">
            <SpendingTrendChart />
          </div>
          <div className=" border bg-white border-vibrant-mint-green col-span-2 row-span-3 rounded-3xl flex flex-col md:flex-row  items-center px-8 justify-center  shadow-lg">
            <TopSpendingCategoriesChart />
          </div>
          <div className="border p-2 md:px-10 bg-white border-vibrant-mint-green row-span-3  col-span-5 rounded-3xl flex justify-center items-center">
            <BudgetComparisonChart />
          </div>
          <CategorySpendingBarChart />
        </div>
      </div>
    </>
  );
};

export default Analytics;
