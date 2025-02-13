import { useAccountsQuery } from "@/lib/queries/useAccountsQuery";
import React from "react";

type Account = {
  id: number;
  balance: number;
};

const Balance = () => {
  const { isLoading, data: accounts } = useAccountsQuery();

  const totalBalance = accounts?.reduce(
    (acc: number, account: Account) => acc + account.balance,
    0
  );

  const formatBalance = totalBalance?.toFixed(2);

  return (
    <div className="col-span-2 w-full rounded-2xl flex flex-col justify-center items-start p-6 bg-pale-mint border border-vibrant-mint-green shadow-lg">
      <h1 className="font-roboto text-base md:text-lg font-medium text-gray-600">
        My balance
      </h1>
      <p className="text-4xl md:text-5xl font-bold text-dark-slate leading-tight">
        {isLoading ? "Loading" : `$${formatBalance}`}
      </p>
    </div>
  );
};

export default Balance;
