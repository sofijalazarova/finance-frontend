import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import { ResponsiveCalendar } from "@nivo/calendar";

export default function ExpenseHeatmap() {
  const { data: transactions = [] } = useTransactionsQuery();

  const data = transactions
    .filter((tx) => tx.transactionDate) // Проверка дали постои датум
    .map((tx) => ({
      day: new Date(tx.transactionDate!).toISOString().split("T")[0], // YYYY-MM-DD
      value: parseFloat(tx.amount), // Претворање на `string` во `number`
    }));

  return (
    <div className="h-72 bg-white shadow-lg rounded-lg p-4">
      <ResponsiveCalendar
        data={data}
        from="2024-01-01"
        to="2024-12-31"
        emptyColor="#eeeeee"
        colors={["#d6f5d6", "#f4c542", "#f54242"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  );
}
