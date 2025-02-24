import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "./Loading";

const TopSpendingCategoriesChart = () => {
  const { data: transactions } = useTransactionsQuery();

  if (!transactions) {
    return <Loading />;
  }

  const categoryTotals = transactions.reduce((acc, transaction) => {
    const category = transaction.category?.name;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Top Spending Categories</h2>
      <p className="text-gray-600 mb-4">See where you spend the most.</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart layout="vertical" data={data}>
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSpendingCategoriesChart;
