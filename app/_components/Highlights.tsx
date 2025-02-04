import React from "react";
import { FaDollarSign } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";
import { GoGoal } from "react-icons/go";

const Highlights = () => {
  return (
    <section className="container mx-auto mt-28 px-32">
      <h1 className="text-3xl">Why Budget Mate?</h1>
      <div className="flex justify-between space-x-10 mt-10">
        <div className="w-1/4 h-80 border border-t-8 flex items-center border-dark-teal-green rounded-xl bg-pale-sage">
          <div className="mx-auto text-center flex flex-col items-center">
            <FaDollarSign size={70} />
            <h1 className="font-semibold text-xl mt-2">
              Effortless
              <br /> Expense
              <br /> Tracking
            </h1>
          </div>
        </div>
        <div className="w-1/4 h-80 border border-t-8 flex items-center border-dark-teal-green rounded-xl bg-pale-sage">
          <div className="mx-auto text-center">
            <MdOutlineBarChart size={70} />
            <h1 className="font-semibold text-xl mt-2">
              Clear
              <br /> Financial
              <br /> Insights
            </h1>
          </div>
        </div>
        <div className="w-1/4 h-80 border border-t-8 flex items-center border-dark-teal-green rounded-xl bg-pale-sage">
          <div className="mx-auto text-center">
            <GoGoal size={70} />
            <h1 className="font-semibold text-xl mt-2">
              Achieve
              <br /> your
              <br /> goals
            </h1>
          </div>
        </div>
        <div className="w-1/4 h-80 border border-t-8 flex items-center border-dark-teal-green rounded-xl bg-pale-sage">
          <div className="mx-auto text-center">
            <h1 className="font-semibold text-xl mt-2">
              Effortless
              <br /> Expense
              <br /> Tracking
            </h1>
          </div>
        </div>
      </div>
      <div className="border border-dark-emerald-green mt-5"></div>
    </section>
  );
};

export default Highlights;
