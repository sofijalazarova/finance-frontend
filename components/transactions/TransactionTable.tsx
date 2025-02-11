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

type TransactionTableProps = {
  transactions: TransactionModel[];
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Account</TableHead>
            <TableHead className="min-w-[100px]">Name</TableHead>
            <TableHead className="min-w-[150px]">Description</TableHead>
            <TableHead className="w-[180px]">Category</TableHead>
            <TableHead className="w-[120px] text-right">Amount</TableHead>
            <TableHead className="w-[250px] text-right whitespace-nowrap">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.account.name}</TableCell>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {transaction.category.emoji}
                {transaction.category.name}
              </TableCell>
              <TableCell className="text-right">
                ${transaction.amount}
              </TableCell>
              <TableCell className="text-right">
                {format(
                  new Date(transaction.transactionDate),
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
  );
};

export default TransactionTable;
