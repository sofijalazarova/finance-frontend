import Modal from "@/components/ui/Modal";
import AddBudgetForm from "./AddBudgetForm";

function AddBudget({ totalBudget }: { totalBudget: number }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="budget-form">
          {totalBudget !== undefined ? (
            <button className="absolute top-4 right-4 p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out">
              Manage budget
            </button>
          ) : (
            <button className="absolute top-4 right-4 p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out">
              Add budget
            </button>
          )}
        </Modal.Open>
        <Modal.Window name="budget-form">
          <AddBudgetForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBudget;
