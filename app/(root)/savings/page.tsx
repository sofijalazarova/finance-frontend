"use client";

import React, { useRef, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSavingsQuery } from "@/lib/queries/useSavingsQuery";
import { updateSavingGoal } from "@/lib/api/data-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import AddSaving from "@/app/_components/AddSaving";
import Modal from "@/app/_components/Modal";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDelete from "@/app/_components/ConfirmDelete";
import { useDeleteSaving } from "@/lib/queries/useDeleteSaving";

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
      className={`relative flex items-center gap-2 p-3 rounded-lg border-2 border-green-600 bg-green-300 text-black shadow-lg cursor-pointer select-none transition-transform transform ${
        isDragging ? "opacity-50 scale-105" : "opacity-100"
      }`}
    >
      <DollarSign className="w-5 h-5 text-yellow-800" />
      <span className="font-bold text-lg tracking-wide">${amount}</span>
    </div>
  );
};

interface SavingGoalProps {
  goal: SavingGoalType;
  onDrop: (goalId: number, amount: number) => void;
}

const SavingGoal: React.FC<SavingGoalProps> = ({ goal, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const isGoalCompleted = goal.savedAmount >= goal.targetAmount;

  const { isDeleting, deleteSaving } = useDeleteSaving();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MONEY",
    drop: (item: { amount: number }) => {
      setIsAnimating(true);
      onDrop(goal.id, item.amount);
      setTimeout(() => setIsAnimating(false), 400);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(ref);

  const progress = (goal.savedAmount / goal.targetAmount) * 100;

  return (
    <motion.div
      ref={ref}
      className={`relative w-72 p-6 my-6 border rounded-xl shadow-lg transition-all duration-200 
      ${isOver ? "bg-green-100 scale-105 shadow-xl" : "bg-white"}
      ${isGoalCompleted ? "bg-yellow-200 border-yellow-500" : ""}`}
      animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {isGoalCompleted && (
        <Confetti
          width={300}
          height={200}
          numberOfPieces={100}
          recycle={false}
        />
      )}

      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="font-bold text-xl text-gray-800">{goal.name}</h3>
        <Modal>
          <Modal.Open opens="delete">
            <MdDeleteOutline />
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="saving goal"
              disabled={isDeleting}
              onConfirm={() => deleteSaving(goal.id!)}
            />
          </Modal.Window>
        </Modal>
      </div>

      <div className="relative w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
        <span className="absolute right-2 top-0 text-xs font-bold text-emerald-green">
          {Math.round(progress)}%
        </span>
      </div>

      <p className="text-gray-700 text-sm font-medium text-center">
        <span className="font-bold text-lg text-green-700">
          ${goal.savedAmount}
        </span>{" "}
        / ${goal.targetAmount}
      </p>

      {isGoalCompleted && (
        <div className="mt-3 flex items-center justify-center text-lg font-bold text-yellow-700">
          <CheckCircle className="w-6 h-6 mr-2 text-green-600 animate-bounce" />
          Goal Achieved!
        </div>
      )}
    </motion.div>
  );
};

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
          <div className="col-span-7 row-span-6 border rounded-lg border-bright-leaf-green p-10 font-roboto">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">Savings Goals</h2>

              <AddSaving />
            </div>
            <div className="flex flex-wrap  gap-6">
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
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Savings;
