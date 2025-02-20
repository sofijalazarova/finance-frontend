import { DollarSign } from "lucide-react";
import { useRef } from "react";
import { useDrag } from "react-dnd";

interface MoneyProps {
  amount: number;
}

const Money: React.FC<MoneyProps> = ({ amount }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "MONEY",
    item: { amount },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-2 p-3 rounded-lg border-2 border-green-600 bg-green-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg  cursor-pointer select-none transition-transform transform ${
        isDragging ? "opacity-50 scale-105" : "opacity-100"
      }`}
    >
      <DollarSign className="w-5 h-5 text-white" />
      <span className="font-bold text-lg tracking-wide">{amount}</span>
    </div>
  );
};

export default Money;
