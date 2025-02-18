import { format } from "date-fns";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loading from "./Loading";

const SpendingTrendChart = () => {
  const { data: transactions } = useTransactionsQuery();

  if (!transactions) {
    return <Loading />;
  }

  const dailySpending = transactions.reduce(
    (acc, transaction: TransactionModel) => {
      const date = format(
        new Date(transaction.transactionDate ?? new Date()),
        "yyyy-MM-dd"
      );
      acc[date] = (acc[date] || 0) + transaction.amount;
      return acc;
    },
    {}
  );

  const data = Object.entries(dailySpending).map(([date, total]) => ({
    date,
    total,
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Spending Trend</h2>
      <p className="text-gray-600 mb-4">Track your spending over time.</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrendChart;
