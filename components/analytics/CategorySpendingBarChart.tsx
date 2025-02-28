import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loading from "../../app/_components/Loading";

const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

export default function CategorySpendingBarChart() {
  const { data: transactions, isLoading } = useTransactionsQuery();

  if (!transactions) {
    return <Loading />;
  }

  const categoryTotals = transactions
    .filter((transaction) => transaction.type === "EXPENSE") // Филтрирај само expenses
    .reduce((acc, transaction) => {
      const category = transaction.category?.name || "Uncategorized";
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
