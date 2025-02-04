import React from "react";

const Balance = () => {
  return (
    <div className="col-span-2 w-full rounded-2xl flex flex-col justify-center items-start p-6 bg-pale-mint border border-vibrant-mint-green shadow-lg">
      <h1 className="font-roboto text-base md:text-lg font-medium text-gray-600">
        My balance
      </h1>
      <p className="text-4xl md:text-5xl font-bold text-dark-slate leading-tight">
        $100,173
      </p>
    </div>
  );
};

export default Balance;
