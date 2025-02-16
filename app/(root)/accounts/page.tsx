"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAccountsQuery } from "@/lib/queries/useAccountsQuery";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

const Accounts = () => {
  const { data: accounts } = useAccountsQuery();

  return (
    <div className="max-w-9xl mx-auto h-screen flex flex-col">
      <div className="mt-24">
        <div className=" border border-green-400 rounded-xl bg-white">
          <div className="p-10">
            <div className="mb-3">
              <h1 className="focus:outline-none font-roboto text-slate-gray text-base sm:text-lg md:text-lg lg:text-xl font-normal leading-normal">
                All accounts
              </h1>
            </div>
            <div className="overflow-y-auto font-roboto rounded-sm border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[100px]">Name</TableHead>
                    <TableHead className="min-w-[150px]">Balance</TableHead>
                    <TableHead className="w-[180px]">Type</TableHead>
                    <TableHead className="w-[250px] text-right whitespace-nowrap">
                      Created At
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {accounts?.map((account: AccountModel) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>${account.balance}</TableCell>
                      <TableCell>{account.type}</TableCell>

                      <TableCell className="text-right">
                        {format(
                          new Date(account.createdAt),
                          "dd MMMM yyyy, HH:mm:ss",
                          {
                            locale: enGB,
                          }
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
