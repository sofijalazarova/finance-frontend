import React from "react";

import { FaUserCheck } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";

const GetStarted = () => {
  return (
    <section className="container mx-auto my-36 px-20">
      <h1 className="text-3xl">Get started with BudgetMate</h1>
      <div className="flex mt-10 space-x-10 items-center justify-center">
        <div className="w-1/4 border border-dark-emerald-green h-96 flex items-center">
          <div className="mx-auto text-left pl-10 pb-5">
            <FaUserCheck size={70} />
            <div className="pr-6">
              <h1 className="font-semibold text-xl mt-2">
                Create an Account in Seconds
              </h1>
              <p>
                Sign up today and start managing your money—completely free,
                with no hidden costs!
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/4 border border-dark-emerald-green h-96 flex items-center">
          <div className="mx-auto text-left pl-10 pb-5">
            <FaCheckSquare size={70} />
            <div className="pr-6">
              <h1 className="font-semibold text-xl mt-2">
                Plan and Track
                <br /> Effortlessly
              </h1>
              <p>
                Set savings goals, categorize your spending, and get real-time
                insights into your financial health.
              </p>
            </div>
          </div>
        </div>
        <div className="w-2/4 border rounded-tr-full border-dark-emerald-green h-96 flex items-center bg-soft-grey">
          <div className="mx-auto text-left pl-10 pb-5 pr-6 pt-16">
            <FaTrophy size={70} />
            <div className="pr-6">
              <h1 className="font-semibold text-xl mt-2">
                Achieve your goal
                <br /> with confidence
              </h1>
              <p>
                From reducing debt to building savings, you&apos;ll feel in
                control, focused, and ready for the future.
              </p>
            </div>
            <button
              aria-label="Start building your budget"
              className="mt-8 p-4 px-8 text-lg font-bold rounded-lg bg-bright-yellow text-gray-800 shadow-md hover:bg-yellow-500 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
            >
              LET&apos;S BUILD YOUR BUDGET
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
