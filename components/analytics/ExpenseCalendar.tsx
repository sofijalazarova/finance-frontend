import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ExpenseModal from "./ExpenseModal";

export default function ExpenseCalendar() {
  const { data: transactions = [] } = useTransactionsQuery();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="p-4 bg-white flex flex-col items-center">
      <h2 className="text-xl font-bold mb-2">Interactive Calendar</h2>
      <Calendar
        className="border-2 border-blue-500 rounded-lg font-roboto"
        onClickDay={(date: Date) => setSelectedDate(date)}
        tileContent={({ date }: { date: Date }) => {
          const dayExpenses = transactions.filter((tx: TransactionModel) => {
            if (!tx.transactionDate) return false;
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
