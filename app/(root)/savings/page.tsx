"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSavingsQuery } from "@/lib/queries/useSavingsQuery";
import { updateSavingGoal } from "@/lib/api/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AddSaving from "@/app/_components/AddSaving";
import SavingGoal from "@/components/savings/SavingGoal";
import Money from "@/components/savings/Money";
import SavingsChart from "@/app/_components/SavingGoalChart";

export interface SavingGoalType {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
}

const Savings: React.FC = () => {
  const { data: savings } = useSavingsQuery();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ goalId, amount }: { goalId: number; amount: number }) =>
      updateSavingGoal(goalId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  const handleDrop = (goalId: number, amount: number) => {
    mutate({ goalId, amount });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-9xl h-screen mx-auto flex flex-col">
        <div className="grid grid-cols-7 grid-rows-6 h-full gap-4 mt-20 mb-10">
          <div className="col-span-7 row-span-6 border rounded-xl border-bright-leaf-green p-10 font-roboto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">💰 Savings Goals</h2>

              <AddSaving />
            </div>
            <div className="flex flex-wrap gap-6">
              {savings?.map((goal: SavingGoalType) => (
                <SavingGoal key={goal.id} goal={goal} onDrop={handleDrop} />
              ))}
            </div>

            <div className="flex space-x-4 p-4">
              <Money amount={5} />
              <Money amount={10} />
              <Money amount={20} />
              <Money amount={50} />
            </div>
            <div className="mt-10">
              <SavingsChart />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Savings;

// const Savings: React.FC = () => {
//   const { data: savings } = useSavingsQuery();
//   const queryClient = useQueryClient();

//   const { mutate, isLoading } = useMutation({
//     mutationFn: ({ goalId, amount }: { goalId: number; amount: number }) =>
//       updateSavingGoal(goalId, amount),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["savings"] });
//     },
//   });

//   const handleDrop = (goalId: number, amount: number) => {
//     mutate({ goalId, amount });
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="max-w-5xl mx-auto flex flex-col min-h-screen py-10 px-6">
//         {/* HEADER */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">💰 Savings Goals</h2>
//           <AddSaving />
//         </div>

//         {/* GOALS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {savings?.map((goal: SavingGoalType) => (
//             <SavingGoal key={goal.id} goal={goal} onDrop={handleDrop} />
//           ))}
//         </div>

//         {/* MONEY BUTTONS */}
//         <div className="flex justify-center mt-10 space-x-4">
//           {[5, 10, 20, 50].map((amount) => (
//             <button
//               key={amount}
//               className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all"
//               onClick={() => console.log(`Dropped $${amount}`)}
//             >
//               ${amount}
//             </button>
//           ))}
//         </div>

//         {/* LOADING SPINNER */}
//         {isLoading && (
//           <div className="flex justify-center mt-4">
//             <div className="w-6 h-6 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
//           </div>
//         )}
//       </div>
//     </DndProvider>
//   );
// };

// export default Savings;
