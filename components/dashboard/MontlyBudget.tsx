import React from "react";


const MontlyBudget = () => {
  return (
    <div className="relative border bg-white border-vibrant-mint-green col-span-2 row-span-2 rounded-3xl flex flex-col md:flex-row justify-between items-start px-8 py-6 shadow-lg">
      <button className="absolute top-4 right-4 p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out">
        Manage budget
      </button>
      <div className="flex flex-col font-roboto justify-evenly space-y-4 items-start pt-5 w-full">
        <h1 className="text-2xl font-semibold text-dark-slate">
          Monthly budget
        </h1>
        <h2 className="text-sm text-gray-500">Jun 01 - Jun 30, 2024</h2>
        <p className="text-5xl font-bold font-inter text-green-900">$90,190</p>
        <p className="text-emerald-green text-sm">
          <span className="font-bold">+9,5%</span> compared to last month
        </p>
      </div>
    </div>
  );
};

export default MontlyBudget;
