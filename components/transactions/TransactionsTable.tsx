import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import AddTransaction from "./AddTransaction";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import Link from "next/link";

const TransactionsTable = () => {
  const { data: transactions } = useTransactionsQuery();

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div className="flex items-center justify-between mb-2 font-inter">
        <h1 className="text-xl">Recent transactions</h1>
        <div className="flex space-x-2">
          <div>
            <AddTransaction />
          </div>
          <Link href="transactions">
            <button className="p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out">
              See all
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <div className="px-3 py-2 w-full font-roboto">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Account</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions &&
                  transactions.map((transaction: TransactionModel) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.account.name}
                      </TableCell>
                      <TableCell>{transaction.name}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {transaction.category.name}
                        {transaction.category.emoji}
                      </TableCell>
                      <TableCell className="text-right">
                        ${transaction.amount}
                      </TableCell>
                      <TableCell className="text-right">
                        {format(
                          new Date(transaction.transactionDate),
                          "dd MMMM yyyy, HH:mm:ss",
                          { locale: enGB }
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
  );
};

export default TransactionsTable;
