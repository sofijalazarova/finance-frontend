// "use client";

// import { useSavingsQuery } from "@/lib/queries/useSavingsQuery";
// import React from "react";
// import { useDrag, useDrop, DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const Money = ({ amount }) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "MONEY",
//     item: { amount },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className="p-2 bg-yellow-400 text-black rounded cursor-pointer"
//     >
//       ${amount}
//     </div>
//   );
// };

// const Savings = () => {
//   const { data: savings } = useSavingsQuery();

//   console.log(savings);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "MONEY",
//     drop: (item) => onDrop(goal.id, item.amount),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <>
//       <div className="max-w-9xl h-screen mx-auto flex flex-col">
//         <div className="grid grid-cols-7 grid-rows-6 h-full gap-4 mt-20 mb-10">
//           <div className="col-span-7 row-span-6 border rounded-lg border-bright-leaf-green">
//             <div
//               ref={drop}
//               className={`p-6 border rounded-lg ${
//                 isOver ? "bg-green-200" : "bg-white"
//               }`}
//             >
//               <h3>{goal.name}</h3>
//               <p>
//                 ${goal.savedAmount} / ${goal.targetAmount}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Savings;

"use client";

import React, { useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSavingsQuery } from "@/lib/queries/useSavingsQuery";
import { updateSavingGoal } from "@/lib/api/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface SavingGoalType {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
}

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
      className={`p-2 bg-yellow-400 text-black rounded cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      ${amount}
    </div>
  );
};

interface SavingGoalProps {
  goal: SavingGoalType;
  onDrop: (goalId: number, amount: number) => void;
}

// const SavingGoal: React.FC<SavingGoalProps> = ({ goal, onDrop }) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "MONEY",
//     drop: (item: { amount: number }) => onDrop(goal.id, item.amount),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   drop(ref);

//   return (
//     <div
//       ref={ref}
//       className={`p-6 border rounded-lg w-1/2${
//         isOver ? "bg-green-200" : "bg-white"
//       }`}
//     >
//       <h3 className="font-bold">{goal.name}</h3>
//       <p>
//         ${goal.savedAmount} / ${goal.targetAmount}
//       </p>
//     </div>
//   );
// };

// const SavingGoal: React.FC<SavingGoalProps> = ({ goal, onDrop }) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "MONEY",
//     drop: (item: { amount: number }) => onDrop(goal.id, item.amount),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   drop(ref);

//   const progress = (goal.savedAmount / goal.targetAmount) * 100;

//   return (
//     <div
//       ref={ref}
//       className={`p-6 border rounded-xl shadow-md transition-all duration-200 ${
//         isOver ? "bg-green-100 scale-105" : "bg-white"
//       }`}
//     >
//       <h3 className="font-bold text-lg text-gray-800 mb-2">{goal.name}</h3>
//       <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
//         <div
//           className="bg-green-500 h-3 rounded-full transition-all"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//       <p className="text-gray-700 text-sm font-medium">
//         ${goal.savedAmount} / ${goal.targetAmount}
//       </p>
//     </div>
//   );
// };

const SavingGoal: React.FC<SavingGoalProps> = ({ goal, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MONEY",
    drop: (item: { amount: number }) => onDrop(goal.id, item.amount),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  const progress = (goal.savedAmount / goal.targetAmount) * 100;

  return (
    <div
      ref={ref}
      className={`w-64 p-6 m-6 border rounded-xl shadow-md transition-all duration-200 ${
        isOver ? "bg-green-100 scale-105" : "bg-white"
      }`}
    >
      <h3 className="font-bold text-lg text-gray-800 mb-2">{goal.name}</h3>
      <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-700 text-sm font-medium">
        ${goal.savedAmount} / ${goal.targetAmount}
      </p>
    </div>
  );
};

const Savings: React.FC = () => {
  const { data: savings } = useSavingsQuery();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ goalId, amount }: { goalId: number; amount: number }) =>
      updateSavingGoal(goalId, amount),
    onSuccess: () => {
      toast.success("Ok");
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  const handleDrop = (goalId: number, amount: number) => {
    console.log(`Added $${amount} to goal ID ${goalId}`);
    mutate({ goalId, amount });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-9xl h-screen mx-auto flex flex-col">
        <div className="grid grid-cols-7 grid-rows-6 h-full gap-4 mt-20 mb-10">
          <div className="col-span-7 row-span-6 border rounded-lg border-bright-leaf-green">
            <h2 className="text-2xl font-bold">Savings Goals</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              + Add Goal
            </button>

            {savings?.map((goal: SavingGoalType) => (
              <SavingGoal key={goal.id} goal={goal} onDrop={handleDrop} />
            ))}

            <div className="flex space-x-4 p-4">
              <Money amount={5} />
              <Money amount={10} />
              <Money amount={20} />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Savings;
