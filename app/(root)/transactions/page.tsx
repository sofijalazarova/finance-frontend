"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";

const Transactions = () => {
  const { data: transactions } = useTransactionsQuery();

  console.log(transactions);

  return (
    <div className="max-w-9xl mx-auto h-screen flex flex-col">
      <div className="grid grid-cols-3 grid-rows-1 mt-24">
        <div className="col-span-2 border border-green-400 rounded-xl bg-white">
          <div className="p-10">
            <div className="mb-3">
              <h1 className="text-xl font-inter">All transactions</h1>
            </div>
            <div className="overflow-y-auto font-roboto rounded-sm border border-gray-200">
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
                          {transaction.transactionDate}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="col-span-1 ml-4 border border-green-400 rounded-xl bg-white">
          <AddTransactionForm />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
