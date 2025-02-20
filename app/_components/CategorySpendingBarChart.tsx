import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loading from "./Loading";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6384",
];

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export default function CategorySpendingBarChart() {
  const { data: transactions } = useTransactionsQuery();

  if (!transactions) {
    return <Loading />;
  }

  const categoryTotals = transactions.reduce((acc, transaction) => {
    const category = transaction.category.name;
    acc[category] = (acc[category] || 0) + transaction.amount;
    return acc;
  }, {});

  const chartData = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    value: categoryTotals[category],
    color: getRandomColor(),
  }));

  return (
    <div className="border bg-white border-vibrant-mint-green rounded-3xl row-span-3 col-span-2 flex justify-center">
      <div className="flex flex-col items-center py-4 w-full">
        <h2 className="text-xl font-semibold font-roboto text-dark-slate mb-2">
          Expenses by Category
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
