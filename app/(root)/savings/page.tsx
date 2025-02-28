"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSavingsQuery } from "@/lib/queries/useSavingsQuery";
import { updateSavingGoal } from "@/lib/api/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import SavingGoal from "@/components/savings/SavingGoal";
import Money from "@/components/savings/Money";
import SavingsChart from "@/components/savings/SavingGoalChart";
import AddSaving from "@/components/savings/AddSaving";

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
