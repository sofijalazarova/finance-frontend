import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const BudgetDonutChart = () => {
  const data = [
    { name: "Spent", value: 10000, color: "#FF6384" },
    { name: "Remaining", value: 50000 - 10000, color: "#36A2EB" },
  ];

  return (
    <div>
      <h2 className="text-xl text-center font-bold mb-2">Budget Overview</h2>
      <p className="text-gray-600 mb-4 text-center">
        How much of your budget is remaining?
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetDonutChart;
