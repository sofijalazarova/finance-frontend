import { useSavingsQuery } from "@/lib/queries/useSavingsQuery";
import { format, parseISO } from "date-fns";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  LabelList,
} from "recharts";
import Loading from "./Loading";

const SavingsChart: React.FC = () => {
  const { data: savings } = useSavingsQuery();

  if (!savings) {
    return <Loading />;
  }

  const chartData = savings
    .map((goal) => ({
      date: goal.targetDate, // Оригинален датум за сортирање
      formattedDate: format(parseISO(goal.targetDate), "yyyy-MM-dd"), // Форматиран за прикажување
      targetAmount: goal.targetAmount,
      name: goal.name, // Додаваме име на saving goal
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Сортирање хронолошки

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <XAxis
            dataKey="formattedDate"
            tickFormatter={(tick) => format(parseISO(tick), "MMM dd")}
          />
          <YAxis />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />

          <Scatter
            data={chartData}
            dataKey="targetAmount"
            fill="#4CAF50"
            name="Target Amount"
          >
            <LabelList dataKey="name" position="top" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SavingsChart;
