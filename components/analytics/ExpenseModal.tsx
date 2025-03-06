import { Dialog } from "@headlessui/react";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";

declare interface ExpenseModalProps {
  date: Date;
  onClose: () => void;
}

export default function ExpenseModal({ date, onClose }: ExpenseModalProps) {
  const { data: transactions = [] } = useTransactionsQuery();

  const dayExpenses = transactions.filter((transaction) => {
    if (!transaction.transactionDate) return false;
    const txDate = new Date(transaction.transactionDate);
    return txDate.toDateString() === date.toDateString();
  });

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Expenses for {date.toDateString()}
        </h2>
        <ul>
          {dayExpenses.length > 0 ? (
            dayExpenses.map((transaction, index) => (
              <li key={index} className="border-b py-2">
                $ {transaction.amount} – {transaction.category?.name || ""}
              </li>
            ))
          ) : (
            <p>No expenses on this day!</p>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
