import Modal from "@/app/_components/Modal";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmDelete from "@/app/_components/ConfirmDelete";
import { useDeleteSaving } from "@/lib/queries/useDeleteSaving";
import { useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { SavingGoalType } from "@/app/(root)/savings/page";
import { useDrop } from "react-dnd";

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

export default SavingGoal;
