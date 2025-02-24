import { getCategoryBudgets } from "@/lib/api/data-service";
import { useTransactionsQuery } from "@/lib/queries/useTransactionsQuery";
import { useQuery } from "@tanstack/react-query";
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

const BudgetComparisonChart = () => {
  const { data: transactions } = useTransactionsQuery();

  const { data: categoryBudgets, isLoading: isBudgetsLoading } = useQuery({
    queryKey: ["categoryBudgets"],
    queryFn: getCategoryBudgets,
  });

  if (!transactions || !categoryBudgets) {
    return <Loading />;
  }

  const data = categoryBudgets.map((budget) => {
    const totalSpent = transactions
      .filter((t) => t.category?.id === budget.category.id)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      category: budget.category.name,
      Assigned: budget.allocatedAmount,
      Spent: totalSpent,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Assigned" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Spent" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetComparisonChart;
