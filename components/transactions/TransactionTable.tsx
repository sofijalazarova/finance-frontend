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
import Modal from "@/app/_components/Modal";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDelete from "@/app/_components/ConfirmDelete";
import { useDeleteTransaction } from "@/lib/queries/useDeleteTransaction";
import { useSearchParams } from "next/navigation";

type TransactionTableProps = {
  transactions: TransactionModel[];
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  const { deleteTransaction, isDeleting } = useDeleteTransaction();

  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");
  const sortParams = searchParams.get("sort");

  const newData = categoryParams
    ? transactions.filter((i) => i.category?.name === categoryParams)
    : transactions;

  const sortFunctions: Record<
    string,
    (a: TransactionModel, b: TransactionModel) => number
  > = {
    oldest: (a, b) =>
      (a.transactionDate ? new Date(a.transactionDate).getTime() : 0) -
      (b.transactionDate ? new Date(b.transactionDate).getTime() : 0),

    newest: (a, b) =>
      (b.transactionDate ? new Date(b.transactionDate).getTime() : 0) -
      (a.transactionDate ? new Date(a.transactionDate).getTime() : 0),

    lowestAmount: (a, b) => Number(a.amount) - Number(b.amount),
    highestAmount: (a, b) => Number(b.amount) - Number(a.amount),

    incomeFirst: (a, b) =>
      a.type === "INCOME" && b.type === "EXPENSE" ? -1 : 1,
    expenseFirst: (a, b) =>
      a.type === "EXPENSE" && b.type === "INCOME" ? -1 : 1,

    nameAsc: (a, b) => a.name.localeCompare(b.name),
    nameDesc: (a, b) => b.name.localeCompare(a.name),

    default: () => 0,
  };

  const sortedTransactions = [...newData].sort(
    sortFunctions[sortParams ?? "default"] || (() => 0)
  );

  return (
    <div className="overflow-x-auto max-h-[400px]">
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
          {sortedTransactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              className={`${
                transaction.type === "INCOME" ? "bg-green-300" : ""
              }`}
            >
              <TableCell>{transaction.account?.name}</TableCell>
              <TableCell>{transaction.name}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {transaction.category?.emoji}
                {transaction.category?.name}
              </TableCell>
              <TableCell className="text-right">
                ${transaction.amount}
              </TableCell>
              <TableCell className="text-right">
                {format(
                  new Date(transaction.transactionDate ?? new Date()),
                  "dd MMMM yyyy, HH:mm:ss",
                  {
                    locale: enGB,
                  }
                )}
              </TableCell>
              <TableCell>
                <Modal>
                  <Modal.Open opens="delete">
                    <MdDeleteOutline />
                  </Modal.Open>

                  <Modal.Window name="delete">
                    <ConfirmDelete
                      resourceName="transaction"
                      disabled={isDeleting}
                      onConfirm={() => deleteTransaction(transaction.id!)}
                    />
                  </Modal.Window>
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
