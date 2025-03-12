import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFF5",
  "#F5FF33",
  "#FF8C33",
  "#338CFF",
  "#8C33FF",
  "#FF3366",
  "#66FF33",
  "#3366FF",
  "#FF9933",
  "#9933FF",
  "#33FF99",
  "#99FF33",
  "#FF33CC",
  "#33CCFF",
  "#CC33FF",
];

export default function CategorySpendingBarChart() {
  const { data: transactions, isLoading } = useTransactionsQuery();

  if (!transactions) {
    return (
      <div className="relative border bg-white border-vibrant-mint-green rounded-3xl row-span-3 col-span-1 lg:col-span-2 flex justify-center">
        <div className="flex flex-col items-center py-4 w-full">
          <h2 className="text-xl font-semibold font-roboto text-dark-slate mb-2">
            Expenses by Category
          </h2>
          <p className="text-gray-500 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  const categoryTotals = transactions
    ?.filter((transaction) => transaction.type === "EXPENSE")
    .reduce((acc, transaction) => {
      const category = transaction.category?.name || "Uncategorized";
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});

  const chartData = Object.keys(categoryTotals).map((category, index) => ({
    name: category,
    value: categoryTotals[category],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="relative border bg-white border-vibrant-mint-green rounded-3xl row-span-3 col-span-2 flex justify-center">
      <div className="flex flex-col items-center py-4 w-full">
        <h2 className="text-xl font-semibold font-roboto text-dark-slate mb-2">
          Expenses by Category
        </h2>

        {!isLoading && (
          <ResponsiveContainer className="mt-2" width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
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
        )}
      </div>
    </div>
  );
}
