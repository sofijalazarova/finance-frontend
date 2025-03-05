import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ExpenseModal from "./ExpenseModal";

export default function ExpenseCalendar() {
  const { data: transactions = [] } = useTransactionsQuery();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <Calendar
        onClickDay={(date: Date) => setSelectedDate(date)}
        tileContent={({ date }: { date: Date }) => {
          const dayExpenses = transactions.filter((tx: TransactionModel) => {
            if (!tx.transactionDate) return false; // Проверка за undefined
            const txDate = new Date(tx.transactionDate);
            return txDate.toDateString() === date.toDateString();
          });

          return dayExpenses.length > 0 ? (
            <span className="text-red-500">●</span>
          ) : null;
        }}
      />

      {selectedDate && (
        <ExpenseModal
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
