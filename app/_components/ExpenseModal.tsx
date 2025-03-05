import { Dialog } from "@headlessui/react";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";

declare interface ExpenseModalProps {
  date: Date;
  onClose: () => void;
}

export default function ExpenseModal({ date, onClose }: ExpenseModalProps) {
  const { data: transactions = [] } = useTransactionsQuery();

  const dayExpenses = transactions.filter((tx) => {
    if (!tx.transactionDate) return false; // Проверка за undefined
    const txDate = new Date(tx.transactionDate);
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
          Трошоци за {date.toDateString()}
        </h2>
        <ul>
          {dayExpenses.length > 0 ? (
            dayExpenses.map((tx, index) => (
              <li key={index} className="border-b py-2">
                💰 {tx.amount} ден. –{" "}
                {tx.category?.name || "Непозната категорија"}
              </li>
            ))
          ) : (
            <p>Нема трошоци за овој ден.</p>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Затвори
        </button>
      </div>
    </Dialog>
  );
}
