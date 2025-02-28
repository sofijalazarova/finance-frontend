import Modal from "@/components/ui/Modal";
import AddTransactionForm from "./AddTransactionForm";

function AddTransaction() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="transaction-form">
          <button className="p-2 border font-inter bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out">
            Add new transaction
          </button>
        </Modal.Open>
        <Modal.Window name="transaction-form">
          <AddTransactionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddTransaction;
